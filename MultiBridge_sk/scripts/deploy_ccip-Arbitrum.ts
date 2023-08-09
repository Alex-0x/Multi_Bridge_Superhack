import { ethers, network, run } from "hardhat";

async function main() {
  

   if(network.name !== `arbitrum`) {                  
     console.error(`❌ Sender must be deployed to arbitrum goerli`);
     return 1;
   }

   const ArbitrumGoerRouterAddress = `0x88E492127709447A5ABEFdaB8788a15B4567589E`;
   const ArbitrumGoerliLinkAddress = `0xd14838A68E8AFBAdE5efb411d5871ea0011AFd28`;
//    const WEth => "0x4200000000000000000000000000000000000006";
   
    
  await run("compile");

  const ccipTokenSenderFactory = await ethers.getContractFactory("CCIPTokenSender");
  const ccipTokenSender = await ccipTokenSenderFactory.deploy(ArbitrumGoerRouterAddress, ArbitrumGoerliLinkAddress);

  await ccipTokenSender.waitForDeployment();

  console.log(`CCIPTokenSender deployed to ${ccipTokenSender.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});