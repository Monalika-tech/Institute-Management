import React from "react";
import Title from "../components/Title";
import { AuthContext } from "../context/AuthContext";




const EditProfile = () => {
  return (
    <div className="sm:w-1/2 flex flex-col items-center justify-center py-10 sm:py-20 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 hover:border-green-500 mx-auto my-20 px-4">
      {/* Title */}
      <div className="text-center py-8 px-10 text-3xl">
        <Title text1={"Edit"} text2={"Profile"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-grey-600">
          Need to edit profile!!
        </p>
      </div>
    </div>

    // form

  );
};

export default EditProfile;
