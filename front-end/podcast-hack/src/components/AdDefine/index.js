import React, { useState } from 'react';

function AdDefine() {
    const [name, setName] = useState('')
    const [adFile, setAdFile] = useState();
    const [adFileSelected, setAdFileSelected] = useState(false);
    const [firstTimeStamp, setFirstTimeStamp] = useState('');
    const [midTimeStamp, setMidTimeStamp] = useState('');
    const [FinalTimeStamp, setFinalTimeStamp] = useState('');

    const addAd = async (e) => {

    }

    return (
        <div>
            <form>
                <label>Ad Name:</label>
                <input type="text"></input>
                <label>Ad File</label>
                <input type="file" name="file"></input>
                <label>First Ad TimeStamp</label>
                <input type="time" name="timestamp" step="1"></input>
                <label>Mid Ad TimeStamp</label>
                <input type="time" name="timestamp" step="2"></input>
                <label>Final Ad TimeStamp</label>
                <input type="time" name="timestamp" step="3"></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AdDefine;