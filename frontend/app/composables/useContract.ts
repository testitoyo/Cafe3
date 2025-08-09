import { ethers } from "ethers";
import type { Memo } from "~/types/contract";

export function useContract() {
    const memos = ref<Memo[]>([]);
    const isOwner = ref(false);
    const isLoading = ref(false);

    const getMemos = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = getContract(provider);

            const count = await contract.getMemosCount();
            const fetchedMemos = await contract.getMemos();

            if (fetchedMemos && fetchedMemos.length > 0) {
                const processedMemos = [];

                for (let i = 0; i < fetchedMemos.length; i++) {
                    const memo = fetchedMemos[i];
                    processedMemos.push({
                        from: memo[0],
                        timestamp: Number(memo[1]),
                        name: memo[2],
                        message: memo[3],
                    });
                }

                memos.value = processedMemos.reverse();
            } else {
                memos.value = [];
            }
        } catch (error: any) {
            console.error("Error fetching memos:", error);
            console.error(error.message);
            memos.value = [];
        }
    };

    const checkOwner = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = getContract(provider);

            const ownerAddress = await contract.getOwner();
            const signer = await provider.getSigner();
            const currentAddress = await signer.getAddress();

            isOwner.value =
                ownerAddress.toLowerCase() === currentAddress.toLowerCase();
        } catch (error: any) {
            console.error("Error checking owner:", error);
            console.error(error.message);
            isOwner.value = false;
        }
    };

    const buyCoffee = async (name: string, message: string, amount: string) => {
        if (!name || !message) {
            throw new Error("Please provide your name and a message");
        }

        try {
            isLoading.value = true;

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = getContract(signer);

            const tx = await contract.buyCoffee(name, message, {
                value: ethers.parseEther(amount),
            });

            // timeout for transaction confirmation
            const confirmation = await Promise.race([
                tx.wait(),
                new Promise((_, reject) =>
                    setTimeout(
                        () =>
                            reject(
                                new Error(
                                    "Transaction timeout after 60 seconds",
                                ),
                            ),
                        60000,
                    ),
                ),
            ]);

            await getMemos();
        } catch (error: any) {
            console.error("Error buying coffee:", error);

            let errorMessage = "Transaction failed";

            if (error.code === 4001) {
                errorMessage = "Transaction was rejected by user";
            } else if (error.code === -32603) {
                errorMessage = "Network error. Please try again";
            } else if (error.message?.includes("insufficient funds")) {
                errorMessage = "Insufficient funds in wallet";
            } else if (error.message?.includes("timeout")) {
                errorMessage = "Transaction timed out. Please try again";
            } else if (error.message?.includes("execution reverted")) {
                errorMessage = "Transaction reverted. Check contract state";
            } else if (error.message) {
                errorMessage = error.message;
            }

            throw new Error(errorMessage);
        } finally {
            isLoading.value = false;
        }
    };

    const withdrawTips = async () => {
        if (!isOwner.value) {
            throw new Error("Only the owner can withdraw tips");
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = getContract(signer);

            const tx = await contract.withdrawTips();

            await tx.wait();
        } catch (error: any) {
            throw new Error("Error withdrawing tips: " + error.message);
        }
    };

    const debugContract = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = getContract(provider);

            const ownerAddress = await contract.getOwner();
            console.log("Owner address:", ownerAddress);

            const accounts = await provider.listAccounts();

            const memosCount = await contract.getMemosCount();

            const balance = await provider.getBalance(
                await contract.getAddress(),
            );
        } catch (error) {
            console.error("Debug error:", error);
        }
    };

    return {
        memos,
        isOwner,
        isLoading,
        getMemos,
        checkOwner,
        buyCoffee,
        withdrawTips,
        debugContract,
    };
}
