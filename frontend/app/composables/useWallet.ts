import { ethers } from "ethers";

const connectedAccount = ref<string | null>(null);
const provider = ref<ethers.BrowserProvider | null>(null);
const signer = ref<ethers.JsonRpcSigner | null>(null);
const isConnecting = ref(false);
const manuallyDisconnected = ref(false);

// Load manual disconnect flag from localStorage if present
if (process.client) {
    manuallyDisconnected.value =
        localStorage.getItem("wallet_manuallyDisconnected") === "true";
}

watchEffect(() => {
    if (process.client) {
        localStorage.setItem(
            "wallet_manuallyDisconnected",
            manuallyDisconnected.value ? "true" : "false",
        );
    }
});

export function useWallet() {
    const isConnected = computed(() => !!connectedAccount.value);

    const getShortAddress = (address: string) => {
        if (!address) return "";
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    const listenForAccountChange = () => {
        if (!window.ethereum) return;

        window.ethereum.on("accountsChanged", (accounts: string[]) => {
            console.log("[Wallet] accountsChanged event:", accounts);
            if (accounts.length === 0) {
                // User disconnected from MetaMask side
                connectedAccount.value = null;
                provider.value = null;
                signer.value = null;
                manuallyDisconnected.value = true;
            } else {
                connectedAccount.value = accounts[0];
            }
        });

        window.ethereum.on("chainChanged", (_chainId: string) => {
            console.log("[Wallet] chainChanged event, reloading page");
            window.location.reload();
        });
    };

    const connectWallet = async () => {
        if (isConnecting.value) return;

        manuallyDisconnected.value = false;

        try {
            isConnecting.value = true;
            console.log("Starting wallet connection...");

            if (!window.ethereum) {
                throw new Error("Please install MetaMask to use this dApp");
            }

            const newProvider = new ethers.BrowserProvider(window.ethereum);
            await newProvider.send("eth_requestAccounts", []);
            const newSigner = await newProvider.getSigner();
            const address = await newSigner.getAddress();

            // Check network and switch if needed
            const network = await newProvider.getNetwork();
            const chainId = Number(network.chainId);

            if (chainId !== 1001) {
                console.log("Switching to Kaia Kairos Testnet...");
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
                    } else {
                        throw switchError;
                    }
                }
            }

            connectedAccount.value = address;
            provider.value = newProvider;
            signer.value = newSigner;

            console.log("Wallet connection completed successfully");

            listenForAccountChange();

            return { address, signer: newSigner, provider: newProvider };
        } catch (error: any) {
            console.error("Failed to connect wallet:", error);
            throw new Error("Failed to connect wallet: " + error.message);
        } finally {
            isConnecting.value = false;
        }
    };

    const disconnectWallet = () => {
        console.log("Disconnecting wallet...");
        manuallyDisconnected.value = true;
        connectedAccount.value = null;
        provider.value = null;
        signer.value = null;
    };

    const checkConnection = async () => {
        if (!window.ethereum) return false;

        if (manuallyDisconnected.value) {
            console.log(
                "[Wallet] Skipping auto-connect due to manual disconnect",
            );
            return false;
        }

        try {
            console.log("Checking existing wallet connection...");
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if (accounts.length > 0) {
                const newProvider = new ethers.BrowserProvider(window.ethereum);
                const newSigner = await newProvider.getSigner();
                const address = await newSigner.getAddress();

                console.log("Found existing connection:", address);
                connectedAccount.value = address;
                provider.value = newProvider;
                signer.value = newSigner;

                listenForAccountChange();

                return true;
            }
            console.log("No existing connection found");
            return false;
        } catch (error) {
            console.error("Error checking connection:", error);
            return false;
        }
    };

    onMounted(() => {
        checkConnection();
    });

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

// TODO: Refactor disconnecting flow
