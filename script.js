/* script.js */
function flipCard(card) {
    card.classList.toggle('flipped');
    }
    
    
    function openModal(videoSrc) {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('modal-video').src = videoSrc;
    }
    
    
    function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('modal-video').src = '';
    }

    function openVideo(src) {
        const modal = document.getElementById('videoModal');
        const videoFrame = document.getElementById('videoFrame');
        videoFrame.src = src;
        modal.style.display = 'flex';
      }
      
      function closeVideo() {
        const modal = document.getElementById('videoModal');
        const videoFrame = document.getElementById('videoFrame');
        videoFrame.src = ""; // limpa para parar o vídeo
        modal.style.display = 'none';
      }