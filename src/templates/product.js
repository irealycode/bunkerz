import React from 'react';
import { Link,useNavigate,useParams } from "react-router-dom";
import logo from '../assets/bunker.png'
import '../style/home.css'
import categos from '../assets/stripes.png'
import search from '../assets/search.png'
import shopbag from '../assets/shopbag.png'
import banner from '../assets/fashion.jpg'
import axios from 'axios'; import { host } from '../code/imports/imp';

function ProductT(p) {
    // console.log(h)
    let height = p.height? p.height:window.innerHeight
    let width = p.width? p.width: window.innerWidth
    let sid = p.sid? p.sid:''
    let bannerTexts = p.bannerTexts? p.bannerTexts:[]
    let bannerImgs = p.bannerImgs? p.bannerImgs:[]
    let bannerdivs = p.bannerDivs? p.bannerDivs:[]
    let banners = p.banners? p.banners:[]
    let storeProducts = p.storeProducts? p.storeProducts:[]
    let bannerProducts = p.bannerProducts? p.bannerProducts:[]
    let product = p.product?p.product:{}
    let productStyle = p.productStyle?p.productStyle:{}
    let editing = p.editing? p.editing:false
    let sumheight = 0
    const actions = ["none","search","pages","products","home","cart"]
    let actionCpy = [false,false,false,false,false,false]
    const [actionTrigger,setActionTrigger] = React.useState([false,false,false,false,false,false])
    const [search,setSearch] = React.useState('')
    const [order,setOrder] = React.useState({color:product.colors?product.colors[0]:'rgba(0,0,0,0)',title:product.title,qts:"1",pid:product.pid,image:product.files?product.files[0]:'src',price:product.price})
    const [cart,setCart] = React.useState([])
    const [imageIndex,setImageIndex] = React.useState(0)
    // let bannerStyle = p.bannerStyle? p.bannerStyle:{color:'#fffff'}
    // let productsStyle = p.productsStyle? p.productsStyle:{color:'#fffff'}
    // let ok = [{img:"https://i.ebayimg.com/images/g/6rsAAOSw3iphuJTp/s-l1200.webp",title:"Tie ping",price:"110"},{img:"https://i.ebayimg.com/images/g/Do8AAOSwsR5kV3rA/s-l1600.jpg",title:"Casual tie",price:"260"},{img:"https://i.ebayimg.com/images/g/PzMAAOSwfkllOuXh/s-l1200.webp",title:"AP Royal Oak",price:"21k"},{img:"https://i.ebayimg.com/images/g/xigAAOSwyXdk7-Z7/s-l1200.webp",title:"Lether stripes",price:"2250"},{img:"https://i.pinimg.com/1200x/d5/9e/94/d59e949ac05b319d06588d696a996d74.jpg",title:"Pinky ring",price:"590"},{img:"https://habituallychic.luxury/wp-content/uploads/2021/08/signet-rings-history-etiquette-habituallychic-005.jpeg",title:"Vintage ring",price:"860"}]



    React.useEffect(()=>{
        let crt = JSON.parse(localStorage.getItem("cart"))
        crt = crt?crt:{"cart":[]}
        setCart(crt.cart)

    },[])

    const activateAction = (action) => {
        if (actions.indexOf(action)>=1) {
            actionCpy[actions.indexOf(action)] = !actionTrigger[actions.indexOf(action)]
            setActionTrigger(actionCpy)
            console.log("clicked",actionCpy[actions.indexOf(action)])
        }
        if(action == "home"){
            window.location.assign('/')
        }
    }

    const addToCart = () =>{
        // setOrder({...order,qts:order.qts!=""?order.qts:"1"})
        let crt = JSON.parse(localStorage.getItem("cart"))
        crt = crt?crt:{"cart":[]}
        let ex = crt.cart.findIndex(obj => obj.pid === order.pid && obj.color === order.color)
        console.log(ex)

        if (ex < 0) {
            crt.cart.push(order)
            localStorage.setItem("cart",JSON.stringify(crt))
            setCart(crt.cart)
            setActionTrigger([false,false,false,false,false,true])
        }else{
            PlusOrMinus(ex,1)
        }
        
    }


    const PlusOrMinus = (i,j) =>{
        let crt = JSON.parse(localStorage.getItem("cart"))

        if(parseInt(crt.cart[i].qts)==1 && j==-1){
            crt.cart.splice(i,1)
            localStorage.setItem("cart",JSON.stringify(crt))
            setCart(crt.cart)
            return null
        }

        if (parseInt(crt.cart[i].qts)!=0 || j==1 ) {
            console.log(parseInt(crt.cart[i].qts),i,j)

            crt.cart[i].qts = crt.cart[i].qts == ""?"1":crt.cart[i].qts
            crt.cart[i].qts = (parseInt(crt.cart[i].qts) + 1*j).toString()
            localStorage.setItem("cart",JSON.stringify(crt))
            setCart(crt.cart)
        }
        
        
    }

    const complete_order = async() =>{
        let orders = []
        cart.forEach(prod => {
            orders.push({pid:prod.pid,qts:parseInt(prod.qts == ""?"1":prod.qts),color:prod.color,price:parseFloat(prod.price)})
        });
        const res = await axios.post(`http://${host}:4242/completeorder`,{order:orders,sid:sid})

        alert('order completed')

        // if (res.data != "505" && res.data != "no.") {
            
        // }
    }

    return (
        <div className="default" style={{display:'flex',flexDirection:'column',position:'relative'}} >

            


        {
            banners.map((x,yy)=>{
                const t = productStyle.topBanner? productStyle.topBanner.id:0
                if (x.type != 'products' && x.id == t) {
                let bheight = !x.FullHeight?yy!=0 && x.FullmHeight?height-sumheight:x.size:height
                return(
                    <div style={{marginTop:0,width:'100%',display:'flex',justifyContent:"center",overflow:'hidden',backgroundColor:x.backgroundColor,position:x.sticky?'sticky':'relative',top:0,zIndex:x.sticky?3:1,height:!x.FullHeight?yy!=0 && x.FullmHeight?height-sumheight:x.size:height,flexDirection:'column'}} >
                        <p style={{height:0,fontSize:0,color:'rgba(0,0,0,0)'}} >{sumheight += !x.FullHeight?x.FullmHeight?height-sumheight:x.size:height}</p>
                        {/* <img src={banner} style={{alignSelf:bannerStyle.image.align,height:bannerStyle.image.FullHeight?'100%':bannerStyle.image.size,position:'absolute',zIndex:1}} /> */}
                        {
                            bannerdivs.map((bannerdiv,y)=>{
                                if (bannerdiv.parent == x.id){


                                    return(
                                        <div key={y} style={{width:bannerdiv.width?bannerdiv.width:'auto',height:bannerdiv.height?bannerdiv.height:'auto',justifyContent:'center',display:'flex',flexDirection:bannerdiv.fdirection,marginBottom:bannerdiv.y,right:bannerdiv.align>0.1?width/2-(bannerdiv.align*width/2):'auto',left:bannerdiv.align<-0.1?width/2-(bannerdiv.align*width*-1/2):bannerdiv.align >= -0.1 && bannerdiv.align <= 0.1?'50%':'auto',transform:bannerdiv.align >= -0.1 && bannerdiv.align <= 0.1?'translateX(-50%)':'translateX(0px)',whiteSpace:'nowrap',marginLeft:bannerdiv.marginH,marginRight:bannerdiv.marginH,position:'absolute',zIndex:2,position:'absolute'}} >
                                            {
                                                bannerTexts.map((bannerText,i)=>{
                                                    if (bannerText.parent_id == bannerdiv.id) {
                                                        return(
                                                            <h2 onClick={()=>{if(bannerText.action){activateAction(bannerText.action)}}} key={i} style={{cursor:bannerText.action?"pointer":"default",textAlign:bannerText.textAlign?bannerText.textAlign:'center',whiteSpace:bannerText.jline?'pre-line':'nowrap',margin:bannerText.margin,fontFamily:''+bannerText.font+'',color:bannerText.color,fontSize:bannerText.size,fontStretch:'ultra-expanded',marginTop:-8,alignSelf:bannerText.align}} >{bannerText.text}</h2>
                                                        )
                                                    }else{
                                                        return null
                                                    }
                                                })
                                            }
                                            {
                                                bannerImgs.map((bannerImg,i)=>{
                                                    if (bannerImg.parent_id == bannerdiv.id) {
                                                        if (bannerImg.src != "") {
                                                            // console.log(`../uploads/${bannerImg.src}`)
                                                            return(
                                                                <img onClick={()=>{if(bannerImg.action){activateAction(bannerImg.action,bannerImg)}}} src={`/uploads/${bannerImg.src}`} style={{cursor:bannerImg.action?"pointer":"default",height:!bannerImg.fullh?bannerImg.cheight?'auto':bannerImg.height:bheight,width:!bannerImg.fullw?bannerImg.cwidth?'auto':bannerImg.width:width,margin:bannerImg.margin}} />
                                                                )
                                                        }else{
                                                            return null
                                                        }
                                                        
                                                    }else{
                                                        return null
                                                    }
                                                })
                                            }
                                        </div>
                                )
                                }else{
                                    return null
                                }
                                

                            })
                        }
                    </div>
                )
            }else{
                return (
                    null
                )
            }
            })
        }
        <div style={{display:'flex',flexDirection:'row',height:height-sumheight,width:'100%',justifyContent:'center'}} >
            <div style={{height:'100%',marginRight:60,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} >
                <div style={{height:height*0.5,width:height*0.5,maxHeight:height-sumheight-200,maxWidth:height-sumheight-200,borderRadius:20,border:0,alignSelf:'center',overflow:'hidden',backgroundColor:'black',justifyContent:'center',alignItems:'center',display:'flex',position:'relative'}} >
                    {!editing?<img src={`/uploads/${product.files?product.files[imageIndex]:'ok'}`} style={{width:height*0.5,height:height*0.5}} />:null}
                    {product.files?product.files.length>1?<img src={'/static/arrow.png'} onClick={()=>setImageIndex(imageIndex+1==product.files.length?imageIndex:imageIndex+1)} style={{height:40,width:40,position:'absolute',right:20,transform:'rotate(90deg)',cursor:'pointer'}} />:null:null}
                    {product.files?product.files.length>1?<img src={'/static/arrow.png'} onClick={()=>setImageIndex(imageIndex-1<0?imageIndex:imageIndex-1)} style={{height:40,width:40,position:'absolute',left:20,transform:'rotate(270deg)',cursor:'pointer'}} />:null:null}
                    {product.files?<div style={{position:'absolute',bottom:30,alignSelf:'center',flexDirection:'row',display:'flex'}} >
                        {
                            product.files.map((img,yy)=>{return(
                                <div style={{height:10,width:10,borderRadius:10,backgroundColor:imageIndex==yy?'gray':'white',margin:8}} ></div>
                            )})
                        }
                    </div>:null}
                </div>
                {product.files?<div style={{width:height*0.5,height:100,marginTop:20}} >
                    {
                        product.files.map((img,yy)=>{return(
                            <img src={`/uploads/${img}`} style={{width:height*0.125,height:height*0.125,borderRadius:10,margin:8,borderBottom:imageIndex==yy?'2px solid black':0}} />
                        )})
                    }
                    
                </div>:null}
                

            </div>


            <div style={{height:'100%',maxWidth:'20%',background:'white',display:'flex',alignItems:'center',justifyContent:'center'}} >
                <div style={{display:'flex',flexDirection:'column',marginBottom:130}} >
                    <h1 style={{fontFamily:''+productStyle.font+''}} >{product.name}</h1>
                    <h2 style={{fontFamily:''+productStyle.font+'',fontWeight:'bolder',color:'gray',marginTop:0,fontSize:18}} >Includes 1 {product.title}</h2>
                    <h2 style={{fontFamily:''+productStyle.font+'',fontWeight:'bolder',color:'black',marginTop:0,fontSize:20}} >$ {product.price} USD</h2>
                    <h2 style={{fontFamily:''+productStyle.font+'',fontWeight:'bolder',color:'gray',marginTop:0,fontSize:16,width:'60%',lineHeight:'1.8em',maxHeight:'3.6em',overflow:'hidden'}}  >{product.desc} ...</h2>
                    <h2 style={{fontFamily:''+productStyle.font+'',fontWeight:'bolder',color:'black',marginTop:0,fontSize:16}} >colors</h2>
                    {product.colors?<div style={{flexDirection:'row',display:'flex'}} >
                        {
                            product.colors.map((color)=>{
                                // alert(color)
                                return(
                                    <div onClick={()=>setOrder({...order,color:color})} style={{cursor:'pointer',height:25,width:25,borderRadius:25,backgroundColor:color,borderBottom:order.color==color?'2px solid black':0,margin:5}} ></div>
                                )
                            })
                        }
                        
                    </div>:null}
                    <h2 style={{fontFamily:''+productStyle.font+'',fontWeight:'bolder',color:'black',marginTop:0,fontSize:18,marginTop:10}} >quantity</h2>
                    <input value={order.qts} onChange={(event=>setOrder({...order,qts:event.target.value}))} type='number' placeholder='1' style={{padding:8,fontFamily:''+productStyle.font+'',width:100,border:'2px solid black',borderRadius:5}} />
                    <button onClick={()=>addToCart()} style={{height:60,cursor:'pointer',borderRadius:5,backgroundColor:'black',fontFamily:''+productStyle.font+'',color:'white',fontSize:20,marginTop:20,border:0,paddingRight:10,paddingLeft:10}} >add to cart</button>
                </div>
            </div>
        </div>




        

        <div className="retractableBanner" style={{position:'absolute',height:height-70,top:70,right:0,backgroundColor:'white',width:actionTrigger[1]?500:0,overflowX:'hidden',overflowY:'scroll'}} >
                <div style={{position:'absolute',width:500,height:height-70,top:0,right:0,alignItems:'center',display:'flex',flexDirection:'column'}} >
                    <input value={search} onChange={(event=>setSearch(event.target.value))} style={{width:'80%',height:35,borderRadius:30,border:'2px solid black',paddingRight:15,paddingLeft:15,fontFamily:'monospace',fontSize:16,marginTop:10}} placeholder="Search products..."  />
                    <div style={{width:400,maxWidth:500,backgroundColor:'rgba(0,0,0,0)',marginTop:20}}  class="folders">
                            {
                                storeProducts.map((product,i)=>{
                                    if (product.title.toLowerCase().indexOf(search.toLowerCase()) != -1) {
                                        return(
                                            <div key={i} onClick={()=>window.location.assign('/product/'+product.pid)} style={{backgroundColor:'rgba(0,0,0,0)',cursor:'pointer',width:500*0.3,borderRadius:20,marginLeft:10,marginRight:10,marginTop:10,marginBottom:10,display:'flex',flexDirection:'column'}} className="folder">
                                                <img src={'/uploads/'+product.files[0]} style={{height:500*0.3,width:500*0.3,borderRadius:5,border:0,alignSelf:'center'}} />
                                                <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:16,marginTop:10,color:'black',alignSelf:'center'}} >{product.title}</p>
                                                <p style={{fontFamily:'monospace',fontSize:16,marginTop:-10,color:'black',alignSelf:'center'}} >{product.price}$</p>
                                            </div>
                                        )
                                    }
                                    
                                }
                                )
                            }
                        </div>
                </div>
        </div>

        <div className="retractableBanner" style={{position:'absolute',height:height-70,top:70,right:0,backgroundColor:'white',width:actionTrigger[5]?350:0,overflowX:'hidden',overflowY:'scroll'}} >
            <div style={{position:'absolute',width:350,height:height-70,top:0,right:0,alignItems:'center',display:'flex',flexDirection:'column'}} >
                <h1 style={{marginTop:20,fontFamily:'monospace',fontWeight:'bolder',fontSize:16,color:'rgba(0,0,0,0.5)',alignSelf:'start'}} >Shopping cart</h1>
                <h1 onClick={()=>{localStorage.removeItem("cart");setCart([])}} style={{marginTop:20,fontFamily:'monospace',fontWeight:'bolder',fontSize:12,cursor:'pointer',color:'red',alignSelf:'start',position:'absolute',right:10}} >clear cart</h1>
                {cart[0]?null:<h1 style={{marginTop:20,fontFamily:'monospace',color:'rgba(0,0,0,0.4)',fontWeight:'bolder',fontSize:16}} >go fill it up...</h1>}
                
            
                <div>
                    {
                        cart.map((order,yy)=>{
                            return(
                                <div style={{width:350,display:'flex',flexDirection:'row',borderBottom:'1px solid black',alignItems:'center',padding:10,position:'relative'}} >
                                    <img src={'/uploads/'+order.image} style={{height:70,width:70,borderRadius:5,marginLeft:10}} />
                                    <div style={{marginLeft:20}} >
                                        <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:17,marginLeft:10,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.9)'}} >{order.title}</p>
                                        <p style={{fontFamily:'monospace',color:'rgba(0,0,0,0.7)',fontSize:12,marginLeft:10,marginTop:5,marginBottom:0}} >{order.price}$</p>
                                        <div style={{display:'flex',flexDirection:'row',alignItems:'center',marginLeft:10}} >
                                        <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:12,margin:0,color:'rgba(0,0,0,0.7)'}} >color</p>
                                        <div style={{height:20,width:20,borderRadius:20,backgroundColor:order.color,marginLeft:5}} ></div>
                                    </div>
                                    </div>
                                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',marginLeft:20,position:'absolute',right:17}} >
                                        <img onClick={()=>PlusOrMinus(yy,1)} src={'/static/plus.png'} style={{cursor:'pointer',height:20,width:20}} />
                                        <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:17,marginLeft:10,marginRight:10,color:'rgba(0,0,0,0.8)'}} >{order.qts!=""?order.qts:"1"}</p>
                                        <img onClick={()=>PlusOrMinus(yy,-1)} src={'/static/minus.png'} style={{cursor:'pointer',height:20,width:20}} />
                                    </div>
                                    
                                    
                                </div>
                            )
                        })
                    }
                </div>
                {!cart[0]?null:
                <div onClick={()=>complete_order()} style={{cursor:'pointer',paddingTop:5,paddingBottom:5,backgroundColor:'black',borderRadius:5,width:'80%',marginTop:20,display:'flex',alignSelf:'center',justifyContent:'center'}} >
                    <h1 style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,color:'white'}} >complete order</h1>
                </div>
                }
            </div>
        </div>

        
    </div>
    )
}

export default ProductT;
