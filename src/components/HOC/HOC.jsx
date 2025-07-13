import React, { useState, useCallback } from "react";
import "./HOC.css";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const HOC = (WrappedComponent) => {
    const Component = (props) => {
        const [show, setShow] = useState(true);

        // Memoized toggle function to avoid unnecessary re-creations
        const toggleSidebar = useCallback(() => {
            setShow((prevShow) => !prevShow);
        }, []);

        return (
            <div className={`container1 ${show ? "" : "sidebar-hidden"}`}>
                {show && (
                    <div className="sidebar55">
                        <Sidebar toggleSidebar={toggleSidebar} />
                    </div>
                )}
                <div className="content">
                    <Navbar show={show} toggleSidebar={toggleSidebar} text={props.text} />
                    <div className={`child-component ${show ? "" : "child-component-hidden"}`}>
                        <WrappedComponent {...props} />
                    </div>
                </div>
            </div>
        );
    };

    // Memoize the Component to prevent unnecessary re-renders
    return React.memo(Component);
};

export default HOC;
