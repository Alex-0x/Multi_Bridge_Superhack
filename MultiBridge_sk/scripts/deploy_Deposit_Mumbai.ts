import { ethers, network, run } from "hardhat";

async function main() {
  
  if(network.name !== `polygon_mumbai`) {              
    console.error(`❌ Must be called from Mumbai`);
    return 1;
  }
  const addressCcipMumbai = `0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40`;
    
  await run("compile");

  const depositContractFactory = await ethers.getContractFactory("DepositContract");
  const depositContract = await depositContractFactory.deploy(addressCcipMumbai);

  await depositContract.waitForDeployment();

  console.log(`DepositContract deployed to ${depositContract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});