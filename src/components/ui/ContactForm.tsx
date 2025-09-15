'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import Button from './Button';
import GlassContainer from './GlassContainer';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (optional but if provided should be valid)
    if (formData.phone.trim() && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        setErrors({});
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GlassContainer className={cn("rounded-2xl p-8 shadow-xl border border-purple-100/50 bg-gradient-to-br from-white/90 to-purple-50/50", className)}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-black bg-clip-text text-transparent mb-3">Get in Touch</h2>
        <p className="text-gray-600">Tell us about your project and we&apos;ll get back to you within 24 hours.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900",
                errors.name 
                  ? "border-red-300 focus:ring-red-500" 
                  : "border-purple-200 focus:ring-purple-500 hover:border-purple-300"
              )}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900",
                errors.email 
                  ? "border-red-300 focus:ring-red-500" 
                  : "border-purple-200 focus:ring-purple-500 hover:border-purple-300"
              )}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
        </div>

        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number (Optional)"
            value={formData.phone}
            onChange={handleInputChange}
            className={cn(
              "w-full px-4 py-3 rounded-lg border bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900",
              errors.phone 
                ? "border-red-300 focus:ring-red-500" 
                : "border-purple-200 focus:ring-purple-500 hover:border-purple-300"
            )}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>


        <div>
          <textarea
            name="message"
            placeholder="Tell us about your project, goals, and how we can help bring your vision to life..."
            value={formData.message}
            onChange={handleInputChange}
            rows={5}
            className={cn(
              "w-full px-4 py-3 rounded-lg border bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none placeholder:text-gray-400 text-gray-900",
              errors.message 
                ? "border-red-300 focus:ring-red-500" 
                : "border-purple-200 focus:ring-purple-500 hover:border-purple-300"
            )}
          />
          {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
        </div>

        {submitStatus === 'success' && (
          <div className="p-4 rounded-lg bg-green-50 border border-green-200">
            <p className="text-green-800 text-sm">Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200">
            <p className="text-red-800 text-sm">Something went wrong. Please try again or contact us directly.</p>
          </div>
        )}

        <div className="pt-4">
          <Button
            text={isSubmitting ? 'Sending...' : 'Send Message'}
            size="lg"
            className="w-full"
            onClick={() => {}}
          />
        </div>
      </form>
    </GlassContainer>
  );
}
