<script setup lang="ts">
import type { CustomerModel } from "@repo/models";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

type CustomerCardProps = {
  customer: CustomerModel;
};
defineProps<CustomerCardProps>();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ customer.name }}</CardTitle>
      <CardDescription>{{ customer.siret }}</CardDescription>
    </CardHeader>
  </Card>
</template>
