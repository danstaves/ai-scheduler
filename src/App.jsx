import { useState } from 'react';
import styles from './App.module.css';
import logo from './udmercy_logo.png';
import Landing from "./Landing";
import Upload from "./Upload";

const States = Object.freeze({
	landing: 0,
	upload: 1,
});

function App() {
	const [currentState, setCurrentState] = useState(States.landing);

	
	return(
		<div className={styles.appRoot}>
			{currentState === States.landing && <Landing onClick={()=>setCurrentState(States.upload)}/>}
			{currentState === States.upload && <Upload/>}
			<img className={styles.logo} src={logo} alt="" />
		</div>
	);
	
}

export default App;
