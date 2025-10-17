## AI Study Buddy - Smart Learning Platform 
A personalized learning platform that transforms study materials into interactive learning experiences using Generative AI. Upload your PDFs and lecture notes to get instant summaries, flashcards, and quizzes!

 Features
 Multi-format Support: Upload PDF, TXT, and MD files

 AI-Powered Processing: Uses Google Gemini AI for content analysis

 Smart Summaries: Generate concise, topic-wise summaries

 Interactive Flashcards: Create flashcards for quick memory recall

 Practice Quizzes: Generate multiple-choice questions for self-assessment

 Beautiful UI: Clean, responsive design with Pico.css

 Fast & Efficient: Real-time processing with instant results

 Tech Stack
Backend
FastAPI - Modern Python web framework

Google Gemini AI - Generative AI for content processing

PyPDF2 - PDF text extraction

Python-dotenv - Environment variable management

Frontend
Vanilla HTML, CSS, JavaScript - Lightweight and fast

Pico.css - Minimal CSS framework for styling

Fetch API - Backend communication

Installation & Setup
Prerequisites
Python 3.7+

Google Gemini API key

1. Clone the Repository
bash
git clone <your-repo-url>
cd ai-study-buddy
2. Backend Setup
bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
# Create a .env file with your Gemini API key
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env

# Run the backend server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
3. Frontend Setup
bash
# Open new terminal and navigate to frontend directory
cd frontend

# Serve the frontend
python -m http.server 3000
4. Access the Application
Frontend: http://localhost:3000

Backend API: http://localhost:8000

API Documentation: http://localhost:8000/docs

 Getting Your Gemini API Key
Visit Google AI Studio

Sign in with your Google account

Click "Get API key"

Create a new API key

Copy the key and add it to your backend/.env file

 How to Use
Upload Study Material

Click "Choose File" and select your PDF, TXT, or MD file

Click "Process with AI"

View AI-Generated Content

Summary Tab: Read the topic-wise summary

Flashcards Tab: Click flashcards to flip and learn

Quiz Tab: Test your knowledge with multiple-choice questions

Interactive Features

Flip flashcards by clicking on them

Select quiz answers and check your score

Switch between different content types using tabs

 Project Structure
text
```
ai-study-buddy/
├── backend/
│   ├── main.py              # FastAPI server and AI processing
│   ├── requirements.txt     # Python dependencies
│   ├── .env                # Environment variables (create this)
│   └── uploads/            # Temporary file storage
├── frontend/
│   ├── index.html          # Main application interface
│   ├── style.css           # Custom styles
│   └── script.js           # Frontend logic and API calls
└── README.md
```
🔧 API Endpoints
POST /upload/ - Upload and process study materials

GET /health - Health check endpoint

GET / - API information

 Customization
Styling
The app uses Pico.css by default. You can customize the appearance by:

Modifying frontend/style.css

Replacing Pico.css with another CSS framework

Adding custom CSS classes

AI Processing
Adjust the AI prompts in backend/main.py:

Modify summary_prompt for different summary formats

Change flashcard_prompt for custom flashcard styles

Update quiz_prompt for different question types

🐛 Troubleshooting
Common Issues
"ModuleNotFoundError: No module named 'pdfplumber'"

bash
pip install pdfplumber
"Network error: Failed to fetch"

Ensure backend is running on port 8000

Check CORS settings in backend

Verify API_BASE_URL in frontend

"500 Internal Server Error"

Check backend logs for detailed error message

Verify Gemini API key is valid

Ensure required packages are installed

"API key not found"

Create .env file in backend directory

Add GEMINI_API_KEY=your_key_here

Restart the backend server

Debug Mode
Enable detailed logging by checking the backend terminal for processing information.

 Future Enhancements
User accounts and saved sessions

Support for more file formats (DOCX, PPTX)

Export functionality (PDF, Anki decks)

Progress tracking and analytics

Collaborative learning features

Mobile app version
