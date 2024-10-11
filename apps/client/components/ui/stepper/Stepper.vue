<script setup lang="ts">
import { cn } from "~/lib/utils";
const props = defineProps<{
  step: number;
  steps: string[];
}>();

const ratioLine = 1 / (props.steps.length - 1);
</script>

<template>
  <div class="mx-auto mt-16 flex flex-row justify-center items-center">
    <div
      v-for="(stepItem, index) in steps"
      :key="stepItem"
      :style="index === steps.length - 1 ? '' : `width: ${ratioLine * 400}px`"
      class="flex flex-row items-center"
    >
      <div class="flex flex-col w-14 items-center gap-2 h-28">
        <div
          :class="
            cn(
              'bg-accent w-14 h-14 rounded-full flex flex-row justify-center items-center text-2xl text-white',
              { 'bg-primary': step == index }
            )
          "
        >
          {{ index + 1 }}
        </div>
        <span class="w-36 text-center text-xs">{{ stepItem }}</span>
      </div>
      <div
        v-if="index < steps.length - 1"
        :class="
          cn(`w-1/2 h-1 bg-primary rounded-e-full mb-14 stepper-bar`, {
            'w-full': step === index + 1,
          })
        "
      />
      <div
        v-if="index < steps.length - 1"
        :class="
          cn(`w-1/2 h-1 bg-accent mb-14 stepper-bar`, {
            'w-0': step === index + 1,
          })
        "
      />
    </div>
  </div>
</template>
