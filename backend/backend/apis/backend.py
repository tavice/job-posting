from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model

from job.models import UserJob

class CustomBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = UserJob.objects.get(username=username)
            print('user is', user)
            print('password is', password)
            print('user.password is', user.password)
            #check if username and password match, return user if they do
            if user.check_password(password):
                return user
        except UserJob.DoesNotExist:
            return None

        return None
