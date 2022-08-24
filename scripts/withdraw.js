//scripts/withdraw.js
const { ethers } = require('hardhat')
const hre = require('hardhat')
const abi = require('../artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json')

async function getBalance(provider, address) {
  const balanceBigInt = await provider.getBalance(address)
  return hre.ethers.utils.formatEther(balanceBigInt)
}

async function main() {
  //get the contract that has been deployed to Goerli
  const contractAddress = '0x5F9f045824f32A54b576d477Da4A87e4ce1c1abE'
  const contractABI = abi.abi

  // Get the node connection and wallet connection
  const provider = new hre.ethers.providers.AlchemyProvider(
    'goerli',
    process.env.GOERLI_API_KEY,
  )

  const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider)

  //Instatntiate connected contract
  const buyMeACoffee = new hre.ethers.Contract(
    contractAddress,
    contractABI,
    signer,
  )

  //check starting balance
  console.log(
    'Current balance of owner is:',
    await getBalance(provider, signer.address),
    'ETH',
  )
  const contractBalance = await getBalance(provider, buyMeACoffee.address)
  console.log(
    'Current balance of contract: ',
    await getBalance(provider, buyMeACoffee.address),
    'ETH',
  )

  //Withdraw funds if there are funds to withdraw
  //we use if..else statement
  if (contractBalance !== '0.0') {
    console.log('withdraw funds..')
    const withdrawTxn = await buyMeACoffee.withdrawTips() // Pulling money out from  our contract balance and send it over to the owner's wallet
    await withdrawTxn.await()
  } else {
    console.log('Yooh , No funds to withdraw!')
  }

  //Check ending balance
  console.log(
    'Current balance of the owner is:',
    await getBalance(provider, signer.address),
    'ETH',
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
