// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { TilRecordDto } from '../../common';
import { getPosts } from '../../services/notion';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TilRecordDto[]>
) {
  const results = await getPosts();

  res.status(200).json(results)
}
