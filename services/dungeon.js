export function generateDungeon({ width, height, size, type }, random = Math.random) {
    const count = { small: 6, medium: 12, large: 20 }[size] || 12;
    const columns = Math.max(1, Math.min(Math.round(Math.sqrt(count * width / height)), Math.floor(width / 110), count));
    const rows = Math.max(1, Math.min(Math.ceil(count / columns), Math.floor(height / 110)));
    const cellWidth = width / columns;
    const cellHeight = height / rows;
    const unit = Math.min(cellWidth, cellHeight);
    const corridorWidth = Math.min(30, unit * 0.16);
    const floor = type === 'caverns' ? '#b4aa94' : type === 'ruins' ? '#a6ad98' : '#b9c3ce';
    const terrain = { terrain: true, color: floor, fill: floor, wallColor: '#374151', strokeWidth: 4 };
    const drawings = [];
    const tokens = [];
    const rooms = Array.from({ length: rows * columns }, (_, i) => ({
        x: (i % columns + 0.5) * cellWidth,
        y: (Math.floor(i / columns) + 0.5) * cellHeight,
        width: cellWidth * (0.46 + random() * 0.2),
        height: cellHeight * (0.46 + random() * 0.2),
    }));
    const neighbors = i => [i % columns > 0 ? i - 1 : -1, i % columns < columns - 1 ? i + 1 : -1, i - columns, i + columns].filter(n => n >= 0 && n < rooms.length);
    const start = Math.floor(random() * rooms.length);
    const visited = new Set([start]);
    const stack = [start];
    const edges = [];
    // Adjacent cells keep corridors outside unrelated rooms; the spanning tree guarantees reachability.
    while (stack.length) {
        const from = stack[stack.length - 1];
        const choices = neighbors(from).filter(n => !visited.has(n));
        if (!choices.length) { stack.pop(); continue; }
        const to = choices[Math.floor(random() * choices.length)];
        visited.add(to);
        edges.push([from, to]);
        stack.push(to);
    }
    const distances = new Map([[start, 0]]);
    const queue = [start];
    for (const from of queue) {
        for (const [a, b] of edges) {
            const to = a === from ? b : b === from ? a : null;
            if (to !== null && !distances.has(to)) {
                distances.set(to, distances.get(from) + 1);
                queue.push(to);
            }
        }
    }
    const end = queue[queue.length - 1];
    edges.forEach(([a, b]) => drawings.push({ ...terrain, type: 'path', id: crypto.randomUUID(), strokeWidth: corridorWidth, points: [rooms[a], rooms[b]] }));
    rooms.forEach((room, i) => {
        const { x, y } = room;
        if (type === 'caverns') {
            const radius = Math.min(room.width, room.height) / 2;
            const points = Array.from({ length: 12 }, (_, j) => {
                const angle = j * Math.PI / 6;
                const r = radius * (0.82 + random() * 0.18);
                return { x: x + Math.cos(angle) * r, y: y + Math.sin(angle) * r };
            });
            drawings.push({ ...terrain, type: 'polygon', id: crypto.randomUUID(), points });
        } else {
            drawings.push({ ...terrain, type: 'rectangle', id: crypto.randomUUID(), x: x - room.width / 2, y: y - room.height / 2, width: room.width, height: room.height });
        }
        drawings.push({ type: 'roomLabel', id: crypto.randomUUID(), x, y: y - Math.min(room.height, room.width) * 0.22, label: String(i + 1) });
        if (i === start || i === end) return;
        if (random() < 0.55) tokens.push({ id: crypto.randomUUID(), x, y, radius: Math.min(15, unit * 0.08), color: '#dc2626', label: `M${tokens.length + 1}` });
        if (random() < 0.4) drawings.push({ type: type === 'caverns' || type === 'ruins' ? 'pillar' : 'chest', id: crypto.randomUUID(), x: x + room.width * 0.2, y: y + room.height * 0.2 });
    });
    if (type === 'classicDungeon') {
        for (const [a, b] of edges) {
            for (const [from, to] of [[a, b], [b, a]]) {
                const room = rooms[from];
                const next = rooms[to];
                const horizontal = room.y === next.y;
                drawings.push({ type: 'door', id: crypto.randomUUID(),
                    x: room.x + (horizontal ? Math.sign(next.x - room.x) * room.width / 2 : 0),
                    y: room.y + (horizontal ? 0 : Math.sign(next.y - room.y) * room.height / 2),
                    horizontal: !horizontal, size: corridorWidth,
                });
            }
        }
    }
    drawings.push({ type: 'entry', id: crypto.randomUUID(), ...rooms[start] });
    if (rooms.length > 1) tokens.push({ id: crypto.randomUUID(), x: rooms[end].x, y: rooms[end].y, radius: Math.min(21, unit * 0.1), color: '#991b1b', label: 'B' });
    return { drawings, tokens, entry: rooms[start], exit: rooms[end] };
}

export function generateDungeonFloors(settings, firstLayer, floorName) {
    const generated = Array.from({ length: settings.floors || 1 }, (_, i) => ({
        ...(i === 0 ? firstLayer : { id: crypto.randomUUID(), name: floorName(i) }),
        ...generateDungeon(settings),
    }));
    for (let i = 0; i < generated.length - 1; i++) {
        const source = generated[i];
        const target = generated[i + 1];
        const downId = crypto.randomUUID();
        const upId = crypto.randomUUID();
        source.drawings.push({ type: 'stairs', id: downId, x: source.exit.x, y: source.exit.y, direction: 'down', targetLayerId: target.id, targetStairId: upId });
        target.drawings.push({ type: 'stairs', id: upId, x: target.entry.x, y: target.entry.y, direction: 'up', targetLayerId: source.id, targetStairId: downId });
        source.tokens = source.tokens.filter(token => token.label !== 'B');
        target.drawings = target.drawings.filter(d => d.type !== 'entry');
    }
    return generated.map(({ entry, exit, ...layer }) => layer);
}

export function removeBrokenStairs(layers) {
    return layers.map(layer => ({ ...layer, drawings: layer.drawings.filter(d => d.type !== 'stairs' || layers.some(target => target.id === d.targetLayerId && target.drawings.some(other => other.id === d.targetStairId && other.targetStairId === d.id && other.targetLayerId === layer.id))) }));
}
