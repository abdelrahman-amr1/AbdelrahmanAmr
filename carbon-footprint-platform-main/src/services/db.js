// src/services/db.js
// A simple service to simulate a database using localStorage for MVP purposes.

const REPORTS_KEY = 'cfp_reports';
const CONSULTING_KEY = 'cfp_consulting_requests';

/**
 * Generate a pseudo-random ID
 */
const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
};

/**
 * Save a new carbon footprint report
 * @param {Object} reportData - The calculated results and form input
 */
export const saveReport = (reportData) => {
    try {
        const existing = getReports();
        const newReport = {
            id: generateId(),
            createdAt: new Date().toISOString(),
            ...reportData
        };

        existing.push(newReport);
        localStorage.setItem(REPORTS_KEY, JSON.stringify(existing));
        return newReport;
    } catch (e) {
        console.error("Error saving report to local storage", e);
        return null;
    }
};

/**
 * Get all saved reports
 * @returns {Array} List of reports
 */
export const getReports = () => {
    try {
        const data = localStorage.getItem(REPORTS_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Error reading reports from local storage", e);
        return [];
    }
};

/**
 * Save a consulting request
 */
export const saveConsultingRequest = (requestData) => {
    try {
        const existing = getConsultingRequests();
        const newReq = {
            id: generateId(),
            createdAt: new Date().toISOString(),
            status: 'pending',
            ...requestData
        };

        existing.push(newReq);
        localStorage.setItem(CONSULTING_KEY, JSON.stringify(existing));
        return newReq;
    } catch (e) {
        console.error("Error saving request to local storage", e);
        return null;
    }
}

/**
 * Get all consulting requests
 */
export const getConsultingRequests = () => {
    try {
        const data = localStorage.getItem(CONSULTING_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Error reading requests from local storage", e);
        return [];
    }
};
