import { type FC, useState } from 'react';

import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';

import './Dropdown.css';

type DropdownProps = {
  initialValue: string;
  data: string[];
  emptyDataValue: string;
  onSelectValue: (value: string) => void;
  value: string;
};

const Dropdown: FC<DropdownProps> = ({
  initialValue,
  data,
  emptyDataValue,
  onSelectValue,
  value,
}) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const onSelect = (value: string) => {
    onSelectValue(value);
  };

  return (
    <div
      className={`dropdown-wrapper ${data.length > 0 ? '' : 'empty'}`}
      onClick={() => setOpenDropdown((prevState) => !prevState)}
    >
      {data.length > 0 ? (
        <>
          <span className="dropdown-input">{value || initialValue}</span>
          {openDropdown ? (
            <IoIosArrowUp className="dropdown-icon" />
          ) : (
            <IoIosArrowDown className="dropdown-icon" />
          )}
        </>
      ) : (
        <span className="dropdown-input">{emptyDataValue}</span>
      )}

      {openDropdown && data.length > 0 && (
        <div className="dropdown-list-wrapper">
          {data.map((value, index) => (
            <div className="dropdown-list-item" onClick={() => onSelect(value)} key={index}>
              <span className="dropdown-list-item__value">{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
