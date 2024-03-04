import React from 'react';
import { Link,useNavigate,useParams } from "react-router-dom";
import logo from '../assets/bunker.png'
import '../style/home.css'
import categos from '../assets/stripes.png'
import search from '../assets/search.png'
import shopbag from '../assets/shopbag.png'
import banner from '../assets/fashion.jpg'


function ProductT(p) {
    // console.log(h)
    let height = p.height? p.height:window.innerHeight
    let width = p.width? p.width: window.innerWidth
    let bannerTexts = p.bannerTexts? p.bannerTexts:[]
    let bannerImgs = p.bannerImgs? p.bannerImgs:[]
    let bannerdivs = p.bannerDivs? p.bannerDivs:[]
    let banners = p.banners? p.banners:[]
    let product = p.product?p.product:{}
    let sumheight = 0
    // let bannerStyle = p.bannerStyle? p.bannerStyle:{color:'#fffff'}
    // let productsStyle = p.productsStyle? p.productsStyle:{color:'#fffff'}
    // let ok = [{img:"https://i.ebayimg.com/images/g/6rsAAOSw3iphuJTp/s-l1200.webp",title:"Tie ping",price:"110"},{img:"https://i.ebayimg.com/images/g/Do8AAOSwsR5kV3rA/s-l1600.jpg",title:"Casual tie",price:"260"},{img:"https://i.ebayimg.com/images/g/PzMAAOSwfkllOuXh/s-l1200.webp",title:"AP Royal Oak",price:"21k"},{img:"https://i.ebayimg.com/images/g/xigAAOSwyXdk7-Z7/s-l1200.webp",title:"Lether stripes",price:"2250"},{img:"https://i.pinimg.com/1200x/d5/9e/94/d59e949ac05b319d06588d696a996d74.jpg",title:"Pinky ring",price:"590"},{img:"https://habituallychic.luxury/wp-content/uploads/2021/08/signet-rings-history-etiquette-habituallychic-005.jpeg",title:"Vintage ring",price:"860"}]

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
                return (
                    null
                )
            }
            })
        }
        <div style={{display:'flex',flexDirection:'row',height:height-sumheight,width:'100%'}} >
            <div style={{height:'100%',width:'47%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} >
                <div style={{height:width*0.47*0.8,width:width*0.47*0.8,maxHeight:height-sumheight-200,maxWidth:height-sumheight-200,borderRadius:20,border:0,alignSelf:'center',overflow:'hidden',backgroundColor:'black',justifyContent:'center',alignItems:'center',display:'flex',position:'relative'}} >
                    <img src={product.image.url} style={{width:'100%',height:'100%'}} />
                    <div style={{position:'absolute',bottom:30,alignSelf:'center',flexDirection:'row',display:'flex'}} >
                        <div style={{height:10,width:10,borderRadius:10,backgroundColor:'black',margin:8}} ></div>
                        <div style={{height:10,width:10,borderRadius:10,backgroundColor:'white',margin:8}} ></div>
                        <div style={{height:10,width:10,borderRadius:10,backgroundColor:'white',margin:8}} ></div>
                        <div style={{height:10,width:10,borderRadius:10,backgroundColor:'white',margin:8}} ></div>
                        <div style={{height:10,width:10,borderRadius:10,backgroundColor:'white',margin:8}} ></div>
                    </div>
                </div>
                <div style={{width:width*0.47*0.8,height:100,marginTop:20}} >
                    <img src={product.image.url} style={{width:100,height:100,borderRadius:10,margin:8,borderBottom:'2px solid black'}} />
                </div>
                

            </div>
            <div style={{height:'100%',width:'53%',background:'white',display:'flex',alignItems:'center',justifyContent:'center'}} >
                <div style={{display:'flex',flexDirection:'column',marginBottom:130}} >
                <h1 style={{fontFamily:'al'}} >{product.title.name}</h1>
                <h2 style={{fontFamily:'al',fontWeight:'bolder',color:'gray',marginTop:0,fontSize:18}} >Includes 1 {product.title.name}</h2>
                <h2 style={{fontFamily:'ns',fontWeight:'bolder',color:'black',marginTop:0,fontSize:20}} >$ {product.price.price} USD</h2>
                <h2 style={{fontFamily:'al',fontWeight:'bolder',color:'gray',marginTop:0,fontSize:16,width:'60%',lineHeight:'1.8em',maxHeight:'3.6em',overflow:'hidden'}}  >In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. ...</h2>
                <h2 style={{fontFamily:'ns',fontWeight:'bolder',color:'black',marginTop:0,fontSize:16}} >colors</h2>
                <div style={{flexDirection:'row',display:'flex'}} >
                    <div style={{height:25,width:25,borderRadius:25,backgroundColor:'gold',borderBottom:'2px solid black',margin:5}} ></div>
                    <div style={{height:27,width:27,borderRadius:25,backgroundColor:'silver',border:'0px solid black',margin:5}} ></div>
                </div>
                <h2 style={{fontFamily:'ns',fontWeight:'bolder',color:'black',marginTop:0,fontSize:18,marginTop:10}} >quantity</h2>
                <input type='number' placeholder='1' style={{padding:8,fontFamily:'ns',width:100,border:'2px solid black',borderRadius:5}} />
                <button style={{width:'60%',height:85,borderRadius:5,backgroundColor:'black',fontFamily:'ns',color:'white',fontSize:26,marginTop:20,border:0}} >add to cart</button>
                </div>
            </div>
        </div>

        
    </div>
    )
}

export default ProductT;
