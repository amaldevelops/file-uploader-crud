# NodeJs-File-Uploader-CRUD

## **Introduction**

This project is a minimalistic implementation of a personal storage service, inspired by platforms like Google Drive. It offers users the ability to upload, manage, and share files and folders in a secure and structured environment. This project demonstrates expertise in backend development using **Express**, **Prisma**, and modern authentication practices.

---

## **Features**

### **Core Features**

1. **Session-Based Authentication**:
   - Utilizes **Passport.js** for authentication.
   - Sessions are persisted using the **Prisma session store**, ensuring consistent user sessions across server restarts.

2. **File Upload**:
   - Authenticated users can upload files using **Multer** middleware.
   - Files are initially saved to the local filesystem.

3. **Folder Management**:
   - Complete CRUD (Create, Read, Update, Delete) functionality for folders.
   - Files can be organized within folders.

4. **File Details and Downloads**:
   - View detailed metadata of uploaded files, including:
     - Name
     - Size
     - Upload timestamp
   - Download functionality to retrieve files.

5. **Cloud Storage Integration**:
   - Files are uploaded to a cloud storage service (**Cloudinary** or **Supabase Storage**) for scalable and efficient storage.
   - The file URL is stored in the database for easy access.

## **Tech Stack**

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (managed with Prisma ORM)
- **Authentication**: Passport.js (with session-based authentication)
- **File Storage**: 
  - Local filesystem (initial stage)
  - Cloudinary or Supabase Storage (final stage)
- **Session Management**: Prisma session store
- **Middleware**: Multer (for file uploads)

---

## **Project Setup**

### **Prerequisites**

- Node.js / fs / Express / Passport / Multer
- PostgreSQL
- Cloudinary or Supabase account for cloud storage
- Environment variables configured:
  - `DATABASE_URL`
  - `SESSION_SECRET`
  - `CLOUDINARY_URL` or equivalent for your chosen storage provider

### **Installation**

1. Clone the repository:

   ```bash
   git clone git@github.com:1Amal/NodeJs-File-Uploader-CRUD.git
   cd NodeJs-File-Uploader-CRUD
   ```
2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

Create a .env file in the root directory.
Add the required variables:

```env
DATABASE_URL=your_database_url
SESSION_SECRET=your_session_secret
CLOUDINARY_URL=your_cloudinary_url
```

4. Set up the database:

```npx
npx prisma migrate dev --name init

```

5. Start the server:

```npm

npm start

```

 ## Further Development Notes
   
- Due to time constraints following functionality is not yet Implemented

1. Save Files/Folders under different Usernames i.e. maverick@gmail.com
2. Rename Folders
3. Rename Files
4. Move Files to other folders
5. User Signup functionality
