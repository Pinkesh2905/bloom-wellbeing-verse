
import Navbar from "@/components/layout/Navbar";
import ResourceList from "@/components/resources/ResourceCard";

const Resources = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-primary mb-6">Wellness Resources</h1>
          
          <div className="card-glow p-6 mb-6">
            <h2 className="font-medium mb-2">About Our Resource Directory</h2>
            <p className="text-sm text-muted-foreground">
              Explore our curated collection of mental wellness resources. From articles and videos to 
              interactive tools and podcasts, you'll find content to support various aspects of your 
              mental health journey. Resources are regularly updated and community-rated for helpfulness.
            </p>
          </div>
          
          <ResourceList />
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

export default Resources;
