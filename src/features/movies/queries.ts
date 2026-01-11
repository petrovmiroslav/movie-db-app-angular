import {
  infiniteQueryOptions,
  injectInfiniteQuery,
  injectQuery,
  queryOptions,
} from '@tanstack/angular-query-experimental';
import { HttpClient } from '@angular/common/http';
import { Signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { getNextPageNumber } from '../../utils/pagination/pagination';
import { FetchPopularMoviesApiParams } from './api/fetchPopularMoviesApi/types';
import { fetchPopularMoviesApi } from './api/fetchPopularMoviesApi/fetchPopularMoviesApi';
import { FetchTopRatedMoviesApiParams } from './api/fetchTopRatedMoviesApi/types';
import { fetchTopRatedMoviesApi } from './api/fetchTopRatedMoviesApi/fetchTopRatedMoviesApi';
import { fetchMovieApi } from './api/fetchMovieApi/fetchMovieApi';
import { FetchMovieApiParams } from './api/fetchMovieApi/types';
import { fetchRecommendationsMoviesApi } from './api/fetchRecommendationsMoviesApi/fetchRecommendationsMoviesApi';
import { FetchRecommendationsMoviesApiParams } from './api/fetchRecommendationsMoviesApi/types';
import { fetchSimilarMoviesApi } from './api/fetchSimilarMoviesApi/fetchSimilarMoviesApi';
import { FetchSimilarMoviesApiParams } from './api/fetchSimilarMoviesApi/types';
import { searchMoviesApi } from './api/searchMoviesApi/searchMoviesApi';
import { SearchMoviesApiParams } from './api/searchMoviesApi/types';
import { discoverMovieApi } from './api/discoverMovieApi/discoverMovieApi';
import { DiscoverMovieApiParams } from './api/discoverMovieApi/types';

export const moviesQueries = {
  _def: ['movies'],
  movie: (http: HttpClient) => (params: FetchMovieApiParams | null | undefined) => {
    return queryOptions({
      queryKey: [...moviesQueries._def, 'movie', { ...params }] as const,
      queryFn: () =>
        params
          ? lastValueFrom(
              fetchMovieApi(http)({
                ...params,
              }),
            )
          : Promise.reject(new Error('Invalid params')),
      enabled: Boolean(params),
    });
  },
  popularInfiniteList:
    (http: HttpClient) => (params: FetchPopularMoviesApiParams | null | undefined) => {
      return infiniteQueryOptions({
        queryKey: [...moviesQueries._def, 'popularInfiniteList', { ...params }] as const,
        queryFn: (ctx) =>
          params
            ? lastValueFrom(
                fetchPopularMoviesApi(http)({
                  ...params,
                  page: ctx?.pageParam ?? 1,
                }),
              )
            : Promise.reject(new Error('Invalid params')),
        enabled: Boolean(params),
        initialPageParam: 1,
        getNextPageParam: getNextPageNumber,
      });
    },
  topRatedInfiniteList:
    (http: HttpClient) => (params: FetchTopRatedMoviesApiParams | null | undefined) => {
      return infiniteQueryOptions({
        queryKey: [...moviesQueries._def, 'topRatedInfiniteList', { ...params }] as const,
        queryFn: (ctx) =>
          params
            ? lastValueFrom(
                fetchTopRatedMoviesApi(http)({
                  ...params,
                  page: ctx?.pageParam ?? 1,
                }),
              )
            : Promise.reject(new Error('Invalid params')),
        enabled: Boolean(params),
        initialPageParam: 1,
        getNextPageParam: getNextPageNumber,
      });
    },
  recommendationsInfiniteList:
    (http: HttpClient) => (params: FetchRecommendationsMoviesApiParams | null | undefined) => {
      return infiniteQueryOptions({
        queryKey: [...moviesQueries._def, 'recommendationsInfiniteList', { ...params }] as const,
        queryFn: (ctx) =>
          params
            ? lastValueFrom(
                fetchRecommendationsMoviesApi(http)({
                  ...params,
                  page: ctx?.pageParam ?? 1,
                }),
              )
            : Promise.reject(new Error('Invalid params')),
        enabled: Boolean(params),
        initialPageParam: 1,
        getNextPageParam: getNextPageNumber,
      });
    },
  similarInfiniteList:
    (http: HttpClient) => (params: FetchSimilarMoviesApiParams | null | undefined) => {
      return infiniteQueryOptions({
        queryKey: [...moviesQueries._def, 'similarInfiniteList', { ...params }] as const,
        queryFn: (ctx) =>
          params
            ? lastValueFrom(
                fetchSimilarMoviesApi(http)({
                  ...params,
                  page: ctx?.pageParam ?? 1,
                }),
              )
            : Promise.reject(new Error('Invalid params')),
        enabled: Boolean(params),
        initialPageParam: 1,
        getNextPageParam: getNextPageNumber,
      });
    },
  searchMovieInfiniteList:
    (http: HttpClient) => (params: SearchMoviesApiParams | null | undefined) => {
      return infiniteQueryOptions({
        queryKey: [...moviesQueries._def, 'searchMovieInfiniteList', { ...params }] as const,
        queryFn: (ctx) =>
          params
            ? lastValueFrom(
                searchMoviesApi(http)({
                  ...params,
                  page: ctx?.pageParam ?? 1,
                }),
              )
            : Promise.reject(new Error('Invalid params')),
        enabled: Boolean(params),
        initialPageParam: 1,
        getNextPageParam: getNextPageNumber,
      });
    },
  discoverMovieInfiniteList:
    (http: HttpClient) => (params: DiscoverMovieApiParams | null | undefined) => {
      return infiniteQueryOptions({
        queryKey: [...moviesQueries._def, 'discoverMovieInfiniteList', { ...params }] as const,
        queryFn: (ctx) =>
          params
            ? lastValueFrom(
                discoverMovieApi(http)({
                  ...params,
                  page: ctx?.pageParam ?? 1,
                }),
              )
            : Promise.reject(new Error('Invalid params')),
        enabled: Boolean(params),
        initialPageParam: 1,
        getNextPageParam: getNextPageNumber,
      });
    },
} as const;

export const useMovieQuery =
  (http: HttpClient) => (params: Signal<Parameters<ReturnType<typeof moviesQueries.movie>>[0]>) =>
    injectQuery(() => moviesQueries.movie(http)(params()));

export const usePopularMovieInfiniteListQuery = (http: HttpClient) => () =>
  injectInfiniteQuery(() => moviesQueries.popularInfiniteList(http)({}));

export const useTopRatedMovieInfiniteListQuery = (http: HttpClient) => () =>
  injectInfiniteQuery(() => moviesQueries.topRatedInfiniteList(http)({}));

export const useRecommendationsMovieInfiniteListQuery =
  (http: HttpClient) =>
  (params: Signal<Parameters<ReturnType<typeof moviesQueries.recommendationsInfiniteList>>[0]>) =>
    injectInfiniteQuery(() => moviesQueries.recommendationsInfiniteList(http)(params()));

export const useSimilarMovieInfiniteListQuery =
  (http: HttpClient) =>
  (params: Signal<Parameters<ReturnType<typeof moviesQueries.similarInfiniteList>>[0]>) =>
    injectInfiniteQuery(() => moviesQueries.similarInfiniteList(http)(params()));

export const useSearchMovieInfiniteListQuery =
  (http: HttpClient) =>
  (params: Signal<Parameters<ReturnType<typeof moviesQueries.searchMovieInfiniteList>>[0]>) =>
    injectInfiniteQuery(() => moviesQueries.searchMovieInfiniteList(http)(params()));

export const useDiscoverMovieInfiniteListQuery =
  (http: HttpClient) =>
  (params: Signal<Parameters<ReturnType<typeof moviesQueries.discoverMovieInfiniteList>>[0]>) =>
    injectInfiniteQuery(() => moviesQueries.discoverMovieInfiniteList(http)(params()));
