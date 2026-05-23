// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'motion/react';
// import { X, MessageSquare, Save } from 'lucide-react';

// interface NoteModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (note: string) => void;
//   initialNote: string;
//   studentName: string;
// }

// export const NoteModal: React.FC<NoteModalProps> = ({
//   isOpen,
//   onClose,
//   onSave,
//   initialNote,
//   studentName,
// }) => {
//   const [note, setNote] = useState(initialNote);

//   useEffect(() => {
//     setNote(initialNote);
//   }, [initialNote, isOpen]);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="absolute inset-0 bg-black/40 backdrop-blur-sm"
//           />
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0, y: 20 }}
//             animate={{ scale: 1, opacity: 1, y: 0 }}
//             exit={{ scale: 0.9, opacity: 0, y: 20 }}
//             className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
//           >
//             <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
//               <div className="flex items-center gap-2">
//                 <MessageSquare className="text-blue-600" size={20} />
//                 <h3 className="font-bold text-gray-900">Attendance Note</h3>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
//               >
//                 <X size={20} />
//               </button>
//             </div>
            
//             <div className="p-6">
//               <p className="text-sm text-gray-500 mb-4">
//                 Adding note for <span className="font-semibold text-gray-900">{studentName}</span>
//               </p>
              
//               <textarea
//                 value={note}
//                 onChange={(e) => setNote(e.target.value)}
//                 placeholder="Enter reason for absence or leave..."
//                 className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-gray-700"
//                 autoFocus
//               />
              
//               <div className="flex gap-3 mt-6">
//                 <button
//                   onClick={onClose}
//                   className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => { onSave(note); onClose(); }}
//                   className="flex-1 px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
//                 >
//                   <Save size={20} />
//                   Save Note
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };
