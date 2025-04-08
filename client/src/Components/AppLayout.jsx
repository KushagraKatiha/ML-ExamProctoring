// src/components/AppLayout.jsx
import { Link } from 'react-router-dom';

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Exam System</h1>
        <nav className="space-x-4">
          <Link to="/" className="text-blue-600 hover:underline">Login</Link>
          <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </nav>
      </header>
      <main className="p-6 flex justify-center items-center">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
