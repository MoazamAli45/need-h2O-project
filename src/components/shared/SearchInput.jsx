"use client";
import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";

import { useContext } from "react";
import OrderContext from "@/context/OrderProvider";
import { useRouter } from "next/navigation";
import axios from "axios";

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  const [cityWaterPrices, setCityWaterPrices] = useState([]);

  const router = useRouter();
  const { setAddress, setDetails } = useContext(OrderContext);

  useEffect(() => {
    const fetchWaterPrices = async () => {
      try {
        const response = await axios.get("/api/water-area");
        setCityWaterPrices(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWaterPrices();
  }, []);

  const handleScriptLoad = (updateQuery, autoCompleteRef) => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      {
        // types: ["(cities)"],
        componentRestrictions: { country: "NZ" },
      }
    );

    autoComplete.addListener("place_changed", () => {
      handlePlaceSelect(updateQuery);
    });
  };

  const handlePlaceSelect = async (updateQuery) => {
    const addressObject = await autoComplete.getPlace();
    // console.log(addressObject, "Address Object");
    const address = addressObject.formatted_address;
    const query = addressObject.vicinity;

    updateQuery(query);
    setAddress(address);
    localStorage.setItem("address", address);
    // console.log({ query }, "Query");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let lastSubstring = "";
    const commaIndex = query.lastIndexOf(",");
    if (commaIndex !== -1) {
      lastSubstring = query.substring(commaIndex + 2);
    } else if (query === "Dairy Flat") {
      lastSubstring = "Dairy Flat";
    } else {
      const words = query.split(" ");

      lastSubstring = words[words.length - 1];
    }

    // console.log("Last Substring", lastSubstring);
    const cityFound = cityWaterPrices.filter((item) =>
      lastSubstring.includes(item.city)
    );

    if (cityFound.length > 0) {
      setDetails(cityFound[0]);
      localStorage.setItem("details", JSON.stringify(cityFound[0]));
      router.push("/book-order");
    } else {
      alert(
        "Sorry your area is not listed!, Please call 022-633-3456 to make a booking, Our areas are getting updated regularly"
      );
      return;
    }
  };

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_PLACES_SEARCH_API}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-[80%]  sm:w-1/2">
      <div className="relative w-full z-10">
        <CiSearch className="absolute top-5 left-4 text-gray-500 text-[18px] sm:text-[20px] lg:text-[24px] " />
        <input
          className="w-full pl-12 md:pr-40   py-5 rounded-full    focus:outline-none placeholder-gray-500 bg-white shadow-lg text-[12px] sm:text-[14px] lg:text-[16px]"
          type="text"
          ref={autoCompleteRef}
          placeholder="Enter your address"
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          className="absolute    md:right-2 md:top-2  rounded-full border-none bg-bluePrimary  text-white text-lg cursor-pointer px-4 py-3  focus:outline-none font-semibold text-[16px] hidden  md:block hover:bg-bluePrimary/[.90]"
          type="submit"
          onClick={submitHandler}
        >
          Place Order
        </button>
        <button
          className="absolute  mt-2 w-full z-10     rounded-full border-none bg-bluePrimary  text-white text-lg cursor-pointer px-4 py-3  focus:outline-none font-semibold text-[16px] block  md:hidden"
          type="submit"
          onClick={submitHandler}
        >
          Place Order
        </button>
        <div className=" h-48 overflow-y-auto z-10">
          {/* {!isPlacePredictionsLoading && showCities && (
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
          )} */}
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
