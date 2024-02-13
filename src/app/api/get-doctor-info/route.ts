import { connectMongo } from "app/lib/mongo";
import { apiHeader } from "app/lib/types";
import { NextResponse } from "next/server";

const getAllDoctors = async () => {
  const client = await connectMongo();
  const db = client.db(apiHeader.doctor_db!)
  const colleciton = db.collection(apiHeader.doctor_collection!);

  const doctors = await colleciton.find().toArray();
  await client.close()
  return doctors;
}

export const GET = async (req: Request, res: Response) => {
  try {
    const doctors = await getAllDoctors();
    return NextResponse.json({doctors: doctors}, {status:200})
  } catch (error) {
    return NextResponse.json({message: "Error", error},
    {status: 500})
  }
}