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
  setDoc,
  getDocs
} from "firebase/firestore";
import { sendChatNotification } from "@/services/email";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, 
  Send, 
  Search, 
  ShieldCheck, 
  Clock, 
  Loader2,
  Circle
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function AdminChat() {
  const [chats, setChats] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch all active chats
  useEffect(() => {
    const q = query(collection(db, "chats"), orderBy("updatedAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setChats(chatList);
    });
    return () => unsubscribe();
  }, []);

  // Fetch messages for selected chat
  useEffect(() => {
    if (!selectedChat) return;

    const q = query(
      collection(db, "chats", selectedChat.id, "messages"),
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
  }, [selectedChat]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user || !selectedChat) return;

    const msg = message;
    setMessage("");

    try {
      await addDoc(collection(db, "chats", selectedChat.id, "messages"), {
        text: msg,
        senderId: user.uid,
        senderEmail: user.email,
        senderRole: "admin",
        createdAt: serverTimestamp()
      });

      await setDoc(doc(db, "chats", selectedChat.id), {
        lastMessage: msg,
        updatedAt: serverTimestamp()
      }, { merge: true });

      // Notify Client via Email
      await sendChatNotification(
        selectedChat.clientEmail.split('@')[0],
        selectedChat.clientEmail,
        msg
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex gap-6 animate-slide-up">
      {/* Chat List */}
      <Card className="w-80 glass-card border-white/10 flex flex-col rounded-[2rem] overflow-hidden">
        <CardHeader className="p-6 border-b border-white/10">
          <CardTitle className="text-xl font-black flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" /> Active Chats
          </CardTitle>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search clients..." className="pl-10 h-10 bg-white/5 border-white/10 rounded-xl" />
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-2 custom-scrollbar">
          <div className="space-y-1">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`
                  w-full p-4 rounded-2xl flex items-center gap-4 transition-all
                  ${selectedChat?.id === chat.id 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "hover:bg-white/5 text-muted-foreground hover:text-white"}
                `}
              >
                <Avatar className="h-10 w-10 border border-white/10 shrink-0">
                  <AvatarFallback className={selectedChat?.id === chat.id ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}>
                    {chat.clientEmail?.[0].toUpperCase() || "C"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left min-w-0">
                  <p className="text-sm font-bold truncate">{chat.clientEmail?.split('@')[0]}</p>
                  <p className={`text-[10px] truncate ${selectedChat?.id === chat.id ? "text-white/70" : "text-muted-foreground"}`}>
                    {chat.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Window */}
      <Card className="flex-1 glass-card border-white/10 flex flex-col rounded-[2rem] overflow-hidden">
        {selectedChat ? (
          <>
            <CardHeader className="p-6 border-b border-white/10 flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border border-white/10">
                  <AvatarFallback className="bg-primary/10 text-primary font-black">
                    {selectedChat.clientEmail?.[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl font-black">{selectedChat.clientEmail}</CardTitle>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                    <Circle className="w-2 h-2 fill-green-500 text-green-500" /> Online · Session ID: {selectedChat.id.slice(0, 8)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="rounded-xl border-white/10">Archive</Button>
                <Button variant="hero" className="rounded-xl">View Profile</Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-8 space-y-6 bg-black/10 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div 
                  key={msg.id || idx} 
                  className={`flex ${msg.senderRole === 'admin' ? "justify-end" : "justify-start"}`}
                >
                  <div className={`
                    max-w-[70%] p-4 rounded-3xl text-sm font-medium leading-relaxed
                    ${msg.senderRole === 'admin' 
                      ? "bg-primary text-white rounded-tr-none shadow-xl shadow-primary/20" 
                      : "bg-white/5 text-white rounded-tl-none border border-white/5"}
                  `}>
                    {msg.text}
                    <div className={`text-[10px] mt-2 flex items-center gap-1 ${msg.senderRole === 'admin' ? "text-white/60" : "text-muted-foreground"}`}>
                      <Clock className="w-3 h-3" /> {msg.createdAt ? new Date(msg.createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now"}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={scrollRef} />
            </CardContent>
            <CardFooter className="p-6 border-t border-white/10">
              <form onSubmit={handleSend} className="flex w-full gap-4">
                <Input 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a response to the client..."
                  className="bg-white/5 border-white/10 h-14 rounded-2xl text-lg px-6"
                />
                <Button type="submit" className="h-14 w-14 rounded-2xl bg-primary hover:scale-105 transition-transform shrink-0">
                  <Send className="w-6 h-6" />
                </Button>
              </form>
            </CardFooter>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
            <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center mb-6">
              <MessageSquare className="w-12 h-12 text-primary/40" />
            </div>
            <h3 className="text-3xl font-black mb-2">Select a Conversation</h3>
            <p className="text-muted-foreground max-w-md">
              Choose a client from the list to view the chat history and provide engineering support in real-time.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
