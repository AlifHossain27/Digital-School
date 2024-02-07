from rest_framework import views, response, status
from .serializers import TeacherProfileSerializer, StudentProfileSerializer, ClassroomSerializer, ClassroomCreateSerializer, AddRemoveTeacherSerializer
from . import services
from users.permissions import IsAdministrator, IsStaff, IsTeacher, IsStudent
from users.authentication import Authentication

# Create Classroom View
class CreateClassroom(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsStaff]
    def post(self, request):
        serializer = ClassroomCreateSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        serializer.instance = services.create_classroom(classroom_dc = data)
        return response.Response(data=serializer.data)
    
class DeleteClassroom(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsStaff]
    def delete(self, request, class_id):
        services.delete_classroom(user= request.user, class_id=class_id)
        return response.Response(status = status.HTTP_204_NO_CONTENT)

# Retrieve Individual Classroom View
class RetrieveClassroom(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsAdministrator | IsStaff | IsTeacher | IsStudent]
    def get(self, request, class_id):
        classroom = services.get_classroom(class_id)
        serializer = ClassroomSerializer(classroom)
        return response.Response(data=serializer.data, status=status.HTTP_200_OK)

# Retrieve Classroom List View
class ListClassrooms(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsAdministrator | IsStaff | IsTeacher | IsStudent]
    def get(self, request, user_type, profile_uid):
        classrooms= services.get_classrooms(user_type=user_type, profile_uid=profile_uid)
        serializer = ClassroomSerializer(classrooms, many = True)
        return response.Response(data=serializer.data, status=status.HTTP_200_OK)

# List Teachers View
class TeacherList(views.APIView):
    authentication_classes = [Authentication]
    def get(self, request, class_id):
        teachers = services.get_teachers(class_id=class_id)
        serializer = TeacherProfileSerializer(teachers, many = True)
        return response.Response(data=serializer.data, status=status.HTTP_200_OK)

# Add Teacher to Classroom View 
class AddTeacher(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsStaff]
    def post(self, request):
        serializer = AddRemoveTeacherSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        class_id = serializer.validated_data['class_id']
        teacher = serializer.validated_data['teachers']
        serializer.instance = services.add_teacher_to_classroom(user=request.user, class_id=class_id, profile_uid= teacher)
        return response.Response(data=serializer.data, status=status.HTTP_200_OK)
    
# Remove Teacher from Classroom View
class RemoveTeacher(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsStaff]
    def post(self, request):
        serializer = AddRemoveTeacherSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        class_id = serializer.validated_data['class_id']
        teacher = serializer.validated_data['teachers']
        serializer.instance = services.remove_teacher_from_classroom(user= request.user, class_id=class_id, profile_uid= teacher)
        return response.Response(data=serializer.data, status=status.HTTP_200_OK)

# List Students View
class StudentList(views.APIView):
    authentication_classes = [Authentication]
    def get(self, request, class_id):
        students = services.get_students(class_id=class_id)
        serializer = StudentProfileSerializer(students, many = True)
        return response.Response(data=serializer.data, status=status.HTTP_200_OK)
   
# Add Student to Classroom View 
class AddStudent(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsStaff]
    def post(self, request):
        serializer = AddRemoveTeacherSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        class_id = serializer.validated_data['class_id']
        student = serializer.validated_data['students']
        serializer.instance = services.add_student_to_classroom(class_id=class_id, profile_uid= student)
        return response.Response(data=serializer.data, status=status.HTTP_200_OK)
    
# Remove Student from Classroom View
class RemoveStudent(views.APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsStaff]
    def post(self, request):
        serializer = AddRemoveTeacherSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        class_id = serializer.validated_data['class_id']
        student = serializer.validated_data['students']
        serializer.instance = services.remove_student_from_classroom(class_id=class_id, profile_uid= student)
        return response.Response(data=serializer.data, status=status.HTTP_200_OK)