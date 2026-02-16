import Title from "./Title";
import Studentcard from "./Studentcard";
import { useState } from "react";

function StudentsList({ students }) {
  const [studentList, setStudentList] = useState(students);

  const handleDelete = (id) => {
    setStudentList((prev) => prev.filter((s) => s._id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      
      {/* Title Section */}
      <div className="text-center text-4xl bg-white/20 rounded-xl p-2 mb-10">
        <Title text1="Students" text2="List" />
        <p className="mt-2 text-sm text-gray-500">
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
          {studentList.map((stud) => (
            <Studentcard
              key={stud._id}
              stud={stud}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentsList;
