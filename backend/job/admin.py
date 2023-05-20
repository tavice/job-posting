from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Employer, JobListing, JobSeeker, Resume, JobApplication, Payment

class UserAdmin(UserAdmin):
    list_display = ('username', 'email', 'userjob_type_choices')

#class UserJobAdmin(admin.ModelAdmin):
 #   list_display = ('username', 'email', 'userjob_type_choices')

class JobListingAdmin(admin.ModelAdmin):
    list_display = ('jobtitle', 'description', 'location', 'salary', 'jobrequirements', 'employer', 'get_jobseeker_count','get_joblisting', 'get_employer', 'get_jobseeker', 'get_applicationstatus')

    def get_jobseeker_count(self, obj):
        return obj.jobseeker.count()
    get_jobseeker_count.short_description = 'Jobseeker Count'

    def get_joblisting(self, obj):
        return obj.joblisting.jobtitle
    get_joblisting.short_description = 'joblisting'

    def get_employer(self, obj):
        return obj.joblisting.employer
    get_employer.short_description = 'employer'

    def get_jobseeker(self, obj):
        return obj.jobseeker.jobseeker  
    get_jobseeker.short_description = 'jobseeker'

    def get_applicationstatus(self, obj):
        return obj.applicationstatus
    get_applicationstatus.short_description = 'applicationstatus'

class JobSeekerAdmin(admin.ModelAdmin):
    list_display = ('bio', 'location', 'phone', 'user')

class EmployerAdmin(admin.ModelAdmin):
    list_display = ('companyname', 'website', 'logo', 'location', 'phone', 'user')

class ResumeAdmin(admin.ModelAdmin):
    list_display = ('education', 'experience', 'skills', 'certifications', 'jobseeker')

class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ('joblisting', 'jobseeker', 'get_employer', 'applicationstatus')

    def get_employer(self, obj):
        return obj.joblisting.employer
    get_employer.short_description = 'employer'

class PaymentAdmin(admin.ModelAdmin):
    list_display = ('joblisting', 'jobseeker', 'employer', 'paymentamount')

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Employer, EmployerAdmin)
admin.site.register(JobListing, JobListingAdmin)
admin.site.register(JobSeeker, JobSeekerAdmin)
admin.site.register(Resume, ResumeAdmin)
admin.site.register(JobApplication, JobApplicationAdmin)
admin.site.register(Payment, PaymentAdmin)
