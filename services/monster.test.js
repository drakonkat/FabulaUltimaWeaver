import assert from 'node:assert/strict';
import { parseMonsterResponse, parseOneShotResponse, parseOneShotEdit } from './geminiService.js';

const original = { id: 'saved-id', name: 'Sentinella', attributes: [{ key: 'HP', value: '24' }], inventory: [{ name: 'Gemma', quantity: '1' }] };
const modified = parseMonsterResponse(JSON.stringify({ id: 'untrusted-id', name: 'Sentinella', attributes: [{ key: 'HP', value: '24' }, { key: 'Spore', value: 'Velenose' }] }), 'generic', original);
assert.equal(modified.id, original.id);
assert.deepEqual(modified.inventory, original.inventory);
assert.equal(modified.attributes[1].value, 'Velenose');
assert.equal(original.attributes.length, 1);
assert.throws(() => parseMonsterResponse('{"name":"Broken","attributes":{}}', 'generic'));
assert.throws(() => parseMonsterResponse('{"name":"Broken","attributes":[{"key":"HP","value":24}]}', 'generic'));
assert.throws(() => parseMonsterResponse('{"name":"" ,"attributes":[]}', 'generic'));
assert.throws(() => parseMonsterResponse('not json', 'generic'));

const fabula = {
    name: 'Lupo', description: 'Un lupo', level: 5, rank: 'soldier', species: 'beast',
    attributes: { dex: 'd8', ins: 'd6', mig: 'd8', wlp: 'd6' },
    stats: { hp: 45, mp: 35, init: 7, def: 8, mdef: 6 },
    basicAttacks: [{ name: 'Morso', attr1: 'DEX', attr2: 'MIG', damageMod: 5, damageType: 'physical', range: 'melee' }],
    spells: null, inventory: [{ name: 'Zanna', quantity: '2' }],
};
assert.equal(parseMonsterResponse(JSON.stringify(fabula), 'fabula').basicAttacks[0].name, 'Morso');
assert.throws(() => parseMonsterResponse(JSON.stringify({ ...fabula, stats: null }), 'fabula'));
assert.throws(() => parseMonsterResponse(JSON.stringify({ ...fabula, rank: 'unknown' }), 'fabula'));
assert.throws(() => parseMonsterResponse(JSON.stringify({ ...fabula, basicAttacks: [{}] }), 'fabula'));
for (const [section, item] of Object.entries({
    locations: { name: 'Grotta', description: 'Cristalli', keyFeatures: 'Un pozzo' },
    events: { eventType: 'puzzle', description: 'Enigma', clue: 'Luna', outcome: 'Porta aperta' },
    npcs: { name: 'Lia', role: 'Guida', keyCharacteristic: 'Curiosa', motivation: 'Esplorare' },
    items: { name: 'Chiave', itemType: 'keyItem', effect: 'Apre la porta' },
})) {
    assert.deepEqual(parseOneShotResponse(JSON.stringify({ ...item, id: 'untrusted-id' }), section), item);
}
assert.throws(() => parseOneShotResponse('{"eventType":"invalid","description":"x"}', 'events'));
console.log('Monster and one-shot refinement checks passed.');

const adventure = {
    id: 'adventure-id', title: 'The Gate', heroes: [{ id: 'hero-id', name: 'Lia' }], monsters: [fabula],
    mainStoryArcs: [{ id: 'arc-id', title: 'Gate', premise: 'Find it', hook: 'A map', objective: 'Open it', stakes: 'Time', climax: 'A lock', resolution: 'Escape' }],
    locations: [{ id: 'location-id', name: 'Tower', description: 'Old', notes: 'Keep this custom note' }],
    events: [], npcs: [], items: [],
};
const bulk = {
    title: 'The Puzzle Gate', mainStoryArcs: [{ ...adventure.mainStoryArcs[0], climax: 'Solve the moon riddle' }],
    locations: [], events: [{ id: '', eventType: 'puzzle', description: 'Align the moons', clue: 'A mural', outcome: 'Gate opens' }],
    npcs: [], items: [], heroes: [], monsters: [], id: 'untrusted-id',
};
const refined = parseOneShotEdit(JSON.stringify(bulk), adventure);
assert.equal(refined.id, adventure.id);
assert.equal(refined.mainStoryArcs[0].id, 'arc-id');
assert.equal(refined.mainStoryArcs[0].climax, 'Solve the moon riddle');
assert.deepEqual(refined.locations, adventure.locations);
assert.deepEqual(refined.heroes, adventure.heroes);
assert.deepEqual(refined.monsters, adventure.monsters);
assert.ok(refined.events[0].id);
assert.equal(adventure.events.length, 0);
assert.equal(adventure.mainStoryArcs[0].climax, 'A lock');
assert.throws(() => parseOneShotEdit(JSON.stringify({ ...bulk, mainStoryArcs: [{ ...bulk.mainStoryArcs[0], id: 'unknown' }] }), adventure));
assert.throws(() => parseOneShotEdit(JSON.stringify({ ...bulk, mainStoryArcs: [bulk.mainStoryArcs[0], bulk.mainStoryArcs[0]] }), adventure));
assert.throws(() => parseOneShotEdit(JSON.stringify({ ...bulk, locations: null }), adventure));
assert.throws(() => parseOneShotEdit(JSON.stringify({ ...bulk, title: '' }), adventure));
console.log('Bulk one-shot refinement checks passed.');
