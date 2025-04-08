import { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function RegistrationForm() {
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = `/api/auth/register/${role}`;
    try {
      await axios.post(endpoint, formData);
      alert(`${role} registered successfully`);
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl mx-auto animate-fade-in">
      <div>
        <Label className="block mb-1">Select Role</Label>
        <Select value={role} onValueChange={(value) => setRole(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="teacher">Teacher</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Name</Label>
          <Input name="name" onChange={handleChange} required />
        </div>

        {role === 'teacher' && (
          <div>
            <Label>Email</Label>
            <Input name="email" type="email" onChange={handleChange} />
          </div>
        )}

        {role === 'student' && (
          <>
            <div>
              <Label>Qualification</Label>
              <Input name="qualification" onChange={handleChange} />
            </div>

            <div>
              <Label>Date of Birth</Label>
              <Input name="dob" type="date" onChange={handleChange} />
            </div>

            <div>
              <Label>Course ID</Label>
              <Input name="course_id" onChange={handleChange} />
            </div>

            <div>
              <Label>Address ID</Label>
              <Input name="add_id" onChange={handleChange} />
            </div>
          </>
        )}

        <div>
          <Label>Phone Number</Label>
          <Input name="phno" onChange={handleChange} />
        </div>

        <div>
          <Label>Username</Label>
          <Input name="usrnm" onChange={handleChange} />
        </div>

        <div>
          <Label>Password</Label>
          <Input name="paswrd" type="password" onChange={handleChange} />
        </div>
      </div>

      <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 text-lg rounded-xl">
        Register
      </Button>
    </form>
  );
}

export default RegistrationForm;
