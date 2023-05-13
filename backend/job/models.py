from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.translation import gettext_lazy as _

# Create your models here.

# user schemeUser schema: This schema would define the user model for the app, including fields like username, email, password, and user type. The user type field would distinguish between employers and job seekers.

class User(AbstractUser): #The AbstractUser class is provided by Django and includes some common fields for a user model, such as username, email, and password
    groups = models.ManyToManyField(Group, blank=True, related_name='job_users')
    user_type_choices = [
        ('E', 'Employer'),
        ('J', 'Job Seeker'),
    ]
    user_type = models.CharField(max_length=1, choices=user_type_choices, default='J')
    user_permissions = models.ManyToManyField(
        Permission,
        blank=True,
        related_name='job_user_permissions',
        verbose_name=_('user permissions'),
        help_text=_(
            'Specific permissions for this user.'
            ),
    )
    
    def __str__(self):
        return self.username
    



#Employer schema: This schema would define the employer model for the app, including fields like company name, website, logo, and location. Employers can create job listings and manage their applications through this schema.

class Employer(models.Model):
    companyname = models.CharField(max_length=50)
    website = models.CharField(max_length=50)
    logo = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    phone = models.CharField(max_length=50, default='0000000000')
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)


    def __str__(self):
        return self.companyname

#Job listing schema: This schema would define the job listing model for the app, including fields like job title, description, location, salary, and job requirements. Employers can create job listings and manage their applications through this schema.

class JobListing(models.Model):
    jobtitle = models.CharField(max_length=50)
    description = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    salary = models.CharField(max_length=50)
    jobrequirements = models.CharField(max_length=50)
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE)

    def __str__(self):
        return self.jobtitle

#Job seeker schema: This schema would define the job seeker model fJob seekers can create profiles and apply for jobs through this schema.

class JobSeeker(models.Model):
   
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    bio = models.CharField(max_length=250, default='bio')
    location = models.CharField(max_length=50, default='location')
    phone = models.CharField(max_length=50, default='0000000000')
    

    

    def __str__(self):
        return self.name

#Resume schema: This schema would define the resume model for the app, including fields like education, experience, skills, and certifications. Job seekers can upload their resumes to their profiles, and the app can automatically parse and extract relevant information from the resume.

class Resume(models.Model):
    education = models.CharField(max_length=50)
    experience = models.CharField(max_length=50)
    skills = models.CharField(max_length=50)
    certifications = models.CharField(max_length=50)
    jobseeker = models.ForeignKey(JobSeeker, on_delete=models.CASCADE)

    def __str__(self):
        return self.education

#Job application schema: This schema would define the job application model for the app, including fields like application status, application date, and application feedback. Job seekers can track the status of their job applications, receive notifications about their applications, and communicate with employers through this schema.

class JobApplication(models.Model):
    applicationstatus = models.CharField(max_length=50)
    applicationdate = models.CharField(max_length=50)
    applicationfeedback = models.CharField(max_length=50)
    jobseeker = models.ForeignKey(JobSeeker, on_delete=models.CASCADE)
    joblisting = models.ForeignKey(JobListing, on_delete=models.CASCADE)


    def __str__(self):
        return self.applicationstatus

#Payment schema: This schema would define the payment model for the app, including fields like payment date, payment status, and payment amount. Employers can pay for job postings and feature listings using a payment gateway integration.

class Payment(models.Model):
    paymentdate = models.CharField(max_length=50)
    paymentstatus = models.CharField(max_length=50)
    paymentamount = models.CharField(max_length=50)
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE)
    joblisting = models.ForeignKey(JobListing, on_delete=models.CASCADE)

    def __str__(self):
        return self.paymentdate