let selectedTopic = "";
let selectedLevel = "";
let currentQuestionIndex = 0;
let answersCount = 0;

// Sample Questions Database (English)
const questionsDB = {
    "EC2": [
        "What is Amazon EC2 and how does it work?",
        "Explain the difference between Security Groups and NACLs.",
        "What are the different EC2 pricing models available?",
        "What is an AMI (Amazon Machine Image)?",
        "How do you scale EC2 instances automatically?",
        "What is the difference between EBS and Instance Store?",
        "How do you connect to an EC2 Linux instance securely?",
        "What is Elastic IP address in AWS?",
        "Explain EC2 Auto Scaling components.",
        "How do you recover an EC2 instance if it fails?"
    ],
    "S3": [
        "What is Amazon S3 and what are its primary use cases?",
        "Explain different S3 Storage Classes.",
        "What is S3 Bucket Versioning and why is it used?",
        "How do you secure data in Amazon S3?",
        "What is S3 Lifecycle Policy?",
        "Explain S3 Multipart Upload.",
        "What is the difference between S3 Bucket Policy and IAM Policy?",
        "How does Cross-Region Replication work in S3?",
        "What is S3 Select and how does it improve performance?",
        "How can you host a static website on Amazon S3?"
    ]
};

const defaultQuestions = [
    "What is the main purpose of this service in AWS?",
    "How does this service handle security and access control?",
    "What are the best practices for cost optimization in this service?",
    "Explain high availability features for this service.",
    "How do you monitor this service using CloudWatch?",
    "What is the disaster recovery strategy for this service?",
    "How does it integrate with other AWS core services?",
    "What are the performance bottlenecks you should avoid?",
    "Explain encryption in transit vs encryption at rest for this service.",
    "Describe a real-world architecture scenario using this service."
];

function nextSlide(slideNumber) {
    document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
    document.getElementById('slide' + slideNumber).classList.add('active');
}

function selectTopic(element, topic) {
    document.querySelectorAll('#topics-container .option-btn').forEach(btn => btn.classList.remove('selected'));
    element.classList.add('selected');
    selectedTopic = topic;
}

function selectLevel(element, level) {
    element.parentElement.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
    element.classList.add('selected');
    selectedLevel = level;
}

function startInterview() {
    if (!selectedTopic || !selectedLevel) {
        alert("Please select both a Topic and a Type!");
        return;
    }
    currentQuestionIndex = 0;
    answersCount = 0;
    showQuestion();
    nextSlide(3);
}

// Function to read the question aloud in English
function speakQuestion(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Stop any previous speech
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US'; // English voice
        utterance.rate = 1.0; // Normal speed
        window.speechSynthesis.speak(utterance);
    }
}

function showQuestion() {
    document.getElementById('q-num').innerText = currentQuestionIndex + 1;
    let activeQuestions = questionsDB[selectedTopic] || defaultQuestions;
    let qText = activeQuestions[currentQuestionIndex];
    
    document.getElementById('question-text').innerText = qText;
    document.getElementById('user-answer').value = "";

    // Speak the question aloud automatically
    speakQuestion(qText);
}

function submitAnswer() {
    let ans = document.getElementById('user-answer').value.trim();
    if (ans.length > 5) {
        answersCount++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < 10) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    // Stop speaking if any left
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }

    nextSlide(4);
    let resultContainer = document.getElementById('result-text');
    
    if (answersCount >= 9) {
        resultContainer.innerText = "SUPER ⭐⭐⭐⭐";
        resultContainer.style.color = "#28a745";
    } else if (answersCount >= 7) {
        resultContainer.innerText = "GOOD 👍";
        resultContainer.style.color = "#0056b3";
    } else if (answersCount >= 5) {
        resultContainer.innerText = "AVERAGE 👌";
        resultContainer.style.color = "#ffc107";
    } else {
        resultContainer.innerText = "BETTER (Need Improvement) 💡";
        resultContainer.style.color = "#dc3545";
    }
}

// Copy validation warning
function showValidation() {
    alert("⚠️ Warning: Copying text is not allowed during the Mock Interview!");
    return false;
}