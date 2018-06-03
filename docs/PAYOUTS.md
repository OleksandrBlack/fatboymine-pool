**First of all make sure your Redis instance and backups are configured properly http://redis.io/topics/persistence.**

Keep in mind that pool maintains all balances in **Shannon**.

# Processing and Resolving Payouts

**You MUST run payouts module in a separate process**, ideally don't run it as daemon and process payouts 2-3 times per day and watch how it goes. **You must configure logging**, otherwise it can lead to big problems.

Module will fetch accounts and sequentially process payouts.

For every account who reached minimal threshold:

* Check if we have enough peers on a node
* Check that account is unlocked

If any of checks fails, module will not even try to continue.

* Check if we have enough money for payout (should not happen under normal circumstances)
* Lock payments

If payments can't be locked (another lock exist, usually after a failure) module will halt payouts.

* Deduct balance of a miner and log pending payment
* Submit a transaction to a node via `pirl_sendTransaction`

**If transaction submission fails, payouts will remain locked and halted in erroneous state.**

If transaction submission was successful, we have a TX hash:

* Write this TX hash to a database
* Unlock payouts

And so on. Repeat for every account.

After payout session, payment module will perform `BGSAVE` (background saving) on Redis if you have enabled `bgsave` option.

## Resolving Failed Payments (automatic)

If your payout is not logged and not confirmed by Pirl network you can resolve it automatically. You need to payouts in maintenance mode by setting up `RESOLVE_PAYOUT=1` or `RESOLVE_PAYOUT=True` environment variable:

`RESOLVE_PAYOUT=1 ./build/bin/fatboymine-pool payouts.json`.

Payout module will fetch all rows from Redis with key `pirl:payments:pending` and credit balance back to miners. Usually you will have only single entry there.

If you see `No pending payments to resolve` we have no data about failed debits.

If there was a debit operation performed which is not followed by actual money transfer (after `pirl_sendTransaction` returned an error), you will likely see:

```
Will credit back following balances:
Address: 0x24947682e051f136f593c6960fdb6a1550577d3a, Amount: 166798415 Shannon, 2016-05-11 08:14:34
```

followed by

```
Credited 166798415 Shannon back to 0x24947682e051f136f593c6960fdb6a1550577d3a
```

Usually every maintenance run ends with following message and halt:

```
Payouts unlocked
Now you have to restart payouts module with RESOLVE_PAYOUT=0 for normal run
```

Unset `RESOLVE_PAYOUT=1` or run payouts with `RESOLVE_PAYOUT=0`.

## Resolving Failed Payment (manual)

You can perform manual maintenance using `geth` and `redis-cli` utilities.

### Check For Failed Transactions:

Perform the following command in a `redis-cli`:

```
ZREVRANGE "pirl:payments:pending" 0 -1 WITHSCORES
```

Result will be like this:

> 1) "0x24947682e051f136f593c6960fdb6a1550577d3a:25000000"

It's a pair of `LOGIN:AMOUNT`.

>2) "1462920526"

It's a `UNIXTIME`

### Manual Payment Submission

**Make sure there is no TX sent using block explorer. Skip this step if payment actually exist in a blockchain.**

```javascript
pirl.sendTransaction({
  from: pirl.coinbase,
  to: '0x24947682e051f136f593c6960fdb6a1550577d3a',
  value: web3.toWei(25000000, 'shannon')
})

// => 0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331
```

**Write down tx hash**.

### Store Payment in Redis

Also usable for fixing missing payment entries.

```
ZADD "pirl:payments:all" 1462920526 0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331:0x24947682e051f136f593c6960fdb6a1550577d3a:25000000
```

```
ZADD "pirl:payments:0x24947682e051f136f593c6960fdb6a1550577d3a" 1462920526 0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331:25000000
```

### Delete Erroneous Payment Entry

```
ZREM "pirl:payments:pending" "0x24947682e051f136f593c6960fdb6a1550577d3a:25000000"
```

### Update Internal Stats

```
HINCRBY "pirl:finances" pending -25000000
HINCRBY "pirl:finances" paid 25000000
```

### Unlock Payouts

```
DEL "pirl:payments:lock"
```

## Resolving Missing Payment Entries

If pool actually paid but didn't log transaction, scroll up to `Store Payment in Redis` section. You should have a transaction hash from block explorer.

## Transaction Didn't Confirm

If you are sure, just repeat it manually, you should have all the logs.
