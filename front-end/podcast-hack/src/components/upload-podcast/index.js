import React, { useState } from "react";
import AdDefine from "../ad-define/index";
import { useDispatch } from "react-redux";
import { podcastUpload } from "../../store/podcast";

function UploadPodcast() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFileLoaded, setIsFileLoaded] = useState(false);
  const [podCastName, setPodcastName] = useState("");
  const [podDesc, setPodDesc] = useState("");
  const [firstTimeStamp, setFirstTimeStamp] = useState("");
  const [finalTimeStamp, setFinalTimeStamp] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      selectedFile,
      podCastName,
      podDesc,
    };

    const fileUpload = await dispatch(podcastUpload(payload));
    console.log(fileUpload);
  };

  return (
    <div className="flex justify-center mt-8">
      <form onSubmit={handleSubmit} className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
        <h1>Podcast Upload Component</h1>
        <label>Name:</label>
        <input type="text" onChange={e => setPodcastName(e.target.value)}></input>
        {/* <label>RSS Feed</label>
        <input type="text"></input> */}
        <div className="m-4">
          <label className="inline-block mb-2 text-gray-500">File Upload</label>
          <div className="flex items-center justify-center w-full">
            <label
              className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
              <div className="flex flex-col items-center justify-center pt-7">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                  Attach a file</p>
              </div>
              <input type="file" className="opacity-0" omChange={e => setSelectedFile(e.target.value)} />
            </label>
          </div>
        </div>
        <label>Description:</label>
        <input type="textarea" onChange={e => setPodDesc(e.target.value)}></input>
        <div className="flex justify-center p-2">
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl">Create</button>
        </div>
        {/* <button type="submit">Submit</button> */}
      </form>
      <div>
        <AdDefine />
      </div>
    </div>
  );
}

export default UploadPodcast;
