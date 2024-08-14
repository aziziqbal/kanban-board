import type { ResultStages } from "@/types/Stages";

function isResultStagesArray(data: ResultStages) {
  return Array.isArray(data);
}
export const fetchStages = async (): Promise<ResultStages[]> => {
  const response = await fetch("http://localhost:5000/stages");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  if (!data.results || !isResultStagesArray(data.results)) {
    throw new Error("Invalid data format");
  }
  return data.results;
};
