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



    Register:builder.mutation({
      query:(data)=>({
        url:`${USER_URL}`,
        method:"POST",
        body:data,
      }),
    }),

   logout:builder.mutation({
     query:()=>({
      url:`${USER_URL}/logout`,
      method:"POST"
     }),
  }),
  profile:builder.mutation({
    query:(data)=>({
      url:`${USER_URL}/profile`,
      method:'PUT',
      body:data,
    })
  })

  }),
});

export const { useLoginMutation ,useRegisterMutation,useLogoutMutation,useProfileMutation} = userApiSlice;