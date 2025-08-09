<template>
    <div class="bg-white rounded-2xl shadow-lg border border-[#E0C9A6]">
        <div class="bg-[#A67C52] text-white p-6 rounded-t-2xl">
            <h2 class="text-2xl font-bold tracking-wide m-0">Today's Menu</h2>
            <p class="text-[#F8F5F2] mt-1">Fresh brews, fresh vibes</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div
                v-for="item in coffeeItems"
                :key="item.id"
                @click="selectCoffee(item.id)"
                class="bg-[#F8F5F2] border border-[#A67C52] shadow rounded-xl p-6 flex flex-col min-h-[220px] cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                :class="{
                    'ring-2 ring-[#5C4033] ring-offset-2 bg-[#F0E6D9]':
                        selectedAmount === item.id,
                    'hover:border-[#5C4033]': selectedAmount !== item.id,
                }"
            >
                <div
                    class="text-5xl mb-4 text-center transition-transform duration-300 hover:scale-110"
                >
                    {{ item.icon }}
                </div>
                <h3 class="text-xl font-bold mb-2 text-[#5C4033]">
                    {{ item.name }}
                </h3>
                <p class="text-[#8B7E74] mb-4">
                    {{ item.description }}
                </p>
                <div class="flex items-center justify-between mt-auto">
                    <span class="text-lg font-bold text-[#A67C52]"
                        >{{ item.price }} KAIA</span
                    >
                    <div
                        class="flex items-center bg-white rounded-full p-1 border border-[#A67C52]"
                        @click.stop
                    >
                        <button
                            @click.stop="decrementQuantity(item.id)"
                            class="w-8 h-8 bg-[#A67C52] text-white rounded-full text-lg font-bold hover:bg-[#5C4033] transition-all duration-200 active:scale-90 hover:scale-105"
                        >
                            −
                        </button>
                        <span
                            class="w-10 text-center font-bold text-lg text-[#5C4033] transition-all duration-200"
                            >{{ coffeeQuantities[item.id] }}</span
                        >
                        <button
                            @click.stop="incrementQuantity(item.id)"
                            class="w-8 h-8 bg-[#A67C52] text-white rounded-full text-lg font-bold hover:bg-[#5C4033] transition-all duration-200 active:scale-90 hover:scale-105"
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
const {
    selectedAmount,
    coffeeQuantities,
    coffeeItems,
    selectCoffee,
    incrementQuantity,
    decrementQuantity,
} = useCoffeeMenu();
</script>
