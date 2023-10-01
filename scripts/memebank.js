// Sample 'memebank' array with objects
const memebank = [
  { 
    name: "Meme 1",
    image:"",
  },
  { 
    name: "Meme 1",
    image:"",
  },
  { 
    name: "Meme 1",
    image:"",
  },
  { 
    name: "Meme 1",
    image:"",
  },
  { 
    name: "Meme 1",
    image:"",
  },
  { 
    name: "Meme 1",
    image:"",
  },
  { 
    name: "Meme 1",
    image:"",
  },
  { 
    name: "Meme 1",
    image:"",
  },
  { 
    name: "Meme 1",
    image:"",
  },
  { 
    name: "Meme 1",
    image:"",
  },
  { 
    name: "Meme 1",
    image:"",
  },
  

  // Add more meme objects as needed
];

// Initialize the 'selectedMemes' array
const selectedMemes = [];

// Function to select random objects from 'memebank'
function getRandomMemes(arr, numMemes) {
  const shuffled = arr.slice(); // Create a shallow copy of the array
  let currentIndex = shuffled.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex > 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    temporaryValue = shuffled[currentIndex];
    shuffled[currentIndex] = shuffled[randomIndex];
    shuffled[randomIndex] = temporaryValue;
  }

  // Return the first 'numMemes' elements from the shuffled array
  return shuffled.slice(0, numMemes);
}

// Select 3 random memes from 'memebank' and push them into 'selectedMemes'
const numMemesToSelect = 3;
const randomlySelectedMemes = getRandomMemes(memebank, numMemesToSelect);
selectedMemes.push(...randomlySelectedMemes);

console.log(selectedMemes);
