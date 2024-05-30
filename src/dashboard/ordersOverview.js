import React from 'react';
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import { host } from '../code/imports/imp';
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip } from 'recharts';

function OrdersV() {

    const jid = localStorage.getItem('jid')
    let width = window.innerWidth
    let height = window.innerHeight
    let orders_total=0
    let orders_total_alga=0
    let orders_total_nike=0
    // const data = [{month:'January', orders: 12},{month:'February', orders: 26},{month:'March', orders: 156},{month:'April', orders: 100},];

    const data = [{day:'Monday', orders: 12},{day:'Tuesday', orders: 26},{day:'Wednesday', orders: 156},{day:'Thursday', orders: 100},{day:'Friday', orders: 111},{day:'Saturday', orders: 98},{day:'Sunday', orders: 137}];
    const alga_data = [{day:'Monday', orders: 9},{day:'Tuesday', orders: 15},{day:'Wednesday', orders: 82},{day:'Thursday', orders: 53},{day:'Friday', orders: 50},{day:'Saturday', orders: 57},{day:'Sunday', orders: 79}];
    const nike_data = [{day:'Monday', orders: 0},{day:'Tuesday', orders: 10},{day:'Wednesday', orders: 35},{day:'Thursday', orders: 41},{day:'Friday', orders: 45},{day:'Saturday', orders: 27},{day:'Sunday', orders: 30}];


    data.map((y)=>{orders_total+=y.orders})
    alga_data.map((y)=>{orders_total_alga+=y.orders})
    nike_data.map((y)=>{orders_total_nike+=y.orders})


  return (
    <div style={{height:'100%',width:'100%'}} >
        <h1 style={{margin:0,fontFamily:'mc',fontSize:40,marginTop:30,marginLeft:70,marginBottom:10,marginRight:9,color:'rgba(0,0,0,0.9)'}} >Orders overview</h1>   
        <div style={{display:'flex',flexDirection:'row',marginBottom:10,justifyContent:'center'}} >
            <div>
                <div style={{width:(width-330)*2/5+30,backgroundColor:'white',borderRadius:10,paddingTop:50,position:'relative'}} >
                    <h1 style={{margin:0,fontFamily:'mc',fontSize:20,marginLeft:70,marginBottom:10,marginRight:9,color:'rgba(0,0,0,0.9)'}} >Week's orders</h1>                            
                    <h1 style={{margin:0,fontFamily:'ml',fontSize:41,marginLeft:70,marginBottom:10.5,color:'#ff9900'}} >{orders_total}</h1>
                    <h1 style={{margin:0,fontFamily:'ml',fontSize:18,marginLeft:70,marginBottom:10.5,color:'#ff9900',position:'absolute',right:20,top:32}} >View details</h1>

                    <LineChart width={(width-330)*2/5} height={(width-330)*1/5} data={data}>
                        <Line type="monotone" dataKey="orders" stroke="#ff9900" strokeWidth={3} />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="day" />
                        <Tooltip />
                        <YAxis />
                    </LineChart>
                </div>
                <div style={{width:(width-330)*2/5+30,backgroundColor:'white',borderRadius:10,paddingTop:50,marginTop:10,position:'relative'}} >
                    <h1 style={{margin:0,fontFamily:'mc',fontSize:30,marginLeft:70,marginBottom:10,marginRight:9,color:'rgba(0,0,0,0.9)'}} >Week's overview</h1>

                    <div>
                        <h1 style={{margin:0,fontFamily:'mc',fontSize:22,marginLeft:70,marginBottom:10,marginRight:9,color:'rgba(0,0,0,0.9)'}} >Total orders</h1>
                        <div style={{display:'flex',flexDirection:'row',position:'relative'}} >
                            <h1 style={{margin:0,fontFamily:'mc',fontSize:41,marginLeft:70,marginBottom:10.5,color:'#ff9900'}} >{orders_total}</h1>
                            <h1 style={{margin:0,fontFamily:'ml',fontSize:48,left:180,top:-10,color:'#14d102',position:'absolute'}} >↑</h1>
                            <h1 style={{margin:0,fontFamily:'ml',fontSize:41,marginLeft:70,marginBottom:10.5,color:'#14d102'}} >122.56%</h1>
                        </div>
                        <h1 style={{margin:0,fontFamily:'mc',fontSize:22,marginLeft:70,marginBottom:10,marginRight:9,color:'rgba(0,0,0,0.9)'}} >Top stores</h1>
                        <h1 style={{margin:0,fontFamily:'mc',fontSize:20,marginLeft:70,marginBottom:10,marginRight:9,color:'rgba(0,0,0,0.9)'}} >Alga</h1>
                        <div style={{display:'flex',flexDirection:'row',position:'relative'}} >
                            <h1 style={{margin:0,fontFamily:'mc',fontSize:41,marginLeft:70,marginBottom:10.5,color:'#ff9900'}} >{orders_total_alga}</h1>
                            <h1 style={{margin:0,fontFamily:'ml',fontSize:48,left:180,top:-10,color:'#14d102',position:'absolute'}} >↑</h1>
                            <h1 style={{margin:0,fontFamily:'ml',fontSize:41,marginLeft:70,marginBottom:10.5,color:'#14d102'}} >156.91%</h1>
                        </div>
                        <h1 style={{margin:0,fontFamily:'mc',fontSize:20,marginLeft:70,marginBottom:10,marginRight:9,color:'rgba(0,0,0,0.9)'}} >Nike</h1>
                        <div style={{display:'flex',flexDirection:'row',position:'relative'}} >
                            <h1 style={{margin:0,fontFamily:'mc',fontSize:41,marginLeft:70,marginBottom:10.5,color:'#ff9900'}} >{orders_total_alga}</h1>
                            <h1 style={{margin:0,fontFamily:'ml',fontSize:48,left:180,top:-10,color:'red',position:'absolute'}} >↓</h1>
                            <h1 style={{margin:0,fontFamily:'ml',fontSize:41,marginLeft:70,marginBottom:10.5,color:'red'}} >23.14%</h1>
                        </div>  
                        <h1 style={{margin:0,fontFamily:'ml',fontSize:18,marginLeft:70,paddingBottom:20,color:'#ff9900'}} >Show more</h1>         
                    </div>
                </div>
            </div>
            
            <div >
                <h1 style={{margin:0,fontFamily:'mc',fontSize:35,marginLeft:70,marginBottom:10,marginRight:9,color:'rgba(0,0,0,0.9)'}} >Best preforming stores</h1>                            
                <div style={{width:(width-330)*2/5+30,backgroundColor:'white',borderRadius:10,paddingTop:50,marginLeft:70,position:'relative'}} >
                    <h1 style={{margin:0,fontFamily:'mc',fontSize:20,marginLeft:70,marginBottom:10,marginRight:9,color:'rgba(0,0,0,0.9)'}} >Alga</h1>                            
                    <h1 style={{margin:0,fontFamily:'ml',fontSize:41,marginLeft:70,marginBottom:10.5,color:'#ff9900'}} >{orders_total_alga}</h1>
                    <h1 style={{margin:0,fontFamily:'ml',fontSize:18,marginLeft:70,marginBottom:10.5,color:'#ff9900',position:'absolute',right:20,top:32}} >View details</h1>

                    <LineChart width={(width-330)*2/5} height={(width-330)*1/5} data={alga_data}>
                        <Line type="monotone" dataKey="orders" stroke="#ff9900" strokeWidth={3} />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="day" />
                        <Tooltip />
                        <YAxis />
                    </LineChart>
                </div>
                <div style={{width:(width-330)*2/5+30,backgroundColor:'white',borderRadius:10,paddingTop:50,marginLeft:70,position:'relative',marginTop:10}} >
                    <h1 style={{margin:0,fontFamily:'mc',fontSize:20,marginLeft:70,marginBottom:10,marginRight:9,color:'rgba(0,0,0,0.9)'}} >Nike</h1>                            
                    <h1 style={{margin:0,fontFamily:'ml',fontSize:41,marginLeft:70,marginBottom:10.5,color:'#ff9900'}} >{orders_total_nike}</h1>
                    <h1 style={{margin:0,fontFamily:'ml',fontSize:18,marginLeft:70,marginBottom:10.5,color:'#ff9900',position:'absolute',right:20,top:32}} >View details</h1>

                    <LineChart width={(width-330)*2/5} height={(width-330)*1/5} data={nike_data}>
                        <Line type="monotone" dataKey="orders" stroke="#ff9900" strokeWidth={3} />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="day" />
                        <Tooltip />
                        <YAxis />
                    </LineChart>
                </div>
                
            </div>
        </div>
    </div>
  );

}



export default OrdersV;
