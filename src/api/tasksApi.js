import { supabase } from '@/api/supabase'

export const fetchAllTasks = async () => {
  const { data, error } = await supabase.from('tasks').select('*')

  if (error) {
    throw new Error(error.message)
  }
  return data
}

export const addTask = async (title, userId) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert([{ title, user_id: userId, is_complete: false }])
    .select()

  if (error) {
    throw new Error(error.message)
  }
  return data[0] // Devolver el nuevo primer elemento
}

export const updateTask = async (taskId, updatedFields) => {
  const { data, error } = await supabase.from('tasks').update(updatedFields).match({ id: taskId })

  if (error) {
    throw new Error(error.message)
  }
  return data
}

export const deleteTask = async (taskId) => {
  const { data, error } = await supabase.from('tasks').delete().eq('id', taskId)

  if (error) {
    throw new Error(error.message)
  }
  return data
}
