import { Link } from "react-router-dom";
import { deleteStudent } from "../api/StudentAPI";

const Studentcard = ({ stud, onDelete }) => {
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
    <div className="w-full bg-white/30 rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
      
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800 truncate">
          {name}
        </h3>
        <p className="text-sm text-gray-900 break-all">
          {email}
        </p>
      </div>

      {/* Class Badge */}
      <div className="mb-6">
        <span className="inline-block text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
          Class {classID.classLevel}
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to={`/student/${_id}`}
          className="flex-1 text-center bg-green-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 transition"
        >
          View
        </Link>

        <button
          onClick={deleteHandler}
          className="flex-1 border border-red-600 text-red-600 py-2.5 rounded-lg text-sm font-medium hover:bg-red-50 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Studentcard;
