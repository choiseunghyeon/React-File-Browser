import { configureStore, Store } from "@reduxjs/toolkit"
// import { combineReducers } from "redux";
import rootReducer from "./root"
export const store = configureStore({ reducer: rootReducer, devTools: true })

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store
