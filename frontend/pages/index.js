import { useState } from "react";
import Image from "next/image";

export default function Home() {
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

    const endpoint = "https://fastapirentanalysis.herokuapp.com/predict";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    <div className="bg-slate-200 ">
      <div className="text-center text-4xl pt-6 text-cyan-800">
        <h1>Rent Analysis</h1>
      </div>

      {/* Landing Area */}
      <div className="border-1  mb-14 pl-16 pr-16 pt-16 pb-14 justify-center">
        <div className="flex flex-row justify-center">
          {/* Left Sidde */}
          <div className="flex-1 basis-1/3 justify-end items-end font-sans text-lg">
            <div className="mt-10  flex items-center justify-center">
              <Image src="/cat.svg" height={300} width={500} alt="cat" />
            </div>
            <div className="mt-5 p-10 text-justify">
              <p>
                <b>Welcome! To rent analysis tool. </b>
                <em>Let's help you to find you home in your budget!</em>

                {/* This is a rent analysis tool that will help you Analys the rent of
              a region. You need to enter the Region, number of bedrooms, number
              of bathrooms and the Square feet required. */}
              </p>
              <p>
                Looking at past rent trends, and using data from consumer
                survey, we would be deriving the rent using prediction model.
              </p>
            </div>
          </div>
          {/* Right Side */}
          <div className="ml-10 flex-1 basis-1/4 ">
            <div className="flex items-center justify-center">
              <div className="mt-16 flex items-center justify-center">
                <Image
                  src="/rent-house.svg"
                  height={500}
                  width={500}
                  alt="rent-house"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prediction  */}
      <div className="border-1 mt-8 ml-14 mr-14 pl-16 pr-16 pt-16 pb-14 justify-center shadow-xl rounded-3xl bg-opacity-50 bg-gray-100">
        <div className="flex flex-row justify-center">
          {/* Left Sidde */}
          <div className="flex-1 basis-1/3 justify-end items-end font-sans text-lg">
            <p className=" mt-5 pr-5 text-justify">
              This tool will help you to get predicted price of the region with
              your desired requirement. On filling the form with your required
              region, sqFeet, beds, & baths tool will show the predicted price.
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
                    className="bg-teal-600 text-gray-50 p-2 rounded-2xl text-md w-96 h-10"
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
            <h1 className="text-2xl ">
              Average Rent: {data - 15} - {data + 15}
            </h1>
          )}
        </div>
      </div>

      <footer className="bg-teal-600 mt-14 justify-center">
        <p className="text-center text-gray-50">
          Prepared by: Team - DATA DIVE
        </p>
      </footer>
    </div>
  );
}
