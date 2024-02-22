import { connectMongo } from "app/lib/mongo";
import { PasswordDTO, UserData, apiHeader, createUserData } from "app/lib/types";
import { compare } from "bcrypt-ts";
import { NextResponse } from "next/server";

const changePassword = async (password: PasswordDTO) => {
  const client = await connectMongo();
  const db = client.db(apiHeader.user_db!)
  const colleciton = db.collection(apiHeader.user_collection!);

  const filter = { email: password.email };
  const update = { $set: { password: password.new } };
  const user = await colleciton.findOne(filter);
  
  var result = false;
  
  if(user) {
    const hash = user.password;
    const matchPassword = await compare(password.current, hash);
    if (!matchPassword) {
      await client.close();
      throw new Error('Username or password is incorrect!');
    }
    const updateResult = await colleciton.updateOne(filter, update);
    if(updateResult.modifiedCount > 0) result = true;
  } else {
    await client.close();
    throw new Error('The user doesn\'t exist!');
  }

  await client.close();
  return result;
}

export const POST = async (req: Request, res: Response) => {
  try {
    const password = await req.json() as PasswordDTO;
    const auth = await changePassword(password);
    return NextResponse.json(auth, {status:200})
  } catch (error) {
    return NextResponse.json({message: "Error", error},
    {status: 500})
  }
}