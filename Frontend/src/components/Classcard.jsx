import { Link } from "react-router-dom";
import { deleteClass } from "../api/ClassAPI";
import { FaEye ,FaTrash , FaEdit} from "react-icons/fa";

const Classcard = ({ cls }) => {
  console.log("Classcard component rendered", cls);
  const { _id, classLevel, batchTime } = cls;

  const deleteHandler = async (_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?",
    );
    if (!confirmDelete) return;
    await deleteClass(_id);
    window.location.reload(); // quick fix for now
  };

  return (
    <div className=" w-full  text-gray-700 cursor-pointer hover:bg-white/50 border shadow border-gray-200 rounded-md p-4 ">
      <Link to={`/class/${_id}`}>
        <p className="pt-3 pb-1 text-2xl font-bold"> Class {classLevel}</p>
        <div className="flex flex-col  gap-6">
          <p className="font-semibold text-base">
            <strong> Total Students : </strong>
            {/* {totalStudent} */}pending... need to find..
          </p>
          <p className="font-semibold text-base">
            <strong>Batch Time : </strong> {batchTime}
          </p>
        </div>
      </Link>
      <div className="w-full  flex flex-col sm:flex-row justify-between pt-4 gap-2">
        <Link
          to={`/class/${_id}`}
          className="rounded-md  px-2 py-2 text-2xl text-gray hover:bg-green-800/70 transition"
        >
         < FaEye />
        </Link>
        <Link
          to={`/editClass/${_id}`}
          className="rounded-md  px-2 py-2 text-2xl text-gray hover:bg-green-800/70 transition"
        >
          < FaEdit />
        </Link>
        <button
          onClick={() => deleteHandler(_id)}
          className="rounded-md  px-2 py-2 text-2xl text-gray hover:bg-red-800/70 transition"
        >
          < FaTrash />
        </button>
      </div>
    </div>
  );
};

export default Classcard;
