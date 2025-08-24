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
        <div onClick={()=>{toggle(id)}} className='flex flex-1 items-center cursor-pointer'>
            <img src={isComplete? tick: not_tick} alt="" />
            <p {...attributes} {...listeners} className={`tex-slate-700 ml-4 text-[17px] decoration-slate-500 cursor-grab   
               ${isComplete ? "line-through" : ""}`}>{text}
</p>
        </div>
    <img onClick={()=>{deleteTodo(id)}} src={delete_icon} alt="" className='w-3.5 cursor-pointer'/>
      
    </div>
  )
}

export default Todoitems
