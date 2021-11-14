import React, { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

function AdDefine() {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState("");
  const [adFile, setAdFile] = useState("");
  const [, setAdFileSelected] = useState(false);
  const [firstTimeStamp, setFirstTimeStamp] = useState("");
  const [finalTimeStamp, setFinalTimeStamp] = useState("");

  const addAd = async (e: FormEvent<any>) => {
    e.preventDefault();
    setAdFileSelected(true);

    const result = await api.defineAdOnPodcast({
      podcastId: id,
      name,
      timeStartMs: firstTimeStamp,
      timeEndMs: finalTimeStamp,
      adFileRef: adFile,
    });
    console.log(result);
  };

  return (
    <div>
      <h1>Ad Upload Component</h1>
      <form onSubmit={addAd}>
        <label>Ad Name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)}></input>
        <label>Ad File</label>
        <input
          type="file"
          name="file"
          onChange={(e) => setAdFile(e.target.value)}
        ></input>
        <label>First Ad TimeStamp</label>
        <input
          type="time"
          name="timestamp"
          step="1"
          onChange={(e) => setFirstTimeStamp(e.target.value)}
        ></input>
        <label>Final Ad TimeStamp</label>
        <input
          type="time"
          name="timestamp"
          step="3"
          onChange={(e) => setFinalTimeStamp(e.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AdDefine;
