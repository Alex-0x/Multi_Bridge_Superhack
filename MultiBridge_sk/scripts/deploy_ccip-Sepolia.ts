import { ethers, network, run } from "hardhat";

async function main() {
  

  if(network.name !== `sepolia`) {              
    console.error(`❌ Must be called from Avalanche Fuji`);
    return 1;
  }
  const SepoliaRouterAddress = `0xD0daae2231E9CB96b94C8512223533293C3693Bf`;
  const SepoliaLinkAddress = `0x779877A7B0D9E8603169DdbD7836e478b4624789`;
//   const WEth => "0x097D90c9d3E0B50Ca60e1ae45F6A81010f9FB534";
 

    
  await run("compile");

  const ccipTokenSenderFactory = await ethers.getContractFactory("CCIPTokenSender");
  const ccipTokenSender = await ccipTokenSenderFactory.deploy(SepoliaRouterAddress, SepoliaLinkAddress);

  await ccipTokenSender.waitForDeployment();

  console.log(`CCIPTokenSender deployed to ${ccipTokenSender.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});