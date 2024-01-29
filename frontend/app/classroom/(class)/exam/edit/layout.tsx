import DesignerContextProvider from "@/components/Exam/ExamForm/Context/DesignerContext"

export default function BuilderLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
return(
        <div className="flex w-full h-full flex-grow mx-auto">
            <DesignerContextProvider>
            {children}
            </DesignerContextProvider>
        </div>    
    )
}
  