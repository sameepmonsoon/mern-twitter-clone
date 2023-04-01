import React, { Dispatch, SetStateAction, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { TbCameraPlus } from "react-icons/tb";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
const Modal = (props: { setOpen: Dispatch<SetStateAction<any>> }) => {
  const { setOpen } = props;
  const [img, setImg] = useState([]);
  const [imgUploadProgress, setImgUploadProgress] = useState(0);
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
            <label htmlFor="imageUpload" className="absolute">
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                // @ts-ignore
                onChange={(e) => setImg(e.target.files[0])}
                className="absolute h-full w-full bg-transparent z-[-1]"
              />
              <span className="bg-black/50 text-white p-2 rounded-full hover:opacity-[0.91] cursor-pointer absolute top-[-1.2rem] left-[-1.2rem]">
                <TbCameraPlus size={25} />
              </span>
            </label>
          </span>
        </p>
        <p className="relative top-20 w-full h-auto min-h-[20rem]">
          <button className="rounded-full w-auto max-w-[7rem] px-5 bg-black text-white py-[7px] font-[400] hover:opacity-[0.95]">
            Delete
          </button>
        </p>
      </div>
    </div>
  );
};

export default Modal;
