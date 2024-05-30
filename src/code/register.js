
import React from 'react';
import { Link,useNavigate } from "react-router-dom";
import logo from '../assets/bunker.png'
import '../style/register.css'
import axios from 'axios'; import { host } from './imports/imp';

function Register() {
    const [email,setEmail] = React.useState('')
    const [name,setName] = React.useState('')
    const [pass,setPass] = React.useState('')
    const [Cpass,setCpass] = React.useState('')
    const [msg,setMsg] = React.useState('')
    const jid = localStorage.getItem('jid')
    const navigate = useNavigate();
    let height = window.innerHeight
    let balls = height*2



    React.useEffect(()=>{
        if(jid){
        navigate('/')
        }
    },[])

    const reg = async() =>{
        // console.log(name)
        const res = await axios.post(`http://127.0.0.1:4242/register`,{'email':email,'name':name,'password':pass})
        if (res.data === 'exists') {
            setMsg('email already used.')
        }
    }
    if(!jid){
  return (
    <div className="login-body" style={{flexDirection:'column',height:height}} >
        <Link to="/" style={{alignSelf:'flex-start',marginLeft:20,position:'absolute',top:0,left:20}} >
            <img src={logo} alt="" style={{height:80,width:160}} />
        </Link>
        <div style={{height:balls,width:balls,borderRadius:balls,backgroundColor:'black',position:'absolute',bottom:-balls/2,right:-balls/2,zIndex:-1}} ></div>
        <div style={{height:balls,width:balls,borderRadius:balls,backgroundColor:'#ff9900',position:'absolute',top:-balls/2,left:-balls/2,zIndex:-1}} ></div>

        <div className="loginForm" style={{width:400,justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',alignSelf:'center'}} >
            <h1 className="title" style={{textDecoration:'none',color:'black',marginLeft:40,marginTop:40}} >Register</h1>
            <h1 className="title" style={{fontSize:10,textDecoration:'none',color:'gray',position:'relative',alignSelf:'flex-start',marginLeft:40,marginBottom:20}} >try it you'll like it.</h1>
            <h1 className="msg" style={{fontSize:13,textDecoration:'none',color:'black'}} >{msg}</h1>
            <input value={name} onChange={(event => setName(event.target.value))} className="email" placeholder="Full Name" style={{paddingLeft:15,paddingTop:10,paddingBottom:8,width:'80%',borderRadius:10}} />
            <div style={{height:20,width:1,backgroundColor:'black',borderRadius:10,marginTop:6,marginBottom:6}} ></div>
            <input type="email" value={email} onChange={(event => setEmail(event.target.value))} className="email" placeholder="Email" style={{paddingLeft:15,paddingTop:10,paddingBottom:8,width:'80%',borderRadius:10}} />
            <div style={{height:20,width:1,backgroundColor:'black',borderRadius:10,marginTop:6,marginBottom:6}} ></div>
            <input type="password" value={pass} onChange={(event => setPass(event.target.value))} className="email" placeholder="Password" style={{paddingLeft:15,paddingTop:10,paddingBottom:8,width:'80%',borderRadius:10}} />
            <div style={{height:20,width:1,backgroundColor:'black',borderRadius:10,marginTop:6,marginBottom:6}} ></div>
            <input type="password" value={Cpass} onChange={(event => setCpass(event.target.value))} className="email" placeholder="Confirm Password" style={{paddingLeft:15,paddingTop:10,paddingBottom:8,width:'80%',borderRadius:10}} />
            <h1 onClick={()=>reg()} className="btnn" >next</h1>
        </div>
    </div>
  );
    }else{
        return(<p>redirecting...</p>)

    }
}

export default Register;
