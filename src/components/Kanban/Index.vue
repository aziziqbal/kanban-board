<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { ResultStages } from "@/types/Stages";
import type { ResultContact } from "@/types/Contact";
import { fetchStages } from "@/api/fetch/stages";
import { fetchContact } from "@/api/fetch/contact";

import KanbanHeader from "@/components/Kanban/Header.vue";

const dataStages = ref<ResultStages[]>([]);
const dataContact = ref<ResultContact[]>([]);

onMounted(() => {
  getStages();
  getContact();
});
const getStages = async () => {
  try {
    const data = await fetchStages();
    dataStages.value = data.results;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
};
const getContact = async () => {
  try {
    const data = await fetchContact();
    dataContact.value = data.results;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
};
const startDrag = (event: any, item: any) => {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("itemID", item.id);
};
const onDrop = (event: DragEvent, to: any) => {
  console.log("drop : ", to);
  const from = event.dataTransfer?.getData("itemID");
  const data = dataContact.value.find((item) => item.id === from);
  data.stage = to.id || "";
};
</script>
<template>
  <KanbanHeader />
  <div class="flex flex-row overflow-y-scroll gap-5 pt-5 pb-[100px] px-5">
    <div
      v-for="(item, index) in dataStages"
      class="bg-[#f1f2f4] h-full min-w-[300px] max-w-[300px] pb-[15px] px-2 rounded-[10px]"
      @drop="onDrop($event, item)"
      @dragenter.prevent
      @dragover.prevent
    >
      <div
        class="h-10 w-full text-[black] flex items-center font-bold justify-between px-[5px]"
      >
        {{ item.name }}
      </div>
      <div
        class="bg-[#0279c0] h-[120px] w-full text-[white] text-[25px] font-bold flex items-center justify-center text-center relative mb-2.5 px-5 rounded-[10px]"
        :style="'background-color:' + item.header_color"
      >
        <div
          class="w-full h-full bg-[rgba(0,0,0,0.5)] absolute z-[1] rounded-[10px]"
        />
        <div class="absolute z-[2] text-[white]">
          {{ item.name }}
        </div>
      </div>
      <div class="flex flex-col gap-2 max-h-[300px] overflow-x-scroll">
        <div
          class="flex flex-row justify-between gap-2.5 bg-[white] w-full h-full min-h-[40px] text-[black] border flex items-center cursor-grab px-2.5 rounded-lg border-solid border-[#dbdde3]"
          v-for="i in dataContact"
          v-show="i.stage === item.id"
          draggable="true"
          @dragstart="startDrag($event, i)"
          @dragenter.prevent
          @dragover.prevent
        >
          {{ i.full_name }}
        </div>
      </div>
    </div>
  </div>
</template>
