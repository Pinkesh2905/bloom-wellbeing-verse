
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink, Heart } from "lucide-react";
import { useState } from "react";

interface Resource {
  id: number;
  title: string;
  description: string;
  type: "article" | "video" | "tool" | "podcast";
  categories: string[];
  url: string;
  likes: number;
  isLiked: boolean;
}

interface ResourceCardProps {
  resource: Resource;
  onLike: (id: number) => void;
}

const ResourceCard = ({ resource, onLike }: ResourceCardProps) => {
  const typeIcons = {
    article: <BookOpen className="h-5 w-5" />,
    video: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    tool: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    podcast: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>,
  };
  
  const typeBg = {
    article: "bg-wellness-lavender",
    video: "bg-wellness-pink",
    tool: "bg-wellness-mint",
    podcast: "bg-wellness-sky",
  };
  
  return (
    <Card className="card-glow h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className={`${typeBg[resource.type]} p-2 rounded-md text-primary`}>
            {typeIcons[resource.type]}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`${resource.isLiked ? "text-red-500" : "text-muted-foreground"}`}
            onClick={() => onLike(resource.id)}
          >
            <Heart className={`h-5 w-5 ${resource.isLiked ? "fill-red-500" : ""}`} />
          </Button>
        </div>
        <CardTitle className="text-primary mt-2">{resource.title}</CardTitle>
        <CardDescription>{resource.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="flex flex-wrap gap-2">
          {resource.categories.map((category) => (
            <Badge key={category} variant="outline" className="bg-muted text-foreground">
              {category}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-xs text-muted-foreground">
          {resource.likes} {resource.likes === 1 ? "person" : "people"} found this helpful
        </div>
        <Button variant="outline" size="sm" asChild>
          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
            <span className="mr-1">Visit</span> 
            <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

const resources: Resource[] = [
  {
    id: 1,
    title: "Understanding Anxiety: A Guide for Students",
    description: "Learn about the causes, symptoms, and management strategies for anxiety in an academic setting.",
    type: "article",
    categories: ["anxiety", "student-life"],
    url: "#",
    likes: 42,
    isLiked: false,
  },
  {
    id: 2,
    title: "5-Minute Mindfulness Meditation",
    description: "A short guided meditation perfect for beginners or when you need a quick reset during a busy day.",
    type: "video",
    categories: ["mindfulness", "meditation", "stress-relief"],
    url: "#",
    likes: 78,
    isLiked: false,
  },
  {
    id: 3,
    title: "Sleep Hygiene Assessment Tool",
    description: "Evaluate your sleep habits and get personalized recommendations for better rest.",
    type: "tool",
    categories: ["sleep", "self-assessment"],
    url: "#",
    likes: 31,
    isLiked: false,
  },
  {
    id: 4,
    title: "The Science of Happiness",
    description: "Explore research-backed practices that can increase your overall sense of well-being and life satisfaction.",
    type: "podcast",
    categories: ["positive-psychology", "happiness"],
    url: "#",
    likes: 56,
    isLiked: false,
  },
  {
    id: 5,
    title: "Digital Detox: Reclaiming Balance in a Connected World",
    description: "Practical strategies for developing a healthier relationship with technology.",
    type: "article",
    categories: ["digital-wellbeing", "habits"],
    url: "#",
    likes: 27,
    isLiked: false,
  },
  {
    id: 6,
    title: "Stress Management for College Students",
    description: "Effective techniques for managing academic pressure and maintaining mental health.",
    type: "video",
    categories: ["stress-relief", "student-life"],
    url: "#",
    likes: 62,
    isLiked: false,
  },
  {
    id: 7,
    title: "Emotion Tracking Template",
    description: "A downloadable worksheet to help identify patterns in your emotional responses.",
    type: "tool",
    categories: ["emotional-awareness", "self-reflection"],
    url: "#",
    likes: 19,
    isLiked: false,
  },
  {
    id: 8,
    title: "Building Resilience Through Adversity",
    description: "Stories and insights about developing inner strength during challenging times.",
    type: "podcast",
    categories: ["resilience", "personal-growth"],
    url: "#",
    likes: 44,
    isLiked: false,
  },
];

const ResourceList = () => {
  const [resourcesList, setResourcesList] = useState<Resource[]>(resources);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  
  const allCategories = Array.from(
    new Set(resources.flatMap((resource) => resource.categories))
  );
  
  const resourceTypes = ["article", "video", "tool", "podcast"];
  
  const handleLike = (id: number) => {
    setResourcesList(
      resourcesList.map((resource) => {
        if (resource.id === id) {
          return {
            ...resource,
            likes: resource.isLiked ? resource.likes - 1 : resource.likes + 1,
            isLiked: !resource.isLiked,
          };
        }
        return resource;
      })
    );
  };
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category]
    );
  };
  
  const toggleType = (type: string) => {
    setSelectedTypes(
      selectedTypes.includes(type)
        ? selectedTypes.filter((t) => t !== type)
        : [...selectedTypes, type]
    );
  };
  
  const filteredResources = resourcesList.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategories = selectedCategories.length === 0 || 
                             resource.categories.some((category) => selectedCategories.includes(category));
    
    const matchesTypes = selectedTypes.length === 0 || 
                        selectedTypes.includes(resource.type);
    
    return matchesSearch && matchesCategories && matchesTypes;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex items-center rounded-lg border border-input bg-background px-3">
        <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search resources..."
          className="flex h-10 w-full rounded-md bg-transparent px-3 py-2 text-sm outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-medium text-primary">Resource Type</h3>
            <div className="space-y-2">
              {resourceTypes.map((type) => (
                <div key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`type-${type}`}
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor={`type-${type}`} className="ml-2 text-sm font-medium capitalize">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="mb-2 text-lg font-medium text-primary">Categories</h3>
            <div className="space-y-2">
              {allCategories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor={`category-${category}`} className="ml-2 text-sm font-medium capitalize">
                    {category.replace(/-/g, " ")}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="md:col-span-3">
          {filteredResources.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} onLike={handleLike} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-muted rounded-lg">
              <p className="text-muted-foreground">No resources found matching your criteria.</p>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceList;
