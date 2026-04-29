import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  doc,
  setDoc
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  MessageSquare, 
  X, 
  Send, 
  User, 
  ShieldCheck, 
  Loader2,
  MinusCircle
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function ChatModule() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, role } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user || !isOpen) return;

    const chatDocRef = doc(db, "chats", user.uid);
    // Ensure chat document exists
    setDoc(chatDocRef, { 
      lastMessage: "Conversation started",
      updatedAt: serverTimestamp(),
      clientEmail: user.email 
    }, { merge: true });

    const q = query(
      collection(db, "chats", user.uid, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });

    return () => unsubscribe();
  }, [user, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    const msg = message;
    setMessage("");

    try {
      await addDoc(collection(db, "chats", user.uid, "messages"), {
        text: msg,
        senderId: user.uid,
        senderEmail: user.email,
        senderRole: role || "client",
        createdAt: serverTimestamp()
      });

      // Update last message in parent doc
      await setDoc(doc(db, "chats", user.uid), {
        lastMessage: msg,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (!user) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <Card className="w-[380px] h-[520px] shadow-2xl flex flex-col glass-card border-white/10 animate-scale-in overflow-hidden">
          <CardHeader className="bg-primary p-4 flex flex-row items-center justify-between text-white rounded-t-none">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-sm font-bold">Engineering Support</CardTitle>
                <p className="text-[10px] text-white/70 uppercase tracking-widest font-bold">Real-time Channel</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              <MinusCircle className="w-5 h-5" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/20">
            {messages.length === 0 && !isLoading && (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <MessageSquare className="w-12 h-12 text-white/10 mb-4" />
                <p className="text-sm text-muted-foreground font-medium">
                  Welcome to Twende Live Support. Ask us anything about your project or system health.
                </p>
              </div>
            )}
            
            {messages.map((msg, idx) => (
              <div 
                key={msg.id || idx} 
                className={`flex ${msg.senderId === user.uid ? "justify-end" : "justify-start"}`}
              >
                <div className={`
                  max-w-[80%] p-3 rounded-2xl text-sm font-medium
                  ${msg.senderId === user.uid 
                    ? "bg-primary text-white rounded-tr-none" 
                    : "bg-white/10 text-white rounded-tl-none border border-white/5"}
                `}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </CardContent>

          <CardFooter className="p-4 border-t border-white/10">
            <form onSubmit={handleSend} className="flex w-full gap-2">
              <Input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-primary/50"
              />
              <Button type="submit" size="icon" className="h-12 w-12 rounded-xl bg-primary hover:scale-105 transition-transform shrink-0">
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-2xl shadow-2xl bg-primary hover:scale-110 transition-all duration-300 group overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <MessageSquare className="w-8 h-8 text-white relative z-10" />
          <span className="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-primary group-hover:scale-125 transition-transform" />
        </Button>
      )}
    </div>
  );
}
