var textElement = document.getElementById('text-element');
var modal = document.getElementById('info-modal');
var popupContent = document.getElementById('popup-content');
var close = document.getElementsByClassName('close')[0];
var originalText = textElement.textContent;
var maxLength = 75;

if (originalText.length > maxLength) {
  var trimmedText = originalText.substr(0, maxLength) + ' ...click me!';
  textElement.textContent = trimmedText;

  textElement.addEventListener('click', function() {
    popupContent.textContent = originalText;
    modal.style.display = 'block'; 
  });

  close.onclick = function() {
    modal.style.display = 'none'; 
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none'; 
    }
  }
}