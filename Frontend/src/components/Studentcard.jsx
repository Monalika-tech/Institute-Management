import { Link } from "react-router-dom";


const Studentcard = ({ stud }) => {

  const { _id, name, email, classLevel } = stud;
    const deleteHandler = async (_id) => {
    await deleteStudent(_id);
    window.location.reload(); // quick fix for now
  };

  
  return (
    <div className="text-gray-700 cursor-pointer hover:bg-green-100 border shadow border-gray-200 hover:border-green-500 rounded-md p-4  scale-100 hover:scale-105 transition-transform duration-200">
      <Link className="text-gray-700 cursor-pointer" to={`/students/${_id}`}>
        <p className="pt-3 pb-1 text-gray-500">{name}</p>
        <div className="flex flex-col  gap-6">
          <p className="font-semibold text-base">
            <strong> Email : </strong> {email}{" "}
          </p>
          <p className="font-semibold text-base">
            <strong>Class Level : </strong> {classLevel}
          </p>
        </div>
      </Link>
      <div className="my-4 flex flex-col gap-2">
        <Link
          to={`/student/${_id}`}
          className="rounded-md border border-green-600 px-4 py-2 text-sm text-green-600 hover:bg-green-50 transition"
        >
          View Details
        </Link>
        <button
          onClick={() => deleteHandler(_id)}
          className="rounded-md border border-red-600 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
        >
          Delete Student
        </button>
      </div>
    </div>
  );
};

export default Studentcard;
