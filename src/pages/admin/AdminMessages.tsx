import React from 'react';
import { useStore } from '../../context/StoreContext';
import { MessageSquare, Phone, Mail, MessageCircle, Clock } from 'lucide-react';

export const AdminMessages: React.FC = () => {
  const { messages } = useStore();

  const handleWhatsAppReply = (name: string, phone: string) => {
    const cleanDigits = phone.replace(/[^0-9]/g, '');
    const intlPhone = cleanDigits.startsWith('92') ? cleanDigits : `92${cleanDigits.replace(/^0/, '')}`;
    const text = `Salam ${name}! We received your inquiry regarding shoes on our website. How can we help you today?`;
    window.open(`https://wa.me/${intlPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <span className="text-xs uppercase tracking-widest text-[#C9A66B] font-semibold block mb-1">
          Customer Communications
        </span>
        <h1 className="font-playfair text-3xl font-bold text-[#17140F]">
          Contact Inquiries
        </h1>
        <p className="text-xs text-[#6B645B] mt-0.5">
          Messages sent via website contact form. Directly follow up on WhatsApp or phone.
        </p>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-[#EDE6DA] text-xs text-[#6B645B]">
            No messages received yet.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white p-6 rounded-2xl border border-[#EDE6DA] shadow-xs flex flex-col sm:flex-row sm:items-start justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#17140F]">{msg.name}</span>
                  <span className="text-[11px] text-[#C9A66B] font-semibold bg-[#C9A66B]/15 px-2.5 py-0.5 rounded-full">
                    {msg.subject || 'General Inquiry'}
                  </span>
                </div>

                <p className="text-xs text-[#17140F] bg-[#F7F3EC] p-3.5 rounded-xl border border-[#EDE6DA] leading-relaxed">
                  &ldquo;{msg.message}&rdquo;
                </p>

                <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#6B645B] pt-1">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#C9A66B]" />
                    <a href={`tel:${msg.phone}`} className="hover:text-black">
                      {msg.phone}
                    </a>
                  </span>

                  {msg.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-[#C9A66B]" />
                      <a href={`mailto:${msg.email}`} className="hover:text-black">
                        {msg.email}
                      </a>
                    </span>
                  )}

                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#6B645B]" />
                    <span>{new Date(msg.created_at).toLocaleString()}</span>
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex items-center sm:flex-col gap-2 pt-2 sm:pt-0">
                <button
                  onClick={() => handleWhatsAppReply(msg.name, msg.phone)}
                  className="bg-[#138A55] hover:bg-[#0e6940] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Reply on WhatsApp</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
