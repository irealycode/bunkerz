
import React from 'react';
import { Link,useNavigate } from "react-router-dom";
import logo from '../assets/bunker.png'
import '../style/home.css'
import axios from 'axios';
import { host } from './imports/imp';

function Add() {
    const [name,setName] = React.useState('')
    const [subd,setSubd] = React.useState('')
    const [pass,setPass] = React.useState('')
    const [pub,setSwitch] = React.useState(true)
    const [Acc1,setAcc1] = React.useState(false)
    const [Acc2,setAcc2] = React.useState(false)
    const [subTaken,setSubTaken] = React.useState(false)
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


    function check(str) {
        // Trim whitespace from both ends of the string
        const trimmedStr = str.trim();
        
        // Check if the trimmed string is empty or if the original string starts with whitespace
        return trimmedStr.length === 0 || str[0] === ' ';
    }

    const login = async() =>{
        // console.log(name)
        setSubTaken(false)
        if (!check(name) && !check(subd) && !check(jid) && Acc2 && Acc1) {
            const res = await axios.post(`http://${host}:4242/addstore`,{'name':name,'subd':subd,'jid':jid})
            if (res.data === 'no' || res.data === '505') {
               
                // setMsg('wrong email or password.')
                // console.error('zbi')
            }else{
                if (res.data != "subdomain taken.") {
                    window.location.assign("http://"+subd+'.bunkerz.com/dashboard/'+jid+'/sid/'+res.data.sid)
                }else{
                    setSubTaken(true)
                }

                // setMsg('')
                // localStorage.setItem("jid", res.data)
                // navigate('/')
            }
        }
        
    }

    

    console.log(pub?'off':'on')

    if(jid){
  return (
    <div className="login-body" style={{flexDirection:'column',height:height}} >
        <Link to="/" style={{alignSelf:'flex-start',marginLeft:20,position:'absolute',top:0,left:20}} >
            <img src={'/static/bunker_cont.png'} alt="" style={{height:70,width:130}} />
        </Link>

        <div className="loginForm" style={{width:400,justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',alignSelf:'center'}} >
            <h1 style={{textDecoration:'none',fontFamily:'ml',fontSize:45,color:'black',marginTop:40}} >Set up shop?</h1>
            <h1 style={{fontSize:10,fontFamily:'mb',textDecoration:'none',color:'gray',position:'relative',alignSelf:'flex-start',marginLeft:40,marginBottom:20}} ></h1>
            {/* <h1 className="msg" style={{fontSize:13,textDecoration:'none',color:'black',marginBottom:10}} >{msg}</h1> */}
            <input value={name} onChange={(event => setName(event.target.value.trim()))} className="email" type="email" placeholder="Store name" style={{fontFamily:'mb',fontSize:16,border:'2px solid black',paddingLeft:15,paddingTop:10,paddingBottom:8,width:'80%',borderRadius:10,marginBottom:16}} />
            <input value={subd} onChange={(event => setSubd(event.target.value.trim().toLowerCase()))} className="email" placeholder="Subdomain" style={{fontFamily:'mb',fontSize:16,border:`2px solid ${subTaken?'red':'black'}`,paddingLeft:15,paddingTop:10,paddingBottom:8,width:'80%',borderRadius:10,marginBottom:5}} />
            {subTaken?<h1 style={{fontSize:10,textDecoration:'none',color:'red',position:'relative',alignSelf:'center',marginBottom:20}} >Subdomain already taken.</h1>:null}
            {/* <label class="switch">
                <input onClick={()=>{setSwitch(!pub)}} type="checkbox"/>
                <span class="slider round"></span>
            </label> */}
            {/* <div className="container" style={{alignItems:'center',justifyContent:'center',display:'flex',alignSelf:'flex-start',marginTop:10,marginBottom:10}} >
            <h1 onClick={()=>setSwitch(!pub)} className={'title'} style={{fontSize:16,textDecoration:'none',position:'relative',alignSelf:'flex-start',marginLeft:40,marginBottom:10,marginRight:20}} >{pub?'public':'private'}</h1>
             <span onClick={()=>setSwitch(!pub)} className={!pub?'lock':'unlocked'}></span>
            </div> */}

            <div style={{display:'flex',flexDirection:'row',marginBottom:10,marginLeft:35,alignSelf:'flex-start'}} >
                <input value={Acc1} onClick={()=>setAcc1(!Acc1)} type="checkbox"/>
                <h1 style={{fontSize:10,textDecoration:'none',color:'gray',position:'relative',alignSelf:'flex-start',marginLeft:10}} >You Accept our Terms and Conditions.</h1>
            </div>
            <div style={{display:'flex',flexDirection:'row',marginBottom:20,marginLeft:35,alignSelf:'flex-start'}} >
                <input value={Acc2} onClick={()=>setAcc2(!Acc2)} type="checkbox"/>
                <h1 style={{fontSize:10,textDecoration:'none',color:'gray',position:'relative',alignSelf:'flex-start',marginLeft:10}} >You Accept our Pivacy Policy.</h1>
            </div>
            

            {/* <div style={{height:20,width:1,backgroundColor:'black',borderRadius:10,marginTop:6,marginBottom:6}} ></div>
            <input type="password" value={pass} onChange={(event => setPass(event.target.value))} className="email" placeholder="" style={{paddingLeft:15,paddingTop:10,paddingBottom:8,width:'80%',borderRadius:10,marginBottom:16}} /> */}
            <h1 onClick={()=>login()} style={{cursor:'pointer'}} className="btnn" >next</h1>
        </div>
    </div>
  );
    }else{ 
        
        return(<p>redirecting...</p>)
    }
}

export default Add;
