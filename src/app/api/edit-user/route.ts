import { connectMongo } from "app/lib/mongo";
import { UserData, apiHeader } from "app/lib/types";
import { NextResponse } from "next/server";

const changeUserData = async (userData: {newUser: UserData, user: UserData}) => {
  console.log("🚀 ~ changeUserData ~ userData:", userData)
  const client = await connectMongo();
  const db = client.db(apiHeader.user_db!)
  const colleciton = db.collection(apiHeader.user_collection!);

  const filter = { email: userData.user.email };
  const user = await colleciton.findOne(filter);
  var result = false;
  
  if(user) {
    console.log("🚀 ~ changeUserData ~ user:", user)
    const update = { $set: { email: userData.newUser.email, phone: userData.newUser.phone, name: userData.newUser.name } };
    const updateResult = await colleciton.updateOne(filter, update);
    console.log("🚀 ~ changeUserData ~ updateResult:", updateResult)
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
    const user = await req.json() as {newUser: UserData, user: UserData};
    const auth = await changeUserData(user);
    return NextResponse.json(auth, {status:200})
  } catch (error) {
    return NextResponse.json({message: "Error", error},
    {status: 500})
  }
}