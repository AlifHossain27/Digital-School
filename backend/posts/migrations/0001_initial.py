# Generated by Django 4.2.7 on 2024-08-01 00:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("classrooms", "0001_initial"),
        ("profiles", "0002_alter_staffprofile_date_of_birth_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="ClassroomPost",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("post", models.TextField(verbose_name="Classroom Posts")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "post_type",
                    models.CharField(
                        default="general", max_length=100, verbose_name="Post Type"
                    ),
                ),
                (
                    "author",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="profiles.teacherprofile",
                        verbose_name="Post Author",
                    ),
                ),
                (
                    "classroom",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="classrooms.classroom",
                    ),
                ),
            ],
        ),
    ]