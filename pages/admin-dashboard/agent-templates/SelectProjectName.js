import {
  faCaretDown,
  faCaretUp,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";

const SelectProjectName = ({
  options,
  onSelect,
  defaultOption,
  placeholder = "Select an option",
  width = "w-52",
  setShowTemplateCard = () => {},
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
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`focus:border-primary-accent-color text-sm overflow-y-auto text-primary-accent-color ${width} px-4 flex items-center border border-gray-300 overflow-auto justify-between py-1 rounded-md focus:outline-none w-fit`}
      >
        {selectedOption ? (
          selectedOption.project_name
        ) : (
          <span className="text-gray-400"> {placeholder}</span>
        )}
        <FontAwesomeIcon icon={isOpen ? faCaretUp : faCaretDown} className='ml-3' />
      </button>

      {isOpen && (
        <div
          className={`absolute ${width} mt-2 bg-white border border-gray-300 rounded-md shadow-md`}
        >
          <div className="w-full flex items-center">
            <div className="p-3">
              <div className="relative ">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"></div>
                <input
                  type="text"
                  id="input-group-search"
                  className="block w-full px-2 py-1 ps-4 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-primary-accent-color focus:border-primary-accent-color "
                  placeholder="Search API"
                />
                <div className="absolute inset-y-0 rtl:inset-r-0 end-0 flex items-center pe-3 pointer-events-none">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
              </div>
            </div>
            <div className='mr-2'>
              <button
                className="flex text-gray-500 text-sm px-2 items-center border py-1 rounded-3xl hover:bg-primary-accent-color hover:text-white"
                onClick={() => {
                  setShowTemplateCard(true);
                  setIsOpen(!isOpen);
                }}
              >
                <FontAwesomeIcon icon={faPlus} className="mr-1" /> New
              </button>
            </div>
          </div>
          <hr></hr>
          <ul>
            {options.map((option) => (
              <li
                key={option?.project_id}
                onClick={() => handleOptionClick(option)}
                className="px-4 py-2 border-b overflow-y-auto text-gray-600  last:border-none cursor-pointer hover:bg-blue-50 text-sm"
              >
                {option.project_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectProjectName;
