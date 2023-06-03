from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.hashers import make_password
from django.contrib.postgres.fields import ArrayField

from datetime import date


# Create your models here.

# user schemeUser schema: This schema would define the user model for the app, including fields like username, email, password, and user type. The user type field would distinguish between employers and job seekers.


class User(
    AbstractUser
):  # The AbstractUser class is provided by Django and includes some common fields for a user model, such as username, email, and password
    # userjob_type_choices = [
    #     ("E", "Employer"),
    #     ("J", "Job Seeker"),
    # ]
    # userjob_type = models.CharField(
    #     max_length=1, choices=userjob_type_choices, default="J"
    # )

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    # Add a related_name argument to avoid clashes with auth.User's groups field
    groups = models.ManyToManyField(
        Group,
        verbose_name=_("groups"),
        blank=True,
        help_text=_(
            "The groups this user belongs to. A user will get all permissions "
            "granted to each of their groups."
        ),
        related_name="job_user_set",  # Use a unique related_name
    )

    # Add a related_name argument to avoid clashes with auth.User's user_permissions field
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_("user permissions"),
        blank=True,
        help_text=_("Specific permissions for this user."),
        related_name="job_user_set",  # Use a unique related_name
    )

    #check if the user is an employer or job seeker
    def has_employer(self):
        return hasattr(self, 'employer')
    
    def has_jobseeker(self):
        return hasattr(self, 'jobseeker')

    # if the user is a job seeker list all the jobs they applied for

    @property
    def user_job_applications(self):
        if self.has_jobseeker():
            return self.jobseeker.jobapplication_set.all()
        return None

    # if the user is an employer list all the jobs they posted
    @property
    def get_user_job_listings(self):
        if self.has_employer():
            return self.employer.joblisting_set.all()
        return None

    def __str__(self):
        return self.username


# Employer schema: This schema would define the employer model for the app, including fields like company name, website, logo, and location. Employers can create job listings and manage their applications through this schema.


class Employer(models.Model):
    companyname = models.CharField(max_length=50)
    website = models.CharField(max_length=50)
    logo = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    phone = models.CharField(max_length=50, default="0000000000")
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='employer', default=1)

    def __str__(self):
        return self.companyname


# Job listing schema: This schema would define the job listing model for the app, including fields like job title, description, location, salary, and job requirements. Employers can create job listings and manage their applications through this schema.


class JobListing(models.Model):
    jobtitle = models.CharField(max_length=50)
    description = models.CharField(max_length=1000)
    location = models.CharField(max_length=250)
    salary = models.CharField(max_length=250)
    jobrequirements = models.CharField(max_length=1000)
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE)
    #jobseeker = models.ManyToManyField("JobSeeker", through="JobApplication")

    def __str__(self):
        return self.jobtitle


# Job seeker schema: This schema would define the job seeker model fJob seekers can create profiles and apply for jobs through this schema.


class JobSeeker(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,  related_name='job_seeker', default=1)
    bio = models.CharField(max_length=250, default="bio")
    location = models.CharField(max_length=50, default="location")
    phone = models.CharField(max_length=50, default="0000000000")

    def __str__(self):
        return self.user.username


# Resume schema: This schema would define the resume model for the app, including fields like education, experience, skills, and certifications. Job seekers can upload their resumes to their profiles, and the app can automatically parse and extract relevant information from the resume.


class Resume(models.Model):
    education = models.CharField(max_length=50)
    experience = models.CharField(max_length=50)
    skills = ArrayField(models.CharField(max_length=50), blank=True, null=True)
    certifications = ArrayField(models.CharField(max_length=50), blank=True, null=True)
    jobseeker = models.ForeignKey(JobSeeker, on_delete=models.CASCADE)

    def __str__(self):
        return self.education


# Job application schema: This schema would define the job application model for the app, including fields like application status, application date, and application feedback. Job seekers can track the status of their job applications, receive notifications about their applications, and communicate with employers through this schema.


class JobApplication(models.Model):
    APPLICATION_STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]

    application_status = models.CharField(max_length=50, choices=APPLICATION_STATUS_CHOICES, default='Pending')
    application_date = models.DateField(default=date.today)
    application_feedback = models.TextField(blank=True, default="")
    job_seeker = models.ForeignKey(JobSeeker, on_delete=models.CASCADE, default=1)
    job_listing = models.ForeignKey(JobListing, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return self.application_status


# Payment schema: This schema would define the payment model for the app, including fields like payment date, payment status, and payment amount. Employers can pay for job postings and feature listings using a payment gateway integration.


class Payment(models.Model):
    paymentdate = models.CharField(max_length=50)
    paymentstatus = models.CharField(max_length=50)
    paymentamount = models.CharField(max_length=50)
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE)
    joblisting = models.ForeignKey(JobListing, on_delete=models.CASCADE)
    jobseeker = models.ForeignKey(JobSeeker, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return self.paymentdate
    

#Saved Jobs schema: This schema would define the saved jobs model for the app,
class SavedJob(models.Model):
    job_listing = models.ForeignKey(JobListing, on_delete=models.CASCADE, default=1)
    job_seeker = models.ForeignKey(JobSeeker, on_delete=models.CASCADE, default=1)
    save_date = models.DateField(default=date.today)

    def __str__(self):
        return str(self.save_date) 
    
#Saved Candidates schema: This schema would define the saved candidates model for the app,
class SavedCandidate(models.Model):
    job_seeker = models.ForeignKey(JobSeeker, on_delete=models.CASCADE, default=1)
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE, default=1)
    save_date = models.DateField(default=date.today)

    def __str__(self):
        return str(self.save_date)    
