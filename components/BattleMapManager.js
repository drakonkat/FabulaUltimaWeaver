import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from '../hooks/useTranslation.js';
import CampaignNameEditor from './CampaignNameEditor.js';
import MapTutorial from './MapTutorial.js';

// START: ICONS
const BackIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z", clipRule: "evenodd" }));
const PlusCircleIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 mr-2", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z", clipRule: "evenodd" }));
const TrashIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z", clipRule: "evenodd" }));
const MoveIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }));
const PencilIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" }));
const SquareIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 4h16v16H4z" }));
const CircleIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 21a9 9 0 100-18 9 9 0 000 18z" }));
const PlayerIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z", clipRule: "evenodd" }));
const MonsterIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { d: "M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM5.22 5.22a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM13.66 6.28a.75.75 0 00-1.06-1.06l-1.06 1.06a.75.75 0 101.06 1.06l1.06-1.06zM10 18a8 8 0 100-16 8 8 0 000 16zM9 13a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" }));
const UndoIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 10h10a8 8 0 018 8v2M3 10l6-6m-6 6l6 6" }));
const ClearIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }));
const HelpIcon = () => React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', className: 'h-6 w-6', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.546-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }));
// END: ICONS

const MapList = ({ maps, onSelect, onDelete, onNew }) => {
    const { t, language } = useTranslation();
    const sortedMaps = [...maps].sort((a, b) => b.lastModified - a.lastModified);
    const formatDate = ts => new Date(ts).toLocaleDateString(language, { year: 'numeric', month: 'long', day: 'numeric' });

    return React.createElement('div', { className: 'w-full max-w-4xl mx-auto p-4 md:p-8' },
        React.createElement('div', { className: 'flex justify-between items-center mb-6' },
            React.createElement('h2', { className: 'text-3xl font-bold text-[var(--highlight-secondary)]', style: { fontFamily: 'serif' } }, t('battleMaps')),
            React.createElement('button', { onClick: onNew, className: 'flex items-center justify-center px-4 py-3 font-bold text-sm text-white rounded-lg transition-all bg-gradient-to-r from-[var(--highlight-primary-from)] to-[var(--highlight-primary-to)]' },
                React.createElement(PlusCircleIcon, null),
                t('startNewMap')
            )
        ),
        sortedMaps.length === 0 ?
            React.createElement('p', { className: 'text-center py-8 text-[var(--text-muted)] italic text-lg' }, t('noMaps'))
            : React.createElement('div', { className: 'space-y-4' }, sortedMaps.map(map =>
                React.createElement('div', { key: map.id, className: 'p-4 bg-[var(--bg-primary)]/70 rounded-md border border-[var(--border-secondary)] flex justify-between items-center hover:border-[var(--border-accent-light)] transition-colors' },
                    React.createElement('div', { className: 'flex-grow cursor-pointer', onClick: () => onSelect(map.id) },
                        React.createElement('h3', { className: 'font-bold text-[var(--accent-primary)] text-xl' }, map.name),
                        React.createElement('p', { className: 'text-sm text-[var(--text-subtle)]' }, `${t('lastModified')}: ${formatDate(map.lastModified)}`)
                    ),
                    React.createElement('button', { onClick: e => { e.stopPropagation(); onDelete(map.id); }, className: 'p-2 text-[var(--danger)]/80 hover:text-[var(--danger)]' }, React.createElement(TrashIcon))
                )
            ))
    );
};

const BattleMapCanvas = ({ map, onSave, onBack, onShowTutorial }) => {
    const { t } = useTranslation();
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [activeTool, setActiveTool] = useState('select');
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentDrawing, setCurrentDrawing] = useState(null);
    const [drawingStartPos, setDrawingStartPos] = useState(null);
    const [draggedToken, setDraggedToken] = useState(null);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 30) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += 30) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        const drawItem = (item) => {
            if (!item) return;
            ctx.strokeStyle = item.color;
            ctx.lineWidth = item.strokeWidth;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            if (item.type === 'path' && item.points.length > 0) {
                ctx.beginPath();
                ctx.moveTo(item.points[0].x, item.points[0].y);
                item.points.forEach(p => ctx.lineTo(p.x, p.y));
                ctx.stroke();
            } else if (item.type === 'rectangle') {
                ctx.strokeRect(item.x, item.y, item.width, item.height);
            } else if (item.type === 'circle') {
                ctx.beginPath();
                ctx.arc(item.cx, item.cy, item.radius, 0, 2 * Math.PI);
                ctx.stroke();
            }
        };

        map.drawings.forEach(drawItem);
        if (isDrawing && currentDrawing) {
            drawItem(currentDrawing);
        }

        // Tokens
        map.tokens.forEach(token => {
            ctx.beginPath();
            ctx.arc(token.x, token.y, token.radius, 0, 2 * Math.PI);
            ctx.fillStyle = token.color;
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = 'white';
            ctx.font = `bold ${token.radius}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(token.label, token.x, token.y);
        });
    }, [map, isDrawing, currentDrawing]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const resizeObserver = new ResizeObserver(() => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
            draw();
        });
        resizeObserver.observe(container);

        draw();

        return () => resizeObserver.disconnect();
    }, [draw, map]);

    const getMousePos = e => {
        const rect = canvasRef.current.getBoundingClientRect();
        const touch = e.touches ? e.touches[0] : e;
        return {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top,
        };
    };
    
    const findTokenAt = (pos) => {
      return [...map.tokens].reverse().find(token => {
          const dist = Math.sqrt((pos.x - token.x) ** 2 + (pos.y - token.y) ** 2);
          return dist <= token.radius;
      });
    };

    const handleMouseDown = (e) => {
        const pos = getMousePos(e);
        setIsDrawing(true);
        setDrawingStartPos(pos);

        switch (activeTool) {
            case 'pencil':
                setCurrentDrawing({ type: 'path', id: crypto.randomUUID(), color: '#FFFFFF', strokeWidth: 3, points: [pos] });
                break;
            case 'square':
                setCurrentDrawing({ type: 'rectangle', id: crypto.randomUUID(), color: '#FFFFFF', strokeWidth: 3, x: pos.x, y: pos.y, width: 0, height: 0 });
                break;
            case 'circle':
                setCurrentDrawing({ type: 'circle', id: crypto.randomUUID(), color: '#FFFFFF', strokeWidth: 3, cx: pos.x, cy: pos.y, radius: 0 });
                break;
            case 'select': {
                setIsDrawing(false);
                const token = findTokenAt(pos);
                if (token) setDraggedToken(token);
                break;
            }
            case 'addPlayer':
            case 'addMonster': {
                setIsDrawing(false);
                const type = activeTool === 'addPlayer' ? 'P' : 'M';
                const color = activeTool === 'addPlayer' ? '#3B82F6' : '#EF4444';
                const count = map.tokens.filter(t => t.label.startsWith(type)).length + 1;
                const newToken = {
                    id: crypto.randomUUID(),
                    x: pos.x, y: pos.y, radius: 15, color, label: `${type}${count}`
                };
                onSave({ ...map, tokens: [...map.tokens, newToken] });
                break;
            }
            default:
                setIsDrawing(false);
                break;
        }
    };

    const handleMouseMove = (e) => {
        if (draggedToken) {
            const pos = getMousePos(e);
            const updatedTokens = map.tokens.map(t => t.id === draggedToken.id ? { ...t, x: pos.x, y: pos.y } : t);
            onSave({ ...map, tokens: updatedTokens });
            return;
        }

        if (!isDrawing || !drawingStartPos) return;
        const pos = getMousePos(e);

        switch (activeTool) {
            case 'pencil':
                setCurrentDrawing(prev => ({ ...prev, points: [...prev.points, pos] }));
                break;
            case 'square':
                setCurrentDrawing(prev => ({ ...prev, width: pos.x - drawingStartPos.x, height: pos.y - drawingStartPos.y }));
                break;
            case 'circle': {
                const dx = pos.x - drawingStartPos.x;
                const dy = pos.y - drawingStartPos.y;
                const radius = Math.sqrt(dx * dx + dy * dy);
                setCurrentDrawing(prev => ({ ...prev, cx: drawingStartPos.x, cy: drawingStartPos.y, radius }));
                break;
            }
        }
    };
    
    const handleMouseUp = () => {
        if (draggedToken) {
            setDraggedToken(null);
        }

        if (isDrawing && currentDrawing) {
            let finalDrawing = { ...currentDrawing };
            if (finalDrawing.type === 'rectangle') {
                if (finalDrawing.width < 0) {
                    finalDrawing.x += finalDrawing.width;
                    finalDrawing.width = Math.abs(finalDrawing.width);
                }
                if (finalDrawing.height < 0) {
                    finalDrawing.y += finalDrawing.height;
                    finalDrawing.height = Math.abs(finalDrawing.height);
                }
            }
            
            const isMeaningful = d => {
                if (d.type === 'path') return d.points.length > 1;
                if (d.type === 'rectangle') return d.width !== 0 || d.height !== 0;
                if (d.type === 'circle') return d.radius > 2;
                return false;
            };

            if (isMeaningful(finalDrawing)) {
                onSave({ ...map, drawings: [...map.drawings, finalDrawing] });
            }
        }
        
        setIsDrawing(false);
        setCurrentDrawing(null);
        setDrawingStartPos(null);
    };
    
    const handleUndo = () => onSave({ ...map, drawings: map.drawings.slice(0, -1) });
    const handleClear = () => onSave({ ...map, drawings: [], tokens: [] });
    
    const tools = [
        { id: 'select', icon: React.createElement(MoveIcon), label: t('select') },
        { id: 'pencil', icon: React.createElement(PencilIcon), label: t('pencil') },
        { id: 'square', icon: React.createElement(SquareIcon), label: t('square') },
        { id: 'circle', icon: React.createElement(CircleIcon), label: t('circle') },
        { id: 'addPlayer', icon: React.createElement(PlayerIcon), label: t('addPlayer') },
        { id: 'addMonster', icon: React.createElement(MonsterIcon), label: t('addMonster') },
        { id: 'undo', icon: React.createElement(UndoIcon), action: handleUndo, label: t('undo') },
        { id: 'clear', icon: React.createElement(ClearIcon), action: handleClear, label: t('clear') },
    ];

    return React.createElement('div', { className: 'h-full flex flex-col' },
        React.createElement('div', { className: 'flex-shrink-0 p-2 flex items-center justify-between bg-[var(--bg-tertiary)]' },
            React.createElement('button', { onClick: onBack, className: 'flex items-center px-3 py-2 text-sm rounded-lg bg-[var(--accent-tertiary)]/80 text-white' }, React.createElement(BackIcon), t('backToList')),
            React.createElement('div', { className: 'w-full max-w-sm' }, React.createElement(CampaignNameEditor, { campaign: map, onUpdate: onSave })),
            React.createElement('div', { className: 'w-32 flex justify-end' },
                React.createElement('button', {
                    onClick: onShowTutorial,
                    title: t('showHelp'),
                    className: 'p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                },
                    React.createElement(HelpIcon, null)
                )
            )
        ),
        React.createElement('div', { className: 'flex-grow flex' },
            React.createElement('div', { className: 'flex flex-col gap-2 p-2 bg-[var(--bg-tertiary)]' },
                tools.map(tool => React.createElement('button', {
                    key: tool.id,
                    onClick: () => tool.action ? tool.action() : setActiveTool(tool.id),
                    title: tool.label,
                    className: `p-3 rounded-lg ${activeTool === tool.id ? 'bg-[var(--accent-primary)] text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:bg-[var(--bg-quaternary)]'}`
                }, tool.icon))
            ),
            React.createElement('div', { ref: containerRef, className: 'flex-grow h-full bg-[var(--bg-primary)] cursor-crosshair' },
                React.createElement('canvas', { ref: canvasRef, onMouseDown: handleMouseDown, onMouseMove: handleMouseMove, onMouseUp: handleMouseUp, onMouseLeave: handleMouseUp, onTouchStart: handleMouseDown, onTouchMove: handleMouseMove, onTouchEnd: handleMouseUp })
            )
        )
    );
};

const BattleMapManager = ({ isOpen, onClose, maps, activeMapId, onSelectMap, onNewMap, onUpdateMap, onDeleteMap, hasCompletedMapTutorial, onFinishMapTutorial }) => {
    const [isTutorialVisible, setIsTutorialVisible] = useState(false);

    useEffect(() => {
        if (isOpen && activeMapId && !hasCompletedMapTutorial) {
            setIsTutorialVisible(true);
        }
    }, [isOpen, activeMapId, hasCompletedMapTutorial]);

    const handleCloseTutorial = (dontShowAgain) => {
        setIsTutorialVisible(false);
        if (dontShowAgain) {
            onFinishMapTutorial();
        }
    };

    if (!isOpen) return null;
    const activeMap = maps.find(m => m.id === activeMapId);

    return React.createElement('div', {
        className: 'fixed inset-0 bg-[var(--bg-secondary)] z-50 animate-fade-in flex flex-col',
        'aria-modal': true,
        role: 'dialog'
    },
        !activeMap && React.createElement('button', {
            onClick: onClose,
            className: 'absolute top-4 right-4 p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-full hover:bg-[var(--bg-tertiary)] z-10'
        }, React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', className: 'h-8 w-8', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M6 18L18 6M6 6l12 12' }))),
        
        activeMap ?
            React.createElement(React.Fragment, null,
                React.createElement(BattleMapCanvas, {
                    map: activeMap,
                    onSave: onUpdateMap,
                    onBack: () => onSelectMap(null),
                    onShowTutorial: () => setIsTutorialVisible(true)
                }),
                React.createElement(MapTutorial, {
                    isOpen: isTutorialVisible,
                    onClose: handleCloseTutorial
                })
            ) :
            React.createElement(MapList, {
                maps: maps,
                onSelect: onSelectMap,
                onDelete: onDeleteMap,
                onNew: onNewMap
            })
    );
};

export default BattleMapManager;