import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { SectionHeading } from '../components/common/SectionHeading';
import { SEOHead } from '../components/common/SEOHead';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  ChevronDown,
  Instagram,
  Facebook
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, sendMessage } = useStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Size & Fitting Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      await sendMessage({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        subject: subject.trim(),
        message: message.trim()
      });
      setSubmitted(true);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'How do I know my correct shoe size for Pakistani feet?',
      a: 'All our shoes use standard European (EU) sizing from 40 to 45. Pakistani feet are frequently slightly wider than European averages, so our master cobblers craft lasts with generous toe boxes. If you are normally size 42 in local dress shoes, order EU 42. You can also send your foot measurement in centimeters to our WhatsApp team for personalized guidance.'
    },
    {
      q: 'How does Cash on Delivery (COD) work?',
      a: 'You do not pay anything online when ordering. Our courier partner (TCS, Leopards, or CallCourier) will bring your parcel to your address. You simply hand cash to the delivery rider upon receiving your package.'
    },
    {
      q: 'What is your 7-Day Size Exchange policy?',
      a: 'If your shoes arrive and the fit is slightly tight or loose, simply WhatsApp us within 7 days. Ensure the shoes are unworn (only tried on indoor carpet) and in original box. We arrange a doorstep exchange right away.'
    },
    {
      q: 'Is this 100% genuine full-grain leather?',
      a: 'Yes, absolutely. We strictly prohibit synthetic materials, faux leather, or bonded scraps. We use genuine cowhide, full-grain Italian crust, and burnished calfskin that molds to your feet and develops a rich natural patina.'
    },
    {
      q: 'What is the delivery time across Pakistan?',
      a: 'Orders in Lahore are typically delivered within 24 to 48 hours. Orders to Karachi, Islamabad, Rawalpindi, and Faisalabad take 2-3 working days. All other cities across Punjab, Sindh, KPK, and Balochistan take 3-5 working days.'
    }
  ];

  return (
    <div className="bg-[#F7F3EC] min-h-screen py-10 sm:py-16">
      <SEOHead
        title="Contact Us & Store Location"
        description="Visit our Lahore flagship store or contact our footwear team via WhatsApp and phone for sizing and orders."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          kicker="GET IN TOUCH"
          title="Visit Us or Chat on WhatsApp"
          subtitle="Our master shoemakers and customer care team in Lahore are always here to guide you."
        />

        {/* Contact Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <div className="p-6 rounded-2xl bg-white border border-[#EDE6DA] shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#2A1B14] flex items-center justify-center text-[#C9A66B]">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-xs uppercase tracking-wider text-[#C9A66B] font-semibold">
              Phone Support
            </div>
            <a href={`tel:${settings.phone}`} className="text-sm font-bold text-[#17140F] hover:text-[#C9A66B] block">
              {settings.phone}
            </a>
            <div className="text-[11px] text-[#6B645B]">Direct line to Lahore showroom</div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#EDE6DA] shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#138A55]/15 flex items-center justify-center text-[#138A55]">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="text-xs uppercase tracking-wider text-[#138A55] font-semibold">
              WhatsApp Orders
            </div>
            <a
              href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent("Salam, I need assistance with shoe sizing and ordering.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-[#17140F] hover:text-[#138A55] block"
            >
              +{settings.whatsapp}
            </a>
            <div className="text-[11px] text-[#6B645B]">Fastest response (under 15 mins)</div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#EDE6DA] shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#2A1B14] flex items-center justify-center text-[#C9A66B]">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-xs uppercase tracking-wider text-[#C9A66B] font-semibold">
              Store Hours
            </div>
            <div className="text-xs font-semibold text-[#17140F]">
              {settings.opening_hours}
            </div>
            <div className="text-[11px] text-[#6B645B]">Open 7 days a week</div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#EDE6DA] shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#2A1B14] flex items-center justify-center text-[#C9A66B]">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-xs uppercase tracking-wider text-[#C9A66B] font-semibold">
              Lahore Flagship
            </div>
            <div className="text-xs font-semibold text-[#17140F] line-clamp-2">
              {settings.address}
            </div>
            <div className="text-[11px] text-[#6B645B]">Gulberg III, Lahore</div>
          </div>

        </div>

        {/* Form and Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#EDE6DA] shadow-xs">
            <span className="text-xs uppercase tracking-widest text-[#C9A66B] font-semibold block mb-1">
              Send an Inquiry
            </span>
            <h3 className="font-playfair text-2xl font-bold text-[#17140F] mb-4">
              Write to Our Master Cobblers
            </h3>

            {submitted ? (
              <div className="p-6 rounded-xl bg-[#138A55]/10 border border-[#138A55]/30 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-[#138A55] mx-auto" />
                <h4 className="font-playfair text-lg font-bold text-[#17140F]">
                  Message Received!
                </h4>
                <p className="text-xs text-[#6B645B] max-w-sm mx-auto">
                  Shukriya! Our representative will call or WhatsApp you shortly on your provided phone number.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-[#138A55] underline font-semibold"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#17140F]">
                      Your Name <span className="text-[#D1112B]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Asad Mehmood"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-4 py-2.5 text-xs text-[#17140F] focus:outline-none focus:border-[#C9A66B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#17140F]">
                      Mobile / WhatsApp Phone <span className="text-[#D1112B]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 03001234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-4 py-2.5 text-xs text-[#17140F] focus:outline-none focus:border-[#C9A66B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#17140F]">Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="e.g. asad@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-4 py-2.5 text-xs text-[#17140F] focus:outline-none focus:border-[#C9A66B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#17140F]">Inquiry Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-4 py-2.5 text-xs text-[#17140F] focus:outline-none focus:border-[#C9A66B] cursor-pointer"
                    >
                      <option value="Size & Fitting Inquiry">Size &amp; Fitting Inquiry</option>
                      <option value="Order Status Question">Order Status Question</option>
                      <option value="Store Visit Lahore">Store Visit Lahore</option>
                      <option value="Wholesale & Wedding Orders">Wholesale &amp; Wedding Orders</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#17140F]">
                    Your Message <span className="text-[#D1112B]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what style or size question you have..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-4 py-2.5 text-xs text-[#17140F] focus:outline-none focus:border-[#C9A66B]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0B0B0D] hover:bg-[#2A1B14] text-[#F7F3EC] py-3.5 px-6 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#C9A66B]/30 hover:border-[#C9A66B]"
                >
                  <Send className="w-4 h-4 text-[#C9A66B]" />
                  <span>{isSubmitting ? 'Sending Message...' : 'Submit Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Interactive Map & Social Presence */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#EDE6DA] shadow-xs space-y-4">
              <h4 className="font-playfair text-lg font-bold text-[#17140F]">
                Our Location on Map
              </h4>

              {/* Styled Map Container */}
              <div className="aspect-16/10 rounded-xl overflow-hidden bg-[#2A1B14] border border-[#C9A66B]/30 relative flex items-center justify-center text-center p-6 text-[#F7F3EC]">
                <div className="space-y-2 z-10">
                  <div className="w-10 h-10 rounded-full bg-[#C9A66B] text-[#0B0B0D] flex items-center justify-center mx-auto shadow-md">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="font-playfair font-bold text-base text-[#F7F3EC]">
                    {settings.shop_name}
                  </div>
                  <div className="text-xs text-[#EDE6DA]/80 max-w-xs mx-auto">
                    {settings.address}
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(settings.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 bg-[#C9A66B] hover:bg-[#b08e54] text-[#0B0B0D] font-bold text-xs px-4 py-2 rounded-lg transition-colors shadow-sm"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2 border-t border-[#EDE6DA] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#17140F]">Follow our craft:</span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#F7F3EC] text-[#17140F] hover:text-[#C9A66B] transition-colors"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#F7F3EC] text-[#17140F] hover:text-[#C9A66B] transition-colors"
                    title="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B0B0D] text-[#F7F3EC] border border-[#C9A66B]/30 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold">Visiting Lahore this week?</div>
                <div className="text-[11px] text-[#EDE6DA]/70">Stop by for a complimentary leather conditioning session.</div>
              </div>
            </div>
          </div>

        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-2xl border border-[#EDE6DA] p-6 sm:p-10 shadow-xs">
          <SectionHeading
            kicker="HELP &amp; ADVICE"
            title="Frequently Asked Questions"
            subtitle="Answers to common questions regarding shoe sizing, Cash on Delivery, and our 7-day exchange process."
          />

          <div className="max-w-3xl mx-auto divide-y divide-[#EDE6DA] space-y-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className="pt-4 first:pt-0">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left py-2 flex items-center justify-between gap-4 font-playfair font-semibold text-base sm:text-lg text-[#17140F] hover:text-[#C9A66B] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C9A66B] transition-transform duration-200 shrink-0 ${
                      activeFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="pb-3 text-xs sm:text-sm text-[#6B645B] leading-relaxed animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
