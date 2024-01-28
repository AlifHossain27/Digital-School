import React from 'react'
import SidebarBtnElement from './SidebarBtnElement'
import { FormElements } from './FormElements'
import useDesigner from './Hooks/useDesigner'
import FormElementsSidebar from './FormElementsSidebar'
import PropertiesFormSidebar from './PropertiesFormSidebar'

const DesignerSidebar = () => {
  const { selectedElement } = useDesigner()
  return (
    <aside className='w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full'>
        {!selectedElement && <FormElementsSidebar/>}
        {selectedElement && <PropertiesFormSidebar/>}
    </aside>
  )
}

export default DesignerSidebar