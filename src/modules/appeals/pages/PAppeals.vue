<template>
  <section>
    <div class="bg-white px-6 rounded-xl">
      <BaseTable
        :data="tableData"
        :head="tableHead()"
        :loading="loading"
        :title="$t('appeals.title')"
        :subtitle="$t('appeals.count', { count: paginationData.total })"
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

        <template #device="{ data }">
          <CDevice :title="data?.device?.title" :id="data?.device?.id" />
        </template>

        <template #payment_method="{ data }">
          <CReqisites
            :number="data?.requisite?.number"
            :name="data?.requisite?.name"
            :bank="data?.requisite?.bank"
            :payment_method="data?.requisite?.payment_method"
          />
        </template>

        <template #actions="{ data }">
          <CAction
            :approve="$t('approve')"
            :reject="$t('reject')"
            @approve="approve(data)"
            @reject="reject(data)"
          />
        </template>

        <template #date="{ data }">
          <DateTime :date="data?.created_at" :time="data?.created_at" />
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
  </section>
</template>

<script lang="ts" setup>
import { useRouteQuery } from "@vueuse/router";
import { ref } from "vue";

import { BaseTable } from "@/components/Base";
import FilterDateRange from "@/components/Base/Form/DatePicker/FilterDateRange.vue";
import FormFilterLabel from "@/components/Base/Form/Label/FormFilterLabel.vue";
import { tableHead, tableSettings } from "@/modules/appeals/data/PAppeals";
import { CAmount, CDevice, CReqisites } from "@/components/Common";
import { useI18n } from "vue-i18n";
import DateTime from "@/components/Common/DateTime.vue";
import CAction from "@/components/Common/MiniComponents/CAction.vue";

const { t } = useI18n();

const status = useRouteQuery("status", t("statuses.all_statuses"));

const loading = ref(false);

const approve = () => {
  console.log("asd");
};
const reject = (data: object) => {
  console.log(data);
};

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
    requisite: {
      number: 1234123412341234,
      name: "Х.Алмамедов",
      bank: "Сбербанк",
      payment_method: "TPay",
    },
    device: {
      id: 24133,
      title: "Xiaomi Redmi",
    },
    created_at: "2025-07-17T10:30:00",
    end_at: "2025-07-17T10:30:00",
    status: "success",
  },
  {
    id: 37352,
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
    requisite: {
      number: 1234123412341234,
      name: "Х.Алмамедов",
      bank: "Сбербанк",
      payment_method: "TPay",
    },
    device: {
      id: 24133,
      title: "Xiaomi Redmi",
    },
    created_at: "2025-07-17T10:30:00",
    end_at: "2025-07-17T10:30:00",
    status: "pending",
  },
  {
    id: 37352,
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
    requisite: {
      number: 1234123412341234,
      name: "Х.Алмамедов",
      bank: "Сбербанк",
      payment_method: "TPay",
    },
    device: {
      id: 24133,
      title: "Xiaomi Redmi",
    },
    created_at: "2025-07-17T10:30:00",
    end_at: "2025-07-17T10:30:00",
    status: "canceled",
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
    requisite: {
      number: 1234123412341234,
      name: "Х.Алмамедов",
      bank: "Сбербанк",
      payment_method: "TPay",
    },
    device: {
      id: 24133,
      title: "Xiaomi Redmi",
    },
    created_at: "2025-07-17T10:30:00",
    end_at: "2025-07-17T10:30:00",
    status: "success",
  },
  {
    id: 37352,
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
    requisite: {
      number: 1234123412341234,
      name: "Х.Алмамедов",
      bank: "Сбербанк",
      payment_method: "TPay",
    },
    device: {
      id: 24133,
      title: "Xiaomi Redmi",
    },
    created_at: "2025-07-17T10:30:00",
    end_at: "2025-07-17T10:30:00",
    status: "pending",
  },
  {
    id: 37352,
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
    requisite: {
      number: 1234123412341234,
      name: "Х.Алмамедов",
      bank: "Сбербанк",
      payment_method: "TPay",
    },
    device: {
      id: 24133,
      title: "Xiaomi Redmi",
    },
    created_at: "2025-07-17T10:30:00",
    end_at: "2025-07-17T10:30:00",
    status: "canceled",
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
    requisite: {
      number: 1234123412341234,
      name: "Х.Алмамедов",
      bank: "Сбербанк",
      payment_method: "TPay",
    },
    device: {
      id: 24133,
      title: "Xiaomi Redmi",
    },
    created_at: "2025-07-17T10:30:00",
    end_at: "2025-07-17T10:30:00",
    status: "success",
  },
  {
    id: 37352,
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
    requisite: {
      number: 1234123412341234,
      name: "Х.Алмамедов",
      bank: "Сбербанк",
      payment_method: "TPay",
    },
    device: {
      id: 24133,
      title: "Xiaomi Redmi",
    },
    created_at: "2025-07-17T10:30:00",
    end_at: "2025-07-17T10:30:00",
    status: "pending",
  },
  {
    id: 37352,
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
    requisite: {
      number: 1234123412341234,
      name: "Х.Алмамедов",
      bank: "Сбербанк",
      payment_method: "TPay",
    },
    device: {
      id: 24133,
      title: "Xiaomi Redmi",
    },
    created_at: "2025-07-17T10:30:00",
    end_at: "2025-07-17T10:30:00",
    status: "canceled",
  },
]);

const paginationData = ref({
  total: tableData.value.length,
});

const transactionModal = ref(false);
const transactionModalItem = ref({});

function openTransaction(d: unknown) {
  transactionModal.value = true;
  transactionModalItem.value = d;
}
</script>

<style scoped>
.success_status {
  color: #16cc53 !important;
  background: #e3f9ea !important;
}

.pending_status {
  background: rgba(223, 189, 64, 0.12) !important;
  color: #dfbd40 !important;
}

.canceled_status {
  background: rgba(44, 45, 51, 0.12) !important;
  color: #2c2d33 !important;
}

.failed_status {
  background: rgba(229, 46, 48, 0.12);
  color: #e52e30 !important;
}
</style>
