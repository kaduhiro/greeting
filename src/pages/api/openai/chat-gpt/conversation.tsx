import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Configuration, OpenAIApi } from 'openai';
import { RequiredError } from 'openai/dist/base';

import { ResponseAssistantData } from '@/generated/type';
import { ApiError } from '@/types';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseAssistantData | ApiError>) => {
  try {
    const { prompt } = req.body;

    if (prompt?.match(/^[0-9a-z]+$/gi)) {
      return res.status(StatusCodes.OK).json({ text: `Do you mean "${prompt}"? Please enter a sentence.` });
    }

    const openai = new OpenAIApi(
      new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      })
    );

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1024,
      // top_p: 0.9
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.status(StatusCodes.OK).json({ text: completion.data.choices[0].message?.content ?? '' });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
      res.status(status).json({ status, message: `Have you set up your API? (${error.message})` });
    } else if (error instanceof RequiredError) {
      res
        .status(StatusCodes.FORBIDDEN)
        .json({ status: StatusCodes.FORBIDDEN, message: `Are you allowed to use the API? (${error.message})` });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ status: StatusCodes.INTERNAL_SERVER_ERROR, message: 'Unknown error.' });
    }
  }
};

export default handler;
