import React from 'react'
import 'styles/services.css'
import 'styles/buttons.css'
import 'styles/headings.css'
import ImgFromCloud from '../utils/ImageFromCloud';
import Link from 'next/link';
import { ServiceLink, services } from 'app/lib/types';

const links = new Map<ServiceLink, string> ([
  [ServiceLink.instantConsultation, "instant-consultation"],
  [ServiceLink.bookAppointment, "book-appointment"],
  [ServiceLink.selfCheckup, "self-checkup"],
  [ServiceLink.healthTips, "heath-tips"]
]);

function Services() {
  return (
    <>
      <h1 id='services' className='head-big'>
        Best Services
      </h1>
      <h2 className='head-gradient'>
        Love yourself enough to live a healthy lifestyle.
      </h2>
      <div className="services-catalog">
        {services.map(service =>
        <Link key={service + '_link'} href={links.get(service)!}>
          <div key={service + '_div'} className='service-item'>
            <ImgFromCloud key={service} filename={service} filetype="img" format="png" width={250} height={250} altText={`illustration for ${service}`} />
            <label key={service + '_label'} className='services-caption'>{service}</label>
          </div>
        </Link>
        )}
      </div>
  </>
  )
}

export default Services