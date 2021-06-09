import React from 'react';
import {colors} from '../utils/colors';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]}  {...props}>
      <Text style={[styles(size).text,textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      textAlign: 'center',
      borderColor: colors.white,
      borderWidth:2,
      justifyContent:'center',
    },
    text: {
      color: colors.white,
      fontSize: size/3,
      textAlign:'center',
      justifyContent:'center',
      alignItems:'center'
    },
  });
