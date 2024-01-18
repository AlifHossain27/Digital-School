import { ColumnDef } from "@tanstack/react-table"


export type Teachers = {
    teacher_profile_id: string;
    full_name: string;
    email: string;
    contact_info: string;
}

export const columns: ColumnDef<Teachers>[] = [
    {
        accessorKey: "full_name"
    }
    
  ]