import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

interface SearchBoxProps {
  name?: string;
  label?: string;
  placeholder?: string;
  onDispatch?: any;
  buttonName?: string;
}
const Searchbox = ({
  name,
  onDispatch,
  placeholder,
  buttonName,
}: SearchBoxProps) => {
  let [value, setValue] = useState("");
  let [isShow, setIsShow] = useState<boolean>(false);
  function handleFunction() {
    setIsShow(!isShow);
  }
  
  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event?.target?.value);
  }
  return (
    <div className="gap-2 w-fit ml-auto  mb-2">
      {isShow}
      {!isShow && (
        <IoSearchSharp
          onClick={handleFunction}
          size={20}
          className="text-gray-500  h-10 mr-2  w-10 hover:scale-110 cursor-pointer  mx-auto "
        />
      )}
      {isShow && (
        <div className="">
          <input
            autoFocus
            className=" px-4  p-2 h-10 bg-white border text-gray-700
    border-gray-200 rounded-l-lg
    focus:outline-none
    animate-slideInLeft"
            name={name || "searchInput"}
            placeholder={placeholder || "Search"}
            onInput={handleInput}
            type="text"
            onKeyDown={(event) => {
              if (event.key == "Enter") {
                setIsShow(false);
                setValue("");
                if (typeof onDispatch === "function") onDispatch(value);
              } else if (event.key == "Escape") {
                setIsShow(false);
                setValue("");
              }
            }}
            value={value}
          />

          <button
            className={`rounded-r-lg bg-primary p-2 px-4 text-white`}
            onClick={() => {
              setIsShow(false);
              setValue("");
              if (typeof onDispatch === "function") onDispatch(value);
            }}
          >
            {value ? buttonName || "Search" : "X"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Searchbox;
