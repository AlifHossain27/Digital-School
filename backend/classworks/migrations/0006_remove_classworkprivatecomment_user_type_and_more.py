# Generated by Django 4.2.7 on 2024-03-30 04:39

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("classworks", "0005_classworkprivatecomment"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="classworkprivatecomment",
            name="user_type",
        ),
        migrations.AddField(
            model_name="classworkprivatecomment",
            name="reply",
            field=models.TextField(blank=True, null=True, verbose_name="Reply"),
        ),
    ]
