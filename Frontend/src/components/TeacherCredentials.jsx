import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function TeacherCredentials() {
  const { teacher, logoutTeacher } = useContext(AuthContext);
  if (!teacher) {
    return <p> No teacher is loged in!</p>;
  }

  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      {/* Teacher Credentials Section -- left part */}
      <div className=" w-full sm:w-1/2 flex flex-col items-center justify-center py-10 sm:py-10">
        <div className="flex items-center gap-2">
          <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          <p className="font-medium text-sm md:text-base">Profile</p>
        </div>
        <h1 className="text-3xl sm:py-3 lg:text leading-relaxed">
          Institute name
        </h1>
        <div className="flex flex-col  gap-6">
          <p className="font-semibold text-base">
            <strong> Name </strong> {teacher.name}
          </p>
          <p className="font-semibold text-base">
            <strong> Email </strong> {teacher.email}
          </p>
          <p className="font-semibold text-base">
            <strong>Phone no. </strong> {teacher.phone_no}
          </p>
          <p className="font-semibold text-base">
            <strong> Address</strong> {teacher.address}
          </p>
          <p className="font-semibold text-base">
            <strong> Experienced Years</strong> {teacher.experiencedYears}
          </p>
          <p className="font-semibold text-base">
            <strong> Qualification</strong> {teacher.qualification}
          </p>
        </div>
      </div>
      {/* logo section -- right part */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10">
        <img
          src="https://media.istockphoto.com/id/1793392179/vector/open-book-with-planet-flat-icon-vector-sign-for-logo-concept-and-illustration-planet-earth.jpg?s=612x612&w=0&k=20&c=4AfeQi0WbobUhoyBgIyGKBYt_-1GudONWjSIflo1HP0="
          alt="logo"
          className="w-full max-w-sm"
        />
      </div>
    </div>
  );
}

export default TeacherCredentials;
