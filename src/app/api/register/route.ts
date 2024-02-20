import { UserData, apiHeader, createUserData } from 'app/lib/types';
import { NextResponse } from 'next/server';
import { connectMongo } from 'app/lib/mongo';

const registerUser = async (userData: UserData) => {
  const client = await connectMongo();
  const db = client.db(apiHeader.user_db!)
  const colleciton = db.collection(apiHeader.user_collection!);

  const checkExisting = await colleciton.findOne({ email: userData.email });
  
  if (checkExisting) {
    await client.close();
    throw new Error('User already exists!');
  }

  await colleciton.insertOne(userData);
  const user = await colleciton.findOne({ email: userData.email });

  client.close();

  return {status: true, user: user};
}

export const POST = async (req: Request, res: Response) => {
  try {
    const userData = await req.json() as UserData;
    const auth = await registerUser(userData);
    const status = auth.status;
    const user = auth.user;
    return NextResponse.json({state: status, user: createUserData(user?.email, null, user?.role, user?.name, user?.phone, user?.id)}, {status:201})
  } catch (error) {
    return NextResponse.json({message: "Error", error},
    {status: 500})
  }
}