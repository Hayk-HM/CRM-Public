import { authApi } from '../../api/API'
import { MyFormTypeSignIn } from '../../components/LogInForm/SignIn/SignIn'
import { MyFormTypeSignUp } from '../../components/LogInForm/SignUp/SignUp'
import { ActionsTypeAuth } from '../reducers/authReducer'
import { BaseThunkType } from '../store/store'
import { MyFormTypeEmployees } from '../../components/MainPage/Register/Register'

export const authActions = {
  signUp: (formData: MyFormTypeSignUp) => ({ type: 'SIGN_UP', formData } as const),
  signIn: (formData: MyFormTypeSignIn) => ({ type: 'SIGN_IN', formData } as const),
  logout: () => ({ type: "LOGOUT" } as const),
}

type ThunkType = BaseThunkType<ActionsTypeAuth>

export const signUpAction = (formData: MyFormTypeSignUp, history: any): ThunkType => async (dispatch) => {
  try {
    const { data } = await authApi.signUp(formData)
    dispatch(authActions.signUp(data))
    // history.push(`/main?company=${data.result.company.split(' ').join('').toLowerCase()}`)
    history.push(`/main/task`)
  } catch (error) {
    console.log('signUpAction', error)
  }
};

export const signupEmployeeAction = (newEmployeeInfo: MyFormTypeEmployees, history: any): ThunkType => async (dispatch) => {
  try {
    await authApi.signupEmployee(newEmployeeInfo)
    history.push('/main/RegistrationSuccess')
  } catch (error) {
    console.log('signupEmployeeAction', error)
  }
};

export const signinAction = (formData: MyFormTypeSignIn, history: any): ThunkType => async (dispatch) => {
  try {
    const { data } = await authApi.signIn(formData)
    dispatch(authActions.signIn(data))
    history.push(`/main/task`)
  } catch (error) {
    console.log('signInAction', error);
  }
}
