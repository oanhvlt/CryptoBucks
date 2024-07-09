import React, { useContext, useRef, useState } from "react";
import { CryptoContext } from "./../context/CryptoContext";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const PerPage = () => {
  const { setPerPage } = useContext(CryptoContext);
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
     pl-2 required outline-0 border border-transparent focus:border-cyan leading-4 "/>
      <button type="submit" className="ml-1 cursor-pointer">
        {/* <img src={submitIcon} alt="submit" className="w-full h-auto" /> */}
        <FaRegArrowAltCircleRight size={18} />
      </button>
    </form>
  );
};


const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const TotalNumner = 250
  //const { totalPages } = useContext(CryptoContext);
  const next = () => {
    if (currentPage === TotalNumner) {
      return null;
    } else {
      setCurrentPage(currentPage + 1);
    }
  }

  const prev = () => {
    if (currentPage === 1) {
      return null;
    } else {
      setCurrentPage(currentPage - 1);
    }
  }

  const multiStepNext = () => {
    if (currentPage + 3 >= TotalNumner) {
      setCurrentPage(TotalNumner - 1);
    } else {
      setCurrentPage(currentPage + 3);
    }
  }

  const multiStepPrev = () => {
    if (currentPage - 3 <= 1) {
      setCurrentPage(TotalNumner + 1);
    } else {
      setCurrentPage(currentPage - 2);
    }
  }

  return (
    <div className="flex items-center">
      <ul className="flex items-center justify-end text-[12px]" >
        <li className="flex items-center">
          <button className="outline-0 hover:text-cyan w-8"
            onClick={prev}>
            <FaRegArrowAltCircleLeft size={18} />
          </button>
        </li>
        {
          currentPage + 1 === TotalNumner || currentPage === TotalNumner ? (
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
          currentPage - 1 !== 0 ? (
            <li className="flex items-center">
              <button className="ouline-0 hover:text-cyan rounded-full w-7 h-7 flex 
                  items-center justify-center bg-gray-200 mx-1.5"
                onClick={prev}>
                {currentPage - 1}
              </button>
            </li>
          ) : null
        }
        <li className="flex items-center">
          <button disabled className="ouline-0 rounded-full w-7 h-7 flex 
                items-center justify-center bg-cyan text-gray-300 mx-1.5">
            {currentPage}
          </button>
        </li>
        {
          currentPage + 1 !== TotalNumner && currentPage !== TotalNumner ? (
            <li className="flex items-center">
              <button className="ouline-0 hover:text-cyan rounded-full  w-7 h-7 flex 
                items-center justify-center bg-gray-200 mx-1.5"
                onClick={next}>
                {currentPage + 1}
              </button>
            </li>
          ) : null
        }
        {
          currentPage + 1 !== TotalNumner && currentPage !== TotalNumner ? (
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
          currentPage !== TotalNumner ? (
            <li>
              <button className="ouline-0 hover:text-cyan rounded-full w-7 h-7 flex 
                items-center justify-center bg-gray-200 mx-1.5"
                onClick={() => setCurrentPage(TotalNumner)}>
                {TotalNumner}
              </button>
            </li>
          ) : null
        }
        <li className="outline-0 hover:text-cyan w-8 ml-3">
          <FaRegArrowAltCircleRight size={18} onClick={next} />
        </li>
      </ul>
    </div>
  )
}
export default Pagination;
