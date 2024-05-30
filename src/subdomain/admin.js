
import React,{useRef} from 'react';
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
    const [bannerButtons,setBannerButtons] = React.useState([])
    const [showSliders,setShowSliders] = React.useState([])
    const [bannerDivs,setBannerDivs] = React.useState([])
    const [Banners,setBanners] = React.useState([])
    const [newB,setNewB] = React.useState({name:'default',type:'empty',show:false})
    const [file, setFile] = React.useState({bannerImgId:'okok'});
    const [showSlider, setshowSlider] = React.useState({sliderID:'okok',files:[]});
    const [storeProducts,setStoreProducts] = React.useState([])
    const [products,setProducts] = React.useState([])
    const [productStyle,setProductStyle] = React.useState({backgroundColor:'#ffffff',foreground:'#000000',font:'ns',showfont:false})
    const [Height,setHeight] = React.useState(false)
    const [bannerInUse,setBannerInUse] = React.useState("ok")
    const [productsTopBanner,setProductsTopBanner] = React.useState({}) 
    const [addWidget,setAddWidget] = React.useState({active:false,sectionId:null})
    const [addSlider,setAddSlider] = React.useState({active:false,sectionId:null})
    const [addSection,setAddSection] = React.useState({active:false})
    const [page,setPage] = React.useState(false)// a dict did not work
    const [pagen,setPageN] = React.useState('home')

    const [draggedRow, setDraggedRow] = React.useState(null);
    // end
    const [side,setSide] = React.useState(false)

    const fonts = [
        "sans-serif",
        "serif",
        "mb",
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
    
    //keep for futur no doubt
    
        // const [products,setProducts] =  React.useState([{show:false,image:{url:"https://i.ebayimg.com/images/g/6rsAAOSw3iphuJTp/s-l1200.webp",size:200,align:'center',borderRadius:10,borderWidth:2,borderColor:'black'},title:{name:"Tie ping",color:"black",font:"al",size:22,},ok:"",price:{price:"110",color:"black",font:"ns",size:22}},{show:false,image:{url:"https://i.ebayimg.com/images/g/Do8AAOSwsR5kV3rA/s-l1600.jpg",size:200,borderRadius:10,borderWidth:2,borderColor:'black'},title:{name:"Casual t",color:"black",font:"al",size:22,},ok:"ie",price:{price:"260",color:"black",font:"ns",size:22}},{show:false,image:{url:"https://i.ebayimg.com/images/g/PzMAAOSwfkllOuXh/s-l1200.webp",size:200,borderRadius:10,borderWidth:2,borderColor:'black'},title:{name:"AP Royal",color:"black",font:"al",size:22,},ok:" Oak",price:{price:"21k",color:"black",font:"ns",size:22}},{show:false,image:{url:"https://i.ebayimg.com/images/g/xigAAOSwyXdk7-Z7/s-l1200.webp",size:200,borderRadius:10,borderWidth:2,borderColor:'black'},title:{name:"Lether s",color:"black",font:"al",size:22,},ok:"tripes",price:{price:"999",color:"black",font:"ns",size:22}},{show:false,image:{url:"https://i.pinimg.com/1200x/d5/9e/94/d59e949ac05b319d06588d696a996d74.jpg",size:200,borderRadius:10,borderWidth:2,borderColor:'black'},title:{name:"Pinky ri",color:"black",font:"al",size:22,},ok:"ng",price:{price:"590",color:"black",font:"ns",size:22}},{show:false,image:{url:"https://habituallychic.luxury/wp-content/uploads/2021/08/signet-rings-history-etiquette-habituallychic-005.jpeg",size:200,borderRadius:10,borderWidth:2,borderColor:'black'},title:{name:"Vintage ",color:"black",font:"al",size:22,},ok:"ring",price:{price:"860",color:"black",font:"ns",size:22}}])

        // const ref2 = React.useRef({clientHeight:[React.useRef({clientHeight:0}),React.useRef({clientHeight:0}),React.useRef({clientHeight:0}),React.useRef({clientHeight:0}),React.useRef({clientHeight:0}),React.useRef({clientHeight:0}),React.useRef({clientHeight:0})]})
        
        //// <input type="range"  style={{width:'80%',marginTop:10}} min={-((width-360)/2)} max={(width-360)/2} onChange={(event => {setBannerDivs(bannerDivs => [...bannerDivs].map(b => b.id === bannerDiv.id? ({...b, x:parseFloat(parseInt(event.target.value)*2/(width-360))}) : b));console.log("ratio:",parseFloat(parseInt(event.target.value)*2/(width-360)))})} />

    const refs = React.useRef([]);
    const widgetRefs = React.useRef({});

    function addRef(id) {
        refs.current.push({owner: id ,height:10})
      }

    function findIndexRef(id) {
       return refs.current.findIndex(ref=>ref.owner === id)
    }
    function findRef(id) {
        return refs.current.find(ref=>ref.owner === id)
     }

    


    const navigate = useNavigate();
    let width = window.innerWidth
    let balls = height*2

    let { jid,sid } = useParams()
    
    React.useEffect(()=>{
        if (refresh_counter == 0) {
            get_store()
        }
    },[])

    
    
    window.addEventListener('beforeunload', function (event) {
        const message = "Are you sure you want to leave? Your changes may not be saved.";
        
        event.preventDefault();
        event.returnValue = message;
        return message;
    });

    const get_store = async() =>{
        console.log("store requested")
        refresh_counter++
        const res = await axios.post(`http://${host}:4242/getstore`,{'w':1,'sid':sid})

        // console.log("res:",res.data)

        if (res.data != "505" && res.data != "no.") {
            for (let xdrtr = 0; xdrtr < res.data.store.banners.length; xdrtr++) {
                addRef(res.data.store.banners[xdrtr].id)
            }
            setBannerImgs(res.data.store.bannerImgs)
            setBannerTexts(res.data.store.bannerTexts)
            setBannerDivs(res.data.store.bannerDivs)
            setBannerButtons(res.data.store.bannerButtons?res.data.store.bannerButtons:[])
            setBanners(res.data.store.banners)
            setStoreProducts(res.data.products)

            
            // setProducts([])
            let bprds= res.data.store.bannerProducts
            //// // console.log('gg',bprds)
            let prds= res.data.products
            for (let xdrt = 0; xdrt < prds.length-res.data.store.bannerProducts.length; xdrt++) {
                bprds.push({show:false,id:bprds.length.length,image:{size:200,align:'center',borderRadius:10,borderWidth:2,borderColor:'black'},title:{color:"black",font:"al",size:22},ok:"",price:{color:"black",font:"ns",size:22}})
                // setProducts([...products,{show:false,id:products.length,image:{size:200,align:'center',borderRadius:10,borderWidth:2,borderColor:'black'},title:{color:"black",font:"al",size:22},ok:"",price:{color:"black",font:"ns",size:22}}])
            }
            setProducts(bprds)
            res.data.store.bannerDivs.forEach(item => {
                widgetRefs.current[item.id] = React.createRef();
              });
        }
    }

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

    function update(){
        //console.log("okk")
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

    async function rmss(id) {
        const newList = showSliders.filter((item) => item.id !== id);

        setShowSliders(newList);
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
        if (id == file.bannerImgId) {
            var formData = new FormData();
            formData.append('file', file);
            const response = await axios.post(`http://${host}:4242/upload`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            })
            //console.log('n:', response.data.message);
            setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === id ? ({...b, src:response.data.message}) : b))
        }
        
    }

    async function save_store(){
        if (pagen=="home") {
            var data = {'jid':jid,'sid':sid,'save':{'bannerTexts':bannerTexts,'bannerImgs':bannerImgs,'bannerDivs':bannerDivs,'bannerProducts':products,'banners':Banners,'bannerButtons':bannerButtons}}
            const res = await axios.post(`http://${host}:4242/savestore`,data)

            alert(res.data)
        }else{
            var data = {'jid':jid,'sid':sid,'save':productStyle}
            const res = await axios.post(`http://${host}:4242/saveproductview`,data)
            //console.log(res.data)
            alert('product view: '+res.data)
        }
        
    }


    function editProductTab(){
        return(
            <div style={{position:'relative',borderTop:'2px solid black'}}>
                <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:10,marginTop:10,position:'relative'}} >
                    <p style={{fontFamily:'mb',fontSize:17,marginLeft:20,marginTop:0,marginBottom:0}} >Top banner</p>
                    <div  style={{width:'33%',border:'2px solid black',borderRadius:5,position:'absolute',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',right:10,height:22}} >
                        <p onClick={()=>setProductStyle({...productStyle,showbanners:true})} style={{fontFamily:'mb',fontSize:15,margin:0,padding:0,cursor:'pointer'}} >{productStyle.topBanner?productStyle.topBanner.name:'none'}</p>
                        <div className="text" style={{overflow:'scroll',position:'absolute',alignSelf:'center',backgroundColor:backgroundColorAdmin,borderRadius:5,width:'100%',maxHeight:!productStyle.showbanners?0:200,borderBottom:!productStyle.showbanners?0:2+'px solid black',borderLeft:'2px solid black',borderRight:'2px solid black',borderRadius:5,top:0,zIndex:5}} >
                            {
                                Banners.map((bn,i)=>{
                                    return(
                                        <p onClick={()=>setProductStyle({...productStyle,topBanner:{id:bn.id,name:bn.name},showbanners:false})} style={{cursor:'pointer',fontFamily:'mb',fontSize:17,margin:0,padding:6}} >{bn.name}</p>
                                    )
                                })
                            }
                        
                        </div>
                    </div>                
                </div>
                <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:10,position:'relative',overflow:'hidden'}} >
                    <p style={{fontFamily:'mb',fontSize:17,marginLeft:20,marginTop:0,marginBottom:0}} >Background color</p>
                    <input  value={productStyle.backgroundColor} type="color" onChange={(event => setProductStyle({...productStyle,backgroundColor:event.target.value}))}  style={{width:'33%',padding:0,height:20,backgroundColor:backgroundColorAdmin,border:'2px solid #c9cbcd',borderRadius:5,position:'absolute',right:10}} />
                </div>
                <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:10,position:'relative',overflow:'hidden'}} >
                    <p style={{fontFamily:'mb',fontSize:17,marginLeft:20,marginTop:0,marginBottom:0}} >Foreground color</p>
                    <input  value={productStyle.foreground} type="color" onChange={(event => setProductStyle({...productStyle,foreground:event.target.value}))}  style={{width:'33%',padding:0,height:20,backgroundColor:backgroundColorAdmin,border:'2px solid #c9cbcd',borderRadius:5,position:'absolute',right:10}} />
                </div>
                
                <div  style={{width:'80%',border:'2px solid black',borderRadius:5,marginTop:10,position:'relative',display:'flex',alignItems:'center',flexDirection:'column',marginLeft:40}} >
                    <p onClick={()=>setProductStyle({...productStyle,showfont:true})} style={{fontFamily:''+productStyle.font+'',fontSize:17,margin:0,padding:6,cursor:'pointer'}} >{productStyle.font}</p>
                    <div className="text" style={{overflow:'scroll',position:'absolute',alignSelf:'center',backgroundColor:backgroundColorAdmin,borderRadius:5,width:'100%',maxHeight:!productStyle.showfont?0:200,border:!productStyle.showfont?0:2+'px solid black',borderRadius:5,bottom:0}} >
                        {
                            fonts.map((font,i)=>{
                                return(
                                    <p onClick={()=>setProductStyle({...productStyle,font:font,showfont:false})} style={{fontFamily:''+font+'',fontSize:17,margin:0,padding:6}} >{font}</p>
                                )
                            })
                        }
                    
                    </div>
                </div>
            </div>
        )
    }

    //// console.log(bannerImgs )

    //// console.log(ref.current.scrollHeight,' ',ref.current.clientHeight,' ',height)

    function getvalueTyp(value) {
        if (value != '') {
            if (value.slice(-1) == '%') {
                return value
            }
            return parseInt(value)
        }
        return value
    }

    function getvalueTypeFloat(value) {
        if (value) {
            if (value.slice(-1) == '%') {
                return value
            }
            return (parseFloat(parseInt(value)*2/(width-360)))
        }
        return value
    }
    function getvalueoffHorW(value,x) {
        if (value != '') {
            if (value.slice(-1) == '%') {
                return (parseInt(value)/100)*x
            }
            return parseInt(value)
        }
        return value
    }

    const backgroundColorAdmin = "white"
    const secondColor = "white"

    const onDragStart = (event, index) => {
        setDraggedRow(index);
        event.dataTransfer.effectAllowed = 'move';
      };
    
    const onDragOver = (event, index) => {
        event.preventDefault();
    
        if (index === draggedRow) return;

        const newRows = [...Banners];
        const draggedItem = newRows[draggedRow];
        newRows.splice(draggedRow, 1);
        newRows.splice(index, 0, draggedItem);
        setDraggedRow(index);
        setBanners(newRows);
    };

    const onDrop = (event) => {
        setDraggedRow(null);
    };

    const closeEverithing = () =>{
        setAddSection({active:false})
        setAddSlider({...addSlider,active:false})
        setAddWidget({...addWidget,active:false})
    }

    const scrollToId = (id) => {
        const element = widgetRefs.current[id];
        if (element && element.current) {
          element.current.scrollIntoView({ behavior: 'smooth' });
        }
      };

    const handleSelection = async(widget) =>{
        const thisdiv = bannerDivs.find(obj => obj.id === widget.parent_id)
        //console.log('::',thisdiv)
        setBanners(Banners => [...Banners].map(b => b.id === thisdiv.parent ? ({...b, editable:true,show:true}) : ({...b, show:false})))
        setBannerDivs(bannerDivs=> [...bannerDivs].map(b => b.id === widget.parent_id ? ({...b, show:true}) : ({...b, show:false})))
        update();
        scrollToId(widget.parent_id)
    }

    function rmshowSliderImg(id) {
        const tempfiles = Array.from(showSlider.files)
        console.log(tempfiles)
        const newList = tempfiles.filter((item) => item.lastModified !== id);
    
        setshowSlider({...showSlider, files:newList})
        // await update();
      }

      const uploadSlides = (id) =>{
          for (let xxd = 0; xxd < showSlider.files.length; xxd++) {
            upload_slides(id,showSlider.files[xxd])
          }
      }

      async function upload_slides(id,f){
        if (id == showSlider.sliderID) {
            var formData = new FormData();
            formData.append('file', f);
            const response = await axios.post(`http://${host}:4242/upload`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            })
            //console.log('n:', response.data.message);
            let tempfiles = showSliders.files?showSliders.files:[]
            tempfiles.push(response.data.message)
            setShowSliders(showSliders => [...showSliders].map(b => b.id === id ? ({...b, files:tempfiles}) : b))
        }
        
    }

    if(jid){
        return (
        <div >
            <div className="webview" style={{position:'absolute',boxSizing:'border-box',height:height,width:360,backgroundColor:backgroundColorAdmin,left:0,alignItems:'center',justifyContent:'center',textAlign:'center',flexDirection:'column',borderRight:'2px solid black',zIndex:15,overflowX:'hidden',overflowY:'scroll'}} >
                    
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',width:'100%',height:63,position:'relative'}} >
                        <img onClick={()=>{window.location.assign('/dashboard/'+jid+'/sid/'+sid)}} src={'/static/bunker_cont.png'} alt="" style={{cursor:'pointer',height:55,width:100,position:'absolute',left:10,top:0}}  />
                        {/* <h1 style={{fontFamily:'mb',fontSize:18}} > {pagen=="home"?"Template":"Product display"}</h1> */}
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',position:'absolute',right:10}} >
                            <img src={'/static/profile.png'} alt="" style={{cursor:'pointer',height:25,width:25,marginRight:12}}  />
                            <img onClick={()=>{closeEverithing();setAddSection({active:!addSection.active})}} src={'/static/settings.png'} alt="" style={{cursor:'pointer',height:25,width:25}}  />
                        </div>
                        
                    </div>
                    {/* <h1 onClick={()=>setSide(!side)} style={{position:'absolute',fontFamily:'ns',fontSize:22,top:0,right:10,cursor:"pointer"}} >+</h1> */}
                    
                    

                    {newB.show?<div className="bannerEdit" style={{position:'absolute',zIndex:3,backgroundColor:backgroundColorAdmin,marginLeft:0,overflow:'scroll',width:'100%',alignItems:'center',justifyContent:'center',alignSelf:'center',display:'flex',flexDirection:'column',borderRadius:5,borderBottom:'2px solid black',borderTop:'2px solid black',paddingBottom:10,paddingTop:10,marginTop:15}} >
                        <input value={newB.name} onChange={(event => setNewB({...newB, name:event.target.value}))} style={{border:'2px solid black',width:'80%',height:15,padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5}} placeholder="name..." />
                        <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginLeft:70}} >
                            <p style={{fontFamily:'mb',fontSize:17,marginTop:4,marginBottom:4,marginRight:10}} >empty</p>
                            <input type="checkbox" checked={newB.type == 'empty'} onClick={()=>setNewB({...newB, type:'empty'})} />
                        </div>
                        <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginLeft:70}} >
                            <p style={{fontFamily:'mb',fontSize:17,marginTop:4,marginBottom:4,marginRight:10}} >retractable</p>
                            <input type="checkbox" checked={newB.type == 'retractable'} onClick={()=>setNewB({...newB, type:'retractable'})} />
                        </div>
                        <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginLeft:70}} >
                            <p style={{fontFamily:'mb',fontSize:17,marginTop:4,marginBottom:4,marginRight:10}} >products</p>
                            <input type="checkbox" checked={newB.type == 'products'} onClick={()=>setNewB({...newB, type:'products'})} />
                        </div>
                        <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginLeft:70}} >
                            <p style={{fontFamily:'mb',fontSize:17,marginTop:4,marginBottom:4,marginRight:10}} >banner</p>
                            <input type="checkbox" checked={newB.type == 'banner'} onClick={()=>setNewB({...newB, type:'banner'})} />
                        </div>

                        <button onClick={async()=>{setNewB({...newB,show:false});let rid=getId();addRef(rid);setBanners(Banners=>[...Banners,{id:rid,editable:true,sticky:false,marginX:0,marginY:0,rows:3,editAll:false,type:newB.type,name:newB.name,show:true,backgroundColor:backgroundColorAdmin,FullHeight:true,FullmHeight:false,size:height-100,image:{align:'flex-end',fullHeight:true,size:height-100}}]);await update();}} style={{border:'2px solid black',width:'80%',padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5}} >
                            add
                        </button>
                    </div>:null}




                    {
                        pagen=="home"?Banners.map((bn,yy)=>{
                        if (bn.type != "products") {
                            if (bn.editable) {
                            return (
                                <div key={yy} className="bannerEdit" style={{position:'relative',marginLeft:0,height:bn.show && findRef(bn.id)?findRef(bn.id).height+40:10,overflow:bn.show && findRef(bn.id)?'scroll':'hidden',backgroundColor:backgroundColorAdmin,width:'100%',alignItems:'center',justifyContent:'center',alignSelf:'center',display:'flex',flexDirection:'column',borderRadius:0,borderTop:'2px solid black',paddingBottom:10,paddingTop:10,overflowX:'hidden'}} >
                                <button onClick={()=>{setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, show:!bn.show}) : b));setBannerInUse(bn.id)}} style={{cursor:'pointer',position:'absolute',top:2,border:0,width:'90%',textAlign:'start',padding:5,marginLeft:10,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:'rgba(0,0,0,0)',borderRadius:5}} >
                                   {bn.editName?<input onChange={(event=>{setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, name:event.target.value}) : b))})} style={{color:'black',fontFamily:'mb',fontSize:17,backgroundColor:'rgba(0,0,0,0)',border:0,cursor:'pointer'}} value={bn.name} />:bn.name}
                                </button>
                                {/* <div style={{position:'absolute',right:5,display:'flex',flexDirection:'row',top:6}} >
                                    <button onClick={()=>{mvup(bn.id)}} style={{border:0,padding:0,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:'rgba(0,0,0,0)',cursor:'pointer'}} >
                                        <img src={arrow} style={{height:20,width:20}}  />
                                    </button>
                                    <button onClick={()=>{mvdwn(yy+1)}} style={{border:0,padding:0,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:'rgba(0,0,0,0)',cursor:'pointer'}} >
                                        <img src={arrow} style={{height:20,width:20,transform:'rotate(180deg)'}}  />
                                    </button>
                                </div> */}
                                <button onClick={()=>{setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, editable:false}) : b))}} style={{position:'absolute',top:6,left:5,fontFamily:'ns',fontSize:17,color:'red',padding:0,borderRadius:20,backgroundColor:backgroundColorAdmin,zIndex:2,border:0,cursor:'pointer'}} >X</button>


                                
            
                                <div ref={r=>{if(r && findIndexRef(bn.id) != -1){refs.current[findIndexRef(bn.id)].height = r.clientHeight}}} style={{position:'absolute',top:50,width:'100%',alignItems:'center',justifyContent:'center',alignSelf:'center',display:'flex',flexDirection:'column'}} >
                                
                                
                                <p onClick={async()=>{setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, showHeight:!bn.showHeight}) : b));await update()}} style={{cursor:'pointer',marginBottom:10,marginTop:0,fontFamily:'mb',fontSize:17,alignSelf:'flex-start',marginLeft:20}} >Height {bn.showHeight?'▼':'►'}</p>
                                
                                {bn.showHeight?<div style={{width:'100%'}} >
                                    {!bn.FullHeight && !bn.FullmHeight && !bn.HequalW?
                                    <div style={{width:'100%',marginTop:7,display:'flex',flexDirection:'row',justifyContent:'start',alignItems:'center',position:'relative',marginBottom:9}} >
                                        <p style={{cursor:'pointer',marginBottom:0,marginTop:0,fontFamily:'mb',color:'rgba(0,0,0,0.8)',fontSize:16,marginLeft:35}} >Height</p>
                                        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',position:'absolute',right:10,width:'40%',height:15}} >
                                            <input value={bn.size} type="number" onChange={(event => setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, size:parseInt(event.target.value)}) : b)))} style={{border:'2px solid #c9cbcd',width:'100%',height:'100%',padding:5,color:'rgba(0,0,0,0.9)',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5}} placeholder="type..." />
                                        </div>
                                        
                                    </div>
                                    :null}

                                    <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                        <p style={{fontFamily:'mb',fontSize:16,marginLeft:35,color:'rgba(0,0,0,0.8)',marginBottom:0,marginTop:0}} >Full screen</p>
                                        <div class="checkbox-wrapper-2" style={{position:'absolute',right:10,cursor:'pointer'}} >
                                            <input type="checkbox" checked={bn.FullHeight} class="sc-gJwTLC ikxBAC" onClick={async()=>{setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, FullHeight:!bn.FullHeight,size:height-100}) : b));await update()}} />
                                        </div>
                                        {/* <input type="checkbox" checked={bn.FullHeight} class="sc-gJwTLC ikxBAC" onClick={async()=>{setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, FullHeight:!bn.FullHeight,size:height-100}) : b));await update()}} /> */}
                                    </div>
                                    <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                        <h3 style={{fontFamily:'mb',fontSize:16,marginLeft:35,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >Sticky</h3>
                                        <div class="checkbox-wrapper-2" style={{position:'absolute',right:10,cursor:'pointer'}} >
                                            <input type="checkbox" class="sc-gJwTLC ikxBAC" checked={bn.sticky} onClick={async()=>{setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, sticky:!bn.sticky}) : b));await update()}} />
                                        </div>
                                    </div>
                                    <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                        <p style={{fontFamily:'mb',fontSize:16,marginLeft:35,color:'rgba(0,0,0,0.8)',marginBottom:0,marginTop:0}} >Subtract previous</p>
                                        <div class="checkbox-wrapper-2" style={{position:'absolute',right:10,cursor:'pointer'}} >
                                            <input type="checkbox" class="sc-gJwTLC ikxBAC" checked={bn.FullmHeight} onClick={async()=>{setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, FullmHeight:!bn.FullmHeight}) : b));await update()}} />
                                        </div>
                                    </div>
                                    <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:13,position:'relative'}} >
                                        <h3 style={{fontFamily:'mb',fontSize:16,marginLeft:35,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >Screen precentage</h3>
                                        
                                        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',position:'absolute',right:10,width:'40%'}} >
                                            <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',border:'2px solid #c9cbcd',borderRadius:5,width:'100%',marginRight:5}} >
                                                <input value={bn.HequalWR} type="number" onChange={(event => setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, HequalWR:parseFloat(event.target.value),HequalW:event.target.value!=''}) : b)))} style={{border:0,width:'100%',height:15,padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin}} placeholder="69" />
                                                <h3 style={{fontFamily:'mb',fontSize:16,marginRight:5,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >%</h3>
                                            </div>
                                            <div class="checkbox-wrapper-2" style={{cursor:'pointer'}} >
                                                <input type="checkbox" class="sc-gJwTLC ikxBAC" checked={bn.HequalW} onClick={async()=>{setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, HequalW:!bn.HequalW}) : b));await update()}} />
                                            </div>
                                        </div>
                                    </div>
                                </div>:null}
                                
                                <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:10,position:'relative',overflow:'hidden'}} >
                                    <p style={{fontFamily:'mb',fontSize:17,marginLeft:20,marginTop:0,marginBottom:0}} >Background color</p>
                                    <input value={bn.backgroundColor} type="color" onChange={(event => setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, backgroundColor:event.target.value}) : b)))} style={{width:'33%',padding:0,height:20,backgroundColor:backgroundColorAdmin,border:'2px solid #c9cbcd',borderRadius:5,position:'absolute',right:10}} />
                                </div>
                          
                                    
                                    {
                                        bannerDivs.map((bannerDiv,y)=>{
                                            if (bannerDiv.parent == bn.id) {
                                                return(
                                                    <div key={y} className="bannerdiv" style={{backgroundColor:secondColor,position:'relative',maxHeight:bannerDiv.show?5000:0,overflow:'hidden',width:'90%',alignItems:'center',marginBottom:8,justifyContent:'center',alignSelf:'center',display:'flex',flexDirection:'column',borderRadius:5,borderBottom:'3px solid black',borderTop:'3px solid black',borderLeft:'1px solid black',borderRight:'1px solid black',paddingBottom:10,paddingTop:25}} >
                                                        <button onClick={()=>rmbd(bannerDiv.id)} style={{cursor:'pointer',position:'absolute',fontFamily:'ns',fontSize:17,color:'red',top:5,left:10,padding:0,borderRadius:20,backgroundColor:'rgba(0,0,0,0)',zIndex:2,border:0}} >X</button>
                                                        <button onClick={async()=>{setBannerDivs(bannerDivs=> [...bannerDivs].map(b => b.id === bannerDiv.id ? ({...b, show:!bannerDiv.show}) : b));await update();}} style={{cursor:'pointer',position:'absolute',fontFamily:'ns',zIndex:2,fontSize:17,color:'black',top:5,left:30,padding:0,borderRadius:20,border:0,backgroundColor:'rgba(0,0,0,0)'}} >{!bannerDiv.show?'[]':'─'}</button>
                                                        
                                                        <button onClick={async()=>{closeEverithing();setAddWidget({active:true,sectionId:bannerDiv.id});await update()}} style={{cursor:'pointer',border:'2px solid black',width:'90%',marginTop:10,padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5}} >
                                                            Add widget
                                                        </button>
                                                        {
                                                            bannerTexts.map((bannerText,i)=>{
                                                                if (bannerText.parent_id == bannerDiv.id) {
                                                                    return(
                                                                        <div key={i} style={{border:'2px solid black',width:'90%',display:'flex',alignItems:'center',flexDirection:'column',borderRadius:5,marginTop:10,paddingBottom:10,position:'relative'}} >
                                                                            <button onClick={()=>rmbt(bannerText.id)} style={{cursor:'pointer',position:'absolute',fontFamily:'ns',fontSize:17,color:'red',top:5,left:10,padding:0,borderRadius:20,backgroundColor:backgroundColorAdmin,border:0}} >X</button>
                                                                            <p style={{fontFamily:'mb',fontSize:17,marginTop:5,marginBottom:15}} >Textbox {bannerText.id}</p>
                                                                            <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:12,position:'relative'}} >
                                                                                <p style={{fontFamily:'mb',fontSize:16,marginLeft:20,color:'black',marginBottom:0,marginTop:0}} >Text</p>
                                                                                <input value={bannerText.text} onChange={(event => setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, text:event.target.value}) : b)))} style={{position:'absolute',right:10,height:15,border:'2px solid #c9cbcd',width:'66%',padding:5,color:'rgba(0,0,0,0.9)',fontFamily:'mb',fontSize:16,backgroundColor:backgroundColorAdmin,borderRadius:5}} placeholder="type..." />
                                                                            </div>

                                                                            <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                                                                <p style={{fontFamily:'mb',fontSize:16,marginLeft:20,color:'black',marginBottom:0,marginTop:0}} >Color</p>
                                                                                <input value={bannerText.color} type="color" onChange={(event => setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, color:event.target.value}) : b)))} style={{position:'absolute',right:10,height:20,border:'2px solid #c9cbcd',width:'33%',padding:0,backgroundColor:backgroundColorAdmin,borderRadius:5}} />
                                                                            </div>

                                                                            <p onClick={async()=>{setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, showFont:!bannerText.showFont}) : b));await update()}} style={{cursor:'pointer',marginBottom:10,marginTop:0,fontFamily:'mb',fontSize:15,alignSelf:'flex-start',marginLeft:20}} >Font {bannerText.showFont?'▼':'►'}</p>

                                                                            {bannerText.showFont?<div style={{width:'100%',position:'relative'}} >
                                                                                <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                                                                    <h3 style={{fontFamily:'mb',fontSize:16,marginLeft:35,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >Font size</h3>
                                                                                    <input value={bannerText.size} type="number" onChange={(event => setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, size:parseInt(event.target.value)}) : b)))} style={{position:'absolute',right:10,border:'2px solid #c9cbcd',width:'30%',height:15,padding:5,color:'rgba(0,0,0,0.9)',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5}} placeholder="type..." />

                                                                                </div>

                                                                                <div onClick={()=>setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, showfont:!bannerText.showfont}) : b))} style={{width:243,marginLeft:35,marginBottom:9,border:'2px solid #c9cbcd',borderRadius:5,marginTop:9,position:'relative',display:'flex',alignItems:'center',flexDirection:'column'}} >
                                                                                    <p style={{fontFamily:''+bannerText.font+'',fontSize:15,margin:0,padding:3}} >{bannerText.font}</p>
                                                                                    <div className="text" style={{overflow:'scroll',position:'absolute',alignSelf:'center',backgroundColor:backgroundColorAdmin,borderRadius:5,width:'100%',maxHeight:!bannerText.showfont?0:200,border:!bannerText.showfont?0:2+'px solid #c9cbcd',borderRadius:5,bottom:0}} >
                                                                                        {
                                                                                            fonts.map((font,i)=>{
                                                                                                return(
                                                                                                    <p onClick={()=>setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, font:font}) : b))} style={{fontFamily:''+font+'',fontSize:15,margin:0,padding:6}} >{font}</p>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    
                                                                                    </div>
                                                                                </div>
                                                                                


                                                                            </div>:null}

                                                                            <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                                                                <p style={{fontFamily:'mb',fontSize:16,marginLeft:20,color:'black',marginBottom:0,marginTop:0}} >Alignement</p>
                                                                                <div style={{width:'33%',height:16,borderRadius:18,backgroundColor:'#c9cbcd',opacity:0.7,position:'absolute',right:10,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',padding:2}} >
                                                                                    <input type="range" className='slider' value={bannerText.align=='flex-start'?0:bannerText.align=='center'?1:2} style={{width:'100%'}} min={0} max={2} onChange={(event => setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, align:event.target.value==0?'flex-start':event.target.value==1?'center':'flex-end'}) : b)))} />
                                                                                </div>
                                                                            </div>


                                                                            <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                                                                <p style={{fontFamily:'mb',fontSize:16,marginLeft:20,color:'black',marginBottom:0,marginTop:0}} >Jump line</p>
                                                                                <div class="checkbox-wrapper-2" style={{position:'absolute',right:10,cursor:'pointer'}} >
                                                                                    <input type="checkbox" class="sc-gJwTLC ikxBAC" checked={bannerText.jline} onChange={(event => setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, jline:!bannerText.jline}) : b)))} />
                                                                                </div>
                                                                            </div>

                                                                            <p onClick={async()=>{setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, showMargin:!bannerText.showMargin}) : b));await update()}} style={{cursor:'pointer',marginBottom:10,marginTop:0,fontFamily:'mb',fontSize:15,alignSelf:'flex-start',marginLeft:20}} >Margin {bannerText.showMargin?'▼':'►'}</p>
                                                                            
                                                                            {bannerText.showMargin?<div style={{width:'100%',position:'relative'}} >
                                                                                <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:12,position:'relative'}} >
                                                                                    <h3 style={{fontFamily:'mb',fontSize:16,marginLeft:35,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >Margin horizontal</h3>
                                                                                    <input value={bannerText.marginH} type="number" onChange={(event => setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, marginH:parseInt(event.target.value)}) : b)))} placeholder="0" style={{position:'absolute',right:10,border:'2px solid #c9cbcd',width:'30%',height:15,padding:5,color:'rgba(0,0,0,0.9)',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5}}/>
                                                                                </div>
                                                                                <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                                                                    <h3 style={{fontFamily:'mb',fontSize:16,marginLeft:35,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >Margin vertical</h3>
                                                                                    <input value={bannerText.marginV} type="number" onChange={(event => setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, marginV:parseInt(event.target.value)}) : b)))} placeholder="0" style={{position:'absolute',right:10,border:'2px solid #c9cbcd',width:'30%',height:15,padding:5,color:'rgba(0,0,0,0.9)',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5}}/>
                                                                                </div>

                                                                            </div>:null}

                                                                            {/* <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:12,position:'relative'}} >
                                                                                <p style={{fontFamily:'mb',fontSize:16,marginLeft:20,color:'black',marginBottom:0,marginTop:0}} >Margin horizontal</p>
                                                                                <input value={bannerText.marginH} type="number" onChange={(event => setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, marginH:parseInt(event.target.value)}) : b)))} placeholder="0" style={{border:'2px solid #c9cbcd',position:'absolute',right:10,width:'30%',height:15,padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5}}  />
                                                                            </div>

                                                                            <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                                                                <p style={{fontFamily:'mb',fontSize:16,marginLeft:20,color:'black',marginBottom:0,marginTop:0}} >Margin vertical</p>
                                                                                <input value={bannerText.marginV} type="number" onChange={(event => setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, marginV:parseInt(event.target.value)}) : b)))} placeholder="0" style={{border:'2px solid #c9cbcd',position:'absolute',right:10,width:'30%',height:15,padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5}}  />
                                                                            </div> */}

                                                                            {bannerText.jline?<div style={{display:'flex',flexDirection:'row',alignSelf:'center',justifyContent:'center',alignItems:'center'}} >
                                                                                    <img onClick={()=>{setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, textAlign:'left'}) : b))}} src={'/static/textLeft.png'} style={{opacity:0.8,height:20,width:20,margin:9,cursor:'pointer',borderBottom:bannerText.textAlign?bannerText.textAlign=='left'?'2px solid black':0:0,borderRadius:5,paddingBottom:5}}  />
                                                                                    <img onClick={()=>{setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, textAlign:'center'}) : b))}} src={'/static/textMid.png'} style={{opacity:0.8,height:20,width:20,margin:9,cursor:'pointer',borderBottom:bannerText.textAlign?bannerText.textAlign=='center'?'2px solid black':0:0,borderRadius:5,paddingBottom:5}}  />
                                                                                    <img onClick={()=>{setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, textAlign:'right'}) : b))}} src={'/static/textRight.png'} style={{opacity:0.8,height:20,width:20,margin:9,cursor:'pointer',borderBottom:bannerText.textAlign?bannerText.textAlign=='right'?'2px solid black':0:0,borderRadius:5,paddingBottom:5}}  />
                                                                            </div>:null}

                                                                            

                                                                            <div style={{width:'90%',border:'2px solid rgba(0,0,0,0.5)',borderRadius:5,marginTop:0,position:'relative',display:'flex',alignItems:'center',flexDirection:'column'}} >
                                                                                <p onClick={()=>{setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, showActions:!bannerText.showActions}) : b))}} style={{cursor:'pointer',fontFamily:'mb',fontSize:17,margin:0,padding:6,color:'rgba(0,0,0,0.7)'}} >{bannerText.action?bannerText.action=='products'?'product ↪':'action ↪':'action ↪'} {bannerText.action?bannerText.action=='products'?bannerText.productLink?bannerText.productLink.title:'none':bannerText.action:"none"}</p>
                                                                                <div className="text" style={{overflow:'scroll',position:'absolute',alignSelf:'center',backgroundColor:backgroundColorAdmin,borderRadius:5,width:'100%',maxHeight:!bannerText.showActions?0:200,border:!bannerText.showActions?0:2+'px solid black',borderRadius:5,bottom:0}} >
                                                                                    {
                                                                                        actions.map((action,i)=>{
                                                                                            return(
                                                                                                <p onClick={()=>{setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, showActions:!bannerText.showActions,action:action!="none"?action:null,showProducts:action=="products"}) : b))}} style={{fontFamily:'mb',fontSize:17,margin:0,padding:6,cursor:'pointer'}} >{action}</p>
                                                                                            )
                                                                                        }).reverse()
                                                                                    }
                                                                                
                                                                                </div>
                                                                                <div className="text" style={{overflow:'scroll',position:'absolute',alignSelf:'center',backgroundColor:backgroundColorAdmin,borderRadius:5,width:'100%',maxHeight:!bannerText.showProducts?0:200,border:!bannerText.showProducts?0:2+'px solid black',borderRadius:5,bottom:0}} >
                                                                                    {
                                                                                        storeProducts.map((storeP,i)=>{
                                                                                            return(
                                                                                                <p onClick={()=>{setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, showProducts:!bannerText.showProducts,productLink:{'pid':storeP.pid,'title':storeP.title}}) : b))}} style={{fontFamily:'mb',fontSize:17,margin:0,padding:6,cursor:'pointer'}} >{storeP.title}</p>
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
                                                        {
                                                            bannerImgs.map((bannerImg,i)=>{
                                                                if (bannerImg.parent_id == bannerDiv.id) {
                                                                    return(
                                                                        <div key={i+bannerTexts.length} style={{border:'2px solid black',width:'90%',display:'flex',alignItems:'center',flexDirection:'column',borderRadius:5,marginTop:10,paddingBottom:10,position:'relative'}} >
                                                                            <button onClick={()=>rmbi(bannerImg.id)} style={{cursor:'pointer',position:'absolute',fontFamily:'ns',fontSize:17,color:'red',top:5,left:10,padding:0,borderRadius:20,backgroundColor:backgroundColorAdmin,border:0}} >X</button>
                                                                            <p style={{fontFamily:'mb',fontSize:17,marginTop:5}} >Image {bannerImg.id}</p>
                                                                            {bannerImg.src != ''?<div style={{width:'33%',height:100,marginBottom:9,borderRadius:5,overflow:'hidden'}} >
                                                                                <img src={'/uploads/'+bannerImg.src} style={{height:'100%',width:'100%',objectFit:'contain'}} />
                                                                            </div>:null}
                                                                            <div style={{width:'90%',height:100,alignSelf:'center',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:5,border:'2px dashed #c9cbcd',overflow:'hidden'}} >
                                                                                <h1 style={{position:'absolute',margin:0,fontFamily:'mb',fontSize:15,color:'rgba(0,0,0,0.8)',marginBottom:0,zIndex:0}} >{file.bannerImgId == bannerImg.id?file.name:'drag and drop file'}</h1>
                                                                                <input style={{width:'100%',padding:100,opacity:0,cursor:'pointer'}} onChange={(event)=>{event.target.files[0].bannerImgId = bannerImg.id;setFile(event.target.files[0])}} type="file" id="file" name="file"/>
                                                                            </div>
                                                                            <button onClick={()=>{upload_image(bannerImg.id)}} disabled={file.bannerImgId != bannerImg.id} style={{cursor:file.bannerImgId != bannerImg.id?'default':'pointer',border:'2px solid black',width:'33%',padding:5,color:'black',marginBottom:9,opacity:file.bannerImgId != bannerImg.id?0.5:0.8,fontFamily:'mb',fontSize:14,backgroundColor:backgroundColorAdmin,marginTop:10,borderRadius:5}} >
                                                                                upload
                                                                            </button>
                                                                            
                                                                            <p onClick={async()=>{setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, showHeight:!bannerImg.showHeight}) : b));await update()}} style={{cursor:'pointer',marginBottom:10,marginTop:0,fontFamily:'mb',fontSize:15,alignSelf:'flex-start',marginLeft:20}} >Height {bannerImg.showHeight?'▼':'►'}</p>
                                                                            
                                                                            {bannerImg.showHeight?<div style={{width:'100%',position:'relative'}} >
                                                                                <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                                                                    <h3 style={{fontFamily:'mb',fontSize:16,marginLeft:35,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >Usable</h3>
                                                                                    <div class="checkbox-wrapper-2" style={{position:'absolute',right:10,cursor:'pointer'}} >
                                                                                        <input type="checkbox" class="sc-gJwTLC ikxBAC" checked={!bannerImg.cheight} onClick={()=>setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, cheight:!bannerImg.cheight}) : b))} />
                                                                                    </div>
                                                                                </div>

                                                                                <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:13,position:'relative'}} >
                                                                                    <h3 style={{fontFamily:'mb',fontSize:16,marginLeft:35,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >Height</h3>
                                                                                    
                                                                                    <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',position:'absolute',right:10,width:'40%'}} >
                                                                                        <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',border:'2px solid #c9cbcd',borderRadius:5,width:'100%',marginRight:5}} >
                                                                                            <input value={bannerImg.height} type="number" onChange={(event => setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, height:event.target.value}) : b)))} style={{border:0,width:'100%',height:15,padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin}} placeholder="69" />
                                                                                            <h3 style={{fontFamily:'mb',fontSize:16,marginRight:5,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >{bannerImg.heightpx?'px':'%'}</h3>
                                                                                        </div>
                                                                                        <div class="checkbox-wrapper-2" style={{cursor:'pointer'}} >
                                                                                            <input type="checkbox" class="sc-gJwTLC ikxBAC" checked={bannerImg.heightpx} onClick={()=>setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, heightpx:!bannerImg.heightpx}) : b))} />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>


                                                                            </div>:null}

                                                                            <p onClick={async()=>{setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, showWidth:!bannerImg.showWidth}) : b));await update()}} style={{cursor:'pointer',marginBottom:10,marginTop:0,fontFamily:'mb',fontSize:15,alignSelf:'flex-start',marginLeft:20}} >Width {bannerImg.showWidth?'▼':'►'}</p>
                                                                            
                                                                            {bannerImg.showWidth?<div style={{width:'100%',position:'relative'}} >
                                                                                <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                                                                    <h3 style={{fontFamily:'mb',fontSize:16,marginLeft:35,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >Usable</h3>
                                                                                    <div class="checkbox-wrapper-2" style={{position:'absolute',right:10,cursor:'pointer'}} >
                                                                                        <input type="checkbox" class="sc-gJwTLC ikxBAC" checked={!bannerImg.cwidth} onClick={()=>setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, cwidth:!bannerImg.cwidth}) : b))} />
                                                                                    </div>
                                                                                </div>

                                                                                <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:13,position:'relative'}} >
                                                                                    <h3 style={{fontFamily:'mb',fontSize:16,marginLeft:35,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >Width</h3>
                                                                                    
                                                                                    <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',position:'absolute',right:10,width:'40%'}} >
                                                                                        <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',border:'2px solid #c9cbcd',borderRadius:5,width:'100%',marginRight:5}} >
                                                                                            <input value={bannerImg.width} type="number" onChange={(event => setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, width:event.target.value}) : b)))} style={{border:0,width:'100%',height:15,padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin}} placeholder="69" />
                                                                                            <h3 style={{fontFamily:'mb',fontSize:16,marginRight:5,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >{bannerImg.widthpx?'px':'%'}</h3>
                                                                                        </div>
                                                                                        <div class="checkbox-wrapper-2" style={{cursor:'pointer'}} >
                                                                                            <input type="checkbox" class="sc-gJwTLC ikxBAC" checked={bannerImg.widthpx} onClick={()=>setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, widthpx:!bannerImg.widthpx}) : b))} />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>


                                                                            </div>:null}

                                                                            {/* <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center'}} >
                                                                                <input value={bannerImg.height} onChange={(event => setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, height:getvalueTyp(event.target.value)}) : b)))} style={{border:'2px solid black',width:'33%',height:15,padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5,marginRight:10}} placeholder="type..." />
                                                                                <input value={bannerImg.width} onChange={(event => setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, width:getvalueTyp(event.target.value)}) : b)))} style={{border:'2px solid black',width:'33%',height:15,padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5}} placeholder="type..." />
                                                                            </div>
                                                                            <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center'}} >
                                                                                <input type="checkbox" checked={bannerImg.cheight} style={{marginRight:80}} onClick={()=>setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, cheight:!bannerImg.cheight}) : b))} />
                                                                                <input type="checkbox" checked={bannerImg.cwidth} onClick={()=>setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, cwidth:!bannerImg.cwidth}) : b))} />
                                                                            </div> */}
                                                                            <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                                                                <p style={{fontFamily:'mb',fontSize:16,marginLeft:20,color:'black',marginBottom:0,marginTop:0}} >Full height</p>
                                                                                <div class="checkbox-wrapper-2" style={{position:'absolute',right:10,cursor:'pointer'}} >
                                                                                    <input type="checkbox" class="sc-gJwTLC ikxBAC" checked={bannerImg.fullh} onClick={()=>setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, fullh:!bannerImg.fullh,cwidth:!bannerImg.fullh}) : b))} />
                                                                                </div>
                                                                            </div>
                                                                            <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                                                                <p style={{fontFamily:'mb',fontSize:16,marginLeft:20,color:'black',marginBottom:0,marginTop:0}} >Full width</p>
                                                                                <div class="checkbox-wrapper-2" style={{position:'absolute',right:10,cursor:'pointer'}} >
                                                                                    <input type="checkbox" class="sc-gJwTLC ikxBAC" checked={bannerImg.fullw} onClick={()=>setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, fullw:!bannerImg.fullw,cheight:!bannerImg.fullw}) : b))} />
                                                                                </div>
                                                                            </div>


                                                                            <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                                                                <p style={{fontFamily:'mb',fontSize:16,marginLeft:20,color:'black',marginBottom:0,marginTop:0}} >Alignement</p>
                                                                                <div style={{width:'33%',height:16,borderRadius:18,backgroundColor:'#c9cbcd',opacity:0.7,position:'absolute',right:10,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',padding:2}} >
                                                                                    <input type="range" className='slider' value={bannerImg.align=='flex-start'?0:bannerImg.align=='center'?1:2} style={{width:'100%'}} min={0} max={2} onChange={(event => setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, align:event.target.value==0?'flex-start':event.target.value==1?'center':'flex-end'}) : b)))} />
                                                                                </div>
                                                                            </div>

                                                                            <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                                                                <p style={{fontFamily:'mb',fontSize:16,marginLeft:20,color:'black',marginBottom:0,marginTop:0}} >Margin</p>
                                                                                <input value={bannerImg.margin} type="number" onChange={(event => setBannerImgs(bannerImgs=> [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, margin:parseInt(event.target.value)}) : b)))} placeholder="0" style={{border:'2px solid #c9cbcd',position:'absolute',right:10,width:'30%',height:15,padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5}}  />
                                                                            </div>

                                                                            
                                                                            
                                                                            
                                                                            
                                                                            <div style={{width:'90%',border:'2px solid rgba(0,0,0,0.5)',borderRadius:5,marginTop:10,position:'relative',display:'flex',alignItems:'center',flexDirection:'column'}} >
                                                                                <p onClick={()=>{setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, showActions:!bannerImg.showActions}) : b))}} style={{cursor:'pointer',fontFamily:'mb',fontSize:17,margin:0,padding:6,color:'rgba(0,0,0,0.7)'}} >{bannerImg.action?bannerImg.action=='products'?'product ↪':'action ↪':'action ↪'} {bannerImg.action?bannerImg.action=='products'?bannerImg.productLink?bannerImg.productLink.title:'none':bannerImg.action:"none"}</p>
                                                                                <div className="text" style={{overflow:'scroll',position:'absolute',alignSelf:'center',backgroundColor:backgroundColorAdmin,borderRadius:5,width:'100%',maxHeight:!bannerImg.showActions?0:200,border:!bannerImg.showActions?0:2+'px solid black',borderRadius:5,bottom:0}} >
                                                                                    {
                                                                                        actions.map((action,i)=>{
                                                                                            return(
                                                                                                <p onClick={()=>{setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, showActions:!bannerImg.showActions,action:action!="none"?action:null,showProducts:action=="products"}) : b))}} style={{cursor:'pointer',fontFamily:'mb',fontSize:17,margin:0,padding:6}} >{action}</p>
                                                                                            )
                                                                                        }).reverse()
                                                                                    }
                                                                                
                                                                                </div>
                                                                                <div className="text" style={{overflow:'scroll',position:'absolute',alignSelf:'center',backgroundColor:backgroundColorAdmin,borderRadius:5,width:'100%',maxHeight:!bannerImg.showProducts?0:200,border:!bannerImg.showProducts?0:2+'px solid black',borderRadius:5,bottom:0}} >
                                                                                    {
                                                                                        storeProducts.map((storeP,i)=>{
                                                                                            return(
                                                                                                <p onClick={()=>{setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, showProducts:!bannerImg.showProducts,productLink:{'pid':storeP.pid,'title':storeP.title}}) : b))}} style={{cursor:'pointer',fontFamily:'mb',fontSize:17,margin:0,padding:6}} >{storeP.title}</p>
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

                                                        {
                                                            showSliders.map((showSlider,i)=>{
                                                                if (showSlider.parent_id === bannerDiv.id) {
                                                                    return (
                                                                        <div key={i+bannerTexts.length} style={{border:'2px solid black',width:'90%',display:'flex',alignItems:'center',flexDirection:'column',borderRadius:5,marginTop:10,paddingBottom:10,position:'relative'}} >
                                                                            <button onClick={()=>rmss(showSlider.id)} style={{cursor:'pointer',position:'absolute',fontFamily:'ns',fontSize:17,color:'red',top:5,left:10,padding:0,borderRadius:20,backgroundColor:backgroundColorAdmin,border:0}} >X</button>
                                                                            <p style={{fontFamily:'mb',fontSize:17,marginTop:5}} >Show slider {showSlider.id}</p>
                                                                            {/* <div style={{width:'90%',height:100,alignSelf:'center',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:5,border:'2px dashed #c9cbcd',overflow:'hidden'}} > */}
                                                                                
                                                                                {/* <h1 style={{position:'absolute',margin:0,fontFamily:'mb',fontSize:15,color:'rgba(0,0,0,0.8)',marginBottom:0,zIndex:0}} >drag and drop file</h1> */}
                                                                                <div style={{width:'90%',display:'flex',alignItems:'start',justifyContent:'center',flexDirection:'column',alignSelf:'center',padding:10,marginTop:10}} >
                                                                                <h1 style={{margin:0,fontFamily:'ml',fontSize:25,color:'rgba(0,0,0,0.9)',marginBottom:0}} >Slides</h1>
                                                                                <div className="dragdrop"  style={{position:'relative',width:'100%',overflow:'hidden',height:90,borderRadius:5,alignSelf:'center',marginTop:20,display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0)'}} >
                                                                                    {showSlider.files.length<5?<input onChange={async(event)=>{setShowSliders(showSliders => [...showSliders].map(b => b.id === showSlider.id ? ({...b, files:Array.from(event.target.files)}) : b));await update()}} multiple type="file" style={{padding:500,zIndex:1,display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center',color:'rgba(0,0,0,0)',backgroundColor:'rgba(0,0,0,0)',opacity:0}} />:null}
                                                                                    <h1 style={{position:'absolute',margin:0,fontFamily:'ml',fontSize:16,marginBottom:0,zIndex:0}} >drag and drop file</h1>
                                                                                </div>
                                                                                {
                                                                                    showSlider.files.length!=0?
                                                                                    <div style={{width:'100%',marginTop:15,position:'relative'}} >
                                                                                        <div style={{width:'48%',borderRadius:5,overflow:'hidden',border:'2px solid rgba(0,0,0,0.3)',height:125,alignItems:'center',justifyContent:'center',display:'flex',position:'relative'}} >
                                                                                            <img src={URL.createObjectURL(showSlider.files[0])} style={{width:'100%',height:'auto'}} />
                                                                                            <button onClick={()=>rmshowSliderImg(showSlider.files[0].lastModified)} style={{position:'absolute',color:'red',top:0,right:0,fontFamily:'monospace',fontSize:20,backgroundColor:'rgba(0,0,0,0)',border:0,fontWeight:'bolder',cursor:'pointer'}} >x</button>
                                                                                            
                                                                                        </div>
                                                                                        <div style={{width:'48%',height:129,position:'absolute',right:0,top:0}} >
                                                                                            {showSlider.files.length>1?<div style={{width:'45%',height:'45%',overflow:'hidden',border:'2px solid rgba(0,0,0,0.3)',top:0,left:0,position:'absolute',borderRadius:5,alignItems:'center',justifyContent:'center',display:'flex'}} >
                                                                                            <button onClick={()=>rmshowSliderImg(showSlider.files[1].lastModified)} style={{position:'absolute',color:'red',top:0,right:0,fontFamily:'monospace',fontSize:20,backgroundColor:'rgba(0,0,0,0)',border:0,fontWeight:'bolder',cursor:'pointer'}} >x</button>
                                                                                            <img src={URL.createObjectURL(showSlider.files[1])} style={{width:'100%',height:'auto'}} />
                                                                                                </div>:null}
                                                                                            {showSlider.files.length>2?<div style={{width:'45%',height:'45%',overflow:'hidden',border:'2px solid rgba(0,0,0,0.3)',bottom:0,left:0,position:'absolute',borderRadius:5,alignItems:'center',justifyContent:'center',display:'flex'}} >
                                                                                            <button onClick={()=>rmshowSliderImg(showSlider.files[2].lastModified)} style={{position:'absolute',color:'red',top:0,right:0,fontFamily:'monospace',fontSize:20,backgroundColor:'rgba(0,0,0,0)',border:0,fontWeight:'bolder',cursor:'pointer'}} >x</button>
                                                                                                <img src={URL.createObjectURL(showSlider.files[2])} style={{width:'100%',height:'auto'}} />
                                                                                            </div>:null}
                                                                                            {showSlider.files.length>3?<div style={{width:'45%',height:'45%',overflow:'hidden',border:'2px solid rgba(0,0,0,0.3)',top:0,right:0,position:'absolute',borderRadius:5,alignItems:'center',justifyContent:'center',display:'flex'}} >
                                                                                            <button onClick={()=>rmshowSliderImg(showSlider.files[3].lastModified)} style={{position:'absolute',color:'red',top:0,right:0,fontFamily:'monospace',fontSize:20,backgroundColor:'rgba(0,0,0,0)',border:0,fontWeight:'bolder',cursor:'pointer'}} >x</button>
                                                                                                <img src={URL.createObjectURL(showSlider.files[3])} style={{width:'100%',height:'auto'}} />
                                                                                            </div>:null}
                                                                                            {showSlider.files.length>4?<div style={{width:'45%',height:'45%',overflow:'hidden',border:'2px solid rgba(0,0,0,0.3)',bottom:0,right:0,position:'absolute',borderRadius:5,alignItems:'center',justifyContent:'center',display:'flex'}} >
                                                                                            <button onClick={()=>rmshowSliderImg(showSlider.files[4].lastModified)} style={{position:'absolute',color:'red',top:0,right:0,fontFamily:'monospace',fontSize:20,backgroundColor:'rgba(0,0,0,0)',border:0,fontWeight:'bolder',cursor:'pointer'}} >x</button>
                                                                                                <img src={URL.createObjectURL(showSlider.files[4])} style={{width:'100%',height:'auto'}} />
                                                                                            </div>:null}
                                                                                        </div>
                                                                                    </div>:null
                                                                                }
                                                                                </div>
                                                                                {/* <input style={{width:'100%',padding:100,opacity:0,cursor:'pointer'}} onChange={(event)=>{setshowSlider({sliderID:showSlider.id,files:event.target.files})}} multiple type="file" id="file" name="file"/> */}
                                                                            {/* </div> */}
                                                                            {/* <button onClick={()=>{uploadSlides(showSlider.id)}} disabled={showSlider.id != showSlider.sliderID} style={{cursor:showSlider.id != showSlider.sliderID?'default':'pointer',border:'2px solid black',width:'33%',padding:5,color:'black',marginBottom:9,opacity:showSlider.id != showSlider.sliderID?0.5:0.8,fontFamily:'mb',fontSize:14,backgroundColor:backgroundColorAdmin,marginTop:10,borderRadius:5}} >
                                                                                upload
                                                                            </button> */}
                                                                        </div>
                                                                        )
                                                                }
                                                                
                                                            })
                                                        }

                                                        {
                                                            bannerButtons.map((bannerButton,i)=>{
                                                                if (bannerButton.parent_id == bannerDiv.id) {
                                                                    return(
                                                                        <div key={i} style={{border:'2px solid black',width:'90%',display:'flex',alignItems:'center',flexDirection:'column',borderRadius:5,marginTop:10,paddingBottom:10,position:'relative'}} >
                                                                            <button onClick={()=>rmbt(bannerButton.id)} style={{cursor:'pointer',position:'absolute',fontFamily:'ns',fontSize:17,color:'red',top:5,left:10,padding:0,borderRadius:20,backgroundColor:backgroundColorAdmin,border:0}} >X</button>
                                                                            <p style={{fontFamily:'mb',fontSize:17,marginTop:5,marginBottom:15}} >Button {bannerButton.id}</p>
                                                                            <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:12,position:'relative'}} >
                                                                                <p style={{fontFamily:'mb',fontSize:16,marginLeft:20,color:'black',marginBottom:0,marginTop:0}} >Text</p>
                                                                                <input value={bannerButton.text} onChange={(event => setBannerButtons(bannerButtons => [...bannerButtons].map(b => b.id === bannerButton.id ? ({...b, text:event.target.value}) : b)))} style={{position:'absolute',right:10,height:15,border:'2px solid #c9cbcd',width:'66%',padding:5,color:'rgba(0,0,0,0.9)',fontFamily:'mb',fontSize:16,backgroundColor:backgroundColorAdmin,borderRadius:5}} placeholder="type..." />
                                                                            </div>

                                                                            <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                                                                <p style={{fontFamily:'mb',fontSize:16,marginLeft:20,color:'black',marginBottom:0,marginTop:0}} >Color</p>
                                                                                <input value={bannerButton.color} type="color" onChange={(event => setBannerButtons(bannerButtons => [...bannerButtons].map(b => b.id === bannerButton.id ? ({...b, color:event.target.value}) : b)))} style={{position:'absolute',right:10,height:20,border:'2px solid #c9cbcd',width:'33%',padding:0,backgroundColor:backgroundColorAdmin,borderRadius:5}} />
                                                                            </div>

                                                                            <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                                                                <p style={{fontFamily:'mb',fontSize:16,marginLeft:20,color:'black',marginBottom:0,marginTop:0}} >Background color</p>
                                                                                <input value={bannerButton.backgroundColor} type="color" onChange={(event => setBannerButtons(bannerButtons => [...bannerButtons].map(b => b.id === bannerButton.id ? ({...b, backgroundColor:event.target.value}) : b)))} style={{position:'absolute',right:10,height:20,border:'2px solid #c9cbcd',width:'33%',padding:0,backgroundColor:backgroundColorAdmin,borderRadius:5}} />
                                                                            </div>

                                                                            <p onClick={async()=>{setBannerButtons(bannerButtons => [...bannerButtons].map(b => b.id === bannerButton.id ? ({...b, showFont:!bannerButton.showFont}) : b));await update()}} style={{cursor:'pointer',marginBottom:10,marginTop:0,fontFamily:'mb',fontSize:15,alignSelf:'flex-start',marginLeft:20}} >Font {bannerButton.showFont?'▼':'►'}</p>

                                                                            {bannerButton.showFont?<div style={{width:'100%',position:'relative'}} >
                                                                                <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                                                                    <h3 style={{fontFamily:'mb',fontSize:16,marginLeft:35,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >Font size</h3>
                                                                                    <input value={bannerButton.size} type="number" onChange={(event => setBannerButtons(bannerButtons => [...bannerButtons].map(b => b.id === bannerButton.id ? ({...b, size:parseInt(event.target.value)}) : b)))} style={{position:'absolute',right:10,border:'2px solid #c9cbcd',width:'30%',height:15,padding:5,color:'rgba(0,0,0,0.9)',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5}} placeholder="type..." />

                                                                                </div>

                                                                                <div onClick={()=>setBannerButtons(bannerButtons => [...bannerButtons].map(b => b.id === bannerButton.id ? ({...b, showfont:!bannerButton.showfont}) : b))} style={{width:243,marginLeft:35,marginBottom:9,border:'2px solid #c9cbcd',borderRadius:5,marginTop:9,position:'relative',display:'flex',alignItems:'center',flexDirection:'column'}} >
                                                                                    <p style={{fontFamily:''+bannerButton.font+'',fontSize:15,margin:0,padding:3}} >{bannerButton.font}</p>
                                                                                    <div className="text" style={{overflow:'scroll',position:'absolute',alignSelf:'center',backgroundColor:backgroundColorAdmin,borderRadius:5,width:'100%',maxHeight:!bannerButton.showfont?0:200,border:!bannerButton.showfont?0:2+'px solid #c9cbcd',borderRadius:5,bottom:0}} >
                                                                                        {
                                                                                            fonts.map((font,i)=>{
                                                                                                return(
                                                                                                    <p onClick={()=>setBannerButtons(bannerButtons => [...bannerButtons].map(b => b.id === bannerButton.id ? ({...b, font:font}) : b))} style={{fontFamily:''+font+'',fontSize:15,margin:0,padding:6}} >{font}</p>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    
                                                                                    </div>
                                                                                </div>
                                                                                


                                                                            </div>:null}

                                                                            <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                                                                <p style={{fontFamily:'mb',fontSize:16,marginLeft:20,color:'black',marginBottom:0,marginTop:0}} >Alignement</p>
                                                                                <div style={{width:'33%',height:16,borderRadius:18,backgroundColor:'#c9cbcd',opacity:0.7,position:'absolute',right:10,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',padding:2}} >
                                                                                    <input type="range" className='slider' value={bannerButton.align=='flex-start'?0:bannerButton.align=='center'?1:2} style={{width:'100%'}} min={0} max={2} onChange={(event => setBannerButtons(bannerButtons => [...bannerButtons].map(b => b.id === bannerButton.id ? ({...b, align:event.target.value==0?'flex-start':event.target.value==1?'center':'flex-end'}) : b)))} />
                                                                                </div>
                                                                            </div>


                                                                            <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                                                                <p style={{fontFamily:'mb',fontSize:16,marginLeft:20,color:'black',marginBottom:0,marginTop:0}} >Jump line</p>
                                                                                <div class="checkbox-wrapper-2" style={{position:'absolute',right:10,cursor:'pointer'}} >
                                                                                    <input type="checkbox" class="sc-gJwTLC ikxBAC" checked={bannerButton.jline} onChange={(event => setBannerButtons(bannerButtons => [...bannerButtons].map(b => b.id === bannerButton.id ? ({...b, jline:!bannerButton.jline}) : b)))} />
                                                                                </div>
                                                                            </div>

                                                                            <p onClick={async()=>{setBannerButtons(bannerButtons => [...bannerButtons].map(b => b.id === bannerButton.id ? ({...b, showMargin:!bannerButton.showMargin}) : b));await update()}} style={{cursor:'pointer',marginBottom:10,marginTop:0,fontFamily:'mb',fontSize:15,alignSelf:'flex-start',marginLeft:20}} >Margin {bannerButton.showMargin?'▼':'►'}</p>
                                                                            
                                                                            {bannerButton.showMargin?<div style={{width:'100%',position:'relative'}} >
                                                                                <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:12,position:'relative'}} >
                                                                                    <h3 style={{fontFamily:'mb',fontSize:16,marginLeft:35,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >Margin horizontal</h3>
                                                                                    <input value={bannerButton.marginH} type="number" onChange={(event => setBannerButtons(bannerButtons => [...bannerButtons].map(b => b.id === bannerButton.id ? ({...b, marginH:parseInt(event.target.value)}) : b)))} placeholder="0" style={{position:'absolute',right:10,border:'2px solid #c9cbcd',width:'30%',height:15,padding:5,color:'rgba(0,0,0,0.9)',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5}}/>
                                                                                </div>
                                                                                <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                                                                    <h3 style={{fontFamily:'mb',fontSize:16,marginLeft:35,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >Margin vertical</h3>
                                                                                    <input value={bannerButton.marginV} type="number" onChange={(event => setBannerButtons(bannerButtons => [...bannerButtons].map(b => b.id === bannerButton.id ? ({...b, marginV:parseInt(event.target.value)}) : b)))} placeholder="0" style={{position:'absolute',right:10,border:'2px solid #c9cbcd',width:'30%',height:15,padding:5,color:'rgba(0,0,0,0.9)',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5}}/>
                                                                                </div>

                                                                            </div>:null}

                                                                            <p onClick={async()=>{setBannerButtons(bannerButtons => [...bannerButtons].map(b => b.id === bannerButton.id ? ({...b, showPadding:!bannerButton.showPadding}) : b));await update()}} style={{cursor:'pointer',marginBottom:10,marginTop:0,fontFamily:'mb',fontSize:15,alignSelf:'flex-start',marginLeft:20}} >Padding {bannerButton.showPadding?'▼':'►'}</p>
                                                                            
                                                                            {bannerButton.showPadding?<div style={{width:'100%',position:'relative'}} >
                                                                                <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:12,position:'relative'}} >
                                                                                    <h3 style={{fontFamily:'mb',fontSize:16,marginLeft:35,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >Padding horizontal</h3>
                                                                                    <input value={bannerButton.paddingH} type="number" onChange={(event => setBannerButtons(bannerButtons => [...bannerButtons].map(b => b.id === bannerButton.id ? ({...b, paddingH:parseInt(event.target.value)}) : b)))} placeholder="0" style={{position:'absolute',right:10,border:'2px solid #c9cbcd',width:'30%',height:15,padding:5,color:'rgba(0,0,0,0.9)',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5}}/>
                                                                                </div>
                                                                                <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                                                                    <h3 style={{fontFamily:'mb',fontSize:16,marginLeft:35,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >Padding vertical</h3>
                                                                                    <input value={bannerButton.paddingV} type="number" onChange={(event => setBannerButtons(bannerButtons => [...bannerButtons].map(b => b.id === bannerButton.id ? ({...b, paddingV:parseInt(event.target.value)}) : b)))} placeholder="0" style={{position:'absolute',right:10,border:'2px solid #c9cbcd',width:'30%',height:15,padding:5,color:'rgba(0,0,0,0.9)',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5}}/>
                                                                                </div>

                                                                            </div>:null}

                                                                            <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                                                                <p style={{fontFamily:'mb',fontSize:16,marginLeft:20,color:'black',marginBottom:0,marginTop:0}} >Rounded corners</p>
                                                                                <div style={{width:'33%',height:16,borderRadius:18,backgroundColor:'#c9cbcd',opacity:0.7,position:'absolute',right:10,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',padding:2}} >
                                                                                    <input type="range" className='slider' value={bannerButton.borderRadius} style={{width:'100%'}} min={0} max={30} onChange={(event => setBannerButtons(bannerButtons => [...bannerButtons].map(b => b.id === bannerButton.id ? ({...b, borderRadius:parseFloat(event.target.value)}) : b)))} />
                                                                                </div>
                                                                            </div>


                                                                            {bannerButton.jline?<div style={{display:'flex',flexDirection:'row',alignSelf:'center',justifyContent:'center',alignItems:'center'}} >
                                                                                    <img onClick={()=>{setBannerButtons(bannerButtons => [...bannerButtons].map(b => b.id === bannerButton.id ? ({...b, textAlign:'left'}) : b))}} src={'/static/textLeft.png'} style={{opacity:0.8,height:20,width:20,margin:9,cursor:'pointer',borderBottom:bannerButton.textAlign?bannerButton.textAlign=='left'?'2px solid black':0:0,borderRadius:5,paddingBottom:5}}  />
                                                                                    <img onClick={()=>{setBannerButtons(bannerButtons => [...bannerButtons].map(b => b.id === bannerButton.id ? ({...b, textAlign:'center'}) : b))}} src={'/static/textMid.png'} style={{opacity:0.8,height:20,width:20,margin:9,cursor:'pointer',borderBottom:bannerButton.textAlign?bannerButton.textAlign=='center'?'2px solid black':0:0,borderRadius:5,paddingBottom:5}}  />
                                                                                    <img onClick={()=>{setBannerButtons(bannerButtons => [...bannerButtons].map(b => b.id === bannerButton.id ? ({...b, textAlign:'right'}) : b))}} src={'/static/textRight.png'} style={{opacity:0.8,height:20,width:20,margin:9,cursor:'pointer',borderBottom:bannerButton.textAlign?bannerButton.textAlign=='right'?'2px solid black':0:0,borderRadius:5,paddingBottom:5}}  />
                                                                            </div>:null}

                                                                            

                                                                            <div style={{width:'90%',border:'2px solid rgba(0,0,0,0.5)',borderRadius:5,marginTop:0,position:'relative',display:'flex',alignItems:'center',flexDirection:'column'}} >
                                                                                <p onClick={()=>{setBannerButtons(bannerButtons => [...bannerButtons].map(b => b.id === bannerButton.id ? ({...b, showActions:!bannerButton.showActions}) : b))}} style={{cursor:'pointer',fontFamily:'mb',fontSize:17,margin:0,padding:6,color:'rgba(0,0,0,0.7)'}} >{bannerButton.action?bannerButton.action=='products'?'product ↪':'action ↪':'action ↪'} {bannerButton.action?bannerButton.action=='products'?bannerButton.productLink?bannerButton.productLink.title:'none':bannerButton.action:"none"}</p>
                                                                                <div className="text" style={{overflow:'scroll',position:'absolute',alignSelf:'center',backgroundColor:backgroundColorAdmin,borderRadius:5,width:'100%',maxHeight:!bannerButton.showActions?0:200,border:!bannerButton.showActions?0:2+'px solid black',borderRadius:5,bottom:0}} >
                                                                                    {
                                                                                        actions.map((action,i)=>{
                                                                                            return(
                                                                                                <p onClick={()=>{setBannerButtons(bannerButtons => [...bannerButtons].map(b => b.id === bannerButton.id ? ({...b, showActions:!bannerButton.showActions,action:action!="none"?action:null,showProducts:action=="products"}) : b))}} style={{fontFamily:'mb',fontSize:17,margin:0,padding:6,cursor:'pointer'}} >{action}</p>
                                                                                            )
                                                                                        }).reverse()
                                                                                    }
                                                                                
                                                                                </div>
                                                                                <div className="text" style={{overflow:'scroll',position:'absolute',alignSelf:'center',backgroundColor:backgroundColorAdmin,borderRadius:5,width:'100%',maxHeight:!bannerButton.showProducts?0:200,border:!bannerButton.showProducts?0:2+'px solid black',borderRadius:5,bottom:0}} >
                                                                                    {
                                                                                        storeProducts.map((storeP,i)=>{
                                                                                            return(
                                                                                                <p onClick={()=>{setBannerButtons(bannerButtons => [...bannerButtons].map(b => b.id === bannerButton.id ? ({...b, showProducts:!bannerButton.showProducts,productLink:{'pid':storeP.pid,'title':storeP.title}}) : b))}} style={{fontFamily:'mb',fontSize:17,margin:0,padding:6,cursor:'pointer'}} >{storeP.title}</p>
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
                                                        <p onClick={async()=>{setBannerDivs(bannerDivs => [...bannerDivs].map(b => b.id === bannerDiv.id? ({...b, showPosition:!bannerDiv.showPosition}) : b));await update()}} style={{cursor:'pointer',marginBottom:4,marginTop:10,fontFamily:'mb',fontSize:17,alignSelf:'flex-start',marginLeft:20}} >Position {bannerDiv.showPosition?'▼':'►'}</p>

                                                        {bannerDiv.showPosition?<div style={{width:'100%',position:'relative'}} >
                                                            <div style={{marginTop:0,display:'flex',flexDirection:'column',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                                                <h3 style={{fontFamily:'mb',fontSize:16,marginLeft:35,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)',alignSelf:'start'}} >X ▼</h3>
                                                                <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                                                    <h3 style={{fontFamily:'mb',fontSize:16,marginLeft:45,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >Switch</h3>
                                                                    <div class="checkbox-wrapper-2" style={{position:'absolute',right:10,cursor:'pointer'}} >
                                                                        <input type="checkbox" class="sc-gJwTLC ikxBAC" checked={bannerDiv.Xswitch} onClick={()=>setBannerDivs(bannerDivs => [...bannerDivs].map(b => b.id === bannerDiv.id? ({...b, Xswitch:!bannerDiv.Xswitch,align:0}) : b))} />
                                                                    </div>
                                                                </div>
                                                                <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:13,position:'relative'}} >
                                                                    <h3 style={{fontFamily:'mb',fontSize:16,marginLeft:45,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >Value</h3>
                                                                    
                                                                    {bannerDiv.Xswitch?<div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',position:'absolute',right:10,width:'40%'}} >
                                                                        <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',border:'2px solid #c9cbcd',borderRadius:5,width:'100%',marginRight:5}} >
                                                                            <input value={bannerDiv.align} type="number" onChange={(event => {setBannerDivs(bannerDivs => [...bannerDivs].map(b => b.id === bannerDiv.id? ({...b, align:parseInt(event.target.value)}) : b))})} style={{border:0,width:'100%',height:15,padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin}} placeholder="69" />
                                                                            <h3 style={{fontFamily:'mb',fontSize:16,marginRight:5,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >{bannerDiv.alignpx?'px':'%'}</h3>
                                                                        </div>
                                                                        <div class="checkbox-wrapper-2" style={{cursor:'pointer'}} >
                                                                            <input type="checkbox" class="sc-gJwTLC ikxBAC" checked={bannerDiv.alignpx} onClick={()=>setBannerDivs(bannerDivs => [...bannerDivs].map(b => b.id === bannerDiv.id? ({...b, alignpx:!bannerDiv.alignpx}) : b))} />
                                                                        </div>
                                                                    </div>:

                                                                    <div style={{width:'60%',height:16,borderRadius:18,backgroundColor:'#c9cbcd',opacity:0.7,position:'absolute',right:10,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',padding:2}} >
                                                                        <input type="range" className='slider'  style={{width:'100%'} } min={-(width-360)/2} max={(width-360)/2} onChange={(event => {setBannerDivs(bannerDivs => [...bannerDivs].map(b => b.id === bannerDiv.id? ({...b, align:(parseFloat(parseInt(event.target.value)*2/(width-360)))}) : b));console.log("ratioX:",0.5-(1/2)*(parseFloat(parseInt(event.target.value)*2/(width-360))))})} />
                                                                    </div>}
                                                                </div>
                                                            </div>
                                                            <div style={{marginTop:0,display:'flex',flexDirection:'column',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                                                <h3 style={{fontFamily:'mb',fontSize:16,marginLeft:35,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)',alignSelf:'start'}} >Y ▼</h3>
                                                                <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                                                                    <h3 style={{fontFamily:'mb',fontSize:16,marginLeft:45,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >Switch</h3>
                                                                    <div class="checkbox-wrapper-2" style={{position:'absolute',right:10,cursor:'pointer'}} >
                                                                        <input type="checkbox" class="sc-gJwTLC ikxBAC" checked={bannerDiv.Yswitch} onClick={()=>setBannerDivs(bannerDivs => [...bannerDivs].map(b => b.id === bannerDiv.id? ({...b, Yswitch:!bannerDiv.Yswitch,y:0}) : b))} />
                                                                    </div>
                                                                </div>
                                                                <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:13,position:'relative'}} >
                                                                    <h3 style={{fontFamily:'mb',fontSize:16,marginLeft:45,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >Value</h3>
                                                                    
                                                                    {bannerDiv.Yswitch?<div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',position:'absolute',right:10,width:'40%'}} >
                                                                        <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',border:'2px solid #c9cbcd',borderRadius:5,width:'100%',marginRight:5}} >
                                                                            <input value={bannerDiv.y} type="number" onChange={(event => {setBannerDivs(bannerDivs => [...bannerDivs].map(b => b.id === bannerDiv.id? ({...b, y:parseInt(event.target.value)}) : b))})} style={{border:0,width:'100%',height:15,padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin}} placeholder="69" />
                                                                            <h3 style={{fontFamily:'mb',fontSize:16,marginRight:5,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >{bannerDiv.ypx?'px':'%'}</h3>
                                                                        </div>
                                                                        <div class="checkbox-wrapper-2" style={{cursor:'pointer'}} >
                                                                            <input type="checkbox" class="sc-gJwTLC ikxBAC" checked={bannerDiv.ypx} onClick={()=>setBannerDivs(bannerDivs => [...bannerDivs].map(b => b.id === bannerDiv.id? ({...b, ypx:!bannerDiv.ypx}) : b))} />
                                                                        </div>
                                                                    </div>:

                                                                    <div style={{width:'60%',height:16,borderRadius:18,backgroundColor:'#c9cbcd',opacity:0.7,position:'absolute',right:10,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',padding:2}} >
                                                                        <input type="range" className='slider'  style={{width:'100%'} } min={-bn.size/2} max={bn.size/2} onChange={(event => {setBannerDivs(bannerDivs => [...bannerDivs].map(b => b.id === bannerDiv.id? ({...b, y:(parseFloat(parseInt(event.target.value)*2/(bn.size)))}) : b));console.log("ratioY:",0.5-(1/2)*(parseFloat(parseInt(event.target.value)*2/(width-360))))})} />
                                                                    </div>}
                                                                </div>
                                                            </div>
                                                        </div>:null}

                                                        <div style={{width:'100%',marginTop:7,display:'flex',flexDirection:'row',justifyContent:'start',alignItems:'center',position:'relative',marginBottom:13}} >
                                                            <p style={{cursor:'pointer',marginBottom:0,marginTop:0,fontFamily:'mb',color:'black',fontSize:17,marginLeft:20}} >Margin horizontal</p>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',position:'absolute',right:10,width:'40%',height:15}} >
                                                                <input value={bannerDiv.marginH} type="number" onChange={(event => setBannerDivs(bannerDivs => [...bannerDivs].map(b => b.id === bannerDiv.id ? ({...b, marginH:parseInt(event.target.value)}) : b)))} style={{border:'2px solid #c9cbcd',width:'100%',height:'100%',padding:5,color:'rgba(0,0,0,0.9)',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5}} placeholder="0" />
                                                            </div>
                                                        </div>

                                                        <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:13,position:'relative'}} >
                                                            <h3 style={{fontFamily:'mb',fontSize:17,marginLeft:20,marginTop:0,marginBottom:0,color:'black'}} >Height</h3>
                                                            
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',position:'absolute',right:10,width:'40%'}} >
                                                                <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',border:'2px solid #c9cbcd',borderRadius:5,width:'100%',marginRight:5}} >
                                                                    <input type="number" value={bannerDiv.height}  onChange={(event => setBannerDivs(bannerDivs => [...bannerDivs].map(b => b.id === bannerDiv.id ? ({...b, height:parseInt(event.target.value)}) : b)))} style={{border:0,width:'100%',height:15,padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin}} placeholder="69" />
                                                                    <h3 style={{fontFamily:'mb',fontSize:16,marginRight:5,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >{bannerDiv.hdivpx?'px':'%'}</h3>
                                                                </div>
                                                                <div class="checkbox-wrapper-2" style={{cursor:'pointer'}} >
                                                                    <input type="checkbox" class="sc-gJwTLC ikxBAC" checked={!bannerDiv.hdivpx} onClick={()=>setBannerDivs(bannerDivs => [...bannerDivs].map(b => b.id === bannerDiv.id? ({...b, hdivpx:!bannerDiv.hdivpx}) : b))} />
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:13,position:'relative'}} >
                                                            <h3 style={{fontFamily:'mb',fontSize:17,marginLeft:20,marginTop:0,marginBottom:0,color:'black'}} >Width</h3>
                                                            
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',position:'absolute',right:10,width:'40%'}} >
                                                                <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',border:'2px solid #c9cbcd',borderRadius:5,width:'100%',marginRight:5}} >
                                                                    <input type="number" value={bannerDiv.width}  onChange={(event => setBannerDivs(bannerDivs => [...bannerDivs].map(b => b.id === bannerDiv.id ? ({...b, width:parseInt(event.target.value)}) : b)))} style={{border:0,width:'100%',height:15,padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin}} placeholder="69" />
                                                                    <h3 style={{fontFamily:'mb',fontSize:16,marginRight:5,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >{bannerDiv.wdivpx?'px':'%'}</h3>
                                                                </div>
                                                                <div class="checkbox-wrapper-2" style={{cursor:'pointer'}} >
                                                                    <input type="checkbox" class="sc-gJwTLC ikxBAC" checked={!bannerDiv.wdivpx} onClick={()=>setBannerDivs(bannerDivs => [...bannerDivs].map(b => b.id === bannerDiv.id? ({...b, wdivpx:!bannerDiv.wdivpx}) : b))} />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        
                                                        <div style={{flexDirection:'row',display:'flex',marginTop:10}} >
                                                            <button onClick={()=>setBannerDivs(bannerDivs => [...bannerDivs].map(b => b.id === bannerDiv.id? ({...b, fdirection:'row'}) : b))} style={{opacity:0.8,backgroundColor:secondColor,border:0,padding:0,borderRadius:5,borderBottom:bannerDiv.fdirection != 'column'?'2px solid black':0}} ><img src={'/static/column.png'} style={{height:30,width:30,transform:'rotate(90deg)'}}  /></button>
                                                            <button onClick={()=>setBannerDivs(bannerDivs => [...bannerDivs].map(b => b.id === bannerDiv.id? ({...b, fdirection:'column'}) : b))} style={{opacity:0.8,backgroundColor:secondColor,border:0,padding:0,marginLeft:40,borderRadius:5,borderBottom:bannerDiv.fdirection == 'column'?'2px solid black':0}} ><img src={'/static/column.png'} style={{height:30,width:30}}  /></button>
                                                        </div> 
                
                                                        {!bannerDiv.show?<div style={{position:"absolute",zIndex:1,backgroundColor:backgroundColorAdmin,height:'100%',width:'100%',alignItems:'center',justifyContent:'center',textAlign:'center',display:'flex',top:0}} >
                                                                   <h5 style={{fontFamily:'mb',fontSize:17}}>section {bannerDiv.id}</h5>
                                                        </div>:null}




                                                    </div>
                                                )
                                            }else{
                                                return null
                                            }
                                            
                                        })
                                    }
                                    <button onClick={async()=>{let rid = getId();setBannerDivs(bannerDivs=>[...bannerDivs,{parent:bn.id,id:rid,marginH:0,x:0,show:true,fdirection:'column'}]);widgetRefs.current[rid] = React.createRef();await update();}} style={{cursor:'pointer',border:'2px solid black',width:'90%',padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:secondColor,borderRadius:5}} >
                                        Add container
                                    </button>
                                </div>
                            </div>
                            )
                        }
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
                            <div className="bannerEdit" style={{position:'relative',marginLeft:0,height:40,overflow:'scroll',overflowX:'hidden',width:'100%',alignItems:'center',justifyContent:'center',alignSelf:'center',display:'flex',flexDirection:'column',borderBottom:yy == Banners.length-1?'2px solid black':'0px',borderTop:'2px solid black',paddingBottom:10,paddingTop:10}} >
                                <button onClick={()=>setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, show:!bn.show}) : b))} style={{position:'absolute',top:2,textAlign:'start',marginLeft:10,border:0,width:'90%',padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:'rgba(0,0,0,0)',borderRadius:5}} >
                                    {bn.name}
                                </button>
                                <div style={{position:'absolute',right:5,display:'flex',flexDirection:'row',top:6}} >
                                    <button onClick={()=>{mvup(bn.id)}} style={{border:0,padding:0,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:'rgba(0,0,0,0)'}} >
                                        <img src={arrow} style={{height:20,width:20}}  />
                                    </button>
                                    <button onClick={()=>{mvdwn(yy+1)}} style={{border:0,padding:0,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:'rgba(0,0,0,0)'}} >
                                        <img src={arrow} style={{height:20,width:20,transform:'rotate(180deg)'}}  />
                                    </button>
                                </div>
                                <button onClick={()=>Rmb(bn.id)} style={{position:'absolute',top:6,left:5,fontFamily:'ns',fontSize:17,color:'red',padding:0,borderRadius:20,backgroundColor:backgroundColorAdmin,zIndex:2,border:0}} >X</button>


            
                                <div style={{position:'absolute',top:50,width:'100%',alignItems:'center',justifyContent:'center',alignSelf:'center',display:'flex',flexDirection:'column'}} >
                                <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:0,marginLeft:30}} >
                                    <p style={{fontFamily:'mb',fontSize:17,marginRight:10}} >Background</p>
                                    <input value={bn.color} type="color" onChange={(event => setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, backgroundColor:event.target.value}) : b)))}  style={{width:'50%',padding:0,backgroundColor:backgroundColorAdmin,border:'1px solid black',borderRadius:2,height:20,marginRight:10}} />
                                </div>
                                <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:0,marginLeft:30,marginTop:0}} >
                                    <p style={{fontFamily:'mb',fontSize:17,marginRight:10}} >Rows</p>
                                    <input value={bn.rows} type="number" onChange={(event => setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, rows:parseInt(event.target.value)}) : b)))} style={{border:'2px solid black',width:'33%',height:15,padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5}} placeholder="type..." />
                                </div>
            
                                <p style={{marginBottom:0,marginTop:0,fontFamily:'mb',fontSize:20,alignSelf:'flex-start',marginLeft:20}} >Height</p>
                                <div style={{marginLeft:70,borderLeft:'2px solid black',paddingLeft:10,display:'flex',justifyContent:'flex-start',flexDirection:'column',width:'100%',paddingTop:5,paddingBottom:5}} >
                                    <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center'}} >
                                        <p style={{fontFamily:'mb',fontSize:17,marginRight:10,margin:0}} >Full</p>
                                        <input type="checkbox" checked={bn.FullHeight} onClick={async()=>{setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, FullHeight:!bn.FullHeight,size:height-100}) : b));await update()}} />
                                    </div>
                                    {!bn.FullHeight?<input value={bn.size} type="number" onChange={(event => setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, size:parseInt(event.target.value)}) : b)))} style={{border:'2px solid black',width:'33%',height:15,padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5,alignSelf:'flex-start',marginTop:8}} placeholder="type..." />:null}
                                </div>
                                                    
                                
                                <div style={{marginTop:8,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginLeft:30,padding:0}} >
                                    <p style={{fontFamily:'mb',fontSize:20,marginRight:10,margin:0}} >Edit all</p>
                                    <input type="checkbox" checked={bn.editAll} onClick={async()=>{setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, editAll:!bn.editAll}) : b))}} />
                                </div>
            
            
                                <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:0,marginLeft:30,marginTop:8}} >
                                    <p style={{fontFamily:'mb',fontSize:20,marginRight:10,marginTop:0,marginBottom:0}} >Margin X</p>
                                    <input value={bn.marginX} type="number" onChange={(event => setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, marginX:parseInt(event.target.value)}) : b)))} style={{border:'2px solid black',width:'33%',height:15,padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5}} placeholder="type..." />
                                </div>
                                <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:0,marginLeft:30,marginTop:8}} >
                                    <p style={{fontFamily:'mb',fontSize:20,marginRight:10,marginTop:0,marginBottom:0}} >Margin Y</p>
                                    <input value={bn.marginY} type="number" onChange={(event => setBanners(Banners => [...Banners].map(b => b.id === bn.id ? ({...b, marginY:parseInt(event.target.value)}) : b)))} style={{border:'2px solid black',width:'33%',height:15,padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5}} placeholder="type..." />
                                </div>
                
                                        
                                        {
                                            products.map((bannerDiv,y)=>{
                                                let product = bannerDiv
                                                return(
                                                    <div key={y} className="bannerdiv" style={{position:'relative',maxHeight:bannerDiv.show?1000:0,overflow:'hidden',width:'90%',alignItems:'center',marginTop:8,justifyContent:'center',alignSelf:'center',display:'flex',flexDirection:'column',borderRadius:5,borderBottom:'3px solid black',borderTop:'3px solid black',borderLeft:'1px solid black',borderRight:'1px solid black',paddingBottom:10,paddingTop:25}} >
                                                        <button onClick={()=>rmbd(bannerDiv.id)} style={{position:'absolute',fontFamily:'ns',fontSize:17,color:'red',top:5,left:10,padding:0,borderRadius:20,backgroundColor:backgroundColorAdmin,zIndex:2,border:0}} >X</button>
                                                        <button onClick={async()=>{setProducts(products=> [...products].map(b => b.id === bannerDiv.id ? ({...b, show:!bannerDiv.show}) : b));await update();}} style={{position:'absolute',fontFamily:'ns',zIndex:2,fontSize:17,color:'black',top:5,left:30,padding:0,borderRadius:20,backgroundColor:backgroundColorAdmin,border:0}} >[]</button>
                                                        
                                                        <div style={{border:'2px solid black',width:'90%',display:'flex',alignItems:'center',flexDirection:'column',borderRadius:5,marginTop:10,paddingBottom:10,position:'relative'}} >
                                                            <p style={{fontFamily:'mb',fontSize:17,marginTop:5}} >{storeProducts[y].title}</p>
                                                            <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center'}} >
                                                                <input value={product.title.color} type="color" onChange={(event => setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, title:{...b.title,color:event.target.value}}) : b)))} style={{width:'33%',padding:0,backgroundColor:backgroundColorAdmin,border:'2px solid black',borderRadius:5,height:29,marginRight:10}} />
                                                                <input value={product.title.size} type="number" onChange={(event => setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, title:{...b.title,size:event.target.value}}) : b)))} style={{border:'2px solid black',width:'33%',height:15,padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5}} placeholder="type..." />
                                                            </div>
                                                            <input type="range" value={product.title.align=='flex-start'?0:product.title.align=='center'?1:2} style={{width:'80%',marginTop:10}} min={0} max={2} onChange={(event => setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, title:{...b.title,align:event.target.value==0?'flex-start':event.target.value==1?'center':'flex-end'}}) : b)))} />
                                                            <div onClick={()=>setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, title:{...b.title,showFont:!product.title.showFont}}) : b))} style={{width:'80%',border:'2px solid black',borderRadius:5,marginTop:10,position:'relative',display:'flex',alignItems:'center',flexDirection:'column'}} >
                                                                <p style={{fontFamily:''+product.title.font+'',fontSize:17,margin:0,padding:6}} >{product.title.font}</p>
                                                                <div className="text" style={{overflow:'scroll',position:'absolute',alignSelf:'center',backgroundColor:backgroundColorAdmin,borderRadius:5,width:'100%',maxHeight:!product.title.showFont?0:200,border:!product.title.showFont?0:2+'px solid black',borderRadius:5,bottom:0}} >
                                                                    {
                                                                        fonts.map((font,i)=>{
                                                                            return(
                                                                                <p onClick={()=>setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, title:{...b.title,font:font}}) : b))} style={{fontFamily:''+font+'',fontSize:17,margin:0,padding:6}} >{font}</p>
                                                                            )
                                                                        })
                                                                    }
                                                                
                                                                </div>
                                                            </div>
                                                        </div>
                
                
                                                        <div style={{border:'2px solid black',width:'90%',display:'flex',alignItems:'center',flexDirection:'column',borderRadius:5,marginTop:10,paddingBottom:10,position:'relative'}} >
                                                            <p style={{fontFamily:'mb',fontSize:17,marginTop:5}} >price</p>
                                                            <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center'}} >
                                                                <input value={product.price.color} type="color" onChange={(event => setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, price:{...b.price,color:event.target.value}}) : b)))} style={{width:'33%',padding:0,backgroundColor:backgroundColorAdmin,border:'2px solid black',borderRadius:5,height:29,marginRight:10}} />
                                                                <input value={product.price.size} type="number" onChange={(event => setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, price:{...b.price,size:event.target.value}}) : b)))} style={{border:'2px solid black',width:'33%',height:15,padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5}} placeholder="type..." />
                                                            </div>
                                                            <input type="range" value={product.price.align=='flex-start'?0:product.price.align=='center'?1:2} style={{width:'80%',marginTop:10}} min={0} max={2} onChange={(event => setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, price:{...b.price,align:event.target.value==0?'flex-start':event.target.value==1?'center':'flex-end'}}) : b)))} />
                                                            <div onClick={()=>setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, price:{...b.price,showFont:!product.price.showFont}}) : b))} style={{width:'80%',border:'2px solid black',borderRadius:5,marginTop:10,position:'relative',display:'flex',alignItems:'center',flexDirection:'column'}} >
                                                                <p style={{fontFamily:''+product.price.font+'',fontSize:17,margin:0,padding:6}} >{product.price.font}</p>
                                                                <div className="text" style={{overflow:'scroll',position:'absolute',alignSelf:'center',backgroundColor:backgroundColorAdmin,borderRadius:5,width:'100%',maxHeight:!product.price.showFont?0:200,border:!product.price.showFont?0:2+'px solid black',borderRadius:5,bottom:0}} >
                                                                    {
                                                                        fonts.map((font,i)=>{
                                                                            return(
                                                                                <p onClick={()=>setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, price:{...b.price,font:font}}) : b))} style={{fontFamily:''+font+'',fontSize:17,margin:0,padding:6}} >{font}</p>
                                                                            )
                                                                        })
                                                                    }
                                                                
                                                                </div>
                                                            </div>
                                                        </div>
                
                
                                                        <div style={{border:'2px solid black',width:'90%',display:'flex',alignItems:'center',flexDirection:'column',borderRadius:5,marginTop:10,paddingBottom:10,position:'relative'}} >
                                                            <p style={{fontFamily:'mb',fontSize:17,marginTop:5}} >image</p>
                                                            <input value={product.image.size} type="number" onChange={(event => setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, image:{...b.image, size: parseInt(event.target.value)}}) : b)))} style={{border:'2px solid black',width:'50%',height:15,padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5}} placeholder="type..." />
                                                            <div style={{marginTop:10,display:'flex',flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center'}} >
                                                                <input value={product.image.color} type="color" onChange={(event => setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, image:{...b.image,color:event.target.value}}) : b)))} style={{width:'20%',padding:0,backgroundColor:backgroundColorAdmin,border:'2px solid black',borderRadius:5,height:29,marginRight:6}} />
                                                                <input value={product.image.borderWidth} type="number" onChange={(event => setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, image:{...b.image, borderWidth:event.target.value}}) : b)))} style={{border:'2px solid black',width:'15%',height:15,padding:5,marginRight:6,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5}} placeholder="type..." />
                                                                <input value={product.image.borderRadius} type="number" onChange={(event => setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, image:{...b.image, borderRadius: parseInt(event.target.value)}}) : b)))} style={{border:'2px solid black',width:'15%',height:15,padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5}} placeholder="type..." />
                                                            </div>
                                                            <input type="range" value={product.image.align=='flex-start'?0:product.image.align=='center'?1:2} style={{width:'80%',marginTop:10}} min={0} max={2} onChange={(event => setProducts(products => [...products].map(b => b.id === product.id || bn.editAll ? ({...b, image:{...b.image,align:event.target.value==0?'flex-start':event.target.value==1?'center':'flex-end'}}) : b)))} />
                                                        </div>
                
                                                        {!bannerDiv.show?<div style={{position:"absolute",zIndex:1,backgroundColor:backgroundColorAdmin,height:'100%',width:'100%',alignItems:'center',justifyContent:'center',textAlign:'center',display:'flex',top:0}} >
                                                                    <h5 style={{fontFamily:'mb',fontSize:17}}> {storeProducts[y].title}</h5>
                                                        </div>:null}
                                                        
                                                    </div>
                                                )
                                            })
                                        }
                                        {/* <button onClick={async()=>{setBannerDivs(bannerDivs=>[...bannerDivs,{id:bannerDivs.length,marginH:0,align:'center',show:true}]);await update();}} style={{border:'2px solid black',width:'90%',padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5,marginTop:8}} >
                                            add product
                                        </button> */}
                                    </div>
                                </div>
                                )
                            }
                        }):editProductTab()
                    }

                    <div style={{height:2,width:'100%',backgroundColor:'black'}} ></div>

                    {/* {pagen=="home"?<button onClick={()=>setAddSection({active:!addSection.active})} style={{cursor:'pointer',border:'2px solid black',marginTop:10,width:'90%',padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:5}} >
                        Add section
                    </button>:null} */}
                    




                    
            </div>

            <div style={{height:63,borderBottom:'2px solid black',width:width-360,backgroundColor:backgroundColorAdmin,position:'absolute',right:0,zIndex:11,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}} >
                <div style={{display:'flex',flexDirection:'row',position:'absolute',left:10}} >
                    <p style={{fontFamily:'mc',fontSize:19,color:'rgba(0,0,0,0.5)',margin:0,paddingTop:10,paddingBottom:4,paddingRight:5,paddingLeft:17,textAlign:'center'}} >Page</p>
                    <img src={"/static/shortArrow.png"} style={{height:10,width:10,alignSelf:'center',opacity:0.5,marginRight:10}} />
                    <div onClick={()=>setPage(!page)} style={{border:'2px solid black',borderRadius:3,position:'relative',display:'flex',alignItems:'center',flexDirection:'column'}} >
                        <p style={{fontFamily:'mb',fontSize:17,margin:0,paddingTop:10,paddingBottom:10,paddingRight:17,paddingLeft:17,textAlign:'center',cursor:'pointer'}} >{pagen=="home"?"Store template":"Product display"}</p>
                        <div className="text" style={{overflow:'scroll',position:'absolute',alignSelf:'center',backgroundColor:backgroundColorAdmin,borderRadius:5,width:'100%',maxHeight:!page?0:200,borderBottom:!page?0:2+'px solid black',borderRadius:3,borderTop:'none',boxSizing:'border-box',top:0}} >
                            {
                                pages.map((pageName,i)=>{
                                    return(
                                        <p onClick={()=>{if(pageName=="home"){window.location.reload()}else{setPageN(pageName);setSide(!side)}}} style={{fontFamily:'mb',fontSize:17,margin:0,padding:6,textAlign:'center',cursor:'pointer'}} >{pageName=="home"?"Store Template":"Product display"}</p>
                                    )
                                }).reverse()
                            }
                        
                        </div>
                    </div>
                    
                </div>
                <div style={{display:'flex',flexDirection:'row',position:'absolute',right:10}} >
                    <button style={{paddingTop:10,backgroundColor:'white',paddingBottom:10,paddingRight:17,paddingLeft:17,marginRight:10,cursor:'pointer',fontFamily:'mb',color:'black',fontSize:16,borderRadius:3,border:'2px solid black'}} >
                        Close
                    </button>
                    <button onClick={()=>save_store()} style={{paddingTop:10,backgroundColor:'#faab34',paddingBottom:10,paddingRight:17,paddingLeft:17,cursor:'pointer',fontFamily:'mb',color:'black',fontSize:16,borderRadius:3,border:0}} >
                        Publish
                    </button>
                    <button className="striped-button" style={{paddingTop:10,paddingBottom:10,paddingRight:17,paddingLeft:17,cursor:'pointer',fontFamily:'mb',marginLeft:10,fontSize:16,borderRadius:3}} >
                        Live view
                    </button>
                </div>
                
            </div>

            <div className="addWidget" style={{height:height-65,width:240,borderRight:'2px solid #CAC2B6',overflow:'hidden',boxSizing:'border-box',backgroundColor:'#F6F3EF',position:'absolute',top:65,left:addWidget.active?360:120,zIndex:12,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'start'}} >
                    <p style={{fontFamily:'mb',fontSize:17,color:'rgba(0,0,0,0.7)',margin:0,marginTop:15}} >Widgets</p>
                    <img src={'/static/shortArrow.png'} onClick={()=>{setAddWidget({active:false,sectionId:null})}} style={{cursor:'pointer',height:15,width:15,opacity:0.4,transform:'rotate(180deg)',position:'absolute',top:10,right:10}} />
                    <button onClick={async()=>{setBannerTexts(bannerTexts=>[...bannerTexts,{parent_id:addWidget.sectionId,id:getId(),margin:0,text:"your text here...",color:"#00000",size:17,align:'center',showfont:false,font:'mb'}]);closeEverithing();setAddWidget({active:false,sectionId:null});await update()}} style={{cursor:'pointer',position:'relative',boxSizing:'border-box',border:'2px solid #CAC2B6',width:'90%',padding:5,marginTop:20,backgroundColor:backgroundColorAdmin,borderRadius:3,display:'flex',alignItems:'center',justifyContent:'center'}} >
                        <img src={'/static/Textbox.png'} style={{height:20,width:20,opacity:0.8,position:'absolute',left:5,marginBottom:2}} />
                        <p style={{fontFamily:'mb',fontSize:17,color:'rgba(0,0,0,0.7)',margin:0}} >Text Box</p>
                    </button>
                    <button onClick={async()=>{setBannerImgs(bannerImgs=>[...bannerImgs,{parent_id:addWidget.sectionId,id:getId(),margin:0,width:15,height:15,cwidth:false,cheight:false,align:'center',src:'',fullw:false,fullh:false}]);closeEverithing();setAddWidget({active:false,sectionId:null});await update()}} style={{cursor:'pointer',position:'relative',border:'2px solid #CAC2B6',width:'90%',marginTop:10,padding:5,color:'rgba(0,0,0,0.8)',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:3,display:'flex',alignItems:'center',justifyContent:'center'}} >
                        <img src={'/static/Imagebox.png'} style={{height:19,width:19,opacity:0.8,position:'absolute',left:5,marginBottom:2,borderRadius:3,border:'3px dotted black',boxSizing:'border-box'}} />
                        <p style={{fontFamily:'mb',fontSize:17,color:'rgba(0,0,0,0.7)',margin:0}} >Image</p>
                    </button>
                    <button onClick={async()=>{setBannerButtons(bannerButtons=>[...bannerButtons,{parent_id:addWidget.sectionId,id:getId(),margin:0,text:"click button",color:"#00000",backgroundColor:"#fffff",size:17,align:'center',showfont:false,font:'mb'}]);closeEverithing();setAddWidget({active:false,sectionId:null});await update()}} style={{cursor:'pointer',position:'relative',border:'2px solid #CAC2B6',width:'90%',marginTop:10,padding:5,color:'rgba(0,0,0,0.8)',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:3,display:'flex',alignItems:'center',justifyContent:'center'}} >
                        <img src={'/static/button.png'} style={{height:19,width:19,opacity:0.8,position:'absolute',left:5,marginBottom:2,borderRadius:3,border:'3px dotted black',boxSizing:'border-box'}} />
                        <p style={{fontFamily:'mb',fontSize:17,color:'rgba(0,0,0,0.7)',margin:0}} >Button</p>
                    </button>
                    <button onClick={async()=>{setBannerImgs(bannerImgs=>[...bannerImgs,{parent_id:addWidget.sectionId,id:getId(),margin:0,width:15,height:15,cwidth:false,cheight:false,align:'center',src:'',fullw:false,fullh:false}]);closeEverithing();setAddWidget({active:false,sectionId:null});await update()}} style={{cursor:'pointer',position:'relative',border:'2px solid #CAC2B6',width:'90%',marginTop:10,padding:5,color:'rgba(0,0,0,0.8)',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:3,display:'flex',alignItems:'center',justifyContent:'center'}} >
                        <div style={{height:19,width:19,opacity:0.8,position:'absolute',left:5,marginBottom:2,borderRadius:3,border:'3px dotted black',boxSizing:'border-box',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',fontSize:18,fontFamily:'monospace',fontWeight:'bolder',color:'black'}}><p style={{rotate:'45deg'}} >⇿</p></div>
                        <p style={{fontFamily:'mb',fontSize:17,color:'rgba(0,0,0,0.7)',margin:0}} >Container</p>
                    </button>
                    <button onClick={()=>{closeEverithing();setAddSlider({active:true,sectionId:addWidget.sectionId});setAddWidget({active:false,sectionId:null})}} style={{cursor:'pointer',position:'relative',border:'2px solid #CAC2B6',width:'90%',marginTop:10,padding:5,color:'rgba(0,0,0,0.8)',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:3,display:'flex',alignItems:'center',justifyContent:'center'}} >
                        <img src={'/static/Slidingshow.png'} style={{height:26,width:26,opacity:0.8,position:'absolute',left:5}} />
                        <p style={{fontFamily:'mb',fontSize:17,color:'rgba(0,0,0,0.7)',margin:0}} >Sliding show</p>
                    </button>
            </div>

            <div className="addWidget" style={{height:height-65,width:300,borderRight:'2px solid #CAC2B6',overflow:'hidden',boxSizing:'border-box',backgroundColor:'#F6F3EF',position:'absolute',top:65,left:addSection.active?360:60,zIndex:12,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'start'}} >
                    <p style={{fontFamily:'mb',fontSize:19,color:'rgba(0,0,0,0.7)',margin:0,marginTop:15}} >Sections</p>
                    <img src={'/static/shortArrow.png'} onClick={()=>{setAddSection({active:false})}} style={{cursor:'pointer',height:15,width:15,opacity:0.4,transform:'rotate(180deg)',position:'absolute',top:10,right:10}} />
                    
                    <table style={{width:"100%"}}>
                        <tbody style={{width:"100%"}}>
                        {Banners.map((row, index) => (
                            <tr style={{width:"100%",alignContent:'center',display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0)'}}
                            key={row.id}
                            draggable
                            onDragStart={(event) => onDragStart(event, index)}
                            onDragOver={(event) => onDragOver(event, index)}
                            onDrop={onDrop}
                            >
                                <div onClick={()=>{setBanners(Banners => [...Banners].map(b => b.id === row.id ? ({...b, editable:true}) : b))}} style={{cursor:'pointer',border:'2px solid #CAC2B6',width:'90%',margin:'5px 0px',padding:5,color:'rgba(0,0,0,0.8)',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:3,display:'flex',alignItems:'center',justifyContent:'start',position:'relative'}} >
                                    <img src={'/static/3dots.png'} style={{height:23,width:23,opacity:0.7,marginBottom:2,position:'absolute',left:4}} />
                                    <img onClick={()=>Rmb(row.id)} src={'/static/trash.png'} style={{height:15,width:15,opacity:0.7,marginBottom:2,position:'absolute',right:6,cursor:'pointer'}} />
                                    {row.editName?<input onChange={(event=>{setBanners(Banners => [...Banners].map(b => b.id === row.id ? ({...b, name:event.target.value}) : b))})} style={{color:'black',fontFamily:'mb',fontSize:17,backgroundColor:'rgba(0,0,0,0)',border:0,cursor:'pointer',padding:'8px 24px'}} value={row.name} />:<p style={{fontFamily:'mb',fontSize:17,color:'rgba(0,0,0,0.7)',margin:0,padding:'8px 24px'}} >{row.name}</p>}  <img onClick={()=>setBanners(Banners => [...Banners].map(b => b.id === row.id ? ({...b, editName:!row.editName}) : b))} src="/static/pen.png" style={{height:11,width:11,position:'absolute',right:30,cursor:'pointer',opacity:0.7}} />

                                </div>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div onClick={async()=>{let rid=getId();addRef(rid);setBanners(Banners=>[...Banners,{id:rid,editable:true,sticky:false,marginX:0,marginY:0,rows:3,editAll:false,type:newB.type,name:`section ${Banners.length}`,show:true,backgroundColor:'#ffffff',FullHeight:true,FullmHeight:false,size:height-100,image:{align:'flex-end',fullHeight:true,size:height-100}}])}} style={{cursor:'pointer',border:'2px solid #CAC2B6',width:'90%',margin:'5px 0px',padding:5,color:'rgba(0,0,0,0.8)',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin,borderRadius:3,display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}} >
                        <p style={{fontFamily:'mb',fontSize:17,color:'rgba(0,0,0,0.7)',margin:0,padding:'4px 0px'}} >Add section</p>
                    </div>
            </div>

            <div className="addWidget" style={{height:height-65,overflowX:'hidden',overflowY:'scroll',width:240,paddingBottom:10,borderRight:'2px solid #CAC2B6',boxSizing:'border-box',backgroundColor:'#F6F3EF',position:'absolute',top:65,left:addSlider.active?360:120,zIndex:13,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'start'}} >
                    <img src={'/static/shortArrow.png'} onClick={()=>{closeEverithing();setAddWidget({active:true,sectionId:addSlider.sectionId});setAddSlider({active:false,sectionId:null})}} style={{cursor:'pointer',height:15,width:15,opacity:0.4,transform:'rotate(180deg)',position:'absolute',top:10,right:10}} />
                    {/* full section */}
                    <div onClick={async()=>{setShowSliders(showSliders=>[...showSliders,{parent_id:addSlider.sectionId,id:getId(),files:[]}]);setAddSlider({active:false,sectionId:null});await update()}} style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',backgroundColor:'white',border:'2px solid #CAC2B6',borderRadius:3,width:216,cursor:'pointer',marginTop:35}}>
                        <p style={{fontFamily:'mb',fontSize:17,color:'rgba(0,0,0,0.7)',marginBottom:7,marginTop:12}} >Full section</p>
                        <div style={{borderLeft:'2px solid #333333',borderRight:'2px solid #333333',borderTop:'2px solid #333333',width:'90%',height:5,borderTopLeftRadius:3,borderTopRightRadius:3,boxSizing:'border-box'}} ></div>
                        <div style={{backgroundColor:'#333333',width:'90%',height:55,borderRadius:3,marginBottom:12,marginTop:4}} ></div>
                    </div>
                    
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'white',border:'2px solid #CAC2B6',borderRadius:3,width:216,cursor:'pointer',marginTop:10}}>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'47.5%'}} >
                            <p style={{fontFamily:'mb',fontSize:17,color:'rgba(0,0,0,0.7)',marginBottom:7,marginTop:12}} >1/2</p>
                            <div style={{borderLeft:'2px solid #333333',borderRight:'2px solid #333333',borderTop:'2px solid #333333',width:'90%',height:5,borderTopLeftRadius:3,borderTopRightRadius:3,boxSizing:'border-box'}} ></div>
                            <div style={{backgroundColor:'#333333',width:'90%',height:55,borderRadius:3,marginBottom:12,marginTop:4}} ></div>
                        </div>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'47.5%'}} >
                            <p style={{fontFamily:'mb',fontSize:17,color:'rgba(0,0,0,0.7)',marginBottom:7,marginTop:12}} >1/2</p>
                            <div style={{borderLeft:'2px solid #333333',borderRight:'2px solid #333333',borderTop:'2px solid #333333',width:'90%',height:5,borderTopLeftRadius:3,borderTopRightRadius:3,boxSizing:'border-box'}} ></div>
                            <div style={{backgroundColor:'#333333',width:'90%',height:55,borderRadius:3,marginBottom:12,marginTop:4}} ></div>
                        </div>
                    </div>

                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'white',border:'2px solid #CAC2B6',borderRadius:3,width:216,cursor:'pointer',marginTop:10}}>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'30.8%'}} >
                            <p style={{fontFamily:'mb',fontSize:17,color:'rgba(0,0,0,0.7)',marginBottom:7,marginTop:12}} >1/3</p>
                            <div style={{borderLeft:'2px solid #333333',borderRight:'2px solid #333333',borderTop:'2px solid #333333',width:'90%',height:5,borderTopLeftRadius:3,borderTopRightRadius:3,boxSizing:'border-box'}} ></div>
                            <div style={{backgroundColor:'#333333',width:'90%',height:55,borderRadius:3,marginBottom:12,marginTop:4}} ></div>
                        </div>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'30.8%'}} >
                            <p style={{fontFamily:'mb',fontSize:17,color:'rgba(0,0,0,0.7)',marginBottom:7,marginTop:12}} >1/3</p>
                            <div style={{borderLeft:'2px solid #333333',borderRight:'2px solid #333333',borderTop:'2px solid #333333',width:'90%',height:5,borderTopLeftRadius:3,borderTopRightRadius:3,boxSizing:'border-box'}} ></div>
                            <div style={{backgroundColor:'#333333',width:'90%',height:55,borderRadius:3,marginBottom:12,marginTop:4}} ></div>
                        </div>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'30.8%'}} >
                            <p style={{fontFamily:'mb',fontSize:17,color:'rgba(0,0,0,0.7)',marginBottom:7,marginTop:12}} >1/3</p>
                            <div style={{borderLeft:'2px solid #333333',borderRight:'2px solid #333333',borderTop:'2px solid #333333',width:'90%',height:5,borderTopLeftRadius:3,borderTopRightRadius:3,boxSizing:'border-box'}} ></div>
                            <div style={{backgroundColor:'#333333',width:'90%',height:55,borderRadius:3,marginBottom:12,marginTop:4}} ></div>
                        </div>
                    </div>

                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'white',border:'2px solid #CAC2B6',borderRadius:3,width:216,cursor:'pointer',marginTop:10}}>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'22.5%'}} >
                            <p style={{fontFamily:'mb',fontSize:17,color:'rgba(0,0,0,0.7)',marginBottom:7,marginTop:12}} >1/4</p>
                            <div style={{borderLeft:'2px solid #333333',borderRight:'2px solid #333333',borderTop:'2px solid #333333',width:'90%',height:5,borderTopLeftRadius:3,borderTopRightRadius:3,boxSizing:'border-box'}} ></div>
                            <div style={{backgroundColor:'#333333',width:'90%',height:55,borderRadius:3,marginBottom:12,marginTop:4}} ></div>
                        </div>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'22.5%'}} >
                            <p style={{fontFamily:'mb',fontSize:17,color:'rgba(0,0,0,0.7)',marginBottom:7,marginTop:12}} >1/4</p>
                            <div style={{borderLeft:'2px solid #333333',borderRight:'2px solid #333333',borderTop:'2px solid #333333',width:'90%',height:5,borderTopLeftRadius:3,borderTopRightRadius:3,boxSizing:'border-box'}} ></div>
                            <div style={{backgroundColor:'#333333',width:'90%',height:55,borderRadius:3,marginBottom:12,marginTop:4}} ></div>
                        </div>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'22.5%'}} >
                            <p style={{fontFamily:'mb',fontSize:17,color:'rgba(0,0,0,0.7)',marginBottom:7,marginTop:12}} >1/4</p>
                            <div style={{borderLeft:'2px solid #333333',borderRight:'2px solid #333333',borderTop:'2px solid #333333',width:'90%',height:5,borderTopLeftRadius:3,borderTopRightRadius:3,boxSizing:'border-box'}} ></div>
                            <div style={{backgroundColor:'#333333',width:'90%',height:55,borderRadius:3,marginBottom:12,marginTop:4}} ></div>
                        </div>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'22.5%'}} >
                            <p style={{fontFamily:'mb',fontSize:17,color:'rgba(0,0,0,0.7)',marginBottom:7,marginTop:12}} >1/4</p>
                            <div style={{borderLeft:'2px solid #333333',borderRight:'2px solid #333333',borderTop:'2px solid #333333',width:'90%',height:5,borderTopLeftRadius:3,borderTopRightRadius:3,boxSizing:'border-box'}} ></div>
                            <div style={{backgroundColor:'#333333',width:'90%',height:55,borderRadius:3,marginBottom:12,marginTop:4}} ></div>
                        </div>
                    </div>

                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'white',border:'2px solid #CAC2B6',borderRadius:3,width:216,cursor:'pointer',marginTop:10}}>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'30.8%'}} >
                            <p style={{fontFamily:'mb',fontSize:17,color:'rgba(0,0,0,0.7)',marginBottom:7,marginTop:12}} >1/3</p>
                            <div style={{borderLeft:'2px solid #333333',borderRight:'2px solid #333333',borderTop:'2px solid #333333',width:'90%',height:5,borderTopLeftRadius:3,borderTopRightRadius:3,boxSizing:'border-box'}} ></div>
                            <div style={{backgroundColor:'#333333',width:'90%',height:55,borderRadius:3,marginBottom:12,marginTop:4}} ></div>
                        </div>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'61.6%'}} >
                            <p style={{fontFamily:'mb',fontSize:17,color:'rgba(0,0,0,0.7)',marginBottom:7,marginTop:12}} >2/3</p>
                            <div style={{borderLeft:'2px solid #333333',borderRight:'2px solid #333333',borderTop:'2px solid #333333',width:'90%',height:5,borderTopLeftRadius:3,borderTopRightRadius:3,boxSizing:'border-box'}} ></div>
                            <div style={{backgroundColor:'#333333',width:'90%',height:55,borderRadius:3,marginBottom:12,marginTop:4}} ></div>
                        </div>
                    </div>

                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'white',border:'2px solid #CAC2B6',borderRadius:3,width:216,cursor:'pointer',marginTop:10}}>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'22.5%'}} >
                            <p style={{fontFamily:'mb',fontSize:17,color:'rgba(0,0,0,0.7)',marginBottom:7,marginTop:12}} >1/4</p>
                            <div style={{borderLeft:'2px solid #333333',borderRight:'2px solid #333333',borderTop:'2px solid #333333',width:'90%',height:5,borderTopLeftRadius:3,borderTopRightRadius:3,boxSizing:'border-box'}} ></div>
                            <div style={{backgroundColor:'#333333',width:'90%',height:55,borderRadius:3,marginBottom:12,marginTop:4}} ></div>
                        </div>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'67.5%'}} >
                            <p style={{fontFamily:'mb',fontSize:17,color:'rgba(0,0,0,0.7)',marginBottom:7,marginTop:12}} >3/4</p>
                            <div style={{borderLeft:'2px solid #333333',borderRight:'2px solid #333333',borderTop:'2px solid #333333',width:'90%',height:5,borderTopLeftRadius:3,borderTopRightRadius:3,boxSizing:'border-box'}} ></div>
                            <div style={{backgroundColor:'#333333',width:'90%',height:55,borderRadius:3,marginBottom:12,marginTop:4}} ></div>
                        </div>
                        
                    </div>

                    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',backgroundColor:'white',border:'2px solid #CAC2B6',borderRadius:3,width:216,cursor:'pointer',marginTop:10}}>
                        <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',marginBottom:7,marginTop:12}}>
                            <p style={{fontFamily:'mb',fontSize:17,color:'rgba(0,0,0,0.7)',margin:0}} >Custom</p>
                            <img src={'/static/pen.png'} style={{height:14,width:14,opacity:0.7,marginLeft:7}} />
                        </div>
                        <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',width:'100%'}}>
                            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'22.5%'}} >
                                <div style={{borderLeft:'2px solid #333333',borderRight:'2px solid #333333',borderTop:'2px solid #333333',width:'90%',height:5,borderTopLeftRadius:3,borderTopRightRadius:3,boxSizing:'border-box'}} ></div>
                                <div style={{backgroundColor:'#333333',width:'90%',height:55,borderRadius:3,marginBottom:12,marginTop:4}} ></div>
                            </div>
                            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'22.5%'}} >
                                <div style={{borderLeft:'2px solid #333333',borderRight:'2px solid #333333',borderTop:'2px solid #333333',width:'90%',height:5,borderTopLeftRadius:3,borderTopRightRadius:3,boxSizing:'border-box'}} ></div>
                                <div style={{backgroundColor:'#333333',width:'90%',height:55,borderRadius:3,marginBottom:12,marginTop:4}} ></div>
                            </div>
                            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'45%'}} >
                                <div style={{borderLeft:'2px solid #333333',borderRight:'2px solid #333333',borderTop:'2px solid #333333',width:'90%',height:5,borderTopLeftRadius:3,borderTopRightRadius:3,boxSizing:'border-box'}} ></div>
                                <div style={{backgroundColor:'#333333',width:'90%',height:55,borderRadius:3,marginBottom:12,marginTop:4}} ></div>
                            </div>
                        </div>
                    </div>
            </div>
        


            <div style={{position:'absolute',width:width-370,height:height-75,right:5,top:70,overflowY:'scroll',overflowX:'hidden',scrollbarWidth: 'none', msOverflowStyle:'none',boxShadow:'0 0 5px 5px #CAC2B6'}} >
            {/* <DefaultT width={width-460} MaxWidth={true} height={height} banners={Banners} bannerTexts={bannerTexts} bannerImgs={bannerImgs} bannerDivs={bannerDivs} bannerProducts={products} storeProducts={storeProducts}   /> */}
                
                {/* <DefaultT width={width-460} MaxWidth={true} height={height} banners={Banners} bannerTexts={bannerTexts} bannerImgs={bannerImgs} bannerDivs={bannerDivs} bannerProducts={products} storeProducts={storeProducts}   /> */}
                {pagen=="home"?<DefaultT selectWidget={handleSelection} width={width-360} MaxWidth={true} showSliders={showSliders} height={height-65} banners={Banners} bannerTexts={bannerTexts} bannerImgs={bannerImgs} bannerButtons={bannerButtons} bannerDivs={bannerDivs} bannerProducts={products} storeProducts={storeProducts} editing={true} bannerInUse={bannerInUse}  />:<ProductT editing={true} width={width-360} height={height-65} banners={Banners} bannerTexts={bannerTexts} bannerImgs={bannerImgs} bannerDivs={bannerDivs} productStyle={productStyle} product={{colors:['#000000'],files:['../static/plu.png']}}  />}
                
                
                
            </div>
    </div>
        );
    }else{ 
        
        return(<p>redirecting...</p>)
    }
}





export default Admin;


