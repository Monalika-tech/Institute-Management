import { Link } from "react-router-dom";
import { deleteClass } from "../api/ClassAPI";
import { FaEye, FaTrash, FaEdit } from "react-icons/fa";

const Classcard = ({ cls, color }) => {
  const { _id, classLevel, batchTime } = cls;

  const deleteHandler = async (_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this class?"
    );
    if (!confirmDelete) return;
    await deleteClass(_id);
    window.location.reload();
  };

  return (
    <div
      className={`relative rounded-xl p-5 shadow-md border border-gray-200 
      transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${color.bg}`}
    >
      {/* Top Accent */}
      <div className={`h-1 w-full rounded-t-xl absolute top-0 left-0 ${color.accent}`} />

      <Link to={`/class/${_id}`}>
        <h2 className="text-xl font-bold mb-2">
          Class {classLevel}
        </h2>

        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">Students:</span> Pending...
          </p>

          <p>
            <span className="font-semibold">Batch:</span> {batchTime}
          </p>
        </div>
      </Link>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-5">
        <Link
          to={`/class/${_id}`}
          className="p-2 rounded-md bg-white/70 hover:bg-green-500 hover:text-white transition"
        >
          <FaEye />
        </Link>

        <Link
          to={`/editClass/${_id}`}
          className="p-2 rounded-md bg-white/70 hover:bg-blue-500 hover:text-white transition"
        >
          <FaEdit />
        </Link>

        <button
          onClick={() => deleteHandler(_id)}
          className="p-2 rounded-md bg-white/70 hover:bg-red-500 hover:text-white transition"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default Classcard;