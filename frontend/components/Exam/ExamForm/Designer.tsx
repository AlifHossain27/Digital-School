'use client'
import React, { useState } from 'react'
import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from '@dnd-kit/core'
import DesignerSidebar from './DesignerSidebar'
import { cn } from '@/lib/utils'
import useDesigner from './Hooks/useDesigner'
import { ElementsType, FormElementInstance, FormElements } from './FormElements'
import { idGenerator } from '@/lib/idGenerator'
import { Button } from '@/components/ui/button'
import { BiSolidTrash } from 'react-icons/bi'

const Designer = () => {
    const { elements, addElement, removeElement, selectedElement, setSelectedElement } = useDesigner()
    const droppable = useDroppable({
        id: "designer-drop-area",
        data: {
            isDesignerDropArea: true
        }
    })
    useDndMonitor({
        onDragEnd: (event: DragEndEvent) => {
            const { active, over } = event
            if (!active || !over) return;

            const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
            const isDroppingOverDesignDropArea = over.data?.current?.isDesignerDropArea;
            const droppingSidebarBtnOverDesignerDropArea = isDesignerBtnElement && isDroppingOverDesignDropArea;
            if (droppingSidebarBtnOverDesignerDropArea){
                const type = active.data?.current?.type;
                const newElement = FormElements[type as ElementsType].construct(
                    idGenerator()
                )
                addElement(elements.length, newElement)
                return;
            }

            const isDroppingOverDesignerElementTopHalf = over.data?.current?.isTopHalfDesignerElement;
            const isDroppongOverDesignerElementBottomHalf = over.data?.current?.isBottomDesignerElement;
            const isDroppingOverDesignerElement = isDroppingOverDesignerElementTopHalf || isDroppongOverDesignerElementBottomHalf;
            const droppingSidebarBtnOverDesignerElement = isDesignerBtnElement && isDroppingOverDesignerElement;
            if (droppingSidebarBtnOverDesignerElement) {
                const type = active.data?.current?.type;
                const newElement = FormElements[type as ElementsType].construct(
                    idGenerator()
                )
                const overId = over.data?.current?.elementId;
                const overElementIndex = elements.findIndex((el) => el.id === overId);
                if (overElementIndex === -1) {
                    throw new Error("Element Not Found")
                }
                let indexForNewElement = overElementIndex;
                if (isDroppongOverDesignerElementBottomHalf){
                    indexForNewElement = overElementIndex + 1;
                }
                addElement(indexForNewElement, newElement)
                return;
            }

            const isDraggingDesignerElement = active.data?.current?.isDesignerElement;
            const draggingDesignerElementOverAnotherDesignerElement = isDroppingOverDesignerElement && isDraggingDesignerElement;
            if (draggingDesignerElementOverAnotherDesignerElement) {
                const activeId = active.data?.current?.elementId;
                const overId = over.data?.current?.elementId;

                const activeElementIndex = elements.findIndex(
                    (el) => el.id === activeId 
                )
                const overElementIndex = elements.findIndex(
                    (el) => el.id === overId 
                )
                if (activeElementIndex === -1 || overElementIndex === -1) {
                    throw new Error("Element Not Fount")
                }
                const activeElement = {...elements[activeElementIndex]};
                removeElement(activeId)
                let indexForNewElement = overElementIndex
                if (isDroppongOverDesignerElementBottomHalf){
                    indexForNewElement = overElementIndex + 1;
                }
                addElement(indexForNewElement, activeElement)
            }
        }
    })
  return (
    <div className='flex w-full h-full'>
        <div className='p-4 w-full' onClick={() => {
            if (selectedElement) setSelectedElement(null)
        }}>
            <div 
            ref = {droppable.setNodeRef}
            className={cn('bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto',
            droppable.isOver && 'ring-2 ring-primary/20'
            )}>
                {!droppable.isOver && elements.length === 0  && (
                <p className='text-3xl text-muted-foreground flex flex-grow items-center font-bold'>
                    Drop Here
                </p>
                )}
                {droppable.isOver && elements.length === 0 && (
                <div className='p-4 w-full'>
                    <div className='h-[120px] rounded-md bg-primary/20'></div>
                </div>
                )}
                {elements.length > 0 && (
                    <div className='flex flex-col w-full gap-2 p-4 pb-20'>
                        {elements.map(element => (
                            <DesignerElementWrapper key={element.id} element={element}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
        <DesignerSidebar/>
    </div>
  )
}

function DesignerElementWrapper({element}: {element: FormElementInstance}){
    const { removeElement, selectedElement, setSelectedElement } = useDesigner()
    const [ mouseIsOver, setMouseIsOver ] = useState<boolean>(false)
    const topHalf = useDroppable({
        id: element.id + '-top',
        data: {
            type: element.type,
            elementId: element.id,
            isTopHalfDesignerElement: true
        }
    })

    const bottomHalf = useDroppable({
        id: element.id + '-bottom',
        data: {
            type: element.type,
            elementId: element.id,
            isBottomHalfDesignerElement: true
        }
    })

    const draggable = useDraggable({
        id: element.id + '-drag-handler',
        data: {
            type: element.type,
            elementId: element.id,
            isDesignerElement: true
        }
    })

    if (draggable.isDragging) return null;
    
    const DesignerElement = FormElements[element.type].designerComponent;
    return (
        <div 
            ref={draggable.setNodeRef}
            {...draggable.listeners}
            {...draggable.attributes}
            className='relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset'
            onMouseEnter={() => {
                setMouseIsOver(true)
            }}
            onMouseLeave={() => {
                setMouseIsOver(false)
            }}
            onClick={(e) => {
                e.stopPropagation()
                setSelectedElement(element)
            }}
        >
            <div 
            ref={ topHalf.setNodeRef }
            className='absolute w-full h-1/2 rounded-t-md'/>
            <div 
            ref={ bottomHalf.setNodeRef }
            className='absolute w-full bottom-0 h-1/2 rounded-b-md'/>
            {
                mouseIsOver && (
                    <div>
                        <div className='absolute right-0 h-full'>
                            <Button 
                            variant="outline" 
                            className='flex justify-center h-full border rounded-md rounded-l-none bg-red-500'
                            onClick={(e) => {
                                e.stopPropagation()
                                removeElement(element.id)
                            }}
                            >
                                <BiSolidTrash className='h-6 w-6'/>
                            </Button>
                        </div>
                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse'>
                            <p className='text-muted-foreground text-sm'>Click for properties or Drag to move</p>
                        </div>
                    </div>
                )
            }
            {
                topHalf.isOver && (
                    <div className='absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none'/>
                )
            }
            <div className={cn(
                'flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100',
                mouseIsOver && 'opacity-30',
                )}>
                <DesignerElement elementInstance={element}/>
            </div>
            {
                bottomHalf.isOver && (
                    <div className='absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none'/>
                )
            }
        </div>
    )
}

export default Designer