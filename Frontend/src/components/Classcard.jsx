import React from "react";
import { Link } from "react-router-dom";

const Classcard = ({ cls }) => {
  const { _id, classLevel, totalStudents, time } = cls;

  return (
    <Link className="text-gray-700 cursor-pointer hover:bg-gray-100 border shadow border-gray-200 rounded-md p-4 " to={`/class/${classLevel}`}>
      <p className="pt-3 pb-1 text-sm"> Class {classLevel}</p>
      <div className="flex flex-col  gap-6">
        <p className="font-semibold text-base">
          <strong> Total Students : </strong> {totalStudents}
        </p>
        <p className="font-semibold text-base">
          <strong>Batch Time : </strong> {time}
        </p>
         {/* <Link to={`/class/${classLevel}`} className="rounded-md border border-green-600 px-4 py-2  text-sm text-green-600 hover:bg-green-50 transition ">View Students </Link> */}
      </div>
     
    </Link>
  );
};

export default Classcard;
