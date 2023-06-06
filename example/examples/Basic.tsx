import { View } from 'react-native'
import { EmitterConfigPropType, EmitterView } from 'react-native-caemitterlayer'

const circle = require('../assets/contents/circle.png')

export function Basic() {
  const emitterConfig: EmitterConfigPropType = {
    layer: {
      // center the emission point in the middle of top edge of the view
      emitterPosition: {
        x: 50,
        y: 0,
      },
      emitterCells: [
        {
          color: '#006699',
          imageContents: circle,
          lifetime: 5, // particles live for 5 seconds
          velocity: 20, // velocity of 20dp/s in the direction of emission
          birthRate: 1, // One particle per second
          emissionLongitude: -Math.PI / 2, // emit particles up
          emissionRange: Math.PI / 3, // emit particles in a 45 degree cone
        },
      ],
    },
  }

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
