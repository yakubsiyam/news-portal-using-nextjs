import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getNewses: builder.query({
      query: () => "/news",
    }),
    getSingleNews: builder.query({
      query: (id) => `/news/${id}`,
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetNewsesQuery, useGetSingleNewsQuery } = apiSlice;
