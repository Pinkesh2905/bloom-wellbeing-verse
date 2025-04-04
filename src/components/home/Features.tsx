
import { CalendarIcon, MessageCircle, Heart, BookOpen, User } from "lucide-react";

const features = [
  {
    name: "Anonymous Peer Support",
    description: "Connect with others going through similar challenges without revealing your identity.",
    icon: MessageCircle,
    color: "bg-wellness-lavender",
  },
  {
    name: "Mood Tracking",
    description: "Track your emotional patterns and recognize triggers that affect your well-being.",
    icon: Heart,
    color: "bg-wellness-pink",
  },
  {
    name: "Guided Journaling",
    description: "Express yourself through thought-provoking prompts designed to promote self-reflection.",
    icon: BookOpen,
    color: "bg-wellness-sky",
  },
  {
    name: "Resource Directory",
    description: "Access a curated collection of articles, videos, and tools for mental wellness.",
    icon: User,
    color: "bg-wellness-mint",
  },
  {
    name: "Wellness Activities",
    description: "Schedule and track mindfulness and stress-reduction techniques in your daily routine.",
    icon: CalendarIcon,
    color: "bg-wellness-peach",
  },
];

const Features = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-extrabold text-center tracking-tight gradient-heading mb-12">
          Supporting Your Mental Wellness Journey
        </h2>
        
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="card-glow p-6 animate-fade-in">
                <div>
                  <div className={`${feature.color} p-3 inline-flex items-center justify-center rounded-md shadow-sm`}>
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-primary">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
