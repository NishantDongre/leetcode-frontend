# CodeQuest

CodeQuest is a web application designed to offer a platform for solving coding challenges. Built with React, this frontend application provides users with a wide range of coding problems across various difficulty levels and topics. It offers real-time feedback, test case evaluation, and detailed explanations to help users understand their solutions. Users can submit their code, track their submissions, and monitor their progress over time.

## Features

- **Problem Listing:** Browse a collection of coding problems categorized by difficulty and topic.
- **Problem Description:** View detailed problem statements with Markdown support.
- **Code Editor:** Integrated Ace Editor with `multi-language support`, `themes`, and `syntax highlighting`.
- **Code Submission:** Real-time evaluation with instant feedback.
- **Test Case Evaluation:** Run and verify custom test cases before submission.
- **AI-Powered Code Review & Analysis:** Get instant feedback on code quality, efficiency, and improvements with `AI-driven` suggestions.
- **Editorial Access:** View detailed editorial explanations for problem solutions.
- **Submission History:** Track and review all previous submissions for each problem.
- **User-Friendly Interface:** Responsive design with a modern layout.
- **Problem Management (Admin):** Add, update, and manage problems efficiently.

## Pages

### 🏠 Home Page

The landing page showcases the platform's features, including an animated code snippet and a call-to-action button to start solving problems

<img width="1466" alt="Image" src="https://github.com/user-attachments/assets/f2f3cda8-f8f2-4be2-a167-da0bc1bd4b03" />
<p align="center"><i>Figure 1: Home Page.</i></p>

### 📋 Problem List

Displays all available problems in a table format, sortable by topic, with difficulty indicators and links to solve individual problems.

<img width="1466" alt="Image" src="https://github.com/user-attachments/assets/229bb9cf-bbfd-404e-830e-9bfd7fd79bd3" />
<p align="center"><i>Figure 2: All Problem List Page</i></p>

### 📜 Problem Description

#### The main coding interface where users can:

- Read problem descriptions with difficulty level and metadata
- Write code in the editor with multiple language selection (C++, Java, Python, etc.)
- Change code editor theme
- Solve problems with a timer
- Reset the code to the initial state
- Run code against custom test cases
- Submit solutions for evaluation
- Access problem editorials
- View submission history with detailed status (Accepted, Wrong Answer, Compile Error, etc.)
- Analyze past submissions for debugging and improvement solutions
- Get AI-powered code review for optimization and best practices
- Use AI-driven analysis to identify logic errors and performance bottlenecks

<img width="1465" alt="Image" src="https://github.com/user-attachments/assets/eca6fbeb-11c4-45f7-a32e-98987eb5d63f" />
<p align="center"><i>Figure 3: Problem Description Page</i></p>

<img width="1467" alt="image" src="https://github.com/user-attachments/assets/8dea4738-33d3-42a4-b79a-1eb85af36361" />
<p align="center"><i>Figure 4: Solution Accepted Console</i></p>

<img width="1467" alt="image" src="https://github.com/user-attachments/assets/da018357-dd11-459d-a254-9beda09bec98" />
<p align="center"><i>Figure 5: Editorial Section</i></p>

<img width="1466" alt="image" src="https://github.com/user-attachments/assets/3c87d478-204e-4af3-b67e-384ad31ddb69" />
<p align="center"><i>Figure 6: Past Submissions </i></p>

<img width="1468" alt="image" src="https://github.com/user-attachments/assets/c5e86405-aa00-405c-bdcc-edb3e5088970" />
<p align="center"><i>Figure 7: Analyzing Submitted Code using Gen-AI</i></p>

<img width="1467" alt="image" src="https://github.com/user-attachments/assets/bda1cca0-4d03-4e23-8824-3f7fc73bbd18" />
<p align="center"><i>Figure 8: AI-Powered Review of Submitted Code</i></p>

### 📝 Add Problem (Admin)

#### Interface for administrators to create new problems with:

- Problem details (title, description, difficulty, etc.)
- Test cases
- Code stubs for different languages
- Editorial content

<img width="1467" alt="Image" src="https://github.com/user-attachments/assets/9622c03d-1238-4c39-818f-9029dd0ac02d" />
<p align="center"><i>Figure 9: Create new Problem</i></p>

### ⚒️ Update Problem (Admin)

#### Interface for administrators to modify or update existing problems with:

- Problem metadata (title, description, difficulty, time limit)
- Test case management
- Code stub configuration for different languages
- Editorial content management

<img width="1463" alt="image" src="https://github.com/user-attachments/assets/f9beada0-27d3-4026-8f21-56b4a8d35867" />
<p align="center"><i>Figure 10: Update existing problem</i></p>

## 🧩 Key Components

### Code Editor

#### Built using Ace Editor, it provides:

- Syntax highlighting for multiple programming languages
- Theme and Language selection
- Auto-completion
- Line numbering

### Test Case Console

#### Allows users to:

- Input custom test cases
- View compilation results
- Debug their code

### Submission History

#### Tracks user's past submissions with:

- Status (Accepted, Wrong Answer, Compile Error, etc.)
- Submitted Code, Language and Timestamp
- Analyze and Review past submitted code

## Technologies Used

- **React:** For building the user interface.
- **React Router:** For navigation.
- **Axios:** For making HTTP requests.
- **Ace Editor:** For the code editor.
- **Socket.IO:** For real-time code submission feedback.
- **Tailwind CSS and Daisy UI:** For styling.
- **Lucide React:** For icons.

## Installation & Setup

### Prerequisites

- Node.js and npm (or yarn) installed.

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/NishantDongre/leetcode-frontend.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (`.env`):
   ```env
    VITE_PROBLEM_SERVICE_HOSTNAME=http://localhost:4000
    VITE_SUBMISSION_SERVICE_HOSTNAME=http://localhost:3000
    VITE_SOCKET_SERVICE_HOSTNAME=http://localhost:3001
   ```
4. Ensure the following backend services are running before starting the CodeQuest-Frontend: [Evaluator-Service](https://github.com/NishantDongre/Evaluator-Service), [Problem-Service](https://github.com/NishantDongre/Problem-Service), [Submission-Service](https://github.com/NishantDongre/Submission-Service) and [Socket-Service](https://github.com/NishantDongre/Socket-Service)

5. Start the service:
   ```sh
   npm run dev
   ```
6. Open your browser and navigate to [http://localhost:5173/](http://localhost:5173/)

## Contact

For queries, reach out at [Email](mailto:nishantdongre30@gmail.com) or [Linkedin](https://www.linkedin.com/in/nishant-dongre/)
