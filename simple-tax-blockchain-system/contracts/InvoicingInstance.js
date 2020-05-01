import web3 from './web3'
const address = '0x879CfA5cFB23f93938033DFeF5a857d7E1150f78'
const abi = [
  {
    'constant': false,
    'inputs': [
      {
        'name': '_payeeID',
        'type': 'bytes32'
      },
      {
        'name': '_amountToPay',
        'type': 'uint256'
      }
    ],
    'name': 'addInvoice',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '_payeeID',
        'type': 'bytes32'
      }
    ],
    'name': 'getInvoicesByCompanyID',
    'outputs': [
      {
        'components': [
          {
            'name': 'hashID',
            'type': 'bytes32'
          },
          {
            'name': 'amountToPay',
            'type': 'uint256'
          },
          {
            'name': 'isInvoicePaid',
            'type': 'bool'
          },
          {
            'name': 'exists',
            'type': 'bool'
          }
        ],
        'name': '',
        'type': 'tuple[]'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '_payeeID',
        'type': 'bytes32'
      }
    ],
    'name': 'getInvoicesCountByCompanyID',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_hashID',
        'type': 'bytes32'
      },
      {
        'name': '_payeeID',
        'type': 'bytes32'
      }
    ],
    'name': 'payInvoice',
    'outputs': [],
    'payable': true,
    'stateMutability': 'payable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '_hashID',
        'type': 'bytes32'
      },
      {
        'name': '_payeeID',
        'type': 'bytes32'
      }
    ],
    'name': 'getInvoiceStatus',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      },
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
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'name': '_hashId',
        'type': 'bytes32'
      }
    ],
    'name': 'InvoiceAdded',
    'type': 'event'
  }
]

const instance = new web3.eth.Contract(abi, address)
export default instance
