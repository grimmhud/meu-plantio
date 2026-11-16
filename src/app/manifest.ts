import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Meu plantio",
    short_name: "Meu plantio",
    description: "Your next crop, step by step.",
    lang: "en-US",
    start_url: "/app",
    scope: "/",
    display: "standalone",
    background_color: "#f7f7ef",
    theme_color: "#224d38",
    icons: [
      {
        src: "/brands/meu-plantio-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brands/meu-plantio-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brands/meu-plantio.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
