import { AppointmentDTO, AppointmentData, apiHeader, createAppointment } from 'app/lib/types';
import { NextResponse } from 'next/server';
import { connectMongo } from 'app/lib/mongo';
import { compareDate } from 'app/lib/helper';


const bookAppointment = async (appointmentData: AppointmentData) => {
  if(!appointmentData || !appointmentData.doctor || !appointmentData.patient) throw new Error('Appointment data is incorrect!');
  const client = await connectMongo();
  const db = client.db(apiHeader.appointment_db!)
  const colleciton = db.collection(apiHeader.appointment_collection!);

  const doctorAgenda = await colleciton.find({"doctor.name": appointmentData.doctor.name})?.toArray();
  if(doctorAgenda && doctorAgenda.length > 0) {
    const alreadyBookedByUser = doctorAgenda.filter(appointment => appointment?.patient?.name === appointmentData.patient.name);
    if(alreadyBookedByUser && alreadyBookedByUser.length > 0) {
      alreadyBookedByUser.forEach(userAppointment => {
        if(!compareDate(userAppointment.date, userAppointment.time)){
          client.close();
          throw new Error('Appointment already exists!');
        }
      });
    }
    const alreadyBookedByOther = doctorAgenda.filter(appointment => appointment?.time === appointmentData.time);
    if(alreadyBookedByOther && alreadyBookedByOther.length > 0) {
      client.close();
      throw new Error('The desired doctor is not available at that time slot!');
    }
  }
  
  const appointment = await colleciton.insertOne(appointmentData);
  client.close();

  return {status: true, appointment: createAppointment(appointmentData.time, appointmentData.date, appointmentData.patient, appointmentData.doctor, appointment?.insertedId.toString())};
}

const cancelAppointment = async (appointmentDTO: AppointmentDTO) => {
  if(!appointmentDTO || !appointmentDTO.doctor || !appointmentDTO.patient) throw new Error('Appointment data is incorrect!');
  const client = await connectMongo();
  const db = client.db(apiHeader.appointment_db!)
  const colleciton = db.collection(apiHeader.appointment_collection!);

  const stat = await colleciton.deleteOne({
    "doctor.name": appointmentDTO.doctor,
    "patient.name": appointmentDTO.patient,
    "time": appointmentDTO.time,
    "date": appointmentDTO.date
  });

  client.close();
  return stat;
}

export const POST = async (req: Request, res: Response) => {
  try {
    const appointmentData = await req.json() as AppointmentData;
    const auth = await bookAppointment(appointmentData);
    const status = auth.status;
    const appointment = auth.appointment;
    return NextResponse.json({state: status, appointment: appointment}, {status:201})
  } catch (error) {
    return NextResponse.json({message: "Error", error},
    {status: 500})
  }
}


export const DELETE = async (req: Request, res: Response) => {
  try {
    const appointmentDTO = await req.json() as AppointmentDTO;
    const result = await cancelAppointment(appointmentDTO);
    return NextResponse.json({state: result.deletedCount}, {status:200})
  } catch (error) {
    return NextResponse.json({message: "Error", error},
    {status: 500})
  }
}
