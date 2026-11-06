import { BASE_URL } from "../redux/constant";

export const getFullImageUrl = (imagePath) => {
  if (!imagePath) return "/hero-podium-bg.jpg";
  const clean = imagePath.replace(/\\/g, "/");
  if (clean.startsWith("http://") || clean.startsWith("https://")) {
    return clean;
  }
  // Ensure single slash between BASE_URL and path
  const normalizedPath = clean.startsWith("/") ? clean : `/${clean}`;
  return BASE_URL ? `${BASE_URL}${normalizedPath}` : normalizedPath;
};

