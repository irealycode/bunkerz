import React from 'react';
import { Link,useNavigate } from "react-router-dom";
import logo from '../assets/bunker.png'
import '../style/login.css'
import axios from 'axios'; import { host } from './imports/imp';

function Login() {
    const [email,setEmail] = React.useState('')
    const [pass,setPass] = React.useState('')
    const [msg,setMsg] = React.useState('')
    const navigate = useNavigate();
    const jid = localStorage.getItem('jid')
    let width = window.innerWidth
    let height = window.innerHeight
    let balls = height


    React.useEffect(()=>{
        if(jid){
            navigate('/')
            }
    },[])


    const login = async() =>{
        // console.log(name)
        const res = await axios.post(`http://${host}:4242/login`,{'email':email,'password':pass,options:false})
        if (res.data == 'no' || res.data == '505') {
            setMsg('wrong email or password.')
        }else{
            setMsg('')
            console.log(res.data)
            localStorage.setItem("jid", res.data)
            navigate('/')
        }
    }

    if(!jid){
  return (
    <div className="login-body" style={{flexDirection:'column',height:height,overflow:'hidden !important'}} >
        <Link to="/" style={{alignSelf:'flex-start',marginLeft:20,position:'absolute',top:0,left:20}} >
            <img src={logo} alt="" style={{height:80,width:160}} />
        </Link>
        

        <div className="loginForm" style={{width:400,justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',alignSelf:'center'}} >
            <h1 className="title" style={{textDecoration:'none',color:'black',marginLeft:40,marginTop:40}} >Login</h1>
            <h1 className="title" style={{fontSize:10,textDecoration:'none',color:'gray',position:'relative',alignSelf:'flex-start',marginLeft:40,marginBottom:20}} >join bunkerz now.</h1>
            <h1 className="msg" style={{fontSize:13,textDecoration:'none',color:'black',marginBottom:10}} >{msg}</h1>
            <input type="email" value={email} onChange={(event => setEmail(event.target.value))} className="email" placeholder="Email" style={{paddingLeft:15,paddingTop:10,paddingBottom:8,width:'80%',borderRadius:10}} />
            <div style={{height:20,width:1,backgroundColor:'black',borderRadius:10,marginTop:6,marginBottom:6}} ></div>
            <input type="password" value={pass} onChange={(event => setPass(event.target.value))} className="email" placeholder="Password" style={{paddingLeft:15,paddingTop:10,paddingBottom:8,width:'80%',borderRadius:10,marginBottom:16}} />
            <h1 onClick={()=>login()} className="btnn" >next</h1>
        </div>
        <div style={{height:balls,width:balls,borderRadius:balls.toString()+'px 0 0 0',backgroundColor:'black',position:'absolute',bottom:0,right:0,zIndex:-1}} ></div>
        <div style={{height:balls,width:balls,borderRadius:'0 0 '+balls.toString()+'px 0',backgroundColor:'#ff9900',position:'absolute',top:0,left:0,zIndex:-1}} ></div>
    </div>
  );
    }else{ 
        
        return(<p>redirecting...</p>)
    }
}



export default Login;
