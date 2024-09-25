import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 0,
            retry: (failureCount, error: any) => {
                return failureCount <= 1 && error?.response?.status >= 500;
            }
        }
    }
});
