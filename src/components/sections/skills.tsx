import { getSkillCategories } from "@/lib/data";
import { SkillsClient } from "./skills-client";

export async function Skills() {
  const categories = await getSkillCategories();
  return <SkillsClient categories={categories} />;
}
