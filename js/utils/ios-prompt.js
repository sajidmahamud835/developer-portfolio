/**
 * iOS Add to Home Screen Prompt
 * Shows a subtle popup suggesting users add the app to their home screen on iOS Safari
 */

export function initIOSInstallPrompt() {
    // Only show on iOS Safari (not in standalone mode)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isStandalone = window.navigator.standalone === true;
    const hasSeenPrompt = localStorage.getItem('iosInstallPromptSeen');

    if (isIOS && !isStandalone && !hasSeenPrompt) {
        // Wait 20 seconds before showing prompt (user has stayed on site)
        setTimeout(() => showIOSPrompt(), 20000);
    }
}

function showIOSPrompt() {
    const prompt = document.createElement('div');
    prompt.id = 'ios-install-prompt';
    prompt.innerHTML = `
        <div class="ios-prompt-content">
            <button class="ios-prompt-close" onclick="this.parentElement.parentElement.remove(); localStorage.setItem('iosInstallPromptSeen', 'true');">×</button>
            <div class="ios-prompt-icon">📲</div>
            <p>Tap <span class="ios-share-icon">⬆️</span> then "Add to Home Screen"</p>
        </div>
    `;
    document.body.appendChild(prompt);

    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        #ios-install-prompt {
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10000;
            animation: fadeInUp 0.5s ease-out;
            opacity: 0.6;
            transition: opacity 0.3s;
        }
        #ios-install-prompt:hover {
            opacity: 1;
        }
        .ios-prompt-content {
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            color: white;
            padding: 12px 20px;
            border-radius: 12px;
            text-align: center;
            position: relative;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .ios-prompt-close {
            position: absolute;
            top: -8px;
            right: -8px;
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            font-size: 14px;
            cursor: pointer;
        }
        .ios-prompt-icon {
            font-size: 24px;
        }
        .ios-prompt-content p {
            margin: 0;
            font-size: 13px;
        }
        .ios-share-icon {
            font-size: 16px;
        }
        @keyframes fadeInUp {
            from { transform: translateX(-50%) translateY(20px); opacity: 0; }
            to { transform: translateX(-50%) translateY(0); opacity: 0.6; }
        }
    `;
    document.head.appendChild(style);

    // Auto-dismiss after 10 seconds
    setTimeout(() => {
        const el = document.getElementById('ios-install-prompt');
        if (el) {
            el.style.opacity = '0';
            setTimeout(() => el.remove(), 500);
        }
    }, 10000);
}
