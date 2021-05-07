const initialState = {
  result: {},
  token: ""
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_UP":
    case "SIGN_IN": {
      localStorage.setItem('profile', JSON.stringify({ ...action.formData }))
      return { ...state, ...action.formData }
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
    case 'LOGOUT': {
      return {
        result: {},
        token: ""
      }
    }
    default:
      return { ...state }
  }
}

export default authReducer
