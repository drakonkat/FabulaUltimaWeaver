// components/PdfPreviewModal.js
import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation.js';
import { generateFabulaUltimaSheet } from '../services/geminiService.js';
import LoadingSpinner from './LoadingSpinner.js';

const DownloadIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { fillRule: "evenodd", d: "M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 9.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z", clipRule: "evenodd" })
);

const PdfPreviewModal = ({ isOpen, onClose, hero }) => {
    const { t, language } = useTranslation();
    const [pdfUrl, setPdfUrl] = useState(null);
    const [pdfBytes, setPdfBytes] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let objectUrl;
        if (isOpen) {
            const generate = async () => {
                setIsGenerating(true);
                setError(null);
                try {
                    const bytes = await generateFabulaUltimaSheet(hero, language);
                    setPdfBytes(bytes);
                    const blob = new Blob([bytes], { type: 'application/pdf' });
                    objectUrl = URL.createObjectURL(blob);
                    setPdfUrl(objectUrl);
                } catch (err) {
                    console.error("PDF generation failed:", err);
                    setError("Failed to generate PDF. Please try again.");
                } finally {
                    setIsGenerating(false);
                }
            };
            generate();
        }

        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [isOpen, hero, language]);

    const handleDownload = () => {
        if (!pdfBytes) return;
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${hero.name.replace(/ /g, '_')}_fabula_ultima.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!isOpen) return null;

    return React.createElement('div', {
        className: "fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4 animate-fade-in",
        'aria-modal': true, role: "dialog", onClick: onClose
    },
        React.createElement('div', {
            className: "bg-[var(--bg-secondary)] rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col border-2 border-[var(--border-accent)]",
            onClick: e => e.stopPropagation()
        },
            React.createElement('div', { className: 'p-4 border-b border-[var(--border-primary)] flex justify-between items-center flex-shrink-0' },
                React.createElement('h2', { className: 'text-xl font-bold text-[var(--highlight-secondary)]' }, `${t('previewPdf')}: ${hero.name}`),
                React.createElement('button', { onClick: onClose, className: 'p-2 rounded-full hover:bg-[var(--bg-tertiary)]' },
                    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" })
                    )
                )
            ),
            React.createElement('div', { className: 'flex-grow p-4 bg-gray-900/50' },
                isGenerating ? React.createElement(LoadingSpinner, null) :
                error ? React.createElement('div', { className: 'text-center text-red-400' }, error) :
                pdfUrl && React.createElement('iframe', {
                    src: pdfUrl,
                    title: `${t('previewPdf')} for ${hero.name}`,
                    className: 'w-full h-full border-0'
                })
            ),
            React.createElement('div', { className: 'p-4 border-t border-[var(--border-primary)] flex justify-end items-center gap-4 flex-shrink-0' },
                 React.createElement('button', {
                    onClick: onClose,
                    className: "px-6 py-2 font-bold text-[var(--text-secondary)] rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] transition-colors"
                }, t('cancel')),
                React.createElement('button', {
                    onClick: handleDownload,
                    disabled: isGenerating || !pdfBytes,
                    className: "flex items-center justify-center px-6 py-2 font-bold text-white rounded-lg bg-gradient-to-r from-[var(--highlight-primary-from)] to-[var(--highlight-primary-to)] disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed"
                },
                    React.createElement(DownloadIcon, null),
                    t('downloadPdf')
                )
            )
        )
    );
};

export default PdfPreviewModal;
