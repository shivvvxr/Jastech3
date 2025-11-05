import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2, Mic, Trash2, Edit2, Check, X } from "lucide-react";
import { useAction, useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  id: string;
  suggestions?: string[]; // Add suggestions field
}

export default function AskAI() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasProcessedPresetRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);
  const terminalY = useTransform(scrollYProgress, [0, 1], [0, 20]);
  
  const sendChatMessage = useAction(api.openai.sendChatMessage);
  const saveMessage = useMutation(api.messageHistory.saveMessage);
  const messageHistory = useQuery(api.messageHistory.getMessageHistory, { limit: 100 });

  // Add: preset messages for all products & services
  const PRESET_MESSAGES: Record<string, string> = {
    // Products
    "High-end Servers": "High-End Servers deliver enterprise-grade performance, redundancy, and scalability. Ideal for critical workloads, virtualization, and data-intensive applications with robust security and uptime.",
    "Racks": "Server Racks provide structured, secure housing for IT infrastructure. They enable airflow, cable management, and scalability for data centers and server rooms.",
    "Switches": "Managed Network Switches offer Layer 2/3 switching, VLANs, and QoS for reliable connectivity. Designed for performance, segmentation, and secure LAN operations.",
    "Desktop/All-in-One": "Business Desktops & AIOs feature optimized specs for office productivity with low maintenance. Streamlined designs, efficient power usage, and enterprise support.",
    "Printers": "Enterprise Printers offer fast, high-quality output with secure printing and fleet management. Optimized for cost control and reliability.",
    "Multifunctional Printers": "MFPs combine print, scan, copy, and fax with centralized management. Ideal for document-heavy environments with strong security and workflows.",
    "CCTVs": "CCTV Systems deliver 24/7 surveillance with IP cameras, NVRs, and remote monitoring. Supports analytics, alerts, and secure storage.",
    "Fencing": "Electric Fencing enhances perimeter security with deterrence and early warning. Integrated with alarms and access systems.",
    "LAN": "LAN Infrastructure builds reliable, high-speed internal networks with structured cabling, switches, and security for seamless operations.",
    "IT Peripherals": "IT Peripherals include monitors, keyboards, UPS, and accessories. Enterprise-grade, compatible, and support-ready.",
    // Services
    "Data Center Setup": "End-to-end Data Center Setup: racks, power, cooling, cabling, DCIM, and HA design. Built for uptime, scalability, and security.",
    "Server Supply & Installation": "Server procurement, configuration, and deployment with RAID, virtualization, and OS hardening for production-ready rollout.",
    "LAN Networking Services": "LAN design, structured cabling, switching, and segmentation with QoS/VLANs for performance and security.",
    "Website Development": "Modern Website Development using responsive UI, SEO, and secure hosting. Tailored to brand and performance goals.",
    "Antivirus Solutions": "Endpoint Security with next-gen antivirus, EDR, and centralized management to prevent and respond to threats.",
    "Netscaler Solutions": "Citrix NetScaler ADC for load balancing, SSL offload, and application delivery with high availability.",
    "Citrix / VMware Solutions": "Virtualization and VDI using Citrix/VMware—optimize resource usage, centralize management, and improve scalability.",
    "Security Solutions": "Comprehensive Security: firewalls, IDS/IPS, access control, and SIEM integrations for layered defense.",
    "CCTV Installation Services": "CCTV deployment: site survey, camera placement, wiring, NVR setup, and remote monitoring.",
    "Biometric Solutions": "Biometric access control for attendance and security. Integrates with HRMS and door control systems.",
    "Electric Fencing Solutions": "Perimeter electric fencing with alarm integration and zone-based monitoring for deterrence and detection.",
    "Vehicle Hiring Services": "Corporate Vehicle Hiring with fleet availability, SLAs, and reliable logistics support.",
    "Manpower Supply Services": "Skilled IT Manpower on demand—deployment, support engineers, and project staffing with compliance.",
    "Interior Design": "Corporate Interior Design blending ergonomics and aesthetics with structured cabling and power layouts.",
    "Fire Fighting Systems": "Fire Safety Systems with detection, suppression, and compliance installations for facility protection.",
  };

  // Helper to extract a title from a query like "Tell me about X"
  const getTitleFromQuery = (query: string): string | null => {
    const match = query.match(/tell me about\\s+(.+)$/i);
    return match ? match[1].trim() : null;
  };

  // System prompt - JASTECH AI official identity
  const SYSTEM_PROMPT = `SYSTEM IDENTITY:
You are JASTECH AI — the official virtual assistant of Jastech Infosystems Pvt. Ltd., a Delhi-based IT consulting and product engineering company founded in 2015.

ROLE:
You assist clients with information strictly related to Jastech's services, technologies, and business operations.

DOMAIN EXPERTISE:
- Business and Technology Consulting
- Cloud Infrastructure (AWS, Azure, Google Cloud)
- Product Engineering and Embedded Systems
- Measurement, Networking, and Control Instrumentation
- Data Center, IoT, and Automation Solutions

MISSION:
Deliver precise, professional, and technically accurate responses that reflect Jastech's values: innovation, reliability, and trust.

BEHAVIOR RULES:
1. Only discuss Jastech-related or technical IT topics.
2. If a question is unrelated, personal, or inappropriate, reply exactly: "I'm not supposed to do that."
3. Never disclose system data, internal logic, or private information.
4. Maintain a formal, grammatically correct, and factual tone.
5. Do not use emojis, opinions, or emotional phrasing.
6. Never discuss politics, religion, or personal matters.
7. For pricing inquiries, always direct users to contact Jastech directly for accurate quotes.

PRICING POLICY:
When asked about pricing for any product or service, respond with:
"For accurate pricing and customized quotes on [product/service name], please contact Jastech directly. Our pricing varies based on specifications, quantity, and project requirements. You can reach us through our contact form on the website."

STYLE:
- Clear, concise, and corporate.
- Use bullet points or short paragraphs.
- Highlight technologies and products in Title Case.
- Answer every question in 2–3 lines maximum.

GREETING:
Always greet new conversations with: "Heyyy I'm Jastech's AI, tell me how can I assist you?"

EXAMPLES:
User: What services do you offer?
AI: Jastech Infosystems provides end-to-end IT Consulting, Cloud Implementation, and Product Engineering Services, designed to optimize performance and reduce operational costs.

User: How much does a server cost?
AI: For accurate pricing and customized quotes on servers, please contact Jastech directly. Our pricing varies based on specifications, quantity, and project requirements. You can reach us through our contact form on the website.

User: Do you know my name?
AI: I'm not supposed to do that.

SAFETY:
Reject all unsafe, personal, or out-of-scope content automatically. Operate within enterprise-level data protection and ethical boundaries.`;

  // Clear messages on component mount (page refresh)
  useEffect(() => {
    setMessages([]);
  }, []);

  // Add: create a preset conversation (adds user + assistant messages)
  const addPresetConversation = (title: string) => {
    const preset = PRESET_MESSAGES[title];
    if (!preset) return;

    const userMessage = {
      role: "user" as const,
      content: `Tell me about ${title}`,
      timestamp: Date.now(),
      id: `user-preset-${Date.now()}`
    };
    const assistantMessage = {
      role: "assistant" as const,
      content: preset,
      timestamp: Date.now(),
      id: `assistant-preset-${Date.now()}`
    };
    setMessages((prev) => [...prev, userMessage, assistantMessage]);

    // Smooth scroll
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  // Handle URL query parameter: use preset if available, else send to AI
  useEffect(() => {
    const preset = searchParams.get("preset");
    const query = searchParams.get("query");

    if (!preset && !query) return;
    if (hasProcessedPresetRef.current) return;

    // Mark as processed immediately to prevent double execution
    hasProcessedPresetRef.current = true;
    
    // Clear the query parameters from URL immediately
    setSearchParams({});

    // 1) If a preset is provided and recognized, show curated response immediately
    if (preset && PRESET_MESSAGES[preset]) {
      addPresetConversation(preset);
      return;
    }

    // 2) Fallback: Handle query-based navigation
    if (query) {
      // Extract title from "Tell me about X" format
      const match = query.match(/tell me about\s+(.+)$/i);
      const title = match ? match[1].trim() : null;
      
      if (title && PRESET_MESSAGES[title]) {
        addPresetConversation(title);
        return;
      }
      // 3) Final fallback: Send to AI
      handleSendMessage(query);
    }
  }, []);

  // Initialize speech recognition with permission handling
  useEffect(() => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleSendMessage(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        
        if (event.error === "not-allowed" || event.error === "permission-denied") {
          toast.error("Microphone access denied. Please enable microphone permissions in your browser settings.");
        } else if (event.error === "no-speech") {
          toast.error("No speech detected. Please try again.");
        } else if (event.error === "audio-capture") {
          toast.error("No microphone found. Please connect a microphone and try again.");
        } else if (event.error === "network") {
          toast.error("Network error. Please check your connection.");
        } else {
          toast.error("Voice recognition failed. Please try again.");
        }
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    } else {
      console.warn("Speech recognition not supported in this browser");
    }
  }, []);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = { 
      role: "user", 
      content: textToSend,
      timestamp: Date.now(),
      id: `user-${Date.now()}`
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Save user message to database
    try {
      await saveMessage({
        role: "user",
        content: textToSend,
        timestamp: userMessage.timestamp,
      });
    } catch (error) {
      console.error("Failed to save user message:", error);
    }

    // Smooth scroll to bottom after user message
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 100);

    try {
      // Map messages to only the fields expected by the Convex validator
      const minimalMessages = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const result = await sendChatMessage({
        messages: minimalMessages,
        systemPrompt: SYSTEM_PROMPT,
      });

      if (result.success && result.response) {
        const assistantMessage: Message = {
          role: "assistant",
          content: result.response,
          timestamp: Date.now(),
          id: `assistant-${Date.now()}`,
          suggestions: result.suggestions || [], // Add suggestions from backend
        };
        setMessages((prev) => [...prev, assistantMessage]);
        
        // Save assistant message to database
        try {
          await saveMessage({
            role: "assistant",
            content: result.response,
            timestamp: assistantMessage.timestamp,
          });
        } catch (error) {
          console.error("Failed to save assistant message:", error);
        }
        
        // Smooth scroll to bottom after assistant message
        setTimeout(() => {
          if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
              top: messagesContainerRef.current.scrollHeight,
              behavior: 'smooth'
            });
          }
        }, 100);
      } else {
        // Handle error
        const errorMessage = result.error || "Failed to get response";
        toast.error("Response Error", {
          description: errorMessage,
          duration: 5000,
        });
        console.error("Response Error:", errorMessage);
      }
    } catch (error: any) {
      console.error("Error sending message:", error);
      
      toast.error("Failed to send message", {
        description: "Please try again or contact support.",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceStart = async () => {
    if (!recognitionRef.current) {
      toast.error("Speech recognition is not supported in your browser.");
      return;
    }

    if (isRecording) return;

    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      setIsRecording(true);
      recognitionRef.current.start();
      toast.info("Listening... Speak now!");
    } catch (error: any) {
      console.error("Microphone permission error:", error);
      
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        toast.error("Microphone access denied. Please enable microphone permissions in your browser settings.");
      } else if (error.name === "NotFoundError") {
        toast.error("No microphone found. Please connect a microphone and try again.");
      } else {
        toast.error("Failed to access microphone. Please try again.");
      }
    }
  };

  const handleVoiceStop = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
  };

  const handleEditMessage = (messageId: string, content: string) => {
    setEditingMessageId(messageId);
    setEditingContent(content);
  };

  const handleSaveEdit = async (messageId: string) => {
    if (!editingContent.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    // Update the message in the local state
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, content: editingContent } : msg
      )
    );

    setEditingMessageId(null);
    setEditingContent("");
    toast.success("Message updated");
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditingContent("");
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-[#e8f4f8] via-[#f0f0f0] to-[#e0f2f7]">
      <Navbar />

      <div className="min-h-screen px-4 sm:px-6 pt-24 sm:pt-28 pb-12 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ y: headerY, opacity: headerOpacity }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E5BA8] mb-2 sm:mb-3">
            Talk to Jastech AI
          </h1>
          <p className="text-base sm:text-lg text-[#1E5BA8]/70 max-w-2xl mx-auto px-4">
            Experience the future of voice interaction with our AI assistant
          </p>
        </motion.div>

        {/* Suggested presets */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="max-w-4xl mx-auto mb-3 px-2 sm:px-0"
          >
          <div className="backdrop-blur-xl bg-white/40 border-2 border-[#1E5BA8]/30 rounded-2xl p-2 sm:p-3 overflow-x-auto">
            <div className="flex gap-1.5 sm:gap-2 min-w-max">
              {Object.keys(PRESET_MESSAGES).map((title) => (
                <button
                  key={title}
                  onClick={() => addPresetConversation(title)}
                  className="whitespace-nowrap text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 rounded-full border border-[#1E5BA8]/40 bg-white/60 hover:bg-white/80 hover:border-[#B8860B] text-[#1E5BA8] transition-colors"
                  title={`Quick info: ${title}`}
                >
                  {title}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Chat Terminal - Full Width */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ y: terminalY }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="w-full backdrop-blur-xl bg-white/40 border-4 border-[#1E5BA8]/40 rounded-3xl shadow-2xl overflow-hidden"
          >
          {/* Terminal Header */}
          <motion.div 
            className="bg-gradient-to-r from-[#1E5BA8] to-[#2E7BC0] px-6 py-3 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex gap-2">
              <motion.div 
                className="w-3 h-3 rounded-full bg-red-400"
                whileHover={{ scale: 1.2 }}
              />
              <motion.div 
                className="w-3 h-3 rounded-full bg-[#B8860B]"
                whileHover={{ scale: 1.2 }}
              />
              <motion.div 
                className="w-3 h-3 rounded-full bg-green-400"
                whileHover={{ scale: 1.2 }}
              />
            </div>
            <span className="ml-4 text-sm font-semibold text-white">Jastech AI Terminal</span>
          </motion.div>

          {/* Messages Area */}
          <div 
            ref={messagesContainerRef}
            className="h-[350px] sm:h-[400px] overflow-y-auto p-3 sm:p-5 space-y-2.5 sm:space-y-3 bg-gradient-to-b from-white/30 to-white/10 scroll-smooth"
            style={{ scrollBehavior: 'smooth' }}
          >
            {messages.length === 0 ? (
              <motion.div 
                className="flex items-center justify-center h-full text-[#0d1b2a]/50"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-lg">Start a conversation or use voice input below</p>
              </motion.div>
            ) : (
              messages.map((message, index) => (
                <div key={message.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.03, duration: 0.3, ease: "easeOut" }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} group`}
                  >
                    <motion.div
                      whileHover={{ 
                        scale: window.innerWidth >= 640 ? 1.02 : 1,
                        boxShadow: message.role === "assistant" 
                          ? "0 12px 40px rgba(106, 208, 255, 0.4)" 
                          : "0 12px 40px rgba(162, 227, 255, 0.5)"
                      }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className={`max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 rounded-2xl relative ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-[#a2e3ff] to-[#6ad0ff] text-[#0d1b2a] shadow-lg border-2 border-[#6ad0ff]/50"
                          : "backdrop-blur-xl bg-white/70 border-2 border-[#b4dcff] text-[#0d1b2a] shadow-md hover:bg-white/80 hover:border-[#6ad0ff] hover:shadow-lg"
                      }`}
                    >
                      {editingMessageId === message.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={editingContent}
                            onChange={(e) => setEditingContent(e.target.value)}
                            className="w-full p-2 rounded-lg border-2 border-[#b4dcff] focus:border-[#1E5BA8] bg-white/90 text-[#0d1b2a] resize-none"
                            rows={3}
                            autoFocus
                          />
                          <div className="flex gap-2 justify-end">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={handleCancelEdit}
                              className="h-8 px-3 hover:bg-white/50"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleSaveEdit(message.id)}
                              className="h-8 px-3 bg-gradient-to-r from-[#1E5BA8] to-[#2E7BC0] hover:from-[#2E7BC0] hover:to-[#1E5BA8]"
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Save
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="prose prose-xs max-w-none prose-headings:text-[#0d1b2a] prose-p:text-[#0d1b2a] prose-p:leading-relaxed prose-a:text-[#1E5BA8] prose-a:underline prose-strong:text-[#0d1b2a] prose-strong:font-bold prose-ul:list-disc prose-ol:list-decimal prose-li:text-[#0d1b2a] prose-code:text-[#1E5BA8] prose-code:bg-[#a2e3ff]/30 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-[#0d1b2a] prose-pre:text-white">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {message.content}
                            </ReactMarkdown>
                          </div>
                          {message.role === "user" && (
                            <div className="absolute -right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEditMessage(message.id, message.content)}
                                className="h-7 w-7 p-0 bg-white/90 hover:bg-white shadow-md rounded-full"
                                title="Edit message"
                              >
                                <Edit2 className="w-3.5 h-3.5 text-[#1E5BA8]" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteMessage(message.id)}
                                className="h-7 w-7 p-0 bg-white/90 hover:bg-white shadow-md rounded-full"
                                title="Delete message"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-red-500" />
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </motion.div>
                  </motion.div>
                  
                  {/* Reply Suggestions - Show after assistant messages */}
                  {message.role === "assistant" && message.suggestions && message.suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="flex gap-2 mt-2 ml-2 flex-wrap"
                    >
                      {message.suggestions.map((suggestion, idx) => (
                        <motion.button
                          key={idx}
                          onClick={() => handleSendMessage(suggestion)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-[#a2e3ff]/80 to-[#6ad0ff]/80 hover:from-[#6ad0ff] hover:to-[#a2e3ff] text-[#0d1b2a] font-medium shadow-md hover:shadow-lg transition-all border border-[#6ad0ff]/50"
                        >
                          {suggestion}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))
            )}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex justify-start"
              >
                <motion.div 
                  className="backdrop-blur-xl bg-white/60 border-2 border-[#1E5BA8]/30 p-4 rounded-2xl shadow-md"
                  animate={{ 
                    boxShadow: [
                      "0 4px 6px rgba(30, 91, 168, 0.1)",
                      "0 8px 12px rgba(30, 91, 168, 0.2)",
                      "0 4px 6px rgba(30, 91, 168, 0.1)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 className="w-5 h-5 text-[#1E5BA8]" />
                    </motion.div>
                    <motion.div
                      className="flex gap-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.span
                        className="w-2 h-2 bg-[#1E5BA8] rounded-full"
                        animate={{ 
                          y: [0, -8, 0],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          duration: 0.8, 
                          repeat: Infinity, 
                          delay: 0,
                          ease: "easeInOut"
                        }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-[#1E5BA8] rounded-full"
                        animate={{ 
                          y: [0, -8, 0],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          duration: 0.8, 
                          repeat: Infinity, 
                          delay: 0.15,
                          ease: "easeInOut"
                        }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-[#1E5BA8] rounded-full"
                        animate={{ 
                          y: [0, -8, 0],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          duration: 0.8, 
                          repeat: Infinity, 
                          delay: 0.3,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

            {/* Input Area */}
            <motion.div 
              className="border-t-4 border-[#6ad0ff] p-2.5 sm:p-3 backdrop-blur-xl bg-gradient-to-r from-white/60 via-white/50 to-white/40 shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex gap-1.5 sm:gap-2 items-center">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    onClick={handleVoiceStart}
                    disabled={isLoading || isRecording}
                    className="bg-gradient-to-br from-[#1E5BA8] via-[#2E7BC0] to-[#1E5BA8] text-white font-semibold hover:from-[#2E7BC0] hover:via-[#1E5BA8] hover:to-[#2E7BC0] transition-all shadow-lg hover:shadow-2xl disabled:opacity-40 disabled:cursor-not-allowed rounded-full p-2 sm:p-2.5 hover:scale-110"
                    title="Voice input"
                  >
                    <Mic className={`w-4 h-4 sm:w-5 sm:h-5 ${isRecording ? 'animate-pulse' : ''}`} />
                  </Button>
                </motion.div>
                <motion.div 
                  className="flex-1"
                  whileFocus={{ scale: 1.01 }}
                >
                  <input
                    type="text"
                    ref={textareaRef as any}
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type your message..."
                    className="w-full backdrop-blur-lg bg-gradient-to-br from-white/85 to-white/70 border-2 border-[#b4dcff] hover:border-[#6ad0ff] focus:border-[#1E5BA8] focus:bg-white transition-all duration-200 rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-[#1E5BA8]/70 shadow-lg hover:shadow-xl focus:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-[#0d1b2a]/40"
                    disabled={isLoading}
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={isLoading || !inputValue.trim()}
                    className="bg-gradient-to-br from-[#1E5BA8] via-[#2E7BC0] to-[#1E5BA8] text-white font-semibold hover:from-[#2E7BC0] hover:via-[#1E5BA8] hover:to-[#2E7BC0] transition-all shadow-lg hover:shadow-2xl disabled:opacity-40 disabled:cursor-not-allowed rounded-full p-2 sm:p-2.5 hover:scale-110"
                  >
                    <motion.div
                      animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 0.6, repeat: isLoading ? Infinity : 0, ease: "linear" }}
                    >
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}