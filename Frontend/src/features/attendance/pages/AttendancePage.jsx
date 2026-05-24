import { useEffect, useState } from "react";
import { getAllClasses } from "@/lib/api/classes";
import { getStudentsByClass } from "@/lib/api/students";
import { markAttendance } from "@/lib/api/attendance";
import { useAuth } from "@/features/auth/context/AuthContext";

const AttendancePage = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState({});
  const { userId } = useAuth();

  useEffect(() => {
    getAllClasses().then((res) => setClasses(res.classes));
  }, []);

  useEffect(() => {
    if (!selectedClass) return;
    getStudentsByClass(selectedClass).then((res) => {
      setStudents(res.students);
      const initial = {};
      res.students.forEach((s) => {
        initial[s._id] = { status: "absent", note: "" };
      });
      setRecords(initial);
    });
  }, [selectedClass]);

  const handleChange = (id, field, value) => {
    setRecords((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleSubmit = async () => {
    const formatted = Object.keys(records).map((id) => ({
      studentId: id,
      status: records[id].status,
      note: records[id].note,
    }));

    await markAttendance({
      classId: selectedClass,
      teacherId: userId,
      date: new Date().toISOString().split("T")[0],
      records: formatted,
    });

    alert("Attendance saved!");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Attendance</h1>
      <select
        className="mb-6 p-2 border rounded"
        onChange={(e) => setSelectedClass(e.target.value)}
        defaultValue=""
      >
        <option value="">Select Class</option>
        {classes.map((c) => (
          <option key={c._id} value={c._id}>
            Class {c.classLevel}
          </option>
        ))}
      </select>
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-xl font-bold mb-4">List of Students</h2>
        {students.map((s) => (
          <div key={s._id} className="border-b py-3">
            <p className="font-medium">{s.name}</p>
            <div className="flex gap-4 mt-2">
              {["present", "absent", "leave"].map((status) => (
                <label key={status}>
                  <input
                    type="radio"
                    name={s._id}
                    checked={records[s._id]?.status === status}
                    onChange={() => handleChange(s._id, "status", status)}
                  />
                  {status}
                </label>
              ))}
            </div>
            <input
              type="text"
              placeholder="Note..."
              className="mt-2 p-1 border rounded w-full"
              onChange={(e) => handleChange(s._id, "note", e.target.value)}
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded"
        type="button"
      >
        Submit
      </button>
    </div>
  );
};

export default AttendancePage;
