# Generated by Django 3.0.5 on 2020-04-20 10:38

from django.conf import settings
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Shopping_list',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='shopping_list', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Recipe_to_buy_for',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ingredients_to_buy_for', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(default=list, max_length=5000, null=True), size=None)),
                ('recipe', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='recipes', to='main.Recipe')),
                #added the s after 'recipe_to_buy_forS'.     #not sure if plural can just be recipeS_to_buy_for
                ('shopping_list', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='recipe_to_buy_fors', to='main.Shopping_list')),
            ],
        ),
    ]
