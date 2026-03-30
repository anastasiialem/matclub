from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    age = models.PositiveSmallIntegerField(null=True, blank=True)
    place_of_study = models.CharField(max_length=128, blank=True)
    is_admin = models.BooleanField(default=False)


class EmailVerification(models.Model):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=150)
    password_hash = models.CharField(max_length=128)
    age = models.PositiveSmallIntegerField()
    place_of_study = models.CharField(max_length=128)
    code = models.CharField(max_length=6)
    expires_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now=True)


class Submission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="submissions")
    day_key = models.CharField(max_length=8)
    date_key = models.CharField(max_length=16)
    task_id = models.CharField(max_length=64)
    task_title_uk = models.CharField(max_length=128)
    task_title_en = models.CharField(max_length=128)
    points = models.IntegerField()
    accuracy = models.IntegerField()
    answer = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
