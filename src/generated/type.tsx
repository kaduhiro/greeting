export type ResponseTweetData = {
  id: string;
  user: {
    name: string;
    screen_name: string;
  };
  text: string;
  created_at: string;
};

export type RequestAssistantData = {
  prompt: string;
};

export type ResponseAssistantData = {
  text: string;
};
