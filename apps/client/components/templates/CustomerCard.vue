<script setup lang="ts">
import type { CustomerModel } from "@repo/models";
import { deleteCustomer } from "~/api/customer";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

type CustomerCardProps = {
  customer: CustomerModel;
  onDelete: () => void;
};
const props = defineProps<CustomerCardProps>();

const deleteMutation = useMutation({
  mutationFn: deleteCustomer,
});

const onDelete = () => {
  deleteMutation.mutate(props.customer.id);
  props.onDelete();
};
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between">
      <div>
        <CardTitle>{{ customer.name }}</CardTitle>
        <CardDescription>
          {{ customer.siret }}
        </CardDescription>
      </div>
      <div>
        <Button variant="destructive" @click="onDelete">Supprimer</Button>
      </div>
    </CardHeader>
  </Card>
</template>
