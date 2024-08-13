import type { ResultContact } from "@/types/Contact";

export const fetchContact = async (): Promise<ResultContact[]> => {
  const response = await fetch("http://localhost:5000/contact");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.results;
};
