"use client"
import { ColumnDef } from "@tanstack/react-table"
import StudentViewer from "../UserViewer/StudentViewer"



export type Students = {
    profile_uid: string
    full_name: string
    first_name: string
    last_name: string
    father_name: string
    father_phone: string
    mother_name: string
    mother_phone: string
    permanent_address: string
    present_address: string
    date_of_birth: string
}

export const columns: ColumnDef<Students>[] = [
    {
      accessorKey: "profile_uid",
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
    {
      id: "actions",
      cell: ({ row }) => {
        const data = row.original
        return (
          <div>
            <StudentViewer
                  profile_id= {data.profile_uid} 
                  full_name= {data.full_name} 
                  first_name= {data.first_name} 
                  last_name= {data.last_name} 
                  father_name= {data.father_name}
                  father_phone= {data.father_phone}
                  mother_name= {data.mother_name}
                  mother_phone= {data.mother_phone}
                  permanent_address= {data.permanent_address}
                  present_address= {data.present_address}
                  date_of_birth= {data.date_of_birth} />
          </div>
        )
      },
    },
  ]