
import React from 'react';
import { Link,useNavigate } from "react-router-dom";
import logo from '../../assets/white_logo.png'
import trade from '../../assets/white_trade.png'
import shop from '../../assets/shop.png'
import '../../style/login.css'
import axios from 'axios'; import { host } from '../imports/imp';

function Make() {
    const [email,setEmail] = React.useState('')
    const [pass,setPass] = React.useState('')
    const [H,setH] = React.useState(36)
    const [choice,setChoice] = React.useState(2)
    const [choice1,setChoice1] = React.useState('PLatform')
    const [platforms,setPlatform] = React.useState(['Cs2','Valorant','League','Netflix','Prime','Other'])
    const [lvl,setLVL] = React.useState(0)
    const navigate = useNavigate();

    // document.querySelector(".test").addEventListener("click", function () {
    //     const myList = document.getElementById("myList");
      
    //     // Check the current height and toggle it
    //     if (myList.style.height === "" || myList.style.height === "auto") {
    //       myList.style.height = "200px"; // Set the desired height
    //     } else {
    //       myList.style.height = "auto";
    //     }
    //   });

    function scrollToTop() {
        const div = document.getElementById('list');
        div.scrollTop = 0;
      }
    



  return (
    <div className="Make-body" style={{justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column'}} >
        <Link to="/" style={{alignSelf:'flex-start',marginLeft:20}} >
            <img src={logo} alt="" style={{height:80,width:180}} />
        </Link>
        {!lvl?<div className="MakeForm" style={{width:300,justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column'}} >
            <h1 className="title" style={{fontSize:26,textDecoration:'none',color:'black'}} >type..</h1>
            <div style={{flexDirection:'row',marginTop:20,marginBottom:20}} >
            <button onClick={()=>{setChoice(0)}} className="Ctrade" style={{padding:25,height:91,width:91,borderRadius:13}}>
              </button>
              <button onClick={()=>{setChoice(1)}} className="Cshop" style={{padding:25,height:91,width:91,borderRadius:13}}>
              </button>
            </div>
            
            <h1 onClick={()=>setLVL(1)} className="btnn" >next</h1>
        </div>:
        <div className="MakeForm" style={{width:300,justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column'}} >
            <h1 className="title" style={{fontSize:26,textDecoration:'none',color:'black'}} >creds..</h1>

            <div style={{marginTop:20,marginBottom:10,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} >
                    {/* <button className="select" >select</button> */}
                <div id="list" className="list" style={{flexDirection:'column',width:300*0.8,alignSelf:'center',borderRadius:13,zIndex:2,marginBottom:20,height:H}} >
                <button className="test" onClick={()=>setH(180)} ><h2 style={{fontSize:16,margin:0,fontWeight:'bolder',paddingTop:10,paddingBottom:10}} >{choice1}</h2></button>
                    <div>
                        {
                            platforms.map((plat,i)=>{
                                return(
                                    <button onClick={()=>{setH(36);setChoice1(plat);scrollToTop();}} ><h2 key={i} style={{fontSize:16,margin:0,fontWeight:'bolder',paddingTop:10,paddingBottom:10}} >{plat}</h2></button>
                                )
                            })
                        }
                    </div>
                </div>
                <input value={email} onChange={(event => setEmail(event.target.value))} className="email" placeholder="Account Username/Email.." style={{paddingLeft:15,paddingTop:16,paddingBottom:16,width:'80%',borderRadius:0}} />
                <input type="password" value={pass} onChange={(event => setPass(event.target.value))} className="pass" placeholder="Account Password.." style={{paddingLeft:15,paddingTop:16,paddingBottom:16,width:'80%',borderRadius:0}} />


            </div>
            
            <h1  className="btnn" >next</h1>
        </div>}
    </div>
  );
}

export default Make;
