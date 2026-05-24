import Navbar from "@/layouts/Navbar";
import Sidebar from "@/layouts/Sidebar";
import { useAuth } from "@/features/auth/context/AuthContext";

function AppLayout({ children }) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {isAuthenticated && <Navbar className="sticky top-0" />}

      <div className="flex flex-1">
        {isAuthenticated && <Sidebar />}

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="bg-white rounded-2xl shadow-md min-h-full p-4 sm:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
