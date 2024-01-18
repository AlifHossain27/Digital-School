import { ColumnDef } from "@tanstack/react-table"

export type Students = {
    student_profile_id: string;
    full_name: string;
    father_name: string;
    mother_name: string;
}

export const columns: ColumnDef<Students>[] = [
    {
        accessorKey: "full_name"
    }
    
  ]