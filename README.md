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
  - **AWS Textract Client**: For parsing the pdfs.
  - **OPENAI API**: Prompt Engineering to extract relevant invoice data

- **Future Improvements - Testing :**

  - **Jest**: JavaScript testing framework for unit and integration tests.
  - **React Testing Library (RTL)**: For testing Dropzone components.
  - **Cypress**: End-to-end testing.

- **Authentication & Security:**
  - **Clerk**: Multi-factor authentication.
  - **Jest**: Integration Testing For API Routes

## Features

- **User Authentication:**
  - Sign in and sign out with Clerk.
- **File Management:**
  - Upload, Rename, Delete Invoices.
  - Sort invoices by date.
  - Download invoices securely.
- **Sophisticated Text Extraction with AWS**
- **Prompt Engineer as you need for invoice data**
- **Real-Time Updates:**
  - Real-time updates for file changes using Firestore.

## API WORKFLOW

![API Workflow drawio](https://github.com/user-attachments/assets/2f5ac7e3-c0f4-40cd-94f0-6fdc14ca397b)


## Deployed Site

[https://supply-chain-navy.vercel.app/](https://supply-chain-navy.vercel.app/)

## Github Link

https://github.com/Sudershhh/supply-chain

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
