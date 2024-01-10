import React from 'react'
import { cookies } from "next/headers"
import {  Teachers, columns } from "./columns"
import { DataTable } from "./dataTable"


async function getData(): Promise<Teachers[]> {
    const resp = await fetch("http://localhost:8000/api/teachers/", {
      headers: { Cookie: cookies().toString() },
    });
    const data = resp.json()
    return data
}

export default async function TeacherDataTable() {
    const data = await getData()
    return (
      <div className='w-auto col-span-2 overflow-auto relative'>
        <DataTable columns={columns} data={data} />
      </div>
    )
  }