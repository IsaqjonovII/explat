import { computed, onBeforeMount, reactive, watch, watchEffect } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { useRoute, useRouter } from "vue-router";
import { useRouteQuery } from "@vueuse/router";
import { apiService } from "@/services";

type TableDataResponse<T> = {
  results: T[];
  total: number;
  count: number;
};

const INITIAL_LIMIT = 10;
const INITIAL_PAGE = 1;

export const useTableFetch = <T>(
  url: string,
  initialParams = {},
  ignoredParams: string[] = ["tab"],
  noResults = false,
  defaultPageSize = INITIAL_LIMIT
) => {
  const route = useRoute();
  const router = useRouter();
  const search = useRouteQuery<string>("search", "");

  const userLimit = (initialParams as any).limit ?? 10;

  const pagination = reactive({
    total: 0,
    limit: useRouteQuery<number>("limit", userLimit, {
      transform: Number,
    }),
    page: useRouteQuery<number>("page", INITIAL_PAGE, { transform: Number }),
    offset: 0,
  });

  const offset = computed(() => (pagination.page - 1) * pagination.limit);

  const params = computed(() => {
    const allParams: { [key: string]: string | number } = {
      ...initialParams,
      limit: pagination.limit,
      offset: offset.value,
    };
    Object.keys(route.query).forEach((key) => {
      if (!ignoredParams.includes(key)) {
        allParams[key] = route.query[key] as string | number;
      }
    });
    return allParams;
  });

  const queryKey = computed(() => [
    "tableData",
    url,
    {
      ...params.value,
      page: pagination.page,
      limit: pagination.limit,
    },
  ]);

  const fetchTableData = async (url: string, options: any) => {
    return await apiService.$get<TableDataResponse<T>>(url, options);
  };

  const { data, error, refetch, isLoading } = useQuery({
    queryKey,
    queryFn: () => fetchTableData(url, { params: params.value }), // Ensure this is not re-created unnecessarily
    enabled: !!url,
  });

  watch([isLoading, error, data], () => {
    if (!isLoading.value && !error.value && data.value) {
      pagination.total = data.value.count || 0;
    }
  });

  // Ensure pagination.total is restored when the component is mounted or query data changes
  watchEffect(() => {
    if (data.value && data.value.count) {
      pagination.total = data.value.count;
    }
  });

  const onPageChange = (page: number) => {
    if (page && page !== pagination.page) {
      pagination.page = page;
      router.push({ query: { ...route.query, page: page.toString() } });
    }
  };

  watchEffect(() => {
    const newQuery = route.query;
    const newLimit = newQuery["limit"] ? Number(newQuery["limit"]) : userLimit;
    const newPage = Number(newQuery["page"]) || INITIAL_PAGE;
    const newSearch = newQuery["search"] || "";

    if (newSearch !== search.value) {
      pagination.limit = defaultPageSize;
      pagination.page = INITIAL_PAGE;
      search.value = Array.isArray(newSearch) ? newSearch[0] : newSearch;
    } else {
      pagination.limit = newLimit;
      pagination.page = newPage;
    }
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  onBeforeMount(() => {
    scrollToTop();
  });

  const tableData = computed(
    () =>
      (data.value ? (noResults ? data.value : data.value.results) : []) as T[]
  );

  return {
    tableData,
    pagination,
    isLoading,
    error,
    onPageChange,
    refetch,
  };
};
