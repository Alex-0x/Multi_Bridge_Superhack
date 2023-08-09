import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';

dotenv.config();

require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
networks: {
     polygon_mumbai: {
     url: process.env.URL_ALCHEMY_MUMBAI ?? "",
     accounts: [process.env.PRIVATE_KEY ?? ""]
   },
   sepolia: {
     url: process.env.URL_ALCHEMY_SEPOLIA,
     accounts: [process.env.PRIVATE_KEY ?? ""],
     chainId: 11155111,
   },
    optimism: {
      url: process.env.URL_ALCHEMY_OPTIMISM ?? "",
      accounts: [process.env.PRIVATE_KEY ?? ""],
      gasPrice: 35000000000,
    },
    arbitrum: {
      url: process.env.URL_ALCHEMY_ARBITRUM ?? "",
      accounts: [process.env.PRIVATE_KEY ?? ""],
      gasPrice: 35000000000,
    }
},
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },

 paths: {
  sources: "./contracts",
  tests: "./test",
  cache: "./cache",
  artifacts: "./artifacts"
  }

}

export default config;
