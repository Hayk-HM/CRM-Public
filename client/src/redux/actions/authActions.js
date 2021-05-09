import { authApi } from '../../api/API'

export const authActions = {
  signUp: (formData) => ({ type: 'SIGN_UP', formData }),
  signIn: (formData) => ({ type: 'SIGN_IN', formData }),
  logout: () => ({ type: "LOGOUT" }),
}

export const signUpAction = (formData, history) => async (dispatch) => {
  try {
    const { data } = await authApi.signUp(formData)
    dispatch(authActions.signUp(data))
    // history.push(`/main?company=${data.result.company.split(' ').join('').toLowerCase()}`)
    history.push(`/main/task`)
  } catch (error) {
    console.log('signUpAction', error)
  }
};

export const signupEmployeeAction = (newEmployeeInfo, history) => async (dispatch) => {
  try {
    await authApi.signupEmployee(newEmployeeInfo)
    history.push('/main/RegistrationSuccess')
  } catch (error) {
    console.log('signupEmployeeAction', error)
  }
};

export const signinAction = (formData, history) => async (dispatch) => {
  try {
    const { data } = await authApi.signIn(formData)
    dispatch(authActions.signIn(data))
    history.push(`/main/task`)
  } catch (error) {
    console.log('signInAction', error);
  }
}
