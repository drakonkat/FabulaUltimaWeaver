import assert from 'node:assert/strict';
import { generateDungeon, generateDungeonFloors, removeBrokenStairs } from './dungeon.js';

let seed = 1;
const random = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32);
let checked = 0;
for (const type of ['classicDungeon', 'caverns', 'ruins']) {
    for (const size of ['small', 'medium', 'large']) {
        for (const [width, height] of [[1600, 850], [800, 600], [320, 480], [180, 220]]) {
            for (let run = 0; run < 25; run++) {
                const dungeon = generateDungeon({ width, height, size, type }, random);
                const paths = dungeon.drawings.filter(d => d.type === 'path');
                const rooms = dungeon.drawings.filter(d => d.type === 'roomLabel');
                assert.equal(paths.length, rooms.length - 1);
                const key = p => `${p.x},${p.y}`;
                const reached = new Set([key(dungeon.entry)]);
                for (let pass = 0; pass < rooms.length; pass++) {
                    for (const { points: [a, b] } of paths) {
                        assert.ok(a.x === b.x || a.y === b.y, 'Corridors must be orthogonal');
                        if (reached.has(key(a))) reached.add(key(b));
                        if (reached.has(key(b))) reached.add(key(a));
                        for (const room of rooms) {
                            // Labels share the room's x and are above its center.
                            if (a.y === b.y && room.x > Math.min(a.x, b.x) && room.x < Math.max(a.x, b.x)) {
                                assert.ok(Math.abs(room.y - a.y) > 20, 'No corridor through an unrelated room');
                            }
                        }
                    }
                }
                assert.equal(reached.size, rooms.length, 'Every room must be reachable');
                assert.ok(reached.has(key(dungeon.exit)));
                for (const d of dungeon.drawings) {
                    if (d.type === 'rectangle') {
                        assert.ok(d.x >= 4 && d.y >= 4);
                        assert.ok(d.x + d.width <= width - 4 && d.y + d.height <= height - 4);
                    }
                    for (const p of d.points || []) assert.ok(p.x >= 0 && p.x <= width && p.y >= 0 && p.y <= height);
                }
                checked++;
            }
        }
    }
}
const oldLayer = { id: 'existing', name: 'Original', drawings: [], tokens: [] };
const floors = generateDungeonFloors({ width: 1200, height: 800, size: 'medium', type: 'caverns', floors: 4 }, oldLayer, i => `Floor ${i + 1}`);
assert.equal(floors.length, 4);
assert.equal(floors[0].id, oldLayer.id);
assert.deepEqual(oldLayer.drawings, []);
assert.equal(floors.flatMap(l => l.drawings).filter(d => d.type === 'stairs').length, 6);
assert.deepEqual(removeBrokenStairs(floors), floors);
assert.deepEqual(removeBrokenStairs(JSON.parse(JSON.stringify(floors))), floors, 'Links survive save/restore');
assert.equal(floors.flatMap(l => l.tokens).filter(t => t.label === 'B').length, 1);
assert.equal(floors.flatMap(l => l.drawings).filter(d => d.type === 'entry').length, 1);
const deleted = removeBrokenStairs(floors.filter((_, i) => i !== 1));
assert.equal(deleted.flatMap(l => l.drawings).filter(d => d.type === 'stairs').length, 2);
const cleared = removeBrokenStairs(floors.map((l, i) => i === 0 ? { ...l, drawings: [] } : l));
assert.equal(cleared.flatMap(l => l.drawings).filter(d => d.type === 'stairs').length, 4);
const lastStair = floors[0].drawings.at(-1);
const undone = removeBrokenStairs(floors.map((l, i) => i === 0 ? { ...l, drawings: l.drawings.slice(0, -1) } : l));
assert.ok(!undone.flatMap(l => l.drawings).some(d => d.id === lastStair.targetStairId));
console.log(`Dungeon checks passed: ${checked} random layouts, linked floors, save/restore and stair cleanup.`);
