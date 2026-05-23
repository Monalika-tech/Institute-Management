const BulkActions = ({ markAll, reset }) => {
  return (
    <div className="flex gap-3 mb-4">
      <button onClick={() => markAll("present")} className="bg-green-500 text-white px-3 py-1 rounded">
        Mark All Present
      </button>
      <button onClick={reset} className="bg-gray-500 text-white px-3 py-1 rounded">
        Reset
      </button>
    </div>
  );
};
export default BulkActions;