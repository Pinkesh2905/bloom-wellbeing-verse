
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ForumTopic {
  id: number;
  title: string;
  description: string;
  posts: number;
  lastActive: string;
  category: string;
}

const forumTopics: ForumTopic[] = [
  {
    id: 1,
    title: "Managing Anxiety During Exams",
    description: "Share tips and experiences for handling test anxiety.",
    posts: 24,
    lastActive: "2 hours ago",
    category: "anxiety",
  },
  {
    id: 2,
    title: "Mindfulness Practices for Beginners",
    description: "Easy ways to incorporate mindfulness into daily routines.",
    posts: 18,
    lastActive: "5 hours ago",
    category: "mindfulness",
  },
  {
    id: 3,
    title: "Balancing Social Media and Mental Health",
    description: "Discussion on healthy boundaries with digital platforms.",
    posts: 31,
    lastActive: "1 day ago",
    category: "digital-wellbeing",
  },
  {
    id: 4,
    title: "Building Resilience Through Challenges",
    description: "How to grow stronger through difficult experiences.",
    posts: 15,
    lastActive: "2 days ago",
    category: "resilience",
  },
  {
    id: 5,
    title: "Sleep Hygiene Strategies",
    description: "Tips for improving sleep quality and establishing routines.",
    posts: 27,
    lastActive: "3 days ago",
    category: "self-care",
  },
  {
    id: 6,
    title: "Communication Skills for Better Relationships",
    description: "Learning to express needs and listen effectively.",
    posts: 22,
    lastActive: "4 days ago",
    category: "relationships",
  },
];

const ForumsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredTopics = forumTopics.filter((topic) => {
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          topic.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === "all" || topic.category === activeTab;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search forums..."
            className="w-full px-4 py-2 rounded-full border border-wellness-lavender/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="button-primary">Create New Topic</Button>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full overflow-x-auto flex whitespace-nowrap p-0 h-auto">
          <TabsTrigger value="all" className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            All Topics
          </TabsTrigger>
          <TabsTrigger value="anxiety" className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            Anxiety
          </TabsTrigger>
          <TabsTrigger value="mindfulness" className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            Mindfulness
          </TabsTrigger>
          <TabsTrigger value="self-care" className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            Self-Care
          </TabsTrigger>
          <TabsTrigger value="relationships" className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            Relationships
          </TabsTrigger>
          <TabsTrigger value="digital-wellbeing" className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            Digital Wellbeing
          </TabsTrigger>
          <TabsTrigger value="resilience" className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            Resilience
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredTopics.length > 0 ? (
              filteredTopics.map((topic) => (
                <Card key={topic.id} className="card-glow cursor-pointer hover:translate-y-[-2px] transition-all duration-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-primary">{topic.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">{topic.description}</p>
                    <div className="mt-4 flex justify-between text-xs text-gray-400">
                      <span>{topic.posts} posts</span>
                      <span>Last active: {topic.lastActive}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center py-10">
                <p className="text-muted-foreground">No topics found. Try a different search term or category.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ForumsList;
