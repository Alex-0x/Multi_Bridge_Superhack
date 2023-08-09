import { ethers, network, run } from "hardhat";

async function main() {
  

   if(network.name !== `optimism`) {                  
     console.error(`❌ Sender must be deployed to optmism goerli`);
     return 1;
   }

   const OptmismGoerRouterAddress = `0xEB52E9Ae4A9Fb37172978642d4C141ef53876f26`;
   const OptmismGoerliLinkAddress = `0xdc2CC710e42857672E7907CF474a69B63B93089f`;
//    const WEth => "0x4200000000000000000000000000000000000006";
   
    
  await run("compile");

  const ccipTokenSenderFactory = await ethers.getContractFactory("CCIPTokenSender");
  const ccipTokenSender = await ccipTokenSenderFactory.deploy(OptmismGoerRouterAddress, OptmismGoerliLinkAddress);

  await ccipTokenSender.waitForDeployment();

  console.log(`CCIPTokenSender deployed to ${ccipTokenSender.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});