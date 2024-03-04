import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {setToken,fetchToken} from './Auth.js';
export default function Login(){
    const navigate=useNavigate();
    const[username,setUsername]=useState('');
    const[password,setPassword]=useState('');

    const handleSubmit=()=>{
        if(setUsername.length ===0){
            alert("username has left Blank!");
        }
        else if(password.length ===0){
            alert("password has left Blank!");
        }
        else{
            console.log('axios')
            axios.post('http://localhost:8000/login', {
                username:username,
                password:password
            })
            .then(function(response){
                console.log(response);
                alert(response.data['message'])
                if(response.data['message'] ==='Login failed'){
                    alert("Login failed");
                }else{
                    if(response.data.token){
                        setToken(response.data.token);
                        navigate('/profile');
                    }
                }
            })
            .catch(function(error) {
                console.log(error, 'error');
            });
        }
    }
    return(
        <div>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card">
                                <div className="card-body p-5">
                                    {
                                        fetchToken()
                                        ? (
                                            <p>You are logged in!</p>
                                        )
                                        : (
                                            <p>Login Account !</p>
                                        )
                                    }
                                   <form>
                                    <div className="form-outline mb-4">
                                        <label className="form-label">USERNAME:</label>
                                        <input type="text" className="form-control form-control-lg" name="username" id="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className="form-label">OTP:</label>
                                        <input type="text" className="form-control form-control-lg" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <input type="button" className="btn btn-success btn-lg" name="submit" id="submit" value="Login" onClick={handleSubmit}/>
                                    </div>
                                   </form> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}