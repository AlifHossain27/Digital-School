'use client'
import Navbar from "./Navbar"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
export default function ClassroomLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
return(
        <div className=''>
          <Navbar/>
            <section className="container">
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
            </section>
        </div>
            
    )
}
  