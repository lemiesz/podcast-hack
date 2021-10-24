import React, { useState } from 'react';
import api from '../../api';

function UploadPodcast() {
    const [selectedFile, setSelectedFile] = useState();
    const [isFileLoaded, setIsFileLoaded] = useState(false);
    const [podCastName, setPodcastName] = useState('');
    const [podDesc, setPodDesc] = useState('');

    const fileUpload = async (e) => {
        setSelectedFile(e.target.value);
        setIsFileLoaded(true);

        const podcaat = {

        }
       await api.uploadPodcast({ selectedFile, podCastName, podDesc });
    }

    return (
        <div>
            <form onSubmit={fileUpload}>
                <label>Name:</label>
                <input type="text" onChange={setPodcastName}></input>
                <input type="file" name="file"></input>
                <label>Description:</label>
                <input type="textarea" onChange={setPodDesc}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default UploadPodcast;