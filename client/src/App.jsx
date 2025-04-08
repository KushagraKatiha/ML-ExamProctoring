// src/App.jsx
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import RegistrationForm from './Components/RegistrationForm';
import LoginForm from './Components/LoginForm';
import { Button } from '@/components/ui/button';

export default function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-200">
        <div className="flex items-center justify-between border-b border-gray-200 p-6 bg-gradient-to-r from-indigo-700 to-indigo-500">
          <h2 className="text-white text-3xl font-bold tracking-tight">Exam System Portal</h2>
          <div className="flex space-x-2">
            <Button
              variant={showLogin ? 'default' : 'outline'}
              onClick={() => setShowLogin(true)}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${showLogin ? 'bg-white text-indigo-700 hover:bg-indigo-100' : 'text-white border-white hover:bg-white hover:text-indigo-600'}`}
            >
              Login
            </Button>
            <Button
              variant={!showLogin ? 'default' : 'outline'}
              onClick={() => setShowLogin(false)}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${!showLogin ? 'bg-white text-indigo-700 hover:bg-indigo-100' : 'text-white border-white hover:bg-white hover:text-indigo-600'}`}
            >
              Register
            </Button>
          </div>
        </div>
        <CardContent className="p-10">
          {showLogin ? <LoginForm /> : <RegistrationForm />}
        </CardContent>
      </div>
    </div>
  );
}
