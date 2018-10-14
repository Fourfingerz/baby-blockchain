const hash = require('crypto').createHash('sha256');

class Block {
  constructor(index, hash, previousHash, timestamp, payload) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.payload = payload;
    this.hash = hash;
  }
};

const genesis = new Block(
  0,
  '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7',
  null, 
  1539488005,
  'h i g h l y  d e c e n t r a l i z e d'
);

let blockchain = [genesis];
const getBlockchain = () => blockchain;
const getLatestBlock = () => blockchain[blockchain.length - 1];

const encrypt = (index, previousHash, timestamp, payload) => {
   hash.update((index + previousHash + timestamp + payload).toString());
};

const encryptBlock = (block) => encrypt(block.index, block.previousHash, block.timestamp, block.payload);

const addBlock = (newBlock) => {
  if (isValidNewBlock(newBlock, getLatestBlock())) {
    blockchain.push(newBlock);
  }
};

const addBlockToChain = (newBlock) => {
  if(isValidNewBlock(newBlock, getLatestBlock())) {
    blockchain.push(newBlock);
    return true;
  }
  return false;
};

const makeNextBlock = (blockData) => {
  const previousBlock = getLatestBlock();
  const nextIndex = previousBlock.index + 1;
  const nextTimestamp = new Date().getTime() / 1000;
  const nextHash = encrypt(nextIndex, previousBlock.hash, nextTimestamp, blockData);
  const newBlock = new Block(nextIndex, nextHash, previousBlock.hash, nextTimestamp, blockData);
  addBlock(newBlock);
  return newBlock;
};

const isValidNewBlock = (newBlock, previousBlock) => {
  if (previousBlock.index + 1 !== newBlock.index) {
    console.log('*** INVALID BLOCK: index of block must be one number larger than previous. ***')
    return false;
  } else if (previousBlock.hash !== new.previousHash) {
    console.log('*** INVALID BLOCK: previousHash of block must match hash of previous block. ***')
    return false;
  } else if (encryptBlock(newBlock) !== newBlock.hash) {
    console.log('*** INVALID BLOCK: invalid hash. ***')
    return false;
  }
  return true;
};

const isValidBlockTypes = (block) => {
  return typeof block.index === 'number'
      && typeof block.hash === 'string'
      && typeof block.previousHash === 'string'
      && typeof block.timestamp === 'number'
      && typeof block.data === 'string';
};

const isValidChain = (blockchain) => {
  const isValidGenesis = (block) => {
    return JSON.stringify(block) === JSON.stringify(genesis);
  }
  if (!isValidGenesis(blockchain[0])) {
    return false;
  }
  blockchain.forEach((block, index) => {
    if (!isValidNewBlock(block, block[index - 1])) {
      return false;
    }
  })
  return true;
}

const replaceChain = (newBlocks) => {
  if (isValidChain(newBlocks) && newBlocks.length > getBlockchain().length) {
    console.log('*** INCOMING BLOCKCHAIN IS VALID. SWAPPING CURRENT WITH INCOMING BLOCKCHAIN. ***');
    blockchain = newBlocks;
    broadcastLatest();
  } else {
    console.log('*** INCOMING BLOCKCHAIN IS INVALID. ***')
  }
}

export {Block, getBlockchain, getLatestBlock, makeNextBlock, isValidBlockTypes, replaceChain, addBlockToChain};