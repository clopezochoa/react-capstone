'use client'

import useReports from 'app/hooks/useReports';
import { ReportItem } from 'app/lib/types';
import { SessionContext } from 'app/provider';
import React, { useContext, useEffect } from 'react'
import 'styles/Reports.css'
import 'styles/headings.css'

function Page() {
  const session = useContext(SessionContext);
  const reports = useReports(session?.session.user!);

  

  return (<>
    <center >
      <h1 id='review' className='head-big'>
        Reports
      </h1>
      {reports && reports.length > 0 ? <table className='table'>
        <tr className='heading'>
          <th className={ReportItem.serial}>
            {ReportItem.serial}
          </th>
          <th className={ReportItem.doctor}>
            {ReportItem.doctor}
          </th>
          <th className={ReportItem.speciality}>
            {ReportItem.speciality}
          </th>
          <th className={ReportItem.inspect}>
            {ReportItem.inspect}
          </th>
          <th className={ReportItem.download}>
            {ReportItem.download}
          </th>
        </tr>
          {reports.map((report, index) => <>
            <tr className='data'>
              <td className={ReportItem.serial} key={index.toString() + "_" + ReportItem.serial}>{report.serial}. </td>
              <td className={ReportItem.doctor} key={index.toString() + "_" + ReportItem.doctor}>{report.doctor}</td>
              <td className={ReportItem.speciality} key={index.toString() + "_" + ReportItem.speciality}>{report.speciality}</td>
              <td className={ReportItem.inspect} key={index.toString() + "_" + ReportItem.inspect}>
                <a href={report.url} target="_blank" rel="noopener noreferrer">Inspect</a>
              </td>
              <td className={ReportItem.download} key={index.toString() + "_" + ReportItem.download}>
                <a href={report.url} download>Download</a>
              </td>
            </tr>
          </>
          )}
      </table>
       : null}
    </center>
  </>
  )
}

export default Page