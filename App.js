



import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { generateStory } from './services/geminiService.js';
import Header from './components/Header.js';
import PromptInput from './components/PromptInput.js';
import LoadingSpinner from './components/LoadingSpinner.js';
import StoryDisplay from './components/StoryDisplay.js';
import HeroManager from './components/HeroManager.js';
import MonsterManager from './components/MonsterManager.js';
import ContinuationInput from './components/ContinuationInput.js';
import CampaignList from './components/CampaignList.js';
import BackupManager from './components/BackupManager.js';
import LoginScreen from './components/LoginScreen.js';
import Footer from './components/Footer.js';
import { LanguageProvider, useTranslation } from './hooks/useTranslation.js';
import { ThemeContext } from './hooks/useTheme.js';
import { MAX_CAMPAIGNS, MAX_DAILY_PROMPTS, GOOGLE_CLIENT_ID } from './config.js';
import { exampleCampaignData } from './data/exampleCampaign.js';

const getToday = () => new Date().toISOString().split('T')[0];

const defaultState = {
    version: 4,
    campaigns: [],
    usage: {
        promptsToday: 0,
        lastPromptDate: getToday(),
    },
};

const CampaignNameEditor = ({ campaign, onUpdate }) => {
    const { t } = useTranslation();
    const [name, setName] = useState(campaign.name);
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        setName(campaign.name);
    }, [campaign.name]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);
    
    const handleSave = () => {
        if (name.trim() && campaign.name !== name.trim()) {
            onUpdate({ ...campaign, name: name.trim() });
        } else {
            setName(campaign.name);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            setName(campaign.name);
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
    }, campaign.name);
};

const AppContent = () => {
  const isAnonymousMode = useMemo(() => GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID_HERE', []);
  
  const [user, setUser] = useState(null);
  const [appState, setAppState] = useState(defaultState);
  const [activeCampaignId, setActiveCampaignId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { language, t } = useTranslation();
  
  const [theme, setThemeState] = useState(() => {
    try {
        return localStorage.getItem('adventureWeaverTheme') || 'dark';
    } catch (e) {
        return 'dark';
    }
  });

  const setTheme = (newTheme) => {
    try {
        localStorage.setItem('adventureWeaverTheme', newTheme);
    } catch (e) {
        console.error("Failed to save theme to localStorage", e);
    }
    setThemeState(newTheme);
  };

  useEffect(() => {
    document.documentElement.className = `theme-${theme}`;
  }, [theme]);


  const checkAndResetUsage = useCallback((currentUsage) => {
    const today = getToday();
    if (currentUsage.lastPromptDate !== today) {
        return { promptsToday: 0, lastPromptDate: today };
    }
    return currentUsage;
  }, []);

  const handleCredentialResponse = useCallback((response) => {
    try {
        const decoded = jwtDecode(response.credential);
        setUser(decoded);
    } catch (e) {
        console.error("Failed to decode credential", e);
        setError("Login failed. Please try again.");
    }
  }, []);
  
  useEffect(() => {
    if (isAnonymousMode || typeof window.google === 'undefined') {
        return;
    }
    window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
    });
  }, [isAnonymousMode, handleCredentialResponse]);

  const handleSignOut = () => {
    if (isAnonymousMode) return;
    setUser(null);
    setAppState(defaultState);
    setActiveCampaignId(null);
  };

  useEffect(() => {
    let storageKey = null;
    if (isAnonymousMode) {
        storageKey = 'storyWeaverState_anonymous';
    } else if (user) {
        storageKey = `storyWeaverState_${user.sub}`;
    }

    if (!storageKey) return;

    try {
        const savedStateJSON = localStorage.getItem(storageKey);
        if (savedStateJSON) {
            const parsedState = JSON.parse(savedStateJSON);
            const { theme: savedTheme, ...restOfState } = parsedState;

            if (savedTheme) {
                setTheme(savedTheme);
            }

            if (restOfState.version === 4) {
                const usage = isAnonymousMode ? restOfState.usage : checkAndResetUsage(restOfState.usage);
                setAppState({ ...restOfState, usage });
            } else {
                 const migratedState = {
                     ...defaultState,
                     campaigns: restOfState.campaigns || [],
                     usage: restOfState.usage || defaultState.usage,
                 };
                 setAppState(migratedState);
            }
        } else {
            setAppState(defaultState);
        }
    } catch (e) {
        console.error("Failed to load state from localStorage", e);
        setAppState(defaultState);
    }
  }, [user, isAnonymousMode, checkAndResetUsage]);

  useEffect(() => {
    let storageKey = null;
    if (isAnonymousMode) {
        storageKey = 'storyWeaverState_anonymous';
    } else if (user) {
        storageKey = `storyWeaverState_${user.sub}`;
    }
    
    if (storageKey) {
        try {
            // We save the theme along with the state for backup purposes,
            // even though it's managed separately for persistence.
            const stateToSave = { ...appState, theme };
            const appStateJSON = JSON.stringify(stateToSave);
            localStorage.setItem(storageKey, appStateJSON);
        } catch (e) {
            console.error("Failed to save state to localStorage", e);
        }
    }
  }, [appState, theme, user, isAnonymousMode]);

  const activeCampaign = useMemo(() => appState.campaigns.find(c => c.id === activeCampaignId), [appState.campaigns, activeCampaignId]);

  const handleUpdateCampaign = (updatedCampaign) => {
    setAppState(prev => ({
        ...prev,
        campaigns: prev.campaigns.map(c => c.id === updatedCampaign.id ? { ...updatedCampaign, lastModified: Date.now() } : c),
    }));
  };

  const handleAddHero = useCallback((heroData) => {
    if (!activeCampaign) return;
    const newHero = { ...heroData, id: crypto.randomUUID() };
    const updatedHeroes = [...activeCampaign.heroes, newHero];
    handleUpdateCampaign({ ...activeCampaign, heroes: updatedHeroes });
  }, [activeCampaign]);

  const handleUpdateHero = useCallback((updatedHero) => {
    if (!activeCampaign) return;
    const updatedHeroes = activeCampaign.heroes.map(h => h.id === updatedHero.id ? updatedHero : h);
    handleUpdateCampaign({ ...activeCampaign, heroes: updatedHeroes });
  }, [activeCampaign]);

  const handleRemoveHero = useCallback((id) => {
    if (!activeCampaign) return;
    const updatedHeroes = activeCampaign.heroes.filter(hero => hero.id !== id);
    handleUpdateCampaign({ ...activeCampaign, heroes: updatedHeroes });
  }, [activeCampaign]);
  
  const handleAddMonster = useCallback((monsterData) => {
    if (!activeCampaign) return;
    const newMonster = { ...monsterData, id: crypto.randomUUID() };
    const updatedMonsters = [...(activeCampaign.monsters || []), newMonster];
    handleUpdateCampaign({ ...activeCampaign, monsters: updatedMonsters });
  }, [activeCampaign, handleUpdateCampaign]);

  const handleUpdateMonster = useCallback((updatedMonster) => {
    if (!activeCampaign) return;
    const updatedMonsters = activeCampaign.monsters.map(m => m.id === updatedMonster.id ? updatedMonster : m);
    handleUpdateCampaign({ ...activeCampaign, monsters: updatedMonsters });
  }, [activeCampaign, handleUpdateCampaign]);

  const handleRemoveMonster = useCallback((id) => {
    if (!activeCampaign) return;
    const updatedMonsters = activeCampaign.monsters.filter(monster => monster.id !== id);
    handleUpdateCampaign({ ...activeCampaign, monsters: updatedMonsters });
  }, [activeCampaign, handleUpdateCampaign]);

  const canGenerate = useMemo(() => {
    if (isAnonymousMode) return true;
    const currentUsage = checkAndResetUsage(appState.usage);
    return currentUsage.promptsToday < MAX_DAILY_PROMPTS;
  }, [isAnonymousMode, appState.usage, checkAndResetUsage]);

  const incrementUsage = () => {
    if (isAnonymousMode) return;
    setAppState(prev => ({ ...prev, usage: { ...prev.usage, promptsToday: prev.usage.promptsToday + 1 } }));
  };

  const handleGenerate = useCallback(async (prompt, imageFile, gameSystem, campaignTone) => {
    if (!activeCampaign || !canGenerate) {
        if (!canGenerate) setError(t('limitDailyPrompts'));
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await generateStory(prompt, activeCampaign.heroes, activeCampaign.monsters, language, imageFile, gameSystem, campaignTone);
      const updatedCampaign = { 
          ...activeCampaign, 
          storyData: data, 
          name: data.storyName, 
          gameSettings: { system: gameSystem || 'Fabula Ultima', tone: campaignTone || 'High Fantasy' } 
      };
      handleUpdateCampaign(updatedCampaign);
      incrementUsage();
    } catch (err) {
      setError(err.message || 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [activeCampaign, language, canGenerate, t, isAnonymousMode]);

  const handleContinue = useCallback(async (details) => {
    if (!activeCampaign || !activeCampaign.storyData || !canGenerate) {
        if (!canGenerate) setError(t('limitDailyPrompts'));
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
        const continuationDetails = {
            previousStory: activeCampaign.storyData,
            details: details,
        };
        const data = await generateStory(details.nextPrompt, activeCampaign.heroes, activeCampaign.monsters, language, undefined, activeCampaign.gameSettings.system, activeCampaign.gameSettings.tone, continuationDetails);
        handleUpdateCampaign({ ...activeCampaign, storyData: data });
        incrementUsage();
    } catch (err) {
        setError(err.message || 'An unknown error occurred.');
        console.error(err);
    } finally {
        setIsLoading(false);
    }
  }, [activeCampaign, language, canGenerate, t, isAnonymousMode]);

  const handleLoadAppState = useCallback((loadedState) => {
    setError(null);
    const { theme: loadedTheme, ...restOfState } = loadedState;

    if (restOfState.version >= 3 && restOfState.campaigns && restOfState.usage) {
        if (loadedTheme) {
            setTheme(loadedTheme);
        }
        setAppState(restOfState);
        setActiveCampaignId(null);
    } else {
        setError(t('errorInvalidData'));
    }
  }, [t, setTheme]);
  
  const canCreateCampaign = useMemo(() => {
    if (isAnonymousMode) return true;
    return appState.campaigns.length < MAX_CAMPAIGNS;
  }, [isAnonymousMode, appState.campaigns]);

  const handleNewCampaign = () => {
    if (!canCreateCampaign) {
        setError(t('limitCampaigns'));
        return;
    }
    const newCampaignId = crypto.randomUUID();
    const newCampaign = {
        id: newCampaignId,
        name: t('newCampaign'),
        storyData: null,
        heroes: [],
        monsters: [],
        gameSettings: { system: 'Fabula Ultima', tone: 'High Fantasy' },
        lastModified: Date.now()
    };
    setAppState(prev => ({ ...prev, campaigns: [...prev.campaigns, newCampaign]}));
    setActiveCampaignId(newCampaignId);
  };
  
  const handleLoadExampleCampaign = useCallback(() => {
    const exampleName = t('exampleCampaignName');
    const existingCampaign = appState.campaigns.find(c => c.name === exampleName);

    if (existingCampaign) {
      setActiveCampaignId(existingCampaign.id);
      return;
    }

    const newCampaignId = crypto.randomUUID();
    const newCampaign = {
      ...exampleCampaignData,
      name: exampleName,
      id: newCampaignId,
      lastModified: Date.now(),
      heroes: exampleCampaignData.heroes.map(h => ({ ...h, id: crypto.randomUUID() })),
      monsters: exampleCampaignData.monsters.map(m => ({ ...m, id: crypto.randomUUID() })),
    };
    
    setAppState(prev => ({ ...prev, campaigns: [...prev.campaigns, newCampaign] }));
    setActiveCampaignId(newCampaignId);
  }, [appState.campaigns, t]);

  const handleDeleteCampaign = useCallback((id) => {
    if (window.confirm(t('deleteConfirmation'))) {
        setAppState(prev => ({
          ...prev, 
          campaigns: prev.campaigns.filter(c => c.id !== id) 
        }));
        if (activeCampaignId === id) {
            setActiveCampaignId(null);
        }
    }
  }, [t, activeCampaignId]);
  
  if (!isAnonymousMode && !user) {
    return React.createElement(LoginScreen, null);
  }

  const renderActiveCampaign = () => {
      if (isLoading && !activeCampaign?.storyData) {
          return React.createElement(LoadingSpinner, null);
      }
      if (activeCampaign) {
          return React.createElement('div', { className: "animate-fade-in" },
              React.createElement('div', { className: "w-full max-w-4xl mx-auto text-center mt-8" },
                  React.createElement(CampaignNameEditor, { campaign: activeCampaign, onUpdate: handleUpdateCampaign })
              ),
              React.createElement(HeroManager, {
                  heroes: activeCampaign.heroes,
                  onAddHero: handleAddHero,
                  onUpdateHero: handleUpdateHero,
                  onRemoveHero: handleRemoveHero,
                  gameSystem: activeCampaign.gameSettings.system
              }),
              React.createElement(MonsterManager, {
                  monsters: activeCampaign.monsters || [],
                  onAddMonster: handleAddMonster,
                  onUpdateMonster: handleUpdateMonster,
                  onRemoveMonster: handleRemoveMonster,
              }),
              !activeCampaign.storyData && !isLoading && React.createElement(PromptInput, {
                  onGenerate: handleGenerate,
                  isLoading: isLoading,
                  canGenerate: canGenerate
              }),
              isLoading && activeCampaign.storyData && React.createElement(LoadingSpinner, null),
              activeCampaign.storyData && !isLoading && React.createElement('div', { className: "mt-8 animate-fade-in-up" },
                  React.createElement(ContinuationInput, {
                      story: activeCampaign.storyData,
                      onContinue: handleContinue,
                      isLoading: isLoading,
                      canGenerate: canGenerate
                  }),
                  React.createElement(StoryDisplay, { data: activeCampaign.storyData })
              )
          );
      }
      return null;
  };

  return React.createElement(ThemeContext.Provider, { value: { theme, setTheme } },
      React.createElement('div', { 
          className: "flex flex-col min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]",
          style: {
            backgroundImage: 'radial-gradient(circle at top right, rgba(128, 0, 128, 0.2), transparent 40%), radial-gradient(circle at bottom left, rgba(106, 90, 205, 0.2), transparent 50%)',
            fontFamily: "'Helvetica Neue', 'Arial', sans-serif"
          }
      },
      React.createElement(Header, { 
          onBack: () => setActiveCampaignId(null), 
          showBack: !!activeCampaignId, 
          user: isAnonymousMode ? null : user, 
          onSignOut: handleSignOut 
      }),
      React.createElement('main', { className: "container mx-auto px-4 pb-16 flex-grow" },
          error && React.createElement('div', {
              className: "w-full max-w-4xl mx-auto my-4 p-4 bg-[var(--danger-bg)] border border-[var(--danger-border)] text-[var(--danger-text)] rounded-lg text-center",
              onClick: () => setError(null),
              style: { cursor: 'pointer' }
          },
              React.createElement('p', { className: "font-bold" }, t('errorTitle')),
              React.createElement('p', null, error)
          ),
          !activeCampaignId ? React.createElement('div', { className: "animate-fade-in" },
              React.createElement(CampaignList, {
                  campaigns: appState.campaigns,
                  onSelect: setActiveCampaignId,
                  onDelete: handleDeleteCampaign,
                  onNew: handleNewCampaign,
                  canCreate: canCreateCampaign,
                  onLoadExample: handleLoadExampleCampaign
              }),
              React.createElement(BackupManager, { appState: { ...appState, theme }, onLoad: handleLoadAppState })
          ) : renderActiveCampaign()
      ),
      React.createElement(Footer, null),
      React.createElement('style', {
          dangerouslySetInnerHTML: {
            __html: `
              @keyframes fade-in {
                  from { opacity: 0; }
                  to { opacity: 1; }
              }
              @keyframes fade-in-up {
                  from { opacity: 0; transform: translateY(20px); }
                  to { opacity: 1; transform: translateY(0); }
              }
              .animate-fade-in {
                  animation: fade-in 0.8s ease-in-out;
              }
              .animate-fade-in-up {
                  animation: fade-in-up 0.6s ease-out;
              }
            `,
          }
      })
    )
  );
};

const App = () => React.createElement(LanguageProvider, null, React.createElement(AppContent, null));

export default App;