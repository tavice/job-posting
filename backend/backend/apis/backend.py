from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password

from job.models import User

class CustomBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = User.objects.get(username=username)
            print('user is', user)
            print('password is', password)
            print('user.password is', user.password)
            #check if username and password match, return user if they do
            if check_password(password, user.password):
                return user
        except User.DoesNotExist:
            return None

        return None
