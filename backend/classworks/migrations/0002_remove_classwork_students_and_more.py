# Generated by Django 4.2.7 on 2024-03-21 03:34

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("classworks", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="classwork",
            name="students",
        ),
        migrations.RemoveField(
            model_name="classworksubmission",
            name="submission_text",
        ),
        migrations.AddField(
            model_name="classworksubmission",
            name="turn_in",
            field=models.BooleanField(default=False, verbose_name="Turn In"),
        ),
    ]
