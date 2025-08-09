// Shared singleton state
const selectedAmount = ref("0.5");
const coffeeQuantities = ref({
    "0.5": 1,
    "1.5": 1,
    "2.5": 1,
    "3.5": 1,
});

const coffeeItems: CoffeeItem[] = [
    {
        id: "0.5",
        name: "Espresso",
        description: "A quick shot of energy",
        price: "0.5",
        icon: "☕",
    },
    {
        id: "1.5",
        name: "Americano",
        description: "Classic and refreshing",
        price: "1.5",
        icon: "🥤",
    },
    {
        id: "2.5",
        name: "Latte",
        description: "Creamy and smooth",
        price: "2.5",
        icon: "🥛",
    },
    {
        id: "3.5",
        name: "Specialty",
        description: "Chef's choice, premium blend",
        price: "3.5",
        icon: "🍵",
    },
];

const selectedCoffee = computed(() => {
    return coffeeItems.find((item) => item.id === selectedAmount.value);
});

const totalPrice = computed(() => {
    const selectedCoffee = coffeeItems.find(
        (item) => item.id === selectedAmount.value,
    );
    if (!selectedCoffee) return "0.0";

    const price = parseFloat(selectedCoffee.price);
    const quantity = coffeeQuantities.value[selectedAmount.value];
    const total = price * quantity;
    return total.toFixed(1);
});

export function useCoffeeMenu() {
    const selectCoffee = (price: string) => {
        selectedAmount.value = price;
    };

    const incrementQuantity = (price: string) => {
        coffeeQuantities.value[price]++;
    };

    const decrementQuantity = (price: string) => {
        if (coffeeQuantities.value[price] > 1) {
            coffeeQuantities.value[price]--;
        }
    };

    const resetQuantities = () => {
        coffeeQuantities.value = {
            "0.5": 1,
            "1.5": 1,
            "2.5": 1,
            "3.5": 1,
        };
    };

    const getCoffeeName = (price: string) => {
        const item = coffeeItems.find((item) => item.id === price);
        return item?.name || "Coffee";
    };

    return {
        selectedAmount,
        coffeeQuantities,
        coffeeItems,
        selectedCoffee,
        totalPrice,
        selectCoffee,
        incrementQuantity,
        decrementQuantity,
        resetQuantities,
        getCoffeeName,
    };
}
