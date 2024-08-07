import type { Stages } from "@/types/Stages";

export const fetchStages = async (): Promise<Stages[]> => {
  const response = await fetch("http://localhost:5000/stages");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: Stages[] = await response.json();
  return data;
};
