import { Button, Card, CardContent, CardHeader } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Easy Resume Editing",
    description: "Edit your experience, education, skills, and projects in a clean, intuitive interface.",
    icon: "/file.svg",
  },
  {
    title: "Live Preview & Templates",
    description: "See your resume update in real time. Choose from minimalist, creative, or professional templates.",
    icon: "/window.svg",
  },
  {
    title: "Export as PDF",
    description: "Download your resume as a beautiful PDF, ready to share or print.",
    icon: "/globe.svg",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center gap-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">Build Your Modern Resume with <span className="text-primary">buildYourResume</span></h1>
        <p className="max-w-xl mx-auto text-lg text-muted-foreground mb-6">
          Create, customize, and export beautiful resumes in minutes. Choose a template, edit your info, and get hired faster with <b>buildYourResume</b>.
        </p>
        <Link href="/dashboard">
          <Button className="px-8 py-4 text-lg font-semibold shadow-md border border-white">Start Building</Button>
        </Link>
      </section>

      {/* Feature Highlights */}
      <section className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 px-4 pb-16">
        {features.map((feature) => (
          <Card key={feature.title} className="h-full">
            <CardHeader className="flex flex-col items-center gap-2">
              <Image src={feature.icon} alt="" width={32} height={32} aria-hidden className="mb-2" />
              <span className="text-xl font-semibold text-center">{feature.title}</span>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground text-center">
              {feature.description}
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
