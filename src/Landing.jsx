import styles from './Landing.module.css';


function Landing({onClick}) {
    return (
        <div className={styles.landing}>
            <h1>UDM Advisor Assistant</h1>
            <div>
                <p><span style={{fontWeight:"bold"}}>AI Assistant:</span> Upload your degree evaluation for a recommended course schedule for the Fall 2025 semester.</p>
                <button onClick={onClick}>AI Assistant</button>
            </div>
        </div>
    );
}

export default Landing;