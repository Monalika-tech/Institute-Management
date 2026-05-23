const ViewToggle = ({ view, setView }) => {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => setView("card")}
        className={`px-4 py-2 rounded ${view === "card" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
      >
        Card View
      </button>
      <button
        onClick={() => setView("table")}
        className={`px-4 py-2 rounded ${view === "table" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
      >
        Table View
      </button>
    </div>
  );
};

export default ViewToggle;