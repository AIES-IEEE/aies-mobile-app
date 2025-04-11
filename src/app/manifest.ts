import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AIES Mobile App",
    short_name: "AIES",
    description: "Ambulance Integrated Emergency System Mobile App",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/logo-aies.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo-aies.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
