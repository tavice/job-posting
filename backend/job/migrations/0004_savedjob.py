# Generated by Django 4.2.1 on 2023-05-26 22:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0003_remove_joblisting_jobseeker'),
    ]

    operations = [
        migrations.CreateModel(
            name='SavedJob',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_listing', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='job.joblisting')),
                ('job_seeker', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='job.jobseeker')),
            ],
        ),
    ]
