import React from 'react'
import TeacherCredentials from '../components/TeacherCredentials'
import ClassList from '../components/ClassList'

function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-green-600">Home Page</h1>
      <TeacherCredentials />
      <ClassList />
    </div>
  )
}

export default Home
