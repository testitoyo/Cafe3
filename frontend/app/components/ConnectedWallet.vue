<template>
    <div class="flex justify-end">
        <div
            class="flex items-center bg-white px-5 py-2 rounded-full text-sm shadow border border-[#E0C9A6]"
        >
            <div
                class="w-3 h-3 bg-emerald-500 rounded-full mr-2 animate-pulse"
            ></div>
            <span class="font-medium text-[#5C4033]">
                {{ getShortAddress(connectedAccount || "") }}
            </span>
            <button
                @click="disconnectWallet"
                class="ml-4 text-[#A67C52] hover:text-[#5C4033] transition"
            >
                <span class="text-lg">×</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const { connectedAccount, disconnectWallet, getShortAddress } = useWallet();
</script>
