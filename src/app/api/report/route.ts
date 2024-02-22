import { connectMongo } from "app/lib/mongo";
import { apiHeader } from "app/lib/types";
import { NextResponse } from "next/server";

const getAllReports = async (userEmail: string) => {
  const client = await connectMongo();
  const db = client.db(apiHeader.reports_db!)
  const colleciton = db.collection(apiHeader.reports_collection!);  
  const patientReports = await colleciton.find({"user": userEmail})?.toArray();
  await client.close()
  return patientReports;
}

export const POST = async (req: Request, res: Response) => {
  try {
    const email = await req.json();
    const reports = await getAllReports(email);
    return NextResponse.json(reports, {status:200})
  } catch (error) {
    return NextResponse.json({message: "Error", error},
    {status: 500})
  }
}