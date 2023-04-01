import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { TbCameraPlus } from "react-icons/tb";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { changeProfile, logout } from "../../Redux Store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import app from "../../../firebase";
import { HTTPMethods } from "../../Utils/HTTPMethods";
import { useNavigate } from "react-router-dom";
const Modal = (props: { setOpen: Dispatch<SetStateAction<any>> }) => {
  const { setOpen } = props;
  const [img, setImg] = useState();
  const [imgUploadProgress, setImgUploadProgress] = useState(0);
  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   to upload image into the firebase
  const uploadImg = (file: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgUploadProgress(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          HTTPMethods.put(`/users/${currentUser._id}`, {
            profilePicture: downloadURL,
          }).then((res) => {});
          dispatch(changeProfile(downloadURL));
        });
      }
    );
  };

  useEffect(() => {
    img && uploadImg(img);
  }, [img]);
  const handleClick = async () => {
    HTTPMethods.deleteUser(`/users/${currentUser._id}`)
      .then((res) => {
        console.log(res);
        dispatch(logout());
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="absolute w-full h-full bg-black/20 flex items-center justify-center ">
      <div className="absolute w-[600px] h-[650px] bg-white rounded-xl flex flex-col gap-2 justify-start items-center overflow-hidden py-2 px-[2px]">
        <p className="w-full h-10 flex justify-between items-center px-2">
          <span className="w-[30%] h-full flex justify-between items-center">
            <button
              onClick={() => setOpen(false)}
              className="hover:bg-black/10 rounded-full p-2">
              <RxCross2 size={20} />
            </button>
            <span className="font-[500] text-xl">Edit Profile</span>
          </span>
          <button className="rounded-full w-[4rem] bg-black text-white py-1 font-[400] hover:bg-black/90">
            Save
          </button>
        </p>
        {/* cover photo and the profile photo */}
        <p className="cover-photo bg-black/30 min-h-[220px] w-full rounded-[1px] flex justify-center items-center relative">
          <span className="bg-black/50 text-white p-2 rounded-full hover:opacity-[0.91] cursor-pointer">
            <TbCameraPlus size={25} />
          </span>
          <span className="absolute left-4 bottom-[-4.6rem] rounded-full w-[120px] bg-red-200 h-[120px] border-4 border-white flex items-center justify-center">
            {imgUploadProgress > 0 ? (
              "Uploading" + imgUploadProgress + "%"
            ) : (
              <label htmlFor="imageUpload" className="absolute">
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  // @ts-ignore
                  onChange={(e) => setImg(e.target.files[0])}
                  className="absolute h-full w-full bg-transparent z-[-1]"
                />
                <span
                  className={`bg-black/50 text-white p-2 rounded-full hover:opacity-[0.91] cursor-pointer absolute top-[-1.2rem] left-[-1.2rem] bg-[url()]`}>
                  <TbCameraPlus size={25} />
                </span>
              </label>
            )}
          </span>
        </p>
        <p className="relative top-20 w-full h-auto min-h-[20rem]">
          <button
            className="rounded-full w-auto max-w-[7rem] px-5 bg-black text-white py-[7px] font-[400] hover:opacity-[0.95]"
            onClick={handleClick}>
            Delete
          </button>
        </p>
      </div>
    </div>
  );
};

export default Modal;
