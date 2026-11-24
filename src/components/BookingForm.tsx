import React, { useState } from 'react';
import { SITE_CONFIG, SERVICES, BRIDAL_PACKAGES } from '../config/site';
import { Calendar, Clock, User, Phone, Sparkles, MessageCircle, Send } from 'lucide-react';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'HD Bridal Makeup',
    date: '',
    time: 'Morning (9:00 AM – 12:00 PM)',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const allServices = [
    { group: 'Signature Bridal Packages', items: BRIDAL_PACKAGES.map(p => p.name) },
    { group: 'Bridal Studio & Ceremonial', items: (SERVICES.bridal || []).map(s => s.name) },
    { group: 'Hair Care, Biotin & Treatments', items: (SERVICES['hair-treatments'] || []).map(s => s.name) },
    { group: 'Hair Colouring & Balayage', items: (SERVICES['hair-colour'] || []).map(s => s.name) },
    { group: 'Skin Care & Facials', items: (SERVICES.skin || []).map(s => s.name) },
    { group: 'Korean Beauty & Spa', items: (SERVICES['korean-spa'] || []).map(s => s.name) },
    { group: 'Nail Lounge & Art', items: (SERVICES.nails || []).map(s => s.name) },
    { group: 'Brows, Lashes & Semi-Permanent', items: (SERVICES['eyes-brows'] || []).map(s => s.name) },
    { group: 'Waxing & Body Care', items: (SERVICES['waxing-body'] || []).map(s => s.name) },
    { group: 'Hair Extensions', items: (SERVICES.extensions || []).map(s => s.name) }
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your full name';
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.date) {
      errs.date = 'Please select a preferred date';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    let message = `*Appointment Booking Request — Angels Beauty Parlour*\n\n`;
    message += `👤 *Name:* ${formData.name.trim()}\n`;
    message += `📞 *Phone:* ${formData.phone.trim()}\n`;
    message += `✨ *Requested Service:* ${formData.service}\n`;
    message += `📅 *Preferred Date:* ${formData.date}\n`;
    message += `⏰ *Time Slot:* ${formData.time}\n`;
    if (formData.message.trim()) {
      message += `📝 *Notes/Ceremony Details:* ${formData.message.trim()}\n`;
    }
    message += `\n_Submitted via Angels Beauty Parlour Website_`;

    const waUrl = `${SITE_CONFIG.contact.whatsappUrl}?text=${encodeURIComponent(message)}`;

    setSubmitted(true);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="booking" suppressHydrationWarning className="py-20 sm:py-28 lg:py-32 bg-surface border-y border-gold-border/30 overflow-x-clip">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Form Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-sans font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-gold-deep">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Reservation</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-charcoal tracking-tight">
            Reserve Your Appointment
          </h2>
          <p className="text-muted text-xs sm:text-sm md:text-base font-sans leading-relaxed">
            Choose your desired treatment. Your appointment details will be formatted and sent directly to our front desk on WhatsApp for prompt confirmation.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-canvas rounded-2xl sm:rounded-3xl p-5 sm:p-10 border border-gold-border shadow-md sm:shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

              {/* Name */}
              <div className="space-y-1.5 sm:space-y-2">
                <label htmlFor="booking-name" className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gold-deep" />
                  <span>Full Name *</span>
                </label>
                <input
                  id="booking-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Mary Varghese"
                  className={`w-full px-3.5 sm:px-4 py-3 rounded-xl border text-base font-sans bg-surface text-charcoal focus:outline-none transition-all ${errors.name ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-gold-border focus:border-gold-strong focus:bg-white'
                    }`}
                />
                {errors.name && <p className="text-xs text-red-500 font-sans">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-1.5 sm:space-y-2">
                <label htmlFor="booking-phone" className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gold-deep" />
                  <span>Phone Number (WhatsApp) *</span>
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 98470 00000"
                  className={`w-full px-3.5 sm:px-4 py-3 rounded-xl border text-base font-sans bg-surface text-charcoal focus:outline-none transition-all ${errors.phone ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-gold-border focus:border-gold-strong focus:bg-white'
                    }`}
                />
                {errors.phone && <p className="text-xs text-red-500 font-sans">{errors.phone}</p>}
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">

              {/* Service Selection */}
              <div className="space-y-1.5 sm:space-y-2 sm:col-span-1">
                <label htmlFor="booking-service" className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold-deep" />
                  <span>Select Service *</span>
                </label>
                <select
                  id="booking-service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3 sm:px-4 py-3 rounded-xl border border-gold-border text-base font-sans bg-surface text-charcoal focus:outline-none focus:border-gold-strong focus:bg-white transition-all cursor-pointer"
                >
                  {allServices.map(grp => (
                    <optgroup key={grp.group} label={grp.group}>
                      {grp.items.map(item => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="space-y-1.5 sm:space-y-2">
                <label htmlFor="booking-date" className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gold-deep" />
                  <span>Preferred Date *</span>
                </label>
                <input
                  id="booking-date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={`w-full px-3.5 sm:px-4 py-3 rounded-xl border text-base font-sans bg-surface text-charcoal focus:outline-none transition-all ${errors.date ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-gold-border focus:border-gold-strong focus:bg-white'
                    }`}
                />
                {errors.date && <p className="text-xs text-red-500 font-sans">{errors.date}</p>}
              </div>

              {/* Time Slot */}
              <div className="space-y-1.5 sm:space-y-2">
                <label htmlFor="booking-time" className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gold-deep" />
                  <span>Time Slot</span>
                </label>
                <select
                  id="booking-time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 sm:px-4 py-3 rounded-xl border border-gold-border text-base font-sans bg-surface text-charcoal focus:outline-none focus:border-gold-strong focus:bg-white transition-all cursor-pointer"
                >
                  <option value="Morning (9:00 AM – 12:00 PM)">Morning (9:00 AM – 12:00 PM)</option>
                  <option value="Afternoon (12:00 PM – 4:00 PM)">Afternoon (12:00 PM – 4:00 PM)</option>
                  <option value="Evening (4:00 PM – 8:00 PM)">Evening (4:00 PM – 8:00 PM)</option>
                </select>
              </div>

            </div>

            {/* Optional Message */}
            <div className="space-y-1.5 sm:space-y-2">
              <label htmlFor="booking-message" className="text-xs font-sans font-semibold uppercase tracking-wider text-charcoal flex items-center justify-between">
                <span>Notes / Details (Optional)</span>
                <span className="text-[10px] sm:text-[11px] text-muted normal-case font-normal">Ceremony date, etc.</span>
              </label>
              <textarea
                id="booking-message"
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us any special preferences or wedding venue..."
                className="w-full px-3.5 sm:px-4 py-3 rounded-xl border border-gold-border text-base font-sans bg-surface text-charcoal focus:outline-none focus:border-gold-strong focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Actions (Stacked for mobile, row for desktop) */}
            <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">

              <div className="flex items-center gap-2 text-[11px] sm:text-xs text-muted font-sans order-2 sm:order-1 justify-center sm:justify-start">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                <span>Opens formatted message on WhatsApp</span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 order-1 sm:order-2">
                <a
                  href={SITE_CONFIG.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 rounded-full text-xs font-sans font-semibold uppercase tracking-wider text-charcoal border border-gold-border hover:bg-surface flex items-center justify-center gap-2 transition-colors cursor-pointer text-center"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Direct Chat</span>
                </a>

                <button
                  type="submit"
                  className="py-3.5 px-7 rounded-full text-xs font-sans font-semibold uppercase tracking-wider bg-gold hover:bg-gold-hover text-charcoal shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </button>
              </div>

            </div>

          </form>

          {submitted && (
            <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans flex items-center gap-2">
              <span className="font-semibold">WhatsApp opened!</span> If the app did not open, you can tap "Direct Chat" above.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
