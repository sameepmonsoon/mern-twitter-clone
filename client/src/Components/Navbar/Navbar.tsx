import React from "react";
import { BsTwitter, FiSearch } from "react-icons/all";
const Navbar = (props: { title: String }) => {
  const { title } = props;
  return (
    <div className="navbr grid grid-cols-1 md:grid-cols-4 h-[5rem] justify-center items-center">
      <div className="item1 mx-auto md:mx-0 flex flex-row justify-end md:pr-[9rem] text-blue-400">
        <BsTwitter size={35} />
      </div>
      <div className="col-span-2 md:border-x-[1px] md:border-slate-200 md:px-6 h-full md:my-0 flex flex-row items-center justify-start">
        <h2 className="font-semibold text-2xl">{title}</h2>
      </div>
      <div className=" px-0 md:px-6  flex flex-row items-center ml-4">
        <FiSearch size={20} className="absolute ml-3" />
        <input
          type="search"
          name="search"
          id="search"
          className="rounded-full bg-blue-100 py-3 px-9"
        />
      </div>
    </div>
  );
};

export default Navbar;
