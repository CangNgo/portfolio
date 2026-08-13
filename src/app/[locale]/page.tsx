import { getProfile } from "@/lib/data";
import { ModalProvider } from "@/components/modal-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";
import { CaseStudyModal } from "@/components/case-study-modal";
import { BlogReaderModal } from "@/components/blog-reader-modal";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale as Locale;
  const profile = await getProfile();
  return {
    title: `${profile.name} · ${profile.role}`,
    description: profile.bio[lang],
  };
}

export default async function HomePage() {
  const profile = await getProfile();

  return (
    <ModalProvider>
      <Navbar resumeUrl={profile.resumeUrl} />
      <main className="flex-1">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <CaseStudyModal />
      <BlogReaderModal authorName={profile.name} />
    </ModalProvider>
  );
}
