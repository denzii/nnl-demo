import { mapToGraphData } from '@/dfs';
import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../lib/mongodb";

type Data =  {
  nodes: {
      id: number;
      name: string;
      dependencies: number[];
      startDate: Date;
      endDate: Date;
  }[];
  links: {
      source: number;
      target: number;
  }[];
} | {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
   try {
       const client = await clientPromise;
       const db = client.db();

      const graphData = mapToGraphData(req.body)
       const response = await db
           .collection("graph")
           .insertOne(graphData)

        if (!response.insertedId) res.status(500).json({})
        res.status(200).json(graphData)
   } catch (e) {
       console.error(e);
   }
};