import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import { IoFilter } from "react-icons/io5";

const FilterDropdown = ({
    filters = [],
    selectedFilter,
    onFilterSelect,
    resetLabel = "Reset Filter",
    showReset = true,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleFilterSelect = (filter) => {
        onFilterSelect(filter); // send whole filter object or null
        setIsOpen(false);
    };

    // Get the selected filter object using selectedFilter (_id)
    const selectedFilterObj = filters.find(f => f._id === selectedFilter);

    return (
        <div className="filter-dropdown">
            <button className="filter-button" onClick={toggleDropdown}>
                <span className="filter-icon"><IoFilter /></span>
                {selectedFilterObj ? selectedFilterObj.name : "Choose Filter"}
                <span className="dropdown-arrow">
                    {isOpen ? (
                        <IoMdArrowDropup color="#9B9B9B" size={25} />
                    ) : (
                        <IoMdArrowDropdown color="#9B9B9B" size={25} />
                    )}
                </span>
            </button>

            {isOpen && (
                <div className="dropdown-menu1">
                    {filters.map((filter) => (
                        <div
                            key={filter._id}
                            className={`menu-item ${selectedFilter === filter._id ? "active" : ""}`}
                            onClick={() => handleFilterSelect(filter)}
                        >
                            {filter.name}
                        </div>
                    ))}
                    {showReset && (
                        <div className="menu-item reset" onClick={() => handleFilterSelect(null)}>
                            <span className="reset-icon"><GrPowerReset /></span> {resetLabel}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;
