import { connectMongo } from "app/lib/mongo";
import { UserData, apiHeader } from "app/lib/types";
import { NextResponse } from "next/server";

const getAllAppointments = async (userEmail: string) => {
  const client = await connectMongo();
  const db = client.db(apiHeader.appointment_db!)
  const colleciton = db.collection(apiHeader.appointment_collection!);  
  const patientAgenda = await colleciton.find({"patient.email": userEmail})?.toArray();
  await client.close()
  return patientAgenda;
}

export const POST = async (req: Request, res: Response) => {
  try {
    const userData = await req.json();
    const appointments = await getAllAppointments(userData.email);
    return NextResponse.json(appointments, {status:200})
  } catch (error) {
    return NextResponse.json({message: "Error", error},
    {status: 500})
  }
}