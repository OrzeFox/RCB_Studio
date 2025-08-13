import { useState } from 'react';
import styles from './ProjectsCarousel.module.css';

export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  image: string;
  details: any;
}

interface ProjectsCarouselProps {
  projects: ProjectItem[];
  onProjectClick: (project: ProjectItem) => void;
  animationDurationMs?: number;
}

const ProjectsCarousel = ({
  projects,
  onProjectClick,
  animationDurationMs = 9000,
}: ProjectsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const nextProject = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('right');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
      setIsAnimating(false);
    }, animationDurationMs);
  };

  const prevProject = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('left');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
      setIsAnimating(false);
    }, animationDurationMs);
  };

  const getProjectIndex = (offset: number) => {
    return (currentIndex + offset + projects.length) % projects.length;
  };

  return (
    <div className={styles.carouselContainer}>
      {/* Botón izquierdo */}
      <button
        className={`${styles.navButton} ${isAnimating ? styles.disabled : ''}`}
        onClick={prevProject}
        disabled={isAnimating}
      >
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
          <path
            d='M15 18L9 12L15 6'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>

      {/* Contenedor de proyectos */}
      <div className={`${styles.projectsContainer} ${isAnimating ? styles.animating : ''}`}>
        {/* Proyecto izquierdo (difuminado) */}
        <div
          className={`${styles.projectCard} ${styles.leftProject} ${
            isAnimating ? (direction === 'right' ? styles.slideOutLeft : styles.leftToCenter) : ''
          }`}
        >
          <div className={styles.projectImage}>
            <img
              src={projects[getProjectIndex(-1)].image}
              alt={projects[getProjectIndex(-1)].title}
            />
          </div>
          <div className={styles.projectInfo}>
            <h3>{projects[getProjectIndex(-1)].title}</h3>
          </div>
        </div>

        {/* Proyecto central (principal) */}
        <div
          className={`${styles.projectCard} ${styles.centerProject} ${
            isAnimating ? (direction === 'right' ? styles.centerToLeft : styles.centerToRight) : ''
          }`}
        >
          <div className={styles.projectImage}>
            <img src={projects[currentIndex].image} alt={projects[currentIndex].title} />
          </div>
          <div className={styles.projectInfo}>
            <h3>{projects[currentIndex].title}</h3>
            <p>{projects[currentIndex].description}</p>
            <button
              className={styles.viewProjectButton}
              onClick={() => onProjectClick(projects[currentIndex])}
            >
              Ver Proyecto
            </button>
          </div>
        </div>

        {/* Proyecto derecho (difuminado) */}
        <div
          className={`${styles.projectCard} ${styles.rightProject} ${
            isAnimating ? (direction === 'right' ? styles.rightToCenter : styles.slideOutRight) : ''
          }`}
        >
          <div className={styles.projectImage}>
            <img
              src={projects[getProjectIndex(1)].image}
              alt={projects[getProjectIndex(1)].title}
            />
          </div>
          <div className={styles.projectInfo}>
            <h3>{projects[getProjectIndex(1)].title}</h3>
          </div>
        </div>
      </div>

      {/* Botón derecho */}
      <button
        className={`${styles.navButton} ${isAnimating ? styles.disabled : ''}`}
        onClick={nextProject}
        disabled={isAnimating}
      >
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
          <path
            d='M9 18L15 12L9 6'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    </div>
  );
};

export default ProjectsCarousel;
