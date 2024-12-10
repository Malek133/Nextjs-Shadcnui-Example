'use server'

import {addTodo as addTodoDao,updateTodo as updateTodoDao} from '@/db/sgbd'
import {AddTodo, Todo} from '@/lib/type'
import { revalidatePath } from 'next/cache'

export const addTodo = async (todo: AddTodo) => {
  console.log('add todo action', todo)
  try {
    await addTodoDao(todo)
  } catch (error) {
    console.error('Failed to add todo', error)
    throw error
  }
  revalidatePath('/tasks')
}

export const updateTodo = async (todo:Todo,) => {
  console.log('update todo action', todo)

  try {
    await updateTodoDao(todo)
  } catch (error) {
    console.error('Failed to add todo', error)
    throw error
  }

  revalidatePath('/tasks')
}