import React from "react";
import { Link } from "react-router-dom";



const Classcard = ({cls}) => {
  const {_id ,classLevel, totalStudents,time} = cls;

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/class/${classLevel}`}>
      <p className="pt-3 pb-1 text-sm"> Class {classLevel}</p>
      <div className="flex flex-col  gap-6">
          <p className="font-semibold text-base"><strong> Total Students :   </strong>  {totalStudents}</p>
          <p className="font-semibold text-base"><strong>Batch Time :  </strong>  {time}</p>        
        </div>
    </Link>
  );
};

export default Classcard;
