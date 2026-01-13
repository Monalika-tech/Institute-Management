import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Title from "./Title";
import Studentcard from "./Studentcard";
import api from "../api/axios";
import { studentContext } from "../context/studentContext.jsx";

function StudentsList() {
  const { students, loading, error } = React.useContext(studentContext);

  const { classLevel } = useParams();
  console.log("Class level from params:", students);

  const filteredStudents = students.filter(
    (stud) => stud.classLevel === Number(classLevel)
  );

  console.log(
    "Filtered students for class level",
    classLevel,
    ":",
    filteredStudents
  );

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (filteredStudents.length === 0) {
    return <p>No students found for class level: {classLevel}</p>;
  }

  return (
    <div className="my-10">
      {/* title */}
      <div className="text-center py-8 px-10 text-3xl">
        <Title text1={"Students"} text2={"List"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-grey-600">
          List of all Stundets of class classLevel!
        </p>
      </div>
      {/* student cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 place-items-center">
        {filteredStudents.map((stud) => (
          <Studentcard key={stud._id} stud={stud} />
        ))}
      </div>
    </div>
  );
}

export default StudentsList;
