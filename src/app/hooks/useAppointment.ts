import { AppointmentData, UserData } from 'app/lib/types';
import { useEffect, useState } from 'react'

function useAppointmentsList(user: UserData) {
  const [appointments, setAppointments] = useState<Array<AppointmentData>>([]);

  const getAppointmentsList = async (user: UserData) => {
    try {
      const appointments = await fetch('/api/get-appointments-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const jsonAppointments = await appointments.json();
      
      if(jsonAppointments) {
        setAppointments(jsonAppointments);
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAppointmentsList(user);
  }, [])
    
  return appointments;
}

export default useAppointmentsList