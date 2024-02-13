import { Cookies, Doctor } from 'app/lib/types';
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';

function useDoctorsList() {
  const [doctors, setDoctors] = useState<Array<Doctor>>([]);
  const [doctorCookie, setDoctorCookie, deleteDoctorCookie] = useCookies([Cookies.doctorsList]);

  const getDoctorsList = async () => {
    try {
      const doctors = await fetch('/api/get-doctor-info', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const jsonDoctors = await doctors.json();
      
      setDoctorCookie(Cookies.doctorsList, JSON.stringify(jsonDoctors.doctors), {
        path: "/",
        maxAge: 3600,
        sameSite: true,
      });
      
      if(jsonDoctors.doctors) {
        setDoctors(jsonDoctors.doctors);
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getDoctorsList();
  }, [])
    
  return doctors;
}

export default useDoctorsList