from django.contrib import admin
from .models import User, Employer, JobListing, JobSeeker, Resume,  JobApplication, Payment

class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'password', 'isemployer', 'isjobseeker')

class JobListingAdmin(admin.ModelAdmin):
    list_display = ('jobtitle', 'description', 'location', 'salary', 'jobrequirements', 'employer')

class JobSeekerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'location', 'user')

class EmployerAdmin(admin.ModelAdmin):
    list_display = ('companyname', 'website', 'logo', 'location', 'phone', 'user')

class ResumeAdmin(admin.ModelAdmin):
    list_display = ('education', 'experience', 'skills', 'certifications', 'jobseeker')

class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ('joblisting', 'jobseeker', 'employer', 'status')

class PaymentAdmin(admin.ModelAdmin):
    list_display = ('joblisting', 'jobseeker', 'employer', 'amount')


# Register your models here.

admin.site.register(User)
admin.site.register(Employer)
admin.site.register(JobListing)
admin.site.register(JobSeeker)
admin.site.register(Resume)
admin.site.register(JobApplication)
admin.site.register(Payment)
