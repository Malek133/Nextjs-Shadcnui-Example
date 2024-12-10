
import React from 'react'
import TodoList from "@/components/todo-list";
import { getTodos } from "@/db/sgbd";
const page = async () => {
  const todos = await getTodos();
  return (
    <>
       <TodoList todos={todos || []} />;
    </>
  )
}

export default page




