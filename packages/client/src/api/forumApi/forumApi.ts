import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const forumApi = createApi({
  reducerPath: 'forumApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api',
    credentials: 'include',
  }),
  tagTypes: ['Topics', 'Comments', 'Replies'],
  endpoints: build => ({
    getTopics: build.query({
      query: () => '/topics',
      providesTags: ['Topics'],
    }),
    getTopicById: build.query({
      query: (id: string | number) => `/topics/${id}`,
      providesTags: (result, error, id) => [{ type: 'Topics', id }],
    }),

    createTopic: build.mutation({
      query: (body: { title: string; text: string; login: string }) => ({
        url: '/topics',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Topics'],
    }),
    getForumByName: build.query({
      query: (id: string) => `/${id}`,
    }),
    getCommentsById: build.query({
      query: (id: string | number) => `/comments/${id}`,
      providesTags: (result, error, id) => [{ type: 'Comments', id }],
    }),
    createComment: build.mutation({
      query: ({
        id,
        text,
        login,
      }: {
        text: string
        login: string
        id: string | number
      }) => ({
        url: `/topics/${id}/comments`,
        method: 'POST',
        body: { text, login },
      }),
      invalidatesTags: ['Topics', 'Comments'],
    }),
    createReply: build.mutation({
      query: ({
        id,
        text,
        login,
      }: {
        text: string
        login: string
        id: string | number
      }) => ({
        url: `/comments/${id}/replies`,
        method: 'POST',
        body: { text, login },
      }),
      invalidatesTags: ['Comments', 'Replies'],
    }),
  }),
})

export const {
  useGetTopicsQuery,
  useGetTopicByIdQuery,
  useCreateTopicMutation,
  useGetForumByNameQuery,
  useGetCommentsByIdQuery,
  useCreateCommentMutation,
  useCreateReplyMutation,
} = forumApi
