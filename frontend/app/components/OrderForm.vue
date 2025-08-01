<template>
    <div class="p-6 bg-[#F8F5F2] border-t border-[#A67C52]">
        <div class="max-w-2xl mx-auto space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label
                        class="block text-sm font-semibold text-[#5C4033] mb-2"
                        >Your Name</label
                    >
                    <input
                        placeholder="Enter your name"
                        value="Sample Name"
                        class="w-full p-4 border-2 border-[#A67C52] rounded-xl text-base focus:border-[#5C4033] focus:outline-none bg-white shadow-sm"
                    />
                </div>
                <div>
                    <label
                        class="block text-sm font-semibold text-[#5C4033] mb-2"
                        >Total</label
                    >
                    <div
                        class="w-full p-4 bg-[#F8F5F2] border-2 border-[#A67C52] rounded-xl text-base font-bold text-[#5C4033] shadow-sm"
                    >
                        0.5 KAIA
                    </div>
                </div>
            </div>
            <div>
                <label class="block text-sm font-semibold text-[#5C4033] mb-2"
                    >Leave a note</label
                >
                <textarea
                    rows="3"
                    placeholder="Share your thoughts with your coffee..."
                    class="w-full p-4 border-2 border-[#A67C52] rounded-xl text-base resize-none focus:border-[#5C4033] focus:outline-none bg-white shadow-sm"
                >
Enjoying the vibes!</textarea
                >
            </div>
            <button
                class="w-full bg-[#A67C52] text-white p-5 text-lg font-bold rounded-xl hover:bg-[#5C4033] transition shadow-md"
            >
                <span class="flex items-center justify-center">
                    <span class="mr-3">☕</span>
                    Order 1 × Espresso for 0.5 KAIA
                    <span class="ml-3">→</span>
                </span>
            </button>
        </div>
    </div>
</template>
