import { createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const userSlice = createSlice({
    name:"admin",
    initialState: {
        loggedIn: false,
        admin:null,
    },
    reducers:{
        login:(state, action)=>{
            state.loggedIn = true;
            state.admin = action.payload;
        },
        logout:(state)=>{
            state.loggedIn = false;
            state.admin = null;
        },
        register:(state, action)=>{
            state.loggedIn = true;
            state.admin = action.payload;
        },
        setUsers:(state, action)=>{
            return action.payload;
        },
    },
})

export const {login, logout, register, setUsers }= userSlice.actions;

//Action creator for user login
export const loginAdmin = (email, password)=> async (dispatch)=>{
    try {
        const response =  await axios.post('http://localhost:8082/admin/login', {email, password});
        //extract the token from the cookie header
        const token = response.headers['set-cookie'][0].split(';')[0].split('=')[1]; 

        //dispatch the login success action with the token
        dispatch(login(token));

        dispatch(login(response.data.admin));
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

//Action creator for user registration
export const registerAdmin = (name, email, password)=>async (dispatch)=>{
    try{
        const response = await axios.post ('http://localhost:8082/admin/register',{name, email, password});
        dispatch(register(response.data.admin));
        return response;
    }catch(error){
        console.log(error);
    }
};

//Action creator for user logout
export const logoutAdmin = () =>async (dispatch) =>{
    try{
        dispatch(logout());
    }catch(error){
        console.log(error);
    }
};

// export const fetchEmployee =() => {
//     return async (dispatch) =>{
//         try {
//             const response = await axios.get("http://localhost:8082/api/employees/");
//             dispatch(setUsers(response.data));
//         }catch(err){
//             console.error("error fetching users:",err);
//         }
//     }
// };

export default userSlice.reducer; 

