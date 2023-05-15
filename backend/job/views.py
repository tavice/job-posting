from django.shortcuts import render, redirect
from rest_framework import viewsets
from .models import Employer, JobListing, JobSeeker, JobApplication, Payment, User
from .serializers import UserSerializer, EmployerSerializer, JobListingSerializer, JobSeekerSerializer, JobApplicationSerializer, PaymentSerializer
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


#import crsf



# Create your views here.


# User views
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
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
                             'user': UserSerializer(user).data,
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



   
