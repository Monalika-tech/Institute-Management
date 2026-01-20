import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { Link, useParams ,useNavigate} from "react-router-dom";
import { studentContext } from "../context/studentContext.jsx";

import api from "../api/axios";

function StudentDetails() {
  const { getStudById,getStudentByIdFromServer, loading, error, deleteStudByID } =
    React.useContext(studentContext);
  const { _id } = useParams();

  const [student, setStudent] = useState(null);

  const navigate=useNavigate();

  useEffect(() => {
    (async () => {
      const localStudent = getStudById(_id);
      if (localStudent) {
        setStudent(localStudent);
      } else {
        const fetchedStudent = await getStudentByIdFromServer(_id);
        setStudent(fetchedStudent);
      }
    })();
  }, [_id]);

  const deleteandnavigate = (_id, classLevel) => {
    deleteStudByID(_id);
    navigate(`/class/${classLevel}`);
  };


  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (!student) {
    return <p>Student not found on client </p>;
  }

  return (
    <div className="flex flex-col sm:flex-row border border-gray-400  py-5 rounded-md justify-between mx-2 sm:mx-2 lg:mx-10 shadow-md shadow-gray-300">
      <div>
        <Link
          to={`/editStudent/${_id}`}
          className=" bg-green-700 text-white px-3 py-2  rounded-md hover:bg-green-600 mx-5 sm:mx-2 lg:mr-5 mt-4 sm:mt-4"
        >
          Update Student Details
        </Link>
        <button
          onClick={() => deleteandnavigate(_id, student.classLevel)}
          className=" bg-green-700 text-white px-3 py-2  rounded-md hover:bg-green-600 mx-5 sm:mx-2 lg:mr-5 mt-4 sm:mt-4"
        >
          Delete Student Details
        </button>
      </div>
      {/* Student Credentials Section -- left part */}
      <div className=" w-full sm:w-1/2 flex flex-col items-center justify-center py-10 sm:py-10">
        <div className="flex items-center gap-2">
          {/* <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p> */}
          <div className="text-center  px-10 text-3xl">
            <Title text1={"Student "} text2={" Details"} />
          </div>
        </div>
        <h1 className="text-3xl sm:py-3 lg:text leading-relaxed">
          {student.name}
        </h1>
        <div className="flex flex-col  gap-6">
          <p className="font-semibold text-base">
            <strong> CLass Level : </strong> {student.classLevel}
          </p>
          <p className="font-semibold text-base">
            <strong> Email : </strong> {student.email}
          </p>
          <p className="font-semibold text-base">
            <strong> Parent Name : </strong> {student.parentName}
          </p>
          <p className="font-semibold text-base">
            <strong> Parent Phone : </strong> {student.phone_no}
          </p>
          <p className="font-semibold text-base">
            <strong> Address : </strong> {student.address}
          </p>
          <p className="font-semibold text-base">
            <strong> School : </strong> {student.school}
          </p>
          <p className="font-semibold text-base">
            <strong> Monthly Fee : </strong> {student.monthlyFee}
          </p>
        </div>
      </div>
      {/* image section -- right part */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 mx-2">
        <img
          src="https://media.istockphoto.com/id/1793392179/vector/open-book-with-planet-flat-icon-vector-sign-for-logo-concept-and-illustration-planet-earth.jpg?s=612x612&w=0&k=20&c=4AfeQi0WbobUhoyBgIyGKBYt_-1GudONWjSIflo1HP0="
          alt="logo"
          className="w-full max-w-sm"
        />
      </div>
    </div>
  );
}

export default StudentDetails;
