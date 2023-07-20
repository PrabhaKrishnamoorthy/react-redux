/*
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Action to fetch all employees
export const fetchEmployees = (token) => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8082/employees',{
        headers:{
            Authorization : token,
        }
    });
    dispatch(fetchEmployeesSuccess(response.data));
  } catch (error) {
    dispatch(fetchEmployeesFailure(error.message));
  }
};

// Action to delete an employee
export const deleteEmployee = (id, token) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8082/delete/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    dispatch(deleteEmployeeSuccess(id));
  } catch (error) {
    dispatch(deleteEmployeeFailure(error.message));
  }
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchEmployeesSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchEmployeesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteEmployeeSuccess: (state, action) => {
      state.loading = false;
      state.data = state.data.filter((employee) => employee.id !== action.payload);
      state.error = null;
    },
    deleteEmployeeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchEmployeesSuccess, fetchEmployeesFailure, deleteEmployeeSuccess, deleteEmployeeFailure } =
  employeeSlice.actions;

export default employeeSlice.reducer;
*/

import { createSlice} from "@reduxjs/toolkit";
import axios from 'axios';

const employeeSlice = createSlice({
  name:"employees",
  initialState:[],
  reducers:{
    setEmployee:(state, action)=>{
      return action.payload;
    },
    addEmployee:(state, action)=>{
      state.push(action.payload)
    },
    updateEmployee:(state, action)=>{
      const {id,employee_id, name, email,mobile_no}=action.payload;
      const employeeIndex = state.findIndex((employee)=>employee.id === id);
      if(employeeIndex !== -1){
        state[employeeIndex]= {id, employee_id,name, email, mobile_no};
      }
    },
    deleteEmployee:(state, action)=>{
      const {id} = action.payload;
      return state.filter((employee)=>employee.id !== id);
    },
  }
})
export const { setEmployee, addEmployee,updateEmployee,deleteEmployee}= employeeSlice.actions;

export const fetchEmployees = () =>{
  return async (dispatch)=>{
    try{
      //read token from document.cookie
      const token = document.cookie
      .split(';')
      .find(row => row.trim().startsWith('accessToken='))
      .split('=')[1];
      if(!token){
        console.error('No access token found in the cookie');
        return;
      }
      //use axios to make the request and pass the token as a Bearer token in the Auth
      const response = await axios.get("http://localhost:8082/api/employees",{
        headers:{
          Authorization:`Bearer ${token}`,
        },
      });
      dispatch (setEmployee(response.data));
    }catch(error){
      console.error("Error fetchig employees:", error);
      console.log("Error message from response:", error.response);
    }
  };
};

export const createEmployee = (employee)=>{
  return async (dispatch)=>{
    try{
      //read token from document.cookie
      const token = document.cookie
      .split(';')
      .find(row => row.trim().startsWith('accessToken='))
      .split('=')[1];
      //use axios to make the request and pass the token as a Bearer token in the Auth
      const response = await axios.post("http://localhost:8082/api/employees/create",{
        headers:{
          Authorization:`Bearer ${token}`,
        },
      });
      dispatch (addEmployee(response.data));
    }catch(error){
      console.error('Error creating employee:', error);
    }
  };
};

export const updateEmployeeById = (id, employee)=>{
  return async (dispatch)=>{
    try{
      const token = document.cookie
      .split(';')
      .find(row=>row.trim().startsWith('token='))
      .split('=')[1];
      const response = await axios.put(`http://localhost:8082/api/employees/${id}`,employee,{
        headers:{
          Authorization:`Bearer ${token}`,
        },
      });
      dispatch(updateEmployee(response.data));
    }catch(error){
      console.error('Error updating employee:', error);
    }
  }
};

export const deleteEmployeeById =(id)=>{
  return async (dispatch)=>{
    try{
      const token = document.cookie
      .split(';')
      .find(row=>row.trim().startsWith('token='))
      .split('=')[1];

      await axios.delete(`http://localhost:8082/api/employees/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`,
        },
      });

      dispatch(deleteEmployee({id}));
    }catch(error){
      console.error('Error deleting user:', error);
    }
  };
};

export default employeeSlice.reducer;