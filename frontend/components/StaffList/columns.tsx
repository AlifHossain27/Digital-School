"use client"
import { ColumnDef } from "@tanstack/react-table"
import EmployeeViewer from "../UserViewer/EmployeeViewer"


export type Staffs = {
    staff_profile_id: string
    full_name: string
    first_name: string
    last_name: string
    email: string
    contact_info: string
    present_address: string
    permanent_address: string
    date_of_birth: string
}

export const columns: ColumnDef<Staffs>[] = [
    {
      accessorKey: "staff_profile_id",
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
    {
      id: "actions",
      cell: ({ row }) => {
        const data = row.original
        return (
          <div>
            <EmployeeViewer 
                  profile_id= {data.staff_profile_id} 
                  full_name= {data.full_name} 
                  first_name= {data.first_name} 
                  last_name= {data.last_name} 
                  email= {data.email} 
                  contact_info= {data.contact_info}
                  permanent_address= {data.permanent_address}
                  present_address= {data.present_address}
                  date_of_birth= {data.date_of_birth} />
          </div>
        )
      },
    },
  ]