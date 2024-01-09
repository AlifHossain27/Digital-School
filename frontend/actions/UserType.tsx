import React from 'react';
import { LogIn } from 'lucide-react';
import { RxDashboard } from "react-icons/rx";
import { MdOutlineClass } from "react-icons/md"
import { PiExamThin } from "react-icons/pi";
import { HiOutlineUsers } from "react-icons/hi";
import {
  User,
  UserPlus,
  Users,
} from "lucide-react"

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

export async function UserType() {
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
        { name: "DashBoard", link: "/admin/dashboard/", icon: RxDashboard},
        { name: "Staffs", link: "/staffs/", icon: Users},
        { name: "Teachers", link: "/teachers/", icon: Users},
        { name: "Students", link: "/students/", icon: Users},
      ];
    } else if (user_type === "staff") {
      menus = [
        { name: "DashBoard", link: "/staff/dashboard/", icon: RxDashboard},
        { name: "Teachers", link: "/teachers/", icon: Users},
        { name: "Students", link: "/students/", icon: Users},
      ];
    } else if (user_type === "teacher") {
      menus = [
        { name: "DashBoard", link: "/teacher/dashboard/", icon: RxDashboard},
        { name: "Classrooms", link: "/classroom/", icon: MdOutlineClass},
        { name: "Exams", link: "/exams", icon: PiExamThin},
      ];
    } else if (user_type === "student") {
      menus = [
        { name: "DashBoard", link: "/teacher/dashboard/", icon: RxDashboard},
        { name: "Classrooms", link: "/classroom/", icon: MdOutlineClass},
        { name: "Exams", link: "/exams", icon: PiExamThin},
      ];
    }
  }

  return menus;
}