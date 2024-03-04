
import React from 'react';
import { Link,useNavigate,useParams } from "react-router-dom";
import searchL from '../assets/search.png'

import '../style/home.css'
import axios from 'axios'; import { host } from '../code/imports/imp';
import AddProducts from './addproduct';

let productss = {}

function Products() {

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
    const [selected,setSelected] = React.useState(0)
    const [search,setSearch] = React.useState('')
    const [showOptions,setShowOptions] = React.useState(false)

    const [save,SetSave] = React.useState(false)

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))


    React.useEffect(()=>{
        get_store()
            
    },[])


    const get_store = async() =>{
        console.log("store requested")
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

    const selectP = (y) =>{
        let ok = []
        for (let xyz = 0; xyz < productsSelect.length; xyz++) {
            ok.push(xyz==y?!productsSelect[xyz]:productsSelect[xyz])
            const none = xyz==y?!productsSelect[xyz]==true?setSelected(selected+1):setSelected(selected-1):null
        }
        setProductSelect(ok)
    }


    const deactivate = async() =>{
        for (let xxt = 0; xxt < productsSelect.length; xxt++) {
            if (productsSelect[xxt]) {
                const res = await axios.post(`http://${host}:4242/activeproduct`,{'sid':sid,'jid':jid,'pid':products[xxt].pid})
                get_store()
                // console.log(res.data)
            }
            
        }
    }

    const editproduct = async() =>{
        for (let xxt = 0; xxt < productsSelect.length; xxt++) {
            if (productsSelect[xxt]) {
                setProduct(products[xxt])
                SetAddProduct(true)
                // console.log(res.data)
            }
            
        }
    }

    
    if (addProduct) {
        return(
        <div style={{height:'100%',width:'100%',display:'flex',justifyContent:'start',alignItems:'center',position:'relative',flexDirection:'column',overflow:'scroll',overflowX:'hidden'}} >
                <div style={{width:'50%',marginTop:50,position:'relative'}} >
                    <h1 style={{margin:0,fontFamily:'mc',fontSize:35,color:'rgba(0,0,0,0.9)'}} >Add product</h1>
                    <div style={{position:'absolute',top:0,right:10}} >
                        <button onClick={()=>SetAddProduct(false)} style={{height:44,border:'2px solid rgba(0,0,0,0.3)',borderRadius:5,backgroundColor:'rgba(0,0,0,0.2)',fontFamily:'mc',fontSize:20,overflow:'hidden',color:'gray',marginLeft:10}} >Discard</button>
                        <button onClick={async()=>{SetSave(true);await delay(200);SetSave(false);SetAddProduct(false);get_store()}} style={{height:44,border:'2px solid rgba(0,0,0,0.3)',borderRadius:5,backgroundColor:'#FF9900',fontFamily:'mc',fontSize:20,overflow:'hidden',color:'white',marginLeft:10}} >Save</button>
                    </div>
                </div>
                <AddProducts save={save} product={product} />   
            <div style={{height:100,width:10}} ></div>

               
        </div>
        )
        
    }else{
        return (
            <div style={{height:'100%',width:'100%',display:'flex',justifyContent:'start',alignItems:'center',position:'relative',flexDirection:'column',overflowY:'scroll'}} >
                <div style={{width:'90%',marginTop:50,position:'relative'}} >
                    <h1 style={{margin:0,fontFamily:'mc',fontSize:35,color:'rgba(0,0,0,0.9)'}} >Products</h1>
                    <button onClick={()=>SetAddProduct(true)} style={{height:44,border:'2px solid rgba(0,0,0,0.3)',borderRadius:5,backgroundColor:'#FF9900',fontFamily:'mc',fontSize:20,overflow:'hidden',color:'white',marginLeft:10,position:'absolute',right:0,top:0}} >Add product</button>
                </div>
                <div style={{width:'90%',marginBottom:50,borderRadius:5,backgroundColor:'white',border:'1px solid rgba(0,0,0,0.2)',marginTop:30,display:'flex',alignItems:'start',justifyContent:'center',flexDirection:'column'}} >
                    <div style={{display:'flex',alignItems:'start',justifyContent:'center',flexDirection:'row',marginTop:10,marginBottom:10,width:'100%'}} >
                        <div style={{width:(width-360)*0.7-30,display:'flex',flexDirection:'row',height:20,justifyContent:'center',alignItems:'center',backgroundColor:'white',borderTopRightRadius:0,borderBottomRightRadius:0,padding:10,borderTopLeftRadius:5,borderBottomLeftRadius:5,border:'2px solid rgba(0,0,0,0.3)',borderRight:0}} >
                            <img src={searchL} alt="" style={{height:20,width:20,marginRight:7,marginBottom:1,filter:'invert(50%)'}} />
                            <input value={search}  onChange={(event)=>setSearch(event.target.value)}  style={{backgroundColor:'rgba(0,0,0,0)',height:'100%',fontWeight:'lighter',width:'100%',fontFamily:'ml',fontSize:18,border:0,padding:4,outline:0,color:'black',marginTop:4}} placeholder='Filter products' />
                        </div>
                        <button style={{width:'10%',height:44,border:'2px solid rgba(0,0,0,0.3)',borderTopRightRadius:5,borderBottomRightRadius:5,fontFamily:'mc',fontSize:20,overflow:'hidden',color:'rgba(0,0,0,0.8)'}} >Filter</button>
    
                        <button style={{width:'10%',height:44,border:'2px solid rgba(0,0,0,0.3)',borderRadius:5,fontFamily:'mc',fontSize:20,overflow:'hidden',color:'rgba(0,0,0,0.8)',marginLeft:10}} >⇅ Sort</button>
                    </div>
    
                {/* <h1 style={{alignSelf:'center'}} >No products yet.</h1> */}

                {
                    selected?
                    <div style={{flexDirection:'row',display:'flex',width:'100%',marginLeft:15,marginBottom:10}} >
                    <div style={{display:'flex',alignSelf:'center',flexDirection:'row',height:20,justifyContent:'center',alignItems:'center',backgroundColor:'white',borderTopRightRadius:0,borderBottomRightRadius:0,padding:10,borderTopLeftRadius:5,borderBottomLeftRadius:5,border:'2px solid rgba(0,0,0,0.3)',borderRight:0}} >
                        <p style={{backgroundColor:'rgba(0,0,0,0)',fontWeight:'lighter',color:'rgba(0,0,0,0.7)',width:'100%',fontFamily:'mc',alignSelf:'center',fontSize:20,border:0,padding:4,outline:0}} >{selected} selected</p>
                    </div>
                    <button onClick={()=>editproduct()} style={{height:44,border:'2px solid rgba(0,0,0,0.3)',borderRight:0,fontFamily:'mc',fontSize:18,overflow:'hidden',color:'rgba(0,0,0,0.8)',paddingLeft:15,paddingRight:15}} >Edit product</button>
                    <div style={{position:'relative'}} >
                        <button onClick={()=>setShowOptions(!showOptions)} style={{height:44,border:'2px solid rgba(0,0,0,0.3)',borderTopRightRadius:5,borderBottomRightRadius:0,fontFamily:'mc',fontSize:18,overflow:'hidden',color:'rgba(0,0,0,0.8)',paddingLeft:15,paddingRight:15,borderBottomRightRadius:showOptions?0:5}} >More options {!showOptions?'▼':'▲'}</button>
                        <div className='text' style={{position:'absolute',maxHeight:showOptions?200:0,backgroundColor:'white',borderTop:0,width:'100%',zIndex:2,overflow:'hidden'}} >
                            <button onClick={()=>deactivate()} style={{height:44,border:'2px solid rgba(0,0,0,0.3)',width:'100%',borderTop:0,fontFamily:'mc',fontSize:18,overflow:'hidden',color:'rgba(0,0,0,0.8)',paddingLeft:15,paddingRight:15}} >In/Activate</button>
                            <button style={{height:44,border:'2px solid rgba(0,0,0,0.3)',width:'100%',borderTop:0,fontFamily:'mc',fontSize:18,overflow:'hidden',color:'red',paddingLeft:15,paddingRight:15,borderBottomLeftRadius:5,borderBottomRightRadius:5}} >Delete product</button>
                        </div>
                    </div>

                </div>:null
                }
                
                                {
                    products.map((product,xy)=>{
                        // console.log(product.title,':',search)
                        if (product.title.startsWith(search)) {
                            return(
                                <div key={xy} style={{width:'100%',alignSelf:'center',position:'relative',height:100,borderTop:'1px solid rgba(0,0,0,0.2)',borderLeft:0,borderRight:0,overflow:'hidden',display:'flex',alignItems:'center'}}>
                                    <div onClick={()=>selectP(xy)} style={{width:15,height:15,border:'2px solid rgba(0,0,0,0.3)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',marginLeft:10}} ><div style={{width:'100%',height:'100%',borderRadius:10,backgroundColor:productsSelect[xy]?'#ff9900':'rgba(0,0,0,0)'}} ></div></div>
                                    <img  src={`/uploads/${product.files[0]}`} style={{height:'auto',alignSelf:'center',width:100,backgroundColor:'orange',position:'absolute',left:40}} />
                                    <p style={{fontFamily:'mc',fontWeight:'bolder',fontSize:20,marginLeft:150}} >{product.title}</p>
                                    <div style={{position:'absolute',right:'45%',display:'flex',alignItems:'center',justifyContent:'center'}} >
                                        <p style={{fontFamily:'mc',fontWeight:'light',fontSize:20,color:'#ff9900',marginRight:5,backgroundColor:'rgba(255, 153, 0,0.2)'}} >{product.qts?product.qts:'0'}</p>
                                        <p style={{fontFamily:'mc',fontWeight:'light',fontSize:20}} >in stock</p>
    
                                    </div>
                                    <div style={{position:'absolute',right:20,display:'flex',alignItems:'center',justifyContent:'center'}} >
                                        <div style={{width:10,height:10,borderRadius:10,backgroundColor:product.active==false?'#ff9900':'gray'}}></div>
                                        <p style={{fontFamily:'mc',fontWeight:'light',fontSize:20,marginLeft:10}} >{product.active==false?'Active':'Inactive'}</p>
                                    </div>
                                </div>
                            )
                        }
                       
                    })
                }

                
    
                        
                </div>
    
                
            </div>
            
      );
    }
  
}

export default Products;
