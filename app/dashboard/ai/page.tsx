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

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  attachment?: {
    type: "image" | "pdf" | "link";
    url: string;
    name: string;
  };
};

const simulateAnalysis = (type: "image" | "pdf" | "link", name: string) => {
  const analyses = {
    image: `I've analyzed the image "${name}". It appears to show [simulated image analysis]. The main elements I can identify are [key elements]. Would you like me to explain any specific aspect of the image?`,
    pdf: `I've reviewed the PDF document "${name}". The document appears to be about [simulated content analysis]. The main topics covered are [key topics]. What specific information would you like to know about this document?`,
    link: `I've analyzed the content from the link. The page discusses [simulated link analysis]. Key points include [main points]. Would you like me to summarize any particular aspect?`,
  };

  return analyses[type];
};

export default function AiChat() {
  const [message, setMessage] = useState("");
  const [suggestions, setSuggestions] = useState(suggestionQuestions);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI research assistant. How can I help you today?",
      sender: "bot",
    },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkInput, setLinkInput] = useState("");
  const linkInputRef = useRef<HTMLInputElement>(null);

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
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "This is a simulated response to your question. In a real implementation, this would be replaced with an actual API response.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fakeUrl = URL.createObjectURL(file);
    const fileType = file.type.startsWith("image/") ? "image" : "pdf";

    // Add user message with attachment
    const userMessage: Message = {
      id: Date.now().toString(),
      content: `Uploaded ${file.name}`,
      sender: "user",
      attachment: {
        type: fileType,
        url: fakeUrl,
        name: file.name,
      },
    };
    setMessages((prev) => [...prev, userMessage]);
    setShowAttachMenu(false);
    setIsLoading(true);

    // Simulate AI analysis
    setTimeout(() => {
      const analysisMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: simulateAnalysis(fileType, file.name),
        sender: "bot",
      };
      setMessages((prev) => [...prev, analysisMessage]);
      setIsLoading(false);
    }, 3000);
  };

  const handleLinkAttach = () => {
    setIsLinkDialogOpen(true);
    setShowAttachMenu(false);
    // Focus the input when dialog opens
    setTimeout(() => linkInputRef.current?.focus(), 100);
  };

  const handleLinkSubmit = () => {
    if (!linkInput.trim()) return;

    // Add user message with link
    const userMessage: Message = {
      id: Date.now().toString(),
      content: `Shared link: ${linkInput}`,
      sender: "user",
      attachment: {
        type: "link",
        url: linkInput,
        name: linkInput,
      },
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLinkDialogOpen(false);
    setLinkInput("");
    setIsLoading(true);

    // Simulate AI analysis
    setTimeout(() => {
      const analysisMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: simulateAnalysis("link", linkInput),
        sender: "bot",
      };
      setMessages((prev) => [...prev, analysisMessage]);
      setIsLoading(false);
    }, 3000);
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
