import api from "@/services/api";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const createUniqueSlug = async (databaseId: string,
  collectionId: string,
  documentId: string, title: string): Promise<string> => {
  let slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
    .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens

  let uniqueSlug = slug;
  let counter = 1;

  // Check if the slug already exists
  while (true) {
    const response = await api.provider().database.listDocuments(databaseId, collectionId, [
      `slug=${uniqueSlug}`
    ]);

    if (response.total === 0) break; // Slug is unique
    uniqueSlug = `${slug}-${counter}`; // Append counter if duplicate
    counter++;
  }

  return uniqueSlug;
}