import React from 'react';
import { LogIn } from 'lucide-react';
import { RxDashboard } from "react-icons/rx";
import { MdOutlineClass } from "react-icons/md"
import { PiExamThin } from "react-icons/pi";
import { FaUserTie, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';

interface AdminUserData {
  id: number;
  username: string;
  user_type: string;
}

interface StaffUserData {
  id: number;
  staff_id: string;
  username: string;
  user_type: string;
}

interface TeacherUserData {
  id: number;
  teacher_id: string;
  username: string;
  user_type: string;
}

interface StudentUserData {
  id: number;
  student_id: string;
  username: string;
  user_type: string;
}

type UserData = AdminUserData | StaffUserData | TeacherUserData | StudentUserData;

export async function navItems() {
  const res = await fetch("http://localhost:8000/api/me/", {
    credentials: 'include',
  });

  let menus: { name: string; link: string; icon: React.ComponentType }[] = [];

  if (!res.ok) {
    menus = [
      { name: "Login", link: "/login", icon: LogIn },
    ];
  } else {
    const data: UserData = await res.json();
    const user_type = data.user_type;
    

    if (user_type === "admin") {
      menus = [
        { name: "DashBoard", link: "/dashboard/", icon: RxDashboard},
        { name: "Staffs", link: "/staffs/", icon: FaUserTie},
        { name: "Teachers", link: "/teachers/", icon: FaChalkboardTeacher},
        { name: "Students", link: "/students/", icon: FaUserGraduate},
      ];
    } else if (user_type === "staff") {
      menus = [
        { name: "DashBoard", link: "/dashboard/", icon: RxDashboard},
        { name: "Teachers", link: "/teachers/", icon: FaChalkboardTeacher},
        { name: "Students", link: "/students/", icon: FaUserGraduate},
        { name: "Classrooms", link: "/classroom/", icon: MdOutlineClass},
      ];
    } else if (user_type === "teacher") {
      menus = [
        { name: "DashBoard", link: "/dashboard/", icon: RxDashboard},
        { name: "Classrooms", link: "/classroom/", icon: MdOutlineClass},
        { name: "Exams", link: "/exams", icon: PiExamThin},
      ];
    } else if (user_type === "student") {
      menus = [
        { name: "DashBoard", link: "/dashboard/", icon: RxDashboard},
        { name: "Classrooms", link: "/classroom/", icon: MdOutlineClass},
        { name: "Exams", link: "/exams", icon: PiExamThin},
      ];
    }
  }

  return menus;
}