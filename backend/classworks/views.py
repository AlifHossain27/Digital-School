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

# List all the classworks in the Classroom
class ListClassworks(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsAdministrator | IsStaff | IsTeacher | IsStudent]
    def get(self, request, class_id):
        classworks = services.classwork_list(class_id=class_id)
        serializer = ClassworkSerializer(classworks, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
    
# Retrieve Update Delete Classwork
class RetrieveUpdateDeleteClasswork(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsTeacher | IsStudent]
    def get(self, request, classwork_id):
        classwork = services.get_classwork(classwork_id=classwork_id)
        serializer = ClassworkSerializer(classwork)
        return response.Response(serializer.data, status=status.HTTP_200_OK)