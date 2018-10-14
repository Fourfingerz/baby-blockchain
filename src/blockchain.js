const hash = require('crypto').createHash('sha256');

class Block {
  constructor(index, hash, previousHash, timestamp, payload) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.payload = payload;
    this.hash = hash;
  }
}

const genesis = new Block(
  0,
  '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7',
  null, 
  1539488005,
  'h i g h l y  d e c e n t r a l i z e d'
)

let blockchain = [genesis];
const getBlockChain = () => blockchain;
const getLatestBlock = () => blockchain[blockchain.length - 1]

const makeHash = (index, previousHash, timestamp, payload) => {
   hash.write(index + previousHash + timestamp + payload.toString());
   hash.end();
}

const makeNextBlock = (blockData) => {
  const newBlock = new Block(
    previousBlock.index + 1,
    calculateHash()
  ) 
}