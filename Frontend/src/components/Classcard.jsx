import React, { useContext } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { ClassContext } from "../context/classContext.jsx";

const Classcard = ({ cls }) => {
  const { deleteHandler } = useContext(ClassContext);

  console.log("Classcard component rendered", cls);
  const { _id, classLevel, totalStudent, batchTime } = cls;

  return (
    <div className="text-gray-700 cursor-pointer hover:bg-gray-100 border shadow border-gray-200 rounded-md p-4 ">
      <Link to={`/class/${classLevel}`}>
        <p className="pt-3 pb-1 text-sm"> Class {classLevel}</p>
        <div className="flex flex-col  gap-6">
          <p className="font-semibold text-base">
            <strong> Total Students : </strong> {totalStudent}
          </p>
          <p className="font-semibold text-base">
            <strong>Batch Time : </strong> {batchTime}
          </p>
          {/* <Link to={`/class/${classLevel}`} className="rounded-md border border-green-600 px-4 py-2  text-sm text-green-600 hover:bg-green-50 transition ">View Students </Link> */}
        </div>
      </Link>
      <div className="w-full sm:w-2/3 flex flex-col sm:flex-col justify-between pt-4 gap-2">
        <Link
          to={`/class/${classLevel}`}
          className="rounded-md border border-green-600 px-4 py-2 text-sm text-green-600 hover:bg-green-50 transition"
        >
          View Students
        </Link>
        <Link
          to={`/editClass/${classLevel}`}
          className="rounded-md border border-green-600 px-4 py-2 text-sm text-green-600 hover:bg-green-50 transition"
        >
          Edit Details
        </Link>
        <button
          onClick={() => deleteHandler(_id)}
          className="rounded-md border border-red-600 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
        >
          Delete Class
        </button>
      </div>
    </div>
  );
};

export default Classcard;
