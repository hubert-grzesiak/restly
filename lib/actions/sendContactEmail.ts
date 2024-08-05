"use server";
import { ContactFormProps } from "@/app/(info)/contact/ContactForm";
import { sendContactEmail } from "@/lib/mail";

export async function sendContactEmailAction(data: ContactFormProps) {
  try {
    sendContactEmail(data);
  } catch (error) {
    console.error("Error sending message", error);
    throw error;
  }
}
