import { useEffect, useState } from "react";
import { client ,URL} from "../../service/api";


export const Datebase = () => {
    const [data,setData] = useState([]);

    useEffect(()=>{
        const asyncRun = async () =>{
            setData(await client.get(``))
        }
        asyncRun()
    },[])
}