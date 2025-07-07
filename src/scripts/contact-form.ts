/**
 * Constants for CSS classes and selectors
 */
export const CLASSES = {
  HIDDEN: 'hidden',
};

/**
 * Helper function to convert FormData to a plain object
 */
export function formDataToObject(formData: FormData): Record<string, string> {
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
 * @param elements - The form elements to validate
 * @returns Whether the form is valid
 */
export function validateForm(elements: {
  nameInput: HTMLInputElement | null;
  emailInput: HTMLInputElement | null;
  phoneInput: HTMLInputElement | null;
  subjectInput: HTMLSelectElement | null;
  messageInput: HTMLTextAreaElement | null;
  privacyConsent: HTMLInputElement | null;
  botField: HTMLInputElement | null;
  errorElements: {
    nameError: HTMLElement | null;
    emailError: HTMLElement | null;
    phoneError: HTMLElement | null;
    subjectError: HTMLElement | null;
    messageError: HTMLElement | null;
    privacyError: HTMLElement | null;
  };
}): boolean {
  let isValid = true;
  const { 
    nameInput, emailInput, phoneInput, subjectInput, messageInput, privacyConsent, botField,
    errorElements: { nameError, emailError, phoneError, subjectError, messageError, privacyError }
  } = elements;
  
  // Reset error messages
  [nameError, emailError, phoneError, subjectError, messageError, privacyError].forEach(el => {
    if (el) el.classList.add(CLASSES.HIDDEN);
  });
  
  // Validate name
  if (nameInput && !nameInput.validity.valid) {
    if (nameError) nameError.classList.remove(CLASSES.HIDDEN);
    isValid = false;
  }
  
  // Validate email
  if (emailInput && !emailInput.validity.valid) {
    if (emailError) emailError.classList.remove(CLASSES.HIDDEN);
    isValid = false;
  }
  
  // Validate phone (if provided)
  if (phoneInput && phoneInput.value && !phoneInput.validity.valid) {
    if (phoneError) phoneError.classList.remove(CLASSES.HIDDEN);
    isValid = false;
  }
  
  // Validate subject
  if (subjectInput && (!subjectInput.value || !subjectInput.validity.valid)) {
    if (subjectError) subjectError.classList.remove(CLASSES.HIDDEN);
    isValid = false;
  }
  
  // Validate message
  if (messageInput && !messageInput.validity.valid) {
    if (messageError) messageError.classList.remove(CLASSES.HIDDEN);
    isValid = false;
  }
  
  // Validate privacy consent
  if (privacyConsent && !privacyConsent.checked) {
    if (privacyError) privacyError.classList.remove(CLASSES.HIDDEN);
    isValid = false;
  }
  
  // Check honeypot field
  if (botField && botField.value) {
    // Bot detected
    return false;
  }
  
  return isValid;
}

/**
 * Sets up the close button functionality
 */
export function setupCloseButtons(elements: {
  closeSuccess: HTMLElement;
  closeError: HTMLElement;
  successMessage: HTMLElement;
  errorMessage: HTMLElement;
}): void {
  const { closeSuccess, closeError, successMessage, errorMessage } = elements;
  
  closeSuccess.addEventListener('click', () => {
    successMessage.classList.add(CLASSES.HIDDEN);
  });
  
  closeError.addEventListener('click', () => {
    errorMessage.classList.add(CLASSES.HIDDEN);
  });
}

/**
 * Handles form submission asynchronously
 */
export async function handleFormSubmit(
  form: HTMLFormElement,
  elements: {
    submitButton: HTMLButtonElement;
    loadingButton: HTMLButtonElement;
    successMessage: HTMLElement;
    errorMessage: HTMLElement;
  },
  validateFormFn: () => boolean
): Promise<void> {
  const { submitButton, loadingButton, successMessage, errorMessage } = elements;
  
  if (!validateFormFn()) {
    return;
  }
  
  // Show loading state
  submitButton.classList.add(CLASSES.HIDDEN);
  loadingButton.classList.remove(CLASSES.HIDDEN);
  
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
      successMessage.classList.remove(CLASSES.HIDDEN);
      // Reset the form
      form.reset();
    } else {
      // Show error message
      errorMessage.classList.remove(CLASSES.HIDDEN);
    }
  } catch (error) {
    // Show error message
    errorMessage.classList.remove(CLASSES.HIDDEN);
    console.error('Form submission error:', error instanceof Error ? error.message : String(error));
  } finally {
    // Hide loading state
    submitButton.classList.remove(CLASSES.HIDDEN);
    loadingButton.classList.add(CLASSES.HIDDEN);
  }
}

/**
 * Initialize the contact form
 */
document.addEventListener('DOMContentLoaded', () => {
  // Get form elements
  const form = document.getElementById('contactForm') as HTMLFormElement | null;
  const submitButton = document.getElementById('submitButton') as HTMLButtonElement | null;
  const loadingButton = document.getElementById('loadingButton') as HTMLButtonElement | null;
  const successMessage = document.getElementById('successMessage') as HTMLDivElement | null;
  const errorMessage = document.getElementById('errorMessage') as HTMLDivElement | null;
  const closeSuccess = document.getElementById('closeSuccess') as HTMLButtonElement | null;
  const closeError = document.getElementById('closeError') as HTMLButtonElement | null;
  
  // Get form field elements
  const nameInput = document.getElementById('name') as HTMLInputElement | null;
  const emailInput = document.getElementById('email') as HTMLInputElement | null;
  const phoneInput = document.getElementById('phone') as HTMLInputElement | null;
  const subjectInput = document.getElementById('subject') as HTMLSelectElement | null;
  const messageInput = document.getElementById('message') as HTMLTextAreaElement | null;
  const privacyConsent = document.getElementById('privacyConsent') as HTMLInputElement | null;
  const botField = document.getElementById('bot-field') as HTMLInputElement | null;
  
  // Get error elements
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const phoneError = document.getElementById('phoneError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');
  const privacyError = document.getElementById('privacyError');
  
  if (form && submitButton && loadingButton && successMessage && errorMessage) {
    // Set up form submission
    form.addEventListener('submit', (e: SubmitEvent) => {
      e.preventDefault();
      
      const validateFormFn = () => validateForm({
        nameInput,
        emailInput,
        phoneInput,
        subjectInput,
        messageInput,
        privacyConsent,
        botField,
        errorElements: {
          nameError,
          emailError,
          phoneError,
          subjectError,
          messageError,
          privacyError
        }
      });
      
      void handleFormSubmit(
        form,
        { submitButton, loadingButton, successMessage, errorMessage },
        validateFormFn
      );
    });
  }
  
  // Set up close buttons for messages
  if (closeSuccess && closeError && successMessage && errorMessage) {
    setupCloseButtons({
      closeSuccess,
      closeError,
      successMessage,
      errorMessage
    });
  }
}); 