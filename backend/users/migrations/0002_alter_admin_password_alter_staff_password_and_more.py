# Generated by Django 4.2.7 on 2024-02-01 02:00

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="admin",
            name="password",
            field=models.CharField(max_length=255, verbose_name="Password"),
        ),
        migrations.AlterField(
            model_name="staff",
            name="password",
            field=models.CharField(max_length=255, verbose_name="Password"),
        ),
        migrations.AlterField(
            model_name="student",
            name="password",
            field=models.CharField(max_length=255, verbose_name="Password"),
        ),
        migrations.AlterField(
            model_name="teacher",
            name="password",
            field=models.CharField(max_length=255, verbose_name="Password"),
        ),
    ]