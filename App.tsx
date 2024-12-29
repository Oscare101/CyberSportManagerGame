import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GunImage from './src/components/GunImage';
import NadeImage from './src/components/NadeImage';
import guns from './src/constants/guns';
import tournamentsDefault from './src/constants/tournamentsDefault';
import {Tournament} from './src/constants/interfaces/tournamentInterfaces';

export default function App() {
  return (
    <ScrollView style={{backgroundColor: 'red'}}>
      {tournamentsDefault.map((t: Tournament, index: number) => (
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            alignSelf: 'center',
            width: '92%',
            backgroundColor: '#eee',
            borderWidth: 1,
            marginVertical: 5,
            padding: 5,
          }}
          key={index}>
          <Text>name: {t.name}</Text>
          <Text>tier: {t.tier}</Text>
          <Text>period: {t.period}</Text>
          <Text>
            prize:{' '}
            {t.prizes
              .reduce((a, b) => a + b, 0)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
            $
          </Text>
          <Text>{t.points.toString()}</Text>
          <Text>{t.prizes.toString()}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
