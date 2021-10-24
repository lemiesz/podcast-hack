import React, {useState} from 'react';

function UploadPodcast() {
    const [selectedFile, setSelectedFile] = useState();
    const [isFileLoaded, setIsFileLoaded] = useState(false);

    const fileUpload = (e) => {
        setSelectedFile(e.target.value);
        setIsFileLoaded(true);
    }

    return (
        <div>
            <input type="file" name="file" onChange={fileUpload}></input>
            <button>Submit</button>
        </div>
    )
}

export default UploadPodcast;