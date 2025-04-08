import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function TeacherDashboard() {
  return (
    <Card className="max-w-4xl mx-auto mt-10 p-6 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-blue-700">👩‍🏫 Teacher Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">Welcome! Manage your tasks from below:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button variant="outline">🗂️ Create Exam</Button>
          <Button variant="outline">✏️ Add Questions</Button>
          <Button variant="outline">📜 View Student Responses</Button>
          <Button variant="outline">📈 Generate Result</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default TeacherDashboard;
