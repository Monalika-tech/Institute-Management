import Title from "./Title";
import Studentcard from "./Studentcard";
import { useEffect, useState } from "react";

function StudentsList({ students }) {
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    setStudentList(students);
  }, [students]);
  console.log(studentList);
  const handleDelete = (id) => {
    setStudentList((prev) => prev.filter((s) => s._id !== id));
  };
  const colorClasses = [
    {
      bg: "bg-green-50",
      accent: "bg-green-500",
      badge: "bg-green-100 text-green-700",
    },
    {
      bg: "bg-blue-50",
      accent: "bg-blue-500",
      badge: "bg-blue-100 text-blue-700",
    },
    {
      bg: "bg-purple-50",
      accent: "bg-purple-500",
      badge: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      {/* Title Section */}
      <div className="text-center text-4xl text-black-300 rounded-xl p-2 mb-10">
        <Title text1="Students" text2="List" />
        <p className="mt-2 text-sm text-black-500">
          List of all students under this class
        </p>
      </div>

      {/* Empty State */}
      {studentList.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-gray-300 rounded-xl">
          <p className="text-gray-500 text-lg">
            No students found in this class.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
          {studentList.map((stud, index) => (
            <Studentcard
              key={stud._id}
              stud={stud}
              onDelete={handleDelete}
              color={colorClasses[index % colorClasses.length]}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentsList;
