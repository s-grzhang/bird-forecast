// Bird species data with Learn and Test images
const birdSpecies = [
  {
    name: "American Crow",
    learnImages: [
      "American Crow/Learn/American Crow.jpg",
      "American Crow/Learn/American Crow Juvenile.jpg",
      "American Crow/Learn/American Crow Flight.jpg"
    ],
    testImages: [
      "American Crow/Test/American Crow.jpg",
      "American Crow/Test/American Crow at Marymoor Park.jpg",
      "American Crow/Test/In Flight.jpg",
      "American Crow/Test/American Crow Silhouette.jpg"
    ],
    songFile: "placeholder-crow-song.mp3", // Placeholder
    macaulayEmbed: "placeholder-crow-embed" // Add actual Macaulay Library URL
  },
  {
    name: "American Robin",
    learnImages: [
      "American Robin/Learn/American Robin.jpg",
      "American Robin/Learn/American Robin Back.jpg",
      "American Robin/Learn/American Robin Flight T.jpg",
      "American Robin/Learn/American Robin Immature.jpg"
    ],
    testImages: [
      "American Robin/Test/american robin.jpeg",
      "American Robin/Test/American Robin Flight.jpg",
      "American Robin/Test/Robin Test.jpg",
      "American Robin/Test/American Robin Silhouette.jpg"
    ],
    songFile: "placeholder-robin-song.mp3", // Placeholder
    macaulayEmbed: "placeholder-robin-embed" // Add actual Macaulay Library URL
  },
  {
    name: "Anna's Hummingbird",
    learnImages: [
      "Anna's Hummingbird/Learn/F Anna's Hummingbird.jpg",
      "Anna's Hummingbird/Learn/Anna's Hummingbird Flight.jpg"
    ],
    testImages: [
      "Anna's Hummingbird/Test/anna's hummingbird.jpg",
      "Anna's Hummingbird/Test/Anna's Hummingbird F.jpg",
      "Anna's Hummingbird/Test/Anna's hummingbird backlit.jpg",
      "Anna's Hummingbird/Test/anna's hummingbird silhouette.jpg"
    ],
    songFile: "placeholder-hummingbird-song.mp3", // Placeholder
    macaulayEmbed: "placeholder-hummingbird-embed" // Add actual Macaulay Library URL
  },
  {
    name: "Bewick's Wren",
    learnImages: [
      "Bewick's Wren/Learn/Bewick's Wren.jpg",
      "Bewick's Wren/Learn/Bewick's Wren Front.jpg"
    ],
    testImages: [
      "Bewick's Wren/Test/Bewick's Wren - singing.JPG",
      "Bewick's Wren/Test/Bewick's Wren feeder.jpg",
      "Bewick's Wren/Test/Bewick's Wren Silhouette.jpg"
    ],
    songFile: "placeholder-wren-song.mp3", // Placeholder
    macaulayEmbed: "placeholder-wren-embed" // Add actual Macaulay Library URL
  },
  {
    name: "Black-capped Chickadee",
    learnImages: [
      "Black-capped Chickadee/Learn/Black-capped Chickadee.jpg",
      "Black-capped Chickadee/Learn/Black-capped Chickadee Front.jpg",
      "Black-capped Chickadee/Learn/Black-capped Chickadee Flight.jpg"
    ],
    testImages: [
      "Black-capped Chickadee/Test/black-capped-chickadee.jpg",
      "Black-capped Chickadee/Test/Black-capped Chickadee in Flight.jpg",
      "Black-capped Chickadee/Test/black capped chickadee silhouette.jpg",
      "Black-capped Chickadee/Test/black capped chickadee x2.jpg"
    ],
    songFile: "placeholder-chickadee-song.mp3", // Placeholder
    macaulayEmbed: "placeholder-chickadee-embed" // Add actual Macaulay Library URL
  },
  {
    name: "Dark-eyed Junco",
    learnImages: [
      "Dark-eyed Junco/Learn/52901081636_1b2b4426dd_b.jpg",
      "Dark-eyed Junco/Learn/dark-eyed junco flight.jpg",
      "Dark-eyed Junco/Learn/Dark-eyed Junco Immature.jpg"
    ],
    testImages: [
      "Dark-eyed Junco/Test/Dark-eyed Junco Back.jpg",
      "Dark-eyed Junco/Test/dark-eyed junco flight T.jpg",
      "Dark-eyed Junco/Test/Dark-eyed Junco Juvenile.jpg",
      "Dark-eyed Junco/Test/Dark-eyed Junco Silhouette.jpg"
    ],
    songFile: "placeholder-junco-song.mp3", // Placeholder
    macaulayEmbed: "placeholder-junco-embed" // Add actual Macaulay Library URL
  },
  {
    name: "European Starling",
    learnImages: [
      "European Starling/Learn/Breeding Adult European Starling.jpg",
      "European Starling/Learn/Nonbreeding Adult European Starling.jpg",
      "European Starling/Learn/Juvenile European Starling.jpg",
      "European Starling/Learn/European Starling Flight.jpg"
    ],
    testImages: [
      "European Starling/Test/European Starling on Branch.jpg",
      "European Starling/Test/European Starling in Flight.jpg",
      "European Starling/Test/European Starlings in Flight.jpg"
    ],
    songFile: "placeholder-starling-song.mp3", // Placeholder
    macaulayEmbed: "placeholder-starling-embed" // Add actual Macaulay Library URL
  },
  {
    name: "House Finch",
    learnImages: [
      "House Finch/Learn/House Finch.jpg",
      "House Finch/Learn/house finch flying.jpg",
      "House Finch/Learn/House Finch Steve Creek.jpeg"
    ],
    testImages: [
      "House Finch/Test/house finch back.jpg",
      "House Finch/Test/House Finch Flight.jpg",
      "House Finch/Test/house finch pair.jpg",
      "House Finch/Test/House-Finch-flying Josh Brown.jpg"
    ],
    songFile: "placeholder-finch-song.mp3", // Placeholder
    macaulayEmbed: "placeholder-finch-embed" // Add actual Macaulay Library URL
  },
  {
    name: "Northern Flicker",
    learnImages: [
      "Northern Flicker/Learn/Northern Flicker.jpg",
      "Northern Flicker/Learn/Female Northern Flicker.jpg",
      "Northern Flicker/Learn/Juvenile Northern Flicker.jpg",
      "Northern Flicker/Learn/northern Flicker Flight.jpg"
    ],
    testImages: [
      "Northern Flicker/Test/Northern Flicker Male.jpg",
      "Northern Flicker/Test/Northern Flicker flying.jpg",
      "Northern Flicker/Test/Northern Flicker on ground.jpg",
      "Northern Flicker/Test/Northern Flicker Silhouette.jpg"
    ],
    songFile: "placeholder-flicker-song.mp3", // Placeholder
    macaulayEmbed: "placeholder-flicker-embed" // Add actual Macaulay Library URL
  },
  {
    name: "Song Sparrow",
    learnImages: [
      "Song Sparrow/Learn/Song Sparrow PNW.jpg",
      "Song Sparrow/Learn/Song Sparrow PNW 2.jpg",
      "Song Sparrow/Learn/song sparrow flight.jpg",
      "Song Sparrow/Learn/Song Sparrow Juvenile.jpg"
    ],
    testImages: [
      "Song Sparrow/Test/Song Sparrow Flight.jpg",
      "Song Sparrow/Test/Song Sparrow Preening.jpg",
      "Song Sparrow/Test/Song Sparrow Silhouette.jpg",
      "Song Sparrow/Test/song sparrow wings.jpg"
    ],
    songFile: "placeholder-sparrow-song.mp3", // Placeholder
    macaulayEmbed: "https://macaulaylibrary.org/asset/638428041/embed"
  },
  {
    name: "Spotted Towhee",
    learnImages: [
      "Spotted Towhee/Learn/spotted towhee.jpg",
      "Spotted Towhee/Learn/spotted towhee immature T.jpg",
      "Spotted Towhee/Learn/3237559479_58d6100a8e_o.jpg"
    ],
    testImages: [
      "Spotted Towhee/Test/spotted towhee T.jpg",
      "Spotted Towhee/Test/spotted towhee immature.jpg",
      "Spotted Towhee/Test/spotted towhee flight.jpeg"
    ],
    songFile: "placeholder-towhee-song.mp3", // Placeholder
    macaulayEmbed: "placeholder-towhee-embed" // Add actual Macaulay Library URL
  },
  {
    name: "Steller's Jay",
    learnImages: [
      "Steller's Jay/Learn/Stellers-Jay.jpg",
      "Steller's Jay/Learn/Steller's Jay Flight.jpg"
    ],
    testImages: [
      "Steller's Jay/Test/Steller's Jay Test.jpg",
      "Steller's Jay/Test/Steller's Jay from below.jpg",
      "Steller's Jay/Test/Steller's Jay Takes off.jpg",
      "Steller's Jay/Test/Steller's Jay Silhouette.jpg"
    ],
    songFile: "placeholder-jay-song.mp3", // Placeholder
    macaulayEmbed: "placeholder-jay-embed" // Add actual Macaulay Library URL
  }
];

// Global quiz variables
let currentQuizType = null;
let currentQuestionIndex = 0;
let score = 0;
let quizQuestions = [];
let selectedAnswer = null;

// DOM Elements
const learnModeBtn = document.getElementById('learnModeBtn');
const quizModeBtn = document.getElementById('quizModeBtn');
const learningSection = document.getElementById('learningSection');
const quizSection = document.getElementById('quizSection');
const speciesGrid = document.getElementById('speciesGrid');
const imageLearnTab = document.getElementById('imageLearnTab');
const songLearnTab = document.getElementById('songLearnTab');
const imageLearnContent = document.getElementById('imageLearnContent');
const songLearnContent = document.getElementById('songLearnContent');
const songGrid = document.getElementById('songGrid');
const imageQuizBtn = document.getElementById('imageQuizBtn');
const songQuizBtn = document.getElementById('songQuizBtn');
const quizContainer = document.getElementById('quizContainer');
const quizResults = document.getElementById('quizResults');
const currentScore = document.getElementById('currentScore');
const currentQuestion = document.getElementById('currentQuestion');
const totalQuestions = document.getElementById('totalQuestions');
const totalQuestionsDisplay = document.getElementById('totalQuestionsDisplay');
const imageQuestion = document.getElementById('imageQuestion');
const songQuestion = document.getElementById('songQuestion');
const quizImage = document.getElementById('quizImage');
const quizAudioContainer = document.getElementById('quizAudioContainer');
const answerOptions = document.getElementById('answerOptions');
const feedback = document.getElementById('feedback');
const nextButton = document.getElementById('nextButton');
const finalScore = document.getElementById('finalScore');
const performanceMessage = document.getElementById('performanceMessage');
const restartButton = document.getElementById('restartButton');
const backToStudyButton = document.getElementById('backToStudyButton');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  initializeLearningMode();
  initializeSongLearning();
  setupEventListeners();
});

// Event Listeners
const setupEventListeners = () => {
  learnModeBtn.addEventListener('click', () => switchMode('learn'));
  quizModeBtn.addEventListener('click', () => switchMode('quiz'));
  imageLearnTab.addEventListener('click', () => switchLearningTab('image'));
  songLearnTab.addEventListener('click', () => switchLearningTab('song'));
  imageQuizBtn.addEventListener('click', () => startQuiz('image'));
  songQuizBtn.addEventListener('click', () => startQuiz('song'));
  nextButton.addEventListener('click', nextQuestion);
  restartButton.addEventListener('click', () => switchMode('quiz'));
  backToStudyButton.addEventListener('click', () => switchMode('learn'));
};

// Mode switching
const switchMode = (mode) => {
  if (mode === 'learn') {
    learnModeBtn.classList.add('active');
    quizModeBtn.classList.remove('active');
    learningSection.classList.add('active');
    quizSection.classList.remove('active');
    quizContainer.classList.remove('active');
    quizResults.classList.remove('active');
  } else {
    learnModeBtn.classList.remove('active');
    quizModeBtn.classList.add('active');
    learningSection.classList.remove('active');
    quizSection.classList.add('active');
    quizContainer.classList.remove('active');
    quizResults.classList.remove('active');
  }
};

// Initialize learning mode with species cards
const initializeLearningMode = () => {
  speciesGrid.innerHTML = '';
  
  birdSpecies.forEach((species, index) => {
    const card = createSpeciesCard(species, index);
    speciesGrid.appendChild(card);
  });
};

// Initialize song learning mode
const initializeSongLearning = () => {
  songGrid.innerHTML = '';
  
  birdSpecies.forEach((species, index) => {
    const card = createSongCard(species, index);
    songGrid.appendChild(card);
  });
};

// Switch between learning tabs
const switchLearningTab = (tabType) => {
  if (tabType === 'image') {
    imageLearnTab.classList.add('active');
    songLearnTab.classList.remove('active');
    imageLearnContent.classList.add('active');
    songLearnContent.classList.remove('active');
  } else {
    imageLearnTab.classList.remove('active');
    songLearnTab.classList.add('active');
    imageLearnContent.classList.remove('active');
    songLearnContent.classList.add('active');
  }
};

// Create a species card with image carousel
const createSpeciesCard = (species, index) => {
  const card = document.createElement('div');
  card.className = 'species-card';
  
  const carousel = createImageCarousel(species.learnImages, index);
  
  card.innerHTML = `
    <h3>${species.name}</h3>
    ${carousel}
  `;
  
  return card;
};

// Create a song card with embedded audio
const createSongCard = (species, index) => {
  const card = document.createElement('div');
  card.className = 'song-card';
  
  let embedContent = '';
  
  if (species.macaulayEmbed && !species.macaulayEmbed.includes('placeholder')) {
    // Real Macaulay Library embed
    embedContent = `
      <div class="song-embed-container">
        <iframe src="${species.macaulayEmbed}" 
                height="92" 
                width="640" 
                frameborder="0" 
                allowfullscreen>
        </iframe>
      </div>
    `;
  } else {
    // Placeholder for missing audio
    embedContent = `
      <div class="song-embed-container">
        <div class="song-placeholder">
          <div class="icon">🎵</div>
          <p><strong>Song coming soon!</strong></p>
          <p>Add the Macaulay Library embed URL for ${species.name} to enable audio playback.</p>
        </div>
      </div>
    `;
  }
  
  card.innerHTML = `
    <h3>${species.name}</h3>
    ${embedContent}
  `;
  
  return card;
};

// Create image carousel for learning
const createImageCarousel = (images, speciesIndex) => {
  const carouselHtml = `
    <div class="image-carousel" id="carousel-${speciesIndex}">
      ${images.map((image, index) => 
        `<img src="${image}" alt="Learning image" class="carousel-image ${index === 0 ? 'active' : ''}" 
         onerror="this.style.display='none'">`
      ).join('')}
      <div class="carousel-controls">
        ${images.map((_, index) => 
          `<div class="carousel-dot ${index === 0 ? 'active' : ''}" 
           onclick="showCarouselImage(${speciesIndex}, ${index})"></div>`
        ).join('')}
      </div>
    </div>
  `;
  
  return carouselHtml;
};

// Show specific carousel image
const showCarouselImage = (speciesIndex, imageIndex) => {
  const carousel = document.getElementById(`carousel-${speciesIndex}`);
  const images = carousel.querySelectorAll('.carousel-image');
  const dots = carousel.querySelectorAll('.carousel-dot');
  
  images.forEach((img, index) => {
    img.classList.toggle('active', index === imageIndex);
  });
  
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === imageIndex);
  });
};

// Start quiz
const startQuiz = (quizType) => {
  currentQuizType = quizType;
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswer = null;
  
  // Generate 10 random questions
  quizQuestions = generateQuizQuestions(10);
  
  // Update UI
  quizContainer.classList.add('active');
  quizResults.classList.remove('active');
  currentScore.textContent = '0';
  totalQuestions.textContent = '10';
  totalQuestionsDisplay.textContent = '10';
  
  // Show appropriate question type
  if (quizType === 'image') {
    imageQuestion.classList.remove('hidden');
    songQuestion.classList.add('hidden');
  } else {
    imageQuestion.classList.add('hidden');
    songQuestion.classList.remove('hidden');
  }
  
  loadQuestion();
};

// Generate random quiz questions
const generateQuizQuestions = (count) => {
  const questions = [];
  
  for (let i = 0; i < count; i++) {
    // Pick a random correct answer
    const correctSpecies = birdSpecies[Math.floor(Math.random() * birdSpecies.length)];
    
    // Pick a random test image for this species
    const testImages = correctSpecies.testImages.filter(img => img); // Filter out any null/undefined
    const questionImage = testImages[Math.floor(Math.random() * testImages.length)];
    
    // Generate 3 wrong answers
    const wrongAnswers = [];
    while (wrongAnswers.length < 3) {
      const randomSpecies = birdSpecies[Math.floor(Math.random() * birdSpecies.length)];
      if (randomSpecies.name !== correctSpecies.name && !wrongAnswers.includes(randomSpecies.name)) {
        wrongAnswers.push(randomSpecies.name);
      }
    }
    
    // Shuffle answers
    const allAnswers = [correctSpecies.name, ...wrongAnswers];
    shuffleArray(allAnswers);
    
    questions.push({
      correctAnswer: correctSpecies.name,
      image: questionImage,
      songFile: correctSpecies.songFile,
      options: allAnswers
    });
  }
  
  return questions;
};

// Shuffle array utility
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// Load current question
const loadQuestion = () => {
  const question = quizQuestions[currentQuestionIndex];
  
  // Update question counter
  currentQuestion.textContent = currentQuestionIndex + 1;
  
  // Load question content
  if (currentQuizType === 'image') {
    quizImage.src = question.image;
    quizImage.onerror = () => {
      quizImage.src = '/images/placeholder-bird.jpg'; // Fallback image
    };
  } else if (currentQuizType === 'song') {
    // Load Macaulay Library embed
    const species = birdSpecies.find(s => s.name === question.correctAnswer);
    if (species && species.macaulayEmbed && !species.macaulayEmbed.includes('placeholder')) {
      quizAudioContainer.innerHTML = `
        <iframe src="${species.macaulayEmbed}" 
                height="92" 
                width="640" 
                frameborder="0" 
                allowfullscreen>
        </iframe>
      `;
    } else {
      quizAudioContainer.innerHTML = `
        <div class="quiz-audio-placeholder">
          🎵 Audio coming soon! Add the Macaulay Library embed URL for ${question.correctAnswer}.
        </div>
      `;
    }
  }
  
  // Create answer options
  answerOptions.innerHTML = '';
  question.options.forEach(option => {
    const button = document.createElement('button');
    button.className = 'answer-button';
    button.textContent = option;
    button.onclick = () => selectAnswer(option, button);
    answerOptions.appendChild(button);
  });
  
  // Reset feedback and next button
  feedback.classList.add('hidden');
  nextButton.classList.add('hidden');
  selectedAnswer = null;
  
  // Reset answer button styles
  document.querySelectorAll('.answer-button').forEach(btn => {
    btn.classList.remove('correct', 'incorrect');
  });
};

// Handle answer selection
const selectAnswer = (answer, buttonElement) => {
  if (selectedAnswer) return; // Prevent multiple selections
  
  selectedAnswer = answer;
  const question = quizQuestions[currentQuestionIndex];
  const isCorrect = answer === question.correctAnswer;
  
  // Update score
  if (isCorrect) {
    score++;
    currentScore.textContent = score;
  }
  
  // Style buttons
  document.querySelectorAll('.answer-button').forEach(btn => {
    if (btn.textContent === question.correctAnswer) {
      btn.classList.add('correct');
    } else if (btn === buttonElement && !isCorrect) {
      btn.classList.add('incorrect');
    }
    btn.style.pointerEvents = 'none'; // Disable further clicks
  });
  
  // Show feedback
  feedback.classList.remove('hidden');
  if (isCorrect) {
    feedback.className = 'feedback correct';
    feedback.textContent = '✓ Correct! Well done!';
  } else {
    feedback.className = 'feedback incorrect';
    feedback.textContent = `✗ Incorrect. The correct answer is ${question.correctAnswer}.`;
  }
  
  // Show next button
  nextButton.classList.remove('hidden');
};

// Move to next question
const nextQuestion = () => {
  currentQuestionIndex++;
  
  if (currentQuestionIndex < quizQuestions.length) {
    loadQuestion();
  } else {
    showResults();
  }
};

// Show quiz results
const showResults = () => {
  quizContainer.classList.remove('active');
  quizResults.classList.add('active');
  
  const percentage = Math.round((score / quizQuestions.length) * 100);
  finalScore.textContent = `${score}/${quizQuestions.length} (${percentage}%)`;
  
  // Performance message
  let message = '';
  if (percentage >= 90) {
    message = '🏆 Excellent! You\'re a bird identification expert!';
  } else if (percentage >= 70) {
    message = '👍 Great job! You know your birds well!';
  } else if (percentage >= 50) {
    message = '👌 Good effort! Try studying the birds more and take the quiz again.';
  } else {
    message = '📚 Keep studying! Practice makes perfect in bird identification.';
  }
  
  performanceMessage.textContent = message;
};

// Note: Audio playback is now handled by Macaulay Library embeds
// No additional JavaScript needed for audio controls 