import { Tip, apiHeader } from 'app/lib/types';
import { NextResponse } from 'next/server';
import { connectMongo } from 'app/lib/mongo';

const postTip = async (tip: Tip) => {
  const client = await connectMongo();
  const db = client.db(apiHeader.tip_db!)
  const colleciton = db.collection(apiHeader.tip_collection!);
  await colleciton.insertOne(tip);
  client.close();
  return;
}

const getTips = async () => {
  const client = await connectMongo();
  const db = client.db(apiHeader.tip_db!)
  const colleciton = db.collection(apiHeader.tip_collection!);
  const tipData = await colleciton.find().toArray();
  client.close();
  return tipData;
}

export const GET = async (req: Request, res: Response) => {
  try {
    const data = await getTips();
    return NextResponse.json({data: data}, {status:201})
  } catch (error) {
    return NextResponse.json({message: "Error", error},
    {status: 500})
  } 
}

export const POST = async (req: Request, res: Response) => {
  try {
    const tipData = await req.json() as Tip;
    await postTip(tipData);
    return NextResponse.json({state: true}, {status:201})
  } catch (error) {
    return NextResponse.json({message: "Error", error},
    {status: 500})
  }
}