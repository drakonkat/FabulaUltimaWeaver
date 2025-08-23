
import React, { useState, useRef } from 'react';
import { useTranslation } from '../hooks/useTranslation.js';

const ClipboardIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { d: "M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" }),
    React.createElement('path', { d: "M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" })
);
const DownloadIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { fillRule: "evenodd", d: "M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 9.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z", clipRule: "evenodd" })
);
const CheckIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" })
);
const UploadIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { fillRule: "evenodd", d: "M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 9.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z", clipRule: "evenodd" })
);

const BackupManager = ({ appState, onLoad }) => {
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);
    const [pastedText, setPastedText] = useState('');
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleCopyToClipboard = () => {
        const jsonString = JSON.stringify(appState);
        navigator.clipboard.writeText(jsonString).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleDownload = () => {
        const jsonString = JSON.stringify(appState, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.download = `adventure_weaver_backup.json`;
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const parseAndLoad = (text) => {
        setError('');
        if (!text.trim()) {
            setError(t('errorPaste'));
            return;
        }
        try {
            const data = JSON.parse(text);
            if (data.version >= 3 && Array.isArray(data.campaigns) && data.usage) {
                onLoad(data);
                setPastedText('');
            } else {
                throw new Error(t('errorInvalidData'));
            }
        } catch (e) {
            console.error("Failed to load backup data:", e);
            setError(e.message || t('errorInvalidData'));
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result;
                if (typeof text === 'string') {
                    parseAndLoad(text);
                }
            };
            reader.onerror = () => setError(t('errorReadFile'));
            reader.readAsText(file);
        }
    };

    const handleTextLoad = () => parseAndLoad(pastedText);
    const triggerFileSelect = () => {
        if(fileInputRef.current) {
            fileInputRef.current.click()
        }
    };

    return React.createElement('div', { className: "p-6" },
        React.createElement('h3', { className: "text-xl font-bold text-[var(--accent-primary)] mb-4 text-center" }, t('backupAndRestore')),
        React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
            React.createElement('div', { className: "flex flex-col gap-3" },
                React.createElement('button', {
                    onClick: handleCopyToClipboard,
                    className: "flex items-center justify-center px-4 py-2 w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-300 disabled:bg-indigo-400",
                    disabled: copied
                },
                    copied ? React.createElement(CheckIcon, null) : React.createElement(ClipboardIcon, null),
                    copied ? t('copied') : t('copyToClipboard')
                ),
                React.createElement('button', {
                    onClick: handleDownload,
                    className: "flex items-center justify-center px-4 py-2 w-full rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors duration-300"
                },
                    React.createElement(DownloadIcon, null),
                    t('downloadFile')
                )
            ),
            React.createElement('div', { className: "flex flex-col gap-3" },
                React.createElement('input', {
                    type: "file",
                    accept: ".json,application/json",
                    ref: fileInputRef,
                    onChange: handleFileChange,
                    className: "hidden"
                }),
                React.createElement('button', {
                    type: "button",
                    onClick: triggerFileSelect,
                    className: "flex items-center justify-center px-4 py-2 w-full rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors"
                },
                    React.createElement(UploadIcon, null),
                    t('loadFromFile')
                ),
                React.createElement('textarea', {
                    value: pastedText,
                    onChange: (e) => setPastedText(e.target.value),
                    placeholder: t('pasteCampaignData'),
                    className: "w-full p-2 bg-[var(--bg-secondary)] rounded-lg border-2 border-[var(--border-primary)] focus:border-[var(--border-accent)] focus:ring-[var(--border-accent)] h-24 resize-none"
                }),
                React.createElement('button', {
                    type: "button",
                    onClick: handleTextLoad,
                    disabled: !pastedText.trim(),
                    className: "px-4 py-2 font-bold text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-[var(--accent-tertiary)] hover:bg-[var(--accent-secondary)]"
                },
                    t('loadData')
                )
            )
        ),
        error && React.createElement('p', { className: "text-[var(--danger)] mt-3 text-center font-semibold" }, error)
    );
};

export default BackupManager;
