import { useEffect, useState } from "react";
import TeacherCredentials from "@/features/teachers/components/TeacherCredentials";
import ClassList from "@/features/classes/components/ClassList";
import { useAuth } from "@/features/auth/context/AuthContext";
import { getTeacherById } from "@/lib/api/teachers";
import { getAllClasses } from "@/lib/api/classes";

function TeacherDetailsPage() {
  const { userId } = useAuth();
  const [teacher, setTeacher] = useState(null);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchHomeData = async () => {
      try {
        const teacherRes = await getTeacherById(userId);
        const classesRes = await getAllClasses();
        setTeacher(teacherRes.teacher);
        localStorage.setItem("teacher", JSON.stringify(teacherRes.teacher));
        setClasses(classesRes.classes);
      } catch (error) {
        console.error("Home data fetch failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, [userId]);

  if (loading) return <p className="text-center mt-10">Loading.....</p>;

  return (
    <div>
      <TeacherCredentials teacher={teacher} />
      <ClassList classes={classes} />
    </div>
  );
}

export default TeacherDetailsPage;
