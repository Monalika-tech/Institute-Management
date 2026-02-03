import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClassDashboard from "../components/ClassDashboard";
import StudentsList from "../components/StudentsList";
import { getClassById } from "../api/ClassAPI";
import { getStudentsByCLass } from "../api/StudentAPI";

function ClassDetail() {
  const { _id } = useParams();

  const [classInfo, setClassInfo] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const classRes = await getClassById(_id);
        const studentsRes = await getStudentsByCLass(_id);

        setClassInfo(classRes.class);
        setStudents(studentsRes.students);
      } catch (error) {
        console.error("Class fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClassDetails();
  }, [_id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <ClassDashboard classInfo={classInfo} />
      <StudentsList students={students} />
    </div>
  );
}

export default ClassDetail;
