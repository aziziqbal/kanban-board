import type { Contact } from "@/types/Contact";

export const fetchContact = async (): Promise<Contact[]> => {
  const response = await fetch("http://localhost:5000/contact");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: Contact[] = await response.json();
  return data;
};
