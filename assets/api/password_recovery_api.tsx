import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'https://dummyjson.com'
export const passwordRecoveryApi: any = createApi({
    reducerPath: 'passwordRecoveryApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (build) => { 
        return {
        // 1 параметр - тип того, что возвращает сервер (ResultType)
        // 2 параметр - тип query аргументов (QueryArg)
          getIsEmail: build.query<any, string>({
            query: (email) => {
              return {
                method: "GET",
                url: `users/filter?key=email&value=${email}`,
                // params: {
                //   email: email,
                // },
              };
            },
          }),
        };
      },
})

export const { useGetIsEmailQuery } = passwordRecoveryApi