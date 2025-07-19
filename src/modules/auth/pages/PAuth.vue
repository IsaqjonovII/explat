<template>
  <div class="w-full">
    <h1 class="text-xl text-center font-semibold">{{ $t("enter") }}</h1>
    <FormGroup class="mt-3" :label="$t('login')">
      <FormInput
        :placeholder="$t('login_placeholder')"
        :error="form.$v.value.login.$error"
        v-model="form.values.login"
      />
    </FormGroup>
    <FormGroup class="mt-5" :label="$t('password')">
      <FormInput
        :placeholder="$t('password_placeholder')"
        :error="form.$v.value.password.$error"
        v-model="form.values.password"
      />
    </FormGroup>
    <BaseButton
      :text="$t('sign')"
      class="w-full mt-5"
      variant="primary"
      @click="signIn"
    />
  </div>
</template>

<script lang="ts" setup>
import { BaseButton, FormGroup, FormInput } from "@/components/Base";
import { useForm } from "@/composables/useForm";
import { required } from "@vuelidate/validators";
import { useRouter } from "vue-router";

const router = useRouter();
const form = useForm(
  {
    login: "",
    password: "",
  },
  {
    login: { required },
    password: { required },
  },
);

const signIn = () => {
  form.$v.value.$touch();
  if (form.$v.value.$invalid) {
    return;
  }
  router.push({ name: "Dashboard" });
};
</script>
