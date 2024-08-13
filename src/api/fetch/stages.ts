import type { ResultStages } from "@/types/Stages";

export const fetchStages = async (): Promise<ResultStages[]> => {
  const response = await fetch("http://localhost:5000/stages");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.results;
};
