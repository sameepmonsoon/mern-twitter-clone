import React, { useContext } from "react";
import { BsTwitter, FiSearch } from "react-icons/all";
import { MyContext } from "../../App";
const Navbar = (props: { title: String }) => {
  const { title } = props;
  const { setSiderState } = useContext(MyContext);
  return (
    <div className="navbr grid grid-cols-1 md:grid-cols-4 h-[5rem] justify-center items-center overflow-hidden">
      <div className="item1 mx-auto md:mx-0 flex flex-row justify-end lg:pr-[9.5rem] md:pr-[2rem] text-blue-400 ">
        <MyContext.Consumer>
          {(value) => (
            <BsTwitter
              size={35}
              onClick={() => setSiderState((prev: boolean) => !prev)}
              className="cursor-pointer"
            />
          )}
        </MyContext.Consumer>
      </div>
      <div className="hidden min-w-[55vh] col-span-2 md:border-x-[1px] md:border-slate-200 md:px-6 h-full md:my-0 md:flex flex-row items-center justify-start">
        <h2 className="font-semibold text-2xl">{title}</h2>
      </div>
      <div className="group hidden lg:flex flex-row items-center w-[65%] ml-10 ">
        <FiSearch
          size={20}
          className="absolute ml-3 text-black/60 focus:text-blue-400 group-focus-within:text-blue-400"
        />
        <input
          type="text"
          name="search"
          id="search"
          className="rounded-full bg-gray-100 text-black/60 py-3 px-10 w-full focus:ring-blue-400 focus:ring-1 outline-none bg-no-repeat bg-right "
        />
      </div>
    </div>
  );
};

export default Navbar;
