import { taskApi } from '../../api/API'

export const taskActions = {
  createTask(formData) { return { type: 'CREATE_TASK', formData } },
  updateTask(formData) { return { type: 'UPDATE_TASK', formData } },
  getTasks(tasks) { return { type: 'GET_TASKS', tasks } },
}

export const createTaskAction = (formData) => async (dispatch) => {
  try {
    const { data } = await taskApi.createTask(formData)
    dispatch(taskActions.createTask(data))
  } catch (error) {
    console.log('createTaskAction', error)
  }
}

export const updateTaskAction = (formData, id) => async (dispatch) => {
  try {
    const { data } = await taskApi.updateTask(formData, id)
    dispatch(taskActions.updateTask(data))
  } catch (error) {
    console.log('updateTaskAction', error)
  }
}

export const getTasksAction = (company) => async (dispatch) => {
  try {
    const { data } = await taskApi.getTask(company)
    dispatch(taskActions.getTasks(data))
  } catch (error) {
    console.log('getTasksAction', error)
  }
}
