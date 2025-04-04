
import Navbar from "@/components/layout/Navbar";
import MoodTracker from "@/components/tracker/MoodTracker";

const Tracker = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-primary mb-6">Mood Tracker</h1>
          
          <div className="card-glow p-6 mb-6">
            <h2 className="font-medium mb-2">Benefits of Mood Tracking</h2>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li>Recognize patterns and triggers that affect your mood</li>
              <li>Increase self-awareness and emotional intelligence</li>
              <li>Identify effective coping strategies for difficult emotions</li>
              <li>Track your progress over time</li>
            </ul>
          </div>
          
          <MoodTracker />
        </div>
      </main>
      
      <footer className="bg-wellness-lavender/30 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Bloom. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Tracker;
