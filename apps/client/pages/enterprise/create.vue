<script setup lang="ts">
import type { EnterpriseInformation } from '@repo/models';
import { z } from 'zod';
import { getInformationBySiret } from '~/api/enterprise';
import { AutoComplete } from '~/components/ui/autocomplete';
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

definePageMeta({
  middleware: ['auth'],
  layout: 'without-menu',
})

const step = ref(0);
const informations : Ref<EnterpriseInformation | undefined> = ref<EnterpriseInformation>()
// --- Form step 1 --- 
const siretSchema = toTypedSchema(
  z.object({
    siret: z.string({required_error: "Le numéro SIRET est requis."})
      .transform((val) => val.replace(/\s+/g, ''))
      .refine((val) => /^\d{14}$/.test(val), {
        message: 'Le numéro SIRET doit contenir exactement 14 chiffres',
      })
  })
);
const form1 = useForm<{siret : string}>({
  validationSchema: siretSchema,
})
const [siret1] = form1.defineField('siret');
const { data, error, refetch } = useQuery(
  {
    queryKey:   ['siret', siret1.value],
    queryFn: () => getInformationBySiret(siret1.value),
    enabled: false,
    retry: false,
  }
);

const onSubmit = form1.handleSubmit(async (values : { siret : string}) => {
  siret1.value = values.siret
  const query = await refetch();
  informations.value = query.data;
  console.log(query.data);
  form2.resetForm({
    values: informations.value,
  });
  step.value++;
})

// --- From step 2 ---
const createEnterpriseSchema = toTypedSchema(
  z.object({
    siret: z.string({required_error: "Le numéro SIRET est requis."})
      .transform((val) => val.replace(/\s+/g, ''))
      .refine((val) => /^\d{14}$/.test(val), {
        message: 'Le numéro SIRET doit contenir exactement 14 chiffres',
      }),
    name: z.string({required_error: 'Le nom est requis.'}),
    address: z.string({required_error: "L'adresse est requis."}),
    city: z.string({required_error: "La ville est requis."}),
    zipCode: z.string({required_error: "Le code postale est requis."}),
    numberTva: z.string({required_error: "Le numéro de TVA est requis."}),
    juridicShape: z.string({required_error: "Le statut de l'entreprise est requis."}),
    socialCapital: z.number().optional(),
  })
)
const form2 = useForm<EnterpriseInformation>({
  validationSchema: createEnterpriseSchema,
  initialValues: informations.value,
});

const [siret2] = form2.defineField('siret');
const [name] = form2.defineField('name');
const [address] = form2.defineField('address');
const [zipCode] = form2.defineField('zipCode');
const [city] = form2.defineField('city');
const [numberTva] = form2.defineField('numberTva');
const [juridicShape] = form2.defineField('juridicShape');
const [socialCapital] = form2.defineField('socialCapital');

const juridicShapesValues = [
  {
    value: "03131",
    label: "SAS",
  },
   {
    value: "03132",
    label: "SASU",
  },
   {
    value: "03133",
    label: "AE",
  }, 
  {
    value: "03134",
    label: "EURL",
  },
  {
    value: "03135",
    label: "SARL",
  }
]

</script>


<template>
  <div class="w-1/2 mx-auto mt-16 flex flex-row justify-center items-center">
    <div class="flex flex-col w-14 items-center gap-2 h-28">
      <div class="bg-primary w-14 h-14 rounded-full flex flex-row justify-center items-center text-2xl text-white">1</div>
      <span class="w-36 text-center text-xs">Numéro de SIRET</span>
    </div>
    <div class="w-1/5 h-1 bg-primary rounded-e-full mb-14"></div>
    <div class="w-1/5 h-1 bg-accent mb-14"></div>
    <div class="flex flex-col w-14 items-center gap-2 h-28">
       <div class="bg-accent w-14 h-14 rounded-full flex flex-row justify-center items-center text-2xl">2</div>
       <span class="w-36 text-center text-xs">Vérification des informations</span>
    </div>
  </div>

  <form v-if="step === 0" class="w-1/2 mx-auto mt-5 bg-accent rounded-lg border-2 border-input p-5" @submit="onSubmit">
    <h1 class="text-2xl font-semibold text-center w-1/2 mx-auto">Renseignez les informations sur votre entreprise</h1>
    <Input label="Numéro de Siret" v-model="siret1" type="text" name="siret" placeholder="Numéro de siret" :error="form1.errors.value.siret"/>
    <p class="text-xs p-2">Renseignez votre numéro de siret. L'application va charger les différentes informations sur votre entreprise (Si possible).</p>
    <div class="flex w-full justify-end">
      <Button type="submit">Suivant</Button>
    </div>
  </form>
  <form v-if="step === 1" class="w-1/2 mx-auto mt-5 bg-accent rounded-lg border-2 border-input p-5 gap-1 flex flex-col mb-24">
      <h1 class="text-2xl font-semibold text-center w-1/2 mx-auto">Vérification des informations sur votre entreprise</h1>
      <Input label="Numéro de Siret" v-model="siret2" type="text" name="siret" placeholder="Numéro de siret" :error="form2.errors.value.siret"/>
      <Input label="Nom de l'entreprise" v-model="name" type="text" name="siret" placeholder="Numéro de siret" :error="form2.errors.value.name"/>
      <Input label="Addresse" v-model="address" type="text" name="siret" placeholder="Numéro de siret" :error="form2.errors.value.address" />
      <Input label="Code postale" v-model="zipCode" type="text" name="siret" placeholder="Numéro de siret" :error="form2.errors.value.zipCode"/>
      <Input label="Ville" v-model="city" type="text" name="siret" placeholder="Numéro de siret" :error="form2.errors.value.city"/>
      <AutoComplete v-model="juridicShape" label="Forme juridique" :values="juridicShapesValues" placeholder="Selectionnez votre forme juridique"/>
      <Input label="Numéro TVA" v-model="numberTva" type="text" name="siret" placeholder="Numéro de siret" :error="form2.errors.value.numberTva"/>
      <Input label="Capitale sociale" v-model="socialCapital" type="text" name="siret" placeholder="Numéro de siret" :error="form2.errors.value.socialCapital"/>
      <div class="flex w-full justify-between mt-3">
        <Button variant="outline">Précédent</Button>
        <Button type="submit">Suivant</Button>
      </div>
  </form>
</template>