import React from 'react'
import { cookies } from "next/headers"
import {  Teachers, columns } from "./columns"
import { DataTable } from "./dataTable"

type Classroom = {
  classID: string
}

async function getData({classID}: Classroom): Promise<Teachers[]> {
  const resp = await fetch(`http://localhost:8000/api/classroom/${classID}/teachers/`, {
    headers: { Cookie: cookies().toString() },
  });
  const data = resp.json()
  return data
}

export default async function TeacherDataTable({classID}: Classroom) {
    const data = await getData({classID})
    return (
      <div className='w-auto col-span-2 overflow-auto relative'>
        <DataTable columns={columns} data={data} />
      </div>
    )
  }