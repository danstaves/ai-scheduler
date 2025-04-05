import { useState } from 'react';
import styles from './App.module.css';
import logo from './udmercy_logo.png';
import Landing from "./Landing";
import Upload from "./Upload";
import Processing from "./Processing";
import Calendar from './Calendar';

const States = Object.freeze({
	landing: 0,
	upload: 1,
	processing: 2,
	schedule: 3,
});

const sampleClasses = [
	{title:"Math 101", startTime:"08:00", endTime:"09:30", daysOfWeek:[1,3]},
	{title:"CS 102", startTime:"10:00", endTime:"11:30", daysOfWeek:[2,4]},
	{title:"History 201", startTime:"12:00", endTime:"13:30", daysOfWeek:[1,3,5]},
	{title:"Physics 301", startTime:"14:00", endTime:"15:30", daysOfWeek:[2,4]},
]

function App() {
	const [currentState, setCurrentState] = useState(States.landing);
	const [data, setData] = useState({url:""});

	function onUpload(upload){
		setData(cur=>({...cur, url:upload.url}));
		setCurrentState(States.processing);
	}

	function displaySchedule(schedule){
		setCurrentState(States.schedule);
	}

	return(
		<div className={styles.appRoot}>
			{currentState === States.landing && <Landing onClick={()=>setCurrentState(States.upload)}/>}
			{currentState === States.upload && <Upload onUpload={onUpload}/>}
			{currentState === States.processing && <Processing url={data.url} onProcessingComplete={displaySchedule}/>}
			{currentState === States.schedule && <Calendar classSchedule={sampleClasses}/>}
			<img className={styles.logo} src={logo} alt="" />
		</div>
	);
	
}

export default App;
