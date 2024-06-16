# Grantors - Web Application 👨‍💻💻

> **CSCC01H3** Software Engineering &nbsp; | &nbsp; Winter 2024 &nbsp; | &nbsp; **Project Grade:** &nbsp; 92% 

A accessible web application for organizations to host grants for to applicant to apply. Grantors create and publish grants, accept and reject application, track applicant milestones, and message applicants. Grantees can browse available grants, apply to grants, and track approved amounts. System admins can view all users in the system, having the power to remove any malicious users present. All users can view account statistics (eg. total applicant, total funding...). Furthermore, a settings page is designated for users to customize the appearance of the interface, allowing options such as, but not limited to, high contrast, simple graphics, and bold text.

![image](https://github.com/Alex-Zeng-UofT/Grantors/assets/114100209/3bcc922e-9ab0-4316-ac1c-aff3c8204ec9)

**Developers:** &nbsp; Alex Zeng (Me), Ethan Cook, Francis Ayyad, Juno Zhang, Neil Wang, Sean Shekhtman, Zack Steine

&nbsp;

### Tech Stack 🔧

✔️ **TypeScript**

✔️ **JavaScript**

✔️ **Tailwind CSS**

✔️ **React**

✔️ **Express**

✔️ **Node.js**

✔️ **MongoDB**

### Methodology and Architecture 🏗️

💪 **Agile/Scrum**

💪 **MVC**

&nbsp;

## How to run frontend
Initialize
```bash
cd frontend
npm install
```
Run dev server
```bash
npm start
```

## How to run backend
Initialize
```bash
cd backend
npm install
```

Get mongo running
```bash
# Create data/db folders
mkdir data
cd data
mkdir db
cd ..
# Run monogodb, this will depend on your OS
mongod --path=./data/db
```

Run dev server
```bash
npm run dev
```

