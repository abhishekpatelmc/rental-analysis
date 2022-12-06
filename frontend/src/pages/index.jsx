import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-50 h-screen">
      <div className="text-center pt-6">
        <h1 className="text-4xl font-bold text-cyan-800">Team DataDive</h1>
      </div>

      {/* Landing Area */}
      <div className=" flex mt-20 justify-around">
        {/* Left Sidde */}
        <div className="flex-1 mt-5  basis-1/5 ml-32">
          <div>
            <h1 className="text-6xl font-bold text-teal-600 ">Rent Analysis</h1>
          </div>
          <div className="mt-2">
            <p className="text-lg">
              <b>Welcome! To rent analysis tool. </b>
              <br />
              <em>Let's help you to find you home in your budget!</em>
            </p>
          </div>
          <div className="mt-4 pr-20">
            <p className="text-lg text-justify">
              Rental analysis tool is a tool that helps you to find your home in
              your budget. We will predict the rent according region and other
              factors like number of bedrooms, bathrooms, square feet. With this
              you can compare the rent of different regions and find the best
              place for you.
            </p>
          </div>
          <div className="mt-10 flex gap-6">
            <button className=" bg-teal-600 rounded-lg text-2xl text-white py-2 px-12 hover:border-2 hover:text-teal-900 hover:border-teal-600 hover:bg-gray-50">
              <Link href="/predict">Predict</Link>
            </button>
            <button className=" text-teal-900 border-teal-600 border-2 rounded-lg text-2xl px-4 py-2 hover:bg-teal-600 hover:text-gray-50">
              <Link href="https://github.com/abhishekpatelmc/rental-analysis/blob/main/Rent_Analysis.ipynb">
                Rent Analysis
              </Link>
            </button>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex-1  mt-10  basis-1/4">
          <div className="ml-32">
            <Image
              src="/rent-house.svg"
              height={500}
              width={500}
              alt="rent-house"
            />
          </div>
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
