import imageFox from '../../assets/foxHome.png';
import styles from './HomeView.module.css';

const HomeView = () => {
  return (
    <div id='Home' className={styles.homeContainer}>
      {/* Main content */}
      <div className={styles.mainContent}>
        {/* Left side - Text and button */}
        <div className={styles.leftSide}>
          <h1 className={styles.title}>
            Pensar fuera de la caja <span className={styles.cyanHighlight}>siempre ayuda</span>,{' '}
            <em>pero a veces</em> las mejores ideas{' '}
            <span className={styles.cyanHighlight}>comienzan con una</span>.
          </h1>

          <button className={styles.ctaButton}>Conócenos</button>
        </div>

        {/* Right side - Fox character */}
        <div className={styles.rightSide}>
          <img src={imageFox} alt='RCB Studio Fox' className={styles.foxImage} />
        </div>
      </div>

      {/* Dotted line at bottom */}
      <div className={styles.dottedLine}>
        <div className={styles.dotsContainer}>
          {[...Array(20)].map((_, i) => (
            <div key={i} className={styles.dot}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeView;
