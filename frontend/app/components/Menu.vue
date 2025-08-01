<template>
    <div class="bg-white rounded-2xl shadow-lg border border-[#E0C9A6]">
        <div class="bg-[#A67C52] text-white p-6 rounded-t-2xl">
            <h2 class="text-2xl font-bold tracking-wide m-0">Today's Menu</h2>
            <p class="text-[#F8F5F2] mt-1">Fresh brews, fresh vibes</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <!-- Espresso -->
            <div
                class="bg-[#F8F5F2] border border-[#A67C52] shadow rounded-xl p-6 flex flex-col min-h-[220px]"
            >
                <div class="text-5xl mb-4 text-center">☕</div>
                <h3 class="text-xl font-bold mb-2 text-[#5C4033]">Espresso</h3>
                <p class="text-[#8B7E74] mb-4">
                    A quick shot of pure energy to power your day
                </p>
                <div class="flex items-center justify-between mt-auto">
                    <span class="text-lg font-bold text-[#A67C52]"
                        >0.5 KAIA</span
                    >
                    <div
                        class="flex items-center bg-white rounded-full p-1 border border-[#A67C52]"
                    >
                        <button
                            class="w-8 h-8 bg-[#A67C52] text-white rounded-full text-lg font-bold hover:bg-[#5C4033] transition"
                        >
                            −
                        </button>
                        <span
                            class="w-10 text-center font-bold text-lg text-[#5C4033]"
                            >1</span
                        >
                        <button
                            class="w-8 h-8 bg-[#A67C52] text-white rounded-full text-lg font-bold hover:bg-[#5C4033] transition"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            <!-- Americano -->
            <div
                class="bg-[#F8F5F2] border border-[#A67C52] shadow rounded-xl p-6 flex flex-col min-h-[220px]"
            >
                <div class="text-5xl mb-4 text-center">🥤</div>
                <h3 class="text-xl font-bold mb-2 text-[#5C4033]">Americano</h3>
                <p class="text-[#8B7E74] mb-4">
                    Classic and refreshing, perfect for any time
                </p>
                <div class="flex items-center justify-between mt-auto">
                    <span class="text-lg font-bold text-[#A67C52]"
                        >1.5 KAIA</span
                    >
                    <div
                        class="flex items-center bg-white rounded-full p-1 border border-[#A67C52]"
                    >
                        <button
                            class="w-8 h-8 bg-[#A67C52] text-white rounded-full text-lg font-bold hover:bg-[#5C4033] transition"
                        >
                            −
                        </button>
                        <span
                            class="w-10 text-center font-bold text-lg text-[#5C4033]"
                            >1</span
                        >
                        <button
                            class="w-8 h-8 bg-[#A67C52] text-white rounded-full text-lg font-bold hover:bg-[#5C4033] transition"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            <!-- Latte -->
            <div
                class="bg-[#F8F5F2] border border-[#A67C52] shadow rounded-xl p-6 flex flex-col min-h-[220px]"
            >
                <div class="text-5xl mb-4 text-center">🥛</div>
                <h3 class="text-xl font-bold mb-2 text-[#5C4033]">Latte</h3>
                <p class="text-[#8B7E74] mb-4">
                    Creamy and smooth, a luxurious treat
                </p>
                <div class="flex items-center justify-between mt-auto">
                    <span class="text-lg font-bold text-[#A67C52]"
                        >2.5 KAIA</span
                    >
                    <div
                        class="flex items-center bg-white rounded-full p-1 border border-[#A67C52]"
                    >
                        <button
                            class="w-8 h-8 bg-[#A67C52] text-white rounded-full text-lg font-bold hover:bg-[#5C4033] transition"
                        >
                            −
                        </button>
                        <span
                            class="w-10 text-center font-bold text-lg text-[#5C4033]"
                            >1</span
                        >
                        <button
                            class="w-8 h-8 bg-[#A67C52] text-white rounded-full text-lg font-bold hover:bg-[#5C4033] transition"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            <!-- Specialty -->
            <div
                class="bg-[#F8F5F2] border border-[#A67C52] shadow rounded-xl p-6 flex flex-col min-h-[220px]"
            >
                <div class="text-5xl mb-4 text-center">🍵</div>
                <h3 class="text-xl font-bold mb-2 text-[#5C4033]">Specialty</h3>
                <p class="text-[#8B7E74] mb-4">
                    Chef's choice, premium blend experience
                </p>
                <div class="flex items-center justify-between mt-auto">
                    <span class="text-lg font-bold text-[#A67C52]"
                        >3.5 KAIA</span
                    >
                    <div
                        class="flex items-center bg-white rounded-full p-1 border border-[#A67C52]"
                    >
                        <button
                            class="w-8 h-8 bg-[#A67C52] text-white rounded-full text-lg font-bold hover:bg-[#5C4033] transition"
                        >
                            −
                        </button>
                        <span
                            class="w-10 text-center font-bold text-lg text-[#5C4033]"
                            >1</span
                        >
                        <button
                            class="w-8 h-8 bg-[#A67C52] text-white rounded-full text-lg font-bold hover:bg-[#5C4033] transition"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// TODO: Split menu items
</script>
