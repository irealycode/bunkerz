
import React from 'react';
import { Link,useNavigate,useParams } from "react-router-dom";
import logo from '../assets/bunker.png'
import rowimg from '../assets/row.png'
import clmimg from '../assets/column.png'
import arrow from '../assets/arrow.png'
import '../style/home.css'
import axios from 'axios'; import { host } from '../code/imports/imp';
import DefaultT from '../templates/default';
import ProductT from '../templates/product';
// IMPORT ProductT from '../templates/products'


let refresh_counter = 0
function Admin() {
    let height = window.innerHeight


    const [bannerTexts,setBannerTexts] = React.useState([])
    const [bannerImgs,setBannerImgs] = React.useState([])
    const [bannerDivs,setBannerDivs] = React.useState([])
    const [Banners,setBanners] = React.useState([])
    const [newB,setNewB] = React.useState({name:'default',type:'empty',show:false})
    const [file, setFile] = React.useState(null);
    const [storeProducts,setStoreProducts] = React.useState([])
    const [products,setProducts] = React.useState([])
    const [productStyle,setProductStyle] = React.useState({backgroundColor:'#ffffff',foreground:'#000000',font:'ns',showfont:false})
    const [Height,setHeight] = React.useState(false)
    // a dict did not work
    const [page,setPage] = React.useState(false)
    const [pagen,setPageN] = React.useState('home')
    // end
    const [side,setSide] = React.useState(false)

    const fonts = [
        "sans-serif",
        "serif",
        "monospace",
        "fantasy",
        "cursive",
        "Arial",
        "Verdana",
        "Tahoma",
        "Trebuchet MS",
        "Times New Roman",
        "Georgia",
        "Garamond",
        "Courier",
        "Brush Script",
        "ETH",
        "ns",
        "al"
    ]
    const pages = ["home","product"]
    const actions = ["none","search","pages","products","home","cart"]
    // const [products,setProducts] =  React.useState([{show:false,image:{url:"https://i.ebayimg.com/images/g/6rsAAOSw3iphuJTp/s-l1200.webp",size:200,align:'center',borderRadius:10,borderWidth:2,borderColor:'black'},title:{name:"Tie ping",color:"black",font:"al",size:22,},ok:"",price:{price:"110",color:"black",font:"ns",size:22}},{show:false,image:{url:"https://i.ebayimg.com/images/g/Do8AAOSwsR5kV3rA/s-l1600.jpg",size:200,borderRadius:10,borderWidth:2,borderColor:'black'},title:{name:"Casual t",color:"black",font:"al",size:22,},ok:"ie",price:{price:"260",color:"black",font:"ns",size:22}},{show:false,image:{url:"https://i.ebayimg.com/images/g/PzMAAOSwfkllOuXh/s-l1200.webp",size:200,borderRadius:10,borderWidth:2,borderColor:'black'},title:{name:"AP Royal",color:"black",font:"al",size:22,},ok:" Oak",price:{price:"21k",color:"black",font:"ns",size:22}},{show:false,image:{url:"https://i.ebayimg.com/images/g/xigAAOSwyXdk7-Z7/s-l1200.webp",size:200,borderRadius:10,borderWidth:2,borderColor:'black'},title:{name:"Lether s",color:"black",font:"al",size:22,},ok:"tripes",price:{price:"999",color:"black",font:"ns",size:22}},{show:false,image:{url:"https://i.pinimg.com/1200x/d5/9e/94/d59e949ac05b319d06588d696a996d74.jpg",size:200,borderRadius:10,borderWidth:2,borderColor:'black'},title:{name:"Pinky ri",color:"black",font:"al",size:22,},ok:"ng",price:{price:"590",color:"black",font:"ns",size:22}},{show:false,image:{url:"https://habituallychic.luxury/wp-content/uploads/2021/08/signet-rings-history-etiquette-habituallychic-005.jpeg",size:200,borderRadius:10,borderWidth:2,borderColor:'black'},title:{name:"Vintage ",color:"black",font:"al",size:22,},ok:"ring",price:{price:"860",color:"black",font:"ns",size:22}}])

    const ref2 = React.useRef({clientHeight:[React.useRef({clientHeight:0}),React.useRef({clientHeight:0}),React.useRef({clientHeight:0}),React.useRef({clientHeight:0}),React.useRef({clientHeight:0}),React.useRef({clientHeight:0}),React.useRef({clientHeight:0})]})
    const navigate = useNavigate();
    let width = window.innerWidth
    let balls = height*2

    let { jid,sid } = useParams()
    
    React.useEffect(()=>{
        if (refresh_counter == 0) {
            get_store()
        }
    },[])

    function getId() {
        let length = 11
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomId = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomId += characters.charAt(randomIndex);
        }
        return randomId;
      }
    


    const get_store = async() =>{
        console.log("store requested")
        refresh_counter++
        const res = await axios.post(`http://${host}:4242/getstore`,{'w':1,'sid':sid})

        if (res.data != "505" && res.data != "no.") {
            setBannerImgs(res.data.store.bannerImgs)
            setBannerTexts(res.data.store.bannerTexts)
            setBannerDivs(res.data.store.bannerDivs)
            setBanners(res.data.store.banners)
            setStoreProducts(res.data.products)
            // setProducts([])
            let bprds= res.data.store.bannerProducts
            // console.log('gg',bprds)
            let prds= res.data.products
            for (let xdrt = 0; xdrt < prds.length-res.data.store.bannerProducts.length; xdrt++) {
                bprds.push({show:false,id:bprds.length.length,image:{size:200,align:'center',borderRadius:10,borderWidth:2,borderColor:'black'},title:{color:"black",font:"al",size:22},ok:"",price:{color:"black",font:"ns",size:22}})
                // setProducts([...products,{show:false,id:products.length,image:{size:200,align:'center',borderRadius:10,borderWidth:2,borderColor:'black'},title:{color:"black",font:"al",size:22},ok:"",price:{color:"black",font:"ns",size:22}}])
            }
            setProducts(bprds)
        }
    }

    function update(){
        console.log("okk")
        return new Promise(resolve => {
            setTimeout(()=>{
                setHeight(!Height)
            },10)
        });
    }


    async function rmbt(id) {
        const newList = bannerTexts.filter((item) => item.id !== id);
    
        setBannerTexts(newList);
        await update();
      }
      async function rmbi(id) {
        const newList = bannerImgs.filter((item) => item.id !== id);
    
        setBannerImgs(newList);
        await update();
      }

    async function rmbd(id) {
        const newList = bannerDivs.filter((item) => item.id !== id);
        const newList1 = bannerTexts.filter((item) => item.parent_id !== id);
        const newList2 = bannerImgs.filter((item) => item.parent_id !== id);
    
        setBannerTexts(newList1);
        setBannerImgs(newList2);
        setBannerDivs(newList);
        await update();
      }

    async function Rmb(id) {
        const newList = Banners.filter((item) => item.id !== id);
        const newList1 = bannerDivs.filter((item) => item.parent == id);
        for (let tt = 0; tt < newList1.length; tt++) {
            rmbd(newList1[tt].id)
            
        }
        ref2.current.clientHeight[id] = React.createRef()
        ref2.current.clientHeight[id].current = {clientHeight:0}

        setBanners(newList);
        await update();
    }

    async function mvup(id) {
        const newList = [];
        for (let kkk = 0; kkk < Banners.length; kkk++) {
            if (Banners[kkk+1] && Banners[kkk+1].id == id) {
                newList.push(Banners[kkk+1])
                newList.push(Banners[kkk])
                kkk++
            }else{
                newList.push(Banners[kkk])
            }
            
        }
        

        setBanners(newList)
        await update();
    }
    async function mvdwn(id) {
        const newList = [];
        for (let kkk = 0; kkk < Banners.length; kkk++) {
            if (Banners[kkk+1] && kkk+1 == id) {
                newList.push(Banners[kkk+1])
                newList.push(Banners[kkk])
                kkk++
            }else{
                newList.push(Banners[kkk])
            }
            
        }
        

        setBanners(newList)
        await update();
    }

    async function upload_image(id){
        var formData = new FormData();
        formData.append('file', file);
        const response = await axios.post(`http://${host}:4242/upload`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
        console.log('n:', response.data.message);
        setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === id ? ({...b, src:response.data.message}) : b))
    }

    async function save_store(){
        var data = {'jid':jid,'sid':sid,'save':{'bannerTexts':bannerTexts,'bannerImgs':bannerImgs,'bannerDivs':bannerDivs,'bannerProducts':products,'banners':Banners}}
        const res = await axios.post(`http://${host}:4242/savestore`,data)

        alert(res.data)
    }


    function editProductTab(){
        return(
            <div style={{position:'relative',marginTop:20}}>
                <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:0,marginLeft:40}} >
                    <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,marginRight:10}} >Background</p>
                    <input value={productStyle.backgroundColor} type="color" onChange={(event => setProductStyle({...productStyle,backgroundColor:event.target.value}))} style={{width:'50%',padding:0,backgroundColor:'white',border:'1px solid black',borderRadius:2,height:20,marginRight:10}} />
                </div>
                <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:0,marginLeft:40}} >
                    <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,marginRight:10}} >Foreground</p>
                    <input value={productStyle.foreground} type="color" onChange={(event => setProductStyle({...productStyle,foreground:event.target.value}))} style={{width:'50%',padding:0,backgroundColor:'white',border:'1px solid black',borderRadius:2,height:20,marginRight:10}} />
                </div>
                <div  style={{width:'80%',border:'2px solid black',borderRadius:5,marginTop:10,position:'relative',display:'flex',alignItems:'center',flexDirection:'column',marginLeft:40}} >
                    <p onClick={()=>setProductStyle({...productStyle,showfont:true})} style={{fontFamily:''+productStyle.font+'',fontWeight:'bolder',fontSize:15,margin:0,padding:6,cursor:'pointer'}} >{productStyle.font}</p>
                    <div className="text" style={{overflow:'scroll',position:'absolute',alignSelf:'center',backgroundColor:'white',borderRadius:5,width:'100%',maxHeight:!productStyle.showfont?0:200,border:!productStyle.showfont?0:2+'px solid black',borderRadius:5,bottom:0}} >
                        {
                            fonts.map((font,i)=>{
                                return(
                                    <p onClick={()=>setProductStyle({...productStyle,font:font,showfont:false})} style={{fontFamily:''+font+'',fontSize:15,margin:0,padding:6}} >{font}</p>
                                )
                            })
                        }
                    
                    </div>
                </div>
            </div>
        )
    }

    // console.log(bannerImgs )

    // console.log(ref.current.scrollHeight,' ',ref.current.clientHeight,' ',height)

    if(jid){
        return (
        <div >
            <div className="webview" style={{position:'absolute',height:height,width:360,backgroundColor:'white',left:0,alignItems:'center',justifyContent:'center',textAlign:'center',flexDirection:'column',borderRight:'2px solid black',zIndex:2,overflowX:'hidden',overflowY:'scroll'}} >
                    
                    <h1 style={{fontFamily:'ns',fontSize:22}} > {pagen=="home"?"online store":"view product"}</h1>
                    <h1 onClick={()=>setSide(!side)} style={{position:'absolute',fontFamily:'ns',fontSize:22,top:0,right:10,cursor:"pointer"}} >+</h1>
                    
                    

                    {newB.show?<div className="bannerEdit" style={{position:'absolute',zIndex:3,backgroundColor:'white',marginLeft:0,overflow:'scroll',width:'100%',alignItems:'center',justifyContent:'center',alignSelf:'center',display:'flex',flexDirection:'column',borderRadius:5,borderBottom:'2px solid black',borderTop:'2px solid black',paddingBottom:10,paddingTop:10,marginTop:15}} >
                        <input value={newB.name} onChange={(event => setNewB({...newB, name:event.target.value}))} style={{border:'2px solid black',width:'80%',height:15,padding:5,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'white',borderRadius:5}} placeholder="name..." />
                        <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginLeft:70}} >
                            <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,marginTop:4,marginBottom:4,marginRight:10}} >empty</p>
                            <input type="checkbox" checked={newB.type == 'empty'} onClick={()=>setNewB({...newB, type:'empty'})} />
                        </div>
                        <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginLeft:70}} >
                            <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,marginTop:4,marginBottom:4,marginRight:10}} >retractable</p>
                            <input type="checkbox" checked={newB.type == 'retractable'} onClick={()=>setNewB({...newB, type:'retractable'})} />
                        </div>
                        <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginLeft:70}} >
                            <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,marginTop:4,marginBottom:4,marginRight:10}} >products</p>
                            <input type="checkbox" checked={newB.type == 'products'} onClick={()=>setNewB({...newB, type:'products'})} />
                        </div>
                        <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginLeft:70}} >
                            <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,marginTop:4,marginBottom:4,marginRight:10}} >banner</p>
                            <input type="checkbox" checked={newB.type == 'banner'} onClick={()=>setNewB({...newB, type:'banner'})} />
                        </div>

                        <button onClick={async()=>{setNewB({...newB,show:false});setBanners(Banners=>[...Banners,{id:getId(),sticky:false,marginX:0,marginY:0,rows:3,editAll:false,type:newB.type,name:newB.name,show:true,backgroundColor:'white',FullHeight:true,FullmHeight:false,size:height-100,image:{align:'flex-end',fullHeight:true,size:height-100}}]);await update();}} style={{border:'2px solid black',width:'80%',padding:5,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'white',borderRadius:5}} >
                            add
                        </button>
                    </div>:null}




                    {
                        pagen=="home"?Banners.map((bn,yy)=>{
                            if (bn.type != "products") {
                            
                            return (
                                <div key={yy} className="bannerEdit" style={{position:'relative',marginLeft:0,height:bn.show?ref2.current.clientHeight[yy].current.clientHeight+40:10,overflow:'scroll',backgroundColor:'white',width:'100%',alignItems:'center',justifyContent:'center',alignSelf:'center',display:'flex',flexDirection:'column',borderRadius:0,borderBottom:yy == Banners.length-1?'2px solid black':'0px',borderTop:'2px solid black',paddingBottom:10,paddingTop:10}} >
                                <button onClick={()=>setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, show:!bn.show}) : b))} style={{position:'absolute',top:2,border:0,width:'90%',textAlign:'start',padding:5,marginLeft:10,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'rgba(0,0,0,0)',borderRadius:5}} >
                                   {bn.editName?<input onChange={(event=>{setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, name:event.target.value}) : b))})} style={{color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'rgba(0,0,0,0)',border:0,cursor:'pointer'}} value={bn.name} />:bn.name}  <img onClick={()=>setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, editName:!bn.editName}) : b))} src="/static/pen.png" style={{height:11,width:11,cursor:'pointer'}} />
                                </button>
                                <div style={{position:'absolute',right:5,display:'flex',flexDirection:'row',top:6}} >
                                    <button onClick={()=>{mvup(bn.id)}} style={{border:0,padding:0,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'rgba(0,0,0,0)',cursor:'pointer'}} >
                                        <img src={arrow} style={{height:20,width:20}}  />
                                    </button>
                                    <button onClick={()=>{mvdwn(yy+1)}} style={{border:0,padding:0,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'rgba(0,0,0,0)',cursor:'pointer'}} >
                                        <img src={arrow} style={{height:20,width:20,transform:'rotate(180deg)'}}  />
                                    </button>
                                </div>
                                <button onClick={()=>Rmb(bn.id)} style={{position:'absolute',top:6,left:5,fontFamily:'ns',fontSize:15,color:'red',padding:0,borderRadius:20,backgroundColor:'white',zIndex:2,border:0,cursor:'pointer'}} >X</button>


                                
            
                                <div ref={ref2.current.clientHeight[yy]} style={{position:'absolute',top:50,width:'100%',alignItems:'center',justifyContent:'center',alignSelf:'center',display:'flex',flexDirection:'column'}} >
                                <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:0,marginLeft:40}} >
                                    <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,marginRight:10}} >Background</p>
                                    <input value={bn.backgroundColor} type="color" onChange={(event => setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, backgroundColor:event.target.value}) : b)))} style={{width:'50%',padding:0,backgroundColor:'white',border:'1px solid black',borderRadius:2,height:20,marginRight:10}} />
                                </div>
                                
                                <p style={{marginBottom:0,marginTop:0,fontFamily:'monospace',fontWeight:'bolder',fontSize:20,alignSelf:'flex-start',marginLeft:20}} >hieght</p>
                                <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginLeft:70}} >
                                    <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,marginRight:10}} >full</p>
                                    <input type="checkbox" checked={bn.FullHeight} onClick={async()=>{setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, FullHeight:!bn.FullHeight,size:height-100}) : b));await update()}} />
                                </div>
                                <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginLeft:70,marginBottom:10}} >
                                    <h3 style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,marginRight:10,marginTop:0,marginBottom:0}} >sticky</h3>
                                    <input style={{marginTop:0}} type="checkbox" checked={bn.sticky} onClick={async()=>{setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, sticky:!bn.sticky}) : b));await update()}} />
                                </div>
                                {!bn.FullHeight?<input value={bn.size} type="number" onChange={(event => setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, size:parseInt(event.target.value)}) : b)))} style={{border:'2px solid black',width:'33%',height:15,padding:5,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'white',borderRadius:5,alignSelf:'flex-start',marginLeft:35}} placeholder="type..." />:null}
                                <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginLeft:70,marginBottom:5}} >
                                    <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,marginRight:10}} >full - prev</p>
                                    <input type="checkbox" checked={bn.FullmHeight} onClick={async()=>{setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, FullmHeight:!bn.FullmHeight}) : b));await update()}} />
                                </div>
                          
                                    
                                    {
                                        bannerDivs.map((bannerDiv,y)=>{
                                            if (bannerDiv.parent == bn.id) {
                                                return(
                                                    <div key={y} className="bannerdiv" style={{position:'relative',maxHeight:bannerDiv.show?5000:0,overflow:'hidden',width:'90%',alignItems:'center',marginBottom:8,justifyContent:'center',alignSelf:'center',display:'flex',flexDirection:'column',borderRadius:5,borderBottom:'3px solid black',borderTop:'3px solid black',borderLeft:'1px solid black',borderRight:'1px solid black',paddingBottom:10,paddingTop:25}} >
                                                        <button onClick={()=>rmbd(bannerDiv.id)} style={{position:'absolute',fontFamily:'ns',fontSize:15,color:'red',top:5,left:10,padding:0,borderRadius:20,backgroundColor:'white',zIndex:2,border:0}} >X</button>
                                                        <button onClick={async()=>{setBannerDivs(bannerDivs=> [...bannerDivs].map(b => b.id === bannerDiv.id ? ({...b, show:!bannerDiv.show}) : b));await update();}} style={{position:'absolute',fontFamily:'ns',zIndex:2,fontSize:15,color:'black',top:5,left:30,padding:0,borderRadius:20,backgroundColor:'white',border:0}} >[]</button>
                                                        <button onClick={async()=>{setBannerTexts(bannerTexts=>[...bannerTexts,{parent_id:bannerDiv.id,id:getId(),margin:0,text:"your text here...",cursor:'pointer',color:"#00000",size:15,align:'center',showfont:false,font:'ns'}]);await update()}} style={{border:'2px solid black',width:'90%',padding:5,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'white',borderRadius:5}} >
                                                            add text
                                                        </button>
                                                        <button onClick={async()=>{setBannerImgs(bannerImgs=>[...bannerImgs,{parent_id:bannerDiv.id,id:getId(),cursor:'pointer',margin:0,width:15,height:15,cwidth:false,cheight:false,align:'center',src:'',fullw:false,fullh:false}]);await update()}} style={{border:'2px solid black',width:'90%',marginTop:10,padding:5,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'white',borderRadius:5}} >
                                                            add image
                                                        </button>
                                                        {
                                                            bannerTexts.map((bannerText,i)=>{
                                                                if (bannerText.parent_id == bannerDiv.id) {
                                                                    return(
                                                                        <div key={i} style={{border:'2px solid black',width:'90%',display:'flex',alignItems:'center',flexDirection:'column',borderRadius:5,marginTop:10,paddingBottom:10,position:'relative'}} >
                                                                            <button onClick={()=>rmbt(bannerText.id)} style={{position:'absolute',fontFamily:'ns',fontSize:15,color:'red',top:5,left:10,padding:0,borderRadius:20,backgroundColor:'white',border:0}} >X</button>
                                                                            <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,marginTop:5}} >banner text</p>
                                                                            <input value={bannerText.text} onChange={(event => setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, text:event.target.value}) : b)))} style={{border:'2px solid black',width:'80%',padding:5,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'white',borderRadius:5}} placeholder="type..." />
                                                                            <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center'}} >
                                                                                <input value={bannerText.color} type="color" onChange={(event => setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, color:event.target.value}) : b)))} style={{width:'33%',padding:0,backgroundColor:'white',border:'2px solid black',borderRadius:5,height:29,marginRight:10}} />
                                                                                <input value={bannerText.size} type="number" onChange={(event => setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, size:parseInt(event.target.value)}) : b)))} style={{border:'2px solid black',width:'33%',height:15,padding:5,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'white',borderRadius:5}} placeholder="type..." />
                                                                            </div>
                                                                            <input type="range" value={bannerText.align=='flex-start'?0:bannerText.align=='center'?1:2} style={{width:'80%',marginTop:10}} min={0} max={2} onChange={(event => setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, align:event.target.value==0?'flex-start':event.target.value==1?'center':'flex-end'}) : b)))} />
                                                                            <div onClick={()=>setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, showfont:!bannerText.showfont}) : b))} style={{width:'80%',border:'2px solid black',borderRadius:5,marginTop:10,position:'relative',display:'flex',alignItems:'center',flexDirection:'column'}} >
                                                                                <p style={{fontFamily:''+bannerText.font+'',fontWeight:'bolder',fontSize:15,margin:0,padding:6}} >{bannerText.font}</p>
                                                                                <div className="text" style={{overflow:'scroll',position:'absolute',alignSelf:'center',backgroundColor:'white',borderRadius:5,width:'100%',maxHeight:!bannerText.showfont?0:200,border:!bannerText.showfont?0:2+'px solid black',borderRadius:5,bottom:0}} >
                                                                                    {
                                                                                        fonts.map((font,i)=>{
                                                                                            return(
                                                                                                <p onClick={()=>setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, font:font}) : b))} style={{fontFamily:''+font+'',fontSize:15,margin:0,padding:6}} >{font}</p>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                
                                                                                </div>
                                                                            </div>
                                                                            <div onClick={()=>{setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, showActions:!bannerText.showActions}) : b))}} style={{width:'80%',border:'2px solid black',borderRadius:5,marginTop:10,position:'relative',display:'flex',alignItems:'center',flexDirection:'column'}} >
                                                                            <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,margin:0,padding:6}} >action: {bannerText.action?bannerText.action:"none"}</p>
                                                                                <div className="text" style={{overflow:'scroll',position:'absolute',alignSelf:'center',backgroundColor:'white',borderRadius:5,width:'100%',maxHeight:!bannerText.showActions?0:200,border:!bannerText.showActions?0:2+'px solid black',borderRadius:5,bottom:0}} >
                                                                                    {
                                                                                        actions.map((action,i)=>{
                                                                                            return(
                                                                                                <p onClick={()=>{setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, showActions:!bannerText.showActions,action:action!="none"?action:null}) : b))}} style={{fontFamily:'monospace',fontSize:15,margin:0,padding:6}} >{action}</p>
                                                                                            )
                                                                                        }).reverse()
                                                                                    }
                                                                                
                                                                                </div>
                                                                            </div>
                                                                            <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center'}} >
                                                                                <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,marginRight:10}} >margin</p>
                                                                                <input value={bannerText.margin} type="number" onChange={(event => setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, margin:parseInt(event.target.value)}) : b)))} style={{border:'2px solid black',width:'33%',height:15,padding:5,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'white',borderRadius:5}}  />
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }else{
                                                                    return null
                                                                }
                                                            })
                                                        }
                                                        {
                                                            bannerImgs.map((bannerImg,i)=>{
                                                                if (bannerImg.parent_id == bannerDiv.id) {
                                                                    return(
                                                                        <div key={i+bannerTexts.length} style={{border:'2px solid black',width:'90%',display:'flex',alignItems:'center',flexDirection:'column',borderRadius:5,marginTop:10,paddingBottom:10,position:'relative'}} >
                                                                            <button onClick={()=>rmbi(bannerImg.id)} style={{position:'absolute',fontFamily:'ns',fontSize:15,color:'red',top:5,left:10,padding:0,borderRadius:20,backgroundColor:'white',border:0}} >X</button>
                                                                            <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,marginTop:5}} >banner image</p>
                                                                            <input style={{border:'2px black solid',width:'70%',borderRadius:5,alignItems:'center'}} onChange={(event)=>{setFile(event.target.files[0])}} type="file" id="file" name="file"/>
                                                                            <button onClick={()=>{upload_image(bannerImg.id)}} style={{border:'2px solid black',width:'50%',padding:5,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'white',marginTop:10,borderRadius:5}} >
                                                                                upload
                                                                            </button>
                                                                            <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center'}} >
                                                                                <input value={bannerImg.height} type="number" onChange={(event => setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, height:parseInt(event.target.value)}) : b)))} style={{border:'2px solid black',width:'33%',height:15,padding:5,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'white',borderRadius:5,marginRight:10}} placeholder="type..." />
                                                                                <input value={bannerImg.width} type="number" onChange={(event => setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, width:parseInt(event.target.value)}) : b)))} style={{border:'2px solid black',width:'33%',height:15,padding:5,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'white',borderRadius:5}} placeholder="type..." />
                                                                            </div>
                                                                            <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center'}} >
                                                                                <input type="checkbox" checked={bannerImg.cheight} style={{marginRight:80}} onClick={()=>setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, cheight:!bannerImg.cheight}) : b))} />
                                                                                <input type="checkbox" checked={bannerImg.cwidth} onClick={()=>setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, cwidth:!bannerImg.cwidth}) : b))} />
                                                                            </div>
                                                                            <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginLeft:30}} >
                                                                                <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,marginRight:10}} >full height</p>
                                                                                <input type="checkbox" checked={bannerImg.fullh} onClick={async()=>{setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, fullh:!bannerImg.fullh,cwidth:!bannerImg.fullh}) : b));await update()}} />
                                                                            </div>
                                                                            <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginLeft:30}} >
                                                                                <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,marginRight:10}} >full width</p>
                                                                                <input type="checkbox" checked={bannerImg.fullw} onClick={async()=>{setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, fullw:!bannerImg.fullw,cheight:!bannerImg.fullw}) : b));await update()}} />
                                                                            </div>
                                                                            <input type="range" value={bannerImg.align=='flex-start'?0:bannerImg.align=='center'?1:2} style={{width:'80%',marginTop:10}} min={0} max={2} onChange={(event => setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, align:event.target.value==0?'flex-start':event.target.value==1?'center':'flex-end'}) : b)))} />
                                                                            
                                                                            <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center'}} >
                                                                                <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,marginRight:10}} >margin</p>
                                                                                <input value={bannerImg.margin} type="number" onChange={(event => setBannerImgs(bannerImgs=> [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, margin:parseInt(event.target.value)}) : b)))} style={{border:'2px solid black',width:'33%',height:15,padding:5,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'white',borderRadius:5}}  />
                                                                            </div>
                                                                            <div onClick={()=>{setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, showActions:!bannerImg.showActions}) : b))}} style={{width:'80%',border:'2px solid black',borderRadius:5,marginTop:10,position:'relative',display:'flex',alignItems:'center',flexDirection:'column'}} >
                                                                            <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,margin:0,padding:6}} >action: {bannerImg.action?bannerImg.action:"none"}</p>
                                                                                <div className="text" style={{overflow:'scroll',position:'absolute',alignSelf:'center',backgroundColor:'white',borderRadius:5,width:'100%',maxHeight:!bannerImg.showActions?0:200,border:!bannerImg.showActions?0:2+'px solid black',borderRadius:5,bottom:0}} >
                                                                                    {
                                                                                        actions.map((action,i)=>{
                                                                                            return(
                                                                                                <p onClick={()=>{setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, showActions:!bannerImg.showActions,action:action!="none"?action:null}) : b))}} style={{fontFamily:'monospace',fontSize:15,margin:0,padding:6}} >{action}</p>
                                                                                            )
                                                                                        }).reverse()
                                                                                    }
                                                                                
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }else{
                                                                    return null
                                                                }
                                                            })
                                                        }
                                                        <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center',marginLeft:0}} >
                                                            <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,marginRight:10}} >X</p>
                                                            <input type="range" value={bannerDiv.align=='flex-start'?0:bannerDiv.align=='center'?1:2} style={{width:'80%',marginTop:10}} min={0} max={2} onChange={(event => setBannerDivs(bannerDivs => [...bannerDivs].map(b => b.id === bannerDiv.id? ({...b, align:event.target.value==0?'flex-start':event.target.value==1?'center':'flex-end'}) : b)))} />
                                                        </div>
                                                        <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center',marginLeft:0}} >
                                                            <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,marginRight:10}} >Y</p>
                                                            <input type="range"  style={{width:'80%',marginTop:10}} min={-bn.size} max={bn.size} onChange={(event => setBannerDivs(bannerDivs => [...bannerDivs].map(b => b.id === bannerDiv.id? ({...b, y:parseInt(event.target.value)}) : b)))} />
                                                        </div>
                                                        <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center'}} >
                                                            <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,marginRight:10}} >margin X</p>
                                                            <input value={bannerDiv.marginH} type="number" onChange={(event => setBannerDivs(bannerDivs => [...bannerDivs].map(b => b.id === bannerDiv.id ? ({...b, marginH:parseInt(event.target.value)}) : b)))} style={{border:'2px solid black',width:'33%',height:15,padding:5,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'white',borderRadius:5}}  />
                                                        </div>
                                                        <div style={{flexDirection:'row',display:'flex',marginTop:10}} >
                                                            <button onClick={()=>setBannerDivs(bannerDivs => [...bannerDivs].map(b => b.id === bannerDiv.id? ({...b, fdirection:'row'}) : b))} style={{backgroundColor:'white',border:0,padding:0,borderRadius:5,borderBottom:bannerDiv.fdirection != 'column'?'2px solid black':0}} ><img src={rowimg} style={{height:30,width:30}}  /></button>
                                                            <button onClick={()=>setBannerDivs(bannerDivs => [...bannerDivs].map(b => b.id === bannerDiv.id? ({...b, fdirection:'column'}) : b))} style={{backgroundColor:'white',border:0,padding:0,marginLeft:40,borderRadius:5,borderBottom:bannerDiv.fdirection == 'column'?'2px solid black':0}} ><img src={clmimg} style={{height:30,width:30}}  /></button>
                                                        </div> 
                
                                                        {!bannerDiv.show?<div style={{position:"absolute",zIndex:1,backgroundColor:'white',height:'100%',width:'100%',alignItems:'center',justifyContent:'center',textAlign:'center',display:'flex',top:0}} >
                                                                   <h5 style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15}}>div</h5>
                                                        </div>:null}




                                                    </div>
                                                )
                                            }else{
                                                return null
                                            }
                                            
                                        })
                                    }
                                    <button onClick={async()=>{setBannerDivs(bannerDivs=>[...bannerDivs,{parent:bn.id,id:getId(),marginH:0,align:'center',show:true,fdirection:'column'}]);await update();}} style={{border:'2px solid black',width:'90%',padding:5,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'white',borderRadius:5}} >
                                        add div
                                    </button>
                                </div>
                            </div>
                            )
                        }else{





                                // PRODCUTS
                                // PRODCUTS
                                // PRODCUTS
                                // PRODCUTS
                                // PRODCUTS
                                // PRODCUTS
                                // PRODCUTS
                                // PRODCUTS
                                // PRODCUTS
                                // PRODCUTS
                                // PRODCUTS
                                // PRODCUTS
                                // PRODCUTS
                                // PRODCUTS
                                // PRODCUTS
                                // PRODCUTS
                                // PRODCUTS
                                // PRODCUTS
                                // PRODCUTS
                                // PRODCUTS





                            return (
                            <div className="bannerEdit" style={{position:'relative',marginLeft:0,height:bn.show?ref2.current.clientHeight[yy].current.clientHeight+40:10,overflow:'scroll',overflowX:'hidden',width:'100%',alignItems:'center',justifyContent:'center',alignSelf:'center',display:'flex',flexDirection:'column',borderBottom:yy == Banners.length-1?'2px solid black':'0px',borderTop:'2px solid black',paddingBottom:10,paddingTop:10}} >
                                <button onClick={()=>setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, show:!bn.show}) : b))} style={{position:'absolute',top:2,textAlign:'start',marginLeft:10,border:0,width:'90%',padding:5,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'rgba(0,0,0,0)',borderRadius:5}} >
                                    {bn.name}
                                </button>
                                <div style={{position:'absolute',right:5,display:'flex',flexDirection:'row',top:6}} >
                                    <button onClick={()=>{mvup(bn.id)}} style={{border:0,padding:0,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'rgba(0,0,0,0)'}} >
                                        <img src={arrow} style={{height:20,width:20}}  />
                                    </button>
                                    <button onClick={()=>{mvdwn(yy+1)}} style={{border:0,padding:0,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'rgba(0,0,0,0)'}} >
                                        <img src={arrow} style={{height:20,width:20,transform:'rotate(180deg)'}}  />
                                    </button>
                                </div>
                                <button onClick={()=>Rmb(bn.id)} style={{position:'absolute',top:6,left:5,fontFamily:'ns',fontSize:15,color:'red',padding:0,borderRadius:20,backgroundColor:'white',zIndex:2,border:0}} >X</button>


            
                                <div ref={ref2.current.clientHeight[yy]} style={{position:'absolute',top:50,width:'100%',alignItems:'center',justifyContent:'center',alignSelf:'center',display:'flex',flexDirection:'column'}} >
                                <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:0,marginLeft:30}} >
                                    <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,marginRight:10}} >Background</p>
                                    <input value={bn.color} type="color" onChange={(event => setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, backgroundColor:event.target.value}) : b)))}  style={{width:'50%',padding:0,backgroundColor:'white',border:'1px solid black',borderRadius:2,height:20,marginRight:10}} />
                                </div>
                                <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:0,marginLeft:30,marginTop:0}} >
                                    <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,marginRight:10}} >Rows</p>
                                    <input value={bn.rows} type="number" onChange={(event => setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, rows:parseInt(event.target.value)}) : b)))} style={{border:'2px solid black',width:'33%',height:15,padding:5,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'white',borderRadius:5}} placeholder="type..." />
                                </div>
            
                                <p style={{marginBottom:0,marginTop:0,fontFamily:'monospace',fontWeight:'bolder',fontSize:20,alignSelf:'flex-start',marginLeft:20}} >Height</p>
                                <div style={{marginLeft:70,borderLeft:'2px solid black',paddingLeft:10,display:'flex',justifyContent:'flex-start',flexDirection:'column',width:'100%',paddingTop:5,paddingBottom:5}} >
                                    <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center'}} >
                                        <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,marginRight:10,margin:0}} >Full</p>
                                        <input type="checkbox" checked={bn.FullHeight} onClick={async()=>{setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, FullHeight:!bn.FullHeight,size:height-100}) : b));await update()}} />
                                    </div>
                                    {!bn.FullHeight?<input value={bn.size} type="number" onChange={(event => setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, size:parseInt(event.target.value)}) : b)))} style={{border:'2px solid black',width:'33%',height:15,padding:5,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'white',borderRadius:5,alignSelf:'flex-start',marginTop:8}} placeholder="type..." />:null}
                                </div>
                                                    
                                
                                <div style={{marginTop:8,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginLeft:30,padding:0}} >
                                    <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:20,marginRight:10,margin:0}} >Edit all</p>
                                    <input type="checkbox" checked={bn.editAll} onClick={async()=>{setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, editAll:!bn.editAll}) : b))}} />
                                </div>
            
            
                                <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:0,marginLeft:30,marginTop:8}} >
                                    <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:20,marginRight:10,marginTop:0,marginBottom:0}} >Margin X</p>
                                    <input value={bn.marginX} type="number" onChange={(event => setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, marginX:parseInt(event.target.value)}) : b)))} style={{border:'2px solid black',width:'33%',height:15,padding:5,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'white',borderRadius:5}} placeholder="type..." />
                                </div>
                                <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:0,marginLeft:30,marginTop:8}} >
                                    <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:20,marginRight:10,marginTop:0,marginBottom:0}} >Margin Y</p>
                                    <input value={bn.marginY} type="number" onChange={(event => setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, marginY:parseInt(event.target.value)}) : b)))} style={{border:'2px solid black',width:'33%',height:15,padding:5,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'white',borderRadius:5}} placeholder="type..." />
                                </div>
                
                                        
                                        {
                                            products.map((bannerDiv,y)=>{
                                                let product = bannerDiv
                                                return(
                                                    <div key={y} className="bannerdiv" style={{position:'relative',maxHeight:bannerDiv.show?1000:0,overflow:'hidden',width:'90%',alignItems:'center',marginTop:8,justifyContent:'center',alignSelf:'center',display:'flex',flexDirection:'column',borderRadius:5,borderBottom:'3px solid black',borderTop:'3px solid black',borderLeft:'1px solid black',borderRight:'1px solid black',paddingBottom:10,paddingTop:25}} >
                                                        <button onClick={()=>rmbd(bannerDiv.id)} style={{position:'absolute',fontFamily:'ns',fontSize:15,color:'red',top:5,left:10,padding:0,borderRadius:20,backgroundColor:'white',zIndex:2,border:0}} >X</button>
                                                        <button onClick={async()=>{setProducts(products=> [...products].map(b => b.id === bannerDiv.id ? ({...b, show:!bannerDiv.show}) : b));await update();}} style={{position:'absolute',fontFamily:'ns',zIndex:2,fontSize:15,color:'black',top:5,left:30,padding:0,borderRadius:20,backgroundColor:'white',border:0}} >[]</button>
                                                        
                                                        <div style={{border:'2px solid black',width:'90%',display:'flex',alignItems:'center',flexDirection:'column',borderRadius:5,marginTop:10,paddingBottom:10,position:'relative'}} >
                                                            <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,marginTop:5}} >{storeProducts[y].title}</p>
                                                            <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center'}} >
                                                                <input value={product.title.color} type="color" onChange={(event => setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, title:{...b.title,color:event.target.value}}) : b)))} style={{width:'33%',padding:0,backgroundColor:'white',border:'2px solid black',borderRadius:5,height:29,marginRight:10}} />
                                                                <input value={product.title.size} type="number" onChange={(event => setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, title:{...b.title,size:event.target.value}}) : b)))} style={{border:'2px solid black',width:'33%',height:15,padding:5,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'white',borderRadius:5}} placeholder="type..." />
                                                            </div>
                                                            <input type="range" value={product.title.align=='flex-start'?0:product.title.align=='center'?1:2} style={{width:'80%',marginTop:10}} min={0} max={2} onChange={(event => setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, title:{...b.title,align:event.target.value==0?'flex-start':event.target.value==1?'center':'flex-end'}}) : b)))} />
                                                            <div onClick={()=>setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, title:{...b.title,showFont:!product.title.showFont}}) : b))} style={{width:'80%',border:'2px solid black',borderRadius:5,marginTop:10,position:'relative',display:'flex',alignItems:'center',flexDirection:'column'}} >
                                                                <p style={{fontFamily:''+product.title.font+'',fontWeight:'bolder',fontSize:15,margin:0,padding:6}} >{product.title.font}</p>
                                                                <div className="text" style={{overflow:'scroll',position:'absolute',alignSelf:'center',backgroundColor:'white',borderRadius:5,width:'100%',maxHeight:!product.title.showFont?0:200,border:!product.title.showFont?0:2+'px solid black',borderRadius:5,bottom:0}} >
                                                                    {
                                                                        fonts.map((font,i)=>{
                                                                            return(
                                                                                <p onClick={()=>setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, title:{...b.title,font:font}}) : b))} style={{fontFamily:''+font+'',fontSize:15,margin:0,padding:6}} >{font}</p>
                                                                            )
                                                                        })
                                                                    }
                                                                
                                                                </div>
                                                            </div>
                                                        </div>
                
                
                                                        <div style={{border:'2px solid black',width:'90%',display:'flex',alignItems:'center',flexDirection:'column',borderRadius:5,marginTop:10,paddingBottom:10,position:'relative'}} >
                                                            <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,marginTop:5}} >price</p>
                                                            <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center'}} >
                                                                <input value={product.price.color} type="color" onChange={(event => setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, price:{...b.price,color:event.target.value}}) : b)))} style={{width:'33%',padding:0,backgroundColor:'white',border:'2px solid black',borderRadius:5,height:29,marginRight:10}} />
                                                                <input value={product.price.size} type="number" onChange={(event => setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, price:{...b.price,size:event.target.value}}) : b)))} style={{border:'2px solid black',width:'33%',height:15,padding:5,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'white',borderRadius:5}} placeholder="type..." />
                                                            </div>
                                                            <input type="range" value={product.price.align=='flex-start'?0:product.price.align=='center'?1:2} style={{width:'80%',marginTop:10}} min={0} max={2} onChange={(event => setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, price:{...b.price,align:event.target.value==0?'flex-start':event.target.value==1?'center':'flex-end'}}) : b)))} />
                                                            <div onClick={()=>setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, price:{...b.price,showFont:!product.price.showFont}}) : b))} style={{width:'80%',border:'2px solid black',borderRadius:5,marginTop:10,position:'relative',display:'flex',alignItems:'center',flexDirection:'column'}} >
                                                                <p style={{fontFamily:''+product.price.font+'',fontWeight:'bolder',fontSize:15,margin:0,padding:6}} >{product.price.font}</p>
                                                                <div className="text" style={{overflow:'scroll',position:'absolute',alignSelf:'center',backgroundColor:'white',borderRadius:5,width:'100%',maxHeight:!product.price.showFont?0:200,border:!product.price.showFont?0:2+'px solid black',borderRadius:5,bottom:0}} >
                                                                    {
                                                                        fonts.map((font,i)=>{
                                                                            return(
                                                                                <p onClick={()=>setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, price:{...b.price,font:font}}) : b))} style={{fontFamily:''+font+'',fontSize:15,margin:0,padding:6}} >{font}</p>
                                                                            )
                                                                        })
                                                                    }
                                                                
                                                                </div>
                                                            </div>
                                                        </div>
                
                
                                                        <div style={{border:'2px solid black',width:'90%',display:'flex',alignItems:'center',flexDirection:'column',borderRadius:5,marginTop:10,paddingBottom:10,position:'relative'}} >
                                                            <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,marginTop:5}} >image</p>
                                                            <input value={product.image.size} type="number" onChange={(event => setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, image:{...b.image, size: parseInt(event.target.value)}}) : b)))} style={{border:'2px solid black',width:'50%',height:15,padding:5,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'white',borderRadius:5}} placeholder="type..." />
                                                            <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center'}} >
                                                                <input value={product.image.color} type="color" onChange={(event => setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, image:{...b.image,color:event.target.value}}) : b)))} style={{width:'20%',padding:0,backgroundColor:'white',border:'2px solid black',borderRadius:5,height:29,marginRight:6}} />
                                                                <input value={product.image.borderWidth} type="number" onChange={(event => setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, image:{...b.image, borderWidth:event.target.value}}) : b)))} style={{border:'2px solid black',width:'15%',height:15,padding:5,marginRight:6,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'white',borderRadius:5}} placeholder="type..." />
                                                                <input value={product.image.borderRadius} type="number" onChange={(event => setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, image:{...b.image, borderRadius: parseInt(event.target.value)}}) : b)))} style={{border:'2px solid black',width:'15%',height:15,padding:5,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'white',borderRadius:5}} placeholder="type..." />
                                                            </div>
                                                            <input type="range" value={product.image.align=='flex-start'?0:product.image.align=='center'?1:2} style={{width:'80%',marginTop:10}} min={0} max={2} onChange={(event => setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, image:{...b.image,align:event.target.value==0?'flex-start':event.target.value==1?'center':'flex-end'}}) : b)))} />
                                                        </div>
                
                                                        {!bannerDiv.show?<div style={{position:"absolute",zIndex:1,backgroundColor:'white',height:'100%',width:'100%',alignItems:'center',justifyContent:'center',textAlign:'center',display:'flex',top:0}} >
                                                                    <h5 style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15}}> {storeProducts[y].title}</h5>
                                                        </div>:null}
                                                        
                                                    </div>
                                                )
                                            })
                                        }
                                        {/* <button onClick={async()=>{setBannerDivs(bannerDivs=>[...bannerDivs,{id:bannerDivs.length,marginH:0,align:'center',show:true}]);await update();}} style={{border:'2px solid black',width:'90%',padding:5,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'white',borderRadius:5,marginTop:8}} >
                                            add product
                                        </button> */}
                                    </div>
                                </div>
                                )
                            }
                        }):editProductTab()
                    }

                    {pagen=="home"?<button onClick={()=>setNewB({...newB,show:true})} style={{border:'2px solid black',marginTop:10,width:'90%',padding:5,color:'black',fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'white',borderRadius:5}} >
                        add banner
                    </button>:null}
                    




                    
            </div>


            <div style={{position:'absolute',width:width-360,height:height,right:0,overflow:'scroll',overflowX:'hidden'}} >
            {/* <DefaultT width={width-460} MaxWidth={true} height={height} banners={Banners} bannerTexts={bannerTexts} bannerImgs={bannerImgs} bannerDivs={bannerDivs} bannerProducts={products} storeProducts={storeProducts}   /> */}
                
                {/* <DefaultT width={width-460} MaxWidth={true} height={height} banners={Banners} bannerTexts={bannerTexts} bannerImgs={bannerImgs} bannerDivs={bannerDivs} bannerProducts={products} storeProducts={storeProducts}   /> */}
                {pagen=="home"?<DefaultT width={width-460} MaxWidth={true} height={height} banners={Banners} bannerTexts={bannerTexts} bannerImgs={bannerImgs} bannerDivs={bannerDivs} bannerProducts={products} storeProducts={storeProducts}   />:<ProductT width={width-360} height={height} banners={[Banners[0]?Banners[0]:{}]} bannerTexts={bannerTexts} bannerImgs={bannerImgs} bannerDivs={bannerDivs} productStyle={productStyle} product={{colors:['#000000'],files:['../static/plu.png']}}  />}
                
                
                <div className="side" style={{position:'absolute',top:0,left:-4,width:side?200:0,display:'flex',justifyContent:'center',alignItems:'center',paddingTop:10,paddingBottom:10,flexDirection:'column',border:'2px solid black',borderTop:'0px',backgroundColor:'white',zIndex:3,overflow:'hidden'}} >
                    <button onClick={()=>save_store()} style={{border:'2px solid black',width:180,paddingLeft:0,paddingRight:15,padding:5,fontFamily:'monospace',fontWeight:'bolder',fontSize:15,backgroundColor:'white',borderRadius:5}} >
                        save
                    </button>
                    <div onClick={()=>setPage(!page)} style={{border:'2px solid black',width:180,borderRadius:5,marginTop:10,position:'relative',display:'flex',alignItems:'center',flexDirection:'column'}} >
                        <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,margin:0,padding:6}} >{pagen}</p>
                        <div className="text" style={{overflow:'scroll',position:'absolute',alignSelf:'center',backgroundColor:'white',borderRadius:5,width:'100%',maxHeight:!page?0:200,border:!page?0:2+'px solid black',borderRadius:5,bottom:0}} >
                            {
                                pages.map((pageName,i)=>{
                                    return(
                                        <p onClick={()=>{if(pageName=="home"){window.location.reload()}else{setPageN(pageName);setSide(!side)}}} style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:15,margin:0,padding:6}} >{pageName}</p>
                                    )
                                }).reverse()
                            }
                        
                        </div>
                    </div>
                </div>
            </div>
    </div>
        );
    }else{ 
        
        return(<p>redirecting...</p>)
    }
}





export default Admin;


