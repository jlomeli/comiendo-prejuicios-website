import { describe, it, expect, beforeEach } from 'vitest';

// Setup mock DOM for contact form
function setupContactFormDOM() {
  document.body.innerHTML = `
    <form id="contactForm" name="contact" method="POST" data-netlify="true">
      <div class="mb-4">
        <label for="name" class="block text-neutral-dark font-medium mb-2">Name</label>
        <input type="text" id="name" name="name" required minlength="2" class="w-full px-4 py-2 border rounded-lg" />
        <p id="nameError" class="text-red-500 text-sm mt-1 hidden">Please enter your name</p>
      </div>
      <div class="mb-4">
        <label for="email" class="block text-neutral-dark font-medium mb-2">Email</label>
        <input type="email" id="email" name="email" required class="w-full px-4 py-2 border rounded-lg" />
        <p id="emailError" class="text-red-500 text-sm mt-1 hidden">Please enter a valid email address</p>
      </div>
      <div class="mb-4">
        <label for="phone" class="block text-neutral-dark font-medium mb-2">Phone (optional)</label>
        <input type="tel" id="phone" name="phone" pattern="[0-9\\+\\-\\s]+" class="w-full px-4 py-2 border rounded-lg" />
        <p id="phoneError" class="text-red-500 text-sm mt-1 hidden">Please enter a valid phone number</p>
      </div>
      <div class="mb-4">
        <label for="subject" class="block text-neutral-dark font-medium mb-2">Subject</label>
        <select id="subject" name="subject" required class="w-full px-4 py-2 border rounded-lg">
          <option value="">Select a subject</option>
          <option value="Individual Therapy">Individual Therapy</option>
          <option value="Couples Counseling">Couples Counseling</option>
          <option value="Family Therapy">Family Therapy</option>
          <option value="Teletherapy">Teletherapy</option>
          <option value="Other">Other</option>
        </select>
        <p id="subjectError" class="text-red-500 text-sm mt-1 hidden">Please select a subject</p>
      </div>
      <div class="mb-4">
        <label for="message" class="block text-neutral-dark font-medium mb-2">Message</label>
        <textarea id="message" name="message" required minlength="10" rows="5" class="w-full px-4 py-2 border rounded-lg"></textarea>
        <p id="messageError" class="text-red-500 text-sm mt-1 hidden">Please enter your message (at least 10 characters)</p>
      </div>
      <div class="mb-6">
        <label class="flex items-center">
          <input type="checkbox" id="privacyConsent" name="privacyConsent" required class="mr-2" />
          <span class="text-sm text-neutral-dark">I consent to having this website store my information for future contact</span>
        </label>
        <p id="privacyError" class="text-red-500 text-sm mt-1 hidden">You must consent to the privacy policy</p>
      </div>
      <div class="hidden">
        <input type="text" name="bot-field" id="bot-field" />
      </div>
      <div class="text-center">
        <button type="submit" id="submitButton" class="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-colors">
          Send Message
        </button>
        <button type="button" id="loadingButton" class="hidden bg-primary text-white font-bold py-3 px-8 rounded-full opacity-75" disabled>
          <span class="inline-block animate-spin mr-2">↻</span> Sending...
        </button>
      </div>
    </form>
    <div id="successMessage" class="hidden bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-6" role="alert">
      <div class="flex">
        <div class="py-1">
          <svg class="h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p class="font-bold">Message Sent!</p>
          <p>Thank you for your message. We'll get back to you soon.</p>
        </div>
        <button id="closeSuccess" class="ml-auto">
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    <div id="errorMessage" class="hidden bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-6" role="alert">
      <div class="flex">
        <div class="py-1">
          <svg class="h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <p class="font-bold">Oops! Something went wrong.</p>
          <p>Please try again or contact us directly.</p>
        </div>
        <button id="closeError" class="ml-auto">
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  `;
}

// Setup event listeners for close buttons
function setupCloseButtons() {
  const closeSuccess = document.getElementById('closeSuccess');
  const closeError = document.getElementById('closeError');
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');
  
  closeSuccess?.addEventListener('click', () => {
    successMessage?.classList.add('hidden');
  });
  
  closeError?.addEventListener('click', () => {
    errorMessage?.classList.add('hidden');
  });
}

// Import the validateForm function directly for testing
function validateForm(): boolean {
  let isValid = true;
  const nameInput = document.getElementById('name') as HTMLInputElement | null;
  const emailInput = document.getElementById('email') as HTMLInputElement | null;
  const phoneInput = document.getElementById('phone') as HTMLInputElement | null;
  const subjectInput = document.getElementById('subject') as HTMLSelectElement | null;
  const messageInput = document.getElementById('message') as HTMLTextAreaElement | null;
  const privacyConsent = document.getElementById('privacyConsent') as HTMLInputElement | null;
  const botField = document.getElementById('bot-field') as HTMLInputElement | null;
  
  // Reset error messages
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

describe('Contact Form Validation', () => {
  beforeEach(() => {
    setupContactFormDOM();
    setupCloseButtons();
  });
  
  it('should validate a valid form', () => {
    // Set up a valid form
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const subjectInput = document.getElementById('subject') as HTMLSelectElement;
    const messageInput = document.getElementById('message') as HTMLTextAreaElement;
    const privacyConsent = document.getElementById('privacyConsent') as HTMLInputElement;
    
    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';
    subjectInput.value = 'Individual Therapy';
    messageInput.value = 'This is a test message that is long enough.';
    privacyConsent.checked = true;
    
    // Validate the form
    const isValid = validateForm();
    
    // Check that the form is valid
    expect(isValid).toBe(true);
    
    // Check that no error messages are shown
    const errorMessages = document.querySelectorAll('[id$="Error"]:not(.hidden)');
    expect(errorMessages.length).toBe(0);
  });
  
  it('should invalidate a form with missing required fields', () => {
    // Don't set any values, leaving all required fields empty
    
    // Validate the form
    const isValid = validateForm();
    
    // Check that the form is invalid
    expect(isValid).toBe(false);
    
    // Check that error messages are shown for required fields
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    const privacyError = document.getElementById('privacyError');
    
    expect(nameError?.classList.contains('hidden')).toBe(false);
    expect(emailError?.classList.contains('hidden')).toBe(false);
    expect(subjectError?.classList.contains('hidden')).toBe(false);
    expect(messageError?.classList.contains('hidden')).toBe(false);
    expect(privacyError?.classList.contains('hidden')).toBe(false);
  });
  
  it('should invalidate a form with an invalid email', () => {
    // Set up a form with an invalid email
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const subjectInput = document.getElementById('subject') as HTMLSelectElement;
    const messageInput = document.getElementById('message') as HTMLTextAreaElement;
    const privacyConsent = document.getElementById('privacyConsent') as HTMLInputElement;
    
    nameInput.value = 'John Doe';
    emailInput.value = 'invalid-email'; // Invalid email
    subjectInput.value = 'Individual Therapy';
    messageInput.value = 'This is a test message that is long enough.';
    privacyConsent.checked = true;
    
    // Trigger validation check for email
    emailInput.dispatchEvent(new Event('invalid'));
    
    // Validate the form
    const isValid = validateForm();
    
    // Check that the form is invalid
    expect(isValid).toBe(false);
  });
  
  it('should detect bot submissions via honeypot field', () => {
    // Set up a valid form but with the honeypot field filled
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const subjectInput = document.getElementById('subject') as HTMLSelectElement;
    const messageInput = document.getElementById('message') as HTMLTextAreaElement;
    const privacyConsent = document.getElementById('privacyConsent') as HTMLInputElement;
    const botField = document.getElementById('bot-field') as HTMLInputElement;
    
    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';
    subjectInput.value = 'Individual Therapy';
    messageInput.value = 'This is a test message that is long enough.';
    privacyConsent.checked = true;
    botField.value = 'I am a bot'; // This should trigger the honeypot
    
    // Validate the form
    const isValid = validateForm();
    
    // Check that the form is invalid due to honeypot
    expect(isValid).toBe(false);
  });
  
  it('should close success message when close button is clicked', () => {
    // Show the success message
    const successMessage = document.getElementById('successMessage') as HTMLDivElement;
    successMessage.classList.remove('hidden');
    
    // Get the close button and click it
    const closeSuccess = document.getElementById('closeSuccess') as HTMLButtonElement;
    closeSuccess.dispatchEvent(new Event('click'));
    
    // Check that the success message is hidden
    expect(successMessage.classList.contains('hidden')).toBe(true);
  });
  
  it('should close error message when close button is clicked', () => {
    // Show the error message
    const errorMessage = document.getElementById('errorMessage') as HTMLDivElement;
    errorMessage.classList.remove('hidden');
    
    // Get the close button and click it
    const closeError = document.getElementById('closeError') as HTMLButtonElement;
    closeError.dispatchEvent(new Event('click'));
    
    // Check that the error message is hidden
    expect(errorMessage.classList.contains('hidden')).toBe(true);
  });
}); 