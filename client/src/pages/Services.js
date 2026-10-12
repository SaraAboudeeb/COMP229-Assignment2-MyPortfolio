import React from 'react';

function Services() {
  const serviceList = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Building modern, responsive, and interactive web applications using React, HTML, CSS, and JavaScript.'
    },
    {
      id: 2,
      title: 'IT & Network Support',
      description: 'Assisting with network configuration, troubleshooting technical issues, and supporting IT infrastructure.'
    },
    {
      id: 3,
      title: 'Data Management & Security',
      description: 'Managing data entry, ensuring data privacy compliance, and executing secure data erasure protocols.'
    }
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>My Services</h1>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
        {serviceList.map((service) => (
          <div key={service.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', width: '280px', backgroundColor: '#f9f9f9' }}>
            <h3 style={{ color: '#007bff' }}>{service.title}</h3>
            <p style={{ color: '#555', lineHeight: '1.5' }}>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;