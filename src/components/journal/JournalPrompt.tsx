
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Calendar, RefreshCw, Save } from "lucide-react";

interface JournalEntry {
  id: number;
  date: Date;
  prompt: string;
  content: string;
  category: string;
}

const journalPrompts = {
  gratitude: [
    "List three things you're grateful for today and why.",
    "Describe a person who had a positive impact on your life recently.",
    "What's something you take for granted that you're actually thankful for?",
    "Write about a challenge that ended up being a blessing in disguise.",
    "What's something in nature that brings you joy?",
  ],
  reflection: [
    "What emotions have been most present for you today? What triggered them?",
    "Describe a moment today when you felt fully present.",
    "What's been occupying your thoughts lately?",
    "How are you different today than you were a year ago?",
    "What have you been avoiding dealing with? Why?",
  ],
  growth: [
    "What's one thing you'd like to improve about yourself? What's a small step you can take?",
    "Describe a recent mistake and what you learned from it.",
    "What limiting belief is holding you back? How can you challenge it?",
    "Write about a time you stepped outside your comfort zone. How did it feel?",
    "What does success mean to you right now?",
  ],
};

const pastEntries: JournalEntry[] = [
  {
    id: 1,
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    prompt: "List three things you're grateful for today and why.",
    content: "1. My supportive friends who checked in on me today.\n2. Having access to mental health resources online.\n3. The quiet morning I had to myself before classes started.",
    category: "gratitude",
  },
  {
    id: 2,
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    prompt: "What emotions have been most present for you today? What triggered them?",
    content: "Anxiety has been following me all day because of my upcoming presentation. I also felt moments of joy when talking with my roommate about weekend plans. I noticed that spending time on social media triggered some feelings of inadequacy.",
    category: "reflection",
  },
  {
    id: 3,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    prompt: "What's one thing you'd like to improve about yourself? What's a small step you can take?",
    content: "I'd like to improve my ability to set boundaries. A small step I can take is to practice saying no to one non-essential commitment this week and using that time for self-care instead.",
    category: "growth",
  },
];

const JournalPrompt = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(pastEntries);
  const [activeTab, setActiveTab] = useState("new");
  const [promptCategory, setPromptCategory] = useState("gratitude");
  const [currentPrompt, setCurrentPrompt] = useState(journalPrompts.gratitude[0]);
  const [journalContent, setJournalContent] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  
  const getRandomPrompt = (category: string) => {
    const prompts = journalPrompts[category as keyof typeof journalPrompts];
    const randomIndex = Math.floor(Math.random() * prompts.length);
    return prompts[randomIndex];
  };
  
  const handleNewPrompt = () => {
    const newPrompt = getRandomPrompt(promptCategory);
    setCurrentPrompt(newPrompt);
  };
  
  const handleSaveEntry = () => {
    if (!journalContent.trim()) return;
    
    const newEntry: JournalEntry = {
      id: Date.now(),
      date: new Date(),
      prompt: currentPrompt,
      content: journalContent,
      category: promptCategory,
    };
    
    setEntries([newEntry, ...entries]);
    setJournalContent("");
  };
  
  const handleEntrySelect = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setActiveTab("view");
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Past Entries List */}
      <div className="md:col-span-1">
        <Card className="card-glow h-full">
          <CardHeader>
            <CardTitle className="text-primary">Journal Entries</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 h-[calc(100%-7rem)] overflow-y-auto pr-2">
            {entries.length > 0 ? (
              entries.map((entry) => (
                <div 
                  key={entry.id}
                  className="p-3 rounded-lg border border-wellness-lavender/50 hover:border-wellness-lavender cursor-pointer transition-all duration-200"
                  onClick={() => handleEntrySelect(entry)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(entry.date)}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      entry.category === "gratitude" 
                        ? "bg-wellness-mint text-green-800" 
                        : entry.category === "reflection" 
                          ? "bg-wellness-sky text-blue-800" 
                          : "bg-wellness-peach text-orange-800"
                    }`}>
                      {entry.category}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-primary line-clamp-1">
                    {entry.prompt}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {entry.content}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No journal entries yet.</p>
                <p className="text-sm">Start writing to reflect on your thoughts and feelings.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Journal Writing Area */}
      <div className="md:col-span-2">
        <Card className="card-glow h-full flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-primary">Journal</CardTitle>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger 
                    value="new" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    New Entry
                  </TabsTrigger>
                  <TabsTrigger 
                    value="view" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    disabled={!selectedEntry}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    View Entry
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          
          <CardContent className="flex-grow overflow-y-auto">
            <TabsContent value="new" className="h-full flex flex-col mt-0">
              <div>
                <div className="flex space-x-2 mb-4">
                  <Button
                    variant={promptCategory === "gratitude" ? "default" : "outline"}
                    className={promptCategory === "gratitude" ? "bg-wellness-purple text-white" : ""}
                    onClick={() => {
                      setPromptCategory("gratitude");
                      setCurrentPrompt(getRandomPrompt("gratitude"));
                    }}
                  >
                    Gratitude
                  </Button>
                  <Button
                    variant={promptCategory === "reflection" ? "default" : "outline"}
                    className={promptCategory === "reflection" ? "bg-wellness-purple text-white" : ""}
                    onClick={() => {
                      setPromptCategory("reflection");
                      setCurrentPrompt(getRandomPrompt("reflection"));
                    }}
                  >
                    Reflection
                  </Button>
                  <Button
                    variant={promptCategory === "growth" ? "default" : "outline"}
                    className={promptCategory === "growth" ? "bg-wellness-purple text-white" : ""}
                    onClick={() => {
                      setPromptCategory("growth");
                      setCurrentPrompt(getRandomPrompt("growth"));
                    }}
                  >
                    Growth
                  </Button>
                </div>
                
                <div className="mb-4 flex justify-between items-center">
                  <div className="text-sm font-medium bg-wellness-lavender/20 p-3 rounded-lg flex-grow">
                    {currentPrompt}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="ml-2 flex-shrink-0" 
                    onClick={handleNewPrompt}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                
                <textarea
                  className="w-full p-4 rounded-lg border border-wellness-lavender/50 focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[250px]"
                  placeholder="Begin writing your thoughts here..."
                  value={journalContent}
                  onChange={(e) => setJournalContent(e.target.value)}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="view" className="h-full flex flex-col mt-0">
              {selectedEntry && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-primary">
                      {formatDate(selectedEntry.date)}
                    </h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedEntry.category === "gratitude" 
                        ? "bg-wellness-mint text-green-800" 
                        : selectedEntry.category === "reflection" 
                          ? "bg-wellness-sky text-blue-800" 
                          : "bg-wellness-peach text-orange-800"
                    }`}>
                      {selectedEntry.category}
                    </span>
                  </div>
                  
                  <div className="text-sm font-medium bg-wellness-lavender/20 p-3 rounded-lg">
                    {selectedEntry.prompt}
                  </div>
                  
                  <div className="p-4 rounded-lg border border-wellness-lavender/50 min-h-[250px] whitespace-pre-line">
                    {selectedEntry.content}
                  </div>
                </div>
              )}
            </TabsContent>
          </CardContent>
          
          <CardFooter className="pt-4">
            {activeTab === "new" && (
              <Button 
                onClick={handleSaveEntry} 
                className="button-primary ml-auto"
                disabled={!journalContent.trim()}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Entry
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default JournalPrompt;
