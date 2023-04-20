import { useState } from 'react'
import {
  Button,
  SafeAreaView,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import { BurstEffect } from './examples/BurstEffect'
import { Confetti } from './examples/Confetti'
import { ConfettiCannon } from './examples/ConfettiCannon'
import { Fire } from './examples/Fire'
import { Fireworks } from './examples/Fireworks'
import { PokemonList } from './examples/List'
import { Snow } from './examples/Snow'

const Examples: Record<string, { Component: React.FC; title: string }> = {
  Fire: {
    Component: Fire,
    title: 'Fire',
  },
  Snow: {
    Component: Snow,
    title: 'Snow',
  },
  Fireworks: {
    Component: Fireworks,
    title: 'Fireworks',
  },
  BurstEffect: {
    Component: BurstEffect,
    title: 'Burst Effect',
  },
  Confetti: {
    Component: Confetti,
    title: 'Confetti',
  },
  ConfettiCannon: {
    Component: ConfettiCannon,
    title: 'Confetti Cannon',
  },
  List: {
    Component: PokemonList,
    title: 'List',
  },
}

type ExampleKeys = keyof typeof Examples

export default function App() {
  const [selectedExample, setSelecteExample] = useState<ExampleKeys | null>(
    null,
  )

  if (!selectedExample) {
    return (
      <SafeAreaView style={$homeContainer}>
        <Text style={$homeHeadingText}>Examples</Text>
        {Object.entries(Examples).map(([exampleName, { title }]) => (
          <Button
            key={exampleName}
            title={title}
            onPress={() => setSelecteExample(exampleName as ExampleKeys)}
          />
        ))}
      </SafeAreaView>
    )
  }

  const { Component } = Examples[selectedExample]

  return (
    <View style={$homeContainer}>
      <Component />
      <View style={$buttonContainerStyles}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={$buttonStyles}
          onPress={() => setSelecteExample(null)}>
          <Text style={$backButtonTextStyle}>BACK</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const $homeContainer: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
}

const $homeHeadingText: TextStyle = {
  fontSize: 32,
  fontWeight: '600',
  marginBottom: 16,
}

const $buttonContainerStyles: ViewStyle = {
  position: 'absolute',
  bottom: 40,
  width: '100%',
}

const $buttonStyles: ViewStyle = {
  marginHorizontal: 16,
  padding: 16,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#194c7f',
  borderColor: 'gray',
  borderWidth: 1,
  borderRadius: 8,
}

const $backButtonTextStyle: TextStyle = {
  fontSize: 16,
  color: 'white',
  fontWeight: '600',
}
