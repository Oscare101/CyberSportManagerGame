import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux';
import {updateTournaments} from '../redux/tournaments';
import tournamentsDefault from '../constants/defaultData/tournamentsDefault';
import fullBuyDefault from '../constants/defaultData/fullBuyDefault';
import {Buy} from '../constants/interfaces/buyInterfaces';
import guns from '../constants/guns';
import armors from '../constants/armors';
import nades from '../constants/nades';
import {NadeName} from '../constants/interfaces/nadeInterfaces';
import {PlayerRole} from '../constants/interfaces/playerInterfaces';

export default function TestScreen() {
  const tournaments: any = useSelector((state: RootState) => state.tournaments);
  const fullBuy: Buy = fullBuyDefault;

  function CalculateBuy(role: PlayerRole) {
    const gunPrice = guns[fullBuy[role].gun['T'][0]].price;
    const armorPrice = armors[fullBuy[role].armor[0]].price;
    const nadesPrice = fullBuy[role].nades.nades.reduce(
      (sum: number, n: NadeName) => sum + nades[n].price,
      0,
    );
    return gunPrice + armorPrice + nadesPrice;
  }

  const sum =
    CalculateBuy('sniper') + CalculateBuy('rifler') + CalculateBuy('rifler');
  CalculateBuy('support');
  CalculateBuy('captain');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateTournaments(tournamentsDefault));
  }, []);

  return (
    <View>
      <Text>{sum}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
