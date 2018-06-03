#!/bin/bash

#ellamain:
#screen -dmS pirl /usr/bin/gpirl --rpc --ws --unlock="./pirluser" --password="./pirlpass" --max-peers=500 --extra-data="pirl.fatboymine.com" --identity="pirl.fatboymine.com" --cache=4096
screen -dmS pirl /usr/bin/pirl --rpc --ws --maxpeers=500 --extradata="pirl.fatboymine.com" --identity="pirl.fatboymine.com" --cache=4096 --datadir "/root/.pirl" --port=30304
sleep 5

#pool2b:
screen -dmS etscpool2b /var/www/fatboymine-pool/fatboymine-pool /var/www/fatboymine-pool/pool2b.json

sleep 5

#pool4b:
screen -dmS etscpool4b /var/www/fatboymine-pool/fatboymine-pool /var/www/fatboymine-pool/pool4b.json

sleep 5

#pool9b:
screen -dmS etscpool9b /var/www/fatboymine-pool/fatboymine-pool /var/www/fatboymine-pool/pool9b.json

sleep 5

#api:
screen -dmS etscapi /var/www/fatboymine-pool/fatboymine-pool /var/www/fatboymine-pool/api.json

sleep 5

#unlocker:
screen -dmS etscunlocker /var/www/fatboymine-pool/fatboymine-pool /var/www/fatboymine-pool/unlocker.json

sleep 5

#payout:
screen -dmS etscpayout /var/www/fatboymine-pool/fatboymine-pool /var/www/fatboymine-pool/payout.json

sleep 5

# Sample start for stats reporting to stats.ellaism.org
#netintelligence:
#cd /root/ellaism-net-intelligence-api/ && pm2 start /root/ellaism-net-intelligence-api/app.json

exit 0
