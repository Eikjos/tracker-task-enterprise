<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "radix-vue";
import type { HTMLAttributes } from "vue";
import { type ButtonVariants, buttonVariants } from ".";
import { cn } from "../../../lib/utils";

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
});
defineEmits(["click"]);
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    @click="$emit('click', $event)"
  >
    <slot />
  </Primitive>
</template>
