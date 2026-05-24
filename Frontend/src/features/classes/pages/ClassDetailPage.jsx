import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClassDashboard from "@/features/classes/components/ClassDashboard";
import StudentsList from "@/features/students/components/StudentsList";
import { getClassById } from "@/lib/api/classes";
import { getStudentsByClass } from "@/lib/api/students";

function ClassDetailPage() {
  const { _id } = useParams();
  const [classInfo, setClassInfo] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const classRes = await getClassById(_id);
        const studentsRes = await getStudentsByClass(_id);
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
      <StudentsList students={students} classInfo={classInfo} />
    </div>
  );
}

export default ClassDetailPage;
