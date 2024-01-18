import Navbar from "./Navbar"
export default function ClassroomLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
return(
        <div className=''>
          <Navbar/>
            <section className="container">
              {children}
            </section>
        </div>
            
    )
}
  