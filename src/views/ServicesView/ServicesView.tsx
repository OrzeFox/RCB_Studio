import ImageCarousel, { type ImageItem } from '../../components/ImageCarousel/ImageCarousel';
import imageFox from '../../assets/foxHome.png';
import styles from './ServicesView.module.css';

const ServicesView = () => {
  // Una sola hilera de imágenes (mock)
  const images: ImageItem[] = [
    { src: imageFox, title: 'Branding' },
    { src: imageFox, title: 'Social media MKT' },
    { src: imageFox, title: 'Arte 3D' },
    { src: imageFox, title: 'Branding' },
    { src: imageFox, title: 'Social media MKT' },
    { src: imageFox, title: 'Arte 3D' },
    { src: imageFox, title: 'Branding' },
    { src: imageFox, title: 'Social media MKT' },
    { src: imageFox, title: 'Arte 3D' },
    { src: imageFox, title: 'Branding' },
  ];

  const handleItemClick = (index: number, item: ImageItem) => {
    // Placeholder: más adelante abriremos un modal
    console.log('click', index, item.title);
  };

  return (
    <div id='Services' className={styles.servicesContainer}>
      {/* Área superior: título */}
      <div className={styles.headerArea}>
        <h1 className={styles.title}>Bienvenido a RCB Studio</h1>
        <h2 className={styles.headerSubtitle}>creamos experiencias al alcance de todos</h2>
      </div>

      {/* Área izquierda: texto existente */}
      <div className={styles.leftArea}>
        <div className={styles.textWrapper}>
          <h2 className={styles.subtitle}>Construyendo proyectos memorables</h2>
          <p className={styles.description}>
            En RCB studio creemos que cualquier negocio tiene el potencial de despegar y crecer de
            manera exponencial, nuestro modelo de trabajo se basa en colaborar codo a codo con tu
            negocio, estableciendo retos y midiendo crecimiento.
          </p>
        </div>
      </div>

      {/* Área derecha: panel oscuro + carousel */}
      <div className={styles.rightArea}>
        <div className={styles.darkBase}></div>
        <div className={styles.stripContainer}>
          <ImageCarousel
            images={images}
            className={styles.stripHeight}
            speedPxPerSecond={70}
            onItemClick={handleItemClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesView;
