<script setup lang="ts">
import type { ResultContact } from "@/types/Contact";

const props = defineProps<{
  contact: ResultContact;
}>();

const emit = defineEmits<{
  (e: "dragstart", event: DragEvent, contact: ResultContact): void;
}>();

const handleDragStart = (event: DragEvent) => {
  emit("dragstart", event, props.contact);
};
</script>

<template>
  <div
    class="flex flex-row justify-between gap-2.5 bg-[white] w-full h-full min-h-[40px] text-[black] border flex items-center cursor-grab px-2.5 rounded-lg border-solid border-[#dbdde3]"
    draggable="true"
    @dragstart="handleDragStart"
    @dragenter.prevent
    @dragover.prevent
  >
    {{ contact.full_name }}
  </div>
</template>
