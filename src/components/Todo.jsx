import React, { useEffect, useRef, useState} from 'react'
import Todoitems from './Todoitems'
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

const Todo = () => {

const [TODOLIST, setToDoList] = useState(localStorage.getItem("todos")?JSON.parse(localStorage.getItem("todos")):[]);
const inputRef=useRef();

const add=()=>{
    const inputText=inputRef.current.value.trim();
    if(inputText===""){
        return null;
    }
    const newToDo={
        id:Date.now(),
        text:inputText,
        isComplete: false,
    }
    setToDoList((prev)=>[...prev,newToDo]);
    inputRef.current.value="";

}
const deleteTodo =(id)=>{
    setToDoList((prevTodos)=>{
        return prevTodos.filter((todo)=>todo.id !==id)
    })

}
const toggle=(id)=>{
    setToDoList((prevTodos)=>{
        return prevTodos.map((todo)=>{
            if (todo.id === id){
                return {...todo,isComplete:!todo.isComplete}
            }
            return todo;
        })
    })
}
const handleDragEnd = (event) => {
  const { active, over } = event;
  if (!over) return; // prevent error if dropped outside
  
  if (active.id !== over.id) {
    setToDoList((prev) => {
      const oldIndex = prev.findIndex((todo) => todo.id === active.id);
      const newIndex = prev.findIndex((todo) => todo.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  }
};

useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(TODOLIST));
},[TODOLIST])




  return (
    <div  className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
{/*-------------title--------------*/}
    <div className='flex justify-center gap-2'>
        <img src="/focusly-logo-by-eklavya.svg" alt="Focusly Logo" className="h-20"/>
    </div>
{/*-------------input box--------------*/}
    <div className='flex items-center my-2 bg-gray-200 rounded-full'>
        <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-11 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Add your task' />
        <button onClick={add} className='border-none rounded-full bg-cyan-500 w-24 h-11 text-white text-lg font-medium cursor-pointer'>ADD +</button>
    </div>
{/*-------------TODOLIST--------------*/}
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
    <SortableContext items={TODOLIST.map(item => item.id)} strategy={verticalListSortingStrategy}>
        {TODOLIST.map((item) => (
        <Todoitems
            key={item.id}
            id={item.id}
            text={item.text}
            isComplete={item.isComplete}
            deleteTodo={deleteTodo}
            toggle={toggle}
        />
        ))}
    </SortableContext>
    </DndContext>

      
    </div>
  )
}

export default Todo
