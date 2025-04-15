import { useState } from 'react';
import styles from './App.module.css';
import logo from './udmercy_logo.png';
import Landing from "./Landing";
import Upload from "./Upload";
import Processing from "./Processing";
import Calendar from './Calendar';
import {data as sampleClasses} from './courseData.js';

const States = Object.freeze({
	landing: 0,
	upload: 1,
	processing: 2,
	schedule: 3,
});

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
