import { ReportDTO, UserData } from 'app/lib/types';
import { useEffect, useState } from 'react'

function useAppointmentsList(user: UserData) {
  const [reports, setReports] = useState<Array<ReportDTO>>([]);

  const getReportsList = async (email: string) => {
    try {
      const reports = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(email),
      });
      const jsonReports = await reports.json();
      
      if(jsonReports) {
        setReports(jsonReports);
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getReportsList(user.email);
  }, [user])
    
  return reports;
}

export default useAppointmentsList