from django.shortcuts import render, redirect
from rest_framework import viewsets
from .models import Employer, JobListing, JobSeeker, JobApplication, Payment, User
from .serializers import (
    UserSerializer,
    EmployerSerializer,
    JobListingSerializer,
    JobSeekerSerializer,
    JobApplicationSerializer,
    PaymentSerializer,
    UserUpdateSerializer,
    UserRegistrationSerializer,
)
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.core.exceptions import PermissionDenied, BadRequest
from django.views.decorators.http import require_POST


from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny

from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from rest_framework.authtoken.models import Token
from django.contrib.auth.decorators import login_required
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_protect


from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication





import json
from django.http import JsonResponse


# import custom auth backend for login
from backend.apis.backend import CustomBackend

# import authentication_backend


# Create your views here.


#UserJob views
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


# Login view
# Login view


##### ======== Login view ======== #####



from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()  # Access the user model


@require_POST
@csrf_exempt
 # Allow any user, including unauthenticated users, to access this endpoint
def login_view(request):
    try:
        body = json.loads(request.body)
        username = body.get("username")
        password = body.get("password")
    except BadRequest:
        return JsonResponse({"error": "Invalid request body."}, status=400)

    if not username or not password:
        return JsonResponse({"error": "Invalid username or password."}, status=400)

    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        print("user logged in is", user)

        # Get or create the token for the user
        
        token, created = Token.objects.get_or_create(user=user)
        if created:
            print("token created")
        if token is None:
            return JsonResponse({"error": "Failed to create token."}, status=500)
        
        print("token is", token)

        #get the user object to determine user type
        user = User.objects.get(id=user.id)
        employer = Employer.objects.filter(user=user)
        print(employer)
        jobseeker = JobSeeker.objects.filter(user=user)
        print(jobseeker)
        # Determine user type based on associated models
       
        if employer:
            user_type = "E"
            employer_id = employer[0].id
            jobseeker_id = None
        elif jobseeker:
            user_type = "J"
            jobseeker_id = jobseeker[0].id
            employer_id = None
        else:
            PermissionDenied("User does not have a user type.")

        print("user type is", user_type)

        # Set the  token as a cookie in the response
        response = JsonResponse(
            {
                "message": "Login successful.",
                "user": UserSerializer(user).data,
                "data": {
                    "user_id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "userjob_type": user_type,
                    "employer_id": employer_id,
                    "jobseeker_id": jobseeker_id,
                  
                },
                "token": token.key,
                
            },
            status=200,
        )
        response.set_cookie("token", token.key, httponly=True)
        print(UserSerializer(user).data)
        return response
    else:
        return HttpResponse("Invalid credentials.", status=401)

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


##### ======== Logout view ======== #####
@api_view(["POST"])
def logout_view(request):
    print(request.user)
    if request.user.is_authenticated:
        # Get the user's token
        try:
            token = Token.objects.get(user=request.user)
            token.delete()  # Delete the token
        except Token.DoesNotExist:
            pass

        logout(request)
        return Response({"message": "You are logged out."})
    else:
        return Response({"error": "You are not authenticated."}, status=status.HTTP_401_UNAUTHORIZED)


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


# Simple logout view
# @api_view(["POST"])
# def logout_view(request):
#     print(request.user)
#     if request.user.is_authenticated:
#         logout(request)
#         return Response({"message": "You are logged out."})
#     else:
#         return Response({"error": "You are not authenticated."}, status=status.HTTP_401_UNAUTHORIZED)





# Register view

@api_view(["POST"])
def register_view(request):
    print('request is', request.data)
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        # Extract user registration data from the serializer
        username = serializer.validated_data.get("username")
        password = serializer.validated_data.get("password")
        email = serializer.validated_data.get("email")
        first_name = serializer.validated_data.get("first_name")
        last_name = serializer.validated_data.get("last_name")
        user_type = serializer.validated_data.get("user_type")
        bio = serializer.validated_data.get("bio")  # Additional field for Job Seeker
        location = serializer.validated_data.get("location")  # Additional field for both Job Seeker and Employer
        companyname = serializer.validated_data.get("companyname")  # Additional field for Employer
        website = serializer.validated_data.get("website")  # Additional field for Employer

        # Check if the username or email already exists
        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "Username already exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "Email already exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Create the user with the provided registration data
        user = User.objects.create_user(
            username=username,
            password=password,
            email=email,
            first_name=first_name,
            last_name=last_name,
        )

        # Create an authentication token for the user
        token = Token.objects.create(user=user)
        print('token is', token)

        # Create a Job Seeker or Employer profile based on the user type
        if user_type == "E":
            employer = Employer.objects.create(
                user=user,
                companyname=companyname,
                website=website,
                location=location,
            )
        elif user_type == "J":
            job_seeker = JobSeeker.objects.create(
                user=user,
                bio=bio,
                location=location,
            )

        user_serializer = UserSerializer(user)
        print('user serializer is', user_serializer.data)
        return Response(
            {"message": "User created successfully.", 
             "user": user_serializer.data,
             "token": token.key,
             },
            status=status.HTTP_201_CREATED,
        )
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




#Update User
@csrf_protect
@api_view(["PUT"])
def update_user(request, pk):


    print('request user is ', request.user)
    print('pk is', pk)
    # Retrieve the user from the database
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    # Check if the user is the same as the authenticated user
    if request.user != user:
        return Response(
            {"error": "You don't have permission to edit this user."},
            status=status.HTTP_403_FORBIDDEN,
        )

    # Create an instance of the UserUpdateSerializer with the user and request.data
    serializer = UserUpdateSerializer(user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User updated successfully."}, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)