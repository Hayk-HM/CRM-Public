import { chatApi } from '../../api/API'

export const chatActions = {
  createChat(chatData) { return { type: 'CREATE_CHAT', chatData } },
  getChat(chat) { return { type: 'GET_CHAT', chat } }
}

export const createChatAction = (chatData) => async (dispatch) => {
  try {
    const { data } = await chatApi.createChat(chatData)
    dispatch(chatActions.createChat(data))
  } catch (error) {
    console.log('createChatAction', error)
  }
}

export const getChatAction = (company) => async (dispatch) => {
  try {
    const { data } = await chatApi.getChat(company)
    dispatch(chatActions.getChat(data))
  } catch (error) {
    console.log('getChatAction', error)
  }
}
