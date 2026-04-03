import { Link } from "react-router-dom";
import { deleteStudent } from "../api/StudentAPI";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const Studentcard = ({ stud, onDelete, color }) => {
  const { _id, name, email, classID } = stud;

  const deleteHandler = async () => {
    try {
      await deleteStudent(_id);
      onDelete?.(_id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete student");
    }
  };

  return (
    <div
      className={`relative rounded-xl p-5 border border-gray-200 shadow-md 
      transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${color.bg}`}
    >
      {/* Top Accent */}
      <div className={`absolute top-0 left-0 w-full h-1 rounded-t-xl ${color.accent}`} />

      {/* Student Info */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800 truncate">
          {name}
        </h3>
        <p className="text-sm text-gray-500 break-all">
          {email}
        </p>
      </div>

      {/* Class Badge */}
      <div className="mb-6">
        <span
          className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${color.badge}`}
        >
          Class {classID?.classLevel || "N/A"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Link
          to={`/student/${_id}`}
          className="p-2 rounded-md bg-white/70 hover:bg-green-500 hover:text-white transition"
        >
          <FaEye />
        </Link>

        <Link
          to={`/editStudent/${_id}`}
          className="p-2 rounded-md bg-white/70 hover:bg-blue-500 hover:text-white transition"
        >
          <FaEdit />
        </Link>

        <button
          onClick={deleteHandler}
          className="p-2 rounded-md bg-white/70 hover:bg-red-500 hover:text-white transition"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default Studentcard;