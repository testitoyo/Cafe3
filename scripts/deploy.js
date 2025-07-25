const hre = require("hardhat");

async function main() {
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();
  await buyMeACoffee.waitForDeployment();

  console.log(`BuyMeACoffee Contract Address`, buyMeACoffee.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//BuyMeACoffee Contract Address X
