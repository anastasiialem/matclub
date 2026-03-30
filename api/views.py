import base64
import random
from datetime import timedelta
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from django.core.mail import send_mail, get_connection
from django.core.validators import validate_email
from django.db import IntegrityError
from django.http import JsonResponse, HttpResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from pathlib import Path

from .models import Profile, Submission, EmailVerification

CONFIG_PATH = Path(settings.BASE_DIR) / "daypi.json"

def _read_config():
    import json
    if CONFIG_PATH.exists():
        try:
            return json.loads(CONFIG_PATH.read_text("utf-8"))
        except (json.JSONDecodeError, OSError):
            pass
    return {"tasks_open": False, "custom_tasks": []}

def _write_config(data):
    import json
    CONFIG_PATH.write_text(json.dumps(data, ensure_ascii=False), "utf-8")

@csrf_exempt
@require_http_methods(["GET", "POST"])
def config(request):
    if request.method == "GET":
        return JsonResponse(_read_config())
    
    user = get_user_from_auth(request)
    profile = Profile.objects.filter(user=user).first() if user else None
    if not profile or not profile.is_admin:
        return JsonResponse({"detail": "Forbidden"}, status=403)
        
    try:
        payload = json_from_request(request)
    except ValueError:
        return JsonResponse({"ok": False}, status=400)

    # Basic sanity: avoid huge config (DoS / disk fill)
    raw = request.body
    if len(raw) > 2 * 1024 * 1024:  # 2 MB max
        return JsonResponse({"ok": False, "detail": "Config too large"}, status=400)

    _write_config(payload)
    return JsonResponse({"ok": True})

def ensure_admin():
    admin = User.objects.filter(email=settings.ADMIN_EMAIL).first()
    if admin:
        return admin
    admin = User.objects.create_user(
        username=settings.ADMIN_EMAIL,
        email=settings.ADMIN_EMAIL,
        password=settings.ADMIN_PASSWORD,
        first_name="Admin",
    )
    Profile.objects.create(user=admin, age=None, place_of_study="Адміністрація", is_admin=True)
    return admin


def validate_registration_payload(payload):
    email = payload.get("email", "").strip().lower()
    name = payload.get("name", "").strip()
    place_of_study = payload.get("place_of_study", "").strip()
    password = payload.get("password", "")
    age_raw = payload.get("age")

    if not email or not name or not place_of_study or not password or age_raw in (None, ""):
        raise ValueError("Fill in all fields")

    try:
        validate_email(email)
    except ValidationError as exc:
        raise ValueError("Invalid email") from exc

    required_domain = (settings.REQUIRED_DOMAIN or "").strip().lower()
    if email == settings.ADMIN_EMAIL:
        raise ValueError("Admin email is reserved")
    if required_domain and not email.endswith(required_domain):
        raise ValueError("Invalid email domain")

    try:
        age = int(age_raw)
    except (TypeError, ValueError) as exc:
        raise ValueError("Invalid age") from exc

    if age < 5 or age > 120:
        raise ValueError("Invalid age")
    if len(password) < 6:
        raise ValueError("Password too short")

    return {
        "email": email,
        "name": name,
        "place_of_study": place_of_study,
        "password": password,
        "age": age,
    }


def generate_verification_code():
    return f"{random.randint(0, 999999):06d}"


def verification_expired(item):
    return item.expires_at <= timezone.now()


def send_verification_email(email, code):
    if not (settings.EMAIL_HOST and settings.EMAIL_HOST_USER and settings.EMAIL_HOST_PASSWORD):
        raise RuntimeError("Email is not configured")

    connection = get_connection(timeout=getattr(settings, "EMAIL_TIMEOUT", 5))
    send_mail(
        "Matclub Edition: verification code",
        f"Ваш код підтвердження для Matclub Edition: {code}\nКод дійсний 10 хвилин.\n",
        settings.DEFAULT_FROM_EMAIL,
        [email],
        connection=connection,
        fail_silently=False,
    )


def parse_basic_auth(request):
    auth = request.headers.get("Authorization", "")
    if not auth.lower().startswith("basic "):
        return None
    token = auth.split(" ", 1)[1].strip()
    try:
        decoded = base64.b64decode(token).decode("utf-8")
    except Exception:
        return None
    if ":" not in decoded:
        return None
    email, password = decoded.split(":", 1)
    return email.lower(), password


def get_user_from_auth(request):
    creds = parse_basic_auth(request)
    if not creds:
        return None
    email, password = creds
    user = authenticate(username=email, password=password)
    return user


@csrf_exempt
@require_http_methods(["POST"])
def register(request):
    ensure_admin()
    try:
        payload = json_from_request(request)
    except ValueError:
        return JsonResponse({"ok": False, "message": "Invalid JSON"}, status=400)

    try:
        data = validate_registration_payload(payload)
    except ValueError as exc:
        return JsonResponse({"ok": False, "message": str(exc)}, status=400)

    try:
        user = User.objects.create_user(
            username=data["email"],
            email=data["email"],
            password=data["password"],
            first_name=data["name"],
        )
        Profile.objects.create(
            user=user,
            age=data["age"],
            place_of_study=data["place_of_study"],
            is_admin=False,
        )
    except IntegrityError:
        return JsonResponse({"ok": False, "message": "Email already exists"}, status=409)

    return JsonResponse({"ok": True, "message": "Registration successful"})


@csrf_exempt
@require_http_methods(["POST"])
def login(request):
    ensure_admin()
    try:
        payload = json_from_request(request)
    except ValueError:
        return JsonResponse({"ok": False, "message": "Invalid JSON"}, status=400)

    email = payload.get("email", "").lower()
    password = payload.get("password", "")
    user = authenticate(username=email, password=password)
    if not user:
        return JsonResponse({"ok": False, "message": "Invalid credentials"}, status=401)

    profile = Profile.objects.filter(user=user).first()
    return JsonResponse(
        {
            "ok": True,
            "user": {
                "name": user.first_name or "",
                "email": user.email,
                "age": profile.age if profile and profile.age is not None else "",
                "place_of_study": profile.place_of_study if profile else "",
                "is_admin": profile.is_admin if profile else False,
            },
        }
    )


@csrf_exempt
@require_http_methods(["GET", "POST", "DELETE"])
def submissions(request):
    ensure_admin()
    user = get_user_from_auth(request)
    if not user:
        return JsonResponse({"detail": "Unauthorized"}, status=401)

    profile = Profile.objects.filter(user=user).first()
    if request.method == "GET":
        if not profile or not profile.is_admin:
            return JsonResponse({"detail": "Forbidden"}, status=403)

        rows = Submission.objects.select_related("user").order_by("-created_at")
        return JsonResponse(
            [
                {
                    "email": row.user.email,
                    "name": row.user.first_name,
                    "day_key": row.day_key,
                    "date_key": row.date_key,
                    "task_id": row.task_id,
                    "task_title_uk": row.task_title_uk,
                    "task_title_en": row.task_title_en,
                    "points": row.points,
                    "accuracy": row.accuracy,
                    "answer": row.answer,
                    "ts": int(row.created_at.timestamp() * 1000),
                }
                for row in rows
            ],
            safe=False,
        )
    if request.method == "DELETE":
        if profile and profile.is_admin:
            return JsonResponse({"ok": False, "message": "Admin cannot be deleted"}, status=400)
        Submission.objects.filter(user=user).delete()
        Profile.objects.filter(user=user).delete()
        user.delete()
        return JsonResponse({"ok": True})

    try:
        payload = json_from_request(request)
    except ValueError:
        return JsonResponse({"ok": False, "message": "Invalid JSON"}, status=400)

    # Validate and cap to prevent leaderboard cheating and oversized payloads
    day_key = (payload.get("day_key") or "")[:8]
    date_key = (payload.get("date_key") or "")[:16]
    task_id = (payload.get("task_id") or "")[:64]
    task_title_uk = (payload.get("task_title_uk") or "")[:128]
    task_title_en = (payload.get("task_title_en") or "")[:128]
    answer = (payload.get("answer") or "")[:2000]
    try:
        # Hard cap: at most 2 points per submission to prevent cheating
        points = max(0, min(2, int(payload.get("points", 0))))
    except (TypeError, ValueError):
        points = 0
    try:
        accuracy = max(0, min(100, int(payload.get("accuracy", 0))))
    except (TypeError, ValueError):
        accuracy = 0

    if day_key not in ("day1", "day2", "day3", "day4"):
        return JsonResponse({"ok": False, "message": "Invalid day_key"}, status=400)

    Submission.objects.create(
        user=user,
        day_key=day_key,
        date_key=date_key,
        task_id=task_id,
        task_title_uk=task_title_uk,
        task_title_en=task_title_en,
        points=points,
        accuracy=accuracy,
        answer=answer,
    )

    return JsonResponse({"ok": True})


@require_http_methods(["GET"])
def submissions_me(request):
    ensure_admin()
    user = get_user_from_auth(request)
    if not user:
        return JsonResponse({"detail": "Unauthorized"}, status=401)

    rows = Submission.objects.filter(user=user).order_by("-created_at")
    return JsonResponse(
        [
            {
                "day_key": row.day_key,
                "date_key": row.date_key,
                "task_id": row.task_id,
                "task_title_uk": row.task_title_uk,
                "task_title_en": row.task_title_en,
                "points": row.points,
                "accuracy": row.accuracy,
                "answer": row.answer,
                "ts": int(row.created_at.timestamp() * 1000),
            }
            for row in rows
        ],
        safe=False,
    )


def submissions_all(request):
    return JsonResponse({"detail": "Use /api/submissions with GET"}, status=410)


@require_http_methods(["GET"])
def leaderboard(request):
    rows = Submission.objects.select_related("user")
    user_day_best = {}
    
    for row in rows:
        email = row.user.email
        day = row.day_key
        key = (email, day)
        
        current = user_day_best.get(key)
        if not current:
            user_day_best[key] = {"name": row.user.first_name, "points": row.points, "accuracy": row.accuracy}
        else:
            if row.points > current["points"] or (row.points == current["points"] and row.accuracy > current["accuracy"]):
                user_day_best[key]["points"] = row.points
                user_day_best[key]["accuracy"] = row.accuracy

    acc = {}
    for (email, day), best in user_day_best.items():
        item = acc.get(email) or {
            "name": best["name"],
            "email": email,
            "points": 0,
            "accuracy_sum": 0,
            "count": 0,
        }
        item["points"] += best["points"]
        item["accuracy_sum"] += best["accuracy"]
        item["count"] += 1
        acc[email] = item

    result = []
    for item in acc.values():
        accuracy = round(item["accuracy_sum"] / item["count"]) if item["count"] else 0
        result.append(
            {
                "name": item["name"],
                "email": item["email"],
                "points": item["points"],
                "accuracy": accuracy,
            }
        )

    result.sort(key=lambda x: x["points"], reverse=True)

    # Add place of study for leaderboard search
    emails = [item["email"] for item in result]
    profiles = Profile.objects.filter(user__email__in=emails).values("user__email", "place_of_study")
    place_by_email = {p["user__email"]: (p["place_of_study"] or "") for p in profiles}
    for item in result:
        item["place_of_study"] = place_by_email.get(item["email"], "")

    return JsonResponse(result, safe=False)


def json_from_request(request):
    import json

    try:
        return json.loads(request.body.decode("utf-8"))
    except Exception as exc:
        raise ValueError("Invalid JSON") from exc


@require_http_methods(["GET"])
def index(request):
    base_dir = Path(__file__).resolve().parent.parent
    html_path = base_dir / "index.html"
    if not html_path.exists():
        return HttpResponse("index.html not found", status=404)
    return HttpResponse(html_path.read_text(encoding="utf-8"), content_type="text/html")


@require_http_methods(["GET"])
def styles(request):
    base_dir = Path(__file__).resolve().parent.parent
    css_path = base_dir / "styles.css"
    if not css_path.exists():
        return HttpResponse("styles.css not found", status=404)
    return HttpResponse(css_path.read_text(encoding="utf-8"), content_type="text/css")

@require_http_methods(["GET"])
def script(request):
    base_dir = Path(__file__).resolve().parent.parent
    js_path = base_dir / "script.js"
    if not js_path.exists():
        return HttpResponse("script.js not found", status=404)
    return HttpResponse(js_path.read_text(encoding="utf-8"), content_type="application/javascript")

@require_http_methods(["GET"])
def admin_panel(request):
    base_dir = Path(__file__).resolve().parent.parent
    html_path = base_dir / "admin.html"
    if not html_path.exists():
        return HttpResponse("admin.html not found", status=404)
    return HttpResponse(html_path.read_text(encoding="utf-8"), content_type="text/html")

@require_http_methods(["GET"])
def admin_script(request):
    base_dir = Path(__file__).resolve().parent.parent
    js_path = base_dir / "admin.js"
    if not js_path.exists():
        return HttpResponse("admin.js not found", status=404)
    return HttpResponse(js_path.read_text(encoding="utf-8"), content_type="application/javascript")
