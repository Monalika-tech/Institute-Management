import Title from "@/shared/components/Title";

function TeacherCredentials({ teacher }) {
  if (!teacher) {
    return <h1 className="text-gray-500">Loading teachers Profile!</h1>;
  }

  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 py-5 rounded-md justify-between mx-2 sm:mx-2 lg:mx-10 shadow-md shadow-gray-300">
      <div className="w-full sm:w-1/5" />
      <div className="w-full sm:w-2/5 flex flex-col justify-center px-6 py-8 gap-6">
        <div className="flex items-center gap-2 text-3xl">
          <Title text1="P" text2="rofile" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">Institute Name</h1>
        <div className="space-y-3 text-gray-800">
          <p>
            <strong>Name:</strong> {teacher.name}
          </p>
          <p>
            <strong>Email:</strong> {teacher.email}
          </p>
          <p>
            <strong>Phone:</strong> {teacher.phone_no}
          </p>
          <p>
            <strong>Address:</strong> {teacher.address}
          </p>
          <p>
            <strong>Experience:</strong> {teacher.experiencedYears} years
          </p>
          <p>
            <strong>Qualification:</strong> {teacher.qualification}
          </p>
        </div>
      </div>
      <div className="w-full sm:w-2/5 flex items-center justify-center p-6">
        <img
          src="https://media.istockphoto.com/id/1793392179/vector/open-book-with-planet-flat-icon-vector-sign-for-logo-concept-and-illustration-planet-earth.jpg?s=612x612&w=0&k=20&c=4AfeQi0WbobUhoyBgIyGKBYt_-1GudONWjSIflo1HP0="
          alt="Institute Logo"
          className="max-w-xs w-full object-contain"
        />
      </div>
    </div>
  );
}

export default TeacherCredentials;
