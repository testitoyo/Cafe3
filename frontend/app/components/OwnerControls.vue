<template>
    <div
        v-if="isOwner"
        class="bg-[#F8F5F2] rounded-2xl p-6 border-l-4 border-[#A67C52] shadow relative mx-2"
    >
        <div class="flex items-center mb-4">
            <div
                class="w-12 h-12 bg-[#A67C52] rounded-full flex items-center justify-center mr-4 shadow"
            >
                <span class="text-white text-xl">👨‍🍳</span>
            </div>
            <div>
                <h3 class="text-xl font-bold text-[#5C4033]">
                    Barista Controls
                </h3>
                <p class="text-[#8B7E74]">Café owner dashboard</p>
            </div>
        </div>
        <p class="text-[#8B7E74] mb-4 leading-relaxed">
            As the café owner, you can collect all tips that have been sent to
            this café. Your supporters appreciate your work!
        </p>
        <div class="flex items-center justify-between">
            <div class="text-xl font-bold text-[#5C4033] flex items-center">
                <span class="text-2xl">💰</span>
                <span class="ml-2">{{ contractBalance }} KAIA</span>
            </div>
            <button
                @click="handleWithdrawTips"
                :disabled="isLoading || parseFloat(contractBalance) === 0"
                class="bg-[#A67C52] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#5C4033] transition shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span v-if="isLoading" class="flex items-center">
                    <span class="animate-spin mr-2">⏳</span>
                    Withdrawing...
                </span>
                <span v-else>Collect Tips</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ethers } from "ethers";

const { isOwner, withdrawTips, isLoading, checkOwner } = useContract();
const { connectedAccount } = useWallet();

const contractBalance = ref("0.0");

const getContractBalance = async () => {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = getContract(provider);
        const balance = await provider.getBalance(await contract.getAddress());
        contractBalance.value = ethers.formatEther(balance);
    } catch (error) {
        console.error("Error getting contract balance:", error);
        contractBalance.value = "0.0";
    }
};

const handleWithdrawTips = async () => {
    try {
        await withdrawTips();

        await getContractBalance(); // Refresh balance
    } catch (error: any) {
        console.error("Failed to withdraw tips:", error);
    }
};

onMounted(async () => {
    if (connectedAccount.value) {
        await checkOwner();
        await getContractBalance();
    }
});

// update owner status while account changes
watch(connectedAccount, async (newAccount) => {
    if (newAccount) {
        await checkOwner();
        await getContractBalance();
    }
});
</script>
