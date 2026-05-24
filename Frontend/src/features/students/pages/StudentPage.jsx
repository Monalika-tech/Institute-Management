import { useEffect, useState } from "react";
import { getAllStudents } from "@/lib/api/students";
import StudentsList from "@/features/students/components/StudentsList";

function StudentPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const resStudents = await getAllStudents();
        setStudents(resStudents.students);
      } catch (error) {
        console.error("The students under the teacher ", error);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div>
      <StudentsList students={students} />
    </div>
  );
}

export default StudentPage;
