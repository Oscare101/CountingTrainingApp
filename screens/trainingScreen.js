import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Dimensions,
} from 'react-native'

const keyboardNumbers = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 'Clear' },
  { id: 0 },
  { id: 'Check' },
]

const width = Dimensions.get('screen').width

export default function App() {
  const [enteredNumber, setEnteredNumber] = useState('')

  const renderKeyboard = ({ item }) => {
    return (
      <View style={styles.itemView}>
        <TouchableOpacity
          style={[
            styles.itemTouch,
            {
              backgroundColor:
                item.id == 'Clear'
                  ? 'red'
                  : item.id == 'Check'
                  ? 'green'
                  : '#eee',
            },
          ]}
          onPress={() => {
            if (item.id == 'Clear') {
              setEnteredNumber('')
            } else if (item.id == 'Check') {
            } else {
              if (item.id == 0 && enteredNumber.length == 0) {
              } else {
                setEnteredNumber(enteredNumber + item.id)
              }
            }
          }}
        >
          <Text style={styles.itemText}>{item.id}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <View>
        <Text>{enteredNumber}</Text>
      </View>
      <View>
        <FlatList
          numColumns={3}
          data={keyboardNumbers}
          renderItem={renderKeyboard}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  itemView: {
    width: width / 4,
    backgroundColor: '#ddd',
    margin: 5,
    height: 50,
    elevation: 5,
  },
  itemTouch: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
  },
  itemText: {
    fontSize: 24,
  },
})
