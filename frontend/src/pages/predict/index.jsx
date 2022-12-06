import Image from "next/image";
import { useState } from "react";

export default function rentPreict() {
  const [data, setData] = useState();

  const handelSubmit = async (event) => {
    event.preventDefault();

    const data = {
      region: event.target.region.value,
      sqfeet: event.target.sqfeet.value,
      beds: event.target.beds.value,
      baths: event.target.baths.value,
    };

    console.log({ data });

    const JSONData = JSON.stringify(data);

    const endpoint = "https://fastapirentapp.herokuapp.com/predict";
    // const endpoint = "http://127.0.0.1:8000/predict";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSONData,
    };

    const Response = await fetch(endpoint, options);
    const ResponseJSON = await Response.json();
    console.log(ResponseJSON);
    setData(ResponseJSON.price);
    // alert(`Rent Estimate ${ResponseJSON.price}`);
  };

  return (
    <div>
      <div className="text-center m-5">
        <h1 className="text-4xl font-bold text-teal-700">Rent Prediction</h1>
      </div>
      <div className="border-1 ml-14 mr-14 pl-16 pr-16 pt-16 pb-10 justify-center shadow-2xl rounded-3xl bg-opacity-50 bg-gray-100">
        <div className="flex flex-row justify-center">
          {/* Left Sidde */}
          <div className="flex-1 basis-1/3 justify-end items-end font-sans text-lg ml-5">
            <p className=" mt-5  text-justify">
              To get the prediction of the rent, please fill the form below.
              Enter the details of number of bedrooms, bathrooms, square feet
              and region. The prediction will be displayed below.
            </p>
            <div className="mt-16 flex items-center justify-center">
              <Image
                src="/choose_house.svg"
                height={300}
                width={300}
                alt="cat"
              />
            </div>
          </div>
          {/* Right Side */}
          <div className="ml-10 flex-1 basis-1/2 ">
            <div className="flex items-center justify-center">
              <form onSubmit={handelSubmit}>
                <div className="mb-4">
                  <label className="block text-lg">Region:</label>
                  <input
                    className="border-2 mt-2 border-gray-300 p-2 rounded-lg w-96 h-10 "
                    type="text"
                    id="region"
                    name="region"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-lg">Square Footage:</label>
                  <input
                    className="border-2 mt-2 border-gray-300 p-2 rounded-lg w-96  h-10"
                    type="text"
                    id="sqfeet"
                    name="sqfeet"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-lg">Bedrooms</label>
                  <input
                    className="border-2 mt-2 border-gray-300 p-2 rounded-lg w-96 h-10"
                    type="text"
                    id="beds"
                    name="beds"
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg">Bathrooms</label>
                  <input
                    className="border-2 mt-2 border-gray-300 p-2 rounded-lg w-96 h-10"
                    type="text"
                    id="baths"
                    name="baths"
                    required
                  />
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    className="hover:bg-teal-600 border-2 border-teal-600 text-emerald-900 hover:text-gray-50 py-2 rounded-2xl text-md w-96"
                  >
                    Rent Estimate
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="text-center mt-10">
          {data && (
            <span className=" text-xl px-5 py-2 rounded-2xl bg-teal-700 text-gray-50 hover:border-2 hover:border-teal-700 hover:bg-slate-50 hover:text-teal-900">
              Average Rent: {data - 15} - {data + 15}
            </span>
          )}
        </div>
      </div>
      <footer className="bg-teal-600 justify-center absolute bottom-0 w-screen">
        <p className="text-center text-gray-50">
          Prepared by: Team - DATA DIVE
        </p>
      </footer>
    </div>
  );
}
