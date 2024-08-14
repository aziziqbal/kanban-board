import type { ResultContact } from "@/types/Contact";

function isResultContactArray(data: ResultContact) {
  return Array.isArray(data);
}

export const fetchContact = async (): Promise<ResultContact[]> => {
  const response = await fetch("http://localhost:5000/contact");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  if (!data.results || !isResultContactArray(data.results)) {
    throw new Error("Invalid data format");
  }
  return data.results;
};
