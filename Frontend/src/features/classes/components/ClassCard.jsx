import { Link } from "react-router-dom";
import { deleteClass } from "@/lib/api/classes";
import { FaEye, FaTrash, FaEdit } from "react-icons/fa";
import { ROUTES } from "@/shared/constants/routes";

const ClassCard = ({ cls, color }) => {
  const { _id, classLevel, batchTime } = cls;

  const deleteHandler = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this class?");
    if (!confirmDelete) return;
    await deleteClass(_id);
    window.location.reload();
  };

  return (
    <div
      className={`relative rounded-xl p-5 shadow-md border border-gray-200 
      transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${color.bg}`}
    >
      <div className={`h-1 w-full rounded-t-xl absolute top-0 left-0 ${color.accent}`} />

      <Link to={ROUTES.CLASS_DETAIL(_id)}>
        <h2 className="text-xl font-bold mb-2">Class {classLevel}</h2>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">Students:</span> Pending...
          </p>
          <p>
            <span className="font-semibold">Batch:</span> {batchTime}
          </p>
        </div>
      </Link>

      <div className="flex justify-end gap-3 mt-5">
        <Link
          to={ROUTES.CLASS_DETAIL(_id)}
          className="p-2 rounded-md bg-white/70 hover:bg-green-500 hover:text-white transition"
        >
          <FaEye />
        </Link>
        <Link
          to={ROUTES.EDIT_CLASS(_id)}
          className="p-2 rounded-md bg-white/70 hover:bg-blue-500 hover:text-white transition"
        >
          <FaEdit />
        </Link>
        <button
          onClick={deleteHandler}
          className="p-2 rounded-md bg-white/70 hover:bg-red-500 hover:text-white transition"
          type="button"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default ClassCard;
