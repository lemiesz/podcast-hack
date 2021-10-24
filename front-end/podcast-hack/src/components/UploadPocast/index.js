import React, {useState} from 'react';

function UploadPodcast() {
    const [selectedFile, setSelectedFile] = useState();
    const [isFileLoaded, setFileLoaded] = useState(false);

    return (
        <div>
            <input type="file" name="file"></input>
            <button>Submit</button>
        </div>
    )
}

export default UploadPodcast;