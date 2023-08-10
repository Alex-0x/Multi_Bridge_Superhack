import { ethers, network, run } from "hardhat";

async function main() {
  
  if(network.name !== `optimism`) {              
    console.error(`❌ Must be called from Optimism`);
    return 1;
  }
  const addressCcipOptimism = `0xaBfE9D11A2f1D61990D1d253EC98B5Da00304F16`;
    
  await run("compile");

  const depositContractFactory = await ethers.getContractFactory("TokenSwapContract");
  const depositContract = await depositContractFactory.deploy(addressCcipOptimism);

  await depositContract.waitForDeployment();

  console.log(`DepositContract deployed to ${depositContract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});