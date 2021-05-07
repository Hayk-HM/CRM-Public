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
    default:
      return [
        ...state
      ]
  }
}

export default usersReducer
