import { ReportDTO, UserData } from 'app/lib/types';
import { SessionContext } from 'app/provider';
import { useContext, useEffect, useState } from 'react'

function useAppointmentsList(user: UserData) {
  const [reports, setReports] = useState<Array<ReportDTO>>([]);
  const session = useContext(SessionContext);
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
    if(session?.session.isSession) getReportsList(user.email);
  }, [user])
    
  return reports;
}

export default useAppointmentsList