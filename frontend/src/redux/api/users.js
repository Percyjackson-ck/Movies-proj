import { apiSlice } from './apiSlice.js';
import { USER_URL } from '../constants.js';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = userApiSlice;