<template>
  <div class="w-full">
    <h1 class="text-xl text-center font-semibold">{{ $t("enter") }}</h1>
    <FormGroup class="mt-3" :label="$t('login')">
      <FormInput
        :placeholder="$t('login_placeholder')"
        :error="form.$v.value.username.$error"
        v-model="form.values.username"
        :disabled="isLoggingIn()"
      />
    </FormGroup>
    <FormGroup class="mt-5" :label="$t('password')">
      <FormInput
        :placeholder="$t('password_placeholder')"
        :error="form.$v.value.password?.$error"
        v-model="form.values.password"
        type="password"
        :disabled="isLoggingIn()"
      />
    </FormGroup>

    <BaseButton
      :text="isLoggingIn() ? 'Signing in...' : $t('sign')"
      class="w-full mt-5"
      variant="primary"
      :disabled="isLoggingIn()"
      @click="signIn"
    />
  </div>
</template>

<script lang="ts" setup>
import { BaseButton, FormGroup, FormInput } from "@/components/Base";
import { useForm } from "@/composables/useForm";
import { required } from "@vuelidate/validators";
import { useAuth } from "../composables/useAuth";

const { login, isLoggingIn } = useAuth();

const form = useForm(
  {
    username: "",
    password: "",
  },
  {
    username: { required },
    password: { required },
  }
);

const signIn = () => {
  form.$v.value.$touch();
  if (form.$v.value.$invalid) {
    return;
  }

  login({
    username: form.values.username,
    password: form.values.password,
  });
};
</script>
