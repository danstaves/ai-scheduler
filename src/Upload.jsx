import { useMemo, useState } from 'react';
import style from './Upload.module.css';

function Upload({onUpload}){
    const [file, setFile] = useState(null);
    const fileName = useMemo(() => file ? file.name : "No File Selected", [file]);
    const [numClasses, setNumClasses] = useState(4);
    const [busy, setBusy] = useState(false);

    function onSelectFileClick(){
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.mhtml';
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

    function uploadFile(){
        setBusy(true);

		const formData = new FormData();
		formData.append("file", file);
		formData.append("numClasses", numClasses);

		fetch("/api/getSchedule", {
			method: "POST",
			body: formData
		}).then(async res => {
			if(res.ok){
				console.log("File uploaded successfully");
                console.log(await res.text())
                onUpload({url: res.url, status:"success"});
			}else{
				console.error("Failed to upload file");
                onUpload({status:"error"});
			}
            setBusy(false);
		});
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

            {file && !busy && <button onClick={uploadFile} className={style.uploadButton}>Upload</button>}
            {busy && <p>Uploading File... Please Wait.</p>}
        </div>
    );
}
export default Upload;