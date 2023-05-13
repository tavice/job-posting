#from .models import User, Employer, JobListing, JobSeeker, Resume,  JobApplication, Payment

from django.contrib.auth import get_user_model
import random

User = get_user_model()

for i in range(20):
    user = User.objects.create_user(
        username=f'user{i}',
        email=f'user{i}@example.com',
        password='password',
        user_type=random.choice(['E', 'J'])
    )

    ####WIll COME BACL LATER TO ADD MORE DATA TO THE SEED FILE

