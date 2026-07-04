"use client";
import { useLanguage } from "@/components/providers";

const WHATSAPP_CHAT_URL = "https://wa.me/+919977696796";

export function WhatsApp() {
  const { locale } = useLanguage();
  return (
    <a
      className="whatsapp"
      href={WHATSAPP_CHAT_URL}
      target="_blank"
      rel="noreferrer"
      aria-label={locale === "mr" ? "फिनोपिया सर्व्हिसेसशी व्हॉट्सॲपवर संवाद साधा" : "Chat with Finopia Services on WhatsApp"}
      data-faro-user-action-name="floating.whatsapp"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3a9 9 0 0 0-7.7 13.8L3 21l4.2-1.3A9 9 0 1 0 12 3Zm0 16.2a7.2 7.2 0 0 1-3.6-.95l-.3-.2-2.5.8.8-2.4-.2-.3A7.2 7.2 0 1 1 12 19.2Zm4.1-5.3c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.4.1-.1.2-.5.7-.6.8-.1.1-.2.1-.4 0a5.8 5.8 0 0 1-1.7-1.1 6.2 6.2 0 0 1-1.2-1.5c-.1-.2 0-.3.1-.4l.3-.3c.1-.1.1-.2.2-.3a.3.3 0 0 0 0-.3c0-.1-.4-1-.5-1.3-.1-.3-.2-.3-.4-.3h-.4a.8.8 0 0 0-.6.3 2.4 2.4 0 0 0-.7 1.8c0 .6.2 1.3.5 1.8.3.5.7 1 1.1 1.4.5.4 1 .7 1.5.9.7.2 1.4.2 2.1-.1.5-.2 1-.6 1.4-1 .3-.4.4-.9.4-1.4 0-.2-.1-.3-.2-.4Z" fill="currentColor"/>
      </svg>
    </a>
  );
}
