import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../hooks/useTranslation.js';

const CampaignNameEditor = ({ campaign, onUpdate, field = 'name' }) => {
    const { t } = useTranslation();
    const [name, setName] = useState(campaign[field]);
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        setName(campaign[field]);
    }, [campaign[field], field]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);
    
    const handleSave = () => {
        if (name.trim() && campaign[field] !== name.trim()) {
            onUpdate({ ...campaign, [field]: name.trim() });
        } else {
            setName(campaign[field]);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            setName(campaign[field]);
            setIsEditing(false);
        }
    };

    if (isEditing) {
        return React.createElement('input', {
            ref: inputRef,
            type: 'text',
            value: name,
            onChange: e => setName(e.target.value),
            onBlur: handleSave,
            onKeyDown: handleKeyDown,
            className: "text-4xl md:text-5xl font-bold text-center text-[var(--highlight-secondary)] bg-transparent border-b-2 border-[var(--border-accent)] focus:outline-none w-full",
            style: { fontFamily: 'serif' },
            'aria-label': "Campaign Name"
        });
    }

    return React.createElement('h1', {
        className: "text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-b from-[var(--highlight-tertiary)] to-[var(--highlight-primary-from)] cursor-pointer hover:opacity-80 transition-opacity",
        style: { fontFamily: 'serif' },
        onClick: () => setIsEditing(true),
        title: t('editCampaignName')
    }, campaign[field]);
};

export default CampaignNameEditor;
