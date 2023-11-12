import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

NfcManager.start();

function NFC() {
  async function readNdef() {
    console.log("Ola mundo")
    try {
      await NfcManager.requestTechnology(NfcTech.MifareClassic);
      const tag = await NfcManager.getTag();

      const tagPayload = tag?.ndefMessage.map(item=>{
        const utf8Bytes = new Uint8Array(item.payload); 
        const utf8String = String.fromCharCode(...utf8Bytes);
        return utf8String
      })

      console.warn('Tag found', tagPayload);
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={readNdef}>
        <Text>Scan a Tag</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NFC;