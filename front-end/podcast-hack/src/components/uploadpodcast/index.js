import React, { useState } from 'react';
import AdDefine from '../addefine';
import { useDispatch } from 'react-redux';
import { podcastUpload } from '../../store/podcast';

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
            <main className="container mx-auto max-w-screen-lg h-full">
                
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input type="text" onChange={setPodcastName}></input>
                    <label className="w-64 flex flex-col items-center px-4 py-6 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple-600 ease-linear transition-all duration-150">
                        <span class="mt-2 text-base leading-normal">Select a file</span>
                        <input type="file" name="file"></input>
                    </label>
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
            </main>
            <div>
                <AdDefine />
            </div>
        </div>
    )
}

export default UploadPodcast;