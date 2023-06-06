from rest_framework import serializers
from .models import Employer, JobListing, JobSeeker, JobApplication, Payment, User, SavedJob, Resume, SavedCandidate
from rest_framework_simplejwt.tokens import RefreshToken

#Serializer we will use for get requests and or to display data
class UserSerializer(serializers.ModelSerializer):
    #jobseeker = serializers.PrimaryKeyRelatedField(read_only=True) #this is the field that will be used to display the jobseeker id if it exists
    #employer = serializers.PrimaryKeyRelatedField(read_only=True) #this is the field that will be used to display the employer id if it exists

    class Meta:
        model = User
        fields = '__all__'
        #fields = ['id', 'username', 'email', 'jobseeker', 'employer']



class EmployerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employer
        fields = '__all__'

class JobListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobListing
        fields = '__all__'

class JobSeekerSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobSeeker
        fields = '__all__'

class JobApplicationSerializer(serializers.ModelSerializer):
    job_seeker = serializers.PrimaryKeyRelatedField(queryset=JobSeeker.objects.all())
    job_listing = serializers.PrimaryKeyRelatedField(queryset=JobListing.objects.all())
    class Meta:
        model = JobApplication
        fields = ['id', 'job_seeker', 'job_listing', 'application_status', 'application_date', 'application_feedback']

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class SavedJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedJob
        fields = '__all__' 

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = '__all__'  

class SavedCandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedCandidate
        fields = '__all__'                     

#Serializer we will use for update (PUT) requests
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name', 'user_type']
        extra_kwargs = {
            'password': {'write_only': True},  # Password should not be returned in response
            
        }

#Serializer we will use for create (POST) requests
class UserRegistrationSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=128, write_only=True)
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField(max_length=255)
    first_name = serializers.CharField(max_length=30, required=False)
    last_name = serializers.CharField(max_length=150, required=False)
    user_type = serializers.ChoiceField(choices=[("E", "Employer"), ("J", "Job Seeker")])
    bio = serializers.CharField(max_length=250, required=False)  # Additional field for Job Seeker
    location = serializers.CharField(max_length=50, required=False)  # Additional field for both Job Seeker and Employer
    companyname = serializers.CharField(max_length=50, required=False)  # Additional field for Employer
    website = serializers.CharField(max_length=50, required=False)  # Additional field for Employer

    def create(self, validated_data):
        # Create the user model instance
        user = User.objects.create_user(**validated_data)

        # Get the additional fields from validated_data
        bio = validated_data.get("bio")
        location = validated_data.get("location")
        companyname = validated_data.get("companyname")
        website = validated_data.get("website")

        # Create the corresponding model instance based on user_type
        user_type = validated_data.get("user_type")
        if user_type == "E":
            Employer.objects.create(
                user=user,
                companyname=companyname,
                website=website,
                location=location,
            )
        elif user_type == "J":
            JobSeeker.objects.create(
                user=user,
                bio=bio,
                location=location,
            )

        return user 


