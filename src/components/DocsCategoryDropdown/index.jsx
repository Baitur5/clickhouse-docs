import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.css';

function DocsCategoryDropdown({dropdownCategory}) {
  console.log(dropdownCategory)

  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div 
      className={styles.dropdownContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={styles.dropdownToolbarLink}>{dropdownCategory.title}</span>
      {isOpen && (
        <DropdownContent dropdownCategory={dropdownCategory} handleMouseLeave={handleMouseLeave} />
      )}
    </div>
  );
}

const DropdownContent = ({dropdownCategory, handleMouseLeave}) => {
  const [hovered, setHovered] = useState(null);
  const history = useHistory();

  const handleNavigation = (path) => {
    handleMouseLeave()
    history.push(path);
  };

  return (
    <div className={styles.dropdownMenu}>
      <div className={styles.menuHeader}>{dropdownCategory.title}</div>
      <div className={styles.menuDescription}>{dropdownCategory.description}</div>
      <hr className={styles.menuDivider} />
      <div className={styles.menuItems}>
        {dropdownCategory.menuItems.map((item, index) => (
          <div
            key={index}
            className={`${styles.menuItem} ${hovered === index ? styles.hovered : ''}`}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => {
              handleNavigation(item.link);
            }}
          >
            <div className={styles.itemTitle}>{item.title}</div>
            <div className={styles.itemDescription}>{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocsCategoryDropdown;
