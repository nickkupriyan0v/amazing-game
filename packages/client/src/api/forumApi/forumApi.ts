export const forumApi = createApi({
  reducerPath: 'forumApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api',
    credentials: 'include',
  }),

  endpoints: build => ({
    getTopics: build.query({
      query: () => '/topics',
    }),

    // GET /api/topics/:id
    getTopicById: build.query({
      query: (id: string | number) => `/topics/${id}`,
    }),

    // POST /api/topics
    createTopic: build.mutation({
      query: (body: { title: string; text: string; login: string }) => ({
        url: '/topics',
        method: 'POST',
        body,
      }),
    }),
    reactToTopic: build.mutation({
      query: ({
        topicId,
        reaction,
      }: {
        topicId: number
        reaction: string
      }) => ({
        url: `/topics/${topicId}/reactions`,
        method: 'POST',
        body: { reaction },
      }),
    }),
    getForumByName: build.query({
      query: (id: string) => `/${id}`,
    }),
    getCommentsById: build.query({
      query: (id: string) => `/${id}/comments`,
    }),
  }),
})

export const {
  useGetTopicsQuery,
  useGetTopicByIdQuery,
  useCreateTopicMutation,
  useReactToTopicMutation,
  useGetForumByNameQuery,
  useGetCommentsByIdQuery,
} = forumApi
