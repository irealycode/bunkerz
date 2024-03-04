
import React from 'react';
import { Link,useNavigate } from "react-router-dom";
import logo from '../assets/bunker.png'
import '../style/home.css'
import axios from 'axios'; import { host } from '../code/imports/imp';
import $ from 'jquery';
import DefaultT from '../templates/default';

function ProdS() {
    const [bannerTexts,setBannerTexts] = React.useState([])
    const [bannerImgs,setBannerImgs] = React.useState([])
    const [bannerDivs,setBannerDivs] = React.useState([])
    const [Banners,setBanners] = React.useState([])
    const navigate = useNavigate();
    const jid = localStorage.getItem('jid')
    const [products,setProducts] =  React.useState([{show:false,image:{url:"https://i.ebayimg.com/images/g/6rsAAOSw3iphuJTp/s-l1200.webp",size:200,align:'center',borderRadius:10,borderWidth:2,borderColor:'black'},title:{name:"Tie ping",color:"black",font:"al",size:22,},ok:"",price:{price:"110",color:"black",font:"ns",size:22}},{show:false,image:{url:"https://i.ebayimg.com/images/g/Do8AAOSwsR5kV3rA/s-l1600.jpg",size:200,borderRadius:10,borderWidth:2,borderColor:'black'},title:{name:"Casual t",color:"black",font:"al",size:22,},ok:"ie",price:{price:"260",color:"black",font:"ns",size:22}},{show:false,image:{url:"https://i.ebayimg.com/images/g/PzMAAOSwfkllOuXh/s-l1200.webp",size:200,borderRadius:10,borderWidth:2,borderColor:'black'},title:{name:"AP Royal",color:"black",font:"al",size:22,},ok:" Oak",price:{price:"21k",color:"black",font:"ns",size:22}},{show:false,image:{url:"https://i.ebayimg.com/images/g/xigAAOSwyXdk7-Z7/s-l1200.webp",size:200,borderRadius:10,borderWidth:2,borderColor:'black'},title:{name:"Lether s",color:"black",font:"al",size:22,},ok:"tripes",price:{price:"999",color:"black",font:"ns",size:22}},{show:false,image:{url:"https://i.pinimg.com/1200x/d5/9e/94/d59e949ac05b319d06588d696a996d74.jpg",size:200,borderRadius:10,borderWidth:2,borderColor:'black'},title:{name:"Pinky ri",color:"black",font:"al",size:22,},ok:"ng",price:{price:"590",color:"black",font:"ns",size:22}},{show:false,image:{url:"https://habituallychic.luxury/wp-content/uploads/2021/08/signet-rings-history-etiquette-habituallychic-005.jpeg",size:200,borderRadius:10,borderWidth:2,borderColor:'black'},title:{name:"Vintage ",color:"black",font:"al",size:22,},ok:"ring",price:{price:"860",color:"black",font:"ns",size:22}}])
    let width = window.innerWidth
    let height = window.innerHeight

    // let balls = height*2


    React.useEffect(()=>{
        get_store()
            
    },[])


    const get_store = async() =>{
        console.log("store requested")
        const res = await axios.post(`http://${host}:4242/getstore`,{'w':0,'subd':window.location.host.split(".")[0]})

        if (res.data != "505" && res.data != "no.") {
            setBannerImgs(res.data.store.bannerImgs)
            setBannerTexts(res.data.store.bannerTexts)
            setBannerDivs(res.data.store.bannerDivs)
            setBanners(res.data.store.banners)
        }
    }

    

  return (
        <DefaultT  banners={Banners} bannerTexts={bannerTexts} bannerImgs={bannerImgs} bannerDivs={bannerDivs} bannerProducts={products}  />
  );
}

export default ProdS;
