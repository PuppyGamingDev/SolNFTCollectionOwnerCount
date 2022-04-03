const solanaWeb3 = require('@solana/web3.js');
const fs = require('fs');
const { PublicKey } = require('@solana/web3.js');
const url = solanaWeb3.clusterApiUrl('mainnet-beta');
const solanaConnection = new solanaWeb3.Connection(url, 'confirmed');
const delay = ms => new Promise(res => setTimeout(res, ms));
var owners = [];

// Start the script by loading the hashlist for the collection
LoadHashList();

// This function loads and hashlist.txt and sends the content to the StartFetch function
function LoadHashList() {
  fs.readFile("hashlist.txt", { encoding: "utf8" }, (err, data) => {
  StartFetch(data);
  });
}


// This function sets the delat between each hash's search
async function StartFetch(data) {
  const myTokens = JSON.parse(data);
  for (var i = 0; i < myTokens.length; i++) { 
    FetchOwners(myTokens[i])
    await delay(1000);
  }
  CountOwners(owners);
}


// This function takes a hash from StartFetch function and gets the owner of that NFT and adds it to the 'owners' array
async function FetchOwners(token) {
  const largestAccounts = await solanaConnection.getTokenLargestAccounts(new PublicKey(token));
  const largestAccountInfo = await solanaConnection.getParsedAccountInfo(largestAccounts.value[0].address);
  console.log(largestAccountInfo.value.data.parsed.info.owner);
  owners.push(largestAccountInfo.value.data.parsed.info.owner);
}


// This is the final function that works through the 'owners' array and counts how many times a wallet address appears then sends that data to SaveCounts function
async function CountOwners(ownersArray) {
  const occurrences = ownersArray.reduce(function (acc, curr) {
  return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
  }, {});
  console.log(occurrences);
  SaveCounts(JSON.stringify(occurrences));
}


// This function finally saves the data of all the Wallets address of holders in the collection along with how many of the collection they hold in counts.txt
function SaveCounts(key) {
  fs.readFile("counts.txt", { encoding: "utf8" }, (err, data) => {
    const datatowrite = key;
    fs.writeFile("counts.txt", data + datatowrite, "utf8", function(err) {
      if (err) throw err;
      console.log("Saved Owner Counts");
    });
  });
}
