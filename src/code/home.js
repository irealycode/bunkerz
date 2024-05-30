
import React from 'react';
import { Link,useNavigate } from "react-router-dom";
import logo from '../assets/bunker.png'
import categos from '../assets/stripes.png'
import image from '../assets/ok.png'
import axios from 'axios'; import { host } from './imports/imp';
import '../style/home.css'
import MDashb from './main_dashboard';
// import search from '../assets/search.png'
//#00a1ff blue

let firstCall = 0
function Home() {
  const jid = localStorage.getItem('jid')
  let height = window.innerHeight
  let width = window.innerWidth
  let balls = height*2
  const [stores,setStores] = React.useState([])

  const navigate = useNavigate();



  React.useEffect(()=>{
    // first();
    const getuid = async()=>{
      const res = await axios.post(`http://${host}:4242/uid`,{'jid':jid})
        if (res.data == 'no' || res.data == '505') {
            console.error('/uid request error')
        }else{
            setStores(res.data.stores)
        }
    }
    if (!firstCall) {
      firstCall++
      getuid()
    }
  },[])



  if(!jid){
    return (
      <div className="body" style={{backgroundColor:'black',justifyContent:'center',display:'flex'}}>
      <div className="header" style={{height:90,alignSelf:'center',position:'absolute',width:'100%',top:0,justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'row'}} >
          {/* <img src={logo} alt="" style={{height:80,width:180}} /> */}
          <div className="logo" ></div>
          <img src={categos} alt="" style={{height:30,width:30,position:'absolute',left:20}} />
          <div style={{position:'absolute',right:20}} >
            <Link className="login" to="login" style={{fontSize:22,fontFamily:"monospace",fontWeight:'bolder',textDecoration:'none'}} >log in</Link>
            <Link className="regs" to="register" style={{fontSize:22,fontFamily:"monospace",fontWeight:'bolder',textDecoration:'none',paddingLeft:15,paddingRight:15,paddingTop:9,paddingBottom:9,borderRadius:6,marginLeft:17}} >sign up</Link>
           </div>
          
      </div>
      {/* <h1 style={{position:'absolute',top:90,alignSelf:'center',zIndex:2,color:'black',alignSelf:"center",fontFamily:'NS',fontSize:100}}  >bunkerz</h1> */}
      <div className="banner" style={{width:'100%',position:'absolute',top:90,backgroundColor:'white',height:height-130,alignItems:'center',justifyContent:'center',display:'flex',flexDirection:'row'}} >
        <Link className="regs" to="register" style={{fontSize:22,fontFamily:"NS",fontWeight:'bolder',textDecoration:'none',paddingLeft:15,paddingRight:15,paddingTop:9,paddingBottom:9,borderRadius:6,marginLeft:17,marginRight:75}} >open your doors!</Link>
        <div style={{height:width*0.1,width:2,backgroundColor:'black',borderRadius:10}} ></div>
        <img src={image} style={{height:width*0.3,width:width*0.3,marginLeft:75}} />
      </div>
      <div style={{height:10,width:35,alignSelf:'center',borderRadius:20,backgroundColor:'black'}} ></div>
      {/* <div style={{justifyContent:'center',alignItems:'center',display:'flex'}}>
      <img src={fade} alt="" style={{height:600,width:'100%',position:'absolute',zIndex:-1}} />
      <img src={ad} alt="" style={{height:400,width:720}} />
      </div> */}
  </div>
    );
  }else{
    return (
//       <div className="body" style={{flexDirection:'column',height:height,justifyContent:'center',alignSelf:'center',display:'flex'}}>
//           {/* <div className="header" style={{height:70,width:width-20,alignSelf:'center',position:'absolute',top:10,justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'row'}} >
//           <div className="logo" ></div>
//           </div> */}
          
//         <Link to="/" style={{alignSelf:'flex-start',marginLeft:20,position:'absolute',top:0,left:20}} >
//             <img src={logo} alt="" style={{height:80,width:160}} />
//         </Link>
// {/* 
//         <div style={{height:balls,width:balls,borderRadius:balls,backgroundColor:'black',position:'absolute',bottom:-balls/2,right:-balls/2,zIndex:-1}} ></div>
//         <div style={{height:balls,width:balls,borderRadius:balls,backgroundColor:'#ff9900',position:'absolute',top:-balls/2,left:-balls/2,zIndex:-1}} ></div> */}

//           <div className="shopsForm" style={{width:400,height:height*0.7,display:'flex',flexDirection:'column',alignSelf:'center'}} >
//             <div style={{flexDirection:'row',display:'flex',justifyContent:'center',alignItems:'center'}} >
//               <h1 style={{textDecoration:'none',color:'black',marginTop:120,fontFamily:'ns',fontSize:20,position:'absolute',left:(width/2)-180}} >stores</h1>
//               <button className="addstore" onClick={()=>navigate('add')} style={{border:0,borderRadius:10,marginTop:100,padding:0,position:'absolute',right:(width/2)-180}} >
//                 <p style={{fontFamily:'ns',fontSize:10,paddingLeft:8,paddingRight:8,paddingTop:6,paddingBottom:6}} >add store</p>
//               </button>
//             </div>
//             <div className="storelist" style={{marginTop:70,width:'100%',display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',paddingBottom:20}} >
//               {stores.map((store,i)=>{
//                 return(
//                   <div onClick={()=>window.location.assign("http://"+store.name.toLowerCase()+'.bunkerz.com/dashboard/'+jid+'/sid/'+store.store_id)} key={i} className="shopsref" style={{width:'80%',display:'flex',flexDirection:'column',marginTop:15}} >
//                     <h1 style={{fontSize:18,alignSelf:'flex-start',margin:0,marginTop:10,marginLeft:15,fontFamily:'monospace',fontWeight:'bolder'}} >{store.name}</h1>
//                     <h2 style={{fontFamily:'monospace',fontWeight:'lighter',fontSize:12,color:'gray',alignSelf:'flex-start',marginLeft:15}} >{store.p?'private':'public'}</h2>
//                   </div>
//                 )
//               })}
//             </div>

            
//             {/* <h1 className="title" style={{fontSize:10,textDecoration:'none',color:'gray',position:'relative',alignSelf:'flex-start',marginLeft:40,marginBottom:20}} ></h1> */}
            
//         </div>
//       </div>
    <MDashb stores={stores}/> 
      
    );
  }
  
}

export default Home;
