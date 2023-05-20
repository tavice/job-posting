from django.shortcuts import render, redirect
from rest_framework import viewsets
from .models import Employer, JobListing, JobSeeker, JobApplication, Payment, User
from .serializers import UserSerializer, EmployerSerializer, JobListingSerializer, JobSeekerSerializer, JobApplicationSerializer, PaymentSerializer
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import  status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from rest_framework.serializers import Serializer, CharField

from django.contrib.auth.hashers import make_password
import json
from django.http import JsonResponse


#import custom auth backend for login
#from backend.apis.backend import CustomBackend

#import authentication_backend






# Create your views here.


# UserJob views
# class UserJobViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated]

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
# Login view


##### ======== Login view ======== #####
#====SIMPLE ONE ======#

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            username = body.get('username')
            password = body.get('password')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid request body.'}, status=400)

        if not username or not password:
            return JsonResponse({'error': 'Invalid username or password.'}, status=400)

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful.',
                                    'user_id': user.id,
                                    'username': user.username,
                                    'email': user.email,
                                    #'user_type': user.user_type,
                                 
                
                                 }, status=200)
        else:
            return JsonResponse({'error': 'Invalid credentials.'}, status=401)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)
# class LoginSerializer(Serializer):
#     username = CharField()
#     password = CharField()

# @api_view(['POST'])
# def login_view(request):
#     serializer = LoginSerializer(data=request.data)
#     serializer.is_valid(raise_exception=True)

#     username = serializer.validated_data['username']
#     password = serializer.validated_data['password']

#     user = authenticate(request, username=username, password=password)
#     if user is not None:
#         login(request, user)
#         token, created = Token.objects.get_or_create(user=user)
#         response_data = {
#             'token': token.key,
#             'user': user.id,
#             'message': 'You are logged in.'
#         }
#         return Response(response_data, status=status.HTTP_200_OK)
#     else:
#         return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)


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
    # Retrieve user data from the request
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    user_type = request.data.get('user_type')

    # Check if all required fields are provided
    if username is None or password is None or email is None or first_name is None or last_name is None or user_type is None:
        return Response({'error': 'Please provide all required fields.'}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the username or email already exists
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

    # Create the user
    user = User.objects.create_user(username=username, password=password, email=email, first_name=first_name, last_name=last_name)

    # Check the user_type and create the corresponding model instance
    if user_type == 'E':
        employer = Employer.objects.create(user=user)
        employer.save()
    elif user_type == 'J':
        job_seeker = JobSeeker.objects.create(user=user)
        job_seeker.save()

    return Response({'message': 'User created successfully.'}, status=status.HTTP_201_CREATED)
