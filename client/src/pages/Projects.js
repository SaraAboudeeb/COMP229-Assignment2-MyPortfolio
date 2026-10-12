import React from 'react';

function Projects() {
  const projectList = [
    {
      id: 1,
      title: 'E-Commerce Website',
      image: 'https://via.placeholder.com/300x180',
      description: 'An online shopping platform built for selling products with shopping cart support.',
      role: 'Frontend Developer',
      outcome: 'Improved checkout speed by 20% and enhanced overall user experience.'
    },
    {
      id: 2,
      title: 'Task Tracker App',
      image: 'https://via.placeholder.com/300x180',
      description: 'A React application to help users organize daily tasks and schedules.',
      role: 'Full Stack Developer',
      outcome: 'Successfully created a responsive UI with real-time state management.'
    },
    {
      id: 3,
      title: 'Portfolio Website',
      image: 'https://via.placeholder.com/300x180',
      description: 'A personal website showcasing personal projects, skills, and qualifications.',
      role: 'UI/UX Designer & Developer',
      outcome: 'Built a multi-page interactive web portfolio using React Router.'
    }
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>My Projects</h1>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
        {projectList.map((project) => (
          <div key={project.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', width: '300px' }}>
            <img src={project.image} alt={project.title} style={{ width: '100%', borderRadius: '5px' }} />
            <h3>{project.title}</h3>
            <p><strong>Description:</strong> {project.description}</p>
            <p><strong>Role:</strong> {project.role}</p>
            <p><strong>Outcome:</strong> {project.outcome}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;