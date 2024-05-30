
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
import shop from '../assets/shop.png'
import shopC from '../assets/shopC.png'
import '../style/home.css'
import axios from 'axios'; import { host } from '../code/imports/imp';
import OrdersV from '../dashboard/ordersOverview';

// let first = 0
function MDashb(p) {
    const stores = p.stores?p.stores:[]
    const navigate = useNavigate();
    let width = window.innerWidth
    let height = window.innerHeight
    const [tab,SetTab] = React.useState(0)
    const [hover,SetHover] = React.useState(0)
    // const [stores,setStores] = React.useState([])
    const [open,SetOpen] = React.useState(true)
    const jid = localStorage.getItem('jid')
    let orders_total=0
    let orders_total_alga=0
    let orders_total_nike=0
    // const data = [{month:'January', orders: 12},{month:'February', orders: 26},{month:'March', orders: 156},{month:'April', orders: 100},];

    const data = [{day:'Monday', orders: 12},{day:'Tuesday', orders: 26},{day:'Wednesday', orders: 156},{day:'Thursday', orders: 100},{day:'Friday', orders: 111},{day:'Saturday', orders: 98},{day:'Sunday', orders: 137}];
    const alga_data = [{day:'Monday', orders: 9},{day:'Tuesday', orders: 15},{day:'Wednesday', orders: 82},{day:'Thursday', orders: 53},{day:'Friday', orders: 50},{day:'Saturday', orders: 57},{day:'Sunday', orders: 79}];
    const nike_data = [{day:'Monday', orders: 0},{day:'Tuesday', orders: 10},{day:'Wednesday', orders: 35},{day:'Thursday', orders: 41},{day:'Friday', orders: 45},{day:'Saturday', orders: 27},{day:'Sunday', orders: 30}];



    

    // let balls = height*2
    data.map((y)=>{orders_total+=y.orders})
    alga_data.map((y)=>{orders_total_alga+=y.orders})
    nike_data.map((y)=>{orders_total_nike+=y.orders})


    React.useEffect(()=>{


        // first();
        
        // const getuid = async()=>{
        //     if (!first) {
        //         console.log('f:',first)
        //         first++
        //         const res = await axios.post(`http://${host}:4242/uid`,{'jid':jid})
        //         if (res.data == 'no' || res.data == '505') {
        //             console.error('error lol')
        //         }else{
        //             setStores(res.data.stores)
        //         }
        //     }
          
        // }
        // if (jid) {
        //     getuid()            
        // }else{
        //     console.log('jid error')
        // }
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
                    <img onClick={()=>{SetOpen(!open);SetTab(0)}} src={"/static/arrow.png"} style={{cursor:'pointer',height:30,width:30,right:20,top:20,position:'absolute',transform:open?'rotate(270deg)':'rotate(90deg)',cursor:'pointer'}}  />
                    <img src={logo} alt="" style={{height:60,width:120,marginLeft:10}} />
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
                <div className="retractableBanner" style={{width:open?328:80,height:'100%',backgroundColor:'#F6F3EF',borderRight:'2px solid #CAC2B6',position:'relative',overflow:"hidden"}} >
                    <div style={{marginTop:25}} >
                        <button  onClick={()=>{SetTab(0);SetOpen(true)}} style={{height:45,backgroundColor:'rgba(0,0,0,0)',border:0,width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'start',marginTop:8}} >
                            <img src={tab == 0?homeC:home} style={{cursor:'pointer',height:30,width:30,filter:tab!=0?'invert(20%)':'invert(0%)',marginLeft:35}} />
                            <h1 onMouseOver={()=>SetHover(0)} onMouseOut={()=>SetHover(tab)} style={{cursor:'pointer',fontSize:20,marginBottom:5,fontFamily:'ml',marginLeft:20,color:tab!=0 && hover!=0?'rgba(0,0,0,0.8)':'#ff9900'}} >Home</h1>
                        </button>
                        
                        <div style={{display:'flex',height:tab == 1?143:53,flexDirection:'column',overflow:'hidden'}} className="HeightSlide" >
                            <button  onClick={()=>{SetTab(1);SetOpen(true)}} style={{height:45,backgroundColor:'rgba(0,0,0,0)',border:0,width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'start',marginTop:8}} >
                                <img src={tab == 1?ordersC:orders} style={{cursor:'pointer',height:30,width:30,filter:tab!=1?'invert(20%)':'invert(0%)',marginLeft:35}} />
                                <h1 onMouseOver={()=>SetHover(1)} onMouseOut={()=>SetHover(tab)} style={{cursor:'pointer',fontSize:20,marginBottom:5,fontFamily:'ml',marginLeft:20,color:tab!=1 && hover!=1?'rgba(0,0,0,0.8)':'#ff9900'}} >Orders</h1>
                            </button>
                            {tab==1?<button  style={{height:45,backgroundColor:'rgba(0,0,0,0)',border:0,width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'start',marginTop:0}} >
                                <h1 className="options"  style={{fontSize:18,marginBottom:0,fontFamily:'ml',marginLeft:60}} > | Recent Orders</h1>
                            </button>:null}
                            {tab==1?<button   style={{height:45,backgroundColor:'rgba(0,0,0,0)',border:0,width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'start',marginTop:0}} >
                                <h1 className="options" style={{fontSize:18,marginBottom:5,fontFamily:'ml',marginLeft:60}} > | History</h1>
                            </button>:null}
                        </div>

                        <div style={{display:'flex',height:tab == 2?52+37*stores.length:53,flexDirection:'column',overflow:'hidden'}} className="HeightSlide" >
                            <button  onClick={()=>{SetTab(2);SetOpen(true)}} style={{height:45,backgroundColor:'rgba(0,0,0,0)',border:0,width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'start',marginTop:8}} >
                                <img src={tab == 2?shopC:shop} style={{cursor:'pointer',height:30,width:30,filter:tab!=2?'invert(20%)':'invert(0%)',marginLeft:35}} />
                                <h1 onMouseOver={()=>SetHover(2)} onMouseOut={()=>SetHover(tab)} style={{cursor:'pointer',fontSize:20,marginBottom:5,fontFamily:'ml',marginLeft:20,color:tab!=2 && hover!=2?'rgba(0,0,0,0.8)':'#ff9900'}} >Shops</h1>
                            </button>
                            {tab==2?stores.map((store,i)=>{
                                return(
                                <button onClick={()=>window.location.assign("http://"+store.name.toLowerCase()+'.bunkerz.com/dashboard/'+jid+'/sid/'+store.store_id)} key={i} style={{height:45,backgroundColor:'rgba(0,0,0,0)',border:0,width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'start',marginTop:0}} >
                                    <h1 className="options" onMouseOver={()=>SetHover(2)} onMouseOut={()=>SetHover(tab)} style={{fontSize:18,marginBottom:0,fontFamily:'ml',marginLeft:60}} > | {store.name.toLowerCase()+'.bunkerz.com'}</h1>
                                </button>
                                )
                            }):null}
                        </div>

                        
                        
                        <button  onClick={()=>{SetTab(3);SetOpen(true)}} style={{height:45,backgroundColor:'rgba(0,0,0,0)',border:0,width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'start',marginTop:8}} >
                            <img src={tab == 3?customersC:customers} style={{cursor:'pointer',height:30,width:30,filter:tab!=3?'invert(20%)':'invert(0%)',marginLeft:35}} />
                            <h1 onMouseOver={()=>SetHover(3)} onMouseOut={()=>SetHover(tab)} style={{cursor:'pointer',fontSize:20,marginBottom:5,fontFamily:'ml',marginLeft:20,color:tab!=3 && hover!=3?'rgba(0,0,0,0.8)':'#ff9900'}} >Customers</h1>
                        </button>
                        

                        <div style={{display:'flex',height:tab == 4?143:53,flexDirection:'column',overflow:'hidden'}} className="HeightSlide" >
                            <button  onClick={()=>{SetTab(4);SetOpen(true)}} style={{height:45,backgroundColor:'rgba(0,0,0,0)',border:0,width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'start',marginTop:8}} >
                                <img src={tab == 4?analyticsC:analytics} style={{cursor:'pointer',height:30,width:30,filter:tab!=4?'invert(20%)':'invert(0%)',marginLeft:35}} />
                                <h1 onMouseOver={()=>SetHover(4)} onMouseOut={()=>SetHover(tab)} style={{cursor:'pointer',fontSize:20,marginBottom:5,fontFamily:'ml',marginLeft:20,color:tab!=4 && hover!=4?'rgba(0,0,0,0.8)':'#ff9900'}} >Analytics</h1>
                            </button>
                            {tab==4?<button style={{height:45,backgroundColor:'rgba(0,0,0,0)',border:0,width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'start',marginTop:0}} >
                                <h1 className="options"  style={{fontSize:18,marginBottom:0,fontFamily:'ml',marginLeft:60}} > | Overall lookup</h1>
                            </button>:null}
                            {tab==4?<button style={{height:45,backgroundColor:'rgba(0,0,0,0)',border:0,width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'start',marginTop:0}} >
                                <h1 className="options" style={{fontSize:18,marginBottom:5,fontFamily:'ml',marginLeft:60}} > | Deep analysis</h1>
                            </button>:null}
                        </div>
                    </div>
                    <button onMouseOver={()=>SetHover(7)} onMouseOut={()=>SetHover(tab)} onClick={()=>{SetTab(7);SetOpen(true)}} style={{height:45,backgroundColor:'rgba(0,0,0,0)',border:0,width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'start',marginTop:8,position:'absolute',bottom:20}} >
                        <img src={tab == 7?settingsC:settings} style={{cursor:'pointer',height:30,width:30,filter:tab!=7?'invert(20%)':'invert(0%)',marginLeft:35}} />
                        <h1 style={{cursor:'pointer',fontSize:20,marginBottom:5,fontFamily:'ml',marginLeft:20,color:tab!=7 && hover!=7?'rgba(0,0,0,0.8)':'#ff9900'}} >Settings</h1>
                    </button>
                </div>



                                    {/* AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA */}
                                    {/* AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA */}
                                    {/* AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA */}
                                    {/* AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA */}


                <div className="retractableBanner" style={{width:open?width-330:width-82,height:'100%',overflowY:'scroll'}} >
                    <OrdersV/>
                </div> 
            </div>
                       
        </div>
  );
}

export default MDashb;
