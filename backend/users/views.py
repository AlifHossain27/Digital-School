from rest_framework import views, response, exceptions, status
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied
from .serializers import AdminSerializer, StaffSerializer, TeacherSerializer, StudentSerializer
from .models import Admin, Staff, Teacher, Student
from . import services
from .permissions import IsAdministrator, IsStaff
from .authentication import Authentication


# Signup
class AdminSignupAPI(views.APIView):
    def post(self, request):
        serializer = AdminSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data
        serializer.instance = services.create_admin(admin_dc = data)
        return response.Response(data = serializer.data)
    
class StaffSignupAPI(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsAdministrator]

    def post(self, request):
        serializer = StaffSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data
        serializer.instance = services.create_staff(staff_dc = data)
        return response.Response(data=serializer.data)

class TeacherSignupAPI(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsAdministrator | IsStaff]

    def post(self, request):
        serializer = TeacherSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data
        serializer.instance = services.create_teacher(teacher_dc = data)
        return response.Response(data=serializer.data)
    
class StudentSignupAPI(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsAdministrator | IsStaff]

    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data
        serializer.instance = services.create_student(student_dc = data)
        return response.Response(data=serializer.data)


# Login
class AdminLoginAPI(views.APIView):
    def post(self, request):
        uid= request.data["uid"]
        password = request.data["password"]

        user = services.admin_selector(uid = uid)

        if user is None:
            raise exceptions.AuthenticationFailed("Invalid uid or password")
        if not user.check_password(raw_password=password):
            raise exceptions.AuthenticationFailed("Invalid uid or password")
        
        token = services.create_token(user_id= user.id, user_type= "admin")
        resp = response.Response()
        resp.set_cookie(key= "jwt", value= token, httponly= True)
        return resp

class StaffLoginAPI(views.APIView):
    def post(self, request):
        uid= request.data["uid"]
        password = request.data["password"]

        user = services.staff_selector(uid = uid)

        if user is None:
            raise exceptions.AuthenticationFailed("Invalid uid or password")
        if not user.check_password(raw_password=password):
            raise exceptions.AuthenticationFailed("Invalid uid or password")
        
        token = services.create_token(user_id= user.id, user_type= "staff")
        resp = response.Response()
        resp.set_cookie(key= "jwt", value= token, httponly= True)
        return resp
    
class TeacherLoginAPI(views.APIView):
    def post(self, request):
        uid= request.data["uid"]
        password = request.data["password"]

        user = services.teacher_selector(uid = uid)

        if user is None:
            raise exceptions.AuthenticationFailed("Invalid uid or password")
        if not user.check_password(raw_password=password):
            raise exceptions.AuthenticationFailed("Invalid uid or password")
        
        token = services.create_token(user_id= user.id, user_type= "teacher")
        resp = response.Response()
        resp.set_cookie(key= "jwt", value= token, httponly= True)
        return resp

class StudentLoginAPI(views.APIView):
    def post(self, request):
        uid= request.data["uid"]
        password = request.data["password"]

        user = services.student_selector(uid = uid)

        if user is None:
            raise exceptions.AuthenticationFailed("Invalid uid or password")
        if not user.check_password(raw_password=password):
            raise exceptions.AuthenticationFailed("Invalid uid or password")
        
        token = services.create_token(user_id= user.id, user_type= "student")
        resp = response.Response()
        resp.set_cookie(key= "jwt", value= token, httponly= True)
        return resp


# Get User
class UserAPI(views.APIView):
    authentication_classes = [Authentication]

    def get(self, request):
        try:
            user = request.user

            if isinstance(user, Admin):
                serializer_class = AdminSerializer
            elif isinstance(user, Staff):
                serializer_class = StaffSerializer
            elif isinstance(user, Teacher):
                serializer_class = TeacherSerializer
            elif isinstance(user, Student):
                serializer_class = StudentSerializer
            else:
                raise ValueError("Invalid user type")

            serializer = serializer_class(user)
            data = serializer.data
            return response.Response(data)
        except PermissionDenied as e:
            return response.Response({'error': str(e)}, status=status.HTTP_403_FORBIDDEN)
        except AuthenticationFailed as e:
            return response.Response({'error': str(e)}, status=status.HTTP_401_UNAUTHORIZED)


# Logout
class LogoutAPI(views.APIView):
    authentication_classes = [Authentication]

    def post(self, request):
        if request.user.is_authenticated():
            resp = response.Response()
            resp.delete_cookie("jwt")
            resp.data = {"message": "Logout successful"}
        else:
            resp = response.Response({"detail": "User is not authenticated"}, status=401)

        return resp