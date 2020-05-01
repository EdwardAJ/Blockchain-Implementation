import web3 from './web3'
const address = '0x3981Ff23e8e84E15036F360adc4cc85d7F3Bfa01'
const abi = [
  {
    'constant': true,
    'inputs': [],
    'name': 'getAllCompanies',
    'outputs': [
      {
        'components': [
          {
            'name': '_companyID',
            'type': 'bytes32'
          },
          {
            'name': '_name',
            'type': 'string'
          },
          {
            'name': '_address',
            'type': 'string'
          },
          {
            'name': '_phoneNumber',
            'type': 'string'
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
        'name': 'companyID',
        'type': 'bytes32'
      }
    ],
    'name': 'getCompanyByID',
    'outputs': [
      {
        'name': '',
        'type': 'string'
      },
      {
        'name': '',
        'type': 'string'
      },
      {
        'name': '',
        'type': 'string'
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
        'name': '__name',
        'type': 'string'
      },
      {
        'name': '__address',
        'type': 'string'
      },
      {
        'name': '__phoneNumber',
        'type': 'string'
      }
    ],
    'name': 'addCompany',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'getCompaniesCount',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  }
]

const instance = new web3.eth.Contract(abi, address)
export default instance
