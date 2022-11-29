import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
        <Link
          className=" p-5 bg-cyan-900 text-white rounded-xl"
          href="/rentPredict/rentPredict"
        >
          React Predict
        </Link>
      </div>
    </div>
  );
}
