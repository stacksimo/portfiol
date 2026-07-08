import { projects, services } from "@/lib/data";

export function generateStaticParams() {
  const paths: { slug?: string[] }[] = [
    { slug: [] },
    { slug: ["work"] },
    { slug: ["services"] },
    { slug: ["process"] },
    { slug: ["about"] },
    { slug: ["playground"] },
    { slug: ["plan"] },
    { slug: ["dev"] },
  ];
  projects.forEach((p) => paths.push({ slug: ["work", p.slug] }));
  services.forEach((sv) => paths.push({ slug: ["services", sv.slug] }));
  return paths;
}

export default function Page() {
  return null;
}
