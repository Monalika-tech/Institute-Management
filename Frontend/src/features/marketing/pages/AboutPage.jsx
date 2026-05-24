const AboutPage = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      <div className="relative h-[60vh] flex items-center justify-center text-center">
        <div
          className="absolute inset-0 blur-sm bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://png.pngtree.com/thumb_back/fh260/background/20250427/pngtree-back-to-school-background-with-a-white-line-drawing-of-educational-image_17234810.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 px-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            About Our <span className="text-gray-900">IMS</span>
          </h1>
          <p className="mt-4 text-gray-200 max-w-2xl mx-auto">
            A modern solution to manage students, classes, and academic workflows efficiently.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">What We Do</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Our Institute Management System simplifies administrative tasks by providing a unified
          platform for managing students, teachers, classes, and academic processes.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Student Management", desc: "Add, update, and track student records easily." },
          { title: "Class Scheduling", desc: "Organize classes and manage batches efficiently." },
          { title: "Attendance Tracking", desc: "Monitor attendance with daily and monthly insights." },
          { title: "Teacher Management", desc: "Manage teachers and assign classes seamlessly." },
          { title: "Performance Tracking", desc: "Analyze student performance and growth." },
          { title: "Fee Management", desc: "Track payments and pending fees easily." },
        ].map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2 text-blue-600">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white py-16 px-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          To empower educational institutions with smart digital tools that improve efficiency.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Future Vision</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          We aim to integrate analytics, AI-based insights, and advanced reporting features.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
