import { ethers, network, run } from "hardhat";

async function main() {
  
  if(network.name !== `arbitrum`) {              
    console.error(`❌ Must be called from Arbitrum`);
    return 1;
  }
  const addressCcipArbitrum = `0x0579b4c1C8AcbfF13c6253f1B10d66896Bf399Ef`;
    
  await run("compile");

  const depositContractFactory = await ethers.getContractFactory("TokenSwapContract");
  const depositContract = await depositContractFactory.deploy(addressCcipArbitrum);

  await depositContract.waitForDeployment();

  console.log(`DepositContract deployed to ${depositContract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});