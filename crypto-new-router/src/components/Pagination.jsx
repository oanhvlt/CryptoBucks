import React, { useContext, useRef, useState } from "react";
import { CryptoContext } from "../context/CryptoContext";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

const PerPage = () => {
  const { setPerPage, cryptoData } = useContext(CryptoContext);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let val = inputRef.current.value;
    if (val !== 0) {
      setPerPage(val);
      inputRef.current.value = val;
    }
  };

  return (
    <form className="relative flex items-center mr-12"
      onSubmit={handleSubmit}
    >
      <label htmlFor="perpage"
        className="relative flex justify-center items-center mr-2 font-bold">
        per page:{" "}
      </label>
      <input
        type="number"
        name="perpage"
        min={1}
        max={250}
        ref={inputRef}
        placeholder="10"
        className="w-16 rounded bg-gray-200 placeholder:text-gray-100
     pl-2 required outline-0 border border-gray-100 focus:border-cyan "/>
      <button type="submit" className="outline-0 hover:text-cyan w-8 ml-1 cursor-pointer">
        {/* <img src={submitIcon} alt="submit" className="w-full h-auto" /> */}
        <IoLogOutOutline size={18} />
      </button>
    </form>
  );
};


const Pagination = () => {
  //const [page, setPage] = useState(1);

  let { page, setPage, totalItems, perPage, cryptoData } = useContext(CryptoContext);
  console.log("cryptoData: ", cryptoData);
  console.log("totalItems: ", totalItems);
  const TotalNumber = Math.ceil(totalItems / perPage);

  const next = () => {
    if (page === TotalNumber) {
      return null;
    } else {
      setPage(page + 1);
    }
  }

  const prev = () => {
    if (page === 1) {
      return null;
    } else {
      setPage(page - 1);
    }
  }

  const multiStepNext = () => {
    if (page + 3 >= TotalNumber) {
      setPage(TotalNumber - 1);
    } else {
      setPage(page + 3);
    }
  }

  const multiStepPrev = () => {
    if (page - 3 <= 1) {
      setPage(TotalNumber + 1);
    } else {
      setPage(page - 2);
    }
  }
  if (cryptoData) {
    console.log("cryptoData: ", cryptoData);
    return (
      <div className="flex items-center">
        <PerPage />
        <ul className="flex items-center justify-end text-[12px]" >
          <li className="flex items-center">
            <button className="outline-0 hover:text-cyan w-8 cursor-pointer"
              onClick={prev}>
              <FaRegArrowAltCircleLeft size={18} />
            </button>
          </li>
          {
            page + 1 === TotalNumber || page === TotalNumber ? (
              <li className="flex items-center">
                <button className="ouline-0 hover:text-cyan  rounded-full w-7 h-7 flex 
                  items-center justify-center text-[16px]"
                  onClick={multiStepPrev}>
                  ...
                </button>
              </li>
            ) : null
          }
          {
            page - 1 !== 0 ? (
              <li className="flex items-center">
                <button className="ouline-0 hover:text-cyan rounded-full w-7 h-7 flex 
                  items-center justify-center bg-gray-200 mx-1.5"
                  onClick={prev}>
                  {page - 1}
                </button>
              </li>
            ) : null
          }
          <li className="flex items-center">
            <button disabled className="ouline-0 rounded-full w-7 h-7 flex 
                items-center justify-center bg-cyan text-gray-300 mx-1.5">
              {page}
            </button>
          </li>
          {
            page + 1 !== TotalNumber && page !== TotalNumber ? (
              <li className="flex items-center">
                <button className="ouline-0 hover:text-cyan rounded-full  w-7 h-7 flex 
                items-center justify-center bg-gray-200 mx-1.5"
                  onClick={next}>
                  {page + 1}
                </button>
              </li>
            ) : null
          }
          {
            page + 1 !== TotalNumber && page !== TotalNumber ? (
              <li className="flex items-center">
                <button className="ouline-0 hover:text-cyan  rounded-full w-7 h-7
              flex items-center justify-center text-[16px]"
                  onClick={multiStepNext}>
                  ...
                </button>
              </li>
            ) : null
          }
          {
            page !== TotalNumber ? (
              <li>
                <button className="ouline-0 hover:text-cyan rounded-full w-7 h-7 flex 
                items-center justify-center bg-gray-200 mx-1.5"
                  onClick={() => setPage(TotalNumber)}>
                  {TotalNumber}
                </button>
              </li>
            ) : null
          }
          <li className="outline-0 hover:text-cyan w-8 ml-3 cursor-pointer">
            <FaRegArrowAltCircleRight size={18} onClick={next} />
          </li>
        </ul>
      </div>
    )
  } else {
    return null;
  }
}

export default Pagination;
