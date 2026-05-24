import { Check, X, Clock, MessageSquare, User } from "lucide-react";

/** Optional richer attendance UI — not wired to AttendancePage yet */
export function AttendanceTable({ students, records, onMark, onOpenNote }) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-[600px] w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Student
            </th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {students.map((student) => {
            const record = records[student._id] || { status: "unmarked", note: "" };
            return (
              <tr key={student._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-200 flex-shrink-0">
                      {student.avatar ? (
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <User size={20} />
                        </div>
                      )}
                    </div>
                    <span className="font-medium text-gray-900">{student.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {["present", "absent", "leave"].map((status) => {
                      const Icon = status === "present" ? Check : status === "absent" ? X : Clock;
                      const active =
                        record.status === status
                          ? status === "present"
                            ? "bg-green-100 text-green-700 ring-2 ring-green-500 ring-offset-2"
                            : status === "absent"
                              ? "bg-red-100 text-red-700 ring-2 ring-red-500 ring-offset-2"
                              : "bg-amber-100 text-amber-700 ring-2 ring-amber-500 ring-offset-2"
                          : "bg-gray-100 text-gray-400";
                      return (
                        <button
                          key={status}
                          type="button"
                          onClick={() => onMark(student._id, status)}
                          className={`p-2 rounded-lg transition-all ${active}`}
                          title={`Mark ${status}`}
                        >
                          <Icon size={20} />
                        </button>
                      );
                    })}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => onOpenNote(student._id)}
                    className={`p-2 rounded-lg transition-colors ${
                      record.note ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    }`}
                    title={record.note || "Add Note"}
                  >
                    <MessageSquare size={20} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
