import { connectMongo } from "app/lib/mongo";
import { UserData, apiHeader, createUserData } from "app/lib/types";
import { compare } from "bcrypt-ts";
import { NextResponse } from "next/server";

const authenticateUser = async (userData: UserData) => {
  const client = await connectMongo();
  const db = client.db(apiHeader.user_db!)
  const colleciton = db.collection(apiHeader.user_collection!);

  const user = await colleciton.findOne({ email: userData.email });
  
  if (!user) {
    await client.close();
    throw new Error('The user doesn\'t exist!');
  }

  const hash = user.password;
  const matchPassword = await compare(userData.password, hash);

  if (!matchPassword) {
    await client.close();
    throw new Error('Username or password is incorrect!');
  }

  await client.close();
  return {user: user, status: matchPassword};
}

export const POST = async (req: Request, res: Response) => {
  try {
    const userData = await req.json() as UserData;
    const auth = await authenticateUser(userData);
    const status = auth.status;
    const user = auth.user;
    return NextResponse.json({state: status, user: createUserData(user?.email, null, user?.role, user?.name, user?.phone, user?.id)}, {status:200})
  } catch (error) {
    return NextResponse.json({message: "Error", error},
    {status: 500})
  }
}