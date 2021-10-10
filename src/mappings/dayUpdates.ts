import { BigInt, ethereum } from "@graphprotocol/graph-ts";
import {
  MarketplaceDayData,
  Marketplace,
} from "../../generated/schema";
import { MARKETPLACE_ADDRESS, ONE_BI, ZERO_BD, ZERO_BI } from "./helpers";

export function updateMarketplaceDayData(event: ethereum.Event): MarketplaceDayData {
  let marketplace = Marketplace.load(MARKETPLACE_ADDRESS);
  let timestamp = event.block.timestamp.toI32();
  let dayID = timestamp / 86400;
  let dayStartTimestamp = dayID * 86400;
  let marketplaceDayData = MarketplaceDayData.load(dayID.toString());
  if (marketplaceDayData === null)
  {
    marketplaceDayData = new marketplaceDayData(dayID.toString());
    marketplaceDayData.date = dayStartTimestamp;
    marketplaceDayData.dailyVolumeUSD = ZERO_BD;
    marketplaceDayData.totalVolumeUSD = ZERO_BD;
    marketplaceDayData.totalTokensSold = ZERO_BI;
    marketplaceDayData.txCount = ZERO_BI;
  }

  marketplaceDayData.totalVolumeUSD = marketplace.totalVolumeUSD;
  marketplaceDayData.totalTokensSold = marketplace.totalTokensSold;
  marketplaceDayData.txCount = marketplace.txCount;
  marketplaceDayData.save();

  return marketplaceDayData as MarketplaceDayData;
}