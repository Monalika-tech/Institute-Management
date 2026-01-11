import React from "react";
import classData from "../assets/classData";
import { useParams } from "react-router-dom";

function StudentDashboard() {
  console.log(classData);
  const { classLevel } = useParams();
  const classSelected = classData.find((item) => item.classLevel == classLevel);
  // console.log(classSelected);
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 py-5 rounded-md justify-between mx-2 sm:mx-2 lg:mx-20 shadow-md shadow-gray-300">
      <div className="flex items-center gap-2 px-5 ">
        <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
        <p className="font-medium text-sm md:text-base">Class Details </p>
        {/* <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p> */}
      </div>
      <h1 className="text-4xl sm:py-3 lg:text leading-relaxed px-4  sm:px-20">
        Class {classSelected.classLevel}
      </h1>
      <div className="flex flex-col px-5  gap-6">
        <p className="font-semibold text-base">
          <strong> Time : </strong>
          {classSelected.time}
        </p>
        <p className="font-semibold text-base">
          <strong> Total Students : </strong>
          {classSelected.totalStudents}
        </p>
      </div>
    </div>
  );
}

export default StudentDashboard;
