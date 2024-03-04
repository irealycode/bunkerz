
import React from 'react';
import { Link,useNavigate } from "react-router-dom";
import logo from '../assets/bunker.png'
import '../style/home.css'
import axios from 'axios'; import { host } from '../code/imports/imp';
import $ from 'jquery';
import DefaultT from '../templates/default';

function Subd() {
    const [bannerTexts,setBannerTexts] = React.useState([])
    const [bannerImgs,setBannerImgs] = React.useState([])
    const [bannerDivs,setBannerDivs] = React.useState([])
    const [Banners,setBanners] = React.useState([])
    const [storeProducts,setStoreProducts] = React.useState([])
    const [products,setProducts] = React.useState([])
    const navigate = useNavigate();
    const jid = localStorage.getItem('jid')
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
            setProducts(res.data.store.bannerProducts)
            setStoreProducts(res.data.products)
            // setProducts([{show:false,image:{size:200,align:'center',borderRadius:10,borderWidth:2,borderColor:'black',font:'nl'},title:{color:"black",font:"al",size:22},ok:"",price:{color:"black",font:"ns",size:22}}])
        }
    }

    

  return (
        <DefaultT  banners={Banners} bannerTexts={bannerTexts} bannerImgs={bannerImgs} bannerDivs={bannerDivs} bannerProducts={products} storeProducts={storeProducts}   />
  );
}

export default Subd;
