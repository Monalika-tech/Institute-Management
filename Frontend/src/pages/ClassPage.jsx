import React, { useEffect, useState } from "react";
import { getAllClasses } from "../api/ClassAPI";
import ClassList from "../components/ClassList";

function ClassPage() {
  const [classes, setClasses] = useState([]);
  const [ loading , setLoading] = useState(true) 
  // const [search, setSearch] = useState([""]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classesRes = await getAllClasses();
        console.log("the classes get for page ", classesRes.classes);
        setClasses(classesRes.classes);
      } catch (error) {
        console.log("Failed to fetch classes: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);
if (loading) <h3> Loading...</h3> 
  return (
    <div className="flex flex-col">
      {/* <div>
        <input
          type="text"
          placeholder="Search Class"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" w-full px-2 py-4 border border-gray-700 rounded-md shadow-black-200"
        />
      </div> */}
      <ClassList classes={classes} />
    </div>
  );
}

export default ClassPage;
