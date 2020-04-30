import web3 from './web3'
const address = '0xa383a19027e2a6D07329b79f1F27a2DDBa4584b0'
const abi = [
  {
    'constant': true,
    'inputs': [],
    'name': 'isCurrentOwner',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'constructor'
  }
]

const instance = new web3.eth.Contract(abi, address)
export default instance
