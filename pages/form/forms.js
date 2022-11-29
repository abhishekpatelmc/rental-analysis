import { useState } from "react";

export default function forms() {
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
    <div className="border-1 m-14 pl-16 pr-16 pt-16 pb-14 justify-center shadow-xl rounded-3xl bg-gray-100">
      <div className=" flex flex-row justify-center">
        {/* Left Sidde */}
        <div className="flex-1 basis-1/3 justify-end items-end">
          <h1>Rent Analysis</h1>
          <p className=" mt-5 pr-10">
            This is a rent analysis tool that will help you Analys the rent of a
            region. You need to enter the Region, number of bedrooms, number of
            bathrooms and the Square feet required.
          </p>
        </div>
        {/* Right Side */}
        <div className="ml-10 flex-1 basis-1/2 ">
          <div className="flex items-center justify-center">
            <form onSubmit={handelSubmit}>
              <div className="mb-4">
                <label className="block">Region:</label>
                <input
                  className="border-2 mt-2 border-gray-300 p-2 rounded-lg w-96 h-10"
                  type="text"
                  id="region"
                  name="region"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block">Square Footage:</label>
                <input
                  className="border-2 mt-2 border-gray-300 p-2 rounded-lg w-96  h-10"
                  type="text"
                  id="sqfeet"
                  name="sqfeet"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block">Bedrooms</label>
                <input
                  className="border-2 mt-2 border-gray-300 p-2 rounded-lg w-96 h-10"
                  type="text"
                  id="beds"
                  name="beds"
                  required
                />
              </div>

              <div>
                <label className="block">Bathrooms</label>
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

      <div className="text-center mt-1">
        {data && <h1 className="text-2xl ">Rent Estimate: {data}</h1>}
      </div>
    </div>
  );
}
