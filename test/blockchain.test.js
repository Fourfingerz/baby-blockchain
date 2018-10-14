const {
  Block, genesis, isValidNewBlock, isValidChain, replaceChain
} = require('../src/blockchain');

test('isValidNewBlock: Returns true if the index of the newBlock is one number larger than the previous', () => {
  const newBlock = new Block(
    1,
    'b780e3698ef91f72126e5b9c3f13ff2c52516190c6e58ca0829878aa349ae8a1',
    '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7',
    1539530894,
    'd o n\' t  a s k,  d o n\' t  t e l l'
  );
  const result = isValidNewBlock(newBlock, genesis);
  expect(result).toBe(true);
});

test('isValidNewBlock: Returns false if the index of the newBlock is NOT one number larger than the previous', () => {
  const newBlock = new Block(
    333,
    'b780e3698ef91f72126e5b9c3f13ff2c52516190c6e58ca0829878aa349ae8a1',
    '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7',
    1539530894,
    'd o n\' t  a s k,  d o n\' t  t e l l'
  );
  const result = isValidNewBlock(newBlock, genesis);
  expect(result).toBe(false);
});

test('isValidNewBlock: Returns true if the previousHash of the newBlock matches the hash of the previous block', () => {
  let newBlock = new Block(
    1,
    'b780e3698ef91f72126e5b9c3f13ff2c52516190c6e58ca0829878aa349ae8a1',
    '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7',
    1539530894,
    'd o n\' t  a s k,  d o n\' t  t e l l'
  );
  const result = isValidNewBlock(newBlock, genesis);
  expect(result).toBe(true);
});

test('isValidNewBlock: Returns false if the previousHash of the block DOESN\'T match the hash of the previous block', () => {
  let newBlock = new Block(
    1,
    'b780e3698ef91f72126e5b9c3f13ff2c52516190c6e58ca0829878aa349ae8a1',
    'xxx534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7',
    1539530894,
    'd o n\' t  a s k,  d o n\' t  t e l l'
  );
  const result = isValidNewBlock(newBlock, genesis);
  expect(result).toBe(false);
});

test('isValidNewBlock: Returns true if the hash of the block itself is valid', () => {
  let newBlock = new Block(
    1,
    'b780e3698ef91f72126e5b9c3f13ff2c52516190c6e58ca0829878aa349ae8a1',
    '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7',
    1539530894,
    'd o n\' t  a s k,  d o n\' t  t e l l'
  );
  const result = isValidNewBlock(newBlock, genesis);
  expect(result).toBe(true);
});

test('isValidNewBlock: Returns false if the hash of the block itself is invalid', () => {
  let newBlock = new Block(
    1,
    'xxx0e3698ef91f72126e5b9c3f13ff2c52516190c6e58ca0829878aa349ae8a1',
    '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7',
    1539530894,
    'd o n\' t  a s k,  d o n\' t  t e l l'
  );
  const result = isValidNewBlock(newBlock, genesis);
  expect(result).toBe(false);
});

test('isValidChain: Returns true if the first block in the chain matches with the genesis', () => {
  const result = isValidChain(
    [
      genesis, 
      new Block(
        1,
        'b780e3698ef91f72126e5b9c3f13ff2c52516190c6e58ca0829878aa349ae8a1',
        '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7',
        1539530894,
        'd o n\' t  a s k,  d o n\' t  t e l l'),
    ]
  );
  expect(result).toBe(true);
});

test('isValidChain: Returns false if the first block in the chain DOESN\'T match with the genesis', () => {
  const result = isValidChain(
    [
      new Block(
        0,
        '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7',
        null, 
        1539488005,
        'h i g h l y  c e n t r a l i z e d'
      ), 
      new Block(
        1,
        'b780e3698ef91f72126e5b9c3f13ff2c52516190c6e58ca0829878aa349ae8a1',
        '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7',
        1539530894,
        'd o n\' t  a s k,  d o n\' t  t e l l'),
    ]
  );
  expect(result).toBe(false);
});

test('isValidChain: Returns true if every consecutive block in the chain matches with the previousBlock', () => {
  const result = isValidChain(
    [
      genesis, 
      new Block(
        1,
        'b780e3698ef91f72126e5b9c3f13ff2c52516190c6e58ca0829878aa349ae8a1',
        '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7',
        1539530894,
        'd o n\' t  a s k,  d o n\' t  t e l l'),
      new Block(
        2,
        'd8562a4a529d5b5f66a178835472acb4b263e4b337003421a7ee9501d74a299d',
        'b780e3698ef91f72126e5b9c3f13ff2c52516190c6e58ca0829878aa349ae8a1',
        1539552822,
        'p i c a y u n e  h u b r i s'),
    ]
  );
  expect(result).toBe(true);
});

test('isValidChain: Returns false if any consecutive block in the chain does not match with requirements of a valid block', () => {
  const result = isValidChain(
    [
      genesis,
      new Block(
        11,
        'b780e3698ef91f72126e5b9c3f13ff2c52516190c6e58ca0829878aa349ae8a1',
        '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7',
        1539530894,
        'd o n\' t  a s k,  d o n\' t  t e l l'),
      new Block(
        2,
        'd8562a4a529d5b5f66a178835472acb4b263e4b337003421a7ee9501d74a299d',
        'b780e3698ef91f72126e5b9c3f13ff2c52516190c6e58ca0829878aa349ae8a1',
        1539552822,
        'p i c a y u n e  h u b r i s'),
    ]
  );
  expect(result).toBe(false);
});

test('replaceChain: Returns the longest of two blockchains', () => {
  const result = replaceChain(
    [
      genesis, 
      new Block(
        1,
        'b780e3698ef91f72126e5b9c3f13ff2c52516190c6e58ca0829878aa349ae8a1',
        '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7',
        1539530894,
        'd o n\' t  a s k,  d o n\' t  t e l l'),
      new Block(
        2,
        'd8562a4a529d5b5f66a178835472acb4b263e4b337003421a7ee9501d74a299d',
        'b780e3698ef91f72126e5b9c3f13ff2c52516190c6e58ca0829878aa349ae8a1',
        1539552822,
        'p i c a y u n e  h u b r i s'),
    ]
  );
  expect(result).toStrictEqual(
    [
      genesis, 
      new Block(
        1,
        'b780e3698ef91f72126e5b9c3f13ff2c52516190c6e58ca0829878aa349ae8a1',
        '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7',
        1539530894,
        'd o n\' t  a s k,  d o n\' t  t e l l'),
      new Block(
        2,
        'd8562a4a529d5b5f66a178835472acb4b263e4b337003421a7ee9501d74a299d',
        'b780e3698ef91f72126e5b9c3f13ff2c52516190c6e58ca0829878aa349ae8a1',
        1539552822,
        'p i c a y u n e  h u b r i s'),
    ]
  );
});

test('replaceChain: Doesn\'t return the shortest of two blockchains', () => {
  const result = replaceChain([]);
  expect(result).not.toStrictEqual([]);
});