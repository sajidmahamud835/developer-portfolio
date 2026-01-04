/**
 * Contact Popup Utility
 * Handles opening/closing the contact modal
 */

export function openContactPopup() {
    const popup = document.getElementById('contact-popup');
    if (popup) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Close on backdrop click
        popup.onclick = (e) => {
            if (e.target === popup) closeContactPopup();
        };

        // Close on Escape key
        document.addEventListener('keydown', handleEscape);
    }
}

export function closeContactPopup() {
    const popup = document.getElementById('contact-popup');
    if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = '';
    }
    document.removeEventListener('keydown', handleEscape);
}

function handleEscape(e) {
    if (e.key === 'Escape') closeContactPopup();
}

// Expose to window for inline onclick handlers
window.openContactPopup = openContactPopup;
window.closeContactPopup = closeContactPopup;
