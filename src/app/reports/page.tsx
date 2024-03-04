'use client'

import useReports from 'app/hooks/useReports';
import { useWindowWidth } from 'app/hooks/useWindow';
import { ReportDTO, ReportItem } from 'app/lib/types';
import { SessionContext } from 'app/provider';
import React, { CSSProperties, useContext, useEffect, useState } from 'react'
import 'styles/Reports.css'
import 'styles/headings.css'

const reportCardStyle: CSSProperties = {
  display:"flex",
  justifyContent: "space-between",
}
const reportButtonsStyle: CSSProperties = {
  fontWeight:"700"
}

function mobileTable(report: ReportDTO, index: number):React.JSX.Element {
  return (<>
  <div key={index} style={{color: "#384549", marginBlock:"3rem"}}>
    <div style={reportCardStyle} className={ReportItem.serial} key={index.toString() + "_" + ReportItem.serial}>
      <div className='me-5'>
        {ReportItem.serial}
      </div>
      <div>
        {report.serial}
      </div>
    </div>
    <div style={reportCardStyle} className={ReportItem.doctor} key={index.toString() + "_" + ReportItem.doctor}>
      <div className='me-5'>
        {ReportItem.doctor}
      </div>
      <div>
        {report.doctor}
      </div>
    </div>
    <div style={reportCardStyle} className={ReportItem.speciality} key={index.toString() + "_" + ReportItem.speciality}>
      <div className='me-5'>
        {ReportItem.speciality}
      </div>
      <div>
        {report.speciality}
      </div>
    </div>
    <div style={reportCardStyle}>
      <div style={reportButtonsStyle} className={ReportItem.inspect} key={index.toString() + "_" + ReportItem.inspect}>
        <a href={report.url} target="_blank" rel="noopener noreferrer">Inspect</a>
      </div>
      <div style={reportButtonsStyle} className={ReportItem.download} key={index.toString() + "_" + ReportItem.download}>
        <a href={report.url} download>Download</a>
      </div>
    </div>
  </div>
  </>);
}

function Page() {
  const session = useContext(SessionContext);
  const reports = useReports(session?.session.user!);
  const width = useWindowWidth(1920);
  const [table, setTable] = useState(<></>);
  useEffect(() => {
    if(width < 900) {
      setTable(<>
        <div style={{width: "max-content"}}>
          {reports.map((report, index) => mobileTable(report, index))}
        </div>
      </>
      );
    } else {
      setTable(
        <table className='table'>
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
      );
    }
  }, [reports, width])

  return (<>
    <center >
      <h1 id='review' className='head-big'>
        Reports
      </h1>
      {reports && reports.length > 0 ?
        table
       : null}
    </center>
  </>
  )
}

export default Page