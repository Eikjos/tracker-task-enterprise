<template>
  <div class="flex">
    <div class="w-2/3 flex flex-col justify-center">
      <img src="/img/png/login.png" class="h-[400px] mx-auto object-contain"/>
      <span class="text-center text-2xl font-bold w-1/2 mx-auto mt-20">Gérer votre vie d'entrepreneur libre facilement</span>
    </div>
    <form @submit="onSubmit" class="w-1/3 border-l-2 border-inpu dark:border-slate-700 px-10 flex flex-col gap-2 h-screen bg-white dark:bg-slate-900" >
      <img src="/img/png/logo.png" class="w-[200px] h-[50px] mx-auto mb-20 mt-10"/>
      <h1 class="text-3xl font-semibold mb-10 text-center">Connexion</h1>
      <Input :error="errors.email" placeholder="Adresse mail" label="Adresse mail" v-model="email" type="email" name="email"/>
      <Input :error="errors.password" placeholder="Mot de passe" label="Mot de passe" v-model="password" type="password" name="password"/>
      <span class="text-xs">Mot de passe oublié ? <a class="cursor-pointer text-gray-700 dark:text-slate-300  ">Modifiez-le</a></span>
      <Button type="submit" class="mt-4">Se connecter</Button> 
      <span v-if="error" class="text-center text-red-700 text-xs">{{ error }}</span>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { LoginData, UserInformationData } from '@repo/models';
import { toTypedSchema } from '@vee-validate/zod';
import type { HTTPError } from 'ky';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

const login = useLogin();
const error = ref<string>();
const loginSchema = toTypedSchema(
  z.object({
    email: z.string().min(1, { message: 'Ce champs est requis.' }).email("L'email doit être valide."),
    password: z.string().min(1, { message: 'Ce champs est requis' }),
  })
);
const {handleSubmit, errors, defineField } = useForm<LoginData>({
  validationSchema: loginSchema,
})
const [email] = defineField('email');
const [password] = defineField('password');

const onSubmit = handleSubmit((values : LoginData) => {
  login.mutate(values, {
    onSuccess: (data : UserInformationData) => {
      if (data.user !== null) {
        navigateTo('/');
      } else {
        console.log("il y a une erreur");
      }
    },
    onError : async (e : HTTPError) => {
      if (e.response.status === 500) {
        error.value = 'Une erreur est survenue.'
      } else {
        error.value = "Les identifiants sont invalides"
      }
    },
  })
})

</script>