import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="project-page-layout">
      <SmoothScrollProvider>
        <Header />
        {children}
        <Footer />
      </SmoothScrollProvider>
    </div>
  );
}
