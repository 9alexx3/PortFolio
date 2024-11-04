let isDragging = false;
let startX, startY, endX, endY;

const selector = document.getElementById('selector');

document.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;

  selector.style.width = '0';
  selector.style.height = '0';
  selector.style.left = startX + 'px';
  selector.style.top = startY + 'px';
  selector.style.display = 'block';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  endX = e.clientX;
  endY = e.clientY;

  const width = endX - startX;
  const height = endY - startY;

  selector.style.width = Math.abs(width) + 'px';
  selector.style.height = Math.abs(height) + 'px';
  selector.style.left = (width > 0 ? startX : endX) + 'px';
  selector.style.top = (height > 0 ? startY : endY) + 'px';
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  selector.style.display = 'none';
  // Puedes realizar acciones adicionales con las coordenadas (startX, startY, endX, endY)
});