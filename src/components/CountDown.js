import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing, fontSize } from '../utils/sizes';
import { colors } from '../utils/colors';
const minutesTOMillis = (min) => min * 1000 * 60;

const formatTime = (time) => (time < 9 ? `0${time}` : time);

export const CountDown = ({ minutes = 1, isPaused, onProgress, onEnd }) => {
  const interval = React.useRef(null);
  const CountDown = () => {
    setMillis((time) => {
      if (time === 0) {
        /// do more stuff here
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      //report the progress

      return timeLeft;
    });
  };

  useEffect(() => {
    setMillis(minutesTOMillis(minutes));
  }, [minutes]);

  useEffect(()=> {
          onProgress(millis / minutesTOMillis(minutes));
          if(millis ===0) {
            onEnd();
          }
  },[millis])
  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(CountDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);
  const [millis, setMillis] = useState(minutesTOMillis(minutes));

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const second = Math.floor(millis / 1000) % 60;
  const hour = Math.floor(millis / 1000 / 60 / 60) % 60;
  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(second)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94,132,225,0.3)',
  },
});
