import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getStudentById } from "../api/StudentAPI";

function StudentDetails() {
  const { _id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const studentRes = await getStudentById(_id);
        console.log("the student we fetched ", studentRes);
        setStudent(studentRes.student);
      } catch (error) {
        console.error("Class fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [_id]);

  // const deleteandnavigate = async (_id, classLevel) => {
  //   await deleteStudByID(_id);
  //   navigate(`/class/${classLevel}`);
  // };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-10 scale-105">
      {/* HEADER */}
      <div className="bg-white rounded-xl shadow-md p-5 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{student.name}</h1>
          <p className="text-sm text-gray-500">{student.email}</p>

          <span className="inline-block mt-2 text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700">
            Class {student.classLevel}
          </span>
        </div>

        {/* Future actions */}
        <div className="flex gap-3">
          <Link
            to={`/editStudent/${student._id}`}
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Edit
          </Link>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT - DETAILS */}
        <div className="lg:col-span-2 space-y-6">
          {/* PERSONAL INFO */}
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Personal Information
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <p>
                <strong>Parent Name:</strong> {student.parentName}
              </p>
              <p>
                <strong>Phone:</strong> {student.phone_no}
              </p>
              <p>
                <strong>School:</strong> {student.school}
              </p>
              <p>
                <strong>Address:</strong> {student.address}
              </p>
            </div>
          </div>

          {/* ACADEMIC / FINANCE */}
          <div className="bg-white rounded-xl shadow p-5 ">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Academic & Fee Details
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <p>
                <strong>Class Level:</strong> {student.classID?.classLevel || "N/A"}
              </p>
              <p>
                <strong>Monthly Fee:</strong> ₹{student.monthlyFee}
              </p>
            </div>
          </div>

          {/* FUTURE: ATTENDANCE */}
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Attendance Overview
            </h2>

            <p className="text-sm text-gray-500">
              Coming soon: Attendance analytics (daily, monthly, %)
            </p>
          </div>
        </div>

        {/* RIGHT - SIDE PANEL */}
        <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center justify-center">
          <img
            src="https://media.istockphoto.com/id/1793392179/vector/open-book-with-planet-flat-icon-vector-sign-for-logo-concept-and-illustration-planet-earth.jpg?s=612x612&w=0&k=20&c=4AfeQi0WbobUhoyBgIyGKBYt_-1GudONWjSIflo1HP0="
            alt="student"
            className="w-40 mb-4"
          />

          <p className="text-sm text-gray-500 text-center">
            Future: Profile photo / performance graph
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
