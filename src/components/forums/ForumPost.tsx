
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Flag } from "lucide-react";

interface Comment {
  id: number;
  author: string;
  authorInitials: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

const initialComments: Comment[] = [
  {
    id: 1,
    author: "Anonymous Bee",
    authorInitials: "AB",
    content: "I've been dealing with test anxiety for years. What works for me is a deep breathing technique - 4 counts in, hold for 7, exhale for 8. I do this a few times before tests and it helps calm my nervous system.",
    timestamp: "2 hours ago",
    likes: 12,
    isLiked: false,
  },
  {
    id: 2,
    author: "Anonymous Fox",
    authorInitials: "AF",
    content: "I find that regular exercise during exam season helps me manage stress. Even just a 20-minute walk between study sessions makes a big difference for my anxiety levels.",
    timestamp: "1 hour ago",
    likes: 8,
    isLiked: false,
  },
  {
    id: 3,
    author: "Anonymous Owl",
    authorInitials: "AO",
    content: "Something that helps me is being prepared ahead of time. Breaking study material into small chunks and reviewing over time rather than cramming reduces my anxiety significantly. Also, practice tests help me get familiar with the testing environment.",
    timestamp: "45 minutes ago",
    likes: 5,
    isLiked: false,
  },
];

const ForumPost = () => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  
  const handleLikeComment = (id: number) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked,
          };
        }
        return comment;
      })
    );
  };
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    const newCommentObj: Comment = {
      id: Date.now(),
      author: "You (Anonymous)",
      authorInitials: "YA",
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      isLiked: false,
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };
  
  return (
    <div className="space-y-6">
      <div className="card-glow p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10 bg-wellness-purple text-white">
              <AvatarFallback>OP</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold text-primary">Managing Anxiety During Exams</h2>
              <p className="text-sm text-gray-500">Posted by Anonymous Panda • 1 day ago</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Flag className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
        
        <div className="mt-4">
          <p className="text-foreground">
            With finals coming up, I'm starting to feel very anxious about my exams. 
            I'm having trouble sleeping and focusing on my studies. Does anyone have 
            tips for managing test anxiety? I'm especially looking for strategies to 
            use right before and during the exam when my mind tends to go blank.
          </p>
        </div>
        
        <div className="mt-6 flex items-center space-x-4">
          <Button variant="ghost" className="text-muted-foreground flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span>24 Likes</span>
          </Button>
          <Button variant="ghost" className="text-muted-foreground flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>{comments.length} Comments</span>
          </Button>
        </div>
      </div>
      
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-foreground">Comments</h3>
        
        {comments.map((comment) => (
          <div key={comment.id} className="card-glow p-4">
            <div className="flex items-start space-x-4">
              <Avatar className="h-8 w-8 bg-accent text-accent-foreground">
                <AvatarFallback>{comment.authorInitials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-foreground">{comment.author}</h4>
                  <span className="text-xs text-gray-400">{comment.timestamp}</span>
                </div>
                <p className="mt-1 text-sm text-foreground">{comment.content}</p>
                <div className="mt-2 flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-2 text-xs"
                    onClick={() => handleLikeComment(comment.id)}
                  >
                    <Heart 
                      className={`h-3 w-3 mr-1 ${comment.isLiked ? "fill-primary text-primary" : "text-muted-foreground"}`} 
                    />
                    <span>{comment.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-xs text-muted-foreground">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    <span>Reply</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-xs text-muted-foreground">
                    <Flag className="h-3 w-3 mr-1" />
                    <span>Report</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <form onSubmit={handleSubmitComment} className="mt-6 space-y-4">
          <textarea
            className="w-full p-3 rounded-lg border border-wellness-lavender/50 focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[100px]"
            placeholder="Share your thoughts or advice (you'll remain anonymous)..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex justify-end">
            <Button type="submit" className="button-primary">Post Comment</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForumPost;
