import { useState } from 'react';
import styles from './ProjectsView.module.css';
import ProjectsCarousel from '../../components/ProjectsCarousel/ProjectsCarousel';
import image from '../../assets/foxHome.png';

// Datos de los proyectos
const projects = [
  {
    id: 1,
    title: 'Tarjeta de Presentación MMC Motors',
    description:
      'Diseño de tarjeta de presentación para Javier Pérez, Asesor de ventas en MMC motors',
    image: image,
    details: {
      client: 'MMC Motors',
      services: [
        'Enfoque a las necesidades del cliente',
        'Soluciones rápidas y precisas',
        'Asesoramiento a cualquier punto de la república',
        'Trato justo y personalizado',
      ],
      contact: {
        phone: '(152) 775-192-9444',
        email: 'mmccompany@gmail.com',
      },
    },
  },
  {
    id: 2,
    title: 'Delight - Animación 3D',
    description:
      'Sigue a "Delight", un zorro con discapacidad auditiva que se enfrenta al estigma de su discapacidad en un mundo de magia y maravilla.',
    image: image,
    details: {
      award: 'OFFICIAL SELECTION Golden FEMI Film Festival 2025',
      type: 'Animación 3D',
      character: 'Zorro naranja con delantal blanco',
    },
  },
  {
    id: 3,
    title: 'Pérez Profesional - Personaje 3D',
    description: 'Diseño y modelado 3D de personaje profesional con identidad visual moderna',
    image: image,
    details: {
      type: 'Modelado 3D',
      style: 'Profesional y moderno',
      features: 'Barba, gafas, camiseta oscura',
    },
  },
];

const ProjectsView = () => {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div id='Projects' className={styles.projectsContainer}>
      <div className={styles.projectsContent}>
        {/* Título y Subtítulo */}
        <div className={styles.projectsHeader}>
          <h1 className={styles.projectsTitle}>En RCB studio amamos lo que hacemos</h1>
          <h2 className={styles.projectsSubtitle}>Echa un vistazo a nuestros trabajos recientes</h2>
        </div>

        {/* Carousel de Proyectos */}
        <div className={styles.carouselSection}>
          <ProjectsCarousel
            projects={projects}
            onProjectClick={handleProjectClick}
            animationDurationMs={900}
          />
        </div>
      </div>

      {/* Modal de Detalles del Proyecto */}
      {selectedProject && (
        <div className={styles.projectModal} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>
              ×
            </button>

            <div className={styles.modalHeader}>
              <h2>{selectedProject.title}</h2>
              <p>{selectedProject.description}</p>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.projectImage}>
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>

              <div className={styles.projectDetails}>
                {selectedProject.id === 1 && (
                  <div className={styles.mmcDetails}>
                    <h3>Cliente: {selectedProject.details.client}</h3>
                    <h4>Servicios:</h4>
                    <ul>
                      {selectedProject.details.services?.map((service, index) => (
                        <li key={index}>{service}</li>
                      ))}
                    </ul>
                    <div className={styles.contactInfo}>
                      <p>
                        <strong>Teléfono:</strong> {selectedProject.details.contact?.phone}
                      </p>
                      <p>
                        <strong>Email:</strong> {selectedProject.details.contact?.email}
                      </p>
                    </div>
                  </div>
                )}

                {selectedProject.id === 2 && (
                  <div className={styles.delightDetails}>
                    <div className={styles.awardBadge}>{selectedProject.details.award}</div>
                    <h3>Tipo: {selectedProject.details.type}</h3>
                    <p>
                      <strong>Personaje:</strong> {selectedProject.details.character}
                    </p>
                  </div>
                )}

                {selectedProject.id === 3 && (
                  <div className={styles.perezDetails}>
                    <h3>Tipo: {selectedProject.details.type}</h3>
                    <p>
                      <strong>Estilo:</strong> {selectedProject.details.style}
                    </p>
                    <p>
                      <strong>Características:</strong> {selectedProject.details.features}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsView;
