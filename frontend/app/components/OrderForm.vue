<template>
    <div class="p-6 bg-[#F8F5F2] border-t border-[#A67C52]">
        <div class="max-w-2xl mx-auto space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Name Field -->
                <div>
                    <label
                        class="block text-sm font-semibold text-[#5C4033] mb-2"
                    >
                        Your Name
                    </label>
                    <input
                        v-model.trim="orderForm.name"
                        placeholder="Enter your name"
                        class="w-full p-4 border-2 border-[#A67C52] rounded-xl text-base focus:border-[#5C4033] focus:outline-none bg-white shadow-sm"
                    />
                </div>

                <!-- Total -->
                <div>
                    <label
                        class="block text-sm font-semibold text-[#5C4033] mb-2"
                    >
                        Total
                    </label>
                    <div
                        class="w-full p-4 bg-[#F8F5F2] border-2 border-[#A67C52] rounded-xl text-base font-bold text-[#5C4033] shadow-sm transition-all duration-300"
                        :class="{
                            'border-[#5C4033] bg-[#F0E6D9]':
                                parseFloat(totalPrice) > 0,
                        }"
                    >
                        {{ totalPrice }} KAIA
                    </div>
                </div>
            </div>

            <!-- Message Field -->
            <div>
                <label class="block text-sm font-semibold text-[#5C4033] mb-2">
                    Leave a note
                </label>
                <textarea
                    v-model.trim="orderForm.message"
                    rows="3"
                    placeholder="Share your thoughts with your coffee..."
                    class="w-full p-4 border-2 border-[#A67C52] rounded-xl text-base resize-none focus:border-[#5C4033] focus:outline-none bg-white shadow-sm"
                ></textarea>
            </div>

            <!-- Submit Button -->
            <button
                @click="handleOrder"
                :disabled="isLoading || !canOrder"
                class="w-full bg-[#A67C52] text-white p-5 text-lg font-bold rounded-xl hover:bg-[#5C4033] transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span class="flex items-center justify-center">
                    <span v-if="isLoading" class="mr-3 animate-spin">⏳</span>
                    <span v-else class="mr-3">☕</span>
                    {{ orderButtonText }}
                    <span v-if="!isLoading" class="ml-3">→</span>
                </span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
interface OrderForm {
    name: string;
    message: string;
}

const { selectedAmount, totalPrice, coffeeQuantities } = useCoffeeMenu();
const { buyCoffee, isLoading } = useContract();
const { connectedAccount } = useWallet();

const orderForm = ref<OrderForm>({
    name: "",
    message: "",
});

const canOrder = computed(() =>
    Boolean(
        connectedAccount.value &&
            orderForm.value.name &&
            orderForm.value.message &&
            parseFloat(totalPrice.value) > 0,
    ),
);

const orderButtonText = computed(() => {
    if (isLoading.value) return "Processing...";
    if (!connectedAccount.value) return "Connect Wallet First";
    if (!orderForm.value.name) return "Enter Your Name";
    if (!orderForm.value.message) return "Leave a Message";
    if (parseFloat(totalPrice.value) === 0) return "Select Coffee Items";

    const quantity = coffeeQuantities.value[selectedAmount.value] || 1;
    return `Order ${quantity} Coffee${quantity > 1 ? "s" : ""} for ${totalPrice.value} KAIA`;
});

const handleOrder = async () => {
    try {
        await buyCoffee(
            orderForm.value.name,
            orderForm.value.message,
            totalPrice.value,
        );
        orderForm.value = { name: "", message: "" };
        console.log("Coffee ordered successfully! ☕");
    } catch (err: any) {
        console.error(
            `Failed to order coffee: ${err.message || "Transaction failed"}`,
        );
    }
};

// TODO: Notifications
</script>
