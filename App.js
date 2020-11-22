
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button } from 'react-native';
import { getMacAddressAsync } from 'expo-network';
import NetInfo from '@react-native-community/netinfo';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
const App = () => {
  const [netInfo, setNetInfo] = useState('');
  const [MacAddress, setMacAddress]= useState('')
  useEffect(() => {

     (async () => {
      getMacAddressAsync().then(v => {
        console.log("Mac Address",v);
         setMacAddress(v)
      });
    })();

    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetInfo(
        `Connection type: ${state.type}
        Is connected?: ${state.isConnected}
        IP Address: ${state.details.ipAddress}
         Device Brand Name: ${Device.brand}
         Device Id: ${Constants.deviceId}
          Installation Id: ${Constants.installationId}
           Device Name: ${Constants.deviceName}`
      );
    });

    return () => {

      unsubscribe();
    };
  }, []);

  const getNetInfo = () => {
    // To get the network state once
    NetInfo.fetch().then((state) => {
      console.log(Device.brand)
      console.log("Device Id",Constants.deviceId)
      

      alert(

        `Connection type: ${state.type}
        Is connected?: ${state.isConnected}
        IP Address: ${state.details.ipAddress}`
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>
          React Native NetInfo
          {'\n'}
          To Get NetInfo information
        </Text>
        <Text style={styles.textStyle}>
          {/*Here is NetInfo to get device type*/}
          {netInfo}
          <Text>{"\nMac Address " +MacAddress}</Text>
        </Text>
        <Button title="Get more detailed NetInfo" onPress=
        {getNetInfo
        } />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    paddingVertical: 20,
  },
});

export default App;
