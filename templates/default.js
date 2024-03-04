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
    let bannerImgs = p.bannerImgs? p.bannerImgs:[]
    let bannerdivs = p.bannerDivs? p.bannerDivs:[]
    let banners = p.banners? p.banners:[]
    let bannerProducts = p.bannerProducts? p.bannerProducts:[]
    let storeProducts = p.storeProducts? p.storeProducts:[]
    let sumheight = 0
    // let bannerStyle = p.bannerStyle? p.bannerStyle:{color:'#fffff'}
    // let productsStyle = p.productsStyle? p.productsStyle:{color:'#fffff'}
    let ok = [{img:"https://i.ebayimg.com/images/g/6rsAAOSw3iphuJTp/s-l1200.webp",title:"Tie ping",price:"110"},{img:"https://i.ebayimg.com/images/g/Do8AAOSwsR5kV3rA/s-l1600.jpg",title:"Casual tie",price:"260"},{img:"https://i.ebayimg.com/images/g/PzMAAOSwfkllOuXh/s-l1200.webp",title:"AP Royal Oak",price:"21k"},{img:"https://i.ebayimg.com/images/g/xigAAOSwyXdk7-Z7/s-l1200.webp",title:"Lether stripes",price:"2250"},{img:"https://i.pinimg.com/1200x/d5/9e/94/d59e949ac05b319d06588d696a996d74.jpg",title:"Pinky ring",price:"590"},{img:"https://habituallychic.luxury/wp-content/uploads/2021/08/signet-rings-history-etiquette-habituallychic-005.jpeg",title:"Vintage ring",price:"860"}]

    return (
        <div className="default" style={{display:'flex',flexDirection:'column'}} >

        

        {
            banners.map((x,yy)=>{
                if (x.type != 'products') {

                let bheight = !x.FullHeight?yy!=0 && x.FullmHeight?height-sumheight:x.size:height
                    
                return(
                    <div style={{marginTop:0,width:'100%',display:'flex',justifyContent:"center",alignItems:'center',backgroundColor:x.backgroundColor,position:'relative',height:!x.FullHeight?yy!=0 && x.FullmHeight?height-sumheight:x.size:height,flexDirection:'column'}} >
                        <p style={{height:0,fontSize:0,color:'rgba(0,0,0,0)'}} >{sumheight += !x.FullHeight?x.FullmHeight?height-sumheight:x.size:height}</p>
                        {/* <img src={banner} style={{alignSelf:bannerStyle.image.align,height:bannerStyle.image.FullHeight?'100%':bannerStyle.image.size,position:'absolute',zIndex:1}} /> */}
                        {
                            bannerdivs.map((bannerdiv,y)=>{
                                if (bannerdiv.parent == x.id){
                                    return(
                                        <div key={y} style={{justifyContent:'center',display:'flex',flexDirection:bannerdiv.fdirection,alignSelf:bannerdiv.align,marginBottom:bannerdiv.y,marginLeft:bannerdiv.marginH,marginRight:bannerdiv.marginH,position:'absolute',zIndex:2}} >
                                            {
                                                bannerTexts.map((bannerText,i)=>{
                                                    if (bannerText.parent_id == bannerdiv.id) {
                                                        return(
                                                            <h2 key={i} style={{margin:bannerText.margin,fontFamily:''+bannerText.font+'',color:bannerText.color,fontSize:bannerText.size,fontStretch:'ultra-expanded',marginTop:-8,alignSelf:bannerText.align}} >{bannerText.text}</h2>
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
                                                                <img src={`/uploads/${bannerImg.src}`} style={{height:!bannerImg.fullh?bannerImg.cheight?'auto':bannerImg.height:bheight,width:!bannerImg.fullw?bannerImg.cwidth?'auto':bannerImg.width:width,margin:bannerImg.margin}} />
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
                if (bannerProducts[0]) {
                return (
                    <div style={{width:'100%',display:'flex',alignItems:'center',backgroundColor:x.backgroundColor,justifyContent:'center',paddingBottom:50,position:'relative'}} >
                        <div style={{height:1,width:'70%',backgroundColor:'black',position:'absolute',top:0}} ></div>
                        <div style={{height:1,width:'70%',backgroundColor:'black',position:'absolute',bottom:0}} ></div>
                        <div style={{width:(bannerProducts[0].image.size+x.marginX*2)*x.rows,maxWidth:width,backgroundColor:'rgba(0,0,0,0)'}}  class="folders">
                            {
                                bannerProducts.map((product,i)=>{
                                    return(
                                        <div key={i} style={{backgroundColor:'rgba(0,0,0,0)',width:product.image.size,borderRadius:20,marginLeft:x.marginX,marginRight:x.marginX,marginTop:x.marginY,marginBottom:x.marginY,display:'flex',flexDirection:'column'}} className="folder">
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
