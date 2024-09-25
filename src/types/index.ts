import { QueryKey, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

export type UseQueryOptionsWrapper<
    // Return type of queryFn
    TQueryFn = unknown,
    // Type thrown in case the queryFn rejects
    E = Error,
    // Query key type
    TQueryKey extends QueryKey = any
> = Omit<UseQueryOptions<TQueryFn, E, TQueryFn, TQueryKey>, 'queryKey' | 'queryFn' | 'select'> & { localCaching?: boolean };

export type UseMutationOptionsWrapper<
    // Return type of queryFn
    TData = unknown,
    // Type thrown in case the queryFn rejects
    TError = Error,
    // Query key type
    TVariables = void,
    TContext = unknown
> = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>;

export type PromiseReturnType<T extends (...args: any) => Promise<any>> = T extends (...args: any) => Promise<infer U> ? U : never;

export type TQueryKey<TKey, TListQuery = any, TDetailQuery = any> = {
    all: [TKey];
    lists: () => [...TQueryKey<TKey>['all'], 'list'];
    list: (query?: TListQuery) => [...ReturnType<TQueryKey<TKey>['lists']>, { query: TListQuery | undefined }];
    details: () => [...TQueryKey<TKey>['all'], 'detail'];
    detail: (id: TDetailQuery) => [...ReturnType<TQueryKey<TKey>['details']>, TDetailQuery];
};

export interface PaginationInfo {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    resultCount: number;
    pageSize: number;
    nextPage: number;
    prevPage: number;
    totalCount: number;
    totalPages: number;
    page: number;
}

export interface ListWithPagination<T> {
    items: T[];
    pagination?: PaginationInfo;
}

export type PaginationQueryType<T = Record<string, any>> = {
    page?: number;
    pageSize?: number;
    sort?: string;
    filters?: T;
};

export enum PaymentMode {
    ETH,
    ERC20,
    FREE
}
