// src/data/puzzles.js
const puzzles = [
    {
        question: "Which of these is a phishing email?",
        options: [
            { text: "From: teacher@school.edu — 'Submit your homework'", isCorrect: false },
            { text: "From: techsupport@school-hacks.net — 'Urgent account update!'", isCorrect: true }
        ]
    },
    {
        question: "Which password is the strongest?",
        options: [
            { text: "password123", isCorrect: false },
            { text: "F@stC4r_2024!", isCorrect: true }
        ]
    },
    {
        question: "Which website URL is suspicious?",
        options: [
            { text: "https://www.google.com", isCorrect: false },
            { text: "http://log1n-google-account.com", isCorrect: true }
        ]
    },
    {
        question: "What does a firewall do?",
        options: [
            { text: "Heats up your CPU", isCorrect: false },
            { text: "Blocks unauthorized access to a network", isCorrect: true }
        ]
    }
];

export default puzzles;