import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation.js';

// START: ICONS
const MapIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-12 w-12 text-[var(--accent-primary)]", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z", clipRule: "evenodd" }));
const ToolboxIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-12 w-12 text-[var(--accent-primary)]", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm1 3a1 1 0 011-1h1a1 1 0 110 2H6a1 1 0 01-1-1zm3 0a1 1 0 011-1h5a1 1 0 110 2H9a1 1 0 01-1-1z", clipRule: "evenodd" }));
const TokensIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-12 w-12 text-[var(--accent-primary)]", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { d: "M9 6a3 3 0 11-6 0 3 3 0 016 0zm-1.559 4.385a.75.75 0 00-1.06 1.06 5.5 5.5 0 008.238 0 .75.75 0 10-1.06-1.06 4 4 0 01-6.118 0zM17.25 10.5a.75.75 0 000-1.5h-2.5a.75.75 0 000 1.5h2.5z" }));
const ManageIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-12 w-12 text-[var(--accent-primary)]", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { d: "M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" }), React.createElement('path', { fillRule: "evenodd", d: "M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z", clipRule: "evenodd" }));
const FinishIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-12 w-12 text-[var(--highlight-secondary)]", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }));
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

const MapTutorial = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(0);
    const [dontShowAgain, setDontShowAgain] = useState(true);

    const steps = [
        { icon: React.createElement(MapIcon), title: t('mapTutorialWelcomeTitle'), text: t('mapTutorialWelcomeText') },
        { icon: React.createElement(ToolboxIcon), title: t('mapTutorialToolbarTitle'), text: t('mapTutorialToolbarText') },
        { icon: React.createElement(TokensIcon), title: t('mapTutorialTokensTitle'), text: t('mapTutorialTokensText') },
        { icon: React.createElement(ManageIcon), title: t('mapTutorialManagementTitle'), text: t('mapTutorialManagementText') },
        { icon: React.createElement(FinishIcon), title: t('mapTutorialFinishTitle'), text: t('mapTutorialFinishText') }
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleFinish();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleFinish = () => {
        onClose(dontShowAgain);
    };

    if (!isOpen) return null;

    const current = steps[currentStep];

    return React.createElement('div', {
        className: "fixed inset-0 bg-black/80 z-[101] flex items-center justify-center animate-fade-in",
        'aria-modal': true,
        role: "dialog",
        onClick: handleFinish
    },
        React.createElement('div', {
            className: "bg-[var(--bg-secondary)] rounded-lg shadow-xl p-8 w-full max-w-md m-4 border-2 border-[var(--border-accent)] flex flex-col items-center text-center",
            onClick: e => e.stopPropagation()
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
            currentStep === steps.length - 1 && React.createElement('div', { className: 'mb-6 flex items-center' },
                React.createElement('input', {
                    type: 'checkbox',
                    id: 'dont-show-again',
                    checked: dontShowAgain,
                    onChange: e => setDontShowAgain(e.target.checked),
                    className: 'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                }),
                React.createElement('label', { htmlFor: 'dont-show-again', className: 'ml-2 block text-sm text-[var(--text-muted)]' }, t('dontShowAgain'))
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

export default MapTutorial;