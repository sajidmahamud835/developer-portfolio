/**
 * iOS Add to Home Screen Prompt
 * Shows a popup suggesting users add the app to their home screen on iOS Safari
 */

export function initIOSInstallPrompt() {
    // Only show on iOS Safari (not in standalone mode)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isStandalone = window.navigator.standalone === true;
    const hasSeenPrompt = localStorage.getItem('iosInstallPromptSeen');

    if (isIOS && !isStandalone && !hasSeenPrompt) {
        // Wait for page to load, then show prompt
        setTimeout(() => showIOSPrompt(), 3000);
    }
}

function showIOSPrompt() {
    const prompt = document.createElement('div');
    prompt.id = 'ios-install-prompt';
    prompt.innerHTML = `
        <div class="ios-prompt-content">
            <button class="ios-prompt-close" onclick="this.parentElement.parentElement.remove(); localStorage.setItem('iosInstallPromptSeen', 'true');">×</button>
            <div class="ios-prompt-icon">📲</div>
            <h3>Add to Home Screen</h3>
            <p>Install this app for a better experience!</p>
            <div class="ios-prompt-steps">
                <span>Tap</span>
                <span class="ios-share-icon">⬆️</span>
                <span>then "Add to Home Screen"</span>
            </div>
        </div>
    `;
    document.body.appendChild(prompt);

    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        #ios-install-prompt {
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10000;
            animation: slideUp 0.4s ease-out;
        }
        .ios-prompt-content {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px 30px;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            position: relative;
            max-width: 300px;
        }
        .ios-prompt-close {
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            opacity: 0.8;
        }
        .ios-prompt-icon {
            font-size: 40px;
            margin-bottom: 10px;
        }
        .ios-prompt-content h3 {
            margin: 0 0 8px;
            font-size: 18px;
        }
        .ios-prompt-content p {
            margin: 0 0 15px;
            font-size: 14px;
            opacity: 0.9;
        }
        .ios-prompt-steps {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 14px;
            background: rgba(255,255,255,0.2);
            padding: 10px 15px;
            border-radius: 10px;
        }
        .ios-share-icon {
            font-size: 20px;
        }
        @keyframes slideUp {
            from { transform: translateX(-50%) translateY(100px); opacity: 0; }
            to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}
