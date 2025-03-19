"use client";
import {
  Bot,
  Send,
  X,
  User,
  Paperclip,
  Image,
  FileText,
  Link as LinkIcon,
} from "lucide-react";
import { useState, useEffect, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { generateResponse, analyzeFile } from "@/app/lib/gemini";
import { useAuth } from "@/app/context/AuthContext";
import { saveChatMessage, getChatHistory, ChatMessage } from "@/app/lib/chat";

const suggestionQuestions = [
  "What are the latest developments in AI?",
  "How does quantum computing work?",
  "Explain machine learning in simple terms",
  "What is the future of renewable energy?",
];

function LoadingDots() {
  return (
    <div className="flex items-center gap-1 px-2">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 animate-pulse"
          style={{
            animationDelay: `${i * 150}ms`,
          }}
        />
      ))}
    </div>
  );
}

export default function AiChat() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [suggestions, setSuggestions] = useState(suggestionQuestions);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkInput, setLinkInput] = useState("");
  const linkInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history
  useEffect(() => {
    const loadChatHistory = async () => {
      if (user) {
        const history = await getChatHistory(user.id);
        if (history.length > 0) {
          setMessages(history);
        } else {
          // Set welcome message if no history
          setMessages([{
            id: "welcome",
            content: "Hello! I'm your AI research assistant. How can I help you today?",
            sender: "bot",
            created_at: new Date().toISOString()
          }]);
        }
        setHistoryLoaded(true);
      }
    };

    if (user && !historyLoaded) {
      loadChatHistory();
    }
  }, [user, historyLoaded]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSuggestionClick = (question: string) => {
    setMessage(question);
    setSuggestions([]); // Clear suggestions after selection
  };

  // Show suggestions when input is empty
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessage(value);
    setSuggestions(value === "" ? suggestionQuestions : []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      created_at: new Date().toISOString()
    };
    setMessages((prev) => [...prev, userMessage]);
    
    // Save user message to database
    await saveChatMessage(user.id, message, true);
    
    setMessage("");
    setIsLoading(true);

    try {
      // Get response from Gemini API
      const response = await generateResponse(message, user.id);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "bot",
        created_at: new Date().toISOString()
      };
      setMessages((prev) => [...prev, botMessage]);
      
      // Save bot message to database
      await saveChatMessage(user.id, response, false);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error while processing your request.",
        sender: "bot",
        created_at: new Date().toISOString()
      };
      setMessages((prev) => [...prev, errorMessage]);
      
      // Save error message to database
      await saveChatMessage(user.id, errorMessage.content, false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAttachClick = () => {
    setShowAttachMenu(!showAttachMenu);
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
    setShowAttachMenu(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const fakeUrl = URL.createObjectURL(file);
    const fileType = file.type.startsWith("image/") ? "image" : "pdf";

    // Add user message with attachment
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: `Uploaded ${file.name}`,
      sender: "user",
      created_at: new Date().toISOString(),
      attachment: {
        type: fileType,
        url: fakeUrl,
        name: file.name,
      },
    };
    setMessages((prev) => [...prev, userMessage]);
    
    // Save user message to database
    await saveChatMessage(user.id, `Uploaded ${file.name}`, true, {
      type: fileType,
      url: fakeUrl,
      name: file.name,
    });
    
    setShowAttachMenu(false);
    setIsLoading(true);

    try {
      // Read file content
      const fileContent = await readFileAsText(file);
      
      // Use Gemini to analyze the file
      const analysis = await analyzeFile(fileContent, file.name, fileType, user.id);
      
      const analysisMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: analysis,
        sender: "bot",
        created_at: new Date().toISOString()
      };
      setMessages((prev) => [...prev, analysisMessage]);
      
      // Save bot message to database
      await saveChatMessage(user.id, analysis, false);
    } catch (error) {
      console.error("Error analyzing file:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error while analyzing your file.",
        sender: "bot",
        created_at: new Date().toISOString()
      };
      setMessages((prev) => [...prev, errorMessage]);
      
      // Save error message to database
      await saveChatMessage(user.id, errorMessage.content, false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkAttach = () => {
    setIsLinkDialogOpen(true);
    setShowAttachMenu(false);
    // Focus the input when dialog opens
    setTimeout(() => linkInputRef.current?.focus(), 100);
  };

  const handleLinkSubmit = async () => {
    if (!linkInput.trim() || !user) return;

    // Add user message with link
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: `Shared link: ${linkInput}`,
      sender: "user",
      created_at: new Date().toISOString(),
      attachment: {
        type: "link",
        url: linkInput,
        name: linkInput,
      },
    };
    setMessages((prev) => [...prev, userMessage]);
    
    // Save user message to database
    await saveChatMessage(user.id, `Shared link: ${linkInput}`, true, {
      type: "link",
      url: linkInput,
      name: linkInput,
    });
    
    setIsLinkDialogOpen(false);
    setLinkInput("");
    setIsLoading(true);

    try {
      // Use Gemini to analyze the link
      const analysis = await generateResponse(`Analyze this link: ${linkInput}`, user.id);
      
      const analysisMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: analysis,
        sender: "bot",
        created_at: new Date().toISOString()
      };
      setMessages((prev) => [...prev, analysisMessage]);
      
      // Save bot message to database
      await saveChatMessage(user.id, analysis, false);
    } catch (error) {
      console.error("Error analyzing link:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error while analyzing the link.",
        sender: "bot",
        created_at: new Date().toISOString()
      };
      setMessages((prev) => [...prev, errorMessage]);
      
      // Save error message to database
      await saveChatMessage(user.id, errorMessage.content, false);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to read file content
  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result as string);
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.onerror = () => reject(reader.error);
      
      if (file.type.startsWith("image/")) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    });
  };

  return (
    <>
      <div className="h-[calc(100vh-9rem)] flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            AI Research Assistant
          </h1>
          <p className="text-gray-600">
            Ask any question and get instant answers
          </p>
        </div>

        {/* Chat Container */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-4 ${
                    msg.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      msg.sender === "user" ? "bg-blue-600" : "bg-blue-100"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div
                    className={`flex-1 ${
                      msg.sender === "user" ? "text-right" : ""
                    }`}
                  >
                    <div
                      className={`inline-block rounded-2xl px-4 py-2.5 ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white rounded-tr-none"
                          : "bg-gray-100 text-gray-600 rounded-tl-none"
                      }`}
                    >
                      <p>{msg.content}</p>
                      {msg.attachment && (
                        <div className="mt-2">
                          {msg.attachment.type === "image" && (
                            <img
                              src={msg.attachment.url}
                              alt={msg.attachment.name}
                              className="max-w-xs rounded-lg"
                            />
                          )}
                          {msg.attachment.type === "pdf" && (
                            <a
                              href={msg.attachment.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-white/90 hover:text-white"
                            >
                              <FileText className="w-4 h-4" />
                              <span className="underline">
                                {msg.attachment.name}
                              </span>
                            </a>
                          )}
                          {msg.attachment.type === "link" && (
                            <a
                              href={msg.attachment.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-white/90 hover:text-white"
                            >
                              <LinkIcon className="w-4 h-4" />
                              <span className="underline">Open Link</span>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                    {msg.sender === "bot" &&
                      msg.id === "1" &&
                      suggestions.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {suggestions.map((question, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(question)}
                              className="group px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-100 transition-colors text-sm text-gray-600 hover:text-blue-600 flex items-center gap-2"
                            >
                              <span>{question}</span>
                              <X className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              ))}

              {/* Loading Message */}
              {isLoading && (
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="inline-block rounded-2xl rounded-tl-none bg-gray-100 px-4 py-2.5">
                      <LoadingDots />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-100">
            <form className="flex gap-4" onSubmit={handleSubmit}>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowAttachMenu(!showAttachMenu)}
                  className="p-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Paperclip className="w-5 h-5" />
                </button>

                {/* Attachment Menu */}
                {showAttachMenu && (
                  <div className="absolute bottom-full mb-2 left-0 bg-white rounded-lg border border-gray-200 shadow-lg p-2 min-w-[160px]">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*,.pdf"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                      <Image className="w-4 h-4" />
                      Upload Image
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                      <FileText className="w-4 h-4" />
                      Upload PDF
                    </button>
                    <button
                      type="button"
                      onClick={handleLinkAttach}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                      <LinkIcon className="w-4 h-4" />
                      Add Link
                    </button>
                  </div>
                )}
              </div>

              <input
                type="text"
                value={message}
                onChange={handleMessageChange}
                placeholder="Type your question..."
                className="flex-1 px-4 py-2.5 rounded-lg border text-black border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Link Dialog */}
      <Transition appear show={isLinkDialogOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsLinkDialogOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900 mb-4"
                  >
                    Add Link
                  </Dialog.Title>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleLinkSubmit();
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label
                        htmlFor="link"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Enter URL
                      </label>
                      <input
                        ref={linkInputRef}
                        type="url"
                        id="link"
                        value={linkInput}
                        onChange={(e) => setLinkInput(e.target.value)}
                        placeholder="https://example.com"
                        className="w-full px-4 py-2.5 rounded-lg border text-gray-600 border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>

                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsLinkDialogOpen(false)}
                        className="px-4 py-2 rounded-lg border text-blue-600 border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!linkInput.trim()}
                      >
                        Add Link
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
