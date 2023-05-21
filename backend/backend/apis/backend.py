from typing import Optional, Set
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.hashers import check_password
from django.db.models.base import Model
from rest_framework.authtoken.models import Token

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
    
  
    
    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
    
    def get_or_create_user(self, username, email, password=None):
        try:
            user = User.objects.get(username=username)
            print('user is', user)
            print('password is', password)
            
            return user
        except User.DoesNotExist:
            user = User.objects.create_user(username=username, email=email, password=password)
            return user
        return None
    
    def get_or_create_token(self, user):
        try:
            token = Token.objects.get(user=user)
            return token
        except Token.DoesNotExist:
            token = Token.objects.create(user=user)
            return token
        return None  
    
        


    
  
    
