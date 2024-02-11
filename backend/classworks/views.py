from rest_framework import views, response, status
from .serializers import TeacherProfileSerializer, StudentProfileSerializer, ClassworkSerializer, CreateClassworkSerializer
from . import services
from users.permissions import IsAdministrator, IsStaff, IsTeacher, IsStudent
from users.authentication import Authentication

# Create Classwork View
class CreateClasswork(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsTeacher]
    def post(self, request):
        serializer = CreateClassworkSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        serializer.instance = services.create_classwork(user= request.user,classwork_dc = data)
        return response.Response(data=serializer.data)