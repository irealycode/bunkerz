import React from 'react';
import { Link,useNavigate,useParams } from "react-router-dom";
import logo from '../assets/bunker.png'
import '../style/home.css'
import categos from '../assets/stripes.png'
import search from '../assets/search.png'
import shopbag from '../assets/shopbag.png'
import banner from '../assets/fashion.jpg'


function DefaultT(p) {
    // console.log(h)
    let height = p.height? p.height:window.innerHeight
    let width = p.width? p.width: window.innerWidth
    let bannerTexts = p.bannerTexts? p.bannerTexts:[]
    let bannerButtons = p.bannerButtons? p.bannerButtons:[]
    let bannerImgs = p.bannerImgs? p.bannerImgs:[]
    let showSliders = p.showSliders? p.showSliders:[]
    let bannerdivs = p.bannerDivs? p.bannerDivs:[]
    let banners = p.banners? p.banners:[]
    let bannerProducts = p.bannerProducts? p.bannerProducts:[]
    let storeProducts = p.storeProducts? p.storeProducts:[]
    let editing = p.editing? p.editing:false
    let bannerInUse = p.bannerInUse
    let MaxWidth = 0
    let sumheight = 0
    const actions = ["none","search","pages","products","home","cart"]
    let actionCpy = [false,false,false,false,false,false]
    const [actionTrigger,setActionTrigger] = React.useState([false,false,false,false,false,false])
    const [search,setSearch] = React.useState('')
    const [cart,setCart] = React.useState([])
    const [sectionInUse,setSectionInUse] = React.useState("")
    const [showSlidersPage,setShowSlidersPage] = React.useState([])
    // let bannerStyle = p.bannerStyle? p.bannerStyle:{color:'#fffff'}
    // let productsStyle = p.productsStyle? p.productsStyle:{color:'#fffff'}
    // let ok = [{img:"https://i.ebayimg.com/images/g/6rsAAOSw3iphuJTp/s-l1200.webp",title:"Tie ping",price:"110"},{img:"https://i.ebayimg.com/images/g/Do8AAOSwsR5kV3rA/s-l1600.jpg",title:"Casual tie",price:"260"},{img:"https://i.ebayimg.com/images/g/PzMAAOSwfkllOuXh/s-l1200.webp",title:"AP Royal Oak",price:"21k"},{img:"https://i.ebayimg.com/images/g/xigAAOSwyXdk7-Z7/s-l1200.webp",title:"Lether stripes",price:"2250"},{img:"https://i.pinimg.com/1200x/d5/9e/94/d59e949ac05b319d06588d696a996d74.jpg",title:"Pinky ring",price:"590"},{img:"https://habituallychic.luxury/wp-content/uploads/2021/08/signet-rings-history-etiquette-habituallychic-005.jpeg",title:"Vintage ring",price:"860"}]

    React.useEffect(()=>{
        let crt = JSON.parse(localStorage.getItem("cart"))
        crt = crt?crt:{"cart":[]}
        setCart(crt.cart)
    },[])

    const activateAction = (action,b) => {
        if (!editing) {
            if (action && actions.indexOf(action)>=1) {
                console.log('dick')
                actionCpy[actions.indexOf(action)] = !actionTrigger[actions.indexOf(action)]
                setActionTrigger(actionCpy)
                console.log("clicked",actionCpy[actions.indexOf(action)])
            }
            if(action == "home"){
                window.location.assign('/')
            }else if(action == "products"){
                if (b.productLink) {
                    window.location.href = "/product/"+b.productLink.pid
                }
            }
        }else{
            // console.log('ch')
            setSectionInUse(b.parent_id)
            p.selectWidget(b)
        }
    }

    document.addEventListener('click', function(event) {
        var myDiv = event.target.closest('.banner');
    
        if (myDiv) {
            if (event.target === myDiv) {
                setSectionInUse(null)
            }
        }
    });

    const searchAndUpdate = (id, direction,limit) => {
        const index = showSlidersPage.findIndex(item => item.id === id);
            if (index !== -1) {
                // alert(Math.abs(showSlidersPage[index].page)+direction)
                if ((Math.abs(showSlidersPage[index].page) !=limit-1 && direction<0) || (Math.abs(showSlidersPage[index].page)!=0 && direction>0)) {
                    const updatedData = [...showSlidersPage];
                    updatedData[index] = { ...updatedData[index], page: updatedData[index].page + direction };
                    setShowSlidersPage(updatedData);

                }
            } else {
            setShowSlidersPage(prevData => [...prevData, { id: id, page: direction === -1 ? -1 : 0 }]);
            }
      };
    
    
   

    // <div key={y} style={{justifyContent:'center',display:'flex',flexDirection:bannerdiv.fdirection,marginBottom:bannerdiv.y,left:bannerdiv.align==0?0:bannerdiv.align==1?'50%':'auto',transform:bannerdiv.align==1?'translateX(-50%)':'translateX(0px)',whiteSpace:'nowrap',right:bannerdiv.align==2?0:'auto',marginLeft:bannerdiv.marginH,marginRight:bannerdiv.marginH,position:'absolute',zIndex:2,position:'absolute'}} >

      console.log(showSlidersPage)

    // right:bannerdiv.x>0.1?width/2-(bannerdiv.x*width/2):'auto',left:bannerdiv.x<-0.1?width/2-(bannerdiv.x*width*-1/2):'auto',alignSelf:bannerdiv.x>=-0.1 && bannerdiv.x<=0.1?'center':'auto'
    return (
        <div className="default" style={{display:'flex',flexDirection:'column',position:'relative'}} >

            


        {
            banners.map((x,yy)=>{
                if (x.type != 'products') {
                let bheight = !x.FullHeight?yy!=0 && x.FullmHeight?height-sumheight:x.size:height
                // console.log(width)
                return(
                    <div className={"banner b"+yy} key={yy} style={{marginTop:0,border:editing && x.id == bannerInUse?'0px solid rgba(0,0,0,0)':0,animationName:'blinking',animationDuration:'5s',animationIterationCount:100000,boxSizing:'border-box',width:'100%',display:'flex',justifyContent:"center",overflow:'hidden',backgroundColor:x.backgroundColor,position:x.sticky?'sticky':'relative',top:0,zIndex:x.sticky?3:1,height:!x.FullHeight?yy!=0 && x.FullmHeight?height-sumheight:x.HequalW?width*x.HequalWR/100:x.size:height,flexDirection:'column'}} >
                        <p style={{height:0,fontSize:0,color:'rgba(0,0,0,0)'}} >{sumheight += !x.FullHeight?x.FullmHeight?height-sumheight:x.size:height}</p>
                        {/* <img src={banner} style={{alignSelf:bannerStyle.image.align,height:bannerStyle.image.FullHeight?'100%':bannerStyle.image.size,position:'absolute',zIndex:1}} /> */}
                        {
                            bannerdivs.map((bannerdiv,y)=>{
                                if (bannerdiv.parent == x.id){
                                    // console.log("active:",bannerdiv.width)
                                    // console.log('sl',sectionInUse)
                                    let rightPosition = !bannerdiv.Xswitch?bannerdiv.align>0.05?((0.5-(1/2)*bannerdiv.align)*width):'auto':bannerdiv.alignpx?bannerdiv.align:bannerdiv.align.toString()+'%'
                                    let leftPosition = !bannerdiv.Xswitch?bannerdiv.align<-0.05?((0.5-(1/2)*bannerdiv.align*-1)*width):bannerdiv.align >= -0.05 && bannerdiv.align <= 0.05?'50%':'auto':'auto'
                                    let bottomPosition = !bannerdiv.Yswitch?bannerdiv.y>0?((0.5-(1/2)*bannerdiv.y)*x.size):'auto':bannerdiv.ypx?bannerdiv.y:bannerdiv.y.toString()+'%'
                                    let topPosition = !bannerdiv.Yswitch?bannerdiv.y<0?((0.5-(1/2)*bannerdiv.y*-1)*x.size):'auto':'auto'
                                    let divheight = bannerdiv.height?bannerdiv.hdivpx?bannerdiv.height:bannerdiv.height.toString()+'%':'auto'
                                    let divWidth = bannerdiv.width?bannerdiv.wdivpx?bannerdiv.width:bannerdiv.width.toString()+'%':'auto'
                                    return(
                                        <div key={y} style={{border:editing && bannerdiv.id == sectionInUse?'2px dotted #ff9900':0,boxSizing:'border-box',width:divWidth,height:divheight,justifyContent:'center',display:'flex',flexDirection:bannerdiv.fdirection,right:rightPosition,left:leftPosition,transform:bannerdiv.align >= -0.1 && bannerdiv.align <= 0.1?'translateX(-50%)':'translateX(0px)',whiteSpace:'nowrap',bottom:bottomPosition,top:topPosition,marginLeft:bannerdiv.marginH,marginRight:bannerdiv.marginH,zIndex:2,position:'absolute'}} >
                                            {
                                                bannerTexts.map((bannerText,i)=>{
                                                    if (bannerText.parent_id == bannerdiv.id) {
                                                        const txtMargin = `${bannerText.marginV?bannerText.marginV.toString():'0'}px ${bannerText.marginH?bannerText.marginH.toString():'0'}px`
                                                        return(
                                                            <h5 onClick={()=>{activateAction(bannerText.action,bannerText)}} key={i} style={{cursor:bannerText.action?"pointer":"default",textAlign:bannerText.textAlign?bannerText.textAlign:'center',whiteSpace:bannerText.jline?'pre-line':'nowrap',margin:txtMargin,fontFamily:''+bannerText.font+'',color:bannerText.color,fontSize:bannerText.size,fontStretch:'ultra-expanded',alignSelf:bannerText.align}} >{bannerText.text}</h5>
                                                        )
                                                    }else{
                                                        return null
                                                    }
                                                })
                                            }
                                            {
                                                bannerButtons.map((bannerButton,i)=>{
                                                    if (bannerButton.parent_id == bannerdiv.id) {
                                                        const btnMargin = `${bannerButton.marginV?bannerButton.marginV.toString():'0'}px ${bannerButton.marginH?bannerButton.marginH.toString():'0'}px`
                                                        const btnPadding =`${bannerButton.paddingV?bannerButton.paddingV.toString():'0'}px ${bannerButton.paddingH?bannerButton.paddingH.toString():'0'}px`
                                                        return(
                                                            <h2 onClick={()=>{activateAction(bannerButton.action,bannerButton)}} key={i} style={{cursor:"pointer",borderRadius:bannerButton.borderRadius,textAlign:bannerButton.textAlign?bannerButton.textAlign:'center',backgroundColor:bannerButton.backgroundColor,whiteSpace:bannerButton.jline?'pre-line':'nowrap',margin:btnMargin,padding:btnPadding,fontFamily:''+bannerButton.font+'',color:bannerButton.color,fontSize:bannerButton.size,fontStretch:'ultra-expanded',alignSelf:bannerButton.align}} >{bannerButton.text}</h2>
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
                                                            let finalHeight = !bannerImg.fullh?bannerImg.cheight?'auto':bannerImg.heightpx?parseInt(bannerImg.height):(bannerImg.height).toString()+'%':bheight
                                                            let finalWidth = !bannerImg.fullw?bannerImg.cwidth?'auto':bannerImg.widthpx?parseInt(bannerImg.width):(bannerImg.width).toString()+'%':width
                                                            // console.log('f',finalHeight,bannerImg.id)
                                                            // console.log('w',finalWidth,bannerImg.id)
                                                            return(
                                                                <img onClick={()=>{activateAction(bannerImg.action,bannerImg)}} key={i} src={`/uploads/${bannerImg.src}`} style={{cursor:bannerImg.action?"pointer":"default",height:finalHeight,width:finalWidth,margin:bannerImg.margin}} />
                                                                )
                                                        }else{
                                                            return null
                                                        }
                                                        
                                                    }else{
                                                        return null
                                                    }
                                                })
                                            }
                                            {
                                                showSliders.map((showSlider,i)=>{
                                                    if (showSlider.parent_id == bannerdiv.id && showSlider.files) {
                                                            return(
                                                                <div style={{width:'100%',height:'100%',position:'relative',overflow:'hidden',backgroundColor:'black',display:'flex',justifyContent:'center',alignItems:'center'}} >
                                                                    <img onClick={()=>searchAndUpdate(showSlider.id,1,showSlider.files.length)} src={'/static/shortArrow.png'} style={{opacity:0.7,height:20,width:20,position:'absolute',left:10,zIndex:2,rotate:'180deg',cursor:'pointer'}} />
                                                                    <img onClick={()=>searchAndUpdate(showSlider.id,-1,showSlider.files.length)} src={'/static/shortArrow.png'} style={{opacity:0.7,height:20,width:20,position:'absolute',right:10,zIndex:2,cursor:'pointer'}} />
                                                                    {showSlider.files.map((slide,ii)=>{
                                                                        let leftR = ((showSlidersPage[i]?showSlidersPage[i].page:0)*100 + ii*100).toString()
                                                                        // console.log(color,leftR)
                                                                        return(
                                                                            <div className="addWidget" style={{width:'100%',height:'100%',backgroundColor:'rgba(0,0,0,0)',position:'absolute',top:0,left:`${leftR}%`,overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}} >
                                                                                <img src={editing?slide.lastModified?URL.createObjectURL(slide):`/uploads/${slide}`:`/uploads/${slide}`} style={{width:'100%'}} />
                                                                            </div>
                                                                        )
                                                                    })}
                                                                    
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
                                    return null
                                }
                                

                            })
                        }
                    </div>
                )
            }else{
                if (bannerProducts[0]) {
                return (
                    <div style={{width:'100%',display:'flex',alignItems:'center',backgroundColor:x.backgroundColor,justifyContent:'center',paddingBottom:50,position:'relative'}} >
                        <div style={{height:1,width:'70%',backgroundColor:'black',position:'absolute',top:0}} ></div>
                        <div style={{height:1,width:'70%',backgroundColor:'black',position:'absolute',bottom:0}} ></div>
                        <div style={{width:(bannerProducts[0].image.size+x.marginX*2)*x.rows,maxWidth:width,backgroundColor:'rgba(0,0,0,0)'}}  class="folders">
                            {
                                storeProducts.map((product,i)=>{
                                    return(
                                        <div key={i} onClick={()=>window.location.assign('/product/'+storeProducts[i].pid)} style={{backgroundColor:'rgba(0,0,0,0)',cursor:"pointer",width:product.image.size,borderRadius:20,marginLeft:x.marginX,marginRight:x.marginX,marginTop:x.marginY,marginBottom:x.marginY,display:'flex',flexDirection:'column'}} className="folder">
                                            <img src={'/uploads/'+storeProducts[i].files[0]} style={{height:product.image.size,width:product.image.size,borderRadius:product.image.borderRadius,border:''+product.image.borderWidth+'px solid '+product.image.color,alignSelf:'center'}} />
                                            <p style={{fontFamily:product.title.font,fontSize:parseInt(product.title.size),marginTop:10,color:product.title.color,alignSelf:product.title.align}} >{storeProducts[i].title}</p>
                                            <p style={{fontFamily:product.price.font,fontSize:parseInt(product.price.size),marginTop:-20,color:product.price.color,alignSelf:product.price.align}} >{storeProducts[i].price}$</p>
                                        </div>
                                    )
                                }
                                )
                            }
                        </div>
                        
                    </div>
                )
                }else{
                    return null
                }
            }
            })
        }
        

        <div className="retractableBanner" style={{position:'absolute',zIndex:4,height:height-70,top:70,right:0,backgroundColor:'white',width:actionTrigger[1]?500:0,overflowX:'hidden',overflowY:'scroll'}} >
                <div style={{position:'absolute',width:500,height:height-70,top:0,right:0,alignItems:'center',display:'flex',flexDirection:'column'}} >
                    <input value={search} onChange={(event=>setSearch(event.target.value))} style={{width:'80%',height:35,borderRadius:30,border:'2px solid black',paddingRight:15,paddingLeft:15,fontFamily:'monospace',fontWeight:'bolder',fontSize:16,marginTop:10}} placeholder="Search products..."  />
                    <div style={{width:400,maxWidth:500,backgroundColor:'rgba(0,0,0,0)',marginTop:20}}  class="folders">
                            {
                                storeProducts.map((product,i)=>{
                                    if (storeProducts[i].title.toLowerCase().indexOf(search.toLowerCase()) != -1) {
                                        return(
                                            <div onClick={()=>window.location.assign('/product/'+storeProducts[i].pid)} key={i} style={{backgroundColor:'rgba(0,0,0,0)',cursor:'pointer',width:500*0.3,borderRadius:20,marginLeft:10,marginRight:10,marginTop:10,marginBottom:10,display:'flex',flexDirection:'column'}} className="folder">
                                                <img src={'/uploads/'+storeProducts[i].files[0]} style={{height:500*0.3,width:500*0.3,borderRadius:5,border:0,alignSelf:'center'}} />
                                                <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:16,marginTop:10,color:'black',alignSelf:'center'}} >{storeProducts[i].title}</p>
                                                <p style={{fontFamily:'monospace',fontSize:16,marginTop:-10,color:'black',alignSelf:'center'}} >{storeProducts[i].price}$</p>
                                            </div>
                                        )
                                    }
                                    
                                }
                                )
                            }
                        </div>
                </div>
            </div>

        <div className="retractableBanner" style={{position:'absolute',zIndex:4,height:height-70,top:70,right:0,backgroundColor:'white',width:actionTrigger[5]?350:0,overflowX:'hidden',overflowY:'scroll'}} >
            <div style={{position:'absolute',width:350,height:height-70,top:0,right:0,alignItems:'center',display:'flex',flexDirection:'column'}} >
                <h1 style={{marginTop:20,fontFamily:'monospace',fontWeight:'bolder',fontSize:16,color:'rgba(0,0,0,0.5)',alignSelf:'start'}} >Shopping cart</h1>
                <h1 onClick={()=>{localStorage.removeItem("cart");setCart([])}} style={{marginTop:20,fontFamily:'monospace',fontWeight:'bolder',fontSize:12,cursor:'pointer',color:'red',alignSelf:'start',position:'absolute',right:10}} >clear cart</h1>
                {cart[0]?null:<h1 style={{marginTop:20,fontFamily:'monospace',color:'rgba(0,0,0,0.4)',fontWeight:'bolder',fontSize:16}} >go fill it up...</h1>}
                <div>
                    {
                        cart.map((order)=>{
                            return(
                                <div style={{width:350,display:'flex',flexDirection:'row',borderBottom:'1px solid black',alignItems:'center',padding:10}} >
                                    <img src={'/uploads/'+order.image} style={{height:70,width:70,borderRadius:5,marginLeft:10}} />
                                    <div style={{marginLeft:20}} >
                                        <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:20,marginLeft:10,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.9)'}} >{order.title}</p>
                                        <p style={{fontFamily:'monospace',color:'rgba(0,0,0,0.7)',fontSize:12,marginLeft:10,marginTop:0,marginBottom:0}} >{order.price}$</p>
                                    </div>
                                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',marginLeft:20}} >
                                        <img src={'/static/plus.png'} style={{cursor:'pointer',height:20,width:20}} />
                                        <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:17,marginLeft:10,marginRight:10,color:'rgba(0,0,0,0.8)'}} >{order.qts!=""?order.qts:"1"}</p>
                                        <img src={'/static/minus.png'} style={{cursor:'pointer',height:20,width:20}} />

                                    </div>
                                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',marginLeft:20}} >
                                        <p style={{fontFamily:'monospace',fontWeight:'bolder',fontSize:12,margin:0,color:'rgba(0,0,0,0.7)'}} >color</p>
                                        <div style={{height:20,width:20,borderRadius:20,backgroundColor:order.color,marginLeft:5}} ></div>
                                    </div>
                                    
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        

        
        
        {/* <div style={{position:'relative',alignItems:'center',display:'flex',justifyContent:'center',marginTop:20,flexDirection:'column'}} >
            <h1 style={{fontFamily:'al'}} >Contact Us</h1>
            <input placeholder="Full Name" style={{paddingLeft:15,paddingTop:10,paddingBottom:8,width:'40%',maxWidth:300,borderRadius:10,border:'2px solid black',fontFamily:'al',color:'black'}} />
            <input type="email" placeholder="Email" style={{paddingLeft:15,paddingTop:10,paddingBottom:8,width:'50%',maxWidth:400,borderRadius:10,border:'2px solid black',fontFamily:'al',color:'black',marginTop:20}} />
            <textarea placeholder="Message..." style={{paddingLeft:15,paddingTop:10,paddingBottom:8,width:'50%',maxWidth:400,borderRadius:10,border:'2px solid black',fontFamily:'al',color:'black',marginTop:20,height:200}} />
            <button style={{display:'flex',flexDirection:'row',alignSelf:'center',alignItems:'center',justifyContent:'center',backgroundColor:'black',border:0,fontFamily:'al',color:'white',padding:'10px 30px',borderRadius:10,marginTop:20,marginBottom:20}} >
                send                
            </button>
            <h1 style={{fontFamily:'ns',fontSize:20}} >bunkerz ©</h1>
        </div> */}
    </div>
    )
}

export default DefaultT;
