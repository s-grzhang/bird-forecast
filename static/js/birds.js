// Bird species data with Learn and Test images
const birdSpecies = [
  {
    name: "American Crow",
    learnImages: [
      "/images/American-Crow/Learn/American Crow.jpg",
      "/images/American-Crow/Learn/American Crow Juvenile.jpg",
      "/images/American-Crow/Learn/American Crow Flight.jpg"
    ],
    testImages: [
      "/images/American-Crow/Test/American Crow.jpg",
      "/images/American-Crow/Test/American Crow at Marymoor Park.jpg",
      "/images/American-Crow/Test/In Flight.jpg",
      "/images/American-Crow/Test/American Crow Silhouette.jpg"
    ],
    songFile: "placeholder-crow-song.mp3", // Placeholder
    macaulayEmbed:"https://macaulaylibrary.org/asset/637067223/embed",
    macaulayCallEmbed: "https://macaulaylibrary.org/asset/32684421/embed", // Add actual Macaulay Library call URL
    soundFiles: [
      "/sounds/American_Crow_Sounds/XC156526 - American Crow - Corvus brachyrhynchos.mp3",
      "/sounds/American_Crow_Sounds/XC159919 - American Crow - Corvus brachyrhynchos.mp3",
      "/sounds/American_Crow_Sounds/XC159112 - American Crow - Corvus brachyrhynchos.mp3",
      "/sounds/American_Crow_Sounds/XC543339 - American Crow - Corvus brachyrhynchos.mp3"
    ]
  },
  {
    name: "American Robin",
    learnImages: [
      "/images/American-Robin/Learn/American Robin.jpg",
      "/images/American-Robin/Learn/American Robin Back.jpg",
      "/images/American-Robin/Learn/American Robin Flight T.jpg",
      "/images/American-Robin/Learn/American Robin Immature.jpg"
    ],
    testImages: [
      "/images/American-Robin/Test/american robin.jpeg",
      "/images/American-Robin/Test/American Robin Flight.jpg",
      "/images/American-Robin/Test/Robin Test.jpg",
      "/images/American-Robin/Test/American Robin Silhouette.jpg"
    ],
    songFile: "placeholder-robin-song.mp3", // Placeholder
    macaulayEmbed: "https://macaulaylibrary.org/asset/236798101/embed", // Add actual Macaulay Library URL
    macaulayCallEmbed: "https://macaulaylibrary.org/asset/213807211/embed", // Add actual Macaulay Library call URL
    soundFiles: [
      "/sounds/American_Robin_Sounds/XC686190 - American Robin - Turdus migratorius.mp3",
      "/sounds/American_Robin_Sounds/XC666135 - American Robin - Turdus migratorius.mp3",
      "/sounds/American_Robin_Sounds/XC722625 - American Robin - Turdus migratorius.mp3",
      "/sounds/American_Robin_Sounds/XC418153 - American Robin - Turdus migratorius.mp3"
    ]
  },
  {
    name: "Anna's Hummingbird",
    learnImages: [
      "/images/Anna-Hummingbird/Learn/F Anna's Hummingbird.jpg",
      "/images/Anna-Hummingbird/Learn/Anna's Hummingbird Flight.jpg"
    ],
    testImages: [
      "/images/Anna-Hummingbird/Test/anna's hummingbird.jpg",
      "/images/Anna-Hummingbird/Test/Anna's Hummingbird F.jpg",
      "/images/Anna-Hummingbird/Test/Anna's hummingbird backlit.jpg",
      "/images/Anna-Hummingbird/Test/anna's hummingbird silhouette.jpg"
    ],
    songFile: "placeholder-hummingbird-song.mp3", // Placeholder
    macaulayEmbed: "https://macaulaylibrary.org/asset/197952/embed", // Add actual Macaulay Library URL
    macaulayCallEmbed: "https://macaulaylibrary.org/asset/119442/embed", // Add actual Macaulay Library call URL
    soundFiles: [
      "/sounds/Anna_Hummingbird_Sounds/XC958843 - Anna's Hummingbird - Calypte anna.wav",
      "/sounds/Anna_Hummingbird_Sounds/XC958832 - Anna's Hummingbird - Calypte anna.wav",
      "/sounds/Anna_Hummingbird_Sounds/XC473411 - Anna's Hummingbird - Calypte anna.mp3",
      "/sounds/Anna_Hummingbird_Sounds/XC549602 - Anna's Hummingbird - Calypte anna.mp3"
    ]
  },
  {
    name: "Bewick's Wren",
    learnImages: [
      "/images/Bewick-Wren/Learn/Bewick's Wren.jpg",
      "/images/Bewick-Wren/Learn/Bewick's Wren Front.jpg"
    ],
    testImages: [
      "/images/Bewick-Wren/Test/Bewick's Wren - singing.JPG",
      "/images/Bewick-Wren/Test/Bewick's Wren feeder.jpg",
      "/images/Bewick-Wren/Test/Bewick's Wren Silhouette.jpg"
    ],
    songFile: "placeholder-wren-song.mp3", // Placeholder
    macaulayEmbed: "https://macaulaylibrary.org/asset/165287021/embed", // Add actual Macaulay Library URL
    macaulayCallEmbed: "https://macaulaylibrary.org/asset/181459151/embed", // Add actual Macaulay Library call URL
    soundFiles: [
      "/sounds/Bewick_Wren_Sounds/XC269166 - Bewick's Wren - Thryomanes bewickii calophonus.mp3",
      "/sounds/Bewick_Wren_Sounds/XC784043 - Bewick's Wren - Thryomanes bewickii.wav",
      "/sounds/Bewick_Wren_Sounds/XC963169 - Bewick's Wren - Thryomanes bewickii.wav",
      "/sounds/Bewick_Wren_Sounds/XC527509 - Bewick's Wren - Thryomanes bewickii.mp3"
    ]
  },
  {
    name: "Black-capped Chickadee",
    learnImages: [
      "/images/Black-capped Chickadee/Learn/Black-capped Chickadee.jpg",
      "/images/Black-capped Chickadee/Learn/Black-capped Chickadee Front.jpg",
      "/images/Black-capped Chickadee/Learn/Black-capped Chickadee Flight.jpg"
    ],
    testImages: [
      "/images/Black-capped Chickadee/Test/black-capped-chickadee.jpg",
      "/images/Black-capped Chickadee/Test/Black-capped Chickadee in Flight.jpg",
      "/images/Black-capped Chickadee/Test/black capped chickadee silhouette.jpg",
      "/images/Black-capped Chickadee/Test/black capped chickadee x2.jpg"
    ],
    songFile: "placeholder-chickadee-song.mp3", // Placeholder
    macaulayEmbed: "https://macaulaylibrary.org/asset/87371481/embed", // Add actual Macaulay Library URL
    macaulayCallEmbed: "https://macaulaylibrary.org/asset/638292737/embed", // Add actual Macaulay Library call URL
    soundFiles: [
      "/sounds/Black_capped_Chickadee_Sounds/XC545025 - Black-capped Chickadee - Poecile atricapillus.mp3",
      "/sounds/Black_capped_Chickadee_Sounds/XC659639 - Black-capped Chickadee - Poecile atricapillus.mp3",
      "/sounds/Black_capped_Chickadee_Sounds/XC582380 - Black-capped Chickadee - Poecile atricapillus.mp3",
      "/sounds/Black_capped_Chickadee_Sounds/XC544967 - Black-capped Chickadee - Poecile atricapillus.mp3"
    ]
  },
  {
    name: "Dark-eyed Junco",
    learnImages: [
      "/images/Dark-eyed Junco/Learn/52901081636_1b2b4426dd_b.jpg",
      "/images/Dark-eyed Junco/Learn/dark-eyed junco flight.jpg",
      "/images/Dark-eyed Junco/Learn/Dark-eyed Junco Immature.jpg"
    ],
    testImages: [
      "/images/Dark-eyed Junco/Test/Dark-eyed Junco Back.jpg",
      "/images/Dark-eyed Junco/Test/dark-eyed junco flight T.jpg",
      "/images/Dark-eyed Junco/Test/Dark-eyed Junco Juvenile.jpg",
      "/images/Dark-eyed Junco/Test/Dark-eyed Junco Silhouette.jpg"
    ],
    songFile: "placeholder-junco-song.mp3", // Placeholder
    macaulayEmbed: "https://macaulaylibrary.org/asset/236790421/embed", // Add actual Macaulay Library URL
    macaulayCallEmbed: "https://macaulaylibrary.org/asset/169731/embed", // Add actual Macaulay Library call URL
    soundFiles: [
      "/sounds/Dark_eyed_Junco_Sounds/XC766386 - Dark-eyed Junco - Junco hyemalis.wav",
      "/sounds/Dark_eyed_Junco_Sounds/XC878339 - Dark-eyed Junco - Junco hyemalis.wav",
      "/sounds/Dark_eyed_Junco_Sounds/XC469746 - Dark-eyed Junco - Junco hyemalis.mp3",
      "/sounds/Dark_eyed_Junco_Sounds/XC473419 - Dark-eyed Junco - Junco hyemalis.mp3"
    ]
  },
  {
    name: "European Starling",
    learnImages: [
      "/images/European Starling/Learn/Breeding Adult European Starling.jpg",
      "/images/European Starling/Learn/Nonbreeding Adult European Starling.jpg",
      "/images/European Starling/Learn/Juvenile European Starling.jpg",
      "/images/European Starling/Learn/European Starling Flight.jpg"
    ],
    testImages: [
      "/images/European Starling/Test/European Starling on Branch.jpg",
      "/images/European Starling/Test/European Starling in Flight.jpg",
      "/images/European Starling/Test/European Starlings in Flight.jpg"
    ],
    songFile: "placeholder-starling-song.mp3", // Placeholder
    macaulayEmbed: "https://macaulaylibrary.org/asset/619814616/embed", // Add actual Macaulay Library URL
    macaulayCallEmbed: "https://macaulaylibrary.org/asset/404865791/embed", // Add actual Macaulay Library call URL
    soundFiles: [
      "/sounds/European_Starling_Sounds/XC977796 - Common Starling - Sturnus vulgaris.mp3",
      "/sounds/European_Starling_Sounds/XC1012688 - Common Starling - Sturnus vulgaris.wav",
      "/sounds/European_Starling_Sounds/XC1003433 - Common Starling - Sturnus vulgaris.mp3",
      "/sounds/European_Starling_Sounds/XC995266 - Common Starling - Sturnus vulgaris vulgaris.wav"
    ]
  },
  {
    name: "House Finch",
    learnImages: [
      "/images/House Finch/Learn/House Finch.jpg",
      "/images/House Finch/Learn/house finch flying.jpg",
      "/images/House Finch/Learn/House Finch Steve Creek.jpeg"
    ],
    testImages: [
      "/images/House Finch/Test/house finch back.jpg",
      "/images/House Finch/Test/House Finch Flight.jpg",
      "/images/House Finch/Test/house finch pair.jpg",
      "/images/House Finch/Test/House-Finch-flying Josh Brown.jpg"
    ],
    songFile: "placeholder-finch-song.mp3", // Placeholder
    macaulayEmbed: "https://macaulaylibrary.org/asset/635377528/embed", // Add actual Macaulay Library URL
    macaulayCallEmbed: "https://macaulaylibrary.org/asset/637601152/embed", // Add actual Macaulay Library call URL
    soundFiles: [
      "/sounds/House_Finch_Sounds/XC440009 - House Finch - Haemorhous mexicanus.mp3",
      "/sounds/House_Finch_Sounds/XC468779 - House Finch - Haemorhous mexicanus.mp3",
      "/sounds/House_Finch_Sounds/XC658900 - House Finch - Haemorhous mexicanus.mp3",
      "/sounds/House_Finch_Sounds/XC822626 - House Finch - Haemorhous mexicanus.wav"
    ]
  },
  {
    name: "Northern Flicker",
    learnImages: [
      "/images/Northern Flicker/Learn/Northern Flicker.jpg",
      "/images/Northern Flicker/Learn/Female Northern Flicker.jpg",
      "/images/Northern Flicker/Learn/Juvenile Northern Flicker.jpg",
      "/images/Northern Flicker/Learn/northern Flicker Flight.jpg"
    ],
    testImages: [
      "/images/Northern Flicker/Test/Northern Flicker Male.jpg",
      "/images/Northern Flicker/Test/Northern Flicker flying.jpg",
      "/images/Northern Flicker/Test/Northern Flicker on ground.jpg",
      "/images/Northern Flicker/Test/Northern Flicker Silhouette.jpg"
    ],
    songFile: "placeholder-flicker-song.mp3", // Placeholder
    macaulayEmbed: "https://macaulaylibrary.org/asset/633158877/embed", // Add actual Macaulay Library URL
    macaulayCallEmbed: "https://macaulaylibrary.org/asset/111016/embed", // Add actual Macaulay Library call URL
    soundFiles: [
      "/sounds/Northern_Flicker_Sounds/XC753469 - Northern Flicker - Colaptes auratus cafer.mp3",
      "/sounds/Northern_Flicker_Sounds/XC822641 - Northern Flicker - Colaptes auratus.wav",
      "/sounds/Northern_Flicker_Sounds/XC964340 - Northern Flicker - Colaptes auratus.wav",
      "/sounds/Northern_Flicker_Sounds/XC1007124 - Northern Flicker - Colaptes auratus.mp3"
    ]
  },
  {
    name: "Song Sparrow",
    learnImages: [
      "/images/Song-Sparrow/Learn/Song Sparrow PNW.jpg",
      "/images/Song-Sparrow/Learn/Song Sparrow PNW 2.jpg",
      "/images/Song-Sparrow/Learn/song sparrow flight.jpg",
      "/images/Song-Sparrow/Learn/Song Sparrow Juvenile.jpg"
    ],
    testImages: [
      "/images/Song-Sparrow/Test/Song Sparrow Flight.jpg",
      "/images/Song-Sparrow/Test/Song Sparrow Preening.jpg",
      "/images/Song-Sparrow/Test/Song Sparrow Silhouette.jpg",
      "/images/Song-Sparrow/Test/song sparrow wings.jpg"
    ],
    songFile: "placeholder-sparrow-song.mp3", // Placeholder
    macaulayEmbed: "https://macaulaylibrary.org/asset/638428041/embed",
    macaulayCallEmbed: "https://macaulaylibrary.org/asset/638587357/embed",
    soundFiles: [
      "/sounds/Song_Sparrow_Sounds/XC972394 - Song Sparrow - Melospiza melodia.wav",
      "/sounds/Song_Sparrow_Sounds/XC420592 - Song Sparrow - Melospiza melodia.mp3",
      "/sounds/Song_Sparrow_Sounds/XC540240 - Song Sparrow - Melospiza melodia.mp3",
      "/sounds/Song_Sparrow_Sounds/XC545910 - Song Sparrow - Melospiza melodia.mp3"
    ]
  },
  {
    name: "Spotted Towhee",
    learnImages: [
      "/images/Spotted Towhee/Learn/spotted towhee.jpg",
      "/images/Spotted Towhee/Learn/spotted towhee immature T.jpg",
      "/images/Spotted Towhee/Learn/3237559479_58d6100a8e_o.jpg"
    ],
    testImages: [
      "/images/Spotted Towhee/Test/spotted towhee T.jpg",
      "/images/Spotted Towhee/Test/spotted towhee immature.jpg",
      "/images/Spotted Towhee/Test/spotted towhee flight.jpeg"
    ],
    songFile: "placeholder-towhee-song.mp3", // Placeholder
    macaulayEmbed: "https://macaulaylibrary.org/asset/22914/embed", // Add actual Macaulay Library URL
    macaulayCallEmbed: "https://macaulaylibrary.org/asset/99340/embed", // Add actual Macaulay Library call URL
    soundFiles: [
      "/sounds/Spotted_Towhee_Sounds/XC972205 - Spotted Towhee - Pipilo maculatus.wav",
      "/sounds/Spotted_Towhee_Sounds/XC972216 - Spotted Towhee - Pipilo maculatus.wav",
      "/sounds/Spotted_Towhee_Sounds/XC1015396 - Spotted Towhee - Pipilo maculatus oregonus.mp3",
      "/sounds/Spotted_Towhee_Sounds/XC545912 - Spotted Towhee - Pipilo maculatus.mp3"
    ]
  },
  {
    name: "Steller's Jay",
    learnImages: [
      "/images/Steller's Jay/Learn/Stellers-Jay.jpg",
      "/images/Steller's Jay/Learn/Steller's Jay Flight.jpg"
    ],
    testImages: [
      "/images/Steller's Jay/Test/Steller's Jay Test.jpg",
      "/images/Steller's Jay/Test/Steller's Jay from below.jpg",
      "/images/Steller's Jay/Test/Steller's Jay Takes off.jpg",
      "/images/Steller's Jay/Test/Steller's Jay Silhouette.jpg"
    ],
    songFile: "placeholder-jay-song.mp3", // Placeholder
    macaulayEmbed: "https://macaulaylibrary.org/asset/623547073/embed", // Add actual Macaulay Library URL
    macaulayCallEmbed: "https://macaulaylibrary.org/asset/638565842/embed", // Add actual Macaulay Library call URL
    soundFiles: [
      "/sounds/Steller_Jay_Sounds/XC441356 - Steller's Jay - Cyanocitta stelleri.mp3",
      "/sounds/Steller_Jay_Sounds/XC540290 - Steller's Jay - Cyanocitta stelleri.mp3",
      "/sounds/Steller_Jay_Sounds/XC940917 - Steller's Jay - Cyanocitta stelleri.wav",
      "/sounds/Steller_Jay_Sounds/XC829229 - Steller's Jay - Cyanocitta stelleri.mp3"
    ]
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
const soundQuizBtn = document.getElementById('soundQuizBtn');
const soundQuestion = document.getElementById('soundQuestion');
const quizSoundContainer = document.getElementById('quizSoundContainer');
const playSoundButton = document.getElementById('playSoundButton');
const soundFileName = document.getElementById('soundFileName');
const quizAudio = document.getElementById('quizAudio');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  // Debug: Check if all required elements exist
  const requiredElements = [
    'learnModeBtn', 'quizModeBtn', 'learningSection', 'quizSection',
    'speciesGrid', 'imageLearnTab', 'songLearnTab', 'imageLearnContent',
    'songLearnContent', 'songGrid', 'imageQuizBtn',
    'quizContainer', 'quizResults', 'currentScore', 'currentQuestion',
    'totalQuestions', 'totalQuestionsDisplay', 'imageQuestion', 'songQuestion',
    'quizImage', 'quizAudioContainer', 'answerOptions', 'feedback',
    'nextButton', 'finalScore', 'performanceMessage', 'restartButton',
    'backToStudyButton', 'soundQuizBtn', 'soundQuestion', 'quizSoundContainer',
    'playSoundButton', 'soundFileName', 'quizAudio'
  ];
  
  const missingElements = requiredElements.filter(id => !document.getElementById(id));
  if (missingElements.length > 0) {
    console.error('Missing elements:', missingElements);
  }
  
  initializeLearningMode();
  initializeSongLearning();
  setupEventListeners();
});

// Event Listeners
const setupEventListeners = () => {
  console.log('Setting up event listeners...');
  
  if (learnModeBtn) {
    learnModeBtn.addEventListener('click', () => {
      console.log('Learn mode button clicked');
      switchMode('learn');
    });
  }
  
  if (quizModeBtn) {
    quizModeBtn.addEventListener('click', () => {
      console.log('Quiz mode button clicked');
      switchMode('quiz');
    });
  }
  
  if (imageLearnTab) {
    imageLearnTab.addEventListener('click', () => {
      console.log('Image learn tab clicked');
      switchLearningTab('image');
    });
  }
  
  if (songLearnTab) {
    songLearnTab.addEventListener('click', () => {
      console.log('Song learn tab clicked');
      switchLearningTab('song');
    });
  }
  
  if (imageQuizBtn) {
    imageQuizBtn.addEventListener('click', () => {
      console.log('Image quiz button clicked');
      startQuiz('image');
    });
  }
  

  
  if (soundQuizBtn) {
    soundQuizBtn.addEventListener('click', () => {
      console.log('Sound quiz button clicked');
      startQuiz('sound');
    });
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', nextQuestion);
  }
  
  if (restartButton) {
    restartButton.addEventListener('click', () => switchMode('quiz'));
  }
  
  if (backToStudyButton) {
    backToStudyButton.addEventListener('click', () => switchMode('learn'));
  }
  
  console.log('Event listeners setup complete');
};

// Mode switching
const switchMode = (mode) => {
  console.log('Switching to mode:', mode);
  
  if (mode === 'learn') {
    console.log('Switching to learn mode');
    learnModeBtn.classList.add('active');
    quizModeBtn.classList.remove('active');
    learningSection.classList.add('active');
    quizSection.classList.remove('active');
    quizContainer.classList.remove('active');
    quizResults.classList.remove('active');
  } else {
    console.log('Switching to quiz mode');
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
  console.log('Switching learning tab to:', tabType);
  
  if (tabType === 'image') {
    console.log('Switching to image tab');
    imageLearnTab.classList.add('active');
    songLearnTab.classList.remove('active');
    imageLearnContent.classList.add('active');
    songLearnContent.classList.remove('active');
  } else {
    console.log('Switching to song tab');
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

// Create a song card with embedded audio (songs and calls)
const createSongCard = (species, index) => {
  const card = document.createElement('div');
  card.className = 'song-card';
  
  let embedContent = '';
  
  // Check if we have actual song embed
  const hasSong = species.macaulayEmbed && !species.macaulayEmbed.includes('placeholder');
  const hasCall = species.macaulayCallEmbed && !species.macaulayCallEmbed.includes('placeholder');
  
  // Special handling for Northern Flicker - use Call and Drum instead of Song and Call
  const isNorthernFlicker = species.name === "Northern Flicker";
  // Special handling for Steller's Jay - use Call for both sections instead of Song and Call
  const isStellersJay = species.name === "Steller's Jay";
  const isStellersJayAmericanCrow = species.name === "Steller's Jay" || species.name === "American Crow";
  const firstLabel = isNorthernFlicker ? "📢 Call" : (isStellersJayAmericanCrow ? "📢 Call" : "🎵 Song");
  const secondLabel = isNorthernFlicker ? "🥁 Drum" : (isStellersJayAmericanCrow ? "📢 Call" : "📢 Call");
  
  if (hasSong || hasCall) {
    embedContent = '<div class="song-embed-container">';
    
    // Add first audio section (Song for most birds, Call for Northern Flicker)
    if (hasSong) {
      embedContent += `
        <div class="audio-section">
          <h4 class="audio-label">${firstLabel}</h4>
          <iframe src="${species.macaulayEmbed}" 
                  height="120" 
                  width="640" 
                  frameborder="0" 
                  allowfullscreen>
          </iframe>
        </div>
      `;
    } else {
      embedContent += `
        <div class="audio-section">
          <h4 class="audio-label">${firstLabel}</h4>
          <div class="audio-placeholder">
            <p>${isNorthernFlicker ? 'Call' : (isStellersJayAmericanCrow ? 'Call' : 'Song')} embed coming soon!</p>
          </div>
        </div>
      `;
    }
    
    // Add second audio section (Call for most birds, Drum for Northern Flicker)
    if (hasCall) {
      embedContent += `
        <div class="audio-section">
          <h4 class="audio-label">${secondLabel}</h4>
          <iframe src="${species.macaulayCallEmbed}" 
                  height="120" 
                  width="640" 
                  frameborder="0" 
                  allowfullscreen>
          </iframe>
        </div>
      `;
    } else {
      embedContent += `
        <div class="audio-section">
          <h4 class="audio-label">${secondLabel}</h4>
          <div class="audio-placeholder">
            <p>${isNorthernFlicker ? 'Drum' : (isStellersJayAmericanCrow ? 'Call' : 'Call')} embed coming soon!</p>
          </div>
        </div>
      `;
    }
    
    embedContent += '</div>';
  } else {
    // Placeholder for completely missing audio
    const audioTypes = isNorthernFlicker ? "calls and drums" : (isStellersJayAmericanCrow ? "calls" : "songs and calls");
    embedContent = `
      <div class="song-embed-container">
        <div class="song-placeholder">
          <div class="icon">🎵</div>
          <p><strong>Audio coming soon!</strong></p>
          <p>Add Macaulay Library embed URLs for ${species.name} ${audioTypes}.</p>
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
    
    // For song quizzes, randomly choose between song and call
    const audioType = Math.random() < 0.5 ? 'song' : 'call';
    
    questions.push({
      correctAnswer: correctSpecies.name,
      image: questionImage,
      songFile: correctSpecies.songFile,
      audioType: audioType,
      options: allAnswers
    });
  }
  
  return questions;
};

// Generate random sound quiz questions
const generateSoundQuizQuestions = (count) => {
  const questions = [];
  for (let i = 0; i < count; i++) {
    // Pick a random species with at least one sound file
    let validSpecies = birdSpecies.filter(s => s.soundFiles && s.soundFiles.length > 0);
    const correctSpecies = validSpecies[Math.floor(Math.random() * validSpecies.length)];
    // Pick a random sound file for this species
    const soundFile = correctSpecies.soundFiles[Math.floor(Math.random() * correctSpecies.soundFiles.length)];
    // Generate 3 wrong answers
    const wrongAnswers = [];
    while (wrongAnswers.length < 3) {
      const randomSpecies = validSpecies[Math.floor(Math.random() * validSpecies.length)];
      if (randomSpecies.name !== correctSpecies.name && !wrongAnswers.includes(randomSpecies.name)) {
        wrongAnswers.push(randomSpecies.name);
      }
    }
    // Shuffle answers
    const allAnswers = [correctSpecies.name, ...wrongAnswers];
    shuffleArray(allAnswers);
    questions.push({
      correctAnswer: correctSpecies.name,
      soundFile: soundFile,
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

// Start quiz
const startQuiz = (quizType) => {
  currentQuizType = quizType;
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswer = null;
  
  // Generate 10 random questions
  if (quizType === 'sound') {
    quizQuestions = generateSoundQuizQuestions(10);
  } else {
    quizQuestions = generateQuizQuestions(10);
  }
  
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
    soundQuestion.classList.add('hidden');
  } else if (quizType === 'song') {
    imageQuestion.classList.add('hidden');
    songQuestion.classList.remove('hidden');
    soundQuestion.classList.add('hidden');
  } else if (quizType === 'sound') {
    imageQuestion.classList.add('hidden');
    songQuestion.classList.add('hidden');
    soundQuestion.classList.remove('hidden');
  }
  
  loadQuestion();
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
    // Load Macaulay Library embed (randomly choose song or call)
    const species = birdSpecies.find(s => s.name === question.correctAnswer);
    const audioType = question.audioType; // This will be set during question generation
    let embedUrl = null;
    let audioLabel = '';
    
    if (audioType === 'song') {
      embedUrl = species.macaulayEmbed;
      audioLabel = '🎵 Song';
    } else {
      embedUrl = species.macaulayCallEmbed;
      audioLabel = '📢 Call';
    }
    
    if (species && embedUrl && !embedUrl.includes('placeholder')) {
      quizAudioContainer.innerHTML = `
        <div class="quiz-audio-header">
          <p><strong>${audioLabel}</strong></p>
        </div>
        <iframe src="${embedUrl}" 
                height="92" 
                width="640" 
                frameborder="0" 
                allowfullscreen>
        </iframe>
      `;
    } else {
      quizAudioContainer.innerHTML = `
        <div class="quiz-audio-placeholder">
          ${audioLabel} coming soon! Add the Macaulay Library embed URL for ${question.correctAnswer}.
        </div>
      `;
    }
  } else if (currentQuizType === 'sound') {
    // Set up audio player for sound quiz
    quizAudio.src = question.soundFile;
    quizAudio.load();
    soundFileName.textContent = 'Bird Sound'; // Generic name to avoid giving away the answer
    quizAudio.currentTime = 0;
    playSoundButton.textContent = '▶';
    playSoundButton.disabled = false;
    
    // Set up play button functionality
    playSoundButton.onclick = () => {
      if (quizAudio.paused) {
        quizAudio.play();
        playSoundButton.textContent = '⏸';
      } else {
        quizAudio.pause();
        playSoundButton.textContent = '▶';
      }
    };
    
    quizAudio.onended = () => {
      playSoundButton.textContent = '▶';
    };
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