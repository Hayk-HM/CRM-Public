const initialState = []

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_TASK': {
      return [
        ...state,
        action.formData
      ]
    }
    case 'GET_TASKS': {
      return [
        ...action.tasks
      ]
    }
    case 'UPDATE_TASK': {
      const index = state.map(elem => elem._id === action.formData._id).indexOf(true)
      const newArray = [...state]
      newArray.splice(index, 1, action.formData)
      return [
        ...newArray
      ]
    }
    case 'LOGOUT': {
      return []
    }
    default: {
      return [
        ...state
      ]
    }
  }
}

export default taskReducer
