<template>
  <main>
    <CHeading :title="$t('dashboard.title')">
      <FilterDateRange />
    </CHeading>
    <TraderDashboard v-if="auth?.role === 'trader'" />
    <!--    <h1>Dashboard</h1>-->
    <!--    <BaseTab v-model="currentTab" :list="list"/>-->

    <!--    <ExampleDropdown/>-->
    <!--    <ExampleModal/>-->

    <!--    <BaseTooltip text="hello,  this is the example of tooltip">-->
    <!--      <p>show tooltip</p>-->
    <!--    </BaseTooltip>-->

    <!--    <BasePagination :default-page="1" :sibling-count="2" :total="10230" show-edges/>-->

    <!--    <pre class="mt-10"> use <code class="status">separator</code> with just class </pre>-->

    <!--    <div class="separator mb-5"/>-->

    <!--    <BaseButton text="Open toast" @click="openToast"/>-->
  </main>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/modules/auth/store";
import { CHeading } from "@/components/Common";
import TraderDashboard from "@/modules/dashboard/components/TraderDashboard.vue";
import { FilterDateRange } from "@/components/Base";

const auth = useAuthStore()?.user;

// import {BaseBreadcrumb, BaseButton, BasePagination, BaseTab, BaseTooltip} from "@/components/Base";
// import {defineAsyncComponent, ref} from "vue";
// import { useMounted } from "@vueuse/core";
// import type {IRoute} from "@/types/components";
// import {useCustomToast} from "@/composables/useCustomToast";
//
// const ExampleDropdown = defineAsyncComponent(() =>
//     import("@/modules/dashboard/components/ExampleDropdown.vue")
// );
// const ExampleModal = defineAsyncComponent(() =>
//     import("@/modules/dashboard/components/ExampleModal.vue")
// );
//
// const {showToast} = useCustomToast()
// const mounted = useMounted();
//
// const currentTab = ref('tab-1');
//
// const list = [
//   {
//     value: 'tab-1',
//     label: 'Tab 1',
//   },
//   {
//     value: 'tab-2',
//     label: 'Tab 2',
//   },
//   {
//     value: 'tab-3',
//     label: 'Tab 3',
//   }
// ]
//
// const routes: IRoute[] = [
//   {
//     name: 'home 2',
//     route: {name: 'Dashboard'}
//   },
//   {
//     name: 'some other route',
//     route: {name: 'Dashboard'}
//   },
//   {
//     name: 'other route',
//     route: {name: 'Dashboard'}
//   },
//   {
//     name: 'Route other 1',
//     route: {name: 'Dashboard'}
//   }
// ]
//
// const openToast = () => {
//   showToast('helooo', 'error')
// }
</script>
