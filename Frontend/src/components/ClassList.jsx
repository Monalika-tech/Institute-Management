import React from "react";
import Title from "./Title";
import Classcard from "./Classcard";
import classData from "../assets/classData";

const ClassList = () => {
  console.log(classData);
  return (
    <div className="my-10">
      {/* Title */}
      <div className="text-center py-8 px-10 text-3xl">
        <Title text1={"Class"} text2={"List"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-grey-600">
          List of all classes teached here!
        </p>
      </div>
      {/* Class cards will go here */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 place-items-center">
        {classData.map((cls) => (
          <Classcard key={cls._id} cls={cls} />
        ))}
      </div>
    </div>
  );
};

export default ClassList;
