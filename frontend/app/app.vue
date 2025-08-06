<template>
    <div class="min-h-screen bg-[#F8F5F2] font-sans text-[#5C4033]">
        <div class="max-w-4xl mx-auto p-4 sm:p-8 lg:p-12">
            <Header />
            <ConnectWallet />
            <div class="space-y-10">
                <ConnectedWallet />
                <Menu />
                <OrderForm />
                <OwnerControls />
                <GuestBook />
            </div>
        </div>
    </div>
</template>
