
import React from 'react';
import { Link,useNavigate } from "react-router-dom";
import logo from '../assets/bunker.png'
import '../style/home.css'
import axios from 'axios';
import $ from 'jquery';
import { host } from './imports/imp';

function Add() {
    const [name,setName] = React.useState('')
    const [pass,setPass] = React.useState('')
    const [pub,setSwitch] = React.useState(true)
    const navigate = useNavigate();
    const jid = localStorage.getItem('jid')
    let width = window.innerWidth
    let height = window.innerHeight
    let balls = height*2


    React.useEffect(()=>{
        // $( ".lock" ).click(function() {
        //     $(this).toggleClass('unlocked');
        // });
        if(!jid){
            navigate('/')
            }
            
    },[])


    const login = async() =>{
        // console.log(name)
        const res = await axios.post(`http://${host}:4242/addstore`,{'name':name,'prv':pub?'pub':'prv','jid':jid})
        if (res.data === 'no' || res.data === '505') {
            // setMsg('wrong email or password.')
            console.error('zbi')
        }else{
            console.log('ok')

            // setMsg('')
            // localStorage.setItem("jid", res.data)
            navigate('/')
        }
    }

    

    console.log(pub?'off':'on')

    if(jid){
  return (
    <div className="login-body" style={{flexDirection:'column',height:height}} >
        <Link to="/" style={{alignSelf:'flex-start',marginLeft:20,position:'absolute',top:0,left:20}} >
            <img src={logo} alt="" style={{height:80,width:160}} />
        </Link>

        <div className="loginForm" style={{width:400,justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',alignSelf:'center'}} >
            <h1 className="title" style={{textDecoration:'none',color:'black',marginLeft:40,marginTop:40}} >Add Store</h1>
            <h1 className="title" style={{fontSize:10,textDecoration:'none',color:'gray',position:'relative',alignSelf:'flex-start',marginLeft:40,marginBottom:20}} >open your store.</h1>
            {/* <h1 className="msg" style={{fontSize:13,textDecoration:'none',color:'black',marginBottom:10}} >{msg}</h1> */}
            <input value={name} onChange={(event => setName(event.target.value))} className="email" placeholder="Store Name" style={{paddingLeft:15,paddingTop:10,paddingBottom:8,width:'80%',borderRadius:10,marginBottom:16}} />
            {/* <label class="switch">
                <input onClick={()=>{setSwitch(!pub)}} type="checkbox"/>
                <span class="slider round"></span>
            </label> */}
            <div className="container" style={{alignItems:'center',justifyContent:'center',display:'flex',alignSelf:'flex-start',marginTop:10,marginBottom:10}} >
            <h1 onClick={()=>setSwitch(!pub)} className={'title'} style={{fontSize:16,textDecoration:'none',position:'relative',alignSelf:'flex-start',marginLeft:40,marginBottom:10,marginRight:20}} >{pub?'public':'private'}</h1>
             <span onClick={()=>setSwitch(!pub)} className={!pub?'lock':'unlocked'}></span>
            </div>

            <div style={{display:'flex',flexDirection:'row',marginBottom:10,marginLeft:35,alignSelf:'flex-start'}} >
            <input type="checkbox"/>
                <h1 className="title" style={{fontSize:10,textDecoration:'none',color:'gray',position:'relative',alignSelf:'flex-start',marginLeft:10}} >You Accept our Terms and Conditions.</h1>
            </div>
            <div style={{display:'flex',flexDirection:'row',marginBottom:20,marginLeft:35,alignSelf:'flex-start'}} >
            <input type="checkbox"/>
                <h1 className="title" style={{fontSize:10,textDecoration:'none',color:'gray',position:'relative',alignSelf:'flex-start',marginLeft:10}} >You Accept our Pivacy Policy.</h1>
            </div>
            

            {/* <div style={{height:20,width:1,backgroundColor:'black',borderRadius:10,marginTop:6,marginBottom:6}} ></div>
            <input type="password" value={pass} onChange={(event => setPass(event.target.value))} className="email" placeholder="" style={{paddingLeft:15,paddingTop:10,paddingBottom:8,width:'80%',borderRadius:10,marginBottom:16}} /> */}
            <h1 onClick={()=>login()} className="btnn" >next</h1>
        </div>
    </div>
  );
    }else{ 
        
        return(<p>redirecting...</p>)
    }
}

export default Add;
