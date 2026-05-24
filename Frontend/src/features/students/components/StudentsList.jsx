import Title from "@/shared/components/Title";
import StudentCard from "@/features/students/components/StudentCard";
import { useEffect, useState } from "react";
import { getCardColor } from "@/shared/constants/cardColors";

function StudentsList({ students }) {
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    setStudentList(students || []);
  }, [students]);

  const handleDelete = (id) => {
    setStudentList((prev) => prev.filter((s) => s._id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="text-center text-4xl text-black-300 rounded-xl p-2 mb-10">
        <Title text1="Students" text2="List" />
        <p className="mt-2 text-sm text-black-500">List of all students under this class</p>
      </div>

      {studentList.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-gray-300 rounded-xl">
          <p className="text-gray-500 text-lg">No students found in this class.</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
          {studentList.map((stud, index) => (
            <StudentCard
              key={stud._id}
              stud={stud}
              onDelete={handleDelete}
              color={getCardColor(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentsList;
