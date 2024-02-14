"use client";
import { useState } from "react";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { CiSearch } from "react-icons/ci";

const InputPlacesSearch = () => {
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    useGoogle({
      apiKey: process.env.NEXT_PUBLIC_PLACES_SEARCH_API,
    });
  const [value, setValue] = useState("");

  console.log(placePredictions);
  return (
    <div className="w-[80%]  sm:w-1/2">
      <div className="relative w-full">
        <CiSearch className="absolute top-5 left-4 text-gray-500 text-[18px] sm:text-[20px] lg:text-[24px] " />
        <input
          className="w-full pl-12  py-5 rounded-full    focus:outline-none placeholder-gray-500 bg-white shadow-lg text-[12px] sm:text-[14px] lg:text-[16px]"
          type="text"
          value={value}
          placeholder="Enter your address"
          onChange={(evt) => {
            getPlacePredictions({ input: evt.target.value });
            setValue(evt.target.value);
          }}
        />
        <button
          className="absolute right-2 top-2  rounded-full border-none bg-primaryColor  text-white text-lg cursor-pointer px-4 py-3  focus:outline-none font-semibold text-[16px]  hidden custom-md:block "
          type="submit"
        >
          Place Order
        </button>
      </div>
      <button
        className="  rounded-full border-none bg-primaryColor  text-white text-lg cursor-pointer px-4 py-3  focus:outline-none font-semibold text-[12px]  block custom-md:hidden mt-4 mx-auto"
        type="submit"
      >
        Place Order
      </button>
      <div className="mt-4 h-48 overflow-y-auto">
        {!isPlacePredictionsLoading && (
          <ul className="w-full">
            {placePredictions.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => setValue(item.description)}
              >
                {item.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InputPlacesSearch;
