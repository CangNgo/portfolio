"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Project, BlogPost } from "@/lib/types";

interface ModalContextValue {
  activeProject: Project | null;
  openProject: (project: Project) => void;
  closeProject: () => void;
  activeBlog: BlogPost | null;
  openBlog: (post: BlogPost) => void;
  closeBlog: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);

  return (
    <ModalContext.Provider
      value={{
        activeProject,
        openProject: setActiveProject,
        closeProject: () => setActiveProject(null),
        activeBlog,
        openBlog: setActiveBlog,
        closeBlog: () => setActiveBlog(null),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}
