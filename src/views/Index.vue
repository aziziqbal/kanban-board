<script setup lang="ts">
import Header from "@/components/Header.vue";
import Notification from "@/components/Notification.vue";
import KanbanBoard from "@/components/Kanban/Board.vue";
</script>

<template>
  <div class="relative z-[1] h-full overflow-hidden">
    <Header />
    <Notification />
    <KanbanBoard />
  </div>
</template>
