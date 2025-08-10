# Buy Me a Coffee – Single-User Web3-Based Version
A beautiful modern Web3 app built with Nuxt, Vue 3 and Solidity. It uses Foundry for smart contract development and lets users buy me a coffee and leave blockchain-backed messages.

<img width="2530" height="1376" alt="Cafe3" src="https://github.com/user-attachments/assets/5403bec0-b76f-48e8-9395-d1f50ddf47fa" />

## Getting Started

1. **Install Dependencies**

   ```bash
   pnpm install
   ```

2. **Start Development Server**

   ```bash
   pnpm dev
   ```

3. **Connect Wallet**

   - Install MetaMask browser extension
   - Connect your wallet to the application
   - Switch to Kaia Kairos Testnet (automatically handled)

4. **Buy Coffee**
   - Select coffee items and quantities
   - Enter your name and message
   - Confirm the transaction
   - View your message in the guest book

## Technical Stack
 TODO

## Project Structure

  TODO 

## Smart Contract Integration

The frontend integrates with a deployed BuyMeACoffee smart contract that supports:

- `buyCoffee(name, message)` - Send coffee with a message
- `getMemos()` - Retrieve all coffee orders
- `withdrawTips()` - Owner can withdraw accumulated tips
- `getOwner()` - Get the contract owner address


## TODOs
- [ ] Watch for wallet change
- [ ] Deploy the smart contract to mainnet
- [ ] Deploy frontend to gh pages
