
import React, { useState, useRef } from 'react';
import { useTranslation } from '../hooks/useTranslation.js';

const ImageIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { fillRule: "evenodd", d: "M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z", clipRule: "evenodd" })
);

const XCircleIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" })
);

const PromptInput = ({ onGenerate, isLoading, canGenerate }) => {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState('');
  const [imageFile, setImageFile] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [gameSystem, setGameSystem] = useState('Fabula Ultima');
  const [campaignTone, setCampaignTone] = useState('High Fantasy');
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(undefined);
    setImagePreview(undefined);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim() && canGenerate) {
      onGenerate(prompt, imageFile, gameSystem, campaignTone);
    }
  };
  
  const isSubmitDisabled = isLoading || !prompt.trim() || !canGenerate;

  return React.createElement('div', { className: "w-full max-w-4xl mx-auto p-6 bg-[var(--bg-secondary)]/50 rounded-xl shadow-2xl border border-[var(--border-accent)]/50 mt-8" },
    React.createElement('h2', { className: "text-2xl font-bold text-[var(--highlight-secondary)] mb-4 text-center", style: { fontFamily: 'serif' } }, t('startYourSaga')),
    React.createElement('form', { onSubmit: handleSubmit, className: "flex flex-col gap-4" },
      React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
        React.createElement('div', null,
          React.createElement('label', { htmlFor: "game-system", className: "block text-sm font-medium text-[var(--accent-primary)] mb-1" }, t('gameSystem')),
          React.createElement('select', {
            id: "game-system",
            value: gameSystem,
            onChange: (e) => setGameSystem(e.target.value),
            disabled: isLoading,
            className: "w-full p-2 bg-[var(--bg-primary)] rounded-lg border-2 border-[var(--border-secondary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)]"
          },
            React.createElement('option', { value: "Fabula Ultima" }, t('fabulaUltima')),
            React.createElement('option', { value: "D&D" }, t('dungeonsAndDragons'))
          )
        ),
        React.createElement('div', null,
          React.createElement('label', { htmlFor: "campaign-tone", className: "block text-sm font-medium text-[var(--accent-primary)] mb-1" }, t('campaignTone')),
          React.createElement('select', {
            id: "campaign-tone",
            value: campaignTone,
            onChange: (e) => setCampaignTone(e.target.value),
            disabled: isLoading,
            className: "w-full p-2 bg-[var(--bg-primary)] rounded-lg border-2 border-[var(--border-secondary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)]"
          },
            React.createElement('option', { value: "High Fantasy" }, t('highFantasy')),
            React.createElement('option', { value: "Dark Fantasy" }, t('darkFantasy')),
            React.createElement('option', { value: "Gritty Realism" }, t('grittyRealism')),
            React.createElement('option', { value: "Political Intrigue" }, t('politicalIntrigue')),
            React.createElement('option', { value: "Whimsical Adventure" }, t('whimsicalAdventure'))
          )
        )
      ),
      React.createElement('textarea', {
        value: prompt,
        onChange: (e) => setPrompt(e.target.value),
        placeholder: t('promptPlaceholder'),
        className: "w-full p-4 bg-[var(--bg-primary)] rounded-lg border-2 border-[var(--border-secondary)] focus:border-[var(--border-accent-light)] focus:ring-[var(--border-accent-light)] focus:ring-opacity-50 transition-colors duration-300 resize-none h-28",
        disabled: isLoading
      }),
      React.createElement('div', { className: "flex flex-col sm:flex-row items-center justify-between gap-4" },
        React.createElement('div', { className: "flex-grow flex items-center gap-4" },
          React.createElement('input', {
            type: "file",
            accept: "image/*",
            onChange: handleFileChange,
            ref: fileInputRef,
            className: "hidden",
            id: "image-upload",
            disabled: isLoading
          }),
          React.createElement('label', { htmlFor: "image-upload", className: `flex items-center justify-center px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 ${isLoading ? 'bg-gray-600 text-gray-400' : 'bg-[var(--accent-tertiary)] hover:bg-[var(--accent-secondary)] text-white'}` },
            React.createElement(ImageIcon, null),
            imageFile ? t('changeImage') : t('addImage')
          ),
          imagePreview && React.createElement('div', { className: "relative" },
            React.createElement('img', { src: imagePreview, alt: "Preview", className: "h-16 w-16 object-cover rounded-lg border-2 border-[var(--border-accent-light)]" }),
            React.createElement('button', { type: "button", onClick: handleRemoveImage, className: "absolute -top-2 -right-2 bg-[var(--bg-secondary)] rounded-full text-[var(--danger)] hover:text-[var(--danger)]/80 hover:scale-110 transition-transform" },
              React.createElement(XCircleIcon, null)
            )
          )
        ),
        React.createElement('button', {
          type: "submit",
          disabled: isSubmitDisabled,
          title: !canGenerate ? t('limitDailyPrompts') : '',
          className: "w-full sm:w-auto px-8 py-3 font-bold text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-[var(--highlight-primary-from)] to-[var(--highlight-primary-to)] hover:from-[var(--highlight-primary-to)] hover:to-[var(--highlight-primary-from)] disabled:from-gray-500 disabled:to-gray-600"
        }, isLoading ? t('generating') : t('weaveStory'))
      )
    )
  );
};

export default PromptInput;
