import { useSelector } from "react-redux"
import { useRef, useState,useEffect, use } from "react"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from "../firebase"
//Note Write now image update is not working properly, As firebae storage is not allowing to set the storage asking for money
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user)
  const fileRef = useRef(null)
  const [file , setFile] = useState(undefined);
  const [filePerc, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
 

  useEffect(() => {
    if(file){
      handleFileUpload(file);
    }
  },[file]);
  const handleFileUpload = async (file) => {
    const storage=getStorage(app);
    const fileName= new Date().getTime() + file.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercent(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({ ...prev, avatar: downloadURL }));
          // You can also dispatch an action to update the user profile in the store
          // dispatch(updateUserProfile({ ...currentUser, avatar: downloadURL }));
          console.log("File available at", downloadURL);
        })
        // You can also get the download URL here if needed
      }
    );
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile </h1>
      <form className="flex flex-col gap-4">
      <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*"/>
        <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="Profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input type="text" id="username" className="border p-3 rounded-lg" placeholder="username" />
        <input type="email" id="email" className="border p-3 rounded-lg" placeholder="email" />
        <input type="password" id="password" className="border p-3 rounded-lg" placeholder="password" />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">Update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}
