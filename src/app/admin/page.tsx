"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  content: string;
  image?: string; // base64 data URL for display
  appliedChanges?: boolean;
  isError?: boolean;
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your Bestax page assistant. Tell me what you'd like to change on the landing page and I'll update it live.\n\nFor example:\n• \"Change the headline to...\"\n• \"Update the first FAQ answer to...\"\n• \"Add a new FAQ: What is...\"\n• \"Change the $427K banner subtitle to...\"\n• Attach a screenshot and say \"make it look like this\"",
    },
  ]);
  const [input, setInput] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [attachedPreview, setAttachedPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAttachedFile(file);
    const reader = new FileReader();
    reader.onload = () => setAttachedPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function removeAttachment() {
    setAttachedFile(null);
    setAttachedPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function sendMessage() {
    const text = input.trim();
    if ((!text && !attachedFile) || loading) return;

    const userMessage: Message = {
      role: "user",
      content: text || "Here is an image for reference.",
      image: attachedPreview ?? undefined,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    const fileToSend = attachedFile;
    const previewToSend = attachedPreview;
    setAttachedFile(null);
    setAttachedPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setLoading(true);

    try {
      // Build API message history (text only for history, file goes as multipart)
      const apiMessages = newMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      let res: Response;

      if (fileToSend) {
        const form = new FormData();
        form.append("messages", JSON.stringify(apiMessages));
        form.append("file", fileToSend);
        res = await fetch("/api/admin/chat", { method: "POST", body: form });
      } else {
        res = await fetch("/api/admin/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: apiMessages }),
        });
      }

      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }

      const data = await res.json();

      if (!res.ok || data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.error || "Something went wrong. Please try again.", isError: true },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "Done!",
          appliedChanges: !!data.appliedChanges,
        },
      ]);

      // Show attached image in the chat alongside the sent message
      if (previewToSend) {
        // already shown in userMessage above
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Network error: ${err instanceof Error ? err.message : "Please try again."}`, isError: true },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Image src="/assets/Logo/bestax-canada-logo without background.png" alt="Bestax" width={100} height={36} className="h-9 w-auto" />
          <span className="text-white/30 text-sm hidden sm:block">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Page
          </a>
          <button onClick={handleLogout} className="text-white/50 hover:text-white text-sm transition-colors">
            Sign Out
          </button>
        </div>
      </header>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-[#E84319] flex items-center justify-center shrink-0 mr-3 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm-1 13.5v-7l5 3.5-5 3.5z" />
                  </svg>
                </div>
              )}

              <div className={`max-w-[80%] space-y-2`}>
                {/* Image preview in user bubble */}
                {msg.image && (
                  <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={msg.image} alt="attachment" className="max-w-[240px] rounded-xl border border-white/20" />
                  </div>
                )}

                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-[#E84319] text-white rounded-tr-sm"
                      : msg.isError
                      ? "bg-red-900/40 border border-red-500/30 text-red-300 rounded-tl-sm"
                      : "bg-white/10 text-white/90 rounded-tl-sm"
                  }`}
                >
                  {msg.content}
                  {msg.appliedChanges && (
                    <div className="mt-2 flex items-center gap-1.5 text-green-400 text-xs font-medium">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Changes applied to live page
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full bg-[#E84319] flex items-center justify-center shrink-0 mr-3 mt-1">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm-1 13.5v-7l5 3.5-5 3.5z" />
                </svg>
              </div>
              <div className="bg-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1 items-center h-5">
                  <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-white/10 px-4 py-4 shrink-0">
        <div className="max-w-3xl mx-auto">

          {/* Attachment preview */}
          {attachedPreview && (
            <div className="mb-3 flex items-start gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={attachedPreview} alt="attachment preview" className="h-16 w-auto rounded-lg border border-white/20 object-cover" />
              <button
                onClick={removeAttachment}
                className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-xs transition-colors"
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex gap-2 items-end bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus-within:border-[#E84319]/50 transition-colors">
            {/* Attachment button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="shrink-0 w-8 h-8 rounded-lg hover:bg-white/10 text-white/40 hover:text-white/70 flex items-center justify-center transition-colors mb-0.5"
              title="Attach image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Text input */}
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me to change anything on the page..."
              rows={1}
              className="flex-1 bg-transparent text-white placeholder-white/30 text-sm resize-none focus:outline-none max-h-32 leading-relaxed"
              style={{ minHeight: "24px" }}
            />

            {/* Send button */}
            <button
              onClick={sendMessage}
              disabled={(!input.trim() && !attachedFile) || loading}
              className="shrink-0 w-9 h-9 rounded-xl bg-[#E84319] hover:bg-[#d03a15] disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <p className="text-white/20 text-xs text-center mt-2">
            Enter to send · Shift+Enter for new line · 📎 attach screenshots
          </p>
        </div>
      </div>
    </div>
  );
}
