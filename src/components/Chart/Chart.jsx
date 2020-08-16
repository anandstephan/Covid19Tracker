import React,{useState,useEffect} from 'react'
import { fetchDailyData } from '../../api';
import styles from './Chart.module.css'
import { Line } from 'react-chartjs-2';


const Chart = () =>{

    const [dailyData,setDailyData] = useState([]);

    useEffect(()=>{
        const fetchAPI = async () =>{
            setDailyData(await fetchDailyData())
        }
        fetchAPI()
        console.log(dailyData)
    },[dailyData])
    
    const lineChart = (
        dailyData.length
        ?
        (<Line
        data ={{
            labels:dailyData.map(({date}) =>date),
            datasets:[{
                data:dailyData.map(({confirmed}) => confirmed),
                label:'Infected',
                borderColor:'#3333ff',
                fill:'true'
            },{
                data:dailyData.map(({deaths}) => deaths),
                label:'deaths',
                borderColor:'red',
                backgroundColor:'rgb(255,0,0,0.5)',
                fill:'true'
            }]
        }}
        />):null
    )
    return (
        <div className={styles.container}>
            {lineChart}
        </div>
    )
}

export default Chart