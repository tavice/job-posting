"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from job import views
from generator import views as generator_views
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken import views as rest_framework_views
from django.contrib.auth.views import LoginView

from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'employers', views.EmployerViewSet)
router.register(r'joblistings', views.JobListingViewSet)
router.register(r'jobseekers', views.JobSeekerViewSet)
router.register(r'jobapplications', views.JobApplicationViewSet)
router.register(r'payments', views.PaymentViewSet)
router.register(r'user', views.UserViewSet)
router.register(r'savedjobs', views.SavedJobViewSet)
router.register(r'resume', views.ResumeViewSet)
router.register(r'savedcandidates', views.SavedCandidateViewSet)





urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', (include(router.urls))),
    #path('accounts/login/', LoginView.as_view(), name='login'),
    path('api/login/', csrf_exempt(views.login_view), name='login_view'),
    path('api/logout/', csrf_exempt(views.logout_view), name='logout_view'),
    path('api/register/', csrf_exempt(views.register_view), name='register_view'),
    #path('api/update/<int:pk>/', csrf_exempt(views.update_user), name='update_view'), #STILL NEED TO WORK ON THAT
    #path('api/delete/<int:pk>/', csrf_exempt(views.delete_user), name='delete_view'), #STILL NEED TO WORK ON THAT 
    path('generator/', include('generator.urls')),
    path('api/apply-for-job/', csrf_exempt(views.apply_for_job_view), name='apply_for_job'),
    path('api/save-job/', csrf_exempt(views.save_job_view), name='save_job'),
    path('api/save-candidate/', csrf_exempt(views.save_candidate_view), name='save_candidate'),

]
