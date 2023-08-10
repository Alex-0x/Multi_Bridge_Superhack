import { ethers, network, run } from "hardhat";

async function main() {
  
  if(network.name !== `sepolia`) {              
    console.error(`❌ Must be called from Sepolia`);
    return 1;
  }
  const addressCcipSepolia = `0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05`;
    
  await run("compile");

  const depositContractFactory = await ethers.getContractFactory("DepositContract");
  const depositContract = await depositContractFactory.deploy(addressCcipSepolia);

  await depositContract.waitForDeployment();

  console.log(`DepositContract deployed to ${depositContract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});