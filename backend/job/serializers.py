from rest_framework import serializers
from .models import Employer, JobListing, JobSeeker, JobApplication, Payment, User

#Serializer we will use for get requests and or to display data
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


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
    class Meta:
        model = JobApplication
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

#Serializer we will use for update (PUT) requests
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name', 'user_type']
        extra_kwargs = {
            'password': {'write_only': True},  # Password should not be returned in response
            
        }
