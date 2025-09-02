import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation.js';

// START: ICONS
const GmIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-12 w-12 text-[var(--accent-primary)]", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { d: "M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h1a1 1 0 011 1v3.5a1.5 1.5 0 01-3 0V9a1 1 0 00-1-1h-1a1 1 0 01-1-1v-2zM3 4.5a1.5 1.5 0 013 0V5a1 1 0 001 1h1a1 1 0 011 1v2a1.5 1.5 0 01-3 0V8a1 1 0 00-1-1H4a1 1 0 01-1-1V4.5z" }), React.createElement('path', { d: "M10 9.5a1.5 1.5 0 013 0v1a1 1 0 001 1h.5a1.5 1.5 0 010 3h-.5a1 1 0 00-1 1v1a1.5 1.5 0 01-3 0v-1a1 1 0 00-1-1h-1a1 1 0 01-1-1v-2a1.5 1.5 0 013 0v1a1 1 0 001 1h1a1 1 0 011-1v-1a1.5 1.5 0 01-3 0V9.5z" }));
const PlayerIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-12 w-12 text-[var(--accent-primary)]", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z", clipRule: "evenodd" }));
const BookIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-12 w-12 text-[var(--accent-primary)]", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }));
const ToolsIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-12 w-12 text-[var(--accent-primary)]", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }), React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }));
const SparklesIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-12 w-12 text-[var(--highlight-secondary)]", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { d: "M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm10 2H5v10h10V5z" }), React.createElement('path', { d: "M10 9a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1H8a1 1 0 110-2h1v-1a1 1 0 011-1z" }));
// END: ICONS

const ProgressBar = ({ current, total }) => {
    return React.createElement('div', { className: 'flex justify-center gap-2' },
        Array.from({ length: total }).map((_, index) =>
            React.createElement('div', {
                key: index,
                className: `h-2 w-8 rounded-full transition-colors ${index === current ? 'bg-[var(--accent-primary)]' : 'bg-[var(--bg-tertiary)]'}`
            })
        )
    );
};

const Onboarding = ({ isOpen, onFinish }) => {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            icon: React.createElement(SparklesIcon),
            title: t('onboardingWelcomeTitle'),
            text: t('onboardingWelcomeText')
        },
        {
            icon: React.createElement('div', { className: 'flex gap-8' }, React.createElement(GmIcon), React.createElement(PlayerIcon)),
            title: t('onboardingModesTitle'),
            text: t('onboardingModesText')
        },
        {
            icon: React.createElement(BookIcon),
            title: t('onboardingGMTtle'),
            text: t('onboardingGMText')
        },
        {
            icon: React.createElement(PlayerIcon),
            title: t('onboardingPlayerTitle'),
            text: t('onboardingPlayerText')
        },
        {
            icon: React.createElement(ToolsIcon),
            title: t('onboardingToolsTitle'),
            text: t('onboardingToolsText')
        },
        {
            icon: React.createElement(SparklesIcon),
            title: t('onboardingFinishTitle'),
            text: t('onboardingFinishText')
        }
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onFinish();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    if (!isOpen) return null;

    const current = steps[currentStep];

    return React.createElement('div', {
        className: "fixed inset-0 bg-black/80 z-[100] flex items-center justify-center animate-fade-in",
        'aria-modal': true,
        role: "dialog"
    },
        React.createElement('div', {
            className: "bg-[var(--bg-secondary)] rounded-lg shadow-xl p-8 w-full max-w-lg m-4 border-2 border-[var(--border-accent)] flex flex-col items-center text-center"
        },
            React.createElement('div', { className: 'mb-6 h-12 flex items-center' }, current.icon),
            React.createElement('h2', { className: "text-2xl font-bold text-[var(--highlight-secondary)] mb-4", style: { fontFamily: 'serif' } }, current.title),
            React.createElement('p', {
                className: "text-[var(--text-secondary)] mb-8 leading-relaxed",
                dangerouslySetInnerHTML: { __html: current.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--accent-primary)] font-semibold">$1</strong>') }
            }),
            React.createElement('div', { className: 'mb-8' },
                React.createElement(ProgressBar, { current: currentStep, total: steps.length })
            ),
            React.createElement('div', { className: "flex justify-between w-full" },
                currentStep > 0 ?
                    React.createElement('button', {
                        onClick: handlePrev,
                        className: "px-6 py-2 font-bold text-[var(--text-secondary)] rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] transition-colors"
                    }, t('previous')) : React.createElement('div'),
                React.createElement('button', {
                    onClick: handleNext,
                    className: "px-8 py-2 font-bold text-white rounded-lg bg-gradient-to-r from-[var(--highlight-primary-from)] to-[var(--highlight-primary-to)] hover:opacity-90 transition-opacity"
                }, currentStep === steps.length - 1 ? t('finish') : t('next'))
            )
        )
    );
};

export default Onboarding;
