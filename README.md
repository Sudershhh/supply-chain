# Didero

**Didero** is a web application for managing and downloading user-uploaded files. It features a clean interface and secure access, making it easy to organize and interact with your files.

## Tech Stack

- **Frontend:**

  - **Next.js**: React framework for server-side rendering and static site generation.
  - **Tailwind CSS**: Utility-first CSS framework for styling.
  - **Clerk**: Authentication and user management.

- **Backend:**

  - **Firebase**: Real-time database, authentication, and storage.
  - **Firestore**: NoSQL database for storing user and file data.
  - **Firebase Storage**: For managing and storing user files.
  - **PDF PARSER**: For parsing the pdfs.

- **Future Improvements - Testing :**

  - **Jest**: JavaScript testing framework for unit and integration tests.
  - **React Testing Library (RTL)**: For testing Dropzone components.
  - **Cypress**: End-to-end testing.

- **Authentication & Security:**
  - **Clerk**: Multi-factor authentication.

## Features

- **User Authentication:**
  - Sign in and sign out with Clerk.
- **File Management:**
  - Upload and manage files.
  - Sort files by date.
  - Download files securely.
- **Real-Time Updates:**
  - Real-time updates for file changes using Firestore.

## Issues

I encountered difficulties with the OpenAI API while trying to parse text from PDF files. The API was unable to effectively handle PDFs, which led to challenges in extracting the needed text.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sudershhh/supply-chain
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Run the app:
   ```bash
   npm run dev
   ```
