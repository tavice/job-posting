from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Employer, JobListing, JobSeeker, Resume, JobApplication, Payment, SavedJob, SavedCandidate



class UserAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'username', 'email', 'first_name', 'last_name',
        'auth_token', 'is_staff', 'is_superuser', 'is_active',
        'date_joined', 'last_login', 'employer', 'jobseeker'
    )

    def employer(self, obj):
        if obj.has_employer():
            print(obj.employer)
            
        else:
            return None

    employer.short_description = 'Company Name'
    employer.admin_order_field = 'employer__companyname'


    def jobseeker(self, obj):
        if obj.has_jobseeker():
            print(obj.jobseeker)
            
        else:
            return None
        
    jobseeker.short_description = 'Jobseeker'
    jobseeker.admin_order_field = 'jobseeker__user__username'

    

class JobListingAdmin(admin.ModelAdmin):
    list_display = ('jobtitle', 'description', 'location', 'salary', 'jobrequirements', 'employer') # 'get_jobseeker_count','get_joblisting', 'get_employer', 'get_jobseeker', 'get_applicationstatus')

    # def get_jobseeker_count(self, obj):
    #     return obj.jobseeker.count()
    # get_jobseeker_count.short_description = 'Jobseeker Count'

    # def get_joblisting(self, obj):
    #     return obj.joblisting.jobtitle
    # get_joblisting.short_description = 'jobtitle'

    # def get_employer(self, obj):
    #     return obj.joblisting.employer
    # get_employer.short_description = 'employer'

    # def get_jobseeker(self, obj):
    #     return obj.jobseeker.jobseeker  
    # get_jobseeker.short_description = 'jobseeker'

    # def get_applicationstatus(self, obj):
    #     return obj.applicationstatus
   # get_applicationstatus.short_description = 'applicationstatus'

class JobSeekerAdmin(admin.ModelAdmin):
    list_display = ('id','get_user',  'user', 'bio', 'location', 'phone',  )
    def get_user(self, obj):
        return obj.user.id
    get_user.short_description = 'user_id (FK)'
    get_user.admin_order_field = 'user__id'

class EmployerAdmin(admin.ModelAdmin):
    list_display = ('companyname', 'website', 'logo', 'location', 'phone', 'user')

class ResumeAdmin(admin.ModelAdmin):
    list_display = ('education', 'experience', 'skills', 'certifications', 'jobseeker')

class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ('job_listing', 'job_seeker', 'application_status','application_date')


class PaymentAdmin(admin.ModelAdmin):
    list_display = ('joblisting', 'jobseeker', 'employer', 'paymentamount')

class SavedJobAdmin(admin.ModelAdmin):
    list_display = ('job_listing', 'job_seeker', 'save_date')

class SavedCandidateAdmin(admin.ModelAdmin):
    list_display = ('employer', 'save_date')        

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Employer, EmployerAdmin)
admin.site.register(JobListing, JobListingAdmin)
admin.site.register(JobSeeker, JobSeekerAdmin)
admin.site.register(Resume, ResumeAdmin)
admin.site.register(JobApplication, JobApplicationAdmin)
admin.site.register(Payment, PaymentAdmin)
admin.site.register(SavedJob, SavedJobAdmin)
admin.site.register(SavedCandidate, SavedCandidateAdmin)
