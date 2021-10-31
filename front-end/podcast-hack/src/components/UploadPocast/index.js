import React, { useState } from 'react';
import AdDefine from '../AdDefine';
import { useDispatch } from 'react-redux';
import podcastUpload from '../../store/podcast'

function UploadPodcast() {
    const [selectedFile, setSelectedFile] = useState();
    const [isFileLoaded, setIsFileLoaded] = useState(false);
    const [podCastName, setPodcastName] = useState('');
    const [podDesc, setPodDesc] = useState('');
    const [firstTimeStamp, setFirstTimeStamp] = useState('');
    const [finalTimeStamp, setFinalTimeStamp] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            selectedFile,
            podCastName,
            podDesc
        }

        const fileUpload = await dispatch(podcastUpload(payload))
        console.log(fileUpload);
    }

    return (
        <div>
            <h1>Podcast Upload Component</h1>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" onChange={setPodcastName}></input>
                <input type="file" name="file"></input>
                <label>RSS Feed</label>
                <input type="text"></input>
                <label>Description:</label>
                <input type="textarea" onChange={setPodDesc}></input>
                <label>First Ad Break MetaData TimeStamp</label>
                <input type="time" name="timestamp" step="1" onChange={(e) => setFirstTimeStamp(e.target.value)}></input>
                <label>Final Ad TimeStamp</label>
                <input type="time" name="timestamp" step="3" onChange={(e) => setFinalTimeStamp(e.target.value)}></input>
                
                <button type="submit">Submit</button>
            </form>
            <div>
                <AdDefine />
            </div>
        </div>
    )
}

export default UploadPodcast;