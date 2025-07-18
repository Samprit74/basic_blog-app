import { configureStore } from "@reduxjs/toolkit";
import authReducers from './AuthSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';


const persistConfig = {
    key: "root",
    storage
};

const persistedReducer = persistReducer(persistConfig, authReducers)
export const store = configureStore({
    reducer: {
        auth: persistedReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [
                'persist/PERSIST',
                'persist/REHYDRATE',
                'persist/REGISTER',
                'persist/PAUSE',
                'persist/FLUSH',
                'persist/PURGE'
            ]
        }
    })
})


export const persistor = persistStore(store);