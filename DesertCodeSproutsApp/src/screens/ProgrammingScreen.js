import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Title } from 'react-native-paper';
import { WebView } from 'react-native-webview';

const blocklyHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script src="https://unpkg.com/blockly/blockly.min.js"></script>
    <style>html, body { height: 100%; margin: 0; }</style>
  </head>
  <body>
    <div id="blocklyDiv" style="height: 100vh; width: 100vw;"></div>
    <xml id="toolbox" style="display: none">
      <block type="controls_repeat_ext"></block>
      <block type="logic_compare"></block>
      <block type="math_number"></block>
      <block type="text"></block>
      <block type="text_print"></block>
    </xml>
    <script>
      var workspace = Blockly.inject('blocklyDiv',
        {toolbox: document.getElementById('toolbox')});
    </script>
  </body>
</html>
`;

export default function ProgrammingScreen() {
    return (
        <View style={styles.container}>
            <Title>Programming with Blocks</Title>
            <WebView
                originWhitelist={['*']}
                source={{ html: blocklyHtml }}
                style={styles.webview}
                javaScriptEnabled={true}
                domStorageEnabled={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 20 },
    webview: { flex: 1, width: Dimensions.get('window').width }
});