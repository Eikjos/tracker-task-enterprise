<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import type { HTMLAttributes } from 'vue';
import { cn } from '../../../lib/utils';

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
  label?: string
  error?: string
  type?: "text" | "email" | "password"
  placeholder: string
  focusIn?: () => void;
  focusOut?: () => void;
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-xs ml-2">{{ label }}</label>
    <input :type="type" :placeholder="placeholder" v-model="modelValue" 
      :class="cn(`flex h-10 w-full rounded-xs border-b ${props.error ? 'border-red-600' : 'border-input'}
       bg-transparent px-2 py-1 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium
       placeholder:text-muted-foreground focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`, props.class)"
       @focusin="focusIn"
       @focusout="focusOut"
    >
    <span v-if="error" class="ml-2 text-xs text-red-700">{{ error }}</span>
  </div>
</template>
