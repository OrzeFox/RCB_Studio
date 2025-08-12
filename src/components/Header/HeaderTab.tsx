import type { HeaderTabProps } from '../../ts/interfaces/headerTabProps';
import styles from './HeaderTab.module.css';

const HeaderTab = (headerTabProps: HeaderTabProps) => {
  return (
    <button
      onClick={() => headerTabProps.onClick(headerTabProps.id)}
      className={`${styles.tabButton} ${headerTabProps.isActive ? styles.active : ''}`}
    >
      {headerTabProps.isActive && <div className={styles.activeIndicator}></div>}
      {headerTabProps.title}
    </button>
  );
};

export default HeaderTab;
