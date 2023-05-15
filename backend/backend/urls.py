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
from job import views
from rest_framework.authtoken.views import ObtainAuthToken

from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'employers', views.EmployerViewSet)
router.register(r'joblistings', views.JobListingViewSet)
router.register(r'jobseekers', views.JobSeekerViewSet)
router.register(r'jobapplications', views.JobApplicationViewSet)
router.register(r'payments', views.PaymentViewSet)
router.register(r'users', views.UserViewSet)



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')), #this is for the browsable API
    path('api/login/', views.login_view, name='login_view'),
    path('api/logout/', views.logout_view, name='logout_view'),
    path('api-token-auth/', ObtainAuthToken.as_view()),
]
