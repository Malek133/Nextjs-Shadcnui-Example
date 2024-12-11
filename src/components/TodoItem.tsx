import {Checkbox} from '@/components/ui/checkbox'
import {cn} from '@/lib/utils'
import {Todo} from '@/lib/type'
import { updateTodo } from '@/app/actions'
import { toast } from 'sonner'
import {useOptimistic, startTransition
 } from "react"

type TodoOptmistic = Todo & {
  sending?:boolean
}

type OptimisticField = {isCompleted:boolean;sending:boolean}

export default function TodoItem({todo}: {todo: Todo}) {

  const [OptimisicTodo,updatOptimisicTodo]=useOptimistic<TodoOptmistic,OptimisticField>(todo,
    (state,{isCompleted,sending}) =>{
      return {...state,isCompleted,sending}

    }
  )
 
  const handleChange = async (isCompleted: boolean) => {
    updatOptimisicTodo({isCompleted,sending:true})

    try {
      updateTodo({...todo,isCompleted} )
    } catch (error) {
      console.error('failed:',error)
      toast.error('failed to create todo .')
    }
    updatOptimisicTodo({isCompleted,sending:false})
  }
  return (
    <>
      <div className="flex items-center gap-4" key={OptimisicTodo.id}>
        <Checkbox
          checked={OptimisicTodo.isCompleted}
          id={`${OptimisicTodo.id}`}
          onCheckedChange={(checked) => startTransition(()=>
          handleChange(checked as boolean))
             }
        />
        <label
          className={cn('flex-1 text-sm font-medium', {
            'line-through': OptimisicTodo.isCompleted,
            'animate-color-cycle':OptimisicTodo.sending
          })}
          htmlFor={`${OptimisicTodo.id}`}
        >
          {OptimisicTodo.title}
        </label>

        <span
          className={cn('text-sm text-gray-500 dark:text-gray-400 ', {
            'line-through': OptimisicTodo.isCompleted,
          })}
        >
          {OptimisicTodo.updadtedAt}
        </span>
      </div>
    </>
  )
}
