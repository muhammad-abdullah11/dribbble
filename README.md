# Dribbble Clone - Next.js Full-Stack Application

A stunning, professional-grade Dribbble clone built with the modern tech stack: Next.js 15+, Tailwind CSS 4, MongoDB, and NextAuth. This project serves as a showcase for high-performance design discovery and community-driven creativity.

![Project Preview](https://github.com/muhammad-abdullah11/dribbble/blob/main/public/preview.png?raw=true "Dribbble Clone Preview")

---

## Key Features

- **Project Discovery**: Dynamic grid layouts with modern hover states, similar to Dribbble's experience.
- **Secure Authentication**: Integrated NextAuth with support for Gmail (Nodemailer) and credential-based login.
- **Cloud-Powered Media**: High-performance image management using Cloudinary for project shots.
- **Project Management**: Create, edit, and delete projects with a rich, interactive form interface.
- **User Profiles**: Personalized profiles showcasing user-specific shots and contributions.
- **Tailwind CSS 4**: Utilizing the latest in utility-first styling for a sleek, responsive UI.
- **Email Verification**: Integrated Nodemailer for secure user account verification.

---

## Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Components**: Framer Motion (for animations) & Custom Premium UI

### Backend & Infrastructure
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Media Hosting**: [Cloudinary](https://cloudinary.com/)
- **Email Service**: [Nodemailer](https://nodemailer.com/)

---

## Project Structure

```bash
dribbble/
├── app/                  # Next.js App Router (Main UI & API)
│   ├── (main)/           # Primary application routes
│   └── api/              # API route handlers
├── components/           # Reusable React components
├── models/               # Mongoose schemas & TypeScript interfaces
├── public/               # Static assets
├── utils/                # Helper functions & DB connection
└── types/                # Global TypeScript declarations
```

---

## ⚙️ Getting Started

### 1. Prerequisites
- Node.js 18+ installed
- MongoDB instance (Atlas or local)
- Cloudinary account for media
- SMTP server (Gmail, SendGrid, etc.)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/muhammad-abdullah11/dribbble.git

# Navigate to the project directory
cd dribbble

# Install dependencies
npm install
```


## 🤝 Contributing

Contributions are welcome! If you have suggestions for new features or improvements:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git checkout origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👤 Author

**Muhammad Abdullah**
- GitHub: [@muhammad-abdullah11](https://github.com/muhammad-abdullah11)

---

> This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). Use the documentation to extend this project.
