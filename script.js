document.addEventListener('DOMContentLoaded', () => {
  const bow = document.getElementById('bow');
  const arrow = document.getElementById('arrow');
  const targetPhoto = document.getElementById('target-photo');
  const shootButton = document.getElementById('shoot-button');
  const rightPhoto = document.getElementById('right-photo');
  const heartsContainer = document.getElementById('hearts-container');
  const gameDiv = document.getElementById('game'); // Referência à div 'game'
  
  const targetImages = [
    './images/1.jpeg',
    './images/2.jpeg',
    './images/4.jpeg',
    './images/8.jpeg',
    './images/10.jpeg',
    './images/11.jpeg',
    './images/12.jpeg',
    './images/13.jpeg',
    './images/14.jpeg'
    // Adicione mais imagens conforme necessário
  ];
  let currentTargetIndex = 0;

  shootButton.addEventListener('click', () => {
    if (shootButton.textContent === 'Reiniciar') {
      resetGame();
      return;
    }

    // Change the bow image to the tensioned bow
    bow.src = 'play-tensioned.png';

    // Delay before the arrow starts moving
    setTimeout(() => {
      // Show the arrow
      arrow.classList.remove('hidden');

      // Move the arrow to the right photo
      arrow.style.left = `${rightPhoto.offsetLeft - 60}px`; // Adjust the position based on your image sizes

      // Change the bow image back to the initial bow after the arrow is released
      bow.src = 'play-initial.png';
    }, 300); // Delay before the arrow starts moving

    // After the arrow animation, hide the arrow and reset the bow
    arrow.addEventListener('transitionend', () => {
      // Show the target photo in the middle
      targetPhoto.src = targetImages[currentTargetIndex];
      targetPhoto.classList.remove('hidden');
      targetPhoto.classList.add('show'); // Add class to show the photo with transition
      targetPhoto.style.left = `calc(50% - ${targetPhoto.width / 2}px)`; // Center the target photo horizontally

      setTimeout(() => {
        // Hide the target photo and arrow
        targetPhoto.classList.remove('show'); // Remove class to hide the photo with transition
        setTimeout(() => {
          targetPhoto.classList.add('hidden');
        }, 500); // Wait for the transition to finish before adding the hidden class

        arrow.classList.add('hidden');

        // Move the arrow back to its initial position
        arrow.style.left = '120px';
      }, 2000); // Delay before hiding the target photo and resetting the arrow

      // Check if it's the last target photo
      if (currentTargetIndex === targetImages.length - 1) {
        // Change button text and display a message
        shootButton.textContent = 'Atirar com força máxima';
        showMessage('Você atingiu o último alvo!');
        document.querySelector("#game").style.background = "#FFE6ED";
        document.querySelector("#game").style.justifyContent = "center";
        document.querySelector("body").style.background = "#fff";

        document.querySelector("#game").innerHTML = `<h1 style="color: #1F2E65">Quer namorar comigo?</h1>`
        shootButton.style.display = "none"
        document.querySelector(".message").style.display = "none"
      }

      // Move to the next target image
      currentTargetIndex = (currentTargetIndex + 1) % targetImages.length;

      for (let i = 0; i < 2; i++) {

      // Add heart photo inside the game div
      const heart = document.createElement('img');
      heart.src = 'heart1.png'; // Adjust this to the path of your heart image
      heart.classList.add('heart');
      heart.style.position = 'absolute';

      // Randomize heart position inside the game div
      const randomX = Math.random() * (gameDiv.clientWidth - 40) + 20; // Random X position within the game div
      const randomY = Math.random() * (gameDiv.clientHeight - 40) + 20; // Random Y position within the game div
      heart.style.left = `${randomX}px`; // Adjust this to position the heart correctly
      heart.style.top = `${randomY}px`; // Adjust this to position the heart correctly

      heartsContainer.appendChild(heart);
    }}, { once: true });
  });

  function showMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add('message');
    document.body.appendChild(messageElement);
  }

  function resetGame() {
    currentTargetIndex = 0;
    shootButton.textContent = 'Atirar';
    messageDiv.classList.add('hidden');
    heartsContainer.innerHTML = ''; // Clear hearts
    bow.src = 'play-initial.png'; // Reset bow to initial image
    rightPhoto.src = 'right-photo.png'; // Reset right photo
    targetPhoto.src = ''; // Clear target photo
  }
});
