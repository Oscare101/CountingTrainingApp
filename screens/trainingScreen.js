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
const height = Dimensions.get('screen').height

export default function App() {
  const [enteredNumber, setEnteredNumber] = useState('')
  const [begin, setBegin] = useState(false)
  const [firstNum, setFirstNum] = useState('')
  const [secondNum, setSecondNum] = useState('')
  const [operation, setOperation] = useState('')
  const [points, setPoints] = useState(0)
  const [correctness, setCorrectness] = useState(0)
  const [steps, setSteps] = useState(0)

  function randomNum() {
    let max = 99
    let min = 1
    let randFirst
    let randSecond
    const operationList = ['+', '-']
    let op = operationList[Math.floor(Math.random() * operationList.length)]
    setOperation(op)
    switch (op) {
      case '-':
        randFirst = Math.floor(Math.random() * (max - min + 1) + min)
        randSecond = Math.floor(Math.random() * (randFirst - min + 1) + min)
        break
      case '+':
        randFirst = Math.floor(Math.random() * (max - min + 1) + min)
        randSecond = Math.floor(Math.random() * (max - min + 1) + min)
    }
    setFirstNum(randFirst)
    setSecondNum(randSecond)
  }

  function checkNum() {
    if (enteredNumber != '') {
      switch (operation) {
        case '+':
          if (+enteredNumber == firstNum + secondNum) {
            setPoints(points + 1)
            setEnteredNumber('')
            setSteps(steps + 1)
            setCorrectness(correctness + 1)
            randomNum()
          } else {
            setEnteredNumber('')
            setSteps(steps + 1)
            setCorrectness(correctness)
          }
          break
        case '-':
          if (+enteredNumber == firstNum - secondNum) {
            setPoints(points + 1)
            setEnteredNumber('')
            setSteps(steps + 1)
            setCorrectness(correctness + 1)
            randomNum()
          } else {
            setEnteredNumber('')
            setSteps(steps + 1)
            setCorrectness(correctness)
          }
      }
    }
  }

  const renderKeyboard = ({ item }) => {
    return (
      <View style={styles.itemView}>
        <TouchableOpacity
          style={[
            styles.itemTouch,
            {
              backgroundColor:
                item.id == 'Clear'
                  ? 'tomato'
                  : item.id == 'Check'
                  ? '#9be381'
                  : '#eee',
            },
          ]}
          onPress={() => {
            if (begin) {
              if (item.id == 'Clear') {
                setEnteredNumber('')
              } else if (item.id == 'Check') {
                checkNum()
              } else {
                if (item.id == 0 && enteredNumber.length == 0) {
                } else {
                  setEnteredNumber(enteredNumber + item.id)
                }
              }
            }
          }}
        >
          <Text style={styles.itemText}>{item.id}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  let content = (
    <View style={styles.startView}>
      <TouchableOpacity
        style={styles.startTouch}
        onPress={() => {
          randomNum()
          setBegin(true)
        }}
      >
        <Text style={styles.startText}>Start</Text>
      </TouchableOpacity>
    </View>
  )

  function Progress() {
    return (
      <View
        style={{
          width: width - 50,
          height: 30,
          backgroundColor: 'tomato',
          borderRadius: 100,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            height: 30,
            backgroundColor: '#9be381',
            width: steps == 0 ? width : (width - 50) * (correctness / steps),
            borderRadius: 100,
          }}
        ></View>
      </View>
    )
  }

  if (begin) {
    content = (
      <View style={{ height: height * 0.4 }}>
        <Progress />
        <View style={styles.pointsBlock}>
          <Text style={styles.pointText}>Points: {points}</Text>
          <Text style={styles.accuracyText}>
            Accuracy {correctness}/{steps}
          </Text>
        </View>
        <View style={styles.operationBlock}>
          <Text style={styles.operationText}>
            {firstNum}
            {operation}
            {secondNum}
          </Text>
        </View>
        <Text style={styles.enteredText}>{enteredNumber}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar />

      <View
        style={{
          height: '50%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {content}
      </View>
      <View style={{ height: height * 0.4 }}>
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
    justifyContent: 'space-between',
    padding: 10,
  },
  itemView: {
    width: width * 0.29,
    backgroundColor: '#ddd',
    margin: 5,
    height: 60,
    elevation: 5,
    borderRadius: 5,
    overflow: 'hidden',
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
  startView: {
    width: width * 0.6,
    height: 100,
    backgroundColor: '#8ab1e3',
    borderRadius: 5,
    overflow: 'hidden',
  },
  startTouch: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startText: { fontSize: 28 },
  pointsBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  pointText: { color: '#e3bc3b', fontSize: 20 },
  accuracyText: { fontSize: 20, color: '#d32ee6' },
  operationBlock: {
    width: width - 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  operationText: {
    fontSize: 28,
  },
  enteredText: { fontSize: 30, textAlign: 'center' },
})
