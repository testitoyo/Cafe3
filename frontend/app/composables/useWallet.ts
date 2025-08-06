import { ref, computed } from "vue";
import { ethers } from "ethers";

export function useWallet() {
    const connectedAccount = ref<string | null>(null);
    const provider = ref<ethers.BrowserProvider | null>(null);
    const signer = ref<ethers.JsonRpcSigner | null>(null);
    const isConnecting = ref(false);

    const isConnected = computed(() => !!connectedAccount.value);

    const connectWallet = async () => {
        if (isConnecting.value) return;

        try {
            isConnecting.value = true;

            if (!window.ethereum) {
                throw new Error("Please install MetaMask to use this dApp");
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();

            // Check if connected to Kaia Kairos Testnet
            const network = await provider.getNetwork();
            const chainId = Number(network.chainId);

            if (chainId !== 1001) {
                try {
                    await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: "0x3E9" }],
                    });
                } catch (switchError: any) {
                    if (switchError.code === 4902) {
                        await window.ethereum.request({
                            method: "wallet_addEthereumChain",
                            params: [
                                {
                                    chainId: "0x3E9",
                                    chainName: "Kaia Kairos Testnet",
                                    nativeCurrency: {
                                        name: "KAIA",
                                        symbol: "KAIA",
                                        decimals: 18,
                                    },
                                    rpcUrls: [
                                        "https://public-en-kairos.node.kaia.io",
                                    ],
                                    blockExplorerUrls: [
                                        "https://kairos.kaiascan.io",
                                    ],
                                },
                            ],
                        });
                    }
                }
            }

            connectedAccount.value = address;
            provider.value = provider;
            signer.value = signer;

            return { address, signer, provider };
        } catch (error: any) {
            console.error("Failed to connect wallet:", error);
            throw new Error("Failed to connect wallet: " + error.message);
        } finally {
            isConnecting.value = false;
        }
    };

    const disconnectWallet = () => {
        connectedAccount.value = null;
        provider.value = null;
        signer.value = null;
    };

    const getShortAddress = (address: string) => {
        return `${address.substring(0, 6)}...${address.substring(38)}`;
    };

    const checkConnection = async () => {
        if (!window.ethereum) return false;

        try {
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if (accounts.length > 0) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();

                connectedAccount.value = address;
                provider.value = provider;
                signer.value = signer;
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error checking connection:", error);
            return false;
        }
    };

    return {
        connectedAccount,
        provider,
        signer,
        isConnecting,
        isConnected,
        connectWallet,
        disconnectWallet,
        getShortAddress,
        checkConnection,
    };
}
