import React, { useState } from 'react';

function AdDefine() {

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
            </form>
        </div>
    )
}

export default AdDefine;