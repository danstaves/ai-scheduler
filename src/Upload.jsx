import { useState } from 'react';
import style from './Upload.module.css';

function Upload(){
    const [fileName, setFileName] = useState("No File Selected");
    function onSelectFileClick(){
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => {
            const file = e.target.files[0];
            setFileName(file.name);
        }
        input.click();
    }
    return (
        <div className={style.Upload}>
            <h1>Let us plan your next Semester</h1>
            <p><span style={{fontWeight:"bold"}}>Upload your Degree Evaluation</span> to get a personalized recommendation.</p>
            <div className={style.uploadButton}>
                <button onClick={onSelectFileClick}>↗ Select File</button>
                <p>{fileName}</p>
            </div>
        </div>
    );
}
export default Upload;