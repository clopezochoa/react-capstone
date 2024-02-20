import { AppointmentData, UserData, apiHeader, createAppointment } from 'app/lib/types';
import { NextResponse } from 'next/server';
import { connectMongo } from 'app/lib/mongo';

const registerReview = async (appointmentData: AppointmentData) => {
  if(!appointmentData || !appointmentData.doctor || !appointmentData.patient) throw new Error('Appointment data is incorrect!');
  const client = await connectMongo();
  const db = client.db(apiHeader.appointment_db!)
  const colleciton = db.collection(apiHeader.appointment_collection!);

  const filter = {"id": appointmentData.id};
  var appointment = await colleciton.find(filter)?.toArray();
  if(!appointment || appointment.length === 0) {
    client.close();
    throw new Error('Appointment already exists!');
  }
  const update = { $set: { review: appointmentData.review } };
  await colleciton.updateOne(filter, update);
  client.close();

  return {status: true, appointment: appointmentData};
}

export const POST = async (req: Request, res: Response) => {
  try {
    const appointmentData = await req.json() as AppointmentData;
    const auth = await registerReview(appointmentData);
    const status = auth.status;
    const appointment = auth.appointment;
    return NextResponse.json({state: status, appointment: appointment}, {status:201})
  } catch (error) {
    return NextResponse.json({message: "Error", error},
    {status: 500})
  }
}