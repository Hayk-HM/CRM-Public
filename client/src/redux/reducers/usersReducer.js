const initialState = []

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USERS': {
      return [
        ...action.users
      ]
    }
    case 'LOGOUT': {
      return []
    }
    case 'UPDATE_USER': {
      return {
        ...state,
        result: {
          ...state.result,
          ...action.updatedInfo
        }
      }
    }
    default:
      return [
        ...state
      ]
  }
}

export default usersReducer
