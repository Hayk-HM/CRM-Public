import { userApi } from '../../api/API'

export const usersAction = {
  getUsers: (users) => ({ type: "GET_USERS", users }),
  updateUser: (updatedInfo) => ({ type: 'UPDATE_USER', updatedInfo })
}

export const getUsersAction = (company) => async (dispatch) => {
  try {
    const { data } = await userApi.getUsers(company)
    dispatch(usersAction.getUsers(data))
  } catch (error) {
    console.log("getUsersAction", error)
  }
}

export const updateUserAction = (userId, formData) => async (dispatch) => {
  try {
    const { data } = await userApi.updateUser(userId, formData)
    //console.log('DDDDDDDDDDDD------', data);
    dispatch(usersAction.updateUser(data.result))
  } catch (error) {
    console.log('updateUserAction', error)
  }
}
