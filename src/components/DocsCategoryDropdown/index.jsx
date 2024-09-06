import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';

function DocsCategoryDropdown({dropdownCategory}) {
  console.log(dropdownCategory)

  const history = useHistory();

  const [hovered, setHovered] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (path) => {
    handleMouseLeave()
    history.push(path);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
      <div
          className={styles.docsNavDropdownContainer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
      >
        <span className={styles.docsNavDropdownToolbarLink}>{dropdownCategory.title}</span>
        <div className={styles.docsNavDropdownMenu} style={{ display: isOpen ? 'block' : 'none' }}>
          <div className={styles.docsNavMenuHeader}>{dropdownCategory.title}</div>
          <div className={styles.docsNavMenuDescription}>{dropdownCategory.description}</div>
          <hr className={styles.docsNavMenuDivider}/>
          <div className={styles.docsNavMenuItems}>
            {dropdownCategory.menuItems.map((item, index) => (
                <div
                    key={index}
                    className={`${styles.docsNavMenuItem} ${hovered === index ? styles.docsNavHovered : ''}`}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => {
                      handleNavigation(item.link);
                    }}
                >
                  <div className={styles.docsNavItemTitle}>{item.title}</div>
                  <div className={styles.docsNavItemDescription}>{item.description}</div>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
}

export default DocsCategoryDropdown;
