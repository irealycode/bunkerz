
import React from 'react';
import { Link,useNavigate,useParams } from "react-router-dom";
import searchL from '../assets/search.png'

import '../style/home.css'
import axios from 'axios'; import { host } from '../code/imports/imp';
import AddProducts from './addproduct';
import ViewOrder from './vieworder';


let productss = {}

function Orders() {

    const navigate = useNavigate();
    let width = window.innerWidth
    let height = window.innerHeight
    let { jid,sid } = useParams()
    const [tab,SetTab] = React.useState(0)
    const [hover,SetHover] = React.useState(0)
    const [addProduct,SetAddProduct] = React.useState(false)
    const [products,setProducts] = React.useState([])
    const [product,setProduct] = React.useState(null)
    const [productsSelect,setProductSelect] = React.useState([])
    const [orders,setOrders] = React.useState([])
    const [selected,setSelected] = React.useState(0)
    const [search,setSearch] = React.useState('')
    const [showOptions,setShowOptions] = React.useState(false)
    const [orderview,SetOrderView] = React.useState({show:false,orderid:''})
    const [save,SetSave] = React.useState(false)
    const [dateAsc,setDateAsc] = React.useState(false)
    const [statusSort,setStatusSort] = React.useState(1)

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))


    React.useEffect(()=>{
        // get_store()
        get_orders()
            
    },[])


    const get_store = async() =>{
        const res = await axios.post(`http://${host}:4242/getstore`,{'w':0,'subd':window.location.host.split(".")[0]})

        if (res.data != "505" && res.data != "no.") {
            setProducts(res.data.products)
            let t=[]
            for (let xyz = 0; xyz < res.data.products.length; xyz++) {
                t.push(false)
            }
            setProductSelect(t)
            setShowOptions(false)
            setSelected(0)
        }
    }

    const sort_by_date = (s) =>{
        let sort = orders
        if (dateAsc) {
            sort.sort((a,b)=> {
                if (a.status && !b.status) {
                    return -1*s;
                  }

                if (!a.status && b.status) {
                return 1*s;
                }
                
                return new Date(b.created_at)-new Date(a.created_at)})
            setOrders(sort)
            setDateAsc(!dateAsc)
        }else{
            sort.sort((a,b)=> {
                if (a.status && !b.status) {
                    return -1*s;
                  }

                if (!a.status && b.status) {
                return 1*s;
                }
                
                return new Date(a.created_at)-new Date(b.created_at)})
            setOrders(sort)
            setDateAsc(!dateAsc)
        }
        
    }



    const get_orders = async() =>{
        const res = await axios.post(`http://${host}:4242/getorders`,{'sid':sid})

        if (res.data != "505" && res.data != "no.") {
            setOrders(res.data.orders)
        }
    }

    function vieworders(){
        return (
            <div style={{height:'100%',width:'100%',display:'flex',justifyContent:'start',alignItems:'center',position:'relative',flexDirection:'column',overflowY:'scroll'}} >
                <div style={{width:'90%',marginTop:50,position:'relative'}} >
                    <h1 style={{margin:0,fontFamily:'mc',fontSize:35,color:'rgba(0,0,0,0.9)'}} >Draft Orders</h1>
                </div>
                <div style={{width:'90%',marginBottom:50,borderRadius:5,backgroundColor:'white',border:'1px solid rgba(0,0,0,0.2)',marginTop:30,display:'flex',alignItems:'start',justifyContent:'center',flexDirection:'column'}} >
                    <div style={{display:'flex',alignItems:'start',justifyContent:'center',flexDirection:'row',marginTop:10,marginBottom:10,width:'100%'}} >
                        <div style={{width:(width-360)*0.7-30,display:'flex',flexDirection:'row',height:20,justifyContent:'center',alignItems:'center',backgroundColor:'white',borderTopRightRadius:0,borderBottomRightRadius:0,padding:10,borderTopLeftRadius:5,borderBottomLeftRadius:5,border:'2px solid rgba(0,0,0,0.3)',borderRight:0}} >
                            <img src={searchL} alt="" style={{height:20,width:20,marginRight:7,marginBottom:1,filter:'invert(50%)'}} />
                            <input value={search}  onChange={(event)=>setSearch(event.target.value)}  style={{backgroundColor:'rgba(0,0,0,0)',height:'100%',fontWeight:'lighter',width:'100%',fontFamily:'ml',fontSize:18,border:0,padding:4,outline:0,color:'black',marginTop:4}} placeholder='Filter orders' />
                        </div>
                        <button  style={{cursor:'pointer',width:'10%',height:44,border:'2px solid rgba(0,0,0,0.3)',borderTopRightRadius:5,borderBottomRightRadius:5,fontFamily:'mc',fontSize:20,overflow:'hidden',color:'rgba(0,0,0,0.8)'}} >Filter</button>
                        <div style={{marginLeft:10,width:'10%',position:'relative'}} >
                            <button onClick={()=>setShowOptions(!showOptions)} style={{cursor:'pointer',width:'100%',height:44,border:'2px solid rgba(0,0,0,0.3)',borderRadius:5,fontFamily:'mc',fontSize:20,overflow:'hidden',color:'rgba(0,0,0,0.8)',borderBottomRightRadius:!showOptions?5:0,borderBottomLeftRadius:!showOptions?5:0}} >⇅ Sort</button>
                            <div className='text' style={{position:'absolute',maxHeight:showOptions?200:0,top:'95%',width:"100%",zIndex:3,alignSelf:'center',overflow:'hidden'}} >
                                <button onClick={()=>sort_by_date(statusSort)} style={{cursor:'pointer',width:'100%',height:44,border:'2px solid rgba(0,0,0,0.3)',borderRadius:0,borderTop:'2px solid rgba(0,0,0,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'mc',fontSize:20,overflow:'hidden',color:'rgba(0,0,0,0.8)'}} >
                                    <img src={'/static/date.png'} style={{width:20,height:20,opacity:0.7,marginRight:10,marginBottom:5}} />
                                    Date
                                </button>
                                <button onClick={()=>{sort_by_date(statusSort*-1);setStatusSort(statusSort*-1)}} style={{cursor:'pointer',width:'100%',height:44,border:'2px solid rgba(0,0,0,0.3)',borderRadius:0,borderTop:0,fontFamily:'mc',fontSize:20,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',color:'rgba(0,0,0,0.8)',borderBottomRightRadius:5,borderBottomLeftRadius:5}} >
                                    <img src={'/static/status.png'} style={{width:22,height:22,opacity:0.7,marginRight:10,marginBottom:5}} />
                                    Status
                                </button>
                            </div>
                            
                        </div>
                        
                    </div>
    
                {/* <h1 style={{alignSelf:'center'}} >No products yet.</h1> */}

                
                <div style={{width:'100%',alignSelf:'center',position:'relative',height:60,borderTop:'1px solid rgba(0,0,0,0.2)',borderLeft:0,borderRight:0,overflow:'hidden',flexDirection:'row',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    {/* <div style={{width:15,height:15,border:'2px solid rgba(0,0,0,0.3)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',left:20,position:'absolute'}} ><div style={{width:'100%',height:'100%',borderRadius:10,backgroundColor:'rgba(0,0,0,0)'}} ></div></div> */}
                    <p style={{fontFamily:'mc',fontWeight:'bolder',fontSize:20,color:'rgba(0,0,0,0.6)',position:'absolute',left:'10%'}} >Order id</p>
                    <p style={{fontFamily:'mc',fontWeight:'bolder',alignSelf:'center',position:'absolute',fontSize:20,color:'rgba(0,0,0,0.6)'}} >Date</p>
                    <div style={{position:'absolute',left:'85%',padding:6,paddingLeft:12,paddingRight:12,borderRadius:30,marginLeft:10,backgroundColor:'rgba(0,0,0,0)',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
                        <div style={{width:15,height:15,borderRadius:15,backgroundColor:'gray',marginRight:6}} ></div>
                        <p style={{margin:0,fontFamily:'mb',fontSize:18,color:'rgba(0,0,0,0.6)',alignSelf:'start'}} >status</p>
                    </div>
                </div>
                {orders.map((order,yy)=>{
                    let date = new Date(order.created_at)
                    let o = order._id.substring(5, 15)
                    if (o.toLowerCase().startsWith(search.toLowerCase())) {
                        return(
                            <div key={yy} onClick={()=>SetOrderView({show:true,orderid:order._id,time:order.created_at})} style={{cursor:'pointer',width:'100%',alignSelf:'center',position:'relative',height:60,borderTop:'1px solid rgba(0,0,0,0.2)',borderLeft:0,borderRight:0,overflow:'hidden',flexDirection:'row',display:'flex',alignItems:'center',justifyContent:'center'}}>
                                {/* <div style={{width:15,height:15,border:'2px solid rgba(0,0,0,0.3)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',left:20,position:'absolute'}} ><div style={{width:'100%',height:'100%',borderRadius:10,backgroundColor:'rgba(0,0,0,0)'}} ></div></div> */}
                                <p style={{fontFamily:'mc',fontWeight:'bolder',fontSize:20,color:'rgba(0,0,0,0.7)',position:'absolute',left:'10%'}} >§{o.toUpperCase()}</p>
                                <p style={{fontFamily:'mc',fontWeight:'bolder',alignSelf:'center',position:'absolute',fontSize:20,color:'rgba(0,0,0,0.8)'}} >{date.toDateString()}</p>
                                
                                {!order.status?<div style={{position:'absolute',left:'85%',padding:6,paddingLeft:12,paddingRight:12,borderRadius:30,marginLeft:10,backgroundColor:'rgba(255, 153, 0,0.5)',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
                                    <div style={{width:11,height:11,borderRadius:15,backgroundColor:'rgba(0,0,0,0)',border:'4px solid #ff9900',marginRight:6,overflow:'hidden',position:'relative'}} >
                                        <div style={{width:12,height:12,backgroundColor:'#ff9900',left:'50%',position:'absolute'}} ></div>
                                    </div>
                                    <p style={{margin:0,fontFamily:'mb',fontSize:18,color:'rgba(0,0,0,0.8)',alignSelf:'start'}} >pending</p>
                                </div>:null}
                                {order.status?<div style={{position:'absolute',left:'85%',padding:6,paddingLeft:12,paddingRight:12,borderRadius:30,marginLeft:10,backgroundColor:'rgba(51, 227, 2,0.5)',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
                                    <div style={{width:15,height:15,borderRadius:15,backgroundColor:'#2ca30b',marginRight:6,overflow:'hidden',position:'relative'}} ></div>
                                    <p style={{margin:0,fontFamily:'mb',fontSize:18,color:'rgba(0,0,0,0.8)',alignSelf:'start'}} >fulfilled</p>
                                </div>:null}
                                {/* <div style={{position:'absolute',left:'85%',display:'flex',alignItems:'center',justifyContent:'center'}} >
                                    <div style={{width:10,height:10,borderRadius:10,backgroundColor:order.status?'#2ca30b':'#ff9900'}}></div>
                                    <p style={{fontFamily:'mc',fontWeight:'light',fontSize:20,marginLeft:10}} >{order.status?'fulfilled':'pending'}</p>
                                </div> */}
                                
                            </div>
                        )
                    }else{
                        return null
                    }
                })}

                </div>
    
                
            </div>
            
      );
    }

    if (orderview.show) {
        let i ={i:5,o:""}
        for(i={i:5,o:""};i.i<15;i.i=i.i+1) i.o=i.o+orderview.orderid[i.i]
        return(
            <div style={{position:'relative',overflowY:'scroll',height:'100%',display:'flex',flexDirection:'column'}}>
                <div onClick={()=>SetOrderView({show:false,orderid:''})} style={{cursor:'pointer',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'start',marginLeft:50,marginTop:50,alignSelf:'start'}} >
                    <img src={"/static/back.png"} style={{height:20,width:20,cursor:'pointer',opacity:0.6}}  />
                    <p style={{fontFamily:'mc',fontWeight:'light',fontSize:20,marginLeft:10,color:'rgba(0,0,0,0.6)',marginTop:5,marginBottom:0}} >Orders</p>
                </div>

                <ViewOrder orderid={orderview.orderid} time={orderview.time} />
            </div>
        )
    }
    return(
        vieworders()
    )
       
    
  
}



export default Orders;
