import { UserData, apiHeader } from 'app/lib/types';
import { NextResponse } from 'next/server';
import { connectMongo } from 'app/lib/mongo';

const registerUser = async (userData: UserData) => {
  const client = await connectMongo();
  const db = client.db(apiHeader.db_name!)
  const colleciton = db.collection(apiHeader.colleciton_name!);

  const checkExisting = await colleciton.findOne({ email: userData.email });
  
  if (checkExisting) {
    await client.close();
    throw new Error('User already exists!');
  }

  const user = await colleciton.insertOne(userData);
  client.close();

  return {status: true, id: userData.id, name: userData.name};
}

export const POST = async (req: Request, res: Response) => {
  try {
    const userData = await req.json() as UserData;
    const user = await registerUser(userData);
    return NextResponse.json({user: {state: user?.status, id: user?.id, name: user?.name}}, {status:201})
  } catch (error) {
    return NextResponse.json({message: "Error", error},
    {status: 500})
  }
}