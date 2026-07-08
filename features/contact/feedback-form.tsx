"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers";

type FormData = { name?: string; phone?: string; email?: string; message: string };

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mrewjdrn";
const defaultValues: FormData = { name: "", phone: "", email: "", message: "" };

const formCopy = {
  en: {
    name: "Your name",
    phone: "Phone number",
    email: "Email address",
    optional: "(optional)",
    message: "Your feedback",
    messagePlaceholder: "Share what stood out, what could be improved, or any other comments…",
    submit: "Submit feedback",
    note: "You can leave the contact fields blank if you prefer to stay anonymous.",
    successTitle: "Thanks for sharing your feedback.",
    successBody: "Your message has been sent. We appreciate you taking the time to help us improve.",
    again: "Send another feedback",
    errors: {
      email: "Enter a valid email address",
      message: "Please share your feedback",
    },
  },
  mr: {
    name: "तुमचे नाव",
    phone: "मोबाइल क्रमांक",
    email: "ईमेल पत्ता",
    optional: "(ऐच्छिक)",
    message: "तुमचे प्रतिसाद",
    messagePlaceholder: "काय छान वाटले, काय सुधारता येईल किंवा इतर कोणतीही प्रतिक्रिया सांगा…",
    submit: "प्रतिसाद पाठवा",
    note: "तुम्हाला अनामिक राहायचे असेल तर संपर्काच्या जागा रिकाम्या सोडू शकता.",
    successTitle: "तुमच्या प्रतिसादाबद्दल धन्यवाद.",
    successBody: "तुमचा संदेश पाठवला गेला आहे. आमच्या सुधारणा प्रक्रियेस मदत केल्याबद्दल आम्ही तुमचे आभार मानतो.",
    again: "दुसरा प्रतिसाद पाठवा",
    errors: {
      email: "वैध ईमेल पत्ता लिहा",
      message: "कृपया तुमचा प्रतिसाद सांगा",
    },
  },
} as const;

export function FeedbackForm() {
  const { locale } = useLanguage();
  const copy = formCopy[locale];
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().max(80).optional().or(z.literal("")),
        phone: z.string().max(20).optional().or(z.literal("")),
        email: z.union([z.string().trim().email(copy.errors.email), z.literal("")]).optional(),
        message: z.string().trim().min(1, copy.errors.message),
      }),
    [copy]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues });

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
          name: data.name?.trim() ?? "",
          phone: data.phone?.trim() ?? "",
          email: data.email?.trim() ?? "",
          message: data.message?.trim() ?? "",
          _subject: "New feedback from Finopia website",
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.errors?.[0]?.message ?? "Unable to send your feedback right now. Please try again.");
      }

      setSent(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to send your feedback right now. Please try again.");
    }
  };

  const resetForm = () => {
    reset(defaultValues);
    setSent(false);
    setSubmitError(null);
  };

  if (sent) {
    return (
      <div className="form-success">
        <CheckCircle2 />
        <h2>{copy.successTitle}</h2>
        <p>{copy.successBody}</p>
        <Button onClick={resetForm} variant="secondary" data-faro-user-action-name="feedback.form.send-another">
          {copy.again}
        </Button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="field-row">
        <label>
          {copy.name}
          <span>{copy.optional}</span>
          <input placeholder={copy.name} {...register("name")} />
          <small>{errors.name?.message}</small>
        </label>
        <label>
          {copy.phone}
          <span>{copy.optional}</span>
          <input inputMode="tel" placeholder="+91" {...register("phone")} />
          <small>{errors.phone?.message}</small>
        </label>
      </div>
      <label>
        {copy.email}
        <span>{copy.optional}</span>
        <input type="email" placeholder={copy.email} {...register("email")} />
        <small>{errors.email?.message}</small>
      </label>
      <label>
        {copy.message}
        <textarea rows={5} placeholder={copy.messagePlaceholder} {...register("message")} />
        <small>{errors.message?.message}</small>
      </label>
      {submitError ? <small role="alert">{submitError}</small> : null}
      <div className="form-actions">
        <Button type="submit" disabled={isSubmitting} data-faro-user-action-name="feedback.form.submit">
          {isSubmitting ? <Loader2 className="spin" /> : copy.submit}
        </Button>
        <p className="form-note">{copy.note}</p>
      </div>
    </form>
  );
}
