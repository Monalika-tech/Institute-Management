import React from "react";
import { Link } from "react-router-dom";

const Studentcard = ({ stud }) => {
  const { _id, name, email, classLevel } = stud;
  // console.log(name);
  // console.log(_id);
  // console.log(name);
  return (
    <div className="text-gray-700 cursor-pointer hover:bg-green-100 border shadow border-gray-200 hover:border-green-500 rounded-md p-4  scale-100 hover:scale-105 transition-transform duration-200">
      <Link className="text-gray-700 cursor-pointer" to={`/students/${_id}`}>
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <div className="flex flex-col  gap-6">
          <p className="font-semibold text-base">
            <strong> Email : </strong> {email}{" "}
          </p>
          <p className="font-semibold text-base">
            <strong>Class Level : </strong> {classLevel}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Studentcard;
