import { useContext, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { CryptoContext } from "../context/CryptoContext";
import debounce from "lodash.debounce";

const SearchInput = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("")
  let { searchData, setSearchData, setCoinSearch } = useContext(CryptoContext)


  let handleInput = (e) => {
    e.preventDefault()
    let query = e.target.value
    setSearchText(query)
    handleSearch(query)
  }

  const selectCoin = (coin) => {
    setCoinSearch(coin);
    setSearchText("");
    setSearchData();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchText);
  }

  return (
    <>
      <form onSubmit={handleSubmit}
        className="w-[100%] relative flex items-center ml-2 font-nunito">
        <input className="w-full pl-2 rounded bg-gray-200 placeholder:text-gray-100 text-[13px]
        required outline-0 border border-transparent focus:border-cyan"
          type="text" name="search" placeholder="search here..."
          onChange={handleInput}
          value={searchText}
        />
        <button type="submit" className="absolute right-1 cursor-pointer">
          <CiSearch size={18} className="w-full h-auto" />
        </button>
      </form>
      {
        searchText.length > 0 ? (
          <ul className="absolute top-7 left-2 w-96 h-96 rounded
          overflow-x-hidden py-1 bg-[#817f7f] 
          backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200">
            {
              searchData ? (
                searchData.map((item) => (
                  <li key={item.id} onClick={() => selectCoin(item.id)}>
                    <div className="flex justify-between ml-4 my-2 text-[13px] cursor-pointer">
                      <div> <span>{item.symbol}</span></div>
                      <div className="w-[70%] flex justify-between ">
                        <span>{item.name}</span>
                        <span>{item.id}</span>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <div className="w-8 h-8 border-4 border-cyan rounded-full
                border-b-gray-200 animate-spin" role="status" />
                  <span className="ml-2">Searching...</span>
                </div>
              )
            }

          </ul>
        ) : null
      }
    </>
  )
}

const Search = () => {
  let { getSearchResult } = useContext(CryptoContext);

  const debounceFunc = debounce(function (val) {
    getSearchResult(val);
  }, 10);

  return (
    <div className="relative">
      <SearchInput handleSearch={debounceFunc} />
    </div>
  );
};

export default Search