import React, { useState } from 'react';
import { PageId } from '../Navbar';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  HelpCircle,
  Building2,
  GraduationCap
} from 'lucide-react';

interface ContactUsPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactUsPage: React.FC<ContactUsPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('School Principal / Administrator');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
    }
  };

  const faqs = [
    {
      q: 'How is the 14-Day Student Development Program scheduled in schools?',
      a: 'The program is delivered in 14 daily sessions of 60 to 90 minutes. Schools can opt for morning slots, zero-period activity hours, or after-school modules so that academic classes are never disrupted.'
    },
    {
      q: 'Are your mentors and trainers certified?',
      a: 'Yes. Every HYPER LEARNX trainer undergoes rigorous pedagogical vetting, child safety (POSH) background verification, and specialized training in activity-based facilitation.'
    },
    {
      q: 'What are the criteria for a student to receive the official certificate?',
      a: 'Students must maintain at least 80% attendance across the 14 days and present their Capstone Life Skills Portfolio on Day 14. Performance is scored by mentors on a rubric scale.'
    },
    {
      q: 'Can individual students enroll if their school hasn’t registered yet?',
      a: 'Yes! Individual school students can register for our interactive online cohort batches or weekend physical masterclasses via our Student Registration page.'
    },
    {
      q: 'How can parents track student progress and verify credentials?',
      a: 'Parents can log in to the Student Portal anytime using the student’s unique Student ID or phone number to check attendance and view certified assessment results.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-wider font-semibold text-indigo-700 font-mono">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Contact HYPER LEARNX
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Have questions about bringing the 14-Day Student Development Program to your school, or enrolling an individual student? Our academic partnership team is here to assist.
          </p>
        </div>

        {/* Contact Form & Contact Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you, {name}. A member of our school partnership team will contact you at {email} within 24 business hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-base font-bold text-slate-900 font-display mb-2">
                  Send Us an Inquiry
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dr. Ramesh Gupta"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contact@school.edu"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98000 00000"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      I am a:
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    >
                      <option value="School Principal / Administrator">School Principal / Administrator</option>
                      <option value="School Teacher / Counselor">School Teacher / Counselor</option>
                      <option value="Parent / Guardian">Parent / Guardian</option>
                      <option value="Student">Student (Grade 5 - 12)</option>
                      <option value="Education Partner / NGO">Education Partner / NGO</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Message or Query <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your school, approximate batch size, or preferred training dates..."
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Contact Info & Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold font-display">
                Headquarters & Contact Points
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-200">Registered Office:</strong>
                    <span className="text-slate-400">
                      HYPER LEARNX Technologies Pvt Ltd<br />
                      Innovation Tower, 4th Floor, Bellandur, Outer Ring Road,<br />
                      Bengaluru, Karnataka 560103, India
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-200">Telephone Lines:</strong>
                    <span className="text-slate-400 font-mono">
                      +91 (080) 4120-7799 (Office)<br />
                      +91 98860 14140 (School Partnerships Desk)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-200">Official Inquiries:</strong>
                    <span className="text-slate-400">
                      partnerships@hyperlearnx.com<br />
                      support@hyperlearnx.com
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-200">Operating Hours:</strong>
                    <span className="text-slate-400">
                      Monday to Saturday: 9:00 AM – 6:30 PM IST
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Registration Shortcut */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-900 font-mono">
                Direct Registration Links
              </h4>
              <p className="text-xs text-slate-500">
                Skip the inquiry form and register students or schools directly:
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => onNavigate('school-register')}
                  className="flex-1 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Register School
                </button>
                <button
                  onClick={() => onNavigate('student-register')}
                  className="flex-1 py-2 text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Register Student
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            {faqs.map((faq, i) => (
              <div key={i} className="py-4 space-y-1.5">
                <h4 className="text-sm font-bold text-slate-900">{faq.q}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
