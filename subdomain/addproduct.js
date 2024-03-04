
import React from 'react';
import { Link,useNavigate,useParams } from "react-router-dom";
import logo from '../assets/bunker.png'
import home from '../assets/home.png'
import orders from '../assets/orders2.png'
import money from '../assets/money.png'
import eye from '../assets/eye.png'
import searchL from '../assets/search.png'

import '../style/home.css'
import axios from 'axios'; import { host } from '../code/imports/imp';



let first =0

function AddProducts(p) {
    let save = p.save?p.save:false
    let product = p.product?p.product:null
    // console.log(product)
    const navigate = useNavigate();
    let width = window.innerWidth 
    let height = window.innerHeight
    let { jid,sid } = useParams()
    const [tab,SetTab] = React.useState(0)
    const [hover,SetHover] = React.useState(0)
    const [file, setFile] = React.useState(product?product.files:[]);
    const [fileH,setFileH] = React.useState(false);
    const [size,setSize] = React.useState({'large':product?product.size.indexOf(2)>=0:false,'medium':product?product.size.indexOf(1)>=0:false,'small':product?product.size.indexOf(0)>=0:false})

    const [colors,setColors] = React.useState([{id:0,'color':'#ffffff'}]);
    const [price,setPrice] = React.useState(product?product.price:null);
    const [oPrice,setOrignalPrice] = React.useState(product?product.originalPrice:null);
    const [cPrice,setCostPrice] = React.useState(product?product.costPrice:null);
    const [qts,setQts] = React.useState(product?product.qts:null);
    const [title,setTitle] = React.useState(product?product.title:null);
    const [desc,setDesc] = React.useState(product?product.desc:null);

    // p = {'desc':desc,'title':title,'costPrice':cPrice,'originalPrice':oPrice,'price':price,'files':file,'size':size,'colors':colors}    

    // console.log(save)
    

    // let balls = height*2


    React.useEffect(()=>{
        // get_store()
            
    },[])


    // const get_store = async() =>{
    //     console.log("store requested")
    //     const res = await axios.post(`http://${host}:4242/getstore`,{'w':0,'subd':window.location.host.split(".")[0]})

    //     if (res.data != "505" && res.data != "no.") {

    //     }
    // }

    async function upload_image(fileTT){
        var formData = new FormData();
        formData.append('file', fileTT);
        const response = await axios.post(`http://${host}:4242/upload`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
        console.log('n:', response.data.message);
        if (!response.data.message) {
            console.error('file upload error')
            return 'no.'
        }else{
            console.log('thhis: ',response.data.message)
            return response.data.message
        }
    }

    const save_store = async() =>{
        if (!first) {
            first++
            let files = []
            for (let xdft = 0; xdft < file.length; xdft++) {
                const uploaded_file = await upload_image(file[xdft])
                if (uploaded_file != 'no.') {
                    files.push(uploaded_file)
                }else{
                    console.log('fuck')
                }
            }
            let sizes = []
            if (size.large) {
                sizes.push(2)
            }
            if (size.medium) {
                sizes.push(1)
            }
            if (size.small) {
                sizes.push(0)
            }
            let colorss = []
            for (let xdfp = 0; xdfp < colors.length; xdfp++) {
                colorss.push(colors[xdfp].color)
            }
            const res = await axios.post(`http://${host}:4242/saveproduct`,{'jid':jid,'sid':sid,'save':{'desc':desc,'title':title,'costPrice':cPrice,'originalPrice':oPrice,'price':price,'files':files,'size':sizes,'colors':colorss,'qts':qts}})
            if (1) {
                console.log(res.data)
                save=false;
                first=0;
            }
        }
    }

    async function rmbt(id) {
        const newList = file.filter((item) => item.lastModified !== id);
    
        setFile(newList);
        // await update();
      }

    if (!first && save) {
        save_store()
    }






    

  return (
        <div style={{height:'100%',width:'100%',display:'flex',justifyContent:'start',alignItems:'center',position:'relative',flexDirection:'column',paddingBottom:50}} >



            <div style={{width:'50%',borderRadius:5,backgroundColor:'white',border:'1px solid rgba(0,0,0,0.2)',marginTop:30,display:'flex',alignItems:'start',justifyContent:'center',flexDirection:'column',paddingBottom:15}} >
                <div style={{width:'90%',display:'flex',alignItems:'start',justifyContent:'center',flexDirection:'column',alignSelf:'center',padding:10,marginTop:10}} >
                    <h1 style={{margin:0,fontFamily:'ml',fontSize:25,color:'rgba(0,0,0,0.9)',marginBottom:0}} >Title</h1>
                    <input value={title} onChange={(event)=>setTitle(event.target.value)} style={{backgroundColor:'rgba(0,0,0,0)',fontWeight:'lighter',width:'100%',fontFamily:'mc',fontSize:18,padding:6,paddingLeft:15,outline:0,alignSelf:'center',color:'black',marginTop:4,border:'2px solid rgba(0,0,0,0.3)',borderRadius:5}} placeholder='Lether Jacket...' />
                    <h1 style={{margin:0,fontFamily:'ml',fontSize:22,color:'rgba(0,0,0,0.9)',marginBottom:0,marginTop:10}} >Description</h1>
                    <textarea value={desc} onChange={(event)=>setDesc(event.target.value)} style={{backgroundColor:'rgba(0,0,0,0)',resize:'none',height:140,fontWeight:'lighter',width:'100%',fontFamily:'mc',fontSize:18,padding:6,paddingLeft:15,outline:0,alignSelf:'center',color:'black',marginTop:4,border:'2px solid rgba(0,0,0,0.3)',borderRadius:5}} placeholder='Lether Jacket...'  />
                </div>
            </div>

            <div style={{width:'50%',borderRadius:5,backgroundColor:'white',border:'1px solid rgba(0,0,0,0.2)',marginTop:30,display:'flex',alignItems:'start',justifyContent:'center',flexDirection:'column',paddingBottom:15,marginTop:20}} >
                <div style={{width:'90%',display:'flex',alignItems:'start',justifyContent:'center',flexDirection:'column',alignSelf:'center',padding:10,marginTop:10}} >
                    <h1 style={{margin:0,fontFamily:'ml',fontSize:25,color:'rgba(0,0,0,0.9)',marginBottom:0}} >Media</h1>
                    <h1 style={{margin:0,fontFamily:'ml',fontSize:20,color:'rgba(0,0,0,0.7)',marginBottom:0,marginTop:15}} >Add images or videos showing your product.</h1>
                    <div onMouseOver={()=>setFileH(true)} onMouseOut={()=>setFileH(false)}  style={{position:'relative',width:'100%',overflow:'hidden',height:190,border:file.length>=5 || !fileH?'2px dashed gray':'2px solid #ff9900',borderRadius:5,alignSelf:'center',marginTop:20,display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0)'}} >
                        {file.length<5?<input onChange={(event)=>{setFile([...file,event.target.files[0]])}} type="file" style={{padding:500,zIndex:1,display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center',color:'rgba(0,0,0,0)',backgroundColor:'rgba(0,0,0,0)',opacity:0}} />:null}
                        <h1 style={{position:'absolute',margin:0,fontFamily:'ml',fontSize:22,color:file.length<5?'rgba(0,0,0,0.9)':'rgba(0,0,0,0.2)',marginBottom:0,zIndex:0}} >drag and drop file</h1>
                    </div>
                    {
                        file.length!=0?
                        <div style={{width:'100%',marginTop:15,position:'relative'}} >
                            <div style={{width:'48%',borderRadius:5,overflow:'hidden',border:'2px solid rgba(0,0,0,0.3)',height:(width-330)*0.5*0.9*0.48-4,alignItems:'center',justifyContent:'center',display:'flex'}} >
                                <img src={product?`/uploads/${file[0]}`:URL.createObjectURL(file[0])} style={{width:'100%',height:'auto'}} />
                                <button onClick={()=>rmbt(file[0].lastModified)} style={{position:'absolute',color:'red',top:8,right:'52%',fontFamily:'monospace',fontSize:20,backgroundColor:'rgba(0,0,0,0)',border:0,fontWeight:'bolder'}} >x</button>
                                
                            </div>
                            <div style={{width:'48%',height:(width-330)*0.5*0.9*0.48-4,position:'absolute',right:0,top:0}} >
                                {file.length>1?<div style={{width:'48%',height:'48%',border:'2px solid rgba(0,0,0,0.3)',top:0,left:0,position:'absolute',borderRadius:5,alignItems:'center',justifyContent:'center',display:'flex'}} >
                                <button onClick={()=>rmbt(file[1].lastModified)} style={{position:'absolute',color:'red',top:8,right:8,fontFamily:'monospace',fontSize:20,backgroundColor:'rgba(0,0,0,0)',border:0,fontWeight:'bolder'}} >x</button>
                                <img src={product?`/uploads/${file[1]}`:URL.createObjectURL(file[1])} style={{width:'100%',height:'auto'}} />
                                    </div>:null}
                                {file.length>2?<div style={{width:'48%',height:'48%',border:'2px solid rgba(0,0,0,0.3)',bottom:0,left:0,position:'absolute',borderRadius:5,alignItems:'center',justifyContent:'center',display:'flex'}} >
                                <button onClick={()=>rmbt(file[2].lastModified)} style={{position:'absolute',color:'red',top:8,right:8,fontFamily:'monospace',fontSize:20,backgroundColor:'rgba(0,0,0,0)',border:0,fontWeight:'bolder'}} >x</button>
                                    <img src={product?`/uploads/${file[2]}`:URL.createObjectURL(file[2])} style={{width:'100%',height:'auto'}} />
                                </div>:null}
                                {file.length>3?<div style={{width:'48%',height:'48%',border:'2px solid rgba(0,0,0,0.3)',top:0,right:0,position:'absolute',borderRadius:5,alignItems:'center',justifyContent:'center',display:'flex'}} >
                                <button onClick={()=>rmbt(file[3].lastModified)} style={{position:'absolute',color:'red',top:8,right:8,fontFamily:'monospace',fontSize:20,backgroundColor:'rgba(0,0,0,0)',border:0,fontWeight:'bolder'}} >x</button>
                                    <img src={product?`/uploads/${file[3]}`:URL.createObjectURL(file[3])} style={{width:'100%',height:'auto'}} />
                                </div>:null}
                                {file.length>4?<div style={{width:'48%',height:'48%',border:'2px solid rgba(0,0,0,0.3)',bottom:0,right:0,position:'absolute',borderRadius:5,alignItems:'center',justifyContent:'center',display:'flex'}} >
                                <button onClick={()=>rmbt(file[4].lastModified)} style={{position:'absolute',color:'red',top:8,right:8,fontFamily:'monospace',fontSize:20,backgroundColor:'rgba(0,0,0,0)',border:0,fontWeight:'bolder'}} >x</button>
                                    <img src={product?`/uploads/${file[4]}`:URL.createObjectURL(file[4])} style={{width:'100%',height:'auto'}} />
                                </div>:null}
                            </div>
                        </div>:null
                    }

                    
                    
                </div>
            </div>

            <div style={{width:'50%',borderRadius:5,backgroundColor:'white',border:'1px solid rgba(0,0,0,0.2)',marginTop:20,display:'flex',alignItems:'start',justifyContent:'center',flexDirection:'column',paddingBottom:15}} >
                <div style={{width:'90%',display:'flex',alignItems:'start',justifyContent:'center',flexDirection:'column',alignSelf:'center',padding:10,marginTop:10}} >
                    <h1 style={{margin:0,fontFamily:'ml',fontSize:25,color:'rgba(0,0,0,0.9)',marginBottom:0}} >Pricing</h1>
                    <div style={{display:'flex',flexDirection:'row',width:'100%',position:'relative'}} >
                        <div style={{width:'45%'}} >
                            <h1 style={{margin:0,fontFamily:'ml',fontSize:22,color:'rgba(0,0,0,0.7)',marginBottom:0,marginTop:10,}} >Price</h1>
                            <div style={{width:'100%',border:'2px solid rgba(0,0,0,0.3)',borderRadius:5,display:'flex',flexDirection:'row',paddingLeft:6}} >
                                <h1 style={{fontSize:18,color:'rgba(0,0,0,0.7)'}} >$</h1>
                                <input value={price} onChange={(event)=>setPrice(event.target.value)} type="number"  style={{backgroundColor:'rgba(0,0,0,0)',fontWeight:'lighter',fontFamily:'mc',height:'100%',width:'100%',border:0,fontSize:20,padding:6,paddingLeft:4,outline:0,alignSelf:'center',color:'black',marginTop:4}} placeholder='0.0' />
                            </div>
                        </div>
                        <div style={{width:'45%',position:'absolute',right:0}} >
                            <h1 style={{margin:0,fontFamily:'ml',fontSize:22,color:'rgba(0,0,0,0.7)',marginBottom:0,marginTop:10,}} >Original price</h1>
                            <div style={{width:'100%',border:'2px solid rgba(0,0,0,0.3)',borderRadius:5,display:'flex',flexDirection:'row',paddingLeft:6}} >
                                <h1 style={{fontSize:18,color:'rgba(0,0,0,0.7)'}} >$</h1>
                                <input value={oPrice} onChange={(event)=>setOrignalPrice(event.target.value)} type="number" style={{backgroundColor:'rgba(0,0,0,0)',fontWeight:'lighter',fontFamily:'mc',height:'100%',width:'100%',border:0,fontSize:20,padding:6,paddingLeft:4,outline:0,alignSelf:'center',color:'black',marginTop:4}} placeholder='0.0' />
                            </div>
                        </div>
                    </div>
                    <div style={{width:'100%',marginTop:5}} >
                            <h1 style={{margin:0,fontFamily:'ml',fontSize:22,color:'rgba(0,0,0,0.7)',marginBottom:0,marginTop:10,}} >Cost price</h1>
                            <div style={{width:'100%',border:'2px solid rgba(0,0,0,0.3)',borderRadius:5,display:'flex',flexDirection:'row',paddingLeft:6}} >
                                <h1 style={{fontSize:18,color:'rgba(0,0,0,0.7)'}} >$</h1>
                                <input value={cPrice} onChange={(event)=>setCostPrice(event.target.value)} type="number" style={{backgroundColor:'rgba(0,0,0,0)',fontWeight:'lighter',fontFamily:'mc',height:'100%',width:'100%',border:0,fontSize:20,padding:6,paddingLeft:4,outline:0,alignSelf:'center',color:'black',marginTop:4}} placeholder='0.0' />
                            </div>
                        </div>
                </div>
            </div>

            <div style={{width:'50%',borderRadius:5,backgroundColor:'white',border:'1px solid rgba(0,0,0,0.2)',marginTop:30,display:'flex',alignItems:'start',justifyContent:'center',flexDirection:'column',paddingBottom:15,marginTop:20}} >
                <div style={{width:'90%',display:'flex',alignItems:'start',justifyContent:'center',flexDirection:'column',alignSelf:'center',padding:10,marginTop:10}} >
                    <h1 style={{margin:0,fontFamily:'ml',fontSize:25,color:'rgba(0,0,0,0.9)',marginBottom:0}} >Options</h1>
                    <h1 style={{margin:0,fontFamily:'ml',fontSize:20,color:'rgba(0,0,0,0.7)',marginBottom:5,marginTop:15}} >Size</h1>

                    <div onClick={()=> setSize({...size,large:!size.large})} style={{display:'flex',flexDirection:'row',marginTop:10}} >
                        <div style={{width:15,height:15,border:'2px solid rgba(0,0,0,0.3)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center'}} ><div style={{width:'90%',height:'90%',borderRadius:10,backgroundColor:size.large?'#ff9900':'rgba(0,0,0,0)'}} ></div></div>
                        <h1 style={{margin:0,fontFamily:'ml',fontSize:20,color:'rgba(0,0,0,0.9)',marginBottom:0,marginTop:0,marginLeft:15}} >Large</h1>
                    </div>
                    <div onClick={()=> setSize({...size,medium:!size.medium})} style={{display:'flex',flexDirection:'row',marginTop:10}} >
                        <div style={{width:15,height:15,border:'2px solid rgba(0,0,0,0.3)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center'}} ><div style={{width:'90%',height:'90%',borderRadius:10,backgroundColor:size.medium?'#ff9900':'rgba(0,0,0,0)'}} ></div></div>
                        <h1 style={{margin:0,fontFamily:'ml',fontSize:20,color:'rgba(0,0,0,0.9)',marginBottom:0,marginTop:0,marginLeft:15}} >Medium</h1>
                    </div>
                    <div onClick={()=> setSize({...size,small:!size.small})} style={{display:'flex',flexDirection:'row',marginTop:10}} >
                        <div style={{width:15,height:15,border:'2px solid rgba(0,0,0,0.3)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center'}} ><div style={{width:'90%',height:'90%',borderRadius:10,backgroundColor:size.small?'#ff9900':'rgba(0,0,0,0)'}} ></div></div>
                        <h1 style={{margin:0,fontFamily:'ml',fontSize:20,color:'rgba(0,0,0,0.9)',marginBottom:0,marginTop:0,marginLeft:15}} >Small</h1>
                    </div>
                    <h1 style={{margin:0,fontFamily:'ml',fontSize:20,color:'rgba(0,0,0,0.7)',marginBottom:5,marginTop:15}} >Color</h1>
                    <div style={{display:'flex',flexDirection:'row'}} >
                        {
                            colors.map((bn,tts)=>{
                                return(
                                    <div style={{display:'flex',flexDirection:'row',margin:10,height:20,width:20,borderRadius:20,border:'2px solid gray',backgroundColor:bn.color,overflow:'hidden'}} >
                                        <input type="color" value={bn.color} onChange={(event => setColors(colors => [...colors].map(b => b.id === bn.id ? ({...b, color:event.target.value}) : b)))}  style={{width:'100%',padding:0,backgroundColor:'white',border:'20px solid '+bn.color,borderRadius:20,height:'100%'}} />
                                    </div>
                                )
                            })
                        }
                        <button onClick={()=>setColors([...colors,{id:colors.length,color:'#ffffff'}])} style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row',margin:10,height:25,width:25,borderRadius:20,border:'2px solid gray',backgroundColor:'white',overflow:'hidden'}} >
                            <h1 style={{margin:0,padding:0,fontFamily:'ml',fontSize:21,color:"rgba(0,0,0,0.7)"}} >+</h1>
                        </button>
                    </div>
                    <h1 style={{margin:0,fontFamily:'ml',fontSize:20,color:'rgba(0,0,0,0.7)',marginBottom:5,marginTop:15}} >Quantity</h1>
                    <div style={{width:'100%',border:'2px solid rgba(0,0,0,0.3)',borderRadius:5,display:'flex',flexDirection:'row',paddingLeft:6}} >
                        <h1 style={{fontSize:18,color:'rgba(0,0,0,0.7)'}} >Qts</h1>
                        <input value={qts} min={0} onChange={(event)=>setQts(event.target.value)} type="number" style={{backgroundColor:'rgba(0,0,0,0)',fontWeight:'lighter',fontFamily:'mc',height:'100%',width:'100%',border:0,fontSize:20,padding:6,paddingLeft:4,outline:0,alignSelf:'center',color:'black',marginTop:4}} placeholder='0' />
                    </div>
                </div>
            </div>

            <div style={{width:'50%',height:0,borderRadius:5,backgroundColor:'white',border:'1px solid rgba(0,0,0,0.2)',marginTop:30,display:'flex',alignItems:'start',justifyContent:'center',flexDirection:'column',marginTop:20}} >
                
            </div>
            
            
        </div>
  );
}

export default AddProducts;
