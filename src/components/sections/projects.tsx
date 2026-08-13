import { getProjects } from "@/lib/data";
import { ProjectsClient } from "./projects-client";

export async function Projects() {
  const projects = await getProjects();
  return <ProjectsClient projects={projects} />;
}
