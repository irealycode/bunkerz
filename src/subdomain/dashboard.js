
import React from 'react';
import { Link,useNavigate,useParams } from "react-router-dom";
import logo from '../assets/bunker.png'
import home from '../assets/home.png'
import orders from '../assets/orders.png'
import products from '../assets/products.png'
import customers from '../assets/customers.png'
import analytics from '../assets/analytics.png'
import marketing from '../assets/marketing.png'
import templates from '../assets/templates.png'
import settings from '../assets/settings.png'
import homeC from '../assets/homeC.png'
import ordersC from '../assets/ordersC.png'
import productsC from '../assets/productsC.png'
import customersC from '../assets/customersC.png'
import analyticsC from '../assets/analyticsC.png'
import marketingC from '../assets/marketingC.png'
import templatesC from '../assets/templatesC.png'
import settingsC from '../assets/settingsC.png'
import searchL from '../assets/search.png'
import '../style/home.css'
import axios from 'axios'; import { host } from '../code/imports/imp';
import Home from './home';
import Products from './products';
import Orders from './orders';
import Ananlytics from './analytics';

function Dashb() {

    const navigate = useNavigate();
    let width = window.innerWidth
    let height = window.innerHeight
    let { jid,sid } = useParams()
    const [tab,SetTab] = React.useState(0)
    const [hover,SetHover] = React.useState(0)
    const [open,SetOpen] = React.useState(true)
    

    // let balls = height*2


    React.useEffect(()=>{
        // get_store()
            
    },[])


    const get_store = async() =>{
        console.log("store requested")
        const res = await axios.post(`http://${host}:4242/getstore`,{'w':0,'subd':window.location.host.split(".")[0]})

        if (res.data != "505" && res.data != "no.") {

        }
    }

    

  return (
        <div style={{height:'100%',width:'100%'}} >
            <div style={{height:70,width:'100%',flexDirection:'row',display:'flex'}} >
                <div style={{height:'100%',width:330,backgroundColor:'#FF9900',position:'relative'}} >
                    <img onClick={()=>SetOpen(!open)} src={"/static/arrow.png"} style={{cursor:'pointer',height:30,width:30,right:20,top:20,position:'absolute',transform:open?'rotate(270deg)':'rotate(90deg)',cursor:'pointer'}}  />
                    <img onClick={()=>window.location.assign("http://bunkerz.com")}  src={logo} alt="" style={{cursor:'pointer',height:60,width:120,marginLeft:10}} />
                </div>
                <div style={{height:'100%',width:width-690,backgroundColor:'#FFBB54',display:'flex',alignItems:'center',justifyContent:'center'}} >
                    <div style={{width:'91%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#FFDBA4',padding:10,borderRadius:6}} >
                        <img src={searchL} alt="" style={{height:25,width:25,marginRight:7,marginBottom:3}} />
                        <input style={{backgroundColor:'rgba(0,0,0,0)',height:'100%',fontWeight:'lighter',width:'100%',fontFamily:'ml',fontSize:18,border:0,padding:4,outline:0,color:'black'}} placeholder='Search' />
                    </div>
                </div>
                <div style={{height:'100%',width:360,backgroundColor:'#FFAE34'}} >
                </div>
            </div>
            <div style={{width:'100%',height:height-70,backgroundColor:'#F6F3EF',display:'flex',flexDirection:'row'}} >
                <div className="retractableBanner" style={{width:open?328:80,height:'100%',backgroundColor:'#F6F3EF',borderRight:'2px solid #CAC2B6',position:'relative',overflow:'hidden'}} >
                    <div style={{marginTop:25}} >
                        <button  onClick={()=>SetTab(0)} style={{height:45,backgroundColor:'rgba(0,0,0,0)',border:0,width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'start',marginTop:8}} >
                            <img src={tab == 0?homeC:home} style={{cursor:'pointer',height:30,width:30,filter:tab!=0?'invert(20%)':'invert(0%)',marginLeft:35}} />
                            <h1 onMouseOver={()=>SetHover(0)} onMouseOut={()=>SetHover(tab)} style={{cursor:'pointer',fontSize:20,marginBottom:5,fontFamily:'ml',marginLeft:20,color:tab!=0 && hover!=0?'rgba(0,0,0,0.8)':'#ff9900'}} >Home</h1>
                        </button>
                        <button  onClick={()=>SetTab(1)} style={{height:45,backgroundColor:'rgba(0,0,0,0)',border:0,width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'start',marginTop:8}} >
                            <img src={tab == 1?ordersC:orders} style={{cursor:'pointer',height:30,width:30,filter:tab!=1?'invert(20%)':'invert(0%)',marginLeft:35}} />
                            <h1 onMouseOver={()=>SetHover(1)} onMouseOut={()=>SetHover(tab)} style={{cursor:'pointer',fontSize:20,marginBottom:5,fontFamily:'ml',marginLeft:20,color:tab!=1 && hover!=1?'rgba(0,0,0,0.8)':'#ff9900'}} >Orders</h1>
                        </button>
                        <button  onClick={()=>SetTab(2)} style={{height:45,backgroundColor:'rgba(0,0,0,0)',border:0,width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'start',marginTop:8}} >
                            <img src={tab == 2?productsC:products} style={{cursor:'pointer',height:30,width:30,filter:tab!=2?'invert(20%)':'invert(0%)',marginLeft:35}} />
                            <h1 onMouseOver={()=>SetHover(2)} onMouseOut={()=>SetHover(tab)} style={{cursor:'pointer',fontSize:20,marginBottom:5,fontFamily:'ml',marginLeft:20,color:tab!=2 && hover!=2?'rgba(0,0,0,0.8)':'#ff9900'}} >Products</h1>
                        </button>
                        <button  onClick={()=>SetTab(3)} style={{height:45,backgroundColor:'rgba(0,0,0,0)',border:0,width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'start',marginTop:8}} >
                            <img src={tab == 3?customersC:customers} style={{cursor:'pointer',height:30,width:30,filter:tab!=3?'invert(20%)':'invert(0%)',marginLeft:35}} />
                            <h1 onMouseOver={()=>SetHover(3)} onMouseOut={()=>SetHover(tab)} style={{cursor:'pointer',fontSize:20,marginBottom:5,fontFamily:'ml',marginLeft:20,color:tab!=3 && hover!=3?'rgba(0,0,0,0.8)':'#ff9900'}} >Customers</h1>
                        </button>
                        <button  onClick={()=>SetTab(4)} style={{height:45,backgroundColor:'rgba(0,0,0,0)',border:0,width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'start',marginTop:8}} >
                            <img src={tab == 4?analyticsC:analytics} style={{cursor:'pointer',height:30,width:30,filter:tab!=4?'invert(20%)':'invert(0%)',marginLeft:35}} />
                            <h1 onMouseOver={()=>SetHover(4)} onMouseOut={()=>SetHover(tab)} style={{cursor:'pointer',fontSize:20,marginBottom:5,fontFamily:'ml',marginLeft:20,color:tab!=4 && hover!=4?'rgba(0,0,0,0.8)':'#ff9900'}} >Analytics</h1>
                        </button>
                        <button  onClick={()=>SetTab(5)} style={{height:45,backgroundColor:'rgba(0,0,0,0)',border:0,width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'start',marginTop:8}} >
                            <img src={tab == 5?marketingC:marketing} style={{cursor:'pointer',height:30,width:30,filter:tab!=5?'invert(20%)':'invert(0%)',marginLeft:35}} />
                            <h1 onMouseOver={()=>SetHover(5)} onMouseOut={()=>SetHover(tab)} style={{cursor:'pointer',fontSize:20,marginBottom:5,fontFamily:'ml',marginLeft:20,color:tab!=5 && hover!=5?'rgba(0,0,0,0.8)':'#ff9900'}} >Marketing</h1>
                        </button>
                        <button  onClick={()=>{window.location.assign('/admin/'+jid+'/sid/'+sid)}} style={{height:45,backgroundColor:'rgba(0,0,0,0)',border:0,width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'start',marginTop:8}} >
                            <img src={tab == 6?templatesC:templates} style={{cursor:'pointer',height:30,width:30,filter:tab!=6?'invert(20%)':'invert(0%)',marginLeft:35}} />
                            <h1 onMouseOver={()=>SetHover(6)} onMouseOut={()=>SetHover(tab)} style={{cursor:'pointer',fontSize:20,marginBottom:5,fontFamily:'ml',marginLeft:20,color:tab!=6 && hover!=6?'rgba(0,0,0,0.8)':'#ff9900'}} >Template</h1>
                        </button>
                    </div>
                    <button onMouseOver={()=>SetHover(7)} onMouseOut={()=>SetHover(tab)} onClick={()=>SetTab(7)} style={{height:45,backgroundColor:'rgba(0,0,0,0)',border:0,width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'start',marginTop:8,position:'absolute',bottom:20}} >
                        <img src={tab == 7?settingsC:settings} style={{cursor:'pointer',height:30,width:30,filter:tab!=7?'invert(20%)':'invert(0%)',marginLeft:35}} />
                        <h1 style={{cursor:'pointer',fontSize:20,marginBottom:5,fontFamily:'ml',marginLeft:20,color:tab!=7 && hover!=7?'rgba(0,0,0,0.8)':'#ff9900'}} >Settings</h1>
                    </button>
                </div>
                <div className="retractableBanner" style={{width:open?width-330:width-82,height:'100%'}} >
                    {tab ==0?<Home/>:null}
                    {tab == 1?<Orders/>:null}
                    {tab == 2?<Products/>:null}
                    {tab == 4?<Ananlytics open={open}/>:null}
                </div>
            </div>
            
        </div>
  );
}

export default Dashb;
