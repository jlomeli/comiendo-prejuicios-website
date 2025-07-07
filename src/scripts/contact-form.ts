// Contact form validation
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm') as HTMLFormElement;
  const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
  const loadingButton = document.getElementById('loadingButton') as HTMLButtonElement;
  const successMessage = document.getElementById('successMessage') as HTMLDivElement;
  const errorMessage = document.getElementById('errorMessage') as HTMLDivElement;
  const closeSuccess = document.getElementById('closeSuccess') as HTMLButtonElement;
  const closeError = document.getElementById('closeError') as HTMLButtonElement;
  
  // Set up form submission
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (!validateForm()) {
        return;
      }
      
      // Show loading state
      if (submitButton) submitButton.classList.add('hidden');
      if (loadingButton) loadingButton.classList.remove('hidden');
      
      try {
        // Submit the form data using Fetch API
        const formData = new FormData(form);
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData as any).toString()
        });
        
        if (response.ok) {
          // Show success message
          if (successMessage) successMessage.classList.remove('hidden');
          // Reset the form
          form.reset();
        } else {
          // Show error message
          if (errorMessage) errorMessage.classList.remove('hidden');
        }
      } catch (error) {
        // Show error message
        if (errorMessage) errorMessage.classList.remove('hidden');
        console.error('Form submission error:', error);
      } finally {
        // Hide loading state
        if (submitButton) submitButton.classList.remove('hidden');
        if (loadingButton) loadingButton.classList.add('hidden');
      }
    });
  }
  
  // Set up close buttons for messages
  if (closeSuccess) {
    closeSuccess.addEventListener('click', () => {
      if (successMessage) successMessage.classList.add('hidden');
    });
  }
  
  if (closeError) {
    closeError.addEventListener('click', () => {
      if (errorMessage) errorMessage.classList.add('hidden');
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