import { ethers, network, run } from "hardhat";

async function main() {
  

  // if(network.name !== `optimism`) {                  //optimism
  //   console.error(`❌ Sender must be deployed to optmism goerli`);
  //   return 1;
  // }



  if(network.name !== `polygon_mumbai`) {               //polygon_mumbai
    console.error(`❌ Must be called from Avalanche Fuji`);
    return 1;
  }

  const MumbaiLinkAddress = `0x326C977E6efc84E512bB9C30f76E30c160eD06FB`;
  const MumbaiRouterAddress = `0x70499c328e1E2a3c41108bd3730F6670a44595D1`;

  // const OptmismGoerliLinkAddress = `0xdc2CC710e42857672E7907CF474a69B63B93089f`;
  // const OptmismGoerRouterAddress = `0xEB52E9Ae4A9Fb37172978642d4C141ef53876f26`;
    
  await run("compile");

  const ccipTokenSenderFactory = await ethers.getContractFactory("CCIPTokenSender");
  const ccipTokenSender = await ccipTokenSenderFactory.deploy(MumbaiLinkAddress, MumbaiRouterAddress);

  await ccipTokenSender.waitForDeployment();

  console.log(`CCIPTokenSender deployed to ${ccipTokenSender.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});