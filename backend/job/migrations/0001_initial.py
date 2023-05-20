# Generated by Django 4.2.1 on 2023-05-19 23:39

import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Employer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('companyname', models.CharField(max_length=50)),
                ('website', models.CharField(max_length=50)),
                ('logo', models.CharField(max_length=50)),
                ('location', models.CharField(max_length=50)),
                ('phone', models.CharField(default='0000000000', max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='JobApplication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('applicationstatus', models.CharField(max_length=50)),
                ('applicationdate', models.CharField(max_length=50)),
                ('applicationfeedback', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='JobListing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('jobtitle', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=1000)),
                ('location', models.CharField(max_length=250)),
                ('salary', models.CharField(max_length=250)),
                ('jobrequirements', models.CharField(max_length=1000)),
                ('employer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='job.employer')),
            ],
        ),
        migrations.CreateModel(
            name='JobSeeker',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bio', models.CharField(default='bio', max_length=250)),
                ('location', models.CharField(default='location', max_length=50)),
                ('phone', models.CharField(default='0000000000', max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('userjob_type', models.CharField(choices=[('E', 'Employer'), ('J', 'Job Seeker')], default='J', max_length=1)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='job_user_set', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='job_user_set', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Resume',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('education', models.CharField(max_length=50)),
                ('experience', models.CharField(max_length=50)),
                ('skills', models.CharField(max_length=50)),
                ('certifications', models.CharField(max_length=50)),
                ('jobseeker', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='job.jobseeker')),
            ],
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('paymentdate', models.CharField(max_length=50)),
                ('paymentstatus', models.CharField(max_length=50)),
                ('paymentamount', models.CharField(max_length=50)),
                ('employer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='job.employer')),
                ('joblisting', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='job.joblisting')),
                ('jobseeker', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='job.jobseeker')),
            ],
        ),
        migrations.AddField(
            model_name='jobseeker',
            name='userjob',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='job.user'),
        ),
        migrations.AddField(
            model_name='joblisting',
            name='jobseeker',
            field=models.ManyToManyField(through='job.JobApplication', to='job.jobseeker'),
        ),
        migrations.AddField(
            model_name='jobapplication',
            name='joblisting',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='job.joblisting'),
        ),
        migrations.AddField(
            model_name='jobapplication',
            name='jobseeker',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='job.jobseeker'),
        ),
        migrations.AddField(
            model_name='employer',
            name='userjob',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='job.user'),
        ),
    ]
