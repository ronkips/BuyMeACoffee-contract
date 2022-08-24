//scripts/deploy

const { ethers } = require('hardhat')
const hre = require('hardhat')

async function main() {
  //We get the contract to deploy
  const BuyMeACoffee = await hre.ethers.getContractFactory('BuyMeACoffee')
  const buyMeACoffee = await BuyMeACoffee.deploy()

  //deploy the project
  await buyMeACoffee.deployed()

  console.log('BuyMeACoffee deployed to:', buyMeACoffee.address)
}

//handle te errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
