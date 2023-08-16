import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './authSlice'
import siteReducer from './siteSlice'
import notifiReducer from './notifiSlice'
import postReducer from './postSlice'

const rootReducer = combineReducers({
    auth:authReducer,
    site:siteReducer,
    notifi: notifiReducer,
    post:postReducer
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist:['auth', 'site']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
})

export let persistor = persistStore(store)
export default store