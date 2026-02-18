# Autoume - Resume Management Platform

---

## ‼️ University Full-Stack Project

> Note: This project was developed as a team effort to create a corporate-style resume management solution. It represents a transition from academic exercises to building a practical, full-stack application focusing on organizing and sharing professional documents in a workplace-aligned atmosphere.

Autoume is a comprehensive resume management platform that enables users to securely upload, manage, and share their professional resumes. Built with a focus on modular design and professional utility, it provides a centralized hub for students and recruiters alike.

---

## 🚀 Project Overview:

The platform leverages Next.js for a responsive frontend and Firebase for robust backend services, including file storage and real-time database management. Users can upload their resumes to a secure database, toggle visibility settings for privacy, and generate shareable links for employers.

---

## 📂 Repository Structure

```text
autoume/
│
├── src/
│   ├── app/                # Core application logic and page implementations [cite: 27]
│   └── components/ui/      # Modular UI components (Card, Button, Alert, Input) [cite: 44]
│
├── public/                 # Static assets and public files
│
├── firebase.json           # Firebase configuration for hosting and backend services
├── next.config.ts          # Next.js configuration settings
├── package.json            # Project dependencies and scripts
├── tailwind.config.js      # Styling and design system configuration
└── README.md               # Project overview and instructions
```

---

## 🛠 Core Functionalities & Team

- **Backend & Upload Logic** (`Nnaemeka Okafor`): Established the Firebase integration and implemented the primary resume upload functionality, ensuring files are stored securely.
  
- **Management & Deletion** (`Sharan Ravula`): Developed the functionality for users to permanently remove their resumes from the database to protect personal information.
  
- **Search & Discovery** (`Jonah Burgess`): Implemented a keyword search feature to allow users and recruiters to navigate the resume database efficiently.
  
- **Project Lead & Planning** (`Justin Haycraft`): Orchestrated the development lifecycle, organized the codebase, and managed documentation.

---

## ⚙️ Technical Specifications

- **Frontend Framework**: `Next.js` (React) with `TypeScript` for type-safe development.
  
- **Backend-as-a-Service**: `Firebase` (Firestore for metadata and Firebase Storage for PDF files).
  
- **Styling**: `Tailwind` `CSS` for a clean, professional "corporate" aesthetic.
  
- **Design Pattern**: Highly modular and encapsulated structure, utilizing reusable UI components from a central directory

---

## 🧪 Key Features

- **Secure Upload**: Validates file types and sizes before storing resumes in the cloud.
  
- **Privacy Control**: Includes a "Searchable" toggle to allow users to opt-out of public viewing.
  
- **Shareable Links**: Once uploaded, users receive a persuasive link and QR code to instantly share their professional profile.
  
- **Management Dashboard**: A centralized interface to view, search, and delete uploaded documents

---

## 🔥 Getting Started 

### 💥 Setup and Installation:

1. To get the project running on your local machine, follow these steps:

	- Open your terminal and navigate to the project directory.

    - Run the following command to install all the required dependencies.
    
	  ```bash
      npm install
    
2. Running the Application

   - Once the dependencies are installed, you can start the development server by running this command:

	 ```bash
	 npm run dev
   
3. The application should now be accessible in your web browser at

   ```bash
   http://localhost:3000

4. Common Issues & Solutions

- When you encounter `Module Not Found Errors` use these commands:

  ```bash
  npm install @radix-ui/react-switch
  npm install @radix-ui/react-dropdown-menu
  
5. Website Link: [Resume Management Platform](https://autoume-41f5f.web.app/upload)

6. Contributors:
   
   - Sharan Ravula
     
   - Justin Haycraft
     
   - Nnaemeka Okafor
     
   - Jonah Burgess

---
