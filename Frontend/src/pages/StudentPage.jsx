import React, { useEffect, useState } from "react";
import { getAllStudents, getStudentsByCLass } from "../api/StudentAPI";
import StudentsList from "../components/StudentsList";
import { getAllClasses } from "../api/ClassAPI";

function StudentPage() {
  const [students, setStudents] = useState([]);
  // const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const resStudents = await getAllStudents();
        console.log("the students ", resStudents.students);
        const fetchedStudents = resStudents.students;
        setStudents(fetchedStudents);

        // const classesRes = await getAllClasses();
        // console.log(classesRes.classes);
        // setClasses(classesRes);

      } catch (error) {
        console.log("The students under the teacher ", error);
      }
    };
    fetchStudents();
  }, []);

  // const classLevel = classes
  return (
    <div>
      <StudentsList students={students} />
    </div>
  );
}

export default StudentPage;
