import React ,{useEffect,useState}from 'react'
import {useParams} from 'react-router-dom';
import Title from './Title';
import Studentcard from './studentcard';
import studentData from '../assets/studentData';

function StudentsList() {
// console.log(studentData);
const {classLevel} =useParams();
const [students ,setStudents] = useState([]);
useEffect(() => {
  const filteredList = studentData.filter(
    (item) => item.classLevel === classLevel );
    setStudents(filteredList);
},[classLevel]);

  return (
    <div className='my-10'>
      {/* title */}
      <div className="text-center py-8 px-10 text-3xl">
        <Title text1={"Students"} text2={"List"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-grey-600">
          List of all Stundets of class classLevel!
        </p>
      </div>
      {/* student cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 place-items-center">
        {students.map((stud)=>(
          <Studentcard key={stud._id} stud={stud} />
        ))}
      </div>
    </div>
  )
}

export default StudentsList
