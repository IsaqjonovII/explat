import { QueryClient } from "@tanstack/vue-query";

class QueryClientService {
  private static instance: QueryClientService;
  private queryClient: QueryClient;

  private constructor() {
    this.queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 10, // 5 minutes
          retry: 0, // Retry failed queries once
        },
      },
    });
  }

  // Singleton pattern to ensure only one instance of QueryClientService
  public static getInstance(): QueryClientService {
    if (!QueryClientService.instance) {
      QueryClientService.instance = new QueryClientService();
    }
    return QueryClientService.instance;
  }

  // Get the QueryClient instance
  public getQueryClient(): QueryClient {
    return this.queryClient;
  }

  public clearQueries() {
    this.queryClient.clear();
  }
}

export default QueryClientService;
