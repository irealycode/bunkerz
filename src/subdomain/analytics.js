import React from 'react';
import axios, { all } from 'axios'; import { host } from '../code/imports/imp';
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip } from 'recharts';
import { Link,useNavigate,useParams } from "react-router-dom";



function Ananlytics(p){
    let dashboard_open = p.open?p.open:false
    let width = window.innerWidth
    let height = window.innerHeight
    let { jid,sid } = useParams()
    const [up,SetUp] = React.useState(false)
    const [allOrders,SetAllOrders] = React.useState([])
    const [allSales,SetAllSales] = React.useState([])
    const [allViews,SetAllViews] = React.useState([])
    const [today,SetToday] = React.useState(new Date())
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
    const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)+6);
    const startOfLastWeek = new Date(subtractSevenDays(startOfWeek));
    const endOfLastWeek = new Date(subtractSevenDays(endOfWeek));
    

    React.useEffect(()=>{
        get_analytics()
    },[])

    async function get_analytics(){
        const res = await axios.post(`http://${host}:4242/getanalitycs`,{'sid':sid})

        if (res.data != "505" && res.data != "no.") {
            let suborders = res.data.orders
            let subviews = res.data.views
            SetAllOrders(suborders)
            SetAllViews(subviews)
            SetAllSales(res.data.sales)
        }
    }

    const getDayName = (day) =>{
        switch (day) {
            case 1:
                return "Monday"
                break;
            case 2:
                return "Tuesday"
                break;
            case 3:
                return "Wednesday"
                break;
            case 4:
                return "Thursday"
                break;
            case 5:
                return "Friday"
                break;
            case 6:
                return "Saturday"
                break;
            case 0:
                return "Sunday"
                break;
            default:
                break;
        }
    }


    function isDateInThisWeek(strdate) {
        const date = new Date(strdate)


            return (date >= startOfWeek && date <= endOfWeek) || date.toLocaleDateString()==endOfWeek.toLocaleDateString()  ;
    }

    function isDateInLastWeek(strdate) {
        const date = new Date(strdate)
        
        return (date >= startOfLastWeek && date <= endOfLastWeek  || date.toLocaleDateString()==endOfLastWeek.toLocaleDateString()) ;
    }

    const formatYAxis = (tick) => {
        return parseInt(tick); 
      }


    const get_weeks_orders = () =>{
            let suborders = allOrders[0]?allOrders:[]
            let suborders1 = allOrders[0]?allOrders:[]
            suborders = suborders.filter(o => isDateInThisWeek(o.created_at))
            suborders1 = suborders1.filter(o => isDateInLastWeek(o.created_at))
            let week_data = [{day:'Monday', orders: 0},{day:'Tuesday', orders: 0},{day:'Wednesday', orders: 0},{day:'Thursday', orders: 0},{day:'Friday', orders: 0},{day:'Saturday', orders: 0},{day:'Sunday', orders: 0}];
            let last_week_data = [{day:'Monday', orders: 0},{day:'Tuesday', orders: 0},{day:'Wednesday', orders: 0},{day:'Thursday', orders: 0},{day:'Friday', orders: 0},{day:'Saturday', orders: 0},{day:'Sunday', orders: 0}];
            let limit = 6
            for (let yy = 0; yy < suborders.length; yy++) {
                let order_date = getDayName(new Date(suborders[yy].created_at).getDay())
                let index = week_data.findIndex( s_order => s_order.day === order_date)
                if (index >= 0) {
                    week_data[index].orders += 1
                }
                if (new Date(suborders[yy].created_at).toLocaleDateString() == new Date().toLocaleDateString()) {
                    limit = index==-1?0:index;
                }
            }


            for (let yy = 0; yy < suborders1.length; yy++) {
                let order_date = getDayName(new Date(suborders1[yy].created_at).getDay())
                let index = last_week_data.findIndex( s_order => s_order.day === order_date)
                if (index >= 0) {
                    last_week_data[index].orders += 1
                }
            }

            for (let yy = 0; yy < week_data.length; yy++) {
                week_data[yy].last_week_orders = last_week_data[yy].orders
            }

            let growth = suborders1.length != 0?(suborders.length-suborders1.length)*100/suborders1.length:0
            week_data.unshift({orders:last_week_data[6].orders,day:'...',last_week_orders:0})
            last_week_data.unshift({orders:0,day:0,last_week_orders:0})



            const CustomizedDot = (props) => {
                const { cx, cy, stroke, payload } = props;
              
                return (
                  <svg x={cx - 5} y={cy - 5} width={10} height={10} fill={'rgba(0,0,0,0)'} viewBox="0 0 10 10">
                    <circle cx={5} cy={5} r={5} />
                  </svg>
                );
              };
            return(
                <div >
                    <div style={{display:'flex',flexDirection:'row',position:'relative',marginLeft:70,alignItems:'center'}} >
                            <h1 style={{margin:0,fontFamily:'ml',fontSize:35,marginBottom:10.5,color:'#ff9900'}} >{suborders.length}</h1>
                            {growth > 0?<div style={{display:'flex',flexDirection:'row',alignItems:'center',position:'absolute',right:30}} >
                                <h1 style={{margin:0,fontFamily:'ml',fontSize:30,marginBottom:17,color:'#14d102',marginLeft:70}} >↑</h1>
                                <h1 style={{margin:0,fontFamily:'ml',fontSize:23,marginBottom:10.5,color:'#14d102'}} >{parseFloat(growth.toFixed(1))}%</h1>
                            </div>:null}

                            {growth < 0?<div style={{display:'flex',flexDirection:'row',alignItems:'center',position:'absolute',right:30}} >
                                <h1 style={{margin:0,fontFamily:'ml',fontSize:30,marginBottom:17,color:'red',marginLeft:70}} >↓</h1>
                                <h1 style={{margin:0,fontFamily:'ml',fontSize:23,marginBottom:10.5,color:'red'}} >{parseFloat(growth.toFixed(1))*-1}%</h1>
                            </div>:null}
                            
                        </div>
                    <h1 style={{margin:0,fontFamily:'ml',fontSize:16,marginLeft:30,marginBottom:10.5,color:'gray'}} >Orders over the week</h1>
                <div style={{marginLeft:-35}} >
                    <LineChart width={(width-330)*1/3 + 30} height={(width-330)*1/5} height={(width-330)*1/5} data={week_data}>
                        <Line type="monotone" dataKey="orders"  stroke="url(#grad0)" strokeWidth={3} dot={<CustomizedDot />} />
                        <svg height={0} width={0}>
                            <defs>
                            <linearGradient id="grad0" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#ff9900" stopOpacity={1} />
                                <stop offset={(14.23*(limit+1).toString()+"%")} stopColor="#ff9900" stopOpacity={1} />
                                <stop offset="0%" stopColor="#ff9900" stopOpacity={0} />
                            </linearGradient>
                            </defs>
                        </svg>
                        <Line type="monotone" dataKey="last_week_orders" stroke="#ff9900" opacity={0.3} dot={false} name="last week orders" strokeWidth={3} />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="day" />
                        <Tooltip />
                        <YAxis tickFormatter={formatYAxis} fillOpacity={0.9} strokeOpacity={0} />
                    </LineChart>
                </div>
                </div>
            )

    }

    const get_weeks_views = () =>{
        let subviews = allViews[0]?allViews:[]
        let subviews1 = allViews[0]?allViews:[]
        subviews = subviews.filter(o => isDateInThisWeek(o.visit_at))
        subviews1 = subviews1.filter(o => isDateInLastWeek(o.visit_at))
        let week_views_data = [{day:'Monday', views: 0},{day:'Tuesday', views: 0},{day:'Wednesday', views: 0},{day:'Thursday', views: 0},{day:'Friday', views: 0},{day:'Saturday', views: 0},{day:'Sunday', views: 0}];
        let last_week_views_data = [{day:'Monday', views: 0},{day:'Tuesday', views: 0},{day:'Wednesday', views: 0},{day:'Thursday', views: 0},{day:'Friday', views: 0},{day:'Saturday', views: 0},{day:'Sunday', views: 0}];
        let limit = 6
        for (let yy = 0; yy < subviews.length; yy++) {
            let order_date = getDayName(new Date(subviews[yy].visit_at).getDay())
            let index = week_views_data.findIndex( s_order => s_order.day === order_date)
            if (index >= 0) {
                week_views_data[index].views += 1
                if (new Date(subviews[yy].visit_at).toLocaleDateString() == new Date().toLocaleDateString()) {
                    limit = index
                }
            }
        }
    
    
        for (let yy = 0; yy < subviews1.length; yy++) {
            let order_date = getDayName(new Date(subviews1[yy].visit_at).getDay())
            let index = last_week_views_data.findIndex( s_order => s_order.day === order_date)
            if (index >= 0) {
                last_week_views_data[index].views += 1
            }
        }
        for (let yy = 0; yy < week_views_data.length; yy++) {
            week_views_data[yy].last_week_views = last_week_views_data[yy].views
        }
    
        let growth = subviews1.length != 0?(subviews.length-subviews1.length)*100/subviews1.length:0
        week_views_data.unshift({views:last_week_views_data[6].views,day:'...',last_week_views:0})
        last_week_views_data.unshift({views:0,day:'...'})
        
        
    
        return(
            <div style={{alignSelf:'center'}} >
                <div style={{display:'flex',flexDirection:'row',position:'relative',marginLeft:70,alignItems:'center'}} >
                            <h1 style={{margin:0,fontFamily:'ml',fontSize:35,marginBottom:10.5,color:'#ff9900'}} >{subviews.length}</h1>
                            {growth > 0?<div style={{display:'flex',flexDirection:'row',alignItems:'center',position:'absolute',right:30}} >
                                <h1 style={{margin:0,fontFamily:'ml',fontSize:30,marginBottom:17,color:'#14d102',marginLeft:70}} >↑</h1>
                                <h1 style={{margin:0,fontFamily:'ml',fontSize:23,marginBottom:10.5,color:'#14d102'}} >{parseFloat(growth.toFixed(1))}%</h1>
                            </div>:null}
    
                            {growth < 0?<div style={{display:'flex',flexDirection:'row',alignItems:'center',position:'absolute',right:30}} >
                                <h1 style={{margin:0,fontFamily:'ml',fontSize:30,marginBottom:17,color:'red',marginLeft:70}} >↓</h1>
                                <h1 style={{margin:0,fontFamily:'ml',fontSize:23,marginBottom:10.5,color:'red'}} >{parseFloat(growth.toFixed(1))*-1}%</h1>
                            </div>:null}
                            
                        </div>
                <h1 style={{margin:0,fontFamily:'ml',fontSize:16,marginLeft:30,marginBottom:10.5,color:'gray'}} >Visits over the week</h1>
                <div style={{marginLeft:-35}} >
                <LineChart width={(width-330)*1/3 + 30} height={(width-330)*1/5} data={week_views_data}>
                    <Line type="monotone" dataKey="views" stroke="url(#grad1)" dot={false} strokeWidth={3} />
                    <svg height={0} width={0}>
                        <defs>
                        <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#ff9900" stopOpacity={1} />
                            <stop offset={(14.23*(limit+1).toString()+"%")} stopColor="#ff9900" stopOpacity={1} />
                            <stop offset="0%" stopColor="#ff9900" stopOpacity={0} />
                        </linearGradient>
                        </defs>
                    </svg>
                    <Line type="monotone" dataKey="last_week_views" stroke="#ff9900" dot={false} opacity={0.3} name="last week views" strokeWidth={3} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="day" fillOpacity={0.9} />
                    <Tooltip />
                    <YAxis tickFormatter={formatYAxis} fillOpacity={0.9} strokeOpacity={0} />
                </LineChart>
                </div>
                
            </div>
        )
    
    }
    
    const get_weeks_p_revenue = () =>{
        let subprevenue = allOrders[0]?allOrders:[]
        let subprevenue1 = allOrders[0]?allOrders:[]
        subprevenue = subprevenue.filter(o => isDateInThisWeek(o.created_at))
        subprevenue1 = subprevenue1.filter(o => isDateInLastWeek(o.created_at))
        let week_data = [{day:'Monday', prevenue: 0},{day:'Tuesday', prevenue: 0},{day:'Wednesday', prevenue: 0},{day:'Thursday', prevenue: 0},{day:'Friday', prevenue: 0},{day:'Saturday', prevenue: 0},{day:'Sunday', prevenue: 0}];
        let last_week_data = [{day:'Monday', prevenue: 0},{day:'Tuesday', prevenue: 0},{day:'Wednesday', prevenue: 0},{day:'Thursday', prevenue: 0},{day:'Friday', prevenue: 0},{day:'Saturday', prevenue: 0},{day:'Sunday', prevenue: 0}];
        let limit = 6
        for (let yy = 0; yy < subprevenue.length; yy++) {
            let order_date = getDayName(new Date(subprevenue[yy].created_at).getDay())
            let index = week_data.findIndex( s_order => s_order.day === order_date)
            if (index >= 0) {
                subprevenue[yy].order.forEach(o => {
                    week_data[index].prevenue += o.price * o.qts
                });
                
            }
            if (new Date(subprevenue[yy].created_at).toLocaleDateString() == new Date().toLocaleDateString()) {
                limit = index==-1?0:index
            }
        }
        
        
        for (let yy = 0; yy < subprevenue1.length; yy++) {
            let order_date = getDayName(new Date(subprevenue1[yy].created_at).getDay())
            let index = last_week_data.findIndex( s_order => s_order.day === order_date)
            if (index >= 0) {
                subprevenue1[yy].order.forEach(o => {
                    last_week_data[index].prevenue += o.price * o.qts
                });
            }
        }
    
        for (let yy = 0; yy < week_data.length; yy++) {
            week_data[yy].last_week_prevenue = last_week_data[yy].prevenue
        }
    
        let growth = subprevenue1.length != 0?(subprevenue.length-subprevenue1.length)*100/subprevenue1.length:0
        week_data.unshift({prevenue:last_week_data[6].prevenue,day:'...',last_week_prevenue:0})
        last_week_data.unshift({prevenue:0,day:0,last_week_prevenue:0})
        let prevenue_total = week_data.reduce((acc,c)=> {return acc + c.prevenue},0)
    
    
    
        const CustomizedDot = (props) => {
            const { cx, cy, stroke, payload } = props;
          
            return (
              <svg x={cx - 5} y={cy - 5} width={10} height={10} fill={'rgba(0,0,0,0)'} viewBox="0 0 10 10">
                <circle cx={5} cy={5} r={5} />
              </svg>
            );
          };
        
          const numbersReformat = (tickItem) => {
            if (tickItem >= 1000000) {
              return `${(tickItem / 1000000).toFixed(1)}M`;
            } else if (tickItem >= 1000) {
              return `${(tickItem / 1000).toFixed(1)}K`;
            }
            return tickItem;
          };
          
        return(
            <div >
                <div style={{display:'flex',flexDirection:'row',position:'relative',marginLeft:70,alignItems:'center'}} >
                        <h1 style={{margin:0,fontFamily:'ml',fontSize:35,marginBottom:10.5,color:'#ff9900'}} >{prevenue_total}$</h1>
                        {growth > 0?<div style={{display:'flex',flexDirection:'row',alignItems:'center',position:'absolute',right:30}} >
                            <h1 style={{margin:0,fontFamily:'ml',fontSize:30,marginBottom:17,color:'#14d102',marginLeft:70}} >↑</h1>
                            <h1 style={{margin:0,fontFamily:'ml',fontSize:23,marginBottom:10.5,color:'#14d102'}} >{parseFloat(growth.toFixed(1))}%</h1>
                        </div>:null}
    
                        {growth < 0?<div style={{display:'flex',flexDirection:'row',alignItems:'center',position:'absolute',right:30}} >
                            <h1 style={{margin:0,fontFamily:'ml',fontSize:30,marginBottom:17,color:'red',marginLeft:70}} >↓</h1>
                            <h1 style={{margin:0,fontFamily:'ml',fontSize:23,marginBottom:10.5,color:'red'}} >{parseFloat(growth.toFixed(1))*-1}%</h1>
                        </div>:null}
                        
                    </div>
                <h1 style={{margin:0,fontFamily:'ml',fontSize:16,marginLeft:30,marginBottom:10.5,color:'gray'}} >prevenue over the week</h1>
            <div style={{marginLeft:0}} >
                <LineChart width={(width-330)*1/3 + 30} height={(width-330)*1/5} height={(width-330)*1/5} data={week_data}>
                    <Line type="monotone" dataKey="prevenue" name="potential revenue" stroke="url(#grad2)" strokeWidth={3} dot={<CustomizedDot />} />
                    <svg height={0} width={0}>
                        <defs>
                        <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#ff9900" stopOpacity={1} />
                            <stop offset={(14.23*(limit+1).toString()+"%")} stopColor="#ff9900" stopOpacity={1} />
                            <stop offset="0%" stopColor="#ff9900" stopOpacity={0} />
                        </linearGradient>
                        </defs>
                    </svg>
                    <Line type="monotone" dataKey="last_week_prevenue" stroke="#ff9900" opacity={0.3} dot={false} name="last week potential revenue" strokeWidth={3} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="day" />
                    <Tooltip />
                    <YAxis tickFormatter={numbersReformat} fillOpacity={0.9} strokeOpacity={0} />
                </LineChart>
            </div>
            </div>
        )
    
    }

    const get_weeks_sales = () =>{
        let subSales = allSales[0]?allSales:[]
        let subSales1 = allSales[0]?allSales:[]
        subSales = subSales.filter(o => isDateInThisWeek(o.sale_at))
        subSales1 = subSales1.filter(o => isDateInLastWeek(o.sale_at))
        let week_data = [{day:'Monday', Sales: 0},{day:'Tuesday', Sales: 0},{day:'Wednesday', Sales: 0},{day:'Thursday', Sales: 0},{day:'Friday', Sales: 0},{day:'Saturday', Sales: 0},{day:'Sunday', Sales: 0}];
        let last_week_data = [{day:'Monday', Sales: 0},{day:'Tuesday', Sales: 0},{day:'Wednesday', Sales: 0},{day:'Thursday', Sales: 0},{day:'Friday', Sales: 0},{day:'Saturday', Sales: 0},{day:'Sunday', Sales: 0}];
        let limit = 6
        for (let yy = 0; yy < subSales.length; yy++) {
            let order_date = getDayName(new Date(subSales[yy].sale_at).getDay())
            let index = week_data.findIndex( s_order => s_order.day === order_date)
            if (index >= 0) {
                week_data[index].Sales += 1
            }
            if (new Date(subSales[yy].sale_at).toLocaleDateString() == new Date().toLocaleDateString()) {
                limit = index==-1?0:index;
            }
        }
    
    
        for (let yy = 0; yy < subSales1.length; yy++) {
            let order_date = getDayName(new Date(subSales1[yy].sale_at).getDay())
            let index = last_week_data.findIndex( s_order => s_order.day === order_date)
            if (index >= 0) {
                last_week_data[index].Sales += 1
            }
        }
    
        for (let yy = 0; yy < week_data.length; yy++) {
            week_data[yy].last_week_Sales = last_week_data[yy].Sales
        }
    
        let growth = subSales1.length != 0?(subSales.length-subSales1.length)*100/subSales1.length:0
        week_data.unshift({Sales:last_week_data[6].Sales,day:'...',last_week_Sales:0})
        last_week_data.unshift({Sales:0,day:0,last_week_Sales:0})
    
    
    
        const CustomizedDot = (props) => {
            const { cx, cy, stroke, payload } = props;
          
            return (
              <svg x={cx - 5} y={cy - 5} width={10} height={10} fill={'rgba(0,0,0,0)'} viewBox="0 0 10 10">
                <circle cx={5} cy={5} r={5} />
              </svg>
            );
          };
        return(
            <div >
                <div style={{display:'flex',flexDirection:'row',position:'relative',marginLeft:70,alignItems:'center'}} >
                        <h1 style={{margin:0,fontFamily:'ml',fontSize:35,marginBottom:10.5,color:'#ff9900'}} >{subSales.length}</h1>
                        {growth > 0?<div style={{display:'flex',flexDirection:'row',alignItems:'center',position:'absolute',right:30}} >
                            <h1 style={{margin:0,fontFamily:'ml',fontSize:30,marginBottom:17,color:'#14d102',marginLeft:70}} >↑</h1>
                            <h1 style={{margin:0,fontFamily:'ml',fontSize:23,marginBottom:10.5,color:'#14d102'}} >{parseFloat(growth.toFixed(1))}%</h1>
                        </div>:null}
    
                        {growth < 0?<div style={{display:'flex',flexDirection:'row',alignItems:'center',position:'absolute',right:30}} >
                            <h1 style={{margin:0,fontFamily:'ml',fontSize:30,marginBottom:17,color:'red',marginLeft:70}} >↓</h1>
                            <h1 style={{margin:0,fontFamily:'ml',fontSize:23,marginBottom:10.5,color:'red'}} >{parseFloat(growth.toFixed(1))*-1}%</h1>
                        </div>:null}
                        
                    </div>
                <h1 style={{margin:0,fontFamily:'ml',fontSize:16,marginLeft:30,marginBottom:10.5,color:'gray'}} >Sales over the week</h1>
            <div style={{marginLeft:-35}} >
                <LineChart width={(width-330)*1/3 + 30} height={(width-330)*1/5} height={(width-330)*1/5} data={week_data}>
                    <Line type="monotone" dataKey="Sales"  stroke="url(#grad0)" strokeWidth={3} dot={<CustomizedDot />} />
                    <svg height={0} width={0}>
                        <defs>
                        <linearGradient id="grad0" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#ff9900" stopOpacity={1} />
                            <stop offset={(14.23*(limit+1).toString()+"%")} stopColor="#ff9900" stopOpacity={1} />
                            <stop offset="0%" stopColor="#ff9900" stopOpacity={0} />
                        </linearGradient>
                        </defs>
                    </svg>
                    <Line type="monotone" dataKey="last_week_Sales" stroke="#ff9900" opacity={0.3} dot={false} name="last week Sales" strokeWidth={3} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="day" />
                    <Tooltip />
                    <YAxis tickFormatter={formatYAxis} fillOpacity={0.9} strokeOpacity={0} />
                </LineChart>
            </div>
            </div>
        )
    
    }

    const get_weeks_revenue = () =>{
        let subrevenue = allSales[0]?allSales:[]
        let subrevenue1 = allSales[0]?allSales:[]
        subrevenue = subrevenue.filter(o => isDateInThisWeek(o.sale_at))
        subrevenue1 = subrevenue1.filter(o => isDateInLastWeek(o.sale_at))
        let week_data = [{day:'Monday', revenue: 0},{day:'Tuesday', revenue: 0},{day:'Wednesday', revenue: 0},{day:'Thursday', revenue: 0},{day:'Friday', revenue: 0},{day:'Saturday', revenue: 0},{day:'Sunday', revenue: 0}];
        let last_week_data = [{day:'Monday', revenue: 0},{day:'Tuesday', revenue: 0},{day:'Wednesday', revenue: 0},{day:'Thursday', revenue: 0},{day:'Friday', revenue: 0},{day:'Saturday', revenue: 0},{day:'Sunday', revenue: 0}];
        let limit = 6
        for (let yy = 0; yy < subrevenue.length; yy++) {
            let order_date = getDayName(new Date(subrevenue[yy].sale_at).getDay())
            let index = week_data.findIndex( s_order => s_order.day === order_date)
            if (index >= 0) {
                subrevenue[yy].order.forEach(o => {
                    week_data[index].revenue += o.price * o.qts
                });
                
            }
            if (new Date(subrevenue[yy].sale_at).toLocaleDateString() == new Date().toLocaleDateString()) {
                limit = index==-1?0:index
            }
        }
        
        
        for (let yy = 0; yy < subrevenue1.length; yy++) {
            let order_date = getDayName(new Date(subrevenue1[yy].sale_at).getDay())
            let index = last_week_data.findIndex( s_order => s_order.day === order_date)
            if (index >= 0) {
                subrevenue1[yy].order.forEach(o => {
                    last_week_data[index].revenue += o.price * o.qts
                });
            }
        }
    
        for (let yy = 0; yy < week_data.length; yy++) {
            week_data[yy].last_week_revenue = last_week_data[yy].revenue
        }
    
        let growth = subrevenue1.length != 0?(subrevenue.length-subrevenue1.length)*100/subrevenue1.length:0
        week_data.unshift({revenue:last_week_data[6].revenue,day:'...',last_week_revenue:0})
        last_week_data.unshift({revenue:0,day:0,last_week_revenue:0})
        let revenue_total = week_data.reduce((acc,c)=> {return acc + c.revenue},0)
    
    
    
        const CustomizedDot = (props) => {
            const { cx, cy, stroke, payload } = props;
          
            return (
              <svg x={cx - 5} y={cy - 5} width={10} height={10} fill={'rgba(0,0,0,0)'} viewBox="0 0 10 10">
                <circle cx={5} cy={5} r={5} />
              </svg>
            );
          };
        
          const numbersReformat = (tickItem) => {
            if (tickItem >= 1000000) {
              return `${(tickItem / 1000000).toFixed(1)}M`;
            } else if (tickItem >= 1000) {
              return `${(tickItem / 1000).toFixed(1)}K`;
            }
            return tickItem;
          };
          
        return(
            <div >
                <div style={{display:'flex',flexDirection:'row',position:'relative',marginLeft:70,alignItems:'center'}} >
                        <h1 style={{margin:0,fontFamily:'ml',fontSize:35,marginBottom:10.5,color:'#ff9900'}} >{revenue_total}$</h1>
                        {growth > 0?<div style={{display:'flex',flexDirection:'row',alignItems:'center',position:'absolute',right:30}} >
                            <h1 style={{margin:0,fontFamily:'ml',fontSize:30,marginBottom:17,color:'#14d102',marginLeft:70}} >↑</h1>
                            <h1 style={{margin:0,fontFamily:'ml',fontSize:23,marginBottom:10.5,color:'#14d102'}} >{parseFloat(growth.toFixed(1))}%</h1>
                        </div>:null}
    
                        {growth < 0?<div style={{display:'flex',flexDirection:'row',alignItems:'center',position:'absolute',right:30}} >
                            <h1 style={{margin:0,fontFamily:'ml',fontSize:30,marginBottom:17,color:'red',marginLeft:70}} >↓</h1>
                            <h1 style={{margin:0,fontFamily:'ml',fontSize:23,marginBottom:10.5,color:'red'}} >{parseFloat(growth.toFixed(1))*-1}%</h1>
                        </div>:null}
                        
                    </div>
                <h1 style={{margin:0,fontFamily:'ml',fontSize:16,marginLeft:30,marginBottom:10.5,color:'gray'}} >revenue over the week</h1>
            <div style={{marginLeft:0}} >
                <LineChart width={(width-330)*1/3 + 30} height={(width-330)*1/5} height={(width-330)*1/5} data={week_data}>
                    <Line type="monotone" dataKey="revenue" name="potential revenue" stroke="url(#grad2)" strokeWidth={3} dot={<CustomizedDot />} />
                    <svg height={0} width={0}>
                        <defs>
                        <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#ff9900" stopOpacity={1} />
                            <stop offset={(14.23*(limit+1).toString()+"%")} stopColor="#ff9900" stopOpacity={1} />
                            <stop offset="0%" stopColor="#ff9900" stopOpacity={0} />
                        </linearGradient>
                        </defs>
                    </svg>
                    <Line type="monotone" dataKey="last_week_revenue" stroke="#ff9900" opacity={0.3} dot={false} name="last week potential revenue" strokeWidth={3} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="day" />
                    <Tooltip />
                    <YAxis tickFormatter={numbersReformat} fillOpacity={0.9} strokeOpacity={0} />
                </LineChart>
            </div>
            </div>
        )
    
    }

    async function update() {
        await new Promise(resolve => setTimeout(resolve, 100));
        get_weeks_orders(allOrders)
    }

    function subtractSevenDays(date) {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() - 7);
        return newDate;
    }

    function addSevenDays(date) {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + 7);
        return newDate;
    }

    function weeksorders() {
        return (
            <div style={{width:(width-330)*1/3,backgroundColor:'white',overflow:'hidden',borderRadius:10,marginLeft:15,paddingTop:50,position:'relative',marginTop:10}} >
                        <h1 style={{margin:0,fontFamily:'mc',fontSize:20,marginLeft:30,marginBottom:10,marginRight:9,color:'rgba(0,0,0,0.9)'}} >Total orders</h1>                            
                        <div style={{position:'absolute',right:20,top:32,display:'flex',flexDirection:'row'}} >
                            <img onClick={()=>{SetToday(subtractSevenDays(today));update()}} src={'/static/back.png'} style={{height:15,width:15,marginRight:10,opacity:0.7,cursor:'pointer'}}  />
                            <h1 style={{margin:0,fontFamily:'ml',fontSize:18,color:'#ff9900'}} >{startOfWeek.toLocaleDateString()}</h1>
                            <img onClick={()=>{SetToday(addSevenDays(today))}} src={'/static/back.png'} style={{height:15,width:15,transform:'rotate(180deg)',marginLeft:10,opacity:0.7,cursor:'pointer'}}  />

                        </div>
                        {get_weeks_orders()}
                        
                    </div>
        )
    }

    function weeksvisits() {
        return(
        <div style={{width:(width-330)*1/3,overflow:'hidden',backgroundColor:'white',borderRadius:10,marginLeft:10,paddingTop:50,position:'relative',marginTop:10}} >
            <h1 style={{margin:0,fontFamily:'mc',fontSize:20,marginLeft:30,marginBottom:10,marginRight:9,color:'rgba(0,0,0,0.9)'}} >Total visits</h1>                            
            <div style={{position:'absolute',right:20,top:32,display:'flex',flexDirection:'row'}} >
                <img onClick={()=>{SetToday(subtractSevenDays(today));update()}} src={'/static/back.png'} style={{height:15,width:15,marginRight:10,opacity:0.7,cursor:'pointer'}}  />
                <h1 style={{margin:0,fontFamily:'ml',fontSize:18,color:'#ff9900'}} >{startOfWeek.toLocaleDateString()}</h1>
                <img onClick={()=>{SetToday(addSevenDays(today))}} src={'/static/back.png'} style={{height:15,width:15,transform:'rotate(180deg)',marginLeft:10,opacity:0.7,cursor:'pointer'}}  />

            </div>
            {get_weeks_views()}
            
        </div>
        )
    }

    function weeksprevenue() {
        return(
            <div style={{width:(width-330)*1/3+35,overflow:'hidden',backgroundColor:'white',borderRadius:10,marginLeft:15,paddingTop:50,marginTop:10,position:'relative'}} >
                <h1 style={{margin:0,fontFamily:'mc',fontSize:20,marginLeft:30,marginBottom:10,marginRight:9,color:'rgba(0,0,0,0.9)'}} >Total potential revenue</h1>                            
                <div style={{position:'absolute',right:20,top:32,display:'flex',flexDirection:'row'}} >
                    <img onClick={()=>{SetToday(subtractSevenDays(today));update()}} src={'/static/back.png'} style={{height:15,width:15,marginRight:10,opacity:0.7,cursor:'pointer'}}  />
                    <h1 style={{margin:0,fontFamily:'ml',fontSize:18,color:'#ff9900'}} >{startOfWeek.toLocaleDateString()}</h1>
                    <img onClick={()=>{SetToday(addSevenDays(today))}} src={'/static/back.png'} style={{height:15,width:15,transform:'rotate(180deg)',marginLeft:10,opacity:0.7,cursor:'pointer'}}  />

                </div>
                {get_weeks_p_revenue()}
                
            </div>
        )
    }

    function weeksrevenue() {
        return(
            <div style={{width:(width-330)*1/3+35,overflow:'hidden',backgroundColor:'white',borderRadius:10,marginLeft:15,paddingTop:50,marginTop:10,position:'relative'}} >
                <h1 style={{margin:0,fontFamily:'mc',fontSize:20,marginLeft:30,marginBottom:10,marginRight:9,color:'rgba(0,0,0,0.9)'}} >Total revenue</h1>                            
                <div style={{position:'absolute',right:20,top:32,display:'flex',flexDirection:'row'}} >
                    <img onClick={()=>{SetToday(subtractSevenDays(today));update()}} src={'/static/back.png'} style={{height:15,width:15,marginRight:10,opacity:0.7,cursor:'pointer'}}  />
                    <h1 style={{margin:0,fontFamily:'ml',fontSize:18,color:'#ff9900'}} >{startOfWeek.toLocaleDateString()}</h1>
                    <img onClick={()=>{SetToday(addSevenDays(today))}} src={'/static/back.png'} style={{height:15,width:15,transform:'rotate(180deg)',marginLeft:10,opacity:0.7,cursor:'pointer'}}  />

                </div>
                {get_weeks_revenue()}
                
            </div>
        )
    }

    function weekssales() {
        return(
            <div style={{width:(width-330)*1/3,overflow:'hidden',backgroundColor:'white',borderRadius:10,marginLeft:15,paddingTop:50,marginTop:10,position:'relative'}} >
                <h1 style={{margin:0,fontFamily:'mc',fontSize:20,marginLeft:30,marginBottom:10,marginRight:9,color:'rgba(0,0,0,0.9)'}} >Total sales</h1>                            
                <div style={{position:'absolute',right:20,top:32,display:'flex',flexDirection:'row'}} >
                    <img onClick={()=>{SetToday(subtractSevenDays(today));update()}} src={'/static/back.png'} style={{height:15,width:15,marginRight:10,opacity:0.7,cursor:'pointer'}}  />
                    <h1 style={{margin:0,fontFamily:'ml',fontSize:18,color:'#ff9900'}} >{startOfWeek.toLocaleDateString()}</h1>
                    <img onClick={()=>{SetToday(addSevenDays(today))}} src={'/static/back.png'} style={{height:15,width:15,transform:'rotate(180deg)',marginLeft:10,opacity:0.7,cursor:'pointer'}}  />

                </div>
                {get_weeks_sales()}
                
            </div>
        )
    }

    const charts = [weeksorders(),weeksvisits(),weeksprevenue(),weekssales(),weeksrevenue()]



    return(
        <div style={{overflowY:'scroll',height:'100%',display:'flex',alignItems:'center',flexDirection:'column'}} >
            <h1 style={{fontFamily:'mc',fontSize:30,marginRight:9,color:'rgba(0,0,0,0.9)',flexDirection:'column'}} >Analytics overview</h1>                    
                <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center',alignContent:'center',alignItems:'center'}} >
                    {charts.map((chart,yy)=>{
                        return (chart)
                    })}
                </div>
        </div>
    )

}

export default Ananlytics;