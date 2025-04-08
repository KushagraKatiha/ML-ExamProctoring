import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function StudentDashboard() {
  return (
    <Card className="max-w-4xl mx-auto mt-10 p-6 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-green-700">🎓 Student Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">Welcome to your dashboard. Here are your available actions:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button variant="outline">📄 View Assigned Exams</Button>
          <Button variant="outline">📝 Attempt Exam</Button>
          <Button variant="outline">📊 View Results</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default StudentDashboard;