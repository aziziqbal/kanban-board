<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { ResultStages } from "@/types/Stages";
import type { ResultContact } from "@/types/Contact";
import { fetchStages } from "@/api/fetch/stages";
import { fetchContact } from "@/api/fetch/contact";
import KanbanHeader from "@/components/Kanban/Header.vue";
import KanbanColumn from "@/components/Kanban/Column.vue";

const dataStages = ref<ResultStages[]>([]);
const dataContact = ref<ResultContact[]>([]);
const errorStages = ref<string | null>(null);
const errorContacts = ref<string | null>(null);

const validateStage = (stage: ResultStages): stage is ResultStages => {
  return (
    typeof stage.id === "string" &&
    typeof stage.name === "string" &&
    typeof stage.header_color === "string"
  );
};

const validateContact = (contact: ResultContact): contact is ResultContact => {
  return (
    typeof contact.id === "string" &&
    typeof contact.full_name === "string" &&
    typeof contact.stage === "string"
  );
};

const fetchData = async <T>(
  fetchFunction: () => Promise<{ results: T[] }>,
  validateFunction: (item: T) => item is T,
  dataRef: { value: T[] },
  errorRef: { value: string | null },
  dataType: string
) => {
  try {
    const data = await fetchFunction();
    if (data && Array.isArray(data.results)) {
      data.results.forEach((item) => {
        if (validateFunction(item)) {
          dataRef.value.push(item);
        } else {
          console.error(`Invalid ${dataType} data:`, item);
        }
      });
      errorRef.value = null; 
    } else {
      throw new Error(`Invalid response format for ${dataType}`);
    }
  } catch (error: unknown) {
    console.error(`There has been a problem with your fetch operation for ${dataType}:`, error);
    errorRef.value = `Failed to fetch ${dataType}: ${(error as Error).message}`;
  }
};

const getStages = () => fetchData(fetchStages, validateStage, dataStages, errorStages, "stages");
const getContact = () => fetchData(fetchContact, validateContact, dataContact, errorContacts, "contacts");

onMounted(() => {
  getStages();
  getContact();
});

const startDrag = (event: DragEvent, item: ResultContact) => {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("itemID", item.id);
  }
};

const onDrop = (event: DragEvent, to: ResultStages) => {
  const fromId = event.dataTransfer?.getData("itemID");
  const data = dataContact.value.find((item) => item.id === fromId);
  if (data) data.stage = to.id;
};
</script>

<template>
  <KanbanHeader />
  <div class="flex flex-row overflow-y-scroll gap-5 pt-5 pb-[100px] px-5">
    <div v-if="errorStages" class="error-message">{{ errorStages }}</div>
    <div v-if="errorContacts" class="error-message">{{ errorContacts }}</div>
    <KanbanColumn v-for="(stage, index) in dataStages" :key="index" :stage="stage" :contacts="dataContact"
      @drop="onDrop" @start-drag="startDrag" />
  </div>
</template>

<style scoped>
.error-message {
  color: red;
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>