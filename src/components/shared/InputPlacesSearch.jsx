"use client";
import { useState } from "react";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { CiSearch } from "react-icons/ci";
import { cityWaterPrices } from "@/constants/data";

const InputPlacesSearch = () => {
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    useGoogle({
      apiKey: process.env.NEXT_PUBLIC_PLACES_SEARCH_API,
    });
  const [value, setValue] = useState("");
  const [showCities, setShowCities] = useState(true);

  const getPlacePredictionsForNZ = (input) => {
    getPlacePredictions({
      input,
      options: {
        componentRestrictions: { country: "nz" },
      },
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();

    const city = value.split(",");
    const cityName = city[city.length - 2].trim();
    const cityFound = cityWaterPrices.filter((item) =>
      cityName.includes(item.city)
    );

    // console.log(cityFound);
  };
  return (
    <div className="w-[80%]  sm:w-1/2">
      <div className="relative w-full z-10">
        <CiSearch className="absolute top-5 left-4 text-gray-500 text-[18px] sm:text-[20px] lg:text-[24px] " />
        <input
          className="w-full pl-12 pr-40   py-5 rounded-full    focus:outline-none placeholder-gray-500 bg-white shadow-lg text-[12px] sm:text-[14px] lg:text-[16px]"
          type="text"
          value={value}
          placeholder="Enter your address"
          onChange={(evt) => {
            setValue(evt.target.value);
            getPlacePredictionsForNZ(evt.target.value);
            setShowCities(true);
          }}
        />
        <button
          className="absolute    md:right-2 md:top-2  rounded-full border-none bg-primaryColor  text-white text-lg cursor-pointer px-4 py-3  focus:outline-none font-semibold text-[16px] hidden  md:block"
          type="submit"
          onClick={submitHandler}
        >
          Place Order
        </button>
        <button
          className="absolute  mt-2 w-full -z-10     rounded-full border-none bg-primaryColor  text-white text-lg cursor-pointer px-4 py-3  focus:outline-none font-semibold text-[16px] block  md:hidden"
          type="submit"
          onClick={submitHandler}
        >
          Place Order
        </button>
        <div className=" h-48 overflow-y-auto z-10">
          {!isPlacePredictionsLoading && showCities && (
            <ul className="w-full mt-[1px] rounded-lg bg-white">
              {placePredictions.map((item, index) => (
                <li
                  key={index}
                  className="cursor-pointer px-4  hover:bg-gray-500 bg-white z-10 py-2  text-[14px]  font-normal  border-b border-gray-300  transition-all duration-300 ease-in-out  hover:text-white hover:shadow-lg"
                  onClick={() => {
                    setValue(item.description);
                    setShowCities(false);
                  }}
                >
                  {item.description}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputPlacesSearch;
