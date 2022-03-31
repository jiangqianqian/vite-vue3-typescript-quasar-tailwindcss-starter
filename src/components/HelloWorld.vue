<template>
  <div class="p-[10px] m-0">
    <h1 class="font-bold text-amber-400 leading-4 text-[16px]">
      {{ msg }}
    </h1>
    <div class="mt-[10px]">
      <span class="text-[14px] mr-[10px]">{{ count }}</span>
      <q-btn color="primary" label="+" @click="handleClick" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ msg: string }>()

let count = ref(0)

const handleClick = () => {
  count.value += 1
}
</script>
