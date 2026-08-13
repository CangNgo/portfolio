import { getProfile } from "@/lib/data";
import { ContactClient } from "./contact-client";

export async function Contact() {
  const profile = await getProfile();
  return <ContactClient profile={profile} />;
}
