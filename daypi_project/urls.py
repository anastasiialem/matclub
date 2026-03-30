from django.contrib import admin
from django.urls import path
from api import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.index),
    path("styles.css", views.styles),
    path("script.js", views.script),
    path("api/register", views.register),
    path("api/login", views.login),
    path("api/submissions", views.submissions),
    path("api/submissions/me", views.submissions_me),
    path("api/leaderboard", views.leaderboard),
    path("api/config", views.config),
    path("admin-panel", views.admin_panel),
    path("admin.js", views.admin_script),
]
