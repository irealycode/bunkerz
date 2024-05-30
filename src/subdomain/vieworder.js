import React from 'react';
import axios from 'axios'; import { host } from '../code/imports/imp';


function ViewOrder(p){
    const [order,SetOrder] = React.useState([])
    const [fulfilled,setFulfilled] = React.useState([])
    const [uselected,setuSelected] = React.useState([])
    const [fselected,setfSelected] = React.useState([])
    const [orderLength,setOrderLength] = React.useState(0)
    let UnfulfilledTotal = 0
    let fulfilledTotal = 0
    let orderid = p.orderid
    let time = p.time
    let orderName = orderid.substring(5,15)
    let date = new Date(time)

    React.useEffect(()=>{
        get_order()
    },[])

    const get_order = async() =>{
        const res = await axios.post(`http://${host}:4242/getorder`,{'oid':orderid})

        if (res.data != "505" && res.data != "no.") {
            let u = []
            let fs = []
            let os = []
            let fo = []
            for (let xxd = 0; xxd < res.data.order.length; xxd++) {
                if (res.data.order[xxd].status) {
                    fs.push(false)
                    fo.push(res.data.order[xxd])
                }else{
                    u.push(false)
                    os.push(res.data.order[xxd])
                }
            }
            console.log('ok',res.data.order)
            setuSelected(u)
            setfSelected(fs)
            SetOrder(os)
            setFulfilled(fo)
            setOrderLength(res.data.order.length)
        }
    }

    const save_order_state = async() =>{
        let order_save = []

        for (let xxdd = 0; xxdd < order.length; xxdd++) {
            let uorder = order[xxdd]
            uorder.status = false
            delete uorder.files
            delete uorder.title
            uorder.price = parseInt(uorder.price)
            
            order_save.push(uorder)
        }
        for (let xxdd = 0; xxdd < fulfilled.length; xxdd++) {
            let forder = fulfilled[xxdd]
            forder.status = true
            delete forder.files
            delete forder.title
            forder.price = parseInt(forder.price)
            order_save.push(forder)
        }

        console.log('order update',order_save,orderid)

        const res = await axios.post(`http://${host}:4242/saveorderstate`,{'oid':orderid,'save':order_save})
        if (res.data == 'ok') {
        alert('saved')
        get_order()
            
        }else{
        alert('smt wrong')
        }

    }

    const selection = (index, newValue) =>
  setuSelected(prevSelected => [
    ...prevSelected.slice(0, index),
    newValue,
    ...prevSelected.slice(index + 1)
  ]);
  const Fselection = (index, newValue) =>
  setfSelected(prevSelected => [
    ...prevSelected.slice(0, index),
    newValue,
    ...prevSelected.slice(index + 1)
  ]);

    
    // console.log('u:',fselected)

    const fulfill = () =>{
        const us = uselected
        let os = order
        let f = []
        const indicesToDelete = us.reduce((acc, val, index) => {
            if (val === true) {
            acc.push(index);
            }
            return acc;
        }, []);
        
        indicesToDelete.reverse().forEach(index => {
            f.push(os[index])
            us.splice(index, 1);
            os.splice(index, 1);
        });

        // console.log(us,os,f)
        setuSelected(us)
        SetOrder(os)
        for (let ddxx = 0; ddxx < f.length; ddxx++) {
            setFulfilled(fulfilled=>[...fulfilled,f[ddxx]])
            setfSelected(fselected=>[...fselected,false])
            
        }
        
    }


    const takeback = () =>{
        const fs = fselected
        let fo = fulfilled
        let f = []
        const indicesToDelete = fs.reduce((acc, val, index) => {
            if (val === true) {
            acc.push(index);
            }
            return acc;
        }, []);
        
        indicesToDelete.reverse().forEach(index => {
            f.push(fo[index])
            fs.splice(index, 1);
            fo.splice(index, 1);
        });

        // console.log(us,os,f)
        setfSelected(fs)
        setFulfilled(fo)
        for (let ddxx = 0; ddxx < f.length; ddxx++) {
            SetOrder(order=>[...order,f[ddxx]])
            setuSelected(uselected=>[...uselected,false])
            
        }
        
    }


    return(
        <div style={{marginLeft:55,marginTop:20,paddingBottom:20,alignItems:'center',justifyContent:'center',alignSelf:'center',display:'flex',flexDirection:'column',width:'70%',position:'relative'}} >
            <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',alignSelf:'start',position:'relative'}} >
                <p style={{margin:0,fontFamily:'mb',fontSize:26,color:'rgba(0,0,0,0.8)'}} >§{orderName.toUpperCase()}</p>
                <div style={{padding:6,paddingLeft:12,paddingRight:12,borderRadius:30,marginLeft:10,backgroundColor:'rgba(0, 0, 0,0.1)',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
                    <div style={{width:15,height:15,borderRadius:15,backgroundColor:'gray',marginRight:6}} ></div>
                    <p style={{margin:0,fontFamily:'mb',fontSize:18,color:'rgba(0,0,0,0.8)',alignSelf:'start'}} > no payment</p>
                </div>
                {fulfilled.length == 0?<div style={{padding:6,paddingLeft:12,paddingRight:12,borderRadius:30,marginLeft:10,backgroundColor:'rgba(0, 0, 0,0.1)',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
                    <div style={{width:15,height:15,borderRadius:15,backgroundColor:'gray',marginRight:6}} ></div>
                    <p style={{margin:0,fontFamily:'mb',fontSize:18,color:'rgba(0,0,0,0.8)',alignSelf:'start'}} > unfulfilled</p>
                </div>:null}
                {fulfilled.length < orderLength && fulfilled.length != 0?<div style={{padding:6,paddingLeft:12,paddingRight:12,borderRadius:30,marginLeft:10,backgroundColor:'rgba(255, 153, 0,0.5)',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
                    <div style={{width:11,height:11,borderRadius:15,backgroundColor:'rgba(0,0,0,0)',border:'4px solid #ff9900',marginRight:6,overflow:'hidden',position:'relative'}} >
                        <div style={{width:12,height:12,backgroundColor:'#ff9900',left:'50%',position:'absolute'}} ></div>
                    </div>
                    <p style={{margin:0,fontFamily:'mb',fontSize:18,color:'rgba(0,0,0,0.8)',alignSelf:'start'}} > partially fulfilled</p>
                </div>:null}
                {orderLength == fulfilled.length?<div style={{padding:6,paddingLeft:12,paddingRight:12,borderRadius:30,marginLeft:10,backgroundColor:'rgba(51, 227, 2,0.5)',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
                    <div style={{width:15,height:15,borderRadius:15,backgroundColor:'#2ca30b',marginRight:6,overflow:'hidden',position:'relative'}} ></div>
                    <p style={{margin:0,fontFamily:'mb',fontSize:18,color:'rgba(0,0,0,0.8)',alignSelf:'start'}} >order fulfilled</p>
                </div>:null}

            </div>
            <div style={{position:'absolute',right:0,top:0}} >
                <button style={{height:44,backgroundColor:'rgba(0,0,0,0)',border:0,fontFamily:'mc',fontSize:18,overflow:'hidden',color:'rgba(0,0,0,0.8)',paddingLeft:15,paddingRight:15,cursor:'pointer'}} >More options ▼</button>
                <button onClick={()=>save_order_state()}  style={{cursor:'pointer',backgroundColor:'#ff9900',paddingLeft:20,paddingRight:20,paddingTop:12,paddingBottom:12,borderRadius:5,border:0,fontFamily:'msb',alignSelf:'center',color:'black',fontSize:18}} >
                    Save order state
                </button>
            </div>
            

            <div style={{display:"flex",flexDirection:'row',alignSelf:'start'}} >
                <p style={{margin:0,fontFamily:'mc',fontSize:18,color:'rgba(0,0,0,0.6)',marginTop:10,marginRight:6}} >{date.toDateString()}</p>
                <p style={{margin:0,fontFamily:'mc',fontSize:18,color:'rgba(0,0,0,0.6)',marginTop:10}} > at {date.toLocaleTimeString()}</p>
            </div>
            <div style={{display:'flex',flexDirection:'row',width:'100%'}} >
                <div style={{backgroundColor:'white',width:'60%',borderRadius:5,paddingBottom:10,alignSelf:'start',marginTop:10,border:'1px solid rgba(0,0,0,0.2)'}} >

                    <div style={{backgroundColor:'white',borderRadius:5,overflow:'hidden',border:'1px solid rgba(0,0,0,0.2)',width:'100%',position:'relative'}} >
                        <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'start'}} >
                            <div style={{width:25,height:25,borderRadius:25,backgroundColor:'rgba(255, 153, 0,0.5)',marginLeft:20,marginRight:15,border:'3px dashed #ff9900',display:'flex',alignSelf:'center',justifyContent:'center',flexDirection:'column'}} >
                                <div style={{width:17,height:17,backgroundColor:'white',borderRadius:20,alignSelf:'center'}} ></div>
                            </div>
                            <p style={{fontFamily:'mb',fontSize:22,color:'rgba(0,0,0,0.8)'}} >Unfulfilled ({order.length})</p>
                        </div>
                        <div style={{top:15,right:15,position:'absolute',display:'flex',flexDirection:'row',alignItems:'center'}} >
                            <div style={{width:15,height:15,borderRadius:10,backgroundColor:'#ff9900',marginRight:10}}></div>
                            <p style={{fontFamily:'mb',fontSize:22,color:'rgba(0,0,0,0.7)',margin:0}} >pending</p>
                        </div>
                        <div style={{borderTop:'1px solid rgba(0,0,0,0.2)',borderRadius:5,backgroundColor:'white',paddingBottom:10}} >
                            {order.map((o,yy)=>{
                                UnfulfilledTotal += o.qts * parseFloat(o.price)
                                    return(
                                        <div key={yy} style={{paddingTop:10,display:'flex',flexDirection:'row',alignItems:'center'}} >
                                            <div onClick={()=>selection(yy,!uselected[yy])} style={{cursor:'pointer',width:15,height:15,border:'2px solid rgba(0,0,0,0.3)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',marginLeft:20,marginRight:10}} ><div style={{width:'100%',height:'100%',borderRadius:10,backgroundColor:uselected[yy]?'#ff9900':'rgba(0,0,0,0)'}} ></div></div>
                                            <img src={`/uploads/${o.files[0]}`} style={{height:60,width:60,borderRadius:5,border:'1px solid gray',marginLeft:10,marginTop:10}} />
                                            <div style={{display:'flex',flexDirection:'column',marginLeft:20,marginTop:10}} >
                                                <p style={{fontFamily:'mb',fontSize:22,color:'rgba(0,0,0,0.8)',margin:0}} >{o.title}</p>
                                                <div style={{display:'flex',flexDirection:'row',marginTop:5,alignItems:'center'}} >
                                                    <p style={{fontFamily:'mc',fontSize:18,color:'rgba(0,0,0,0.8)',margin:0}} >color</p>
                                                    <div style={{width:15,height:15,border:'2px solid rgba(0,0,0,0.3)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',marginLeft:10}} ><div style={{width:'100%',height:'100%',borderRadius:10,backgroundColor:o.color}} ></div></div>
                                                </div>
                                            </div>
                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',position:'absolute',right:180}} >
                                                <p style={{fontFamily:'mc',fontSize:20,color:'rgba(0,0,0,0.8)',margin:0,marginRight:20}} >${o.price}</p>
                                                <img src={`/static/x.png`} style={{height:9,width:9,borderRadius:2,opacity:0.8,marginBottom:5}} />
                                                <p style={{fontFamily:'mc',fontSize:20,color:'rgba(0,0,0,0.8)',margin:0,marginLeft:20}} >{o.qts}</p>
                                            </div>
                                            <p style={{fontFamily:'mc',fontSize:20,color:'rgba(0,0,0,0.8)',margin:0,position:'absolute',right:40}} >${o.qts * parseFloat(o.price)}</p>
                                        </div>
                                    )
                                })
                            }
                                <p style={{fontFamily:'mc',fontSize:15,color:'rgba(0,0,0,0.0)'}} >|</p>
                                <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
                                    <p style={{fontFamily:'mc',fontSize:20,color:'rgba(0,0,0,0.6)',margin:0,position:'absolute',right:180}} >Subtotal</p>
                                    <p style={{fontFamily:'mc',fontSize:20,color:'rgba(0,0,0,0.6)',margin:0,position:'absolute',right:40}} >${UnfulfilledTotal}</p>
                                </div>
                                <p style={{fontFamily:'mc',fontSize:10,color:'rgba(0,0,0,0.0)'}} >|</p>
                                <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
                                    <p style={{fontFamily:'mc',fontSize:20,color:'rgba(0,0,0,0.6)',margin:0,position:'absolute',right:180}} >Tax</p>
                                    <p style={{fontFamily:'mc',fontSize:20,color:'rgba(0,0,0,0.6)',margin:0,position:'absolute',right:40}} >$0.0</p>
                                </div>
                                <p style={{fontFamily:'mc',fontSize:10,color:'rgba(0,0,0,0.0)'}} >|</p>
                                <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
                                    <p style={{fontFamily:'mb',fontSize:20,color:'rgba(0,0,0,0.8)',margin:0,position:'absolute',right:180}} >Total</p>
                                    <p style={{fontFamily:'mb',fontSize:20,color:'rgba(0,0,0,0.8)',margin:0,position:'absolute',right:40}} >${UnfulfilledTotal}</p>
                                </div>
                                <p style={{fontFamily:'mc',fontSize:10,color:'rgba(0,0,0,0.0)'}} >|</p>
                                <div style={{width:200,height:1,backgroundColor:'rgba(0,0,0,0.2)',position:'absolute',right:70}} ></div>
                                <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',position:'relative'}} >
                                    <p style={{fontFamily:'mb',fontSize:20,color:'rgba(0,0,0,0.8)',margin:0,position:'absolute',right:180,top:15}} >Paid by customer</p>
                                    <p style={{fontFamily:'mb',fontSize:20,color:'rgba(0,0,0,0.8)',margin:0,position:'absolute',right:40,top:15}} >$0</p>
                                </div>
                                <p style={{fontFamily:'mc',fontSize:15,color:'rgba(0,0,0,0.0)'}} >|</p>
                        </div>
                        
                        
                    </div>
                    <div style={{display:'flex',marginTop:10,alignItems:'center',justifyContent:'center',width:'100%'}} >
                            <button onClick={()=>fulfill()} style={{cursor:'pointer',backgroundColor:'#ff9900',paddingLeft:20,paddingRight:20,paddingTop:12,paddingBottom:12,borderRadius:5,border:0,fontFamily:'msb',alignSelf:'center',color:'black',fontSize:18}} >
                                Mark as fulfilled
                            </button>
                        </div>
                </div>
                

                <div style={{width:'39%',borderRadius:5,paddingBottom:10,alignSelf:'start',marginTop:10,border:'1px solid rgba(0,0,0,0.2)',overflow:'hidden',marginLeft:10,backgroundColor:'white'}} >
                    <p style={{fontFamily:'mb',fontSize:22,color:'rgba(0,0,0,0.8)',marginLeft:15,marginTop:15}} >Customer details</p>
                    <div style={{borderTop:'1px solid rgba(0,0,0,0.2)',borderRadius:5,backgroundColor:'white',paddingBottom:10}} >
                        <p style={{fontFamily:'mc',fontSize:18,color:'rgba(0,0,0,0.7)',marginLeft:15,marginTop:15}} >Name Lastname</p>
                        <p style={{fontFamily:'mb',fontSize:20,color:'rgba(0,0,0,0.8)',marginLeft:15,marginTop:15}} >Contact information</p>
                        <p style={{fontFamily:'mc',fontSize:18,color:'rgba(0,0,0,0.7)',marginLeft:15,marginTop:15}} >fakeemail@mail.com</p>
                        <p style={{fontFamily:'mc',fontSize:18,color:'rgba(0,0,0,0.7)',marginLeft:15,marginTop:15}} >+212 627297294</p>
                        <p style={{fontFamily:'mb',fontSize:20,color:'rgba(0,0,0,0.8)',marginLeft:15,marginTop:15}} >Shipping address</p>
                        <p style={{fontFamily:'mc',fontSize:18,color:'rgba(0,0,0,0.7)',marginLeft:15,marginTop:15}} >9739 Klocko Freeway Suite 671</p>
                        <p style={{fontFamily:'mb',fontSize:20,color:'rgba(0,0,0,0.8)',marginLeft:15,marginTop:15}} >Billing address</p>
                        <p style={{fontFamily:'mc',fontSize:18,color:'rgba(0,0,0,0.7)',marginLeft:15,marginTop:15}} >9739 Klocko Freeway Suite 671</p>
                    </div>
                </div>
            </div>

            <div style={{backgroundColor:'white',width:'60%',borderRadius:5,paddingBottom:10,alignSelf:'start',marginTop:10,border:'1px solid rgba(0,0,0,0.2)'}} >

                    <div style={{backgroundColor:'white',borderRadius:5,overflow:'hidden',border:'1px solid rgba(0,0,0,0.2)',width:'100%',position:'relative'}} >
                        <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'start'}} >
                            <div style={{width:25,height:25,borderRadius:25,backgroundColor:'rgba(51, 227, 2,0.5)',marginLeft:20,marginRight:15,border:'3px solid #2ca30b',display:'flex',alignSelf:'center',justifyContent:'center',flexDirection:'column'}} >
                                <div style={{width:17,height:17,backgroundColor:'white',borderRadius:20,alignSelf:'center'}} ></div>
                            </div>
                            <p style={{fontFamily:'mb',fontSize:22,color:'rgba(0,0,0,0.8)'}} >Fulfilled ({fulfilled.length})</p>
                        </div>
                        <div style={{borderTop:'1px solid rgba(0,0,0,0.2)',borderRadius:5,backgroundColor:'white',paddingBottom:10}} >
                            {fulfilled.map((o,yy)=>{
                                fulfilledTotal += o.qts * parseFloat(o.price)
                                    return(
                                        <div key={yy} style={{paddingTop:10,display:'flex',flexDirection:'row',alignItems:'center'}} >
                                            <div onClick={()=>Fselection(yy,!fselected[yy])} style={{cursor:'pointer',width:15,height:15,border:'2px solid rgba(0,0,0,0.3)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',marginLeft:20,marginRight:10}} ><div style={{width:'100%',height:'100%',borderRadius:10,backgroundColor:fselected[yy]?'#ff9900':'rgba(0,0,0,0)'}} ></div></div>
                                            <img src={`/uploads/${o.files[0]}`} style={{height:60,width:60,borderRadius:5,border:'1px solid gray',marginLeft:10,marginTop:10}} />
                                            <div style={{display:'flex',flexDirection:'column',marginLeft:20,marginTop:10}} >
                                                <p style={{fontFamily:'mb',fontSize:22,color:'rgba(0,0,0,0.8)',margin:0}} >{o.title}</p>
                                                <div style={{display:'flex',flexDirection:'row',marginTop:5,alignItems:'center'}} >
                                                    <p style={{fontFamily:'mc',fontSize:18,color:'rgba(0,0,0,0.8)',margin:0}} >color</p>
                                                    <div style={{width:15,height:15,border:'2px solid rgba(0,0,0,0.3)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',marginLeft:10}} ><div style={{width:'100%',height:'100%',borderRadius:10,backgroundColor:o.color}} ></div></div>
                                                </div>
                                            </div>
                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',position:'absolute',right:180}} >
                                                <p style={{fontFamily:'mc',fontSize:20,color:'rgba(0,0,0,0.8)',margin:0,marginRight:20}} >${o.price}</p>
                                                <img src={`/static/x.png`} style={{height:9,width:9,borderRadius:2,opacity:0.8,marginBottom:5}} />
                                                <p style={{fontFamily:'mc',fontSize:20,color:'rgba(0,0,0,0.8)',margin:0,marginLeft:20}} >{o.qts}</p>
                                            </div>
                                            <p style={{fontFamily:'mc',fontSize:20,color:'rgba(0,0,0,0.8)',margin:0,position:'absolute',right:40}} >${o.qts * parseFloat(o.price)}</p>
                                        </div>
                                    )
                                })
                            }
                                <p style={{fontFamily:'mc',fontSize:15,color:'rgba(0,0,0,0.0)'}} >|</p>
                                <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
                                    <p style={{fontFamily:'mc',fontSize:20,color:'rgba(0,0,0,0.6)',margin:0,position:'absolute',right:180}} >Subtotal</p>
                                    <p style={{fontFamily:'mc',fontSize:20,color:'rgba(0,0,0,0.6)',margin:0,position:'absolute',right:40}} >${fulfilledTotal}</p>
                                </div>
                                <p style={{fontFamily:'mc',fontSize:10,color:'rgba(0,0,0,0.0)'}} >|</p>
                                <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
                                    <p style={{fontFamily:'mc',fontSize:20,color:'rgba(0,0,0,0.6)',margin:0,position:'absolute',right:180}} >Tax</p>
                                    <p style={{fontFamily:'mc',fontSize:20,color:'rgba(0,0,0,0.6)',margin:0,position:'absolute',right:40}} >$0.0</p>
                                </div>
                                <p style={{fontFamily:'mc',fontSize:10,color:'rgba(0,0,0,0.0)'}} >|</p>
                                <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
                                    <p style={{fontFamily:'mb',fontSize:20,color:'rgba(0,0,0,0.8)',margin:0,position:'absolute',right:180}} >Total</p>
                                    <p style={{fontFamily:'mb',fontSize:20,color:'rgba(0,0,0,0.8)',margin:0,position:'absolute',right:40}} >${fulfilledTotal}</p>
                                </div>
                                <p style={{fontFamily:'mc',fontSize:10,color:'rgba(0,0,0,0.0)'}} >|</p>
                                <div style={{width:200,height:1,backgroundColor:'rgba(0,0,0,0.2)',position:'absolute',right:70}} ></div>
                                <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',position:'relative'}} >
                                    <p style={{fontFamily:'mb',fontSize:20,color:'rgba(0,0,0,0.8)',margin:0,position:'absolute',right:180,top:15}} >Paid by customer</p>
                                    <p style={{fontFamily:'mb',fontSize:20,color:'rgba(0,0,0,0.8)',margin:0,position:'absolute',right:40,top:15}} >$0</p>
                                </div>
                                <p style={{fontFamily:'mc',fontSize:15,color:'rgba(0,0,0,0.0)'}} >|</p>
                        </div>
                        
                        
                    </div>
                    <div style={{display:'flex',marginTop:10,alignItems:'center',justifyContent:'start',width:'100%'}} >
                        <button onClick={()=>takeback()} style={{cursor:'pointer',backgroundColor:'white',border:'1px solid gray',marginLeft:10,paddingLeft:20,paddingRight:20,paddingTop:12,paddingBottom:12,borderRadius:5,fontFamily:'msb',alignSelf:'center',color:'rgba(0,0,0,0.7)',fontSize:18}} >
                            Take back
                        </button>
                    </div>
            </div>
            

            
            
        </div>
    )

}

export default ViewOrder;