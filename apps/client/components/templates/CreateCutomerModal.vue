<script setup lang="ts">
import type { CreateCustomer } from "@repo/models";
import { z } from "zod";
import { createCustomer } from "~/api/customer";

type CreateCustomerModal = {
  open: boolean;
  onSuccess: () => void;
};

const props = defineProps<CreateCustomerModal>();

const isOpen = ref(props.open);

const emit = defineEmits<{
  (e: "update:open", payload: boolean): void;
}>();

const onChangeModal = (value: boolean) => {
  isOpen.value = value;
  emit("update:open", value);
};

watch(
  () => props.open,
  (newValue) => {
    isOpen.value = newValue;
  }
);

const customerSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .min(1, { message: "Ce champs est requis." })
      .email("L'email doit être valide."),
    phone: z.string().min(1, { message: "Ce champs est requis" }),
    siret: z.string().min(1, { message: "Ce champs est requis" }),
    address: z.string().min(1, { message: "Ce champs est requis" }),
    city: z.string().min(1, { message: "Ce champs est requis" }),
    zipCode: z.string().min(1, { message: "Ce champs est requis" }),
    name: z.string().min(1, { message: "Ce champs est requis" }),
    country: z.string().min(1, { message: "Ce champs est requis" }),
  })
);
const { handleSubmit, errors, defineField } = useForm<CreateCustomer>({
  validationSchema: customerSchema,
});
const [email] = defineField("email");
const [phone] = defineField("phone");
const [siret] = defineField("siret");
const [name] = defineField("name");
const [tvaNumber] = defineField("TVANumber");
const [city] = defineField("city");
const [zipCode] = defineField("zipCode");
const [address] = defineField("address");
const [country] = defineField("country");

const customerMutation = useMutation({
  mutationFn: createCustomer,
  mutationKey: ["customer"],
  onSuccess: () => {
    props.onSuccess();
  },
});

const onSubmit = handleSubmit((values: CreateCustomer) => {
  onChangeModal(false);
  customerMutation.mutate(values);
});
</script>

<template>
  <Dialog v-model:open="isOpen" @update:open="onChangeModal">
    <DialogContent class="max-w-2xl">
      <DialogHeader>
        <h3 class="text-2xl font-medium">Ajout d'un client</h3>
      </DialogHeader>
      <form class="grid grid-cols-3 gap-2 gap-y-5">
        <Input
          v-model:model-value="name"
          label="Nom du client"
          placeholder="Nom du client"
          :error="errors.name"
        />
        <Input
          v-model:model-value="siret"
          label="Siret"
          placeholder="Siret"
          :error="errors.siret"
        />
        <Input
          v-model:model-value="tvaNumber"
          label="Numéro de TVA"
          placeholder="Numéro de TVA"
          :error="errors.TVANumber"
        />
        <Input
          v-model:model-value="address"
          label="Adresse"
          placeholder="Adresse"
          class="col-span-2"
          :error="errors.address"
        />
        <Input
          v-model:model-value="zipCode"
          label="Code Postale"
          placeholder="Code postale"
          :error="errors.zipCode"
        />
        <Input
          v-model:model-value="city"
          label="Ville"
          placeholder="Ville"
          :error="errors.city"
        />
        <Input
          v-model:model-value="country"
          label="Pays"
          placeholder="Pays"
          :error="errors.country"
        />
        <Input
          v-model:model-value="email"
          label="Adresse mail"
          placeholder="Adresse mail"
          class="col-span-2"
          :error="errors.email"
        />
        <Input
          v-model:model-value="phone"
          label="Téléphone"
          placeholder="Téléphone"
          :error="errors.phone"
        />
      </form>
      <DialogFooter class="sm:justify-between">
        <DialogClose as-child>
          <Button type="button" variant="outline">Fermer</Button>
        </DialogClose>

        <Button type="submit" @click="onSubmit">Créer</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
