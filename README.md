# Talent Form API (Backend)

This is a serverless backend deployed on **Netlify Functions** that connects the Talent Form frontend to a **Supabase** database.

## 🚀 Key Features
- **Serverless Architecture:** Uses `exports.handler` for scalable, event-driven logic.
- **Supabase Integration:** Securely handles data insertion into the `forms` table using the Supabase Service Key.
- **CORS Enabled:** Configured to allow requests from the React/Vite frontend.

## 📡 API Endpoints
- **GET `/.netlify/functions/status`**: Checks if the backend is running.
- **POST `/.netlify/functions/submit`**: Accepts form data (Name, Age, Address, Email, Category, Description) and saves it to the database.

## 🛠 Setup & Environment
The project requires the following environment variables in Netlify:
- `SUPABASE_URL`: Your Supabase project URL.
- `SUPABASE_ANON_KEY`: Your Supabase API key.