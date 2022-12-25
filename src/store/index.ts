import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "@redux-saga/core"
import apiSaga from "./middleware/apiSaga"
import rootReducer from "./reducer"

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({ reducer: rootReducer, devTools: true, middleware: [sagaMiddleware] })

sagaMiddleware.run(apiSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store
