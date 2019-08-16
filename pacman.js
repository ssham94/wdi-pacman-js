// Setup initial game stats
let score = 0;
let lives = 2;
let powerPellets = 4;
let dots = 240;


// Define your ghosts here
const inky = {
  menu_option: '1',
  name: 'Inky',
  color: 'Red',
  character: 'Shadow',
  edible: false
};

const blinky = {
  menu_option: '2',
  name: 'Blinky',
  color: 'Cyan',
  character: 'Speedy',
  edible: false
}

const pinky = {
  menu_option: '3',
  name: 'Pinky',
  color: 'Pink',
  character: 'Bashful',
  edible: false
}

const clyde = {
  menu_option: '4',
  name: 'Clyde',
  color: 'Orange',
  character: 'Pokey',
  edible: false
}

let ghosts = [inky, blinky, pinky, clyde];


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(() => {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log(`Score: ${score}     Lives: ${lives}`);
  console.log(`\nDots: ${dots}`);
  console.log(`\nPower-Pellets: ${powerPellets}`);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  if (dots > 0) {
    console.log('(d) Eat Dot');
  }
  if (dots >= 10) {
    console.log('(t) Eat 10 dots')
  }
  if (dots >= 100) {
    console.log('(h) Eat 100 dots')
  }
  if (powerPellets > 0) {
    console.log('(p) Eat Pellet')
  }
  if (ghosts[0]['edible'] == false){
    console.log('(1) Eat Inky (inedible)');
  } else {
    console.log('(1) Eat Inky (edible)');
  }
  if (ghosts[1]['edible'] == false){
    console.log('(2) Eat Blinky (inedible)');
  } else {
    console.log('(2) Eat Blinky (edible)');
  }
  if (ghosts[2]['edible'] == false){
    console.log('(3) Eat Pinky (inedible)');
  } else {
    console.log('(3) Eat Pinky (edible)');
  }
  if (ghosts[3]['edible'] == false){
    console.log('(4) Eat Clyde (inedible)');
  } else {
    console.log('(4) Eat Clyde (edible)');
  }
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  if (dots > 0){
    console.log('\nChomp!');
    score += 10;
    dots -= 1;
  } else {
    console.log('\nNo more dots left!');
  }
}

function eatTenDot() {
  if (dots >= 10) {
    console.log('\nChomp!');
    score += 100;
    dots -= 10;
  } else {
    console.log('\nNot enough dots!')
  }
}

function eatHundredDot() {
  if (dots >= 100) {
    console.log('\nChomp!');
    score += 1000;
    dots -=100;
  } else {
    console.log('\nNot enough dots!');
  }
}

function checkLife() {
  if (lives > 0) {
    console.log('Still alive')
  } else {
    return process.exit()
  }
}

function eatGhost(ghost) {
  if (ghosts[ghost]['edible'] == false) {
    lives -= 1;
    console.log(`\n${ghosts[ghost]['name']} was not edible, lose a life`);
    checkLife();
  } 
  if (ghosts[ghost]['edible'] == true){
    score += 200;
    console.log(`\nYou ate ${ghosts[ghost]['name']}!`);
    ghosts[ghost]['edible'] = false;
  }
}

function eatPowerPellet() {
  if (powerPellets > 0) {
    console.log('\nBig Chomp!')
    score += 50;
    powerPellets -= 1;
    for (let i = 0; i < ghosts.length; i++){
      ghosts[i]['edible'] = true;
    }
  } else {
    console.log('\nNo more power pellets to eat!');
  }
}



// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'p':
      eatPowerPellet();
      break;
    case 'd':
      eatDot();
      break;
    case 't':
      eatTenDot();
      break;
    case 'h':
      eatHundredDot();
      break;
    case '1':
      eatGhost(0);
      break;
    case '2':
      eatGhost(1);
      break;
    case '3':
      eatGhost(2);
      break;
    case '4':
      eatGhost(3);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', (key) => {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});




// Player Quits
process.on('exit', () => {
  console.log('\n\nGame Over!\n');
});
