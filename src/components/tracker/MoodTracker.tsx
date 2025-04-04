
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Heart, Activity, Sun, Moon, CloudRain } from "lucide-react";

interface MoodEntry {
  date: Date;
  mood: number;
  energy: number;
  sleep: number;
  notes: string;
}

const moodEmojis = ["😔", "😕", "😐", "🙂", "😊"];
const energyIcons = [1, 2, 3, 4, 5].map(level => 
  <div className="flex">
    {Array(level).fill(0).map((_, i) => 
      <Activity key={i} className={`h-4 w-4 ${level > 3 ? "text-wellness-purple" : "text-muted-foreground"}`} />
    )}
  </div>
);

const initialEntries: MoodEntry[] = [
  {
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    mood: 2,
    energy: 2,
    sleep: 6,
    notes: "Feeling a bit down today. Couldn't focus well on tasks.",
  },
  {
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    mood: 3,
    energy: 3,
    sleep: 7,
    notes: "Better today. Managed to complete most of my tasks.",
  },
  {
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    mood: 4,
    energy: 4,
    sleep: 8,
    notes: "Good day! Felt motivated and accomplished several tasks.",
  },
  {
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    mood: 3,
    energy: 3,
    sleep: 7,
    notes: "Decent day overall. Had a good conversation with a friend.",
  },
  {
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    mood: 2,
    energy: 2,
    sleep: 5,
    notes: "Stressful day. Had trouble sleeping last night.",
  },
  {
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    mood: 3,
    energy: 3,
    sleep: 6,
    notes: "Feeling better than yesterday. Took some time for self-care.",
  },
];

const MoodTracker = () => {
  const [entries, setEntries] = useState<MoodEntry[]>(initialEntries);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentEntry, setCurrentEntry] = useState<MoodEntry>({
    date: new Date(),
    mood: 3,
    energy: 3,
    sleep: 7,
    notes: "",
  });
  
  const handleSaveEntry = () => {
    if (!selectedDate) return;
    
    const existingEntryIndex = entries.findIndex(
      entry => entry.date.toDateString() === selectedDate.toDateString()
    );
    
    const newEntry = { ...currentEntry, date: selectedDate };
    
    if (existingEntryIndex >= 0) {
      // Update existing entry
      const updatedEntries = [...entries];
      updatedEntries[existingEntryIndex] = newEntry;
      setEntries(updatedEntries);
    } else {
      // Add new entry
      setEntries([...entries, newEntry]);
    }
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDate(date);
    
    // Check if there's an entry for the selected date
    const existingEntry = entries.find(
      entry => entry.date.toDateString() === date.toDateString()
    );
    
    if (existingEntry) {
      setCurrentEntry(existingEntry);
    } else {
      setCurrentEntry({
        date,
        mood: 3,
        energy: 3,
        sleep: 7,
        notes: "",
      });
    }
  };
  
  const getDayWithEntryClass = (date: Date) => {
    return entries.some(entry => entry.date.toDateString() === date.toDateString())
      ? "bg-primary/20 text-primary font-bold rounded-full"
      : "";
  };
  
  return (
    <div className="grid md:grid-cols-5 gap-6">
      <Card className="md:col-span-2 card-glow">
        <CardHeader>
          <CardTitle className="text-primary">Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            className="rounded-md border"
            modifiersClassNames={{
              selected: "bg-primary text-primary-foreground",
            }}
            components={{
              DayContent: ({ date }) => (
                <div className={`w-full h-full flex items-center justify-center ${getDayWithEntryClass(date)}`}>
                  {date.getDate()}
                </div>
              ),
            }}
          />
          
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-primary/20 mr-2"></div>
              Entry recorded
            </span>
            <span className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-primary mr-2"></div>
              Selected day
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-3 card-glow">
        <CardHeader>
          <CardTitle className="text-primary">
            {selectedDate ? `Mood Entry: ${selectedDate.toLocaleDateString()}` : "New Mood Entry"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="mood" className="space-y-4">
            <TabsList className="grid grid-cols-3 gap-2">
              <TabsTrigger value="mood" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <Heart className="h-4 w-4 mr-2" />
                Mood
              </TabsTrigger>
              <TabsTrigger value="energy" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <Activity className="h-4 w-4 mr-2" />
                Energy
              </TabsTrigger>
              <TabsTrigger value="sleep" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <Moon className="h-4 w-4 mr-2" />
                Sleep
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="mood" className="space-y-4">
              <div>
                <div className="mb-2 text-lg font-medium">How are you feeling today?</div>
                <div className="flex justify-between mb-2">
                  {moodEmojis.map((emoji, index) => (
                    <div key={index} className="text-2xl">{emoji}</div>
                  ))}
                </div>
                <Slider
                  value={[currentEntry.mood]}
                  min={0}
                  max={4}
                  step={1}
                  onValueChange={(value) => setCurrentEntry({ ...currentEntry, mood: value[0] })}
                  className="mb-6"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Notes about your mood today</label>
                <textarea
                  className="w-full p-3 rounded-lg border border-wellness-lavender/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  rows={3}
                  placeholder="What made you feel this way? Any patterns or triggers?"
                  value={currentEntry.notes}
                  onChange={(e) => setCurrentEntry({ ...currentEntry, notes: e.target.value })}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="energy" className="space-y-4">
              <div>
                <div className="mb-2 text-lg font-medium">Energy Level</div>
                <div className="flex justify-between mb-2">
                  {energyIcons.map((icon, index) => (
                    <div key={index}>{icon}</div>
                  ))}
                </div>
                <Slider
                  value={[currentEntry.energy]}
                  min={0}
                  max={4}
                  step={1}
                  onValueChange={(value) => setCurrentEntry({ ...currentEntry, energy: value[0] })}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="sleep" className="space-y-4">
              <div>
                <div className="mb-2 text-lg font-medium">Hours of Sleep</div>
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <Moon className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>Less</span>
                  </div>
                  <div className="flex items-center">
                    <Moon className="h-4 w-4 mr-1 text-primary" />
                    <span>More</span>
                  </div>
                </div>
                <Slider
                  value={[currentEntry.sleep]}
                  min={0}
                  max={12}
                  step={0.5}
                  onValueChange={(value) => setCurrentEntry({ ...currentEntry, sleep: value[0] })}
                />
                <div className="text-center mt-2">
                  <span className="text-lg font-medium">{currentEntry.sleep} hours</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSaveEntry} className="button-primary">Save Entry</Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Weekly Trends */}
      <Card className="md:col-span-5 card-glow">
        <CardHeader>
          <CardTitle className="text-primary">Weekly Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Mood</h3>
              <div className="h-10 bg-muted rounded-md flex">
                {entries
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((entry, index) => (
                    <div
                      key={index}
                      className="h-full flex items-end"
                      style={{ 
                        width: `${100 / entries.length}%`,
                        backgroundColor: `rgba(155, 135, 245, ${0.2 + entry.mood * 0.2})`,
                        borderRadius: index === 0 ? "0.375rem 0 0 0.375rem" : index === entries.length - 1 ? "0 0.375rem 0.375rem 0" : ""
                      }}
                      title={`${entry.date.toLocaleDateString()}: ${moodEmojis[entry.mood]}`}
                    >
                      <div className="w-full text-center text-xs">
                        {moodEmojis[entry.mood]}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Energy</h3>
              <div className="h-10 bg-muted rounded-md flex">
                {entries
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((entry, index) => (
                    <div
                      key={index}
                      className="h-full flex items-end"
                      style={{ 
                        width: `${100 / entries.length}%`,
                        backgroundColor: `rgba(155, 135, 245, ${0.2 + entry.energy * 0.2})`,
                        borderRadius: index === 0 ? "0.375rem 0 0 0.375rem" : index === entries.length - 1 ? "0 0.375rem 0.375rem 0" : ""
                      }}
                      title={`${entry.date.toLocaleDateString()}: Energy level ${entry.energy + 1}`}
                    >
                      <div className="w-full text-center text-xs">
                        {entry.energy + 1}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Sleep</h3>
              <div className="h-10 bg-muted rounded-md flex">
                {entries
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((entry, index) => (
                    <div
                      key={index}
                      className="h-full flex items-end"
                      style={{ 
                        width: `${100 / entries.length}%`,
                        backgroundColor: `rgba(155, 135, 245, ${0.2 + (entry.sleep / 12) * 0.8})`,
                        borderRadius: index === 0 ? "0.375rem 0 0 0.375rem" : index === entries.length - 1 ? "0 0.375rem 0.375rem 0" : ""
                      }}
                      title={`${entry.date.toLocaleDateString()}: ${entry.sleep} hours of sleep`}
                    >
                      <div className="w-full text-center text-xs">
                        {entry.sleep}h
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-center text-muted-foreground">
            <p>Track your patterns over time to identify what affects your well-being.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodTracker;
