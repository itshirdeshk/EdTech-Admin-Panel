/** @format */

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { format, isToday, isYesterday } from 'date-fns';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const formatDate = (dateString) => {
    const date = new Date(dateString); // Parse the ISO string to a Date object

    // Extract day, month, and year
    const day = date.getDate().toString().padStart(2, '0'); // Ensure two-digit day
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure two-digit month (0-based index)
    const year = date.getFullYear(); // Get the full year

    // Format as 'DD/MM/YYYY'
    return `${day}/${month}/${year}`;
};


const formatTimeWithAmPm = (dateString) => {
    const date = new Date(dateString); // Parse the ISO string into a Date object

    let hours = date.getHours(); // Get the hour (0-23)
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Get minutes and pad to 2 digits
    const amPm = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM

    // Convert to 12-hour format
    hours = hours % 12 || 12; // If 0, make it 12 (midnight)

    // Format as 'HH:MM AM/PM'
    return `${hours}:${minutes} ${amPm}`;
};

export const createPayload = (fields) => {
    const formData = new FormData();

    Object.keys(fields).forEach((key) => {
        const value = fields[key];
        if (value !== null && value !== undefined && value !== "") {
            formData.append(key, value);
        }
    });

    return formData;
};



const getFormattedTime = (timestamp) => {
    let date;

    // Check if timestamp is a Firebase Timestamp object
    if (timestamp && typeof timestamp.toMillis === 'function') {
        date = new Date(timestamp.toMillis());
    }
    // Check if it's already a JavaScript Date object
    else if (timestamp instanceof Date) {
        date = timestamp;
    }
    // Check if it's a string (ISO date format)
    else if (typeof timestamp === 'string') {
        date = new Date(timestamp);
    }
    // If timestamp is null/undefined or invalid
    else {
        console.error('Invalid timestamp:', timestamp);
        return '';
    }

    // Format the date and time (use date-fns or any preferred method)
    return format(date, 'hh:mm a'); // Example: 02:30 PM
};


const isToday2 = (date) => {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};

const isYesterday2 = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()
    );
};

const formatDatemessage = (date) => {
    return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};


export {
    ScrollToTop,
    formatDate,
    formatTimeWithAmPm,
    isToday2,
    isYesterday2,
    formatDatemessage,
    getFormattedTime
};