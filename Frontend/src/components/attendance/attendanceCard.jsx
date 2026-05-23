// import React, { useState } from 'react';
// import { motion, useMotionValue, useTransform, AnimatePresence } from 'motion/react';
// import { Check, X, Clock, MessageSquare, User } from 'lucide-react';
// import { Student, AttendanceRecord } from '../types';

// interface AttendanceCardProps {
//   student: Student;
//   record: AttendanceRecord;
//   onMark: (status: 'present' | 'absent' | 'leave') => void;
//   onOpenNote: () => void;
// }

// export const AttendanceCard: React.FC<AttendanceCardProps> = ({
//   student,
//   record,
//   onMark,
//   onOpenNote,
// }) => {
//   const x = useMotionValue(0);
//   const rotate = useTransform(x, [-200, 200], [-25, 25]);
//   const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
//   // Background color based on swipe direction
//   const background = useTransform(
//     x,
//     [-100, 0, 100],
//     ['#fee2e2', '#ffffff', '#dcfce7'] // red-100, white, green-100
//   );

//   const handleDragEnd = (_: any, info: any) => {
//     if (info.offset.x > 100) {
//       onMark('present');
//     } else if (info.offset.x < -100) {
//       onMark('absent');
//     }
//   };

//   const getStatusColor = () => {
//     switch (record.status) {
//       case 'present': return 'bg-green-500';
//       case 'absent': return 'bg-red-500';
//       case 'leave': return 'bg-amber-500';
//       default: return 'bg-gray-200';
//     }
//   };

//   return (
//     <div className="relative w-full max-w-sm mx-auto h-48 perspective-1000">
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={student._id}
//           initial={{ opacity: 0, scale: 0.8, y: 20 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.8, y: -20 }}
//           style={{ x, rotate, opacity, background }}
//           drag="x"
//           dragConstraints={{ left: 0, right: 0 }}
//           onDragEnd={handleDragEnd}
//           whileTap={{ scale: 0.98 }}
//           className="absolute inset-0 cursor-grab active:cursor-grabbing rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col justify-between overflow-hidden"
//         >
//           {/* Swipe Indicators */}
//           <motion.div 
//             style={{ opacity: useTransform(x, [0, 50], [0, 1]) }}
//             className="absolute top-4 right-4 text-green-600 flex items-center gap-1 font-bold uppercase text-xs"
//           >
//             Present <Check size={16} />
//           </motion.div>
//           <motion.div 
//             style={{ opacity: useTransform(x, [0, -50], [0, 1]) }}
//             className="absolute top-4 left-4 text-red-600 flex items-center gap-1 font-bold uppercase text-xs"
//           >
//             <X size={16} /> Absent
//           </motion.div>

//           <div className="flex items-center gap-4">
//             <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
//               {student.avatar ? (
//                 <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center text-gray-400">
//                   <User size={32} />
//                 </div>
//               )}
//             </div>
//             <div className="flex-1 min-w-0">
//               <h3 className="text-xl font-bold text-gray-900 truncate">{student.name}</h3>
//               <div className="flex items-center gap-2 mt-1">
//                 <span className={`w-2.5 h-2.5 rounded-full ${getStatusColor()}`} />
//                 <span className="text-sm text-gray-500 capitalize">{record.status}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center justify-between mt-4">
//             <button
//               onClick={(e) => { e.stopPropagation(); onMark('leave'); }}
//               className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors text-sm font-medium"
//             >
//               <Clock size={16} /> Mark Leave
//             </button>
            
//             <button
//               onClick={(e) => { e.stopPropagation(); onOpenNote(); }}
//               className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
//                 record.note ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
//               }`}
//             >
//               <MessageSquare size={16} />
//               {record.note ? 'Edit Note' : 'Add Note'}
//             </button>
//           </div>
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// };
