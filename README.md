# Alumnify

Alumnify is a web application designed to connect students with alumni from their college who are working in different fields. Students can find and connect with alumni based on predefined matching criteria such as industry, batch, and location.

## 🚀 Features
- **Find Alumni**: Search for alumni based on name, company, role, industry, batch, or location.
- **Authentication**: Secure user authentication using [Clerk](https://clerk.dev/).
- **Admin Panel**: Admins can add alumni details including name, batch, company, role, industry, and photo.
- **Pagination**: Display alumni results with paginated views.
- **Real-Time Filtering**: Apply filters to find relevant alumni quickly.
- **Responsive Design**: Built with Tailwind CSS for a clean and modern UI.

## 🛠 Tech Stack
- **Frontend**: React (Next.js), Tailwind CSS, ShadCN
- **Backend**: Next.js API Routes, MongoDB (via Mongoose)
- **Authentication**: Clerk
- **Database**: MongoDB (hosted on [Neon](https://neon.tech/))

## 📂 Project Structure
```
/ (Root)
│── app/
│   ├── page.js          # Landing Page
│   ├── findAlumni/      # Alumni search page
│   ├── admin/           # Admin panel
│── components/          # UI Components
│── utils/               # Utility functions
│── api/                 # Backend API routes
│── public/              # Static assets
│── styles/              # Global styles
│── README.md            # Project Documentation
```

## 🔧 Installation & Setup
1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/alumnify.git
   cd alumnify
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Set up environment variables** (Create a `.env.local` file and add the required variables)
   ```sh
   MONGODB_URI=your_mongodb_connection_string
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```
4. **Run the project**
   ```sh
   npm run dev
   ```
5. **Access the app** at `http://localhost:3000`

## 🏗 Deployment
Aask Senior is deployed on **Vercel**.
To deploy:
```sh
git push origin main
```
Vercel will automatically build and deploy your project.

## 📝 Future Enhancements
- 🔹 Add a messaging feature for direct student-alumni communication
- 🔹 Implement AI-based alumni recommendations
- 🔹 Enhance the UI with more filtering options

## 🧑‍💻 Author
**Varenyam Sharma**  
📧 Contact: varenyam2004@gmail.com

## 📜 License
This project is licensed under the **MIT License**. Feel free to use and modify it.

---
🚀 Happy Coding!

"# vproject" 
