import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-50 h-screen">
      <div className="text-center text-4xl pt-6 text-cyan-800">
        <h1>Rent Analysis</h1>
      </div>

      {/* Landing Area */}
      <div className="border-1 mb-10 pl-16 pr-16 pt-16 pb-14 justify-center">
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
            <div className="flex justify-center">
              <button className="w-40 bg-teal-600 rounded-2xl text-white py-1">
                <Link href="/predict"> Predict</Link>
              </button>
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
      <footer className="bg-teal-600 justify-center">
        <p className="text-center text-gray-50">
          Prepared by: Team - DATA DIVE
        </p>
      </footer>
    </div>
  );
}
