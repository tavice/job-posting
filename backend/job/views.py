from django.shortcuts import render
from rest_framework import viewsets
from .models import Employer, JobListing, JobSeeker, JobApplication, Payment, User
from .serializers import UserSerializer, EmployerSerializer, JobListingSerializer, JobSeekerSerializer, JobApplicationSerializer, PaymentSerializer

# User views
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Employer views
class EmployerViewSet(viewsets.ModelViewSet):
    queryset = Employer.objects.all()
    serializer_class = EmployerSerializer

# Job listing views
class JobListingViewSet(viewsets.ModelViewSet):
    queryset = JobListing.objects.all()
    serializer_class = JobListingSerializer

# Job seeker views
class JobSeekerViewSet(viewsets.ModelViewSet):
    queryset = JobSeeker.objects.all()
    serializer_class = JobSeekerSerializer

# Job application views
class JobApplicationViewSet(viewsets.ModelViewSet):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer

# Payment views
class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
