<template>
    <div class="bg-white rounded-2xl shadow-lg border border-[#E0C9A6] mx-2">
        <div class="bg-[#A67C52] text-white p-6 rounded-t-2xl">
            <h2 class="text-2xl font-bold tracking-wide m-0">Guest Book</h2>
            <p class="text-[#F8F5F2] mt-1">Messages from coffee lovers</p>
        </div>
        <div class="p-6">
            <div class="text-center py-10 text-[#8B7E74] italic text-lg">
                <div class="text-5xl mb-2">📝</div>
                <p>No messages yet. Be the first to leave a note!</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                    class="bg-[#F8F5F2] rounded-xl p-6 shadow border border-[#A67C52] hover:shadow-lg transition"
                >
                    <div class="flex justify-between items-center mb-2">
                        <span class="font-bold text-[#5C4033] text-lg"
                            >Alice</span
                        >
                        <span
                            class="text-xs text-[#A67C52] bg-white px-2 py-1 rounded-full shadow-sm"
                            >0x123...abcd</span
                        >
                    </div>
                    <p
                        class="text-base mb-2 text-[#5C4033] italic leading-relaxed"
                    >
                        "Wonderful atmosphere and delicious coffee! The vibes
                        here are absolutely perfect."
                    </p>
                    <div class="flex items-center justify-between">
                        <p class="text-xs text-[#8B7E74]">July 30, 2025</p>
                        <span class="text-2xl">☕</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
