import { StyleSheet, Text, View } from 'react-native';

import * as ReactNativeCAEmitterLayer from 'react-native-caemitterlayer';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ReactNativeCAEmitterLayer.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
