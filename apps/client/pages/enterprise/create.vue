<script setup lang="ts">
import type {
  EnterpriseCreateModel,
  EnterpriseInformation,
} from "@repo/models";
import type { HTTPError } from "ky";
import { z } from "zod";
import { createEnterprise, getInformationBySiret } from "~/api/enterprise";
import { getAllJuridicShape } from "~/api/juridic-shape";
import { AutoComplete } from "~/components/ui/autocomplete";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Stepper } from "~/components/ui/stepper";

definePageMeta({
  middleware: ["auth"],
  layout: "without-menu",
});

const step = ref(0);
const informations: Ref<EnterpriseInformation | undefined> =
  ref<EnterpriseInformation>();
// --- Form step 1 ---
const siretSchema = toTypedSchema(
  z.object({
    siret: z
      .string({ required_error: "Le numéro SIRET est requis." })
      .transform((val) => val.replace(/\s+/g, ""))
      .refine((val) => /^\d{14}$/.test(val), {
        message: "Le numéro SIRET doit contenir exactement 14 chiffres",
      }),
  })
);
const form1 = useForm<{ siret: string }>({
  validationSchema: siretSchema,
});
const [siret1] = form1.defineField("siret");
const { refetch } = useQuery({
  queryKey: ["siret", siret1.value],
  queryFn: () => getInformationBySiret(siret1.value),
  enabled: false,
  retry: false,
});

const juridicShapeValues = useQuery({
  queryKey: ["juridicShape", "all"],
  queryFn: getAllJuridicShape,
});

const onSubmit = form1.handleSubmit(async (values: { siret: string }) => {
  siret1.value = values.siret;
  const query = await refetch();
  informations.value = query.data;
  form2.resetForm({
    values: informations.value,
  });
  step.value++;
});

// --- From step 2 ---
const createEnterpriseSchema = toTypedSchema(
  z.object({
    siret: z
      .string({ required_error: "Le numéro SIRET est requis." })
      .transform((val) => val.replace(/\s+/g, ""))
      .refine((val) => /^\d{14}$/.test(val), {
        message: "Le numéro SIRET doit contenir exactement 14 chiffres",
      }),
    name: z.string({ required_error: "Le nom est requis." }),
    address: z.string({ required_error: "L'adresse est requis." }),
    city: z.string({ required_error: "La ville est requis." }),
    zipCode: z.string({ required_error: "Le code postale est requis." }),
    numberTVA: z.string({ required_error: "Le numéro de TVA est requis." }),
    juridicShape: z.string({
      required_error: "Le statut de l'entreprise est requis.",
    }),
    email: z
      .string({ required_error: "L'addresse mail est requise." })
      .email({ message: "L'addresse mail est invalide.}" }),
    phone: z.string({ required_error: "Le numéro de téléphone est requis." }),
    socialCapital: z.number().optional(),
  })
);
const form2 = useForm<EnterpriseCreateModel>({
  validationSchema: createEnterpriseSchema,
  initialValues: informations.value,
});

const [siret2] = form2.defineField("siret");
const [name] = form2.defineField("name");
const [address] = form2.defineField("address");
const [zipCode] = form2.defineField("zipCode");
const [city] = form2.defineField("city");
const [numberTva] = form2.defineField("numberTVA");
const [juridicShape] = form2.defineField("juridicShape");
const [socialCapital] = form2.defineField("socialCapital");
const [email] = form2.defineField("email");
const [phone] = form2.defineField("phone");

const createEntepriseMutation = useMutation({
  mutationFn: createEnterprise,
  onSuccess: () => {
    navigateTo("/");
  },
  onError: (e: HTTPError) => {
    console.error(e);
  },
});

const onSubmitCreate = form2.handleSubmit(
  async (values: EnterpriseCreateModel) => {
    createEntepriseMutation.mutate(values);
  }
);
</script>

<template>
  <div>
    <Stepper
      :step="0"
      :steps="['Numéro de Siret', 'Vérification des informations']"
    />
    <form
      v-if="step === 0"
      class="w-1/2 mx-auto mt-5 bg-accent rounded-lg border-2 border-input p-5"
      @submit="onSubmit"
    >
      <h1 class="text-2xl font-semibold text-center w-1/2 mx-auto">
        Renseignez les informations sur votre entreprise
      </h1>
      <Input
        v-model="siret1"
        label="Numéro de Siret"
        type="text"
        name="siret"
        placeholder="Numéro de siret"
        :error="form1.errors.value.siret"
      />
      <p class="text-xs p-2">
        Renseignez votre numéro de siret. L'application va charger les
        différentes informations sur votre entreprise (Si possible).
      </p>
      <div class="flex w-full justify-end">
        <Button type="submit">Suivant</Button>
      </div>
    </form>
    <form
      v-if="step === 1"
      class="w-1/2 mx-auto mt-5 bg-accent rounded-lg border-2 border-input p-5 gap-4 flex flex-col mb-24"
      @submit="onSubmitCreate"
    >
      <h1 class="text-2xl font-semibold text-center w-1/2 mx-auto">
        Vérification des informations sur votre entreprise
      </h1>
      <Input
        v-model="siret2"
        label="Numéro de Siret"
        type="text"
        name="siret"
        placeholder="Numéro de siret"
        :error="form2.errors.value.siret"
      />
      <Input
        v-model="name"
        label="Nom de l'entreprise"
        type="text"
        name="siret"
        placeholder="Numéro de siret"
        :error="form2.errors.value.name"
      />
      <div class="flex flex-row gap-3 w-full">
        <Input
          v-model="email"
          label="Addresse mail"
          type="email"
          name="email"
          placeholder="Addresse mail de l'entreprise"
          :error="form2.errors.value.name"
          class="w-full"
        />
        <Input
          v-model="phone"
          label="Numéro de téléphone"
          type="tel"
          name="siret"
          placeholder="Numéro de siret"
          :error="form2.errors.value.name"
          class="w-full"
        />
      </div>
      <Input
        v-model="address"
        label="Addresse"
        type="text"
        name="siret"
        placeholder="Numéro de siret"
        :error="form2.errors.value.address"
      />
      <Input
        v-model="zipCode"
        label="Code postale"
        type="text"
        name="siret"
        placeholder="Numéro de siret"
        :error="form2.errors.value.zipCode"
      />
      <Input
        v-model="city"
        label="Ville"
        type="text"
        name="siret"
        placeholder="Numéro de siret"
        :error="form2.errors.value.city"
      />
      <AutoComplete
        v-model="juridicShape"
        label="Forme juridique"
        :values="
          juridicShapeValues.data.value?.map((v) => ({
            value: v.code,
            label: v.designation,
          })) ?? []
        "
        placeholder="Selectionnez votre forme juridique"
      />
      <Input
        v-model="numberTva"
        label="Numéro TVA"
        type="text"
        name="siret"
        placeholder="Numéro de siret"
        :error="form2.errors.value.numberTVA"
      />
      <Input
        v-model="socialCapital"
        label="Capitale sociale"
        type="text"
        name="siret"
        placeholder="Numéro de siret"
        :error="form2.errors.value.socialCapital"
      />
      <div class="flex w-full justify-between mt-3">
        <Button variant="outline">Précédent</Button>
        <Button type="submit">Suivant</Button>
      </div>
    </form>
  </div>
</template>

<style lang="css" scoped>
.stepper-bar {
  transition: width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
</style>
