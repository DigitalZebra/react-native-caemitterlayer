import { View } from 'react-native'
import { EmitterConfigPropType, EmitterView } from 'react-native-caemitterlayer'

const emitterConfig: EmitterConfigPropType = {
  layer: {
    // center the emission point in the middle of top edge of the view
    emitterPosition: {
      x: 50,
      y: 0,
    },
    emitterCells: [
      {
        stringContents: { value: '🦓' },
        lifetime: 5,
        contentsScale: 2,
        alphaSpeed: -0.2,
        velocity: 40,
        birthRate: 2,
        emissionLongitude: -Math.PI / 2, // emit particles up
        emissionRange: Math.PI / 4, // emit particles in a 45 degree cone
      },
    ],
  },
}

export function Emoji() {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <EmitterView
        emitterConfig={emitterConfig}
        style={{ width: 100, height: 100, backgroundColor: 'teal' }}
      />
    </View>
  )
}
