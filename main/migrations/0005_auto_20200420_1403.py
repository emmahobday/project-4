# Generated by Django 3.0.5 on 2020-04-20 14:03

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20200420_1346'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe_to_buy_for',
            name='ingredients_to_buy_for',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, default=list, max_length=5000, null=True), default=list, size=None),
        ),
    ]