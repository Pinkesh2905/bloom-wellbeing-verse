
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Navbar from "@/components/layout/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold gradient-heading mb-6">
              Join Our Supportive Community
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-500">
              Bloom is a safe space where you can connect with others, track your mental wellness journey, 
              and access resources to support your growth.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="/forums"
                  className="button-primary"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-wellness-lavender/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold gradient-heading">Bloom</span>
              <p className="text-sm text-muted-foreground mt-1">A mental wellness community platform</p>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-8 text-sm text-center md:text-left">
              <a href="/forums" className="text-foreground hover:text-primary mb-2 md:mb-0">Community Forums</a>
              <a href="/tracker" className="text-foreground hover:text-primary mb-2 md:mb-0">Mood Tracker</a>
              <a href="/journal" className="text-foreground hover:text-primary mb-2 md:mb-0">Journal</a>
              <a href="/resources" className="text-foreground hover:text-primary">Resources</a>
            </div>
          </div>
          <div className="mt-8 border-t border-wellness-lavender/50 pt-4 text-center text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Bloom. All rights reserved.</p>
            <p className="mt-1">
              If you're experiencing a mental health crisis, please call or text 988 to reach the Suicide & Crisis Lifeline.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
