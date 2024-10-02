<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import type { HTMLAttributes } from 'vue';
import { computed, ref } from 'vue';
import { Input } from '../input/';

interface Props {
  modelValue?: string | number,
  class?: HTMLAttributes['class']
  values: {
    value: string | number,
    label: string
  }[],
  placeholder?: string,
  label?: string,
  defaultValue?: string
}
const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const props = defineProps<Props>()
const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue
})

const inputValue = ref<string>(props.values.find(v => v.value === modelValue.value)?.label ?? '')
const isDropdownOpen = ref(false);

const filteredValues = computed(() => {
  const input = inputValue.value.toString().toLowerCase();
  return props.values.filter(item => 
    item.label.toLowerCase().includes(input)
  );
});

const selectItem = (item: { value: string | number, label: string }) => {
  modelValue.value = item.value;
  inputValue.value = item.label;
  isDropdownOpen.value = false; 
};
</script>


<template>
  <div class="relative">
    <Input 
      :label="props.label"
      :placeholder="props.placeholder ?? ''"
      v-model="inputValue" 
      :focus-in="() => { isDropdownOpen = true }"
      :focus-out="() => { isDropdownOpen = false}"
      @input="isDropdownOpen = true"
      :class="props.class"
    />
    <ul 
      v-if="isDropdownOpen && filteredValues.length" 
      class="absolute left-0 right-0 bg-primary border border-input shadow-lg z-10 max-h-60 overflow-y-auto"
    >
      <li 
        v-for="item in filteredValues" 
        :key="item.value" 
        @mousedown="selectItem(item)" 
        class="p-2 hover:bg-secondary/50 cursor-pointer"
        :class="item.value === modelValue ? 'bg-secondary/20' : ''"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

