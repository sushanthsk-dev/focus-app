import React, { useState } from 'react';

import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';
import { CountDown } from '../../components/CountDown';
import { Timing } from './Timing';
const DEFAULT_TIME = 0.1;
export const Timer = ({ focusSubject,onTimerEnd,clearSubject }) => {
  useKeepAwake();
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);

  const [progress, setProgress] = useState(1);
  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };
  // const onTimerEnd = ()=>{
  //   setTimeout(()=>addSubject(null),10000);
  // }
  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const ChangeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <CountDown
          isPaused={!isStarted}
          onProgress={onProgress}
          minutes={minutes}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 10 }}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={ChangeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}

      </View>
              <View style={styles.clearSubject}>
          <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countdown: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },clearSubject:{
    paddingBottom:25,
    paddingLeft:25
  }
});
