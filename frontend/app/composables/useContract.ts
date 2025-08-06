import { ref } from "vue";
import { ethers } from "ethers";
import { getContract } from "~/utils/contract";
import type { Memo } from "~/types/contract";

export function useContract() {
    const memos = ref<Memo[]>([]);
    const isOwner = ref(false);
    const isLoading = ref(false);

    const getMemos = async () => {
        try {
            console.log("Fetching memos...");

            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = getContract(provider);

            const count = await contract.getMemosCount();
            console.log("Memos count from contract:", count.toString());

            const fetchedMemos = await contract.getMemos();
            console.log("Raw memos data:", fetchedMemos);

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
                console.log("Processed memos:", memos.value);
            } else {
                console.log("No memos found in contract");
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
            console.log("Checking if current user is owner...");

            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = getContract(provider);

            const ownerAddress = await contract.getOwner();
            console.log("Owner address from contract:", ownerAddress);

            const signer = await provider.getSigner();
            const currentAddress = await signer.getAddress();
            console.log("Current user address:", currentAddress);

            isOwner.value =
                ownerAddress.toLowerCase() === currentAddress.toLowerCase();
            console.log("Is owner:", isOwner.value);
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

            console.log("Sending transaction to buy coffee...");
            const tx = await contract.buyCoffee(name, message, {
                value: ethers.parseEther(amount),
            });

            console.log("Transaction sent:", tx.hash);
            await tx.wait();
            console.log("Transaction confirmed!");

            await getMemos();
        } catch (error: any) {
            console.error("Error buying coffee:", error);
            throw new Error("Transaction failed: " + error.message);
        } finally {
            isLoading.value = false;
        }
    };

    const withdrawTips = async () => {
        if (!isOwner.value) {
            throw new Error("Only the owner can withdraw tips");
        }

        try {
            console.log("Withdrawing tips...");

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = getContract(signer);

            console.log("Calling withdrawTips...");
            const tx = await contract.withdrawTips();
            console.log("Transaction sent:", tx.hash);

            await tx.wait();
            console.log("Tips withdrawn successfully!");
        } catch (error: any) {
            console.error("Error withdrawing tips:", error);
            throw new Error("Error withdrawing tips: " + error.message);
        }
    };

    const debugContract = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = getContract(provider);

            console.log("Contract address:", await contract.getAddress());

            const ownerAddress = await contract.getOwner();
            console.log("Owner address:", ownerAddress);

            const accounts = await provider.listAccounts();
            console.log(
                "Current user:",
                accounts[0] ? accounts[0].address : "Not connected",
            );

            const memosCount = await contract.getMemosCount();
            console.log("Memos count:", memosCount.toString());

            const balance = await provider.getBalance(
                await contract.getAddress(),
            );
            console.log(
                "Contract balance:",
                ethers.formatEther(balance),
                "KAIA",
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
