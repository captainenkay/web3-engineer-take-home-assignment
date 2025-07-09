# Web3 Engineer Take-Home Assignment

## Part 1: Smart Contract Development

Đây là các sản phẩm được yêu cầu cho Part 1.

### Deployed Contract Address (Monad Testnet)

```
0x9044200e0884E4D068a43a3e2A1Db0537065284a
```

### Contract ABI

```json
[
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newCount",
          "type": "uint256"
        }
      ],
      "name": "CountChanged",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "count",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decrement",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "increment",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
]
```
