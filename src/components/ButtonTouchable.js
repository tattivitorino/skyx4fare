import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const ButtonTouchable = ({ text, color, ...props }) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <TouchableOpacity
        {...props}
        style={{
          backgroundColor: '#e2e2e2',
          height: 120,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          borderWidth: 2,
          borderColor: color,
        }}>
        <Text style={{ fontSize: 24, color }}>{text}</Text>
      </TouchableOpacity>
    </View>

  );
};

export default ButtonTouchable;
