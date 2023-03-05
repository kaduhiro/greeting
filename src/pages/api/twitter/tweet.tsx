import { StatusCodes } from 'http-status-codes';
import { getToken } from 'next-auth/jwt';
import Twitter, { ApiResponseError } from 'twitter-api-v2';

import { ResponseTweetData } from '@/generated/type';
import { ApiError } from '@/types';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseTweetData | ApiError>) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ status: StatusCodes.UNAUTHORIZED, message: 'Unauthorized.' });
  }

  try {
    const credentials = {
      appKey: process.env.TWITTER_ID ?? '',
      appSecret: process.env.TWITTER_SECRET ?? '',
      accessToken: token.twitter?.access_token ?? '',
      accessSecret: token.twitter?.access_token_secret ?? '',
    };

    const { title, body } = req.body;

    const status = `${title.trim()}\n${body.trim()}`.trim();
    if (!status.length) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ status: StatusCodes.BAD_REQUEST, message: 'Title and Body are empty.' });
    }

    const client = new Twitter(credentials);

    const result = await client.v1.tweet(status);

    return res.status(StatusCodes.OK).json({
      id: result.id_str,
      user: { name: result.user.name, screen_name: result.user.screen_name },
      text: result.text,
      created_at: result.created_at,
    });
  } catch (error) {
    if (error instanceof ApiResponseError) {
      return res.status(error.code).json({ status: error.code, message: error.message });
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: StatusCodes.INTERNAL_SERVER_ERROR, message: 'Unknown error.' });
  }
};

export default handler;
