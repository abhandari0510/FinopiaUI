"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers";

type FormData = { name: string; phone: string; email: string; interest: string; message?: string; consent: boolean };

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvzjdwbg";
const defaultValues: FormData = { name: "", phone: "", email: "", interest: "", message: "", consent: true };

const formCopy = {
  en: {
    name: "Full name", namePlaceholder: "Your name", phone: "Phone number", email: "Email address", optional: "(optional)", emailPlaceholder: "you@example.com", topic: "What would you like to discuss?", select: "Select a topic", topics: ["Financial literacy program", "Mutual fund distribution", "Insurance solutions", "Book inquiry", "Speaking or workshop", "Something else"], message: "Message", messagePlaceholder: "A little context helps us prepare…", consent: "I consent to being contacted by Finopia Services regarding this inquiry.", submit: "Send inquiry", note: "No spam. No unsolicited recommendations. Your details stay private.", successTitle: "Thank you for reaching out.", successBody: "Your inquiry has been noted. The Finopia team will connect with you shortly.", again: "Send another inquiry", errors: { name: "Please enter your name", phone: "Enter a valid phone number", email: "Enter a valid email", topic: "Please choose a topic", consent: "Please confirm consent" },
  },
  mr: {
    name: "पूर्ण नाव", namePlaceholder: "तुमचे नाव", phone: "मोबाइल क्रमांक", email: "ईमेल पत्ता", optional: "(ऐच्छिक)", emailPlaceholder: "you@example.com", topic: "तुम्हाला कशाबाबत चर्चा करायची आहे?", select: "विषय निवडा", topics: ["आर्थिक साक्षरता कार्यक्रम", "म्युच्युअल फंड वितरण", "विमा उपाय", "पुस्तक चौकशी", "व्याख्यान किंवा कार्यशाळा", "इतर विषय"], message: "संदेश", messagePlaceholder: "थोडी अधिक माहिती दिल्यास आम्हाला तयारी करता येईल…", consent: "या चौकशीसंदर्भात फिनोपिया सर्व्हिसेसने माझ्याशी संपर्क साधण्यास मी संमती देतो/देते.", submit: "चौकशी पाठवा", note: "स्पॅम नाही. अनाहूत शिफारसी नाहीत. तुमची माहिती गोपनीय राहील.", successTitle: "संपर्क साधल्याबद्दल धन्यवाद.", successBody: "तुमची चौकशी नोंदवली आहे. फिनोपिया टीम लवकरच तुमच्याशी संपर्क साधेल.", again: "दुसरी चौकशी पाठवा", errors: { name: "कृपया तुमचे नाव लिहा", phone: "वैध मोबाइल क्रमांक लिहा", email: "वैध ईमेल लिहा", topic: "कृपया विषय निवडा", consent: "कृपया संमती निश्चित करा" },
  },
} as const;

export function ContactForm() {
  const { locale } = useLanguage();
  const copy = formCopy[locale];
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const schema = useMemo(() => z.object({
    name: z.string().min(2, copy.errors.name),
    phone: z.string().min(10, copy.errors.phone),
    email: z.email(copy.errors.email).or(z.literal("")),
    interest: z.string().min(1, copy.errors.topic),
    message: z.string().max(500).optional(),
    consent: z.boolean().refine((value) => value, { message: copy.errors.consent }),
  }), [copy]);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues });
  const onSubmit = async (data: FormData) => {
    setSubmitError(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          message: data.message ?? "",
          _subject: "New inquiry from Finopia website",
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.errors?.[0]?.message ?? "Unable to send your inquiry right now. Please try again.");
      }

      setSent(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to send your inquiry right now. Please try again.");
    }
  };

  const resetForm = () => {
    reset(defaultValues);
    setSent(false);
    setSubmitError(null);
  };

  if (sent) return <div className="form-success"><CheckCircle2 /><h2>{copy.successTitle}</h2><p>{copy.successBody}</p><Button onClick={resetForm} variant="secondary" data-faro-user-action-name="contact.form.send-another">{copy.again}</Button></div>;

  return <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
    <div className="field-row"><label>{copy.name}<input placeholder={copy.namePlaceholder} {...register("name")} /><small>{errors.name?.message}</small></label><label>{copy.phone}<input inputMode="tel" placeholder="+91" {...register("phone")} /><small>{errors.phone?.message}</small></label></div>
    <label>{copy.email} <span>{copy.optional}</span><input type="email" placeholder={copy.emailPlaceholder} {...register("email")} /><small>{errors.email?.message}</small></label>
    <label>{copy.topic}<select {...register("interest")} defaultValue=""><option value="" disabled>{copy.select}</option>{copy.topics.map(topic => <option key={topic}>{topic}</option>)}</select><small>{errors.interest?.message}</small></label>
    <label>{copy.message} <span>{copy.optional}</span><textarea rows={4} placeholder={copy.messagePlaceholder} {...register("message")} /></label>
    <label className="checkbox"><input type="checkbox" {...register("consent")} /><span>{copy.consent}</span></label><small>{errors.consent?.message}</small>
    {submitError ? <small role="alert">{submitError}</small> : null}
    <div className="form-actions">
      <Button type="submit" disabled={isSubmitting} data-faro-user-action-name="contact.form.submit">{isSubmitting ? <Loader2 className="spin" /> : copy.submit}</Button>
      <p className="form-note">{copy.note}</p>
    </div>
  </form>;
}
