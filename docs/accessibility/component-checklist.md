# Component Accessibility Checklist

Use this checklist when developing or updating components to ensure they meet accessibility standards.

## General Component Requirements

- [ ] Uses semantic HTML elements appropriate for content
- [ ] Includes appropriate ARIA attributes where needed
- [ ] All interactive elements are keyboard accessible
- [ ] Focus states are clearly visible
- [ ] Color contrast meets WCAG 2.1 AA standards (4.5:1 for normal text, 3:1 for large text)
- [ ] Text can be resized up to 200% without loss of content or functionality
- [ ] Component works with screen readers (tested with at least one screen reader)
- [ ] No content flashes more than 3 times per second

## Component-Specific Requirements

### NavBar Component

- [ ] Uses `<nav>` element with `aria-label="Main navigation"`
- [ ] Mobile menu button has `aria-expanded` state that updates correctly
- [ ] Mobile menu button has accessible label
- [ ] Focus is trapped within mobile menu when open
- [ ] ESC key closes the mobile menu
- [ ] Current page/section is indicated to screen readers
- [ ] Skip-to-content link is first focusable element

### Hero Component

- [ ] Main heading uses `<h1>` element
- [ ] All images have appropriate alt text
- [ ] Background images have sufficient contrast with text
- [ ] CTA buttons have descriptive text
- [ ] No essential content is conveyed by color alone

### About Component

- [ ] Proper heading hierarchy (`<h2>` or appropriate level)
- [ ] Images include descriptive alt text
- [ ] Text has sufficient contrast against background
- [ ] Buttons have descriptive labels
- [ ] Links are distinguishable by more than just color

### Services Component

- [ ] Service items use appropriate list semantics (`<ul>` or `<ol>`)
- [ ] Service cards are keyboard navigable
- [ ] Icons have appropriate aria-hidden or alt text
- [ ] Proper heading hierarchy within service descriptions
- [ ] Interactive elements have clear focus states

### Testimonials Component

- [ ] Carousel/slider has appropriate ARIA roles
- [ ] Next/previous controls are keyboard accessible
- [ ] Controls have descriptive labels
- [ ] Automatic rotation can be paused
- [ ] Current slide is announced to screen readers
- [ ] Filtering controls are properly labeled

### Contact Component

- [ ] Form inputs have associated labels
- [ ] Required fields are indicated both visually and to screen readers
- [ ] Error messages are linked to their respective fields
- [ ] Form validation errors are announced to screen readers
- [ ] Submit button has descriptive text
- [ ] Success/error states are announced to screen readers

### Footer Component

- [ ] Uses `<footer>` element
- [ ] Links have descriptive text
- [ ] Icons have appropriate aria-hidden or alt text
- [ ] Contact information uses appropriate microformats
- [ ] Text has sufficient contrast against background

## Testing Checklist

- [ ] Tested with keyboard navigation
- [ ] Tested with at least one screen reader
- [ ] Tested with browser zoom at 200%
- [ ] Tested with automated tools (e.g., axe-core)
- [ ] Tested in high contrast mode

## Implementation Notes

- Use `tabindex="0"` for elements that should be in the natural tab order
- Use `tabindex="-1"` for elements that should be programmatically focusable but not in the tab order
- Never use `tabindex` values greater than 0
- Ensure all interactive elements have:
  - Visible focus states
  - Appropriate role
  - Accessible name
- Use ARIA attributes sparingly and only when necessary
- Test with actual assistive technologies whenever possible 