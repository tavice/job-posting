# Generated by Django 4.2.1 on 2023-05-19 23:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='employer',
            old_name='userjob',
            new_name='user',
        ),
        migrations.RenameField(
            model_name='jobseeker',
            old_name='userjob',
            new_name='user',
        ),
    ]