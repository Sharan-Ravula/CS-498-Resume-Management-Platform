# Autoume - Resume Management Platform

---

## ‼️ University Full-Stack Project

> Note: This project was developed as a team effort to create a corporate-style resume management solution. It represents a transition from academic exercises to building a practical, full-stack application focusing on organizing and sharing professional documents in a workplace-aligned atmosphere.

Autoume is a comprehensive resume management platform that enables users to securely upload, manage, and share their professional resumes. Built with a focus on modular design and professional utility, it provides a centralized hub for students and recruiters alike.

---

## 🚀 Project Overview:

The platform leverages `Next.js` for a responsive frontend and Firebase for robust backend services, including file storage and real-time database management. Users can upload their resumes to a secure database, toggle visibility settings for privacy, and generate shareable links for employers.

---

## 📂 Repository Structure

```text
CS-498-Resume-Management-Platform/
├──	scripts/
│	├── src/
│	│   ├── app/                        # Main application routing and pages [cite: 27]
│	│   │   ├── [hash]/                 # Dynamic route for viewing specific resumes
│	│   │   │   ├── ActionMenu.tsx      # Menu for resume actions (view/delete)
│	│   │   │   ├── Logo.tsx            # Component for the site logo
│	│   │   │   └── page.tsx            # Logic for displaying an individual resume
│	│   │   ├── fonts/                  # Local font files (GeistMonoVF, GeistVF)
│	│   │   ├── search/                 # Search functionality page [cite: 84]
│	│   │   │   └── page.tsx            # Logic for searching the resume database [cite: 21]
│	│   │   ├── upload/                 # Resume upload page [cite: 81]
│	│   │   │   └── page.tsx            # Logic for file selection and Firebase upload [cite: 36, 37]
│	│   │   ├── globals.css             # Global CSS styles and Tailwind imports
│	│   │   ├── icon.png                # Website favicon/icon
│	│   │   ├── layout.tsx              # Root layout shared across all pages
│	│   │   └── page.tsx                # Homepage / Landing page
│	│   ├── components/                 # Reusable UI components [cite: 33, 44]
│	│   │   └── ui/                     # Individual UI elements (Radix + Lucide) [cite: 44]
│	│   │       ├── alert.tsx
│	│   │       ├── button.tsx
│	│   │       ├── card.tsx
│	│   │       ├── dropdown-menu.tsx
│	│   │       ├── input.tsx
│	│   │       ├── label.tsx
│	│   │       ├── switch.tsx
│	│   │       ├── toast.tsx
│	│   │       ├── toaster.tsx
│	│   │       └── use-toast.ts
│	│   └── lib/                        # Core logic and configurations
│	│       ├── firebaseConfig.ts       # Firebase initialization and API keys [cite: 60]
│	│       └── utils.ts                # Helper functions (e.g., Tailwind class merging)
│	├── public/                         # Static assets (SVGs, images)
│	├── components.json                 # UI component library configuration
│	├── firebase.json                   # Firebase hosting and project rules
│	├── next-env.d.ts                   # Next.js TypeScript declarations
│	├── next.config.ts                  # Next.js framework settings
│	├── package-lock.json               # Locked dependency versions
│	├── package.json                    # Project metadata and dependencies [cite: 4, 5]
│	├── postcss.config.js               # CSS processing configuration
│	├── tailwind.config.ts              # TypeScript styling system configuration
│	├── tsconfig.json                   # TypeScript compiler settings
│	├── postcss.config.mjs              # ES Module CSS processing configuration
│	├── tailwind.config.js              # JavaScript styling system configuration
│
├──	docs/
│	├── project_final_report.pdf		# Summary of the project’s development process
│	├── project_milestone_2.txt			# A status report documenting the integration of the resume upload and delete features along with a breakdown of individual team member contributions
│	├── userstories.pdf					# A roadmap document listing fourteen detailed user requirements that defined the platform's core features
│
├──	LICENSE                             # License information for the repository
└── README.md                       	# Project documentation and guide
```

---

## 🛠 Core Functionalities & Team

- Backend & Upload Logic (`Nnaemeka Okafor`): Established the Firebase integration and implemented the primary resume upload functionality, ensuring files are stored securely.
  
- Management & Deletion (`Sharan Ravula`): Developed the functionality for users to permanently remove their resumes from the database to protect personal information.
  
- Search & Discovery (`Jonah Burgess`): Implemented a keyword search feature to allow users and recruiters to navigate the resume database efficiently.
  
- Project Lead & Planning (`Justin Haycraft`): Orchestrated the development lifecycle, organized the codebase, and managed documentation.

---

## ⚙️ Technical Specifications

- Frontend Framework: `Next.js` (React) with `TypeScript` for type-safe development.
  
- Backend-as-a-Service: `Firebase` (Firestore for metadata and Firebase Storage for PDF files).
  
- Styling: `Tailwind` `CSS` for a clean, professional "corporate" aesthetic.
  
- Design Pattern: Highly modular and encapsulated structure, utilizing reusable UI components from a central directory

---

## 🧪 Key Features

- Secure Upload: Validates file types and sizes before storing resumes in the cloud.
  
- Privacy Control: Includes a "Searchable" toggle to allow users to opt-out of public viewing.
  
- Shareable Links: Once uploaded, users receive a persuasive link and QR code to instantly share their professional profile.
  
- Management Dashboard: A centralized interface to view, search, and delete uploaded documents

---

## 🔥 Getting Started 

### 💥 Setup and Installation:

1. To get the project running on your local machine, follow these steps:

	> Open your terminal and navigate to the project directory.

    - Run the following command to install all the required dependencies.
    
	  ```bash
      npm install
    
2. Running the Application

   > Once the dependencies are installed
   
   - Start the development server by running this command:

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

> Note: This project runs on the firebase that we have created, if in case the firebase is deleted then the user need to create their own Firebase project and replace the keys in firebaseConfig.ts for upload/search features to actually save data.
