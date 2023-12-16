document.getElementById('btn-spin').addEventListener('click', function() {
    var pauseIcon = document.getElementById('pause-icon');
    var playIcon = document.getElementById('play-icon');
  
    if (pauseIcon.style.display === 'none') {
      pauseIcon.style.display = 'inline';
      playIcon.style.display = 'none';
    } else {
      pauseIcon.style.display = 'none';
      playIcon.style.display = 'inline';
    }
  });