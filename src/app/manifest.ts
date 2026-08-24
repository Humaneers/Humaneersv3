import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    short_name: "Humaneers",
    name: "Humaneers | Enterprise Strategy",
    description:
      "Enterprise strategy for businesses and families. Built with precision. Delivered with soul.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F5F5", // brand-cream
    theme_color: "#002147", // brand-oxford
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
