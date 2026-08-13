import { getExperiences } from "@/lib/data";
import { ExperienceClient } from "./experience-client";

export async function Experience() {
  const experiences = await getExperiences();
  return <ExperienceClient experiences={experiences} />;
}
