
import Navbar from "@/components/layout/Navbar";
import ForumsList from "@/components/forums/ForumsList";
import ForumPost from "@/components/forums/ForumPost";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

const Forums = () => {
  const [viewingPost, setViewingPost] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            {viewingPost ? (
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  className="mr-2" 
                  onClick={() => setViewingPost(false)}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back to Forums
                </Button>
                <h1 className="text-2xl font-bold text-primary">Forum Post</h1>
              </div>
            ) : (
              <h1 className="text-2xl font-bold text-primary">Community Forums</h1>
            )}
          </div>
          
          <div className="card-glow p-6 mb-6">
            <h2 className="font-medium mb-2">Community Guidelines</h2>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li>Be respectful and supportive of others, even when disagreeing.</li>
              <li>Protect your privacy and that of others. Don't share identifying information.</li>
              <li>This is a peer support space, not a substitute for professional mental health care.</li>
              <li>In crisis? Call or text 988 for immediate help.</li>
            </ul>
          </div>
          
          {viewingPost ? <ForumPost /> : <ForumsList />}
          
          {!viewingPost && (
            <div className="mt-8 text-center">
              <Button onClick={() => setViewingPost(true)} className="button-primary">
                View Sample Forum Post
              </Button>
            </div>
          )}
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

export default Forums;
