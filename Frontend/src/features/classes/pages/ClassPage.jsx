import { useEffect, useState } from "react";
import { getAllClasses } from "@/lib/api/classes";
import ClassList from "@/features/classes/components/ClassList";

function ClassPage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classesRes = await getAllClasses();
        setClasses(classesRes.classes);
      } catch (error) {
        console.error("Failed to fetch classes: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  if (loading) return <h3> Loading...</h3>;

  return (
    <div className="flex flex-col">
      <ClassList classes={classes} />
    </div>
  );
}

export default ClassPage;
