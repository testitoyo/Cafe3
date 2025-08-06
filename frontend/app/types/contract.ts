export const CONTRACT_ABI = [
    {
        type: "constructor",
        inputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "buyCoffee",
        inputs: [
            {
                name: "_name",
                type: "string",
                internalType: "string",
            },
            {
                name: "_message",
                type: "string",
                internalType: "string",
            },
        ],
        outputs: [],
        stateMutability: "payable",
    },
    {
        type: "function",
        name: "getMemos",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "tuple[]",
                internalType: "struct BuyMeACoffee.Memo[]",
                components: [
                    {
                        name: "from",
                        type: "address",
                        internalType: "address",
                    },
                    {
                        name: "timestamp",
                        type: "uint256",
                        internalType: "uint256",
                    },
                    {
                        name: "name",
                        type: "string",
                        internalType: "string",
                    },
                    {
                        name: "message",
                        type: "string",
                        internalType: "string",
                    },
                ],
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "getMemosCount",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "getOwner",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "address",
                internalType: "address",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "memos",
        inputs: [
            {
                name: "",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [
            {
                name: "from",
                type: "address",
                internalType: "address",
            },
            {
                name: "timestamp",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "name",
                type: "string",
                internalType: "string",
            },
            {
                name: "message",
                type: "string",
                internalType: "string",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "owner",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "address",
                internalType: "address payable",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "withdrawTips",
        inputs: [],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "event",
        name: "NewMemo",
        inputs: [
            {
                name: "from",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "timestamp",
                type: "uint256",
                indexed: false,
                internalType: "uint256",
            },
            {
                name: "name",
                type: "string",
                indexed: false,
                internalType: "string",
            },
            {
                name: "message",
                type: "string",
                indexed: false,
                internalType: "string",
            },
        ],
        anonymous: false,
    },
] as const;

export interface Memo {
    from: string;
    timestamp: number;
    name: string;
    message: string;
}

export interface CoffeeItem {
    id: string;
    name: string;
    description: string;
    price: string;
    icon: string;
}

export interface CoffeeOrder {
    name: string;
    message: string;
    amount: string;
    quantity: number;
}
