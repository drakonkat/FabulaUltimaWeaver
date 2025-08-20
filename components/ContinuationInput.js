

import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation.js';

const ContinuationInput = ({ story, onContinue, isLoading, canGenerate }) => {
  const { t } = useTranslation();
  const [nextPrompt, setNextPrompt] = useState('');
  const [combatOutcome, setCombatOutcome] = useState();
  const [heroActions, setHeroActions] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nextPrompt.trim() && heroActions.trim() && canGenerate) {
      onContinue({
          nextPrompt,
          combatOutcome,
          heroActions,
      });
      setNextPrompt('');
      setHeroActions('');
    }
  };
  
  const isSubmitDisabled = isLoading || !nextPrompt.trim() || !heroActions.trim() || !canGenerate;

  return React.createElement('div', { className: "w-full max-w-4xl mx-auto p-6 bg-[var(--bg-secondary)]/50 rounded-xl shadow-2xl border border-[var(--highlight-tertiary)]/50 mt-8" },
    React.createElement('h2', { className: "text-2xl font-bold text-[var(--highlight-tertiary)] mb-4 text-center", style: { fontFamily: 'serif' } }, t('continueSaga')),
    React.createElement('form', { onSubmit: handleSubmit, className: "flex flex-col gap-6" },
      React.createElement('div', null,
        React.createElement('label', { htmlFor: "next-prompt", className: "block text-lg font-semibold text-[var(--accent-primary)] mb-2" }, t('whatHappensNext')),
        React.createElement('textarea', {
          id: "next-prompt",
          value: nextPrompt,
          onChange: (e) => setNextPrompt(e.target.value),
          placeholder: t('whatHappensNextPlaceholder'),
          className: "w-full p-3 bg-[var(--bg-primary)] rounded-lg border-2 border-[var(--border-secondary)] focus:border-[var(--highlight-tertiary)] focus:ring-[var(--highlight-tertiary)] transition-colors duration-300 resize-none h-24",
          disabled: isLoading,
          required: true
        })
      ),
      story.mustCombat && React.createElement('div', null,
        React.createElement('label', { htmlFor: "combat-outcome", className: "block text-lg font-semibold text-[var(--accent-primary)] mb-2" }, t('combatResolution')),
        React.createElement('select', {
            id: "combat-outcome",
            value: combatOutcome || '',
            onChange: e => setCombatOutcome(e.target.value || undefined),
            className: "w-full p-3 bg-[var(--bg-primary)] rounded-lg border-2 border-[var(--border-secondary)] focus:border-[var(--highlight-tertiary)] focus:ring-[var(--highlight-tertiary)]",
            disabled: isLoading
        },
          React.createElement('option', { value: "" }, `-- ${t('noCombat')} --`),
          React.createElement('option', { value: "Heroes Won" }, t('heroesWon')),
          React.createElement('option', { value: "Enemies Won" }, t('enemiesWon')),
          React.createElement('option', { value: "Stalemate/Fled" }, t('stalemateFled'))
        )
      ),
      React.createElement('div', null,
        React.createElement('label', { htmlFor: "hero-actions", className: "block text-lg font-semibold text-[var(--accent-primary)] mb-2" }, t('heroActions')),
        React.createElement('textarea', {
          id: "hero-actions",
          value: heroActions,
          onChange: (e) => setHeroActions(e.target.value),
          placeholder: t('heroActionsPlaceholder'),
          className: "w-full p-3 bg-[var(--bg-primary)] rounded-lg border-2 border-[var(--border-secondary)] focus:border-[var(--highlight-tertiary)] focus:ring-[var(--highlight-tertiary)] transition-colors duration-300 resize-none h-24",
          disabled: isLoading,
          required: true
        })
      ),
      React.createElement('div', { className: "flex justify-end" },
        React.createElement('button', {
          type: "submit",
          disabled: isSubmitDisabled,
          title: !canGenerate ? t('limitDailyPrompts') : '',
          className: "w-full sm:w-auto px-8 py-3 font-bold text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-[var(--accent-tertiary)] to-indigo-600 hover:from-[var(--accent-secondary)] hover:to-indigo-700 disabled:from-gray-500 disabled:to-gray-600"
        }, isLoading ? t('generating') : t('continueStory'))
      )
    )
  );
};

export default ContinuationInput;