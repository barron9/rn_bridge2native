//berkin tatlısu berkin@msn.com
import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ToastExample from './BridgeExample';
import {NativeEventEmitter, NativeModules} from 'react-native';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

interface State {
  enthusiasmLevel: number;
}

export class Hello extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    if ((props.enthusiasmLevel || 0) <= 0) {
      //throw new Error('You could be a little more enthusiastic. :D');
    }

    this.state = {
      enthusiasmLevel: props.enthusiasmLevel || 1,
    };
  }
  componentDidMount() {
    const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
    eventEmitter.addListener('callback', event => {
      console.log('intentten gelen' + event.hisseler); // "someValue"
      alert('intentten gelen' + event.hisseler);
    });
  }
  onIncrement = () =>
    this.setState({enthusiasmLevel: this.state.enthusiasmLevel + 1});
  onDecrement = () =>
    this.setState({enthusiasmLevel: this.state.enthusiasmLevel - 1});
  getExclamationMarks = (numChars: number) => Array(numChars + 1).join('!');

  render() {
    const DATA = [
      {
        id: 'GUID-asdfgh1234',
        baslik: 'hisselerJSON',
      },
    ];

    return (
      <SafeAreaView style={styles.root}>
        <Text>React Native App</Text>
        <FlatList
          data={DATA}
          renderItem={({item}) => <Item id={item.id} baslik={item.baslik} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
}
function Item({id, baslik}) {
  return (
    <TouchableOpacity
      style={styles.greeting}
      onPress={() => {
        ToastExample.show(id, ToastExample.SHORT);
        ToastExample.measureLayout(
          100,
          100,
          msg => {
            console.log(msg);
          },
          (x, y, width, height) => {
            console.log(x + ':' + y + ':' + width + ':' + height);
          },
        );
      }}>
      <Text style={styles.greeting}>{baslik}</Text>
    </TouchableOpacity>
  );
}
// styles
const styles = StyleSheet.create({
  root: {
    paddingTop: 100,
    paddingLeft: 20,
    width: '100%',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  buttons: {
    flexDirection: 'row',
    minHeight: 70,
    alignItems: 'stretch',
    alignSelf: 'center',
    borderWidth: 5,
  },
  button: {
    flex: 1,
    paddingVertical: 0,
  },
  greeting: {
    color: '#999',
    fontWeight: 'bold',
  },
});
