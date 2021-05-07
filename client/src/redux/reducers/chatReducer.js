const initialState = []

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_CHAT': {
      return [
        ...state,
        action.chatData
      ]
    }
    case 'GET_CHAT': {
      return [
        ...state,
        ...action.chat
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

export default chatReducer
