import { Link, useParams } from "react-router-dom";
import Title from "./Title";

function ClassDashboard({ classInfo }) {
  if (!classInfo) return null;

  console.log(classInfo);
  return (
    <div className="w-full font-serif  flex flex-col sm:flex-row">
      <div className="w-full flex flex-col sm:flex-row border border-gray-400 py-5 rounded-md justify-between mx-2 sm:mx-2 lg:mx-10 shadow-md shadow-gray-300">
        <div className="flex flex-col items-center gap-2 px-5 ">
          {/* title */}
          {/* <div className="text-center py-8 px-10 text-3xl"> */}
          <Title text1={"Class"} text2={"Details"} />
          <Link
            to={"/"}
            className=" border border-green-700 text-Balck hover:text-white px-3 py-2  rounded-md hover:bg-green-600 mx-5 sm:mx-2 lg:mr-5 mt-4 sm:mt-4"
          >
            Back
          </Link>
        </div>
        <h1 className="text-4xl font-serif sm:py-3 lg:text leading-relaxed px-4  sm:px-2">
          Class {classInfo.classLevel}
        </h1>
        <div className="flex flex-col px-5  gap-6">
          <p className="font-text  sm:font-semibold text-base">
            <strong> Time : </strong>
            {classInfo.batchTime}
          </p>
          <p className="font-text  sm:font-semibold text-base">
            <strong> Total Students : </strong>
            {/* {classInfo.totalStudent} */}need to find?..
          </p>
        </div>
      </div>
      <div>
        <Link
          to={`/addStudent/${classInfo.classLevel}`}
          className=" bg-green-700 text-white px-3 py-2  rounded-md hover:bg-green-600 mx-5 sm:mx-2 lg:mr-5 mt-4 sm:mt-4"
        >
          AddStudent
        </Link>
      </div>
    </div>
  );
}

export default ClassDashboard;
