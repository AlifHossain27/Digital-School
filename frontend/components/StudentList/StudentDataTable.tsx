import React from 'react'
import { cookies } from "next/headers"
import {  Students, columns } from "./columns"
import { DataTable } from "./dataTable"


async function getData(): Promise<Students[]> {
    const resp = await fetch("http://localhost:8000/api/students/",{
      headers: { Cookie: cookies().toString() },
    });
    const data = resp.json()
    return data
}

export default async function StudentDataTable() {
    const data = await getData()
    return (
      <div className='w-auto col-span-2 overflow-auto relative'>
        <DataTable columns={columns} data={data} />
      </div>
    )
  }