# Waegy - Enterprise WhatsApp Marketing

Waegy is a powerful WhatsApp marketing tool designed for enterprise use. It allows you to manage contacts, send bulk messages, and track campaign performance.

## Prerequisites

- Node.js (v14 or higher)
- Google Chrome installed at `C:\Program Files\Google\Chrome\Application\chrome.exe` (or update `services/waService.js` with your path)

## Installation

1.  Clone the repository or extract the files.
2.  Navigate to the project directory:
    ```bash
    cd Waegy
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

## Usage

1.  Start the server:
    ```bash
    npm start
    ```
2.  Open your browser and navigate to:
    ```
    http://localhost:3000
    ```
3.  **Connect WhatsApp**:
    -   Go to the "Connections" tab in the sidebar.
    -   Scan the QR code with your WhatsApp mobile app (Linked Devices).
4.  **Manage Contacts**:
    -   Go to "Contacts" to add or import contacts (CSV/Excel).
5.  **Send Campaigns**:
    -   Go to "Campaigns", upload a contact list, compose your message, and send.

## Project Structure

-   `server.js`: Main entry point.
-   `routes/`: API route definitions.
-   `controllers/`: Logic for handling requests.
-   `services/`: Business logic (WhatsApp integration).
-   `public/`: Frontend files (HTML, CSS, JS).
-   `database.js`: SQLite database setup.

## Technologies

-   **Backend**: Node.js, Express, Socket.io, whatsapp-web.js
-   **Frontend**: HTML5, CSS3, JavaScript, Chart.js
-   **Database**: SQLite
