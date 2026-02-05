import React, { useEffect, useState } from "react";
import TeacherCredentials from "../components/TeacherCredentials";
import ClassList from "../components/ClassList";
import { useAuth } from "../context/AuthContext";
import { getTeacherById } from "../api/TeacherAPI";
import { getAllClasses } from "../api/ClassAPI";

function Home() {
  const { userId } = useAuth();

  const [teacher, setTeacher] = useState(null);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("the userid ", userId);
    if (!userId) return; // WAIT until auth ready

    const fetchHomeData = async () => {
      try {
        console.log("the userid ", userId);

        const teacherRes = await getTeacherById(userId);
        const classesRes = await getAllClasses();

        console.log("teacher response :", teacherRes.teacher);
        console.log("classes response :", classesRes.classes);

        setTeacher(teacherRes.teacher);
        localStorage.setItem("teacher", teacherRes.teacher);
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

export default Home;
