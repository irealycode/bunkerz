
import React from 'react';
import { Link,useNavigate,useParams } from "react-router-dom";
import logo from '../assets/bunker.png'
import home from '../assets/home.png'
import orders from '../assets/orders2.png'
import money from '../assets/money.png'
import eye from '../assets/eye.png'

import '../style/home.css'
import axios from 'axios'; import { host } from '../code/imports/imp';

function Home() {

    const navigate = useNavigate();
    let width = window.innerWidth
    let height = window.innerHeight
    let { jid,sid } = useParams()
    const [tab,SetTab] = React.useState(0)
    const [hover,SetHover] = React.useState(0)
    const [viewsTotal,SetViewsTotal] = React.useState(0)
    const [ordersTotal,SetOrdersTotal] = React.useState(0)
    const [salesTotal,SetSalesTotal] = React.useState(0)

    

    // let balls = height*2


    React.useEffect(()=>{
        get_analytics()
            
    },[])


    async function get_analytics(){
        const res = await axios.post(`http://${host}:4242/getanalitycs`,{'sid':sid})

        if (res.data != "505" && res.data != "no.") {
            let suborders = res.data.orders
            let subviews = res.data.views
            SetViewsTotal(subviews.length)
            SetOrdersTotal(suborders.length)
            SetSalesTotal(res.data.sales.length)
        }
    }

    
  return (
        <div style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'start',position:'relative'}} >
            <div style={{width:'90%',marginTop:50}} >
                <div style={{display:'flex',alignItems:'center',justifyContent:'start',flexDirection:'row'}} >
                    <h1 style={{margin:0,fontFamily:'mc',fontSize:30,marginBottom:10,marginRight:9,color:'rgba(0,0,0,0.9)'}} >Welcome to</h1>
                    <h1 style={{margin:0,fontFamily:'ns',fontSize:22,marginBottom:10.5,color:'rgba(0,0,0,0.9)'}} >bunkerz,</h1>
                </div>
                <h1 style={{margin:0,fontFamily:'ml',color:'gray',fontSize:25}} >Here are some tips to help you get started.</h1>
            </div>

            <div style={{height:height-72,width:200,maxHeight:530,position:'absolute',right:0,backgroundColor:'rgba(0,0,0,0)',borderLeft:'2px solid #CAC2B6',borderBottom:'2px solid #CAC2B6',borderBottomLeftRadius:9}} >
                <div style={{width:'100%',height:(height-76)/3,maxHeight:175,borderBottom:'2px solid #CAC2B6',borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}} >
                    <img src={money} alt="" style={{height:60,width:60,filter:'invert(50%)',marginBottom:20}} />
                    <h1 style={{margin:0,fontFamily:'ml',color:'gray',fontSize:22}} >{ salesTotal>0?salesTotal.toString() + " sales":"No sales yet."}</h1>
                </div>
                <div style={{width:'100%',height:(height-76)/3,maxHeight:175,borderBottom:'2px solid #CAC2B6',borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}} >
                    <img src={orders} alt="" style={{height:60,width:60,filter:'invert(50%)',marginBottom:13}} />
                    <h1 style={{margin:0,fontFamily:'ml',color:'gray',fontSize:22}} >{ ordersTotal>0?ordersTotal.toString() + " orders":"No orders yet."}</h1>
                </div>
                <div style={{width:'100%',height:(height-76)/3,maxHeight:175,borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}} >
                    <img src={eye} alt="" style={{height:55,width:55,filter:'invert(50%)',marginBottom:13}} />
                    <h1 style={{margin:0,fontFamily:'ml',color:'gray',fontSize:22}} >{ viewsTotal>0?viewsTotal.toString() + " visits":"No visits yet."}</h1>
                </div>
            </div>
            
        </div>
  );
}

export default Home;
