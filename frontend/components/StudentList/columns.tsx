"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"


export type Students = {
    student_profile_id: string
    full_name: string
    father_phone: string
    mother_phone: string
    present_address: string
    data_of_birth: string
}

export const columns: ColumnDef<Students>[] = [
    {
      accessorKey: "student_profile_id",
      header: "ID",
    },
    {
      accessorKey: "full_name",
      header: "Name",
    },
    {
      accessorKey: "father_phone",
      header: "Father's Contact",
    },
    {
      accessorKey: "mother_phone",
      header: "Mother's Contact",
    },
    {
      accessorKey: "present_address",
      header: "Address",
    },
    {
      accessorKey: "date_of_birth",
      header: "Date of Birth",
    },
  ]