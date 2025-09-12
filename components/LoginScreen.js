

import React, { useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation.js';

const SwordIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-10 w-10 text-[var(--highlight-secondary)]", viewBox: "0 0 24 24", fill: "currentColor" },
    React.createElement('path', { d: "M14.83,4.17l-2.83,2.83L14.83,9.83,16.24,8.41,18.41,6.24,19.83,4.83,18.41,3.41,14.83,4.17M13.41,5.59,4.41,14.59,2,17v5h5l2.41-2.41,9-9L13.41,5.59z" })
);

const LoginScreen = () => {
    const { t } = useTranslation();

    useEffect(() => {
        if (typeof window.google !== 'undefined' && window.google.accounts) {
            window.google.accounts.id.renderButton(
                document.getElementById("signInDiv"),
                { theme: "outline", size: "large", type: "standard", text: "signin_with" }
            );
            window.google.accounts.id.prompt();
        }
    }, []);

    return React.createElement('div', { 
            className: "min-h-screen flex items-center justify-center bg-[var(--bg-primary)] text-[var(--text-primary)]", 
            style: {
                backgroundImage: 'radial-gradient(circle at top right, rgba(128, 0, 128, 0.2), transparent 40%), radial-gradient(circle at bottom left, rgba(106, 90, 205, 0.2), transparent 50%)'
            } 
        },
        React.createElement('div', { className: "text-center p-10 bg-[var(--bg-secondary)]/60 rounded-xl shadow-2xl border border-[var(--border-accent)]/50 animate-fade-in" },
            React.createElement('div', { className: "flex items-center justify-center gap-4 mb-6" },
                React.createElement(SwordIcon, null),
                React.createElement('h1', { 
                        className: "text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--highlight-primary-from)] to-[var(--highlight-primary-to)] tracking-wider", 
                        style: { fontFamily: 'serif' } 
                    }, 
                    t('appName')
                ),
                React.createElement(SwordIcon, null)
            ),
            React.createElement('p', { className: "text-[var(--accent-primary)] text-lg mb-8" }, t('welcomeMessage')),
            React.createElement('div', { id: "signInDiv", className: "flex justify-center" })
        )
    );
};

export default LoginScreen;