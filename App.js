import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform,AsyncStorage } from 'react-native';
// AsyncStorage gives us ability to go and store information asynchronously
import { Focus } from './src/features/focus/Focus';
import {FocusHistory} from './src/features/focus/FocusHistory';
import { Timer } from './src/features/timer/Timer';
import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';
const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};
export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);
  const addFocusHistorySubjectWithState = (subject, status) => {
    setFocusHistory([...focusHistory, {key:String(focusHistory.length+1), subject, status }]);
  };
const onClear=()=>{
  //things to do
  setFocusHistory([]);
}

const saveFocusHistory = async()=> {
  try {
   await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
  }catch(e) {
    console.log(e);
  }
}

const loadFocusHistory = async()=> {
  try{
    const history = await AsyncStorage.getItem('focusHistory');
    if(history && JSON.parse(history).length) {
      setFocusHistory(JSON.parse(history));
    }
  }catch(e) {
    console.log(e);
  }
};


useEffect(()=> {
  loadFocusHistory();
},[]) //no array means runs on the mount

useEffect(()=> {
  saveFocusHistory();
},[focusHistory]);

  console.log(focusHistory);
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (//This allows to render multiple pieces
        <View style={{flex:1}}> 
        <Focus addSubject={setFocusSubject} />
        <FocusHistory focusHistory={focusHistory} onClear={onClear} /> 
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
    backgroundColor: colors.darkBlue,
  },
});
