import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";

const SelectVersions = ({
  options,
  onSelect,
  defaultOption,
  placeholder = "Select an option",
  width = "w-52",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption || null);

  useEffect(() => {
    setSelectedOption(defaultOption);
  }, [defaultOption]);

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
    <div className="relative inline-block mx-4" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`focus:border-primary-accent-color text-sm overflow-y-auto text-primary-accent-color ${width} px-2 flex items-center border border-gray-300 overflow-auto justify-between py-1 rounded-md focus:outline-none w-fit`}
      >
        {selectedOption ? (
          selectedOption.branch_name
        ) : (
          <span className="text-gray-400"> {placeholder}</span>
        )}
        <FontAwesomeIcon icon={isOpen ? faCaretUp : faCaretDown} className='ml-3' />
      </button>

      {isOpen && (
        <div
          className={`absolute ${width} mt-2 bg-white border border-gray-300 rounded-md shadow-md`}
        >
          <ul>
            {options.map((option) => (
              <li
                key={option.id}
                onClick={() => handleOptionClick(option)}
                className="px-4 py-2 border-b overflow-y-auto text-gray-600  last:border-none cursor-pointer hover:bg-blue-50 text-sm"
              >
                {option.branch_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectVersions;
