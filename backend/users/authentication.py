from django.conf import settings
from rest_framework import authentication
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied
import jwt
from .models import Admin, Staff, Teacher, Student
    
class Authentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed("Authentication credentials were not provided")

        try:
            payload = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token has expired")
        except jwt.InvalidTokenError:
            raise AuthenticationFailed("Invalid token")
        
        user_type = payload.get('user_type')
        user = None

        if user_type == 'admin':
            user = Admin.objects.filter(id=payload['id']).first()
        elif user_type == 'staff':
            user = Staff.objects.filter(id=payload['id']).first()
        elif user_type == 'teacher':
            user = Teacher.objects.filter(id=payload['id']).first()
        elif user_type == 'student':
            user = Student.objects.filter(id=payload['id']).first()

        if not user:
            raise PermissionDenied("You are not authorized to access this resource")

        return (user, None)