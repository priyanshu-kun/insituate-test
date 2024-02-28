'use client';
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";


const SelectWrapper = (props) => {
  const {options, onSelect, defaultOption, placeholder, width} = props;
  const key = JSON.stringify(defaultOption);
  return <Select 
    key={key}
    options={options}
    onSelect={onSelect}
    defaultOption={defaultOption}
    placeholder={placeholder}
    width={width}
   />
}

const Select = ({
  options,
  onSelect,
  defaultOption,
  placeholder = "Select an option",
  width = "w-fit",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const dropdownRef = useRef(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative inline-block ${width}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={` text-sm overflow-y-auto text-gray-500 flex items-center  overflow-auto justify-between rounded-lg focus:outline-none hover:bg-blue-50 transition-all px-6 py-2 w-full`}
      >
        {selectedOption ? (
          selectedOption.label
        ) : (
          <span className="text-gray-500"> {placeholder}</span>
        )}
        <FontAwesomeIcon icon={isOpen ? faCaretUp : faCaretDown} className='ml-3' />
      </button>

      {isOpen && (
        <div
          className={`absolute ${width} mt-2 bg-white border border-gray-300 z-50 rounded-md shadow-md  w-72 max-h-72 overflow-y-scroll`}
        >
          <ul>
            {options?.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className="px-4 py-1 border-b overflow-y-auto text-gray-600 last:border-none cursor-pointer hover:bg-blue-50 text-sm"
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectWrapper;
