import React, {useCallback, useRef} from 'react';
import {Button, StyleSheet, View} from 'react-native';

async function makeRequest() {
  await fetch(
    'https://microsoftedge.github.io/Demos/json-dummy-data/128KB.json',
    {
      method: 'GET',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
    },
  );
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function App(): JSX.Element {
  const isRunning = useRef(false);

  const startRepeatDoRequest = useCallback(async () => {
    console.warn('starting...');
    isRunning.current = true;

    do {
      await makeRequest();
      await sleep(100);
    } while (isRunning.current);
  }, []);

  const stopRepeatDoRequest = useCallback(() => {
    isRunning.current = false;
    console.warn('stopping...');
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Start" onPress={startRepeatDoRequest} />
      <Button title="Stop" onPress={stopRepeatDoRequest} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
