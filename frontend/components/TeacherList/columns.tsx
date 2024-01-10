"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"


export type Teachers = {
    teacher_profile_id: string
    full_name: string
    email: string
    contact_info: string
    present_address: string
}

export const columns: ColumnDef<Teachers>[] = [
    {
      accessorKey: "teacher_profile_id",
      header: "ID",
    },
    {
      accessorKey: "full_name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "contact_info",
      header: "Contact",
    },
    {
      accessorKey: "present_address",
      header: "Address",
    },
  ]