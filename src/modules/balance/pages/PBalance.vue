<template>
  <section>
    <div class="bg-white flex justify-between px-6 py-6 mb-6 rounded-xl">
      <h2
        class="whitespace-nowrap mb-2 text-xl border border-white/30 leading-[23px] font-bold text-dark"
      >
        {{ $t("balance_page.wallet") }}
      </h2>
      <div
        class="h-[100px] justify-between flex p-3 text-white linear-gradient w-[300px] bg-gray-3 rounded-lg"
      >
        <div class="h-full flex-1 flex flex-col justify-between">
          <p>ID: 627831</p>
          <p>
            ************ JuFDu
            <i class="icon-copy cursor-pointer text-white font-semibold" />
          </p>
        </div>
        <figure class="h-[80px] overflow-hidden rounded-[2px]">
          <img
            class="h-full w-full object-center"
            src="/images/qr-code.png"
            alt="qr"
          />
        </figure>
      </div>
    </div>
    <div class="bg-white px-6 rounded-xl">
      <BaseTable
        :data="tableData"
        :head="tableHead()"
        :has-add-button="{
          title: $t('balance_page.top_up'),
        }"
        @add="addBalance"
        :loading="loading"
        :title="$t('balance_page.title')"
        :subtitle="$t('balance_page.count', { count: paginationData.total })"
        :total="paginationData.total"
        :filter="{ status }"
        v-bind="tableSettings()"
        @click-to-row="openTransaction"
      >
        <template #id="{ data }">
          <div class="flex items-center gap-1">
            <span class="text-sm font-medium text-dark-black">
              {{ data?.id }}
              <i class="icon-copy text-primary font-semibold" />
            </span>
          </div>
        </template>
        <template #hash="{ data }">
          <p>
            {{ data?.hash }}
            <i class="icon-copy text-primary font-semibold" />
          </p>
        </template>
        <template #course="{ data }">
          <p class="font-semibold">{{ data?.course }} ₽</p>
        </template>
        <template #date="{ data }">
          <DateTime :date="data?.date" :time="data?.date" />
        </template>
        <template #amount="{ data }">
          <CAmount
            :amount="data?.amount?.amount"
            :currency="data?.amount?.currency"
            :crypto="{
              amount: data?.amount?.crypto?.USDT?.amount,
              currency: data?.amount?.crypto?.USDT?.currency,
            }"
          />
        </template>

        <template #filter>
          <div class="flex gap-5">
            <FormFilterLabel :label="$t('interval_of_time')">
              <FilterDateRange
                class="bg-white"
                start-date-key="created_at__gte"
                end-date-key="created_at__lte"
              />
            </FormFilterLabel>
          </div>
        </template>
      </BaseTable>
    </div>
    <!--    <InfoModal-->
    <!--      :data="transactionModalItem"-->
    <!--      :modal-value="transactionModal"-->
    <!--      @close="transactionModal = false"-->
    <!--    />-->
    <BaseModal :title="$t('balance_page.top_up')" v-model="addBalanceModal">
      <FormGroup class="mb-3" :label="$t('balance_page.network')">
        <FormRadioGroup
          class="flex gap-5"
          :label-styles="'ml-1'"
          :active-class="'ml-1 text-primary'"
          :error="form.$v.value.network.$error"
          v-model="form.values.network"
          :items="network_options"
        />
      </FormGroup>
      <FormGroup :label="'TxID'">
        <FormInput
          :error="form.$v.value.hash.$error"
          v-model="form.values.hash"
          :placeholder="$t('balance_page.tx_placeholder')"
          class="w-full"
        />
      </FormGroup>
      <div class="flex gap-2 mt-3">
        <BaseButton
          class="flex-1"
          variant="neutral"
          :text="$t('rejecting.cancel')"
          :loading="loading"
          @click="addBalanceModal = false"
        />
        <BaseButton
          class="flex-1"
          :text="$t('balance_page.top_up')"
          :loading="loading"
          @click="addBalanceSend"
          :disabled="form.$v.value.$invalid"
        />
      </div>
    </BaseModal>
  </section>
</template>

<script lang="ts" setup>
import { useRouteQuery } from "@vueuse/router";
import { ref } from "vue";

import {
  BaseTable,
  BaseModal,
  FormGroup,
  BaseButton,
  FormInput,
  FormRadioGroup,
} from "@/components/Base";
import FilterDateRange from "@/components/Base/Form/DatePicker/FilterDateRange.vue";
import FormFilterLabel from "@/components/Base/Form/Label/FormFilterLabel.vue";
import { tableHead, tableSettings } from "@/modules/balance/data/PBalance";
import { CAmount } from "@/components/Common";
import { useI18n } from "vue-i18n";
import DateTime from "@/components/Common/DateTime.vue";
import { useForm } from "@/composables/useForm";
import { required } from "@vuelidate/validators";

const { t } = useI18n();

const form = useForm(
  {
    hash: "",
    network: "",
  },
  {
    hash: {
      required,
    },
    network: {
      required,
    },
  },
);
const network_options = ref([
  {
    id: "er20",
    name: "er20",
  },
  {
    id: "Trc20",
    name: "Trc20",
  },
]);
const addBalanceSend = () => {
  form.$v.value.$touch();
};
const status = useRouteQuery("status", t("statuses.all_statuses"));

const loading = ref(false);

const tableData = ref([
  {
    id: 37351,
    amount: {
      currency: "₽",
      amount: 8600,
      crypto: {
        USDT: {
          amount: 76,
          currency: "USDT",
        },
      },
    },
    date: "2025-07-17T10:30:00",
    course: 92.3,
    hash: "0x12345678904323R11344",
  },
  {
    id: 37351,
    amount: {
      currency: "₽",
      amount: 8600,
      crypto: {
        USDT: {
          amount: 76,
          currency: "USDT",
        },
      },
    },
    date: "2025-07-17T10:30:00",
    course: 92.3,
    hash: "0x12345678904323R11344",
  },

  {
    id: 37351,
    amount: {
      currency: "₽",
      amount: 8600,
      crypto: {
        USDT: {
          amount: 76,
          currency: "USDT",
        },
      },
    },
    date: "2025-07-17T10:30:00",
    course: 92.3,
    hash: "0x12345678904323R11344",
  },
  {
    id: 37351,
    amount: {
      currency: "₽",
      amount: 8600,
      crypto: {
        USDT: {
          amount: 76,
          currency: "USDT",
        },
      },
    },
    date: "2025-07-17T10:30:00",
    course: 92.3,
    hash: "0x12345678904323R11344",
  },
  {
    id: 37351,
    amount: {
      currency: "₽",
      amount: 8600,
      crypto: {
        USDT: {
          amount: 76,
          currency: "USDT",
        },
      },
    },
    date: "2025-07-17T10:30:00",
    course: 92.3,
    hash: "0x12345678904323R11344",
  },
  {
    id: 37351,
    amount: {
      currency: "₽",
      amount: 8600,
      crypto: {
        USDT: {
          amount: 76,
          currency: "USDT",
        },
      },
    },
    date: "2025-07-17T10:30:00",
    course: 92.3,
    hash: "0x12345678904323R11344",
  },
  {
    id: 37351,
    amount: {
      currency: "₽",
      amount: 8600,
      crypto: {
        USDT: {
          amount: 76,
          currency: "USDT",
        },
      },
    },
    date: "2025-07-17T10:30:00",
    course: 92.3,
    hash: "0x12345678904323R11344",
  },
]);

const paginationData = ref({
  total: tableData.value.length,
});

const transactionModal = ref(false);
const transactionModalItem = ref({});
const addBalanceModal = ref(false);
const addBalance = () => {
  addBalanceModal.value = true;
};

function openTransaction(d: unknown) {
  transactionModal.value = true;
  transactionModalItem.value = d;
}
</script>

<style scoped>
.linear-gradient {
  background: linear-gradient(90deg, #0047ab, #1ca9c9);
}
</style>
