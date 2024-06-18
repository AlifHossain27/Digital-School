import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './Navbar'
import { ThemeProvider } from "@/components/theme-provider"
import Sidebar from './Sidebar'
import { Toaster } from "@/components/ui/toaster"
import { CustomProvider } from '@/redux/provider'
import NextTopLoader from 'nextjs-toploader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader/>
          <CustomProvider>
          <main className='flex'>
            <Sidebar/>
            <div className='flex flex-col w-full'>
              <Navbar/>
              <div className='absolute top-16 left-0 w-screen  md:relative lg:relative md:top-0 lg:top-0'>
                {children}
              </div>
              <Toaster />
            </div>
          </main>
          </CustomProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
