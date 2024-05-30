
import React from 'react';
import { Link,useNavigate,useParams } from "react-router-dom";
import logo from '../assets/bunker.png'
import '../style/home.css'
import axios from 'axios'; import { host } from '../code/imports/imp';
import DefaultT from '../templates/default';
import ProductT from '../templates/product';


function ProdS() {
    const [bannerTexts,setBannerTexts] = React.useState([])
    const [bannerImgs,setBannerImgs] = React.useState([])
    const [bannerDivs,setBannerDivs] = React.useState([])
    const [Banners,setBanners] = React.useState([])
    const [product,setProduct] = React.useState({})
    const [productStyle,setProductStyle] = React.useState({})
    const [storeProducts,setStoreProducts] = React.useState([])
    const [products,setProducts] = React.useState([])
    const [sid,setSID] = React.useState('')
    const navigate = useNavigate();
    const jid = localStorage.getItem('jid')
    let { pid } = useParams()
    // const [products,setProducts] =  React.useState([{show:false,image:{url:"https://i.ebayimg.com/images/g/6rsAAOSw3iphuJTp/s-l1200.webp",size:200,align:'center',borderRadius:10,borderWidth:2,borderColor:'black'},title:{name:"Tie ping",color:"black",font:"al",size:22,},ok:"",price:{price:"110",color:"black",font:"ns",size:22}},{show:false,image:{url:"https://i.ebayimg.com/images/g/Do8AAOSwsR5kV3rA/s-l1600.jpg",size:200,borderRadius:10,borderWidth:2,borderColor:'black'},title:{name:"Casual t",color:"black",font:"al",size:22,},ok:"ie",price:{price:"260",color:"black",font:"ns",size:22}},{show:false,image:{url:"https://i.ebayimg.com/images/g/PzMAAOSwfkllOuXh/s-l1200.webp",size:200,borderRadius:10,borderWidth:2,borderColor:'black'},title:{name:"AP Royal",color:"black",font:"al",size:22,},ok:" Oak",price:{price:"21k",color:"black",font:"ns",size:22}},{show:false,image:{url:"https://i.ebayimg.com/images/g/xigAAOSwyXdk7-Z7/s-l1200.webp",size:200,borderRadius:10,borderWidth:2,borderColor:'black'},title:{name:"Lether s",color:"black",font:"al",size:22,},ok:"tripes",price:{price:"999",color:"black",font:"ns",size:22}},{show:false,image:{url:"https://i.pinimg.com/1200x/d5/9e/94/d59e949ac05b319d06588d696a996d74.jpg",size:200,borderRadius:10,borderWidth:2,borderColor:'black'},title:{name:"Pinky ri",color:"black",font:"al",size:22,},ok:"ng",price:{price:"590",color:"black",font:"ns",size:22}},{show:false,image:{url:"https://habituallychic.luxury/wp-content/uploads/2021/08/signet-rings-history-etiquette-habituallychic-005.jpeg",size:200,borderRadius:10,borderWidth:2,borderColor:'black'},title:{name:"Vintage ",color:"black",font:"al",size:22,},ok:"ring",price:{price:"860",color:"black",font:"ns",size:22}}])
    let width = window.innerWidth
    let height = window.innerHeight

    // let balls = height*2


    React.useEffect(()=>{
        get_store()
        get_product()
    },[])


    const get_store = async() =>{
        // console.log("store requested")
        const res = await axios.post(`http://${host}:4242/getstore`,{'w':0,'subd':window.location.host.split(".")[0]})

        if (res.data != "505" && res.data != "no.") {
            setBannerImgs(res.data.store.bannerImgs)
            setBannerTexts(res.data.store.bannerTexts)
            setBannerDivs(res.data.store.bannerDivs)
            setBanners(res.data.store.banners)
            setStoreProducts(res.data.products)
            setSID(res.data.sid)
            setProductStyle(res.data.productStyle)
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

    const get_product = async() =>{
        const res = await axios.post(`http://${host}:4242/getproduct`,{'pid':pid})
        setProduct(res.data.product)
    }

    
    if(Banners[0] && product){
        // console.log("pr",product)
        return (
            <ProductT width={width} height={height} banners={[Banners[0]?Banners[0]:{}]} bannerTexts={bannerTexts} bannerImgs={bannerImgs} bannerDivs={bannerDivs} product={product} bannerProducts={products} storeProducts={storeProducts} sid={sid} productStyle={productStyle?productStyle:{backgroundColor:'#ffffff',foreground:'#000000',font:'ns'}} />
        )
    }else{
        if (!product) {
            return <p>product does not exist.</p>
        }else{
            return(
                <p>loading...</p>
            )
        }
       
    }

}

export default ProdS;
