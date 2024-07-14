import React from "react";
import { useNavigate } from "react-router-dom";

const TrendingCoin = ({ data }) => {
  let navigate = useNavigate();

  const getCoinDetails = (id) => {
    navigate(`${id}`);
  };

  return (
    <div onClick={() => getCoinDetails(data.id)}
      className="bg-gray-200 rounded-lg p-4 relative cursor-pointer
    hover:bg-gray-100 hover:bg-opacity-40 text-[15px]">
      {data ?
        <>
          <h3 className="flex items-center my-0.5 gap-1">
            <span className="text-[#aaa] capitalize">name: </span>
            <span className="text-cyan">{data.name} </span>
            <img src={data.small} alt={data.name}
              className="w-[20px] h-[20px] mx-1.5 rounded-full" />
          </h3>
          <h3 className="flex items-center my-0.5 gap-1">
            <span className="text-[#aaa] capitalize">Market cap rank: </span>
            <span className="text-cyan">{data.market_cap_rank} </span>
          </h3>
          <h3 className="flex items-center my-0.5 gap-1">
            <span className="text-[#aaa] capitalize">
              price (in btc):
            </span>
            <span className="text-cyan">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "btc",
                maximumSignificantDigits: 5,
              }).format(data.price_btc)}
            </span>
          </h3>
          <h3 className="flex items-center my-0.5 gap-1">
            <span className="text-[#aaa] capitalize">score:</span>
            <span className="text-cyan">{data.score}</span>
          </h3>
          <img src={data.large} alt={data.name} className="w-[60px] h-auto rounded-full 
          absolute top-5 -right-2 -translate-y-2/4"
          />
        </>
        :
        <div className="w-full  h-full flex justify-center items-center" >
          <div className="w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin "
            role="status" />
          <span className="ml-2">please wait...</span>
        </div>
      }
    </div>
  );
};

export default TrendingCoin;
