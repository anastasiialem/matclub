from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="profile",
            old_name="course",
            new_name="age",
        ),
        migrations.RenameField(
            model_name="profile",
            old_name="faculty",
            new_name="place_of_study",
        ),
        migrations.AlterField(
            model_name="profile",
            name="age",
            field=models.PositiveSmallIntegerField(blank=True, null=True),
        ),
        migrations.CreateModel(
            name="EmailVerification",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("email", models.EmailField(max_length=254, unique=True)),
                ("name", models.CharField(max_length=150)),
                ("password_hash", models.CharField(max_length=128)),
                ("age", models.PositiveSmallIntegerField()),
                ("place_of_study", models.CharField(max_length=128)),
                ("code", models.CharField(max_length=6)),
                ("expires_at", models.DateTimeField()),
                ("created_at", models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
