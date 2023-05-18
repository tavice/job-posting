from django.shortcuts import render, redirect
from rest_framework import viewsets
from .models import Employer, JobListing, JobSeeker, JobApplication, Payment, UserJob
from .serializers import UserJobSerializer, EmployerSerializer, JobListingSerializer, JobSeekerSerializer, JobApplicationSerializer, PaymentSerializer
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User


#import crsf



# Create your views here.


# UserJob views
class UserJobViewSet(viewsets.ModelViewSet):
    queryset = UserJob.objects.all()
    serializer_class = UserJobSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

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

# Login view
@api_view(['POST'])
def login_view(request):
    print(request.data)
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        print('user is', user)
        print(request)
        token, created = Token.objects.get_or_create(user=user)

        print(token)
         # save the token to local storage
        response = Response({'token': token.key, 
                             'user': UserJobSerializer(user).data,
                             #'employer': EmployerSerializer(user.employer).data,
                             #'job_seeker': JobSeekerSerializer(user.job_seeker).data,
                             'message': 'You are logged in.'})
        response.set_cookie('token', token.key)

        #Save authenticated user to session
        print('user id is', user.id)

        request.session['authenticated_user'] = user.id  

        return response
    else:
        return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

# Logout view
# @api_view(['POST'])
# #@permission_classes([permissions.IsAuthenticated])
# def logout_view(request):
#     print(request.user)
#     # if request.user.is_authenticated:
#     # request.user.auth_token.delete()
#     logout(request)
#     response = Response({'message': 'You are logged out.'})
#     # csrf_token = csrf.get_token(request)
#     # response.set_cookie('csrftoken', csrf_token)
#     return response
#     # else:
#     #     return Response({'error': 'You are not authenticated.'}, status=status.HTTP_401_UNAUTHORIZED)


#Simple logout view
@api_view(['POST'])
def logout_view(request):
    user = request.session.get('authenticated_user')
    print(user)
    if user is None:
        logout(request)
        response = Response({'message': 'You are logged out.'})
        return response
    else:
        return Response({'error': 'You are not authenticated.'}, status=status.HTTP_401_UNAUTHORIZED)


# Register view
@api_view(['POST'])
def register_view(request):
    print(request.data)
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    user_type = request.data.get('user_type')
    print('user type is', user_type)
    if username is None or password is None or email is None or first_name is None or last_name is None or user_type is None:
        return Response({'error': 'Please provide all required fields.'}, status=status.HTTP_400_BAD_REQUEST)
    if UserJob.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)
    if UserJob.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists.'}, status=status.HTTP_400_BAD_REQUEST)
    userjob = UserJob.objects.create_user(username=username, password=password, email=email, first_name=first_name, last_name=last_name)
    if user_type == 'E':
        employer = Employer.objects.create(userjob=userjob)
        employer.save()
    elif user_type == 'J':
        job_seeker = JobSeeker.objects.create(userjob=userjob)
        job_seeker.save()
    return Response({'message': 'User created successfully.'}, status=status.HTTP_201_CREATED)
