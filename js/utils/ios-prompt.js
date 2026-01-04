/**
 * iOS Add to Home Screen Prompt
 * Shows a subtle popup suggesting users add the app to their home screen on iOS Safari
 */

export function initIOSInstallPrompt() {
    // Robust detection for iOS (including iPads that request desktop site)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    const isStandalone = window.navigator.standalone === true;
    const hasSeenPrompt = localStorage.getItem('iosInstallPromptSeen');

    if (isIOS && !isStandalone && !hasSeenPrompt) {
        // Wait 15 seconds before showing prompt
        setTimeout(() => showIOSPrompt(), 15000);
    }
}

function showIOSPrompt() {
    const prompt = document.createElement('div');
    prompt.id = 'ios-install-prompt';
    prompt.innerHTML = `
        <div class="ios-prompt-content">
            <button class="ios-prompt-close" onclick="this.parentElement.parentElement.remove(); localStorage.setItem('iosInstallPromptSeen', 'true');">×</button>
            <div class="ios-prompt-icon">📲</div>
            <p>Install App: Tap <span class="ios-share-icon">share</span> then "Add to Home Screen"</p>
        </div>
    `;
    document.body.appendChild(prompt);

    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        #ios-install-prompt {
            position: fixed;
            bottom: 40px; /* Lower position */
            left: 50%;
            transform: translateX(-50%);
            z-index: 99999;
            width: 90%;
            max-width: 400px;
            animation: fadeInUp 0.5s ease-out;
        }
        .ios-prompt-content {
            background: rgba(30, 30, 30, 0.95);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            color: white;
            padding: 15px 20px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
            display: flex;
            align-items: center;
            gap: 15px;
            border: 1px solid rgba(255,255,255,0.1);
        }
        .ios-prompt-close {
            position: absolute;
            top: 5px;
            right: 5px;
            background: rgba(255,255,255,0.1);
            border: none;
            color: #aaa;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            font-size: 16px;
            line-height: 1;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .ios-prompt-icon {
            font-size: 30px;
        }
        .ios-prompt-content p {
            margin: 0;
            font-size: 14px;
            line-height: 1.4;
            font-weight: 500;
            color: #fff;
        }
        .ios-share-icon {
            display: inline-block;
            width: 20px;
            height: 20px;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23007AFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8'/%3E%3Cpolyline points='16 6 12 2 8 6'/%3E%3Cline x1='12' y1='2' x2='12' y2='15'/%3E%3C/svg%3E") no-repeat center;
            background-size: contain;
            vertical-align: middle;
            margin: 0 2px;
        }
        @keyframes fadeInUp {
            from { transform: translateX(-50%) translateY(50px); opacity: 0; }
            to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Auto-dismiss after 20 seconds
    setTimeout(() => {
        const el = document.getElementById('ios-install-prompt');
        if (el) {
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.5s';
            setTimeout(() => el.remove(), 500);
        }
    }, 20000);
}
