export default function SubmissionLayout({
  children,
}: {
  children: React.ReactNode
}) {
return(
      <div className="flex w-full h-full flex-grow mx-auto"> 
          {children}
      </div>    
  )
}
