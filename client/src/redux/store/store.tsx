import { Action, createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk";

import authReducer from "../reducers/authReducer";
import taskReducer from "../reducers/taskReducer";
import usersReducer from "../reducers/usersReducer";
import updateTaskReducer from "../reducers/updatedTaskId";
import chatReducer from "../reducers/chatReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer,
  users: usersReducer,
  updateTaskId: updateTaskReducer,
  chat: chatReducer,
})

type RootReducerType = typeof rootReducer

export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

// @ts-ignore
window.__store__ = store

export default store
