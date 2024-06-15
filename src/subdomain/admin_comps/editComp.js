import React, { useState, useEffect } from 'react';
import axios from 'axios'; import { host } from '../../code/imports/imp';


function CompEditor({setShowCompEditor,setBannerTexts,bannerTexts,bannerText,setBannerImgs,bannerImgs,bannerImg,setBannerButtons,bannerButtons,bannerButton,storeProducts,parentname}){


  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });
  const [state, setState] = useState(0);
  const [Height,setHeight] = React.useState(false)
  const [file, setFile] = React.useState({bannerImgId:'okok'});


  function update(){
    //console.log("okk")
    return new Promise(resolve => {
        setTimeout(()=>{
            setHeight(!Height)
        },10)
    });
}

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
  let width = window.innerWidth
  let height = window.innerHeight
  const handleMouseDown = (e) => {
    setDragging(true);
    setRel({
      x: e.pageX - position.x,
      y: e.pageY - position.y,
    });
    e.stopPropagation();
    e.preventDefault();
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: (e.pageX - rel.x+330) < width-11 ?(e.pageX - rel.x)<11?0:(e.pageX - rel.x):(width-334),
        y: (e.pageY - rel.y+400) < height-11?(e.pageY - rel.y)<11?0:(e.pageY - rel.y):(height-404),
      });
      console.log('done',(e.pageY - rel.y))
      e.stopPropagation();
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  const backgroundColorAdmin = "white"
  const secondColor = "white"

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

  return (
    <div
      className="draggable"
      
      style={{ left: position.x, top: position.y,border:'2px solid #CAC2B6',overflow:'hidden' }}
    >
      <div style={{position:'absolute',top:0,width:'100%',backgroundColor:'rgba(0,0,0,0.05)',height:30,borderBottom:'2px solid #CAC2B6',cursor:'grab',display:'flex',alignItems:'center',justifyContent:'center'}} onMouseDown={handleMouseDown} >
        <button onClick={()=>setShowCompEditor(false)} style={{position:'absolute',top:6,left:5,fontFamily:'ns',fontSize:17,color:'red',padding:0,borderRadius:20,backgroundColor:'transparent',opacity:0.7,zIndex:2,border:0,cursor:'pointer'}} >X</button>
        <div style={{display:'flex'}} >
          <p style={{fontFamily:'mb',fontSize:18,color:'#f90'}} >{parentname}.</p>
          <p style={{fontFamily:'mb',fontSize:18,color:'rgba(0,0,0,0.9)',opacity:0.7}} >{bannerImg?'Imagebox':bannerText?'Textbox':bannerButton?'Button':'N/A'}</p>
        </div>
        
      </div>
      <div style={{position:'absolute',top:32,width:'100%',height:30,borderBottom:'2px solid #CAC2B6',display:'flex',alignItems:'center',justifyContent:'center'}} onMouseDown={handleMouseDown} >
        <button style={{padding:'4px 11px',boxSizing:'border-box',borderRadius:5,backgroundColor:state===0?'rgba(0,0,0,0)':'rgba(0,0,0,0.63)',border:state===0?'2px solid black':0,fontFamily:'mb',color:state===0?'#f90':'#F6F3EF',marginBottom:0,cursor:'pointer'}} >initial</button>
        <button style={{padding:'4px 11px',boxSizing:'border-box',borderRadius:5,backgroundColor:state===1?'rgba(0,0,0,0)':'rgba(0,0,0,0.63)',border:state===1?'2px solid black':0,fontFamily:'mb',color:state===1?'#f90':'#F6F3EF',marginBottom:0,marginLeft:10,cursor:'pointer'}} >hover</button>
        <button style={{padding:'4px 11px',boxSizing:'border-box',borderRadius:5,backgroundColor:state===2?'rgba(0,0,0,0)':'rgba(0,0,0,0.63)',border:state===2?'2px solid black':0,fontFamily:'mb',color:state===2?'#f90':'#F6F3EF',marginBottom:0,marginLeft:10,cursor:'pointer'}} >active</button>
        
      </div>


      <div style={{width:'100%',height:340,position:'absolute',top:66,display:'flex',alignItems:'start',justifyContent:'center',overflowY:'scroll'}} >
      
      
        {bannerText?<div style={{width:'90%',display:'flex',alignItems:'center',flexDirection:'column',padding:'10px 0px',borderRadius:5,marginTop:10,paddingBottom:10,position:'relative'}} >
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
              <div className="checkbox-wrapper-2" style={{position:'absolute',right:10,cursor:'pointer'}} >
                  <input type="checkbox" className="sc-gJwTLC ikxBAC" checked={bannerText.jline} onChange={(event => setBannerTexts(bannerTexts => [...bannerTexts].map(b => b.id === bannerText.id ? ({...b, jline:!bannerText.jline}) : b)))} />
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
          :null}      
      
        {bannerImg?<div style={{width:'90%',display:'flex',alignItems:'center',flexDirection:'column',padding:'10px 0px',borderRadius:5,marginTop:10,paddingTop:10,paddingBottom:10,position:'relative'}} >
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
                            <div className="checkbox-wrapper-2" style={{position:'absolute',right:10,cursor:'pointer'}} >
                                <input type="checkbox" className="sc-gJwTLC ikxBAC" checked={!bannerImg.cheight} onClick={()=>setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, cheight:!bannerImg.cheight}) : b))} />
                            </div>
                        </div>

                        <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:13,position:'relative'}} >
                            <h3 style={{fontFamily:'mb',fontSize:16,marginLeft:35,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >Height</h3>
                            
                            <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',position:'absolute',right:10,width:'40%'}} >
                                <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',border:'2px solid #c9cbcd',borderRadius:5,width:'100%',marginRight:5}} >
                                    <input value={bannerImg.height} type="number" onChange={(event => setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, height:event.target.value}) : b)))} style={{border:0,width:'100%',height:15,padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin}} placeholder="69" />
                                    <h3 style={{fontFamily:'mb',fontSize:16,marginRight:5,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >{bannerImg.heightpx?'px':'%'}</h3>
                                </div>
                                <div className="checkbox-wrapper-2" style={{cursor:'pointer'}} >
                                    <input type="checkbox" className="sc-gJwTLC ikxBAC" checked={bannerImg.heightpx} onClick={()=>setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, heightpx:!bannerImg.heightpx}) : b))} />
                                </div>
                            </div>
                        </div>


                    </div>:null}

                    <p onClick={async()=>{setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, showWidth:!bannerImg.showWidth}) : b));await update()}} style={{cursor:'pointer',marginBottom:10,marginTop:0,fontFamily:'mb',fontSize:15,alignSelf:'flex-start',marginLeft:20}} >Width {bannerImg.showWidth?'▼':'►'}</p>
                    
                    {bannerImg.showWidth?<div style={{width:'100%',position:'relative'}} >
                        <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                            <h3 style={{fontFamily:'mb',fontSize:16,marginLeft:35,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >Usable</h3>
                            <div className="checkbox-wrapper-2" style={{position:'absolute',right:10,cursor:'pointer'}} >
                                <input type="checkbox" className="sc-gJwTLC ikxBAC" checked={!bannerImg.cwidth} onClick={()=>setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, cwidth:!bannerImg.cwidth}) : b))} />
                            </div>
                        </div>

                        <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:13,position:'relative'}} >
                            <h3 style={{fontFamily:'mb',fontSize:16,marginLeft:35,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >Width</h3>
                            
                            <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',position:'absolute',right:10,width:'40%'}} >
                                <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',border:'2px solid #c9cbcd',borderRadius:5,width:'100%',marginRight:5}} >
                                    <input value={bannerImg.width} type="number" onChange={(event => setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, width:event.target.value}) : b)))} style={{border:0,width:'100%',height:15,padding:5,color:'black',fontFamily:'mb',fontSize:17,backgroundColor:backgroundColorAdmin}} placeholder="69" />
                                    <h3 style={{fontFamily:'mb',fontSize:16,marginRight:5,marginTop:0,marginBottom:0,color:'rgba(0,0,0,0.8)'}} >{bannerImg.widthpx?'px':'%'}</h3>
                                </div>
                                <div className="checkbox-wrapper-2" style={{cursor:'pointer'}} >
                                    <input type="checkbox" className="sc-gJwTLC ikxBAC" checked={bannerImg.widthpx} onClick={()=>setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, widthpx:!bannerImg.widthpx}) : b))} />
                                </div>
                            </div>
                        </div>


                    </div>:null}

                    <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                        <p style={{fontFamily:'mb',fontSize:16,marginLeft:20,color:'black',marginBottom:0,marginTop:0}} >Full height</p>
                        <div className="checkbox-wrapper-2" style={{position:'absolute',right:10,cursor:'pointer'}} >
                            <input type="checkbox" className="sc-gJwTLC ikxBAC" checked={bannerImg.fullh} onClick={()=>setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, fullh:!bannerImg.fullh,cwidth:!bannerImg.fullh}) : b))} />
                        </div>
                    </div>
                    <div style={{marginTop:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:9,position:'relative'}} >
                        <p style={{fontFamily:'mb',fontSize:16,marginLeft:20,color:'black',marginBottom:0,marginTop:0}} >Full width</p>
                        <div className="checkbox-wrapper-2" style={{position:'absolute',right:10,cursor:'pointer'}} >
                            <input type="checkbox" className="sc-gJwTLC ikxBAC" checked={bannerImg.fullw} onClick={()=>setBannerImgs(bannerImgs => [...bannerImgs].map(b => b.id === bannerImg.id ? ({...b, fullw:!bannerImg.fullw,cheight:!bannerImg.fullw}) : b))} />
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
          :null}
      
        {bannerButton?<div style={{width:'90%',display:'flex',alignItems:'center',padding:'10px 0px',flexDirection:'column',borderRadius:5,marginTop:10,paddingBottom:10,position:'relative'}} >
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
                    <div className="checkbox-wrapper-2" style={{position:'absolute',right:10,cursor:'pointer'}} >
                        <input type="checkbox" className="sc-gJwTLC ikxBAC" checked={bannerButton.jline} onChange={(event => setBannerButtons(bannerButtons => [...bannerButtons].map(b => b.id === bannerButton.id ? ({...b, jline:!bannerButton.jline}) : b)))} />
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
          :null}
      </div>

    </div>
  );
};

export default CompEditor;