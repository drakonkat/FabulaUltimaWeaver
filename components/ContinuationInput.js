
import React, { useState, useRef } from 'react';
import { useTranslation } from '../hooks/useTranslation.js';

const MicrophoneIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { fillRule: "evenodd", d: "M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93V14a1 1 0 10-2 0v.93a7 7 0 00-5.467 4.97A1 1 0 003.46 20h13.08a1 1 0 00.928-1.1A7 7 0 0011 14.93z", clipRule: "evenodd" })
);

const StopIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", viewBox: "0 0 20 20", fill: "currentColor" },
   React.createElement('path', { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8 8a2 2 0 012-2h0a2 2 0 012 2v4a2 2 0 01-2 2h0a2 2 0 01-2-2V8z", clipRule: "evenodd" })
);

const TrashIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", viewBox: "0 0 20 20", fill: "currentColor" },
    React.createElement('path', { fillRule: "evenodd", d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z", clipRule: "evenodd" })
);

const ContinuationInput = ({ story, onContinue, isLoading, canGenerate }) => {
  const { t } = useTranslation();
  const [nextPrompt, setNextPrompt] = useState('');
  const [combatOutcome, setCombatOutcome] = useState();
  const [heroActions, setHeroActions] = useState('');

  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState();
  const [audioFile, setAudioFile] = useState();
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleStartRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setHeroActions(''); // Clear text input
            setAudioFile(undefined);
            setAudioURL(undefined);
            setIsRecording(true);
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };
            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm;codecs=opus' });
                const url = URL.createObjectURL(audioBlob);
                const file = new File([audioBlob], "hero-actions.webm", { type: audioBlob.type });
                setAudioFile(file);
                setAudioURL(url);
                audioChunksRef.current = [];
                stream.getTracks().forEach(track => track.stop());
            };
            audioChunksRef.current = [];
            mediaRecorderRef.current.start();
        } catch (err) {
            console.error('Error accessing microphone:', err);
            alert("Could not access microphone. Please check permissions.");
        }
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
    }
  };

  const handleRemoveAudio = () => {
    setAudioFile(undefined);
    setAudioURL(undefined);
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nextPrompt.trim() && (heroActions.trim() || audioFile) && canGenerate) {
      onContinue({
          nextPrompt,
          combatOutcome,
          heroActions,
          audioFile,
      });
      setNextPrompt('');
      setHeroActions('');
      handleRemoveAudio();
    }
  };
  
  const isSubmitDisabled = isLoading || !nextPrompt.trim() || (!heroActions.trim() && !audioFile) || !canGenerate;

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
          onChange: (e) => {
            setHeroActions(e.target.value);
            if (audioFile) handleRemoveAudio();
          },
          placeholder: t('heroActionsPlaceholder'),
          className: "w-full p-3 bg-[var(--bg-primary)] rounded-lg border-2 border-[var(--border-secondary)] focus:border-[var(--highlight-tertiary)] focus:ring-[var(--highlight-tertiary)] transition-colors duration-300 resize-none h-24",
          disabled: isLoading || isRecording,
          required: !audioFile
        })
      ),
      React.createElement('div', { className: "flex items-center" },
        React.createElement('div', { className: "flex-grow border-t border-[var(--border-primary)]" }),
        React.createElement('span', { className: "flex-shrink mx-4 text-[var(--text-muted)] font-semibold" }, "OR"),
        React.createElement('div', { className: "flex-grow border-t border-[var(--border-primary)]" })
      ),
      React.createElement('div', null,
        React.createElement('label', { className: "block text-lg font-semibold text-[var(--accent-primary)] mb-2" }, t('recordHeroActions')),
        !audioFile && React.createElement('div', { className: "flex items-center gap-4" },
            React.createElement('button', { type: "button", onClick: isRecording ? handleStopRecording : handleStartRecording, disabled: isLoading, className: `px-4 py-2 rounded-lg text-white font-semibold flex items-center gap-2 transition-colors ${isRecording ? 'bg-red-600 hover:bg-red-700 animate-pulse' : 'bg-green-600 hover:bg-green-700'}` },
                isRecording ? React.createElement(StopIcon, null) : React.createElement(MicrophoneIcon, null),
                isRecording ? t('stop') : t('record')
            ),
            isRecording && React.createElement('span', { className: "text-[var(--accent-primary)]" }, t('recording'))
        ),
        audioURL && React.createElement('div', { className: "mt-2 p-3 bg-[var(--bg-primary)]/70 rounded-lg border border-[var(--border-primary)] flex items-center gap-4 animate-fade-in" },
            React.createElement('audio', { src: audioURL, controls: true, className: "w-full h-10" }),
            React.createElement('button', { type: "button", onClick: handleRemoveAudio, disabled: isLoading, className: "p-2 text-[var(--danger)] hover:text-[var(--danger)]/80 hover:bg-[var(--danger)]/10 rounded-full transition-colors", 'aria-label': t('remove') },
                React.createElement(TrashIcon, null)
            )
        )
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
