
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducer/userReducer';
import employeeReducer from '../reducer/employeeReducer';

const store = configureStore ({
    reducer:{
        admin: userReducer,
        employee:employeeReducer,
    },
})

export default store;
