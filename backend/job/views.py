from django.shortcuts import render, redirect
from rest_framework import viewsets
from .models import Employer, JobListing, JobSeeker, JobApplication, Payment, User, SavedJob, Resume, SavedCandidate
from .serializers import (
    UserSerializer,
    EmployerSerializer,
    JobListingSerializer,
    JobSeekerSerializer,
    JobApplicationSerializer,
    PaymentSerializer,
    UserUpdateSerializer,
    UserRegistrationSerializer,
    SavedJobSerializer,
    ResumeSerializer,
    SavedCandidateSerializer,
)
#django imports
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.core.exceptions import PermissionDenied, BadRequest
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_protect



# rest_framework imports
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny

from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from rest_framework.authtoken.models import Token


from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication

# other imports
from datetime import datetime
import json
from django.http import JsonResponse
from django.core.mail import send_mail



# import custom auth backend for login
from backend.apis.backend import CustomBackend

# import authentication_backend


# Create your views here.


# UserJob views
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    #update user
    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            print("Existing data:", instance)  # current status of the job application
            print("Request data:", request.data)  # what is being sent in the request status of the application
            serializer = self.get_serializer(instance, data=request.data)
            # print("Serializer data:", serializer)  # check the serializer data
            serializer.is_valid(raise_exception=True)
            print("Validated data:", serializer.validated_data)  # check the validated data
            print("Validation errors:", serializer.errors)
            serializer.save()
            print("Updated data:", serializer.validated_data)  # print the updated data
            return Response(serializer.validated_data)
        except BadRequest:
            return JsonResponse({"error": "Invalid request"})
        except PermissionDenied:
            return JsonResponse({"error": "Permission denied"})
        except Exception as e:
            print("Save error:", str(e))

    #delete user
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            print("Existing data:", instance)  # current status of the job application
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except BadRequest:
            return JsonResponse({"error": "Invalid request"})
        except PermissionDenied:
            return JsonResponse({"error": "Permission denied"})
        except Exception as e:
            print("Save error:", str(e))        


# Employer views
class EmployerViewSet(viewsets.ModelViewSet):
    queryset = Employer.objects.all()
    serializer_class = EmployerSerializer


# Job listing views
class JobListingViewSet(viewsets.ModelViewSet):
    queryset = JobListing.objects.all()
    serializer_class = JobListingSerializer

    #update job listing
    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            print("Existing data:", instance)  # current status of the job application
            print("Request data:", request.data)  # what is being sent in the request status of the application
            serializer = self.get_serializer(instance, data=request.data)
            # print("Serializer data:", serializer)  # check the serializer data
            serializer.is_valid(raise_exception=True)
            print("Validated data:", serializer.validated_data)  # check the validated data
            print("Validation errors:", serializer.errors)
            serializer.save()
            print("Updated data:", serializer.validated_data)  # print the updated data
            return Response(serializer.validated_data)
        except BadRequest:
            return JsonResponse({"error": "Invalid request"})
        except PermissionDenied:
            return JsonResponse({"error": "Permission denied"})
        except Exception as e:
            print("Save error:", str(e))


# Job seeker views
class JobSeekerViewSet(viewsets.ModelViewSet):
    queryset = JobSeeker.objects.all()
    serializer_class = JobSeekerSerializer


# Job application views
class JobApplicationViewSet(viewsets.ModelViewSet):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            print("Existing data:", instance)  # current status of the job application
            print("Request data:", request.data)  # what is being sent in the request status of the application
            serializer = self.get_serializer(instance, data=request.data)
            # print("Serializer data:", serializer)  # check the serializer data
            serializer.is_valid(raise_exception=True)
            print("Validated data:", serializer.validated_data)  # check the validated data
            print("Validation errors:", serializer.errors)
            serializer.save()
            print("Updated data:", serializer.validated_data)  # print the updated data
            return Response(serializer.validated_data)
        except BadRequest:
            return JsonResponse({"error": "Invalid request"})
        except PermissionDenied:
            return JsonResponse({"error": "Permission denied"})
        except Exception as e:
            print("Save error:", str(e))  # print any error during saving
            return JsonResponse({"error": str(e)})
        return Response(serializer.validated_data)

    

# Payment views
class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer


# Saved job views
class SavedJobViewSet(viewsets.ModelViewSet):
    queryset = SavedJob.objects.all()
    serializer_class = SavedJobSerializer    


# Resume views
class ResumeViewSet(viewsets.ModelViewSet):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer


# Saved candidate views
class SavedCandidateViewSet(viewsets.ModelViewSet):
    queryset = SavedCandidate.objects.all()
    serializer_class = SavedCandidateSerializer


# ===================================================================================================
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

        # get the user object to determine user type
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


# ===================================================================================================
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
        return Response(
            {"error": "You are not authenticated."}, status=status.HTTP_401_UNAUTHORIZED
        )


# ===================================================================================================
# Register view


@api_view(["POST"])
def register_view(request):
    print("request is", request.data)
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
        location = serializer.validated_data.get(
            "location"
        )  # Additional field for both Job Seeker and Employer
        companyname = serializer.validated_data.get(
            "companyname"
        )  # Additional field for Employer
        website = serializer.validated_data.get(
            "website"
        )  # Additional field for Employer

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
        print("token is", token)

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
        print("user serializer is", user_serializer.data)
        return Response(
            {
                "message": "User created successfully.",
                "user": user_serializer.data,
                "token": token.key,
            },
            status=status.HTTP_201_CREATED,
        )
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ===================================================================================================
# Update User
# @csrf_protect
# @api_view(["PUT"])
# def update_user(request, pk):
#     print("request user is ", request.user)
#     print("pk is", pk)
#     # Retrieve the user from the database
#     try:
#         user = User.objects.get(pk=pk)
#     except User.DoesNotExist:
#         return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

#     # Check if the user is the same as the authenticated user
#     if request.user != user:
#         return Response(
#             {"error": "You don't have permission to edit this user."},
#             status=status.HTTP_403_FORBIDDEN,
#         )

#     # Create an instance of the UserUpdateSerializer with the user and request.data
#     serializer = UserUpdateSerializer(user, data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(
#             {"message": "User updated successfully."}, status=status.HTTP_200_OK
#         )
#     else:
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ===================================================================================================
# Delete User
@csrf_protect
@api_view(["DELETE"])
def delete_user(request, pk):
    print("request user is ", request.user)
    print("pk is", pk)
    # Retrieve the user from the database
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    # Check if the user is the same as the authenticated user
    if request.user != user:
        return Response(
            {"error": "You don't have permission to delete this user."},
            status=status.HTTP_403_FORBIDDEN,
        )

    # Delete the user
    user.delete()
    return Response(
        {"message": "User deleted successfully."}, status=status.HTTP_200_OK
    )


# ===================================================================================================
# Apply for a job
@api_view(["POST"])
def apply_for_job_view(request):
    try:
        print("request is", request.data)

        # Extract the job id and job seeker id from the request data
        job_id = request.data.get("job_id")
        job_seeker_id = request.data.get("job_seeker_id")

        print("job id is", job_id)
        print("job seeker id is", job_seeker_id)

        # Retrieve the job and job seeker from the database
        try:
            job = JobListing.objects.get(pk=job_id)
            print("job is", job)
            job_seeker = JobSeeker.objects.get(pk=job_seeker_id)
            print("job seeker is", job_seeker)
        except JobListing.DoesNotExist:
            print("Job not found.")
            return Response({"error": "Job not found."}, status=status.HTTP_404_NOT_FOUND)
        except JobSeeker.DoesNotExist:
            print("Job seeker not found.")
            return Response({"error": "Job seeker not found."}, status=status.HTTP_404_NOT_FOUND)

        # Check if the job seeker has already applied for the job
        if JobApplication.objects.filter(job_listing=job, job_seeker=job_seeker).exists():
            print("You have already applied for this job.")
            return Response(
                {"error": "You have already applied for this job."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:
            # Create a new job application
            job_application = JobApplication.objects.create(
                job_listing=job, job_seeker=job_seeker
            )
    
            print("job application is", job_application)

            # Send a message to the employer https://docs.djangoproject.com/en/4.2/topics/email/
            # message = f"{job_seeker.user.first_name} {job_seeker.user.last_name} has applied for your job listing: {job.jobtitle}."
            # print("message is", message)
            # send_mail(
            #     "Job Board - Job Application Received ",
            #     message,
            #     job_seeker.user.email,
            #     [job.employer.user.email],
            #     fail_silently=False,

            # )
            #nned to get smtp server setup
    
            return Response({"success": "Job application created."}, status=status.HTTP_201_CREATED)

    except Exception as e:
        print("An error occurred:", str(e))
        return Response({"error": "An error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




# ===================================================================================================
# Save job

@api_view(["POST"])
def save_job_view(request):
    try:
        print("request is", request.data)

        # Extract the job id and job seeker id from the request data
        job_id = request.data.get("job_id")
        job_seeker_id = request.data.get("job_seeker_id")

        print("job id is", job_id)
        print("job seeker id is", job_seeker_id)

        # Retrieve the job and job seeker from the database
        try:
            job = JobListing.objects.get(pk=job_id)
            print("job is", job)
            job_seeker = JobSeeker.objects.get(pk=job_seeker_id)
            print("job seeker is", job_seeker)
        except JobListing.DoesNotExist:
            print("Job not found.")
            return Response({"error": "Job not found."}, status=status.HTTP_404_NOT_FOUND)
        except JobSeeker.DoesNotExist:
            print("Job seeker not found.")
            return Response({"error": "Job seeker not found."}, status=status.HTTP_404_NOT_FOUND)

        # Check if the job seeker has already saved the job
        if SavedJob.objects.filter(job_listing=job, job_seeker=job_seeker).exists():
            print("You have already saved this job.")
            return Response(
                {"error": "You have already saved this job."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:
            # Create a new saved job
            saved_job = SavedJob.objects.create(
                job_listing=job, job_seeker=job_seeker
            )
    
            print("saved job is", saved_job)

    
            return Response({"success": "Job saved."}, status=status.HTTP_201_CREATED)

    except Exception as e:
        print("An error occurred:", str(e))
        return Response({"error": "An error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

# ===================================================================================================
# Unsave job

#WILL WORK ON THIS LATER

# @api_view(["POST"])
# def unsave_job_view(request):


# ===================================================================================================
# Create resume for job seeker
#see serializer 



# ===================================================================================================
#Save canadidate for the employer
@api_view(["POST"])
def save_candidate_view(request):
    try:
        print("request is", request.data)

        # Extract the job id and job seeker id from the request data
        job_seeker_id = request.data.get("job_seeker_id")
        employer_id = request.data.get("employer_id")

        print("job seeker id is", job_seeker_id)
        print("employer id is", employer_id)

        # Retrieve the job and job seeker from the database
        try:
            job_seeker = JobSeeker.objects.get(pk=job_seeker_id)
            print("job seeker is", job_seeker)
            employer = Employer.objects.get(pk=employer_id)
            print("employer is", employer)
        except JobSeeker.DoesNotExist:
            print("Job seeker not found.")
            return Response({"error": "Job seeker not found."}, status=status.HTTP_404_NOT_FOUND)
        except Employer.DoesNotExist:
            print("Employer not found.")
            return Response({"error": "Employer not found."}, status=status.HTTP_404_NOT_FOUND)

        # Check if the employer has already saved the job seeker
        if SavedCandidate.objects.filter(job_seeker=job_seeker, employer=employer).exists():
            print("You have already saved this job seeker.")
            return Response(
                {"error": "You have already saved this job seeker."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:
            # Create a new saved job seeker
            saved_candidate = SavedCandidate.objects.create(
                job_seeker=job_seeker, employer=employer
            )
    
            print("saved candidate is", saved_candidate)

    
            return Response({"success": "Job seeker saved."}, status=status.HTTP_201_CREATED)

    except Exception as e:
        print("An error occurred:", str(e))
        return Response({"error": "An error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


   
  


    



   
    
      