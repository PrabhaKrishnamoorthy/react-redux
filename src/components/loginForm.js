import React from 'react';
import { Link } from 'react-router-dom';
import  { useDispatch } from 'react-redux';
import  {  loginAdmin,  registerAdmin, } from '../reducer/userReducer';
//import { fetchEmployees } from '../reducer/employeeReducer';

function AuthenticationForm ({isLogin}){
    const dispatch = useDispatch();
    //const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        if(isLogin){
            //dispatch login action
            dispatch(loginAdmin 
                ({email, password}));
            //dispatch(fetchEmployees());
        } else {
            const name = e.target.name.value;
            //dispatch register action
            dispatch(registerAdmin
                ({name, email,password}));
            //dispatch(fetchEmployees());
        }
    };

    return (
        <div className = "d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className='w-30 bg-white rounded p-3'>
                <h2>{isLogin ? 'Login' : 'Register'}</h2>
                {isLogin ?(
                <form onSubmit={handleSubmit}>
                    <div className="d-grid">
                        <label htmlFor="email">Name:</label>
                        <input 
                        type="email"
                        id="email"
                        />
                        <label htmlFor="password">Password:</label>
                        <input 
                        type="password"
                        id="password"
                        />
                        <br/>
                    </div>
                    <br />
                    <button type = "submit">Login</button>
                </form>
                ):(
                    <form onSubmit={handleSubmit}>
                        <div className='d-grid'>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" />
                            <label htmlFor='email'>Email:</label>
                            <input type="email" id="email"/>
                            <label htmlFor='password'>Password:</label>
                            <input type='password' id="password"/>
                            <label htmlFor='conformPassword'>Conform Password:</label>
                            <input type='password' id="conformPassword"/>
                        </div>
                        <br />
                        <button type = "submit">Register</button>
                    </form>
                )}
                <br/>
                <br />
                {isLogin ? (
                    <Link to="/register">Don't have an accound? Register here</Link>
                ):(
                    <Link to ="/login">Already have an account? Login here</Link>
                )}
            </div>
        </div>
    )
}

export default AuthenticationForm;