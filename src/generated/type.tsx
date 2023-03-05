export type ResponseTweetData = {
  id: string;
  user: {
    name: string;
    screen_name: string;
  };
  text: string;
  created_at: string;
};
