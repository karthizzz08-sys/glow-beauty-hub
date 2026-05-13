import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phone = "919876543210";
  const message = encodeURIComponent("Hi Chettiar Connect, I'd like to know more about the platform.");
  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[hsl(142,70%,45%)] text-white flex items-center justify-center shadow-elegant hover:scale-110 transition-transform animate-float"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute inset-0 rounded-full bg-[hsl(142,70%,45%)] animate-ping opacity-20" />
    </a>
  );
};

export default WhatsAppButton;
