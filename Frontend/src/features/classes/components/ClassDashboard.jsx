import { Link } from "react-router-dom";
import Title from "@/shared/components/Title";
function ClassDashboard({ classInfo }) {
  if (!classInfo) return null;

  return (
    <div className="w-full font-serif flex flex-col gap-10">
      <div className="w-full flex flex-col md:flex-row border border-gray-400 py-5 rounded-md justify-between shadow-md shadow-gray-300">
        <div className="flex flex-col items-center gap-2 px-2">
          <div className="text-center rounded-md p-2 text-3xl">
            <Title text1="Class" text2="Details" />
          </div>
        </div>
        <h1 className="text-4xl font-serif sm:py-3 lg:text leading-relaxed px-4 sm:px-2">
          Class {classInfo.classLevel}
        </h1>
        <div className="flex flex-col px-5 gap-6">
          <p className="font-text sm:font-semibold text-base">
            <strong> Time : </strong>
            {classInfo.batchTime}
          </p>
          <p className="font-text sm:font-semibold text-base">
            <strong> Total Students : </strong>c
          </p>
        </div>
      </div>
      <div className="flex flex-row sm:flex-col">
        <Link
          to={`/addStudent/${classInfo.classLevel}`}
          className="w-fit bg-green-700 text-white px-3 py-2 rounded-md hover:bg-green-600 mx-5 sm:mx-2 lg:mr-5 mt-4 sm:mt-4"
        >
          AddStudent
        </Link>
      </div>
    </div>
  );
}

export default ClassDashboard;
