import { ethers, network, run } from "hardhat";

async function main() {
  

  if(network.name !== `polygon_mumbai`) {              
    console.error(`❌ Must be called from Avalanche Fuji`);
    return 1;
  }

  const MumbaiRouterAddress = `0x70499c328e1E2a3c41108bd3730F6670a44595D1`;
  const MumbaiLinkAddress = `0x326C977E6efc84E512bB9C30f76E30c160eD06FB`;
  // const WMatic = "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889";
  

    
  await run("compile");

  const ccipTokenSenderFactory = await ethers.getContractFactory("CCIPTokenSender");
  const ccipTokenSender = await ccipTokenSenderFactory.deploy(MumbaiRouterAddress, MumbaiLinkAddress)

  await ccipTokenSender.waitForDeployment();

  console.log(`CCIPTokenSender deployed to ${ccipTokenSender.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});