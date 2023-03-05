export const REQUEST_TYPE = {
  create: 'create',
  read: 'read',
  update: 'update',
  delete: 'delete',
} as const;

export const TWITTER = {
  cacheKey: {
    tweet: 'tweet',
  },
} as const;

export const ASSISTANT = {
  cacheKey: {
    assistant: 'assistant',
  },
} as const;
