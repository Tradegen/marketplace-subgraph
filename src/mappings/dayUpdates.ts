import { BigInt, ethereum } from "@graphprotocol/graph-ts";
import {
  Pool,
  PoolDayData,
  NFTPool,
  NFTPoolDayData,
  TradegenDayData,
  Tradegen,
} from "../../generated/schema";
import { MARKETPLACE_ADDRESS, ONE_BI, ZERO_BD, ZERO_BI } from "./helpers";

export function updateTradegenDayData(event: ethereum.Event): TradegenDayData {
  let tradegen = Tradegen.load(ADDRESS_RESOLVER_ADDRESS);
  let timestamp = event.block.timestamp.toI32();
  let dayID = timestamp / 86400;
  let dayStartTimestamp = dayID * 86400;
  let tradegenDayData = TradegenDayData.load(dayID.toString());
  if (tradegenDayData === null)
  {
    tradegenDayData = new TradegenDayData(dayID.toString());
    tradegenDayData.date = dayStartTimestamp;
    tradegenDayData.dailyVolumeUSD = ZERO_BD;
    tradegenDayData.totalVolumeUSD = ZERO_BD;
    tradegenDayData.totalValueLockedUSD = ZERO_BD;
    tradegenDayData.txCount = ZERO_BI;
  }

  tradegenDayData.totalVolumeUSD = tradegen.totalVolumeUSD;
  tradegenDayData.totalValueLockedUSD = tradegen.totalValueLockedUSD;
  tradegenDayData.txCount = tradegen.txCount;
  tradegenDayData.save();

  return tradegenDayData as TradegenDayData;
}