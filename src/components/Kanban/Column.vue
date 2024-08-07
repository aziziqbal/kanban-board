<script setup lang="ts">
import { computed } from "vue";
import type { ResultStages } from "@/types/Stages";
import type { ResultContact } from "@/types/Contact";
import KanbanCard from "@/components/Kanban/Card.vue";

const props = defineProps<{
  stage: ResultStages;
  contacts: ResultContact[];
}>();

const emit = defineEmits<{
  (e: "drop", event: DragEvent, stage: ResultStages): void;
  (e: "start-drag", event: DragEvent, contact: ResultContact): void;
}>();

const handleDrop = (event: DragEvent, stage: ResultStages) => {
  emit("drop", event, stage);
};

const handleDragStart = (event: DragEvent, contact: ResultContact) => {
  emit("start-drag", event, contact);
};

const filteredContacts = computed(() => {
  return props.contacts.filter((contact) => contact.stage === props.stage.id);
});
</script>

<template>
  <div
    class="bg-[#f1f2f4] h-full min-w-[300px] max-w-[300px] pb-[15px] px-2 rounded-[10px]"
    @drop="handleDrop($event, stage)"
    @dragenter.prevent
    @dragover.prevent
  >
    <div
      class="h-10 w-full text-[black] flex items-center font-bold justify-between px-[5px]"
    >
      {{ stage.name }}
    </div>
    <div
      class="bg-[#0279c0] h-[120px] w-full text-[white] text-[25px] font-bold flex items-center justify-center text-center relative mb-2.5 px-5 rounded-[10px]"
      :style="'background-color:' + stage.header_color"
    >
      <div
        class="w-full h-full bg-[rgba(0,0,0,0.5)] absolute z-[1] rounded-[10px]"
      />
      <div class="absolute z-[2] text-[white]">{{ stage.name }}</div>
    </div>
    <div class="flex flex-col gap-2 max-h-[300px] overflow-x-scroll">
      <KanbanCard
        v-for="(item, index) in filteredContacts"
        :key="index"
        :contact="item"
        @dragstart="handleDragStart"
      />
    </div>
  </div>
</template>
