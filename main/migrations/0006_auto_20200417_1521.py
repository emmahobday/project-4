# Generated by Django 3.0.5 on 2020-04-17 15:21

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0005_auto_20200417_1306'),
    ]

    operations = [
        migrations.AlterField(
            model_name='healthlabel',
            name='user',
            field=models.ManyToManyField(blank=True, related_name='health_labels', to=settings.AUTH_USER_MODEL),
        ),
    ]
