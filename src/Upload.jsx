import { useMemo, useState } from 'react';
import style from './Upload.module.css';

function Upload(){
    const [file, setFile] = useState(null);
    const fileName = useMemo(() => file ? file.name : "No File Selected", [file]);
    const [numClasses, setNumClasses] = useState(4);

    function onSelectFileClick(){
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => {
            const file = e.target.files[0];
            setFile(file);
        }
        input.click();
    }

    function onSetNumClasses(e){
        const newNum = e.target.value;
        if(/[\d]+/.test(newNum)) setNumClasses(newNum);
    }

    return (
        <div className={style.Upload}>
            <h1>Let us plan your next Semester</h1>
            <p><span style={{fontWeight:"bold"}}>Upload your Degree Evaluation</span> to get a personalized recommendation.</p>
            <div className={style.selectButton}>
                <button onClick={onSelectFileClick}>↗ Select File</button>
                <p>{fileName}</p>
            </div>

            {file && <div className={style.creditHours}>
                <p>How many classes would you like to take?</p>
                <input type="number" min="1" max="20" value={numClasses} onChange={onSetNumClasses}/>
            </div>}

            {file && <button className={style.uploadButton}>Upload</button>}
        </div>
    );
}
export default Upload;