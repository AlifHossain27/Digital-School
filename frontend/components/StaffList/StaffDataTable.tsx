import React from 'react'
import {  Staffs, columns } from "./columns"
import { DataTable } from "./dataTable"


async function getData(): Promise<Staffs[]> {
    const resp = await fetch("http://localhost:8000/api/staffs/", {
      credentials: "include",
    });
    const data = resp.json()
    return data
}

export default async function StaffDataTable() {
    const data = await getData()
    return (
      <div className='w-auto col-span-2 overflow-auto relative'>
        <DataTable columns={columns} data={data} />
      </div>
    )
  }