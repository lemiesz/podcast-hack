import React, { useState } from 'react';
import api from '../../api';
import { useParams } from 'react-router-dom';

function AdDefine() {

    const { id } = useParams()
    const [name, setName] = useState('')
    const [adFile, setAdFile] = useState();
    const [adFileSelected, setAdFileSelected] = useState(false);
    const [firstTimeStamp, setFirstTimeStamp] = useState('');
    const [finalTimeStamp, setFinalTimeStamp] = useState('');

    const addAd = async (e) => {
        e.preventDefault();
        setAdFileSelected(true);

        await api.defineAdOnPodcast({id, name, firstTimeStamp, finalTimeStamp})
        console.log(await api.defineAdOnPodcast({ id, name, firstTimeStamp, finalTimeStamp }))
    }

    return (
        <div>
            <h1>Ad Upload Component</h1>
            <form onSubmit={addAd}>
                <label>Ad Name:</label>
                <input type="text" onChange={(e) => setName( e.target.value)}></input>
                <label>Ad File</label>
                <input type="file" name="file" onChange={(e) => setAdFile(e.target.value)}></input>
                <label>First Ad TimeStamp</label>
                <input type="time" name="timestamp" step="1" onChange={(e) => setFirstTimeStamp(e.target.value)}></input>
                <label>Final Ad TimeStamp</label>
                <input type="time" name="timestamp" step="3" onChange={(e) => setFinalTimeStamp(e.target.value)}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AdDefine;