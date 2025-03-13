/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';

function SetUrl(props: {
  url: string;
  auth: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  handleOpenWebView: () => void;
}) {
  const {url, auth, setUrl, handleOpenWebView} = props;
  return (
    <View style={{padding: 16, gap: 30}}>
      <View style={styles.row}>
        <Text>url:</Text>
        <TextInput style={styles.input} value={url} onChangeText={setUrl} />
      </View>
      {auth && (
        <View style={styles.row}>
          <Text>auth: {auth}</Text>
        </View>
      )}
      <Button onPress={handleOpenWebView} title="Open Webview" />
    </View>
  );
}

function App(): React.JSX.Element {
  const [showWebView, setShowWebView] = useState(false);
  const [url, setUrl] = useState(
    'https://auth.matchid.ai/app/auth?back=1&appid=MID-E53wKKWTqNzK7ccC',
  );
  const [auth, setAuth] = useState('');
  const handleOpenWebView = () => {
    if (url) {
      setShowWebView(true);
      setAuth('');
    }
  };
  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const {matchid, eventName, data} = JSON.parse(event.nativeEvent.data);
      if (matchid) {
        // This flag means event from MatchID
        switch (eventName) {
          case 'back':
            // close webview
            setShowWebView(false);
            break;
          case 'auth':
            // login success
            setShowWebView(false);
            setAuth(JSON.stringify(data));
            break;
        }
      }
    } catch {}
  };
  return (
    <SafeAreaView style={styles.flex1}>
      <ScrollView
        style={styles.flex1}
        contentContainerStyle={styles.contentContainer}>
        {!showWebView ? (
          <SetUrl
            url={url}
            auth={auth}
            setUrl={setUrl}
            handleOpenWebView={handleOpenWebView}
          />
        ) : (
          <WebView
            scrollEnabled
            allowFileAccess
            javaScriptEnabled
            sharedCookiesEnabled
            allowUniversalAccessFromFileURLs
            allowingReadAccessToURL={'*'}
            originWhitelist={['*']}
            source={{uri: url}}
            style={styles.flex1}
            onMessage={handleMessage}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
  },
});

export default App;
