// Contact form validation
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm') as HTMLFormElement | null;
  const submitButton = document.getElementById('submitButton') as HTMLButtonElement | null;
  const loadingButton = document.getElementById('loadingButton') as HTMLButtonElement | null;
  const successMessage = document.getElementById('successMessage') as HTMLDivElement | null;
  const errorMessage = document.getElementById('errorMessage') as HTMLDivElement | null;
  const closeSuccess = document.getElementById('closeSuccess') as HTMLButtonElement | null;
  const closeError = document.getElementById('closeError') as HTMLButtonElement | null;
  
  // Set up form submission
  if (form) {
    // Fix for @typescript-eslint/no-misused-promises - wrap async function in regular function
    form.addEventListener('submit', (e: SubmitEvent) => {
      e.preventDefault();
      void handleFormSubmit(form, submitButton, loadingButton, successMessage, errorMessage);
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

/**
 * Handles form submission asynchronously
 */
async function handleFormSubmit(
  form: HTMLFormElement,
  submitButton: HTMLButtonElement | null,
  loadingButton: HTMLButtonElement | null,
  successMessage: HTMLDivElement | null,
  errorMessage: HTMLDivElement | null
): Promise<void> {
  if (!validateForm()) {
    return;
  }
  
  // Show loading state
  if (submitButton) submitButton.classList.add('hidden');
  if (loadingButton) loadingButton.classList.remove('hidden');
  
  try {
    // Submit the form data using Fetch API
    const formData = new FormData(form);
    
    // Add the form name to the data (important for Netlify)
    formData.append("form-name", "contact");
    
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formDataToObject(formData)).toString()
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
    console.error('Form submission error:', error instanceof Error ? error.message : String(error));
  } finally {
    // Hide loading state
    if (submitButton) submitButton.classList.remove('hidden');
    if (loadingButton) loadingButton.classList.add('hidden');
  }
}

/**
 * Helper function to convert FormData to a plain object
 */
function formDataToObject(formData: FormData): Record<string, string> {
  // Create an object from the form data entries
  const object: Record<string, string> = {};
  // Use type assertion to access entries() method
  const entries = Array.from((formData as unknown as { entries(): Iterable<[string, FormDataEntryValue]> }).entries());
  
  for (const [key, value] of entries) {
    // Only handle string values
    if (typeof value === 'string') {
      object[key] = value;
    }
  }
  
  return object;
}

/**
 * Validates the contact form
 * @returns {boolean} Whether the form is valid
 */
function validateForm(): boolean {
  let isValid = true;
  const nameInput = document.getElementById('name') as HTMLInputElement | null;
  const emailInput = document.getElementById('email') as HTMLInputElement | null;
  const phoneInput = document.getElementById('phone') as HTMLInputElement | null;
  const subjectInput = document.getElementById('subject') as HTMLSelectElement | null;
  const messageInput = document.getElementById('message') as HTMLTextAreaElement | null;
  const privacyConsent = document.getElementById('privacyConsent') as HTMLInputElement | null;
  const botField = document.getElementById('bot-field') as HTMLInputElement | null;
  
  // Reset error messages - use a more specific selector that only targets error messages
  document.querySelectorAll('[id$="Error"]').forEach(el => {
    el.classList.add('hidden');
  });
  
  // Validate name
  if (nameInput && !nameInput.validity.valid) {
    const nameError = document.getElementById('nameError');
    if (nameError) nameError.classList.remove('hidden');
    isValid = false;
  }
  
  // Validate email
  if (emailInput && !emailInput.validity.valid) {
    const emailError = document.getElementById('emailError');
    if (emailError) emailError.classList.remove('hidden');
    isValid = false;
  }
  
  // Validate phone (if provided)
  if (phoneInput && phoneInput.value && !phoneInput.validity.valid) {
    const phoneError = document.getElementById('phoneError');
    if (phoneError) phoneError.classList.remove('hidden');
    isValid = false;
  }
  
  // Validate subject
  if (subjectInput && (!subjectInput.value || !subjectInput.validity.valid)) {
    const subjectError = document.getElementById('subjectError');
    if (subjectError) subjectError.classList.remove('hidden');
    isValid = false;
  }
  
  // Validate message
  if (messageInput && !messageInput.validity.valid) {
    const messageError = document.getElementById('messageError');
    if (messageError) messageError.classList.remove('hidden');
    isValid = false;
  }
  
  // Validate privacy consent
  if (privacyConsent && !privacyConsent.checked) {
    const privacyError = document.getElementById('privacyError');
    if (privacyError) privacyError.classList.remove('hidden');
    isValid = false;
  }
  
  // Check honeypot field
  if (botField && botField.value) {
    // Bot detected
    return false;
  }
  
  return isValid;
} 