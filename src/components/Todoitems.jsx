import React from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Todoitems = ({text,id,isComplete,deleteTodo,toggle}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {transform: CSS.Transform.toString(transform),transition,};
  return (
    <div ref={setNodeRef} style={style} className='flex items-center my-3 gap-2 bg-gray-100 rounded-lg p-2'>
        <div {...attributes} {...listeners} className="cursor-grab px-2 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="5" cy="5" r="1.5"/>
            <circle cx="5" cy="10" r="1.5"/>
            <circle cx="5" cy="15" r="1.5"/>
            <circle cx="10" cy="5" r="1.5"/>
            <circle cx="10" cy="10" r="1.5"/>
            <circle cx="10" cy="15" r="1.5"/>
          </svg>
        </div>
        
        <div onClick={()=>{toggle(id)}} className='flex flex-1 items-center cursor-pointer'>
            <img src={isComplete? tick: not_tick} alt="" />
            <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${isComplete ? "line-through" : ""}`}>
              {text}
            </p>
        </div>
    <img onClick={()=>{deleteTodo(id)}} src={delete_icon} alt="" className='w-3.5 cursor-pointer'/>
      
    </div>
  )
}

export default Todoitems
