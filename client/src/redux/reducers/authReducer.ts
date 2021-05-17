import { authActions } from "../actions/authActions"
import { InferActionsTypes } from "../store/store"

const initialState = {
  result: {},
  token: ""
}

export type InitialStateTypeAuth = typeof initialState
export type ActionsTypeAuth = InferActionsTypes<typeof authActions>

const authReducer = (state = initialState, action: ActionsTypeAuth) => {
  switch (action.type) {
    case "SIGN_UP":
    case "SIGN_IN": {
      localStorage.setItem('profile', JSON.stringify({ ...action.formData }))
      return { ...state, ...action.formData }
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
