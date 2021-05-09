const initialState = {
  updateTaskId: ""
}

const updateTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TASK_ID': {
      return {
        ...state,
        updateTaskId: action.id
      }
    }
    case 'LOGOUT': {
      return {
        updateTaskId: ""
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default updateTaskReducer
