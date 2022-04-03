# NFT Collection Easy Owner Counter

## Description
This is a super simple Node.js script that will take a collections hashlist and work through the owner of each of the NFTs (1 every second to avoid rate limiting) and the finally work out how many each owner holds and export it into a handy file.

## Setup
#### You will need to import these Node.js modules 
###### `npm i @solana/web3.js fs`
#### Add your collections hash list
###### Replace the content of `hashlist.txt` with your collections hashlist in the same format
#### Let it run!
###### Simply run it by typing `node index.js` from the console and it will cycle through every NFT on the hash list (1 per second) and the console will display `Saved Owner Counts` when its finish. Open up `hashlist.txt` and you will have  a list of wallets on the left with their owned count on the right side next to them.
#
###### Extra credits to the creators of the modules used
