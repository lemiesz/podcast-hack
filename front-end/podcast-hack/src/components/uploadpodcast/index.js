// import React, { useState } from 'react';
// import AdDefine from '../addefine';
// import { useDispatch } from 'react-redux';
// import { podcastUpload } from '../../store/podcast';

// function UploadPodcast() {
//     const [selectedFile, setSelectedFile] = useState();
//     const [isFileLoaded, setIsFileLoaded] = useState(false);
//     const [podCastName, setPodcastName] = useState('');
//     const [podDesc, setPodDesc] = useState('');
//     const [firstTimeStamp, setFirstTimeStamp] = useState('');
//     const [finalTimeStamp, setFinalTimeStamp] = useState('');
//     const dispatch = useDispatch();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const payload = {
//             selectedFile,
//             podCastName,
//             podDesc
//         }

//         const fileUpload = await dispatch(podcastUpload(payload))
//         console.log(fileUpload);
//     }

//     return (
//         <div>
//             <h1>Podcast Upload Component</h1>
//             <main className="container mx-auto max-w-screen-lg h-full">
                
//                 <form onSubmit={handleSubmit}>
//                     <label>Name:</label>
//                     <input type="text" onChange={setPodcastName}></input>
//                     {/* <label className="w-64 flex flex-col items-center px-4 py-6 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple-600 ease-linear transition-all duration-150">
//                         <span class="mt-2 text-base leading-normal">Select a file</span>
//                         <input type="file" name="file"></input>
//                     </label> */}
//                     <div class="flex w-full h-screen items-center justify-center bg-grey-lighter">
//                         <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
//                             <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//                                 <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
//                             </svg>
//                             <span class="mt-2 text-base leading-normal">Select a file</span>
//                             <input type='file' class="hidden" />
//                         </label>
//                     </div>
//                     <label>RSS Feed</label>
//                     <input type="text"></input>
//                     <label>Description:</label>
//                     <input type="textarea" onChange={setPodDesc}></input>
//                     <label>First Ad Break MetaData TimeStamp</label>
//                     <input type="time" name="timestamp" step="1" onChange={(e) => setFirstTimeStamp(e.target.value)}></input>
//                     <label>Final Ad TimeStamp</label>
//                     <input type="time" name="timestamp" step="3" onChange={(e) => setFinalTimeStamp(e.target.value)}></input>

//                     <button type="submit">Submit</button>
//                 </form>
//             </main>


//             <div>
//                 <AdDefine />
//             </div>
//         </div>
//     )
// }

// export default UploadPodcast;