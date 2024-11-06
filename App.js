/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  NativeModules,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import ButtonTouchable from './src/components/ButtonTouchable';
import QRCodeScanner from './src/components/QRCodeScanner';

const dWidth = Dimensions.get("window").width;

const clr1 = "mediumseagreen";


function App() {
  const { paymentModuleX4 } = NativeModules;

  const [showQR, setShowQR] = useState(false);
  const [qrCode, setQrCode] = useState("");

  const openQRscanner = () => {
    setShowQR(null);
    setShowQR(true);
  };

  const onQrRead = (qrtext) => {
    setQrCode(qrtext);
    setShowQR(false);
  };

  return (
    <View style={styles.page}>
      {qrCode ? (
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 16, color: "black" }}>
            {"QR Payload \n\n" + qrCode}
          </Text>
        </View>
      ) : null}

      {showQR ? (
        <QRCodeScanner
          onRead={onQrRead} />
      ) :
        (
          <View style={{ padding: 16 }}>
            <ButtonTouchable
              text={'Iniciar a SDK'}
              color={'blue'}
              onPress={async () => {
                await paymentModuleX4.initSDKX4Fare(
                  '6aba8b11-0d2d-4687-a492-c24e0fc88686',
                  '919c65f1-e716-4f0b-bf76-cbd8dfcef982',
                  'POS X4FARE',
                );
                console.log('Iniciado');
              }}
            />
            <ButtonTouchable
              text={'Iniciar Camera'}
              color={'red'}
              onPress={() => openQRscanner()}
            />
          </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: "3%",
    borderWidth: 2,
    borderColor: 'grey',
  },
  btnText: {
    color: clr1,
  },
});

export default App;
