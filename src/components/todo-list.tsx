"use client"

import { useState,useOptimistic,startTransition } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {addTodo as AddTodoAction} from '../app/actions'
import {toast} from 'sonner'
import TodoItem from "./TodoItem"
import { Todo } from "@/lib/type"

interface TodosProps {
    todos: Todo[]
  }

export default function TodoList({ todos}: TodosProps) {

   const [newTodo, setNewTodo] = useState("");
   const [OptimisicTodo,AdduseOptimisicTodo]=useOptimistic(todos,
    (state,newTodos:Todo) =>[...state,newTodos])

  const handleClick = async () => {
    if(newTodo ===''){
        toast.error('we do not have todo .')
        return
    }
    const newTodos = {
        id:OptimisicTodo.length +1,
        title:newTodo,
      isCompleted: false,
      updadtedAt: new Date().toISOString(),
    }
    
    startTransition(async () =>{
        AdduseOptimisicTodo(newTodos)
        try {

        await AddTodoAction(newTodos)
     toast('Todo has been created.')

   

    } catch (error) {
        console.error('this is error',error)
        toast.error('failed to create todo .')
    } 
    })
   
    
  }



  return (
    <div className="max-w-md mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex mb-4">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="mr-2"
        />
        <Button onClick={handleClick}>Submit</Button>
      </div>
      <ul className="space-y-2">
        {OptimisicTodo && OptimisicTodo.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  )
}

