// Contact form validation
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm') as HTMLFormElement;
  
  if (form) {
    form.addEventListener('submit', (e) => {
      if (!validateForm()) {
        e.preventDefault();
      }
    });
  }
});

function validateForm(): boolean {
  let isValid = true;
  const nameInput = document.getElementById('name') as HTMLInputElement;
  const emailInput = document.getElementById('email') as HTMLInputElement;
  const phoneInput = document.getElementById('phone') as HTMLInputElement;
  const messageInput = document.getElementById('message') as HTMLTextAreaElement;
  const botField = document.getElementById('bot-field') as HTMLInputElement;
  
  // Reset error messages
  document.querySelectorAll('.text-red-500').forEach(el => {
    el.classList.add('hidden');
  });
  
  // Validate name
  if (nameInput && !nameInput.validity.valid) {
    document.getElementById('nameError')?.classList.remove('hidden');
    isValid = false;
  }
  
  // Validate email
  if (emailInput && !emailInput.validity.valid) {
    document.getElementById('emailError')?.classList.remove('hidden');
    isValid = false;
  }
  
  // Validate phone (if provided)
  if (phoneInput && phoneInput.value && !phoneInput.validity.valid) {
    document.getElementById('phoneError')?.classList.remove('hidden');
    isValid = false;
  }
  
  // Validate message
  if (messageInput && !messageInput.validity.valid) {
    document.getElementById('messageError')?.classList.remove('hidden');
    isValid = false;
  }
  
  // Check honeypot field
  if (botField && botField.value) {
    // Bot detected
    return false;
  }
  
  return isValid;
} 