import { useEffect, useState, useCallback, useRef } from "react";
import style from "./Processing.module.css";

export default function Processing({url, onProcessingComplete}){
    const [status, setStatus] = useState("Communicating with server...");
    const [scheduleGenerated, setScheduleGenerated] = useState(false);
    const [schedule, setSchedule] = useState(null);
    const pollRef = useRef(0);

    const pollUrl = useCallback((queryUrl)=>{
        fetch(queryUrl)
        .then(res=>res.ok?res.json(): Promise.reject(res))
        .then(data=>{
            console.log("Received data: ", data);
            switch(data.status){
                case "parsing":
                    setStatus("Parsing student record");
                    break;
                case "analyzing":
                    setStatus("Retrieving class availability");
                    break;
                case "scheduling":
                    setStatus("Generating schedule");
                    break;
                case "success":
                    console.log("Cease Polling");
                    clearInterval(pollRef.current);
                    setSchedule(data.schedule);
                    setScheduleGenerated(true);
                    break;
                default:
                    break;
            }
        })
        .catch(err=>{
            console.error(`Error fetching data: ${err}`);
            setStatus("Error communicating with server. Please try again later.");
            clearInterval(pollRef.current);
        });
    },[]);

    useEffect(()=>{
        const poll = setInterval(()=>pollUrl(url), 1000);
        pollRef.current = poll;

        return ()=>{
            clearInterval(poll);
        };
    }, [pollUrl, url]);

    return (
        <div className={style.Processing}>
            <h1>Generating your Class Schedule</h1>
            {!scheduleGenerated && <p><span style={{fontWeight:"bold"}}>Please Wait...</span> {status}</p>}
            {scheduleGenerated && <button onClick={()=>onProcessingComplete(schedule)}>View Schedule</button>}
        </div>
    );
}