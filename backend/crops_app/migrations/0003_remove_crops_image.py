# Generated by Django 4.2.7 on 2023-12-13 15:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crops_app', '0002_alter_crops_grow_time'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='crops',
            name='image',
        ),
    ]
