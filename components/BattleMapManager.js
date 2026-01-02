
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useTranslation } from '../hooks/useTranslation.js';
import CampaignNameEditor from './CampaignNameEditor.js';
import MapTutorial from './MapTutorial.js';

// START: ICONS
const BackIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z", clipRule: "evenodd" }));
const PlusCircleIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 mr-2", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z", clipRule: "evenodd" }));
const TrashIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z", clipRule: "evenodd" }));
const CursorIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", viewBox: "0 0 24 24", fill: "currentColor" }, React.createElement('path', { d: "M5,1.5L18.5,15.5L14.5,19.5L1,5.5V1.5H5M16,13L22,7L19,4L13,10V13H16Z" }));
const PencilIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" }));
const SquareIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 4h16v16H4z" }));
const CircleIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 21a9 9 0 100-18 9 9 0 000 18z" }));
const PlayerIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z", clipRule: "evenodd" }));
const MonsterIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { d: "M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM5.22 5.22a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM13.66 6.28a.75.75 0 00-1.06-1.06l-1.06 1.06a.75.75 0 101.06 1.06l1.06-1.06zM10 18a8 8 0 100-16 8 8 0 000 16zM9 13a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" }));
const UndoIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 10h10a8 8 0 018 8v2M3 10l6-6m-6 6l6 6" }));
const ClearIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }));
const HelpIcon = () => React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', className: 'h-6 w-6', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.546-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }));
const LightbulbIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" }));
const LayersIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v2m14 0v2M5 11v2m0-2l-2-2m16 2l2-2" }));
const DungeonIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }), React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 4v16M12 4v16M18 4v16" }));
const PropsIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", viewBox: "0 0 24 24", fill: "currentColor" }, React.createElement('path', { d: "M4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H15V20H17V22H7V20H9V18H4A2,2 0 0,1 2,16V4A2,2 0 0,1 4,2M4,6V12H10V6H4Z" }));

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

const DungeonGeneratorModal = ({ isOpen, onClose, onGenerate }) => {
    const { t } = useTranslation();
    const [settings, setSettings] = useState({ size: 'medium', type: 'classicDungeon' });

    if (!isOpen) return null;

    const handleGenerate = () => {
        onGenerate(settings);
        onClose();
    };

    return React.createElement('div', { className: "absolute top-16 left-1/2 -translate-x-1/2 bg-[var(--bg-tertiary)] p-4 rounded-lg shadow-2xl z-20 border-2 border-[var(--border-accent)] w-full max-w-sm", onClick: e => e.stopPropagation() },
        React.createElement('h3', { className: "text-lg font-bold text-[var(--highlight-secondary)] mb-4 text-center" }, t('dungeonSettings')),
        React.createElement('div', { className: "space-y-4" },
            React.createElement('div', null,
                React.createElement('label', { className: 'block text-sm font-medium text-[var(--text-secondary)] mb-1' }, t('dungeonSize')),
                React.createElement('select', { value: settings.size, onChange: e => setSettings(s => ({ ...s, size: e.target.value })), className: "w-full p-2 bg-[var(--bg-primary)] rounded-md border border-[var(--border-primary)]" },
                    React.createElement('option', { value: 'small' }, t('small')),
                    React.createElement('option', { value: 'medium' }, t('medium')),
                    React.createElement('option', { value: 'large' }, t('large')),
                )
            ),
            React.createElement('div', null,
                React.createElement('label', { className: 'block text-sm font-medium text-[var(--text-secondary)] mb-1' }, t('dungeonType')),
                React.createElement('select', { value: settings.type, onChange: e => setSettings(s => ({ ...s, type: e.target.value })), className: "w-full p-2 bg-[var(--bg-primary)] rounded-md border border-[var(--border-primary)]" },
                    React.createElement('option', { value: 'classicDungeon' }, t('classicDungeon')),
                    React.createElement('option', { value: 'caverns' }, t('caverns')),
                    React.createElement('option', { value: 'ruins' }, t('ruins')),
                )
            ),
            React.createElement('div', { className: "flex justify-end gap-2 pt-4 border-t border-[var(--border-secondary)]" },
                React.createElement('button', { onClick: onClose, className: "px-4 py-2 text-sm font-bold text-[var(--text-secondary)] rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-quaternary)]" }, t('cancel')),
                React.createElement('button', { onClick: handleGenerate, className: "px-4 py-2 text-sm font-bold text-white rounded-lg bg-gradient-to-r from-[var(--highlight-primary-from)] to-[var(--highlight-primary-to)]" }, t('generate'))
            )
        )
    );
};

const BattleMapCanvas = ({ map, onSave, onBack, onShowTutorial, openConfirmModal }) => {
    const { t } = useTranslation();
    const canvasRef = useRef(null);
    const offscreenCanvasRef = useRef(null);
    const containerRef = useRef(null);
    const [activeTool, setActiveTool] = useState('select');
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentDrawing, setCurrentDrawing] = useState(null);
    const [drawingStartPos, setDrawingStartPos] = useState(null);
    const [draggedToken, setDraggedToken] = useState(null);
    const [editingLayerName, setEditingLayerName] = useState(null);
    const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
    const [activeProp, setActiveProp] = useState('door');

    const activeLayer = useMemo(() => {
        return map.layers.find(l => l.id === map.activeLayerId) || map.layers[0];
    }, [map.layers, map.activeLayerId]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current; if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!offscreenCanvasRef.current) offscreenCanvasRef.current = document.createElement('canvas');
        const offscreenCanvas = offscreenCanvasRef.current;
        if (offscreenCanvas.width !== canvas.width || offscreenCanvas.height !== canvas.height) {
            offscreenCanvas.width = canvas.width;
            offscreenCanvas.height = canvas.height;
        }
        const offscreenCtx = offscreenCanvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

        const drawItem = (item, context) => {
            if (!item) return;
            context.strokeStyle = item.color || '#FFFFFF'; context.lineWidth = item.strokeWidth || 3;
            context.fillStyle = item.fill || item.color || '#FFFFFF';
            context.lineCap = 'round'; context.lineJoin = 'round';

            switch (item.type) {
                case 'path':
                    if (item.points.length > 0) {
                        context.beginPath(); context.moveTo(item.points[0].x, item.points[0].y);
                        item.points.forEach(p => context.lineTo(p.x, p.y)); context.stroke();
                    } break;
                case 'rectangle':
                    if (item.fill) context.fillRect(item.x, item.y, item.width, item.height);
                    else context.strokeRect(item.x, item.y, item.width, item.height);
                    break;
                case 'circle':
                    context.beginPath(); context.arc(item.cx, item.cy, item.radius, 0, 2 * Math.PI);
                    if (item.fill) context.fill();
                    else context.stroke();
                    break;
                case 'door':
                    context.fillStyle = '#854d0e'; // Door color
                    context.fillRect(item.x - 8, item.y - 20, 16, 40); // 16x40 door
                    context.beginPath();
                    context.arc(item.x + 4, item.y, 2, 0, 2 * Math.PI); // Knob
                    context.fillStyle = '#facc15'; // Gold knob
                    context.fill();
                    break;
                case 'window':
                    context.strokeStyle = '#3b82f6';
                    context.lineWidth = 4;
                    const size = 30;
                    const halfSize = size / 2;
                    context.strokeRect(item.x - halfSize, item.y - halfSize, size, size); // Frame
                    context.beginPath();
                    context.moveTo(item.x - halfSize, item.y); // Horizontal bar
                    context.lineTo(item.x + halfSize, item.y);
                    context.moveTo(item.x, item.y - halfSize); // Vertical bar
                    context.lineTo(item.x, item.y + halfSize);
                    context.stroke();
                    break;
                case 'chest':
                    context.fillStyle = '#6b4f3a'; context.fillRect(item.x-15, item.y-10, 30, 20);
                    context.strokeStyle = '#facc15'; context.lineWidth = 2; context.strokeRect(item.x-15, item.y-10, 30, 20);
                    context.beginPath(); context.moveTo(item.x-15, item.y); context.lineTo(item.x+15, item.y); context.stroke();
                    break;
                case 'table':
                    context.fillStyle = '#854d0e'; context.fillRect(item.x-25, item.y-15, 50, 30); break;
                case 'pillar':
                    context.fillStyle = '#4b5563'; context.beginPath(); context.arc(item.x, item.y, 10, 0, 2 * Math.PI); context.fill(); break;
            }
        };

        const drawToken = (token, context) => {
            context.beginPath(); context.arc(token.x, token.y, token.radius, 0, 2 * Math.PI);
            context.fillStyle = token.color; context.fill();
            context.strokeStyle = 'white'; context.lineWidth = 2; context.stroke();
            context.fillStyle = 'white'; context.font = `bold ${token.radius}px sans-serif`;
            context.textAlign = 'center'; context.textBaseline = 'middle';
            context.fillText(token.label, token.x, token.y);
        };
        
        const drawBackgroundAndGrid = (context) => {
            const themes = {
                grid: '#111827', building: '#6b4f3a', swamp: '#2f4f2f', mountain: '#5c5c5c'
            };
            context.fillStyle = themes[map.theme] || themes.grid;
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            
            context.strokeStyle = 'rgba(255, 255, 255, 0.1)'; context.lineWidth = 1;
            for (let x = 0; x < context.canvas.width; x += 30) {
                context.beginPath(); context.moveTo(x, 0); context.lineTo(x, context.canvas.height); context.stroke();
            }
            for (let y = 0; y < context.canvas.height; y += 30) {
                context.beginPath(); context.moveTo(0, y); context.lineTo(context.canvas.width, y); context.stroke();
            }
        };

        if (map.fogOfWar.enabled) {
            // Draw the complete map (background, drawings, all tokens) to the offscreen canvas
            drawBackgroundAndGrid(offscreenCtx);
            const allTokens = map.layers.flatMap(l => l.tokens);
            map.layers.forEach(layer => {
                layer.drawings.forEach(d => drawItem(d, offscreenCtx));
            });
            allTokens.forEach(t => drawToken(t, offscreenCtx));
    
            // Fill the main, visible canvas with solid black (the "fog")
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // "Cut out" circles of light from the fog for each player token
            const allPlayerTokens = allTokens.filter(t => t.label.startsWith('P'));
            ctx.globalCompositeOperation = 'destination-out';
            allPlayerTokens.forEach(token => {
                const radius = map.fogOfWar.radius;
                const gradient = ctx.createRadialGradient(token.x, token.y, radius * 0.2, token.x, token.y, radius);
                gradient.addColorStop(0, 'rgba(0,0,0,1)');
                gradient.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(token.x, token.y, radius, 0, 2 * Math.PI);
                ctx.fill();
            });
    
            // Draw the complete map from the offscreen canvas underneath the cleared fog areas
            ctx.globalCompositeOperation = 'destination-over';
            ctx.drawImage(offscreenCanvas, 0, 0);
    
            // Reset composite operation and draw player tokens again on top to ensure they are always visible
            ctx.globalCompositeOperation = 'source-over';
            allPlayerTokens.forEach(token => drawToken(token, ctx));
        } else {
            drawBackgroundAndGrid(ctx);
            if (activeLayer) {
                activeLayer.drawings.forEach(d => drawItem(d, ctx));
                activeLayer.tokens.forEach(t => drawToken(t, ctx));
            }
        }

        if (isDrawing && currentDrawing) drawItem(currentDrawing, ctx);

    }, [map, isDrawing, currentDrawing, activeLayer]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        const resizeObserver = new ResizeObserver(() => {
            canvas.width = container.offsetWidth; canvas.height = container.offsetHeight; draw();
        });
        resizeObserver.observe(container); draw();
        return () => resizeObserver.disconnect();
    }, [draw, map]);

    const getMousePos = e => {
        const rect = canvasRef.current.getBoundingClientRect();
        const touch = e.touches ? e.touches[0] : e;
        return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    };
    
    const findTokenAt = (pos) => {
      if (!activeLayer) return null;
      return [...activeLayer.tokens].reverse().find(token => (Math.sqrt((pos.x - token.x) ** 2 + (pos.y - token.y) ** 2)) <= token.radius);
    };

    const handleMouseDown = (e) => {
        if (!activeLayer) return;
        const pos = getMousePos(e);
        setDrawingStartPos(pos);

        const toolActions = {
            'select': () => { setIsDrawing(false); const token = findTokenAt(pos); if (token) setDraggedToken(token); },
            'pencil': () => { setIsDrawing(true); setCurrentDrawing({ type: 'path', id: crypto.randomUUID(), color: '#FFFFFF', strokeWidth: 3, points: [pos] }); },
            'square': () => { setIsDrawing(true); setCurrentDrawing({ type: 'rectangle', id: crypto.randomUUID(), color: '#FFFFFF', strokeWidth: 3, x: pos.x, y: pos.y, width: 0, height: 0 }); },
            'circle': () => { setIsDrawing(true); setCurrentDrawing({ type: 'circle', id: crypto.randomUUID(), color: '#FFFFFF', strokeWidth: 3, cx: pos.x, cy: pos.y, radius: 0 }); },
            'props': () => {
                const newProp = { type: activeProp, id: crypto.randomUUID(), x: pos.x, y: pos.y };
                const newLayers = map.layers.map(l => l.id === activeLayer.id ? { ...l, drawings: [...l.drawings, newProp] } : l);
                onSave({ ...map, layers: newLayers });
            },
            'addPlayer': () => addToken('P', '#3B82F6', pos),
            'addMonster': () => addToken('M', '#EF4444', pos),
        };
        (toolActions[activeTool] || (() => setIsDrawing(false)))();
    };

    const addToken = (type, color, pos) => {
        const count = activeLayer.tokens.filter(t => t.label.startsWith(type)).length + 1;
        const newToken = { id: crypto.randomUUID(), x: pos.x, y: pos.y, radius: 15, color, label: `${type}${count}` };
        const newLayers = map.layers.map(l => l.id === activeLayer.id ? { ...l, tokens: [...l.tokens, newToken] } : l);
        onSave({ ...map, layers: newLayers });
    };

    const handleMouseMove = (e) => {
        if (!activeLayer) return;
        const pos = getMousePos(e);
        if (draggedToken) {
            const newLayers = map.layers.map(l => l.id !== activeLayer.id ? l : { ...l, tokens: l.tokens.map(t => t.id === draggedToken.id ? { ...t, x: pos.x, y: pos.y } : t) });
            onSave({ ...map, layers: newLayers });
            return;
        }

        if (!isDrawing || !drawingStartPos) return;
        
        const toolActions = {
            'pencil': () => setCurrentDrawing(prev => ({ ...prev, points: [...prev.points, pos] })),
            'square': () => setCurrentDrawing(prev => ({ ...prev, width: pos.x - drawingStartPos.x, height: pos.y - drawingStartPos.y })),
            'circle': () => {
                const dx = pos.x - drawingStartPos.x; const dy = pos.y - drawingStartPos.y;
                setCurrentDrawing(prev => ({ ...prev, cx: drawingStartPos.x, cy: drawingStartPos.y, radius: Math.sqrt(dx * dx + dy * dy) }));
            },
        };
        (toolActions[activeTool] || (() => {}))();
    };
    
    const handleMouseUp = () => {
        if (draggedToken) setDraggedToken(null);
        if (isDrawing && currentDrawing && activeLayer) {
            let finalDrawing = { ...currentDrawing };
            if (finalDrawing.type === 'rectangle') {
                if (finalDrawing.width < 0) { finalDrawing.x += finalDrawing.width; finalDrawing.width = Math.abs(finalDrawing.width); }
                if (finalDrawing.height < 0) { finalDrawing.y += finalDrawing.height; finalDrawing.height = Math.abs(finalDrawing.height); }
            }
            const isMeaningful = d => (d.type === 'path' && d.points.length > 1) || (d.type === 'rectangle' && (d.width !== 0 || d.height !== 0)) || (d.type === 'circle' && d.radius > 2);
            if (isMeaningful(finalDrawing)) {
                const newLayers = map.layers.map(l => l.id === activeLayer.id ? { ...l, drawings: [...l.drawings, finalDrawing] } : l);
                onSave({ ...map, layers: newLayers });
            }
        }
        setIsDrawing(false); setCurrentDrawing(null); setDrawingStartPos(null);
    };

    const handleUndo = () => {
        if (!activeLayer) return;
        const newLayers = map.layers.map(l => l.id === activeLayer.id ? { ...l, drawings: l.drawings.slice(0, -1) } : l);
        onSave({ ...map, layers: newLayers });
    };

    const handleClear = () => {
        if (!activeLayer) return;
        openConfirmModal({
            title: t('clear'), message: t('confirmGenerationMessage'),
            onConfirm: () => {
                const newLayers = map.layers.map(l => l.id === activeLayer.id ? { ...l, drawings: [], tokens: [] } : l);
                onSave({ ...map, layers: newLayers });
            }
        });
    };
    
    const handleGenerateDungeon = (settings) => {
        if (!activeLayer || !canvasRef.current) return;
        openConfirmModal({
            title: t('confirmGeneration'), message: t('confirmGenerationMessage'),
            onConfirm: () => {
                const { width, height } = canvasRef.current;
                let newDrawings = [];
                let newTokens = [];
                const color = '#888';
                let monsterCount = 0;
    
                if (settings.type === 'caverns') {
                    const numCaves = { small: 15, medium: 25, large: 40 }[settings.size];
                    const caves = [];
                    for(let i=0; i<numCaves; i++){
                        const radius = 30 + Math.random() * 60;
                        const x = Math.random() * (width - radius*2) + radius;
                        const y = Math.random() * (height - radius*2) + radius;
                        caves.push({x, y, radius});
                    }
                    for (let i = 0; i < caves.length - 1; i++) {
                        const c1 = caves[i]; const c2 = caves[i + Math.floor(Math.random() * (caves.length - 1 - i)) + 1];
                        if (!c2) continue;
                        const path = [{x: c1.x, y: c1.y}, {x: c2.x, y: c2.y}];
                        newDrawings.push({ type: 'path', id: crypto.randomUUID(), color, strokeWidth: 40 + Math.random() * 20, points: path });
                    }
                    caves.forEach((c, index) => {
                        newDrawings.push({ type: 'circle', id: crypto.randomUUID(), color, strokeWidth: 0, fill: color, cx: c.x, cy: c.y, radius: c.radius });
                        
                        // Populate with monsters and props (stalagmites)
                        if (index > 0 && Math.random() > 0.6) {
                            monsterCount++;
                            newTokens.push({
                                id: crypto.randomUUID(),
                                x: c.x, y: c.y, radius: 15, color: '#EF4444', label: `M${monsterCount}`
                            });
                        } else if (Math.random() > 0.7) {
                             newDrawings.push({ type: 'pillar', id: crypto.randomUUID(), x: c.x, y: c.y });
                        }
                    });
                } else { // classicDungeon or ruins
                    const numRooms = { small: 7, medium: 12, large: 20 }[settings.size];
                    const rooms = [];
                    let attempts = 0;
                    while (rooms.length < numRooms && attempts < 2000) {
                        attempts++;
                        const w = 40 + Math.random() * 100; const h = 40 + Math.random() * 100;
                        const x = Math.random() * (width - w - 20) + 10; const y = Math.random() * (height - h - 20) + 10;
                        const newRoom = { x, y, w, h };
                        let overlapping = false;
                        for (const room of rooms) {
                            if (newRoom.x < room.x + room.w + 20 && newRoom.x + newRoom.w > room.x - 20 &&
                                newRoom.y < room.y + room.h + 20 && newRoom.y + newRoom.h > room.y - 20) {
                                overlapping = true; break;
                            }
                        }
                        if (!overlapping) rooms.push(newRoom);
                    }
                    rooms.sort((a,b) => (a.x+a.y) - (b.x+b.y));
                    
                    for (let i = 0; i < rooms.length - 1; i++) {
                        const r1 = rooms[i]; const r2 = rooms[i+1];
                        const c1x = r1.x + r1.w/2; const c1y = r1.y + r1.h/2;
                        const c2x = r2.x + r2.w/2; const c2y = r2.y + r2.h/2;
                        const path = [{x: c1x, y: c1y}, {x: c1x, y: c2y}, {x: c2x, y: c2y}];
                        newDrawings.push({ type: 'path', id: crypto.randomUUID(), color, strokeWidth: 15, points: path });
                        
                        // Add doors at connection points (simplified)
                        if (Math.random() > 0.3) {
                            newDrawings.push({ type: 'door', id: crypto.randomUUID(), x: c1x, y: r1.y + r1.h });
                        }
                    }
                    
                    rooms.forEach((room, index) => {
                        newDrawings.push({ type: 'rectangle', id: crypto.randomUUID(), color, strokeWidth: 0, fill: color, x: room.x, y: room.y, width: room.w, height: room.h });
                        
                        // Populate Dungeon
                        const centerX = room.x + room.w / 2;
                        const centerY = room.y + room.h / 2;

                        if (index === rooms.length - 1) {
                            // Boss Room
                            newTokens.push({
                                id: crypto.randomUUID(),
                                x: centerX, y: centerY, radius: 25, color: '#B91C1C', label: 'B'
                            });
                            newDrawings.push({ type: 'chest', id: crypto.randomUUID(), x: centerX + 30, y: centerY });
                        } else if (index > 0) { // Skip first room (start)
                            if (Math.random() > 0.4) {
                                // Add random monsters
                                const count = Math.floor(Math.random() * 2) + 1;
                                for(let m=0; m<count; m++) {
                                    monsterCount++;
                                    newTokens.push({
                                        id: crypto.randomUUID(),
                                        x: centerX - 10 + (m*20), y: centerY, radius: 15, color: '#EF4444', label: `M${monsterCount}`
                                    });
                                }
                            }
                            // Add Props
                            if (Math.random() > 0.5) {
                                const propType = Math.random() > 0.6 ? 'table' : (Math.random() > 0.5 ? 'chest' : 'pillar');
                                newDrawings.push({ type: propType, id: crypto.randomUUID(), x: centerX, y: centerY + 20 });
                            }
                        }
                    });
                    
                    if (settings.type === 'ruins') {
                        const damaged = [];
                        newDrawings.forEach(d => {
                            if ((d.type === 'rectangle' && Math.random() < 0.4) || (d.type === 'path' && Math.random() < 0.3)) { // Skip some elements
                            } else { damaged.push(d); }
                        });
                        newDrawings = damaged;
                    }
                }
    
                const newLayers = map.layers.map(l => l.id === activeLayer.id ? { ...l, drawings: newDrawings, tokens: newTokens } : l);
                onSave({ ...map, layers: newLayers });
            }
        });
    };

    const handleAddLayer = () => {
        const newLayer = { id: crypto.randomUUID(), name: t('defaultLayerName', { number: map.layers.length + 1 }), drawings: [], tokens: [] };
        onSave({ ...map, layers: [newLayer, ...map.layers], activeLayerId: newLayer.id });
    };
    
    const handleDeleteLayer = (layerId) => {
        if (map.layers.length <= 1) return;
        openConfirmModal({
            title: t('deleteLayer'), message: t('deleteLayerConfirmation'),
            onConfirm: () => {
                const newLayers = map.layers.filter(l => l.id !== layerId);
                onSave({ ...map, layers: newLayers, activeLayerId: (layerId === map.activeLayerId ? newLayers[0]?.id : map.activeLayerId) });
            }
        });
    };
    
    const handleRenameLayer = (layerId, newName) => onSave({ ...map, layers: map.layers.map(l => l.id === layerId ? { ...l, name: newName } : l) });
    
    const tools = [
        { id: 'select', icon: React.createElement(CursorIcon), label: t('select') },
        { id: 'pencil', icon: React.createElement(PencilIcon), label: t('pencil') },
        { id: 'square', icon: React.createElement(SquareIcon), label: t('square') },
        { id: 'circle', icon: React.createElement(CircleIcon), label: t('circle') },
        { id: 'props', icon: React.createElement(PropsIcon), label: t('props') },
        { id: 'addPlayer', icon: React.createElement(PlayerIcon), label: t('addPlayer') },
        { id: 'addMonster', icon: React.createElement(MonsterIcon), label: t('addMonster') },
        { id: 'generate', icon: React.createElement(DungeonIcon), action: () => setIsGeneratorOpen(p => !p), label: t('generateDungeon') },
        { id: 'undo', icon: React.createElement(UndoIcon), action: handleUndo, label: t('undo') },
        { id: 'clear', icon: React.createElement(ClearIcon), action: handleClear, label: t('clear') },
    ];

    const LayerNameInput = ({ layer }) => {
        const [name, setName] = useState(layer.name); const inputRef = useRef(null);
        useEffect(() => { inputRef.current?.focus(); inputRef.current?.select(); }, []);
        const handleBlur = () => { if (name.trim()) handleRenameLayer(layer.id, name.trim()); setEditingLayerName(null); };
        return React.createElement('input', { ref: inputRef, type: 'text', value: name, onChange: e => setName(e.target.value), onBlur: handleBlur, onKeyDown: e => e.key === 'Enter' && handleBlur(), className: "bg-transparent w-full focus:outline-none focus:ring-1 focus:ring-[var(--border-accent)] rounded px-1" });
    };

    return React.createElement('div', { className: 'h-full flex flex-col' },
        React.createElement('div', { className: 'relative flex-shrink-0 p-2 flex items-center justify-between bg-[var(--bg-tertiary)]' },
            React.createElement('button', { onClick: onBack, className: 'flex items-center px-3 py-2 text-sm rounded-lg bg-[var(--accent-tertiary)]/80 text-white' }, React.createElement(BackIcon), t('backToList')),
            React.createElement('div', { className: 'w-full max-w-sm' }, React.createElement(CampaignNameEditor, { campaign: map, onUpdate: onSave })),
            React.createElement('div', { className: 'w-32 flex justify-end' }, React.createElement('button', { onClick: onShowTutorial, title: t('showHelp'), className: 'p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]' }, React.createElement(HelpIcon, null))),
            React.createElement(DungeonGeneratorModal, { isOpen: isGeneratorOpen, onClose: () => setIsGeneratorOpen(false), onGenerate: handleGenerateDungeon })
        ),
        React.createElement('div', { className: 'flex-grow flex' },
            React.createElement('div', { className: 'flex flex-col gap-2 p-2 bg-[var(--bg-tertiary)]' },
                tools.map(tool => React.createElement('button', { key: tool.id, onClick: () => tool.action ? tool.action() : setActiveTool(tool.id), title: tool.label, className: `p-3 rounded-lg ${activeTool === tool.id ? 'bg-[var(--accent-primary)] text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:bg-[var(--bg-quaternary)]'}` }, tool.icon))
            ),
            React.createElement('div', { ref: containerRef, className: 'flex-grow h-full bg-[var(--bg-primary)] cursor-crosshair' },
                React.createElement('canvas', { ref: canvasRef, onMouseDown: handleMouseDown, onMouseMove: handleMouseMove, onMouseUp: handleMouseUp, onMouseLeave: handleMouseUp, onTouchStart: handleMouseDown, onTouchMove: handleMouseMove, onTouchEnd: handleMouseUp })
            ),
            React.createElement('div', { className: 'w-64 flex-shrink-0 bg-[var(--bg-tertiary)] p-3 flex flex-col gap-4' },
                // Theme & Prop Selector
                React.createElement('div', { className: 'p-2 bg-[var(--bg-secondary)] rounded-lg' },
                    React.createElement('label', { className: 'text-sm font-semibold text-[var(--text-secondary)]' }, activeTool === 'props' ? t('props') : t('mapTheme')),
                    React.createElement('select', {
                        value: activeTool === 'props' ? activeProp : (map.theme || 'grid'),
                        onChange: e => activeTool === 'props' ? setActiveProp(e.target.value) : onSave({ ...map, theme: e.target.value }),
                        className: "w-full mt-1 p-1 bg-[var(--bg-quaternary)] text-white rounded border border-[var(--border-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--border-accent)]"
                    }, activeTool === 'props' ?
                        React.createElement(React.Fragment, null,
                            React.createElement('option', { value: 'door' }, t('door')),
                            React.createElement('option', { value: 'window' }, t('window')),
                            React.createElement('option', { value: 'chest' }, t('chest')),
                            React.createElement('option', { value: 'table' }, t('table')),
                            React.createElement('option', { value: 'pillar' }, t('pillar')),
                        ) :
                        React.createElement(React.Fragment, null,
                            React.createElement('option', { value: 'grid' }, t('themeGrid')),
                            React.createElement('option', { value: 'building' }, t('themeBuilding')),
                            React.createElement('option', { value: 'swamp' }, t('themeSwamp')),
                            React.createElement('option', { value: 'mountain' }, t('themeMountain')),
                        )
                    )
                ),
                // Fog of War Controls
                React.createElement('div', { className: 'p-2 bg-[var(--bg-secondary)] rounded-lg' },
                    React.createElement('div', { className: 'flex items-center justify-between' },
                        React.createElement('label', { className: 'text-sm font-semibold text-[var(--text-secondary)]' }, t('fogOfWar')),
                        React.createElement('button', { onClick: () => onSave({ ...map, fogOfWar: { ...map.fogOfWar, enabled: !map.fogOfWar.enabled } }), title: t('fogOfWar'), className: `p-2 rounded-full ${map.fogOfWar.enabled ? 'text-yellow-400 bg-[var(--bg-quaternary)]' : 'text-[var(--text-muted)]'}` }, React.createElement(LightbulbIcon))
                    ),
                    map.fogOfWar.enabled && React.createElement('div', { className: 'mt-2' },
                        React.createElement('label', { className: 'block text-xs text-[var(--text-muted)] mb-1' }, `${t('lightRadius')}: ${map.fogOfWar.radius}px`),
                        React.createElement('input', { type: 'range', min: '30', max: '600', step: '10', value: map.fogOfWar.radius, onChange: e => onSave({ ...map, fogOfWar: { ...map.fogOfWar, radius: parseInt(e.target.value, 10) } }), className: 'w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer' })
                    )
                ),
                // Layer Manager
                React.createElement('div', { className: 'flex-grow flex flex-col p-2 bg-[var(--bg-secondary)] rounded-lg' },
                    React.createElement('h3', { className: 'text-sm font-semibold text-[var(--text-secondary)] mb-2 flex items-center' }, React.createElement(LayersIcon), t('layers')),
                    React.createElement('div', { className: 'flex-grow space-y-2 overflow-y-auto' },
                        map.layers.map(layer => React.createElement('div', { key: layer.id, onClick: () => onSave({ ...map, activeLayerId: layer.id }), className: `flex items-center gap-2 p-2 rounded cursor-pointer text-sm ${layer.id === map.activeLayerId ? 'bg-[var(--accent-secondary)] text-white' : 'bg-[var(--bg-quaternary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'}` },
                            React.createElement('div', { className: 'flex-grow', onDoubleClick: () => setEditingLayerName(layer.id) }, editingLayerName === layer.id ? React.createElement(LayerNameInput, { layer }) : React.createElement('span', null, layer.name)),
                            React.createElement('button', { onClick: (e) => { e.stopPropagation(); handleDeleteLayer(layer.id); }, className: 'p-1 rounded hover:bg-[var(--danger)]/50', disabled: map.layers.length <= 1 }, React.createElement(TrashIcon))
                        ))
                    ),
                    React.createElement('button', { onClick: handleAddLayer, className: 'mt-2 w-full p-2 text-sm bg-[var(--accent-tertiary)] hover:bg-[var(--accent-secondary)] text-white rounded' }, t('addLayer'))
                )
            )
        )
    );
};

const BattleMapManager = ({ isOpen, onClose, maps, activeMapId, onSelectMap, onNewMap, onUpdateMap, onDeleteMap, hasCompletedMapTutorial, onFinishMapTutorial, openConfirmModal }) => {
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
                    onShowTutorial: () => setIsTutorialVisible(true),
                    openConfirmModal
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
