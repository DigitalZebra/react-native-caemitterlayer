import { Image, Text, View } from 'react-native'
import { EmitterConfigPropType, EmitterView } from 'react-native-caemitterlayer'

const circleBase64 =
  'iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAFZaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA2LjAuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Chle4QcAAAAJcEhZcwAACxMAAAsTAQCanBgAAADGUExURUdwTP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////MWSogAAABBdFJOUwABBPj9+QUD9/oG/AL++wcQ3mmJnAk8reCGzk0Uvi3rDbZ4Gu202Bk98VaiJRYvP3+6PrmAxWjnW+aob6dcKzsq2Nr8dQAAATVJREFUGBllwYVW5EAARcHbndbIGO7uugIrsPL+/6cIcwJnJqniQx1q5kyI9JS0Di9OJrRKwwIzhv3js/OD0+ne1jqEyCdjub1J+vDtEiIdU/PzSvKpyNmnQtIjROaM5UUqsjqjJK1C5N2YP5LXguy0QjRAye2VvJZkaYcSarhRoZ6k7TGWwH5SVo9zusZScyyvgaRX3p0pacBrOgEOz1VoYKT8H7g4UNaAk/4BJ6fKGnCNHoDJVF4Dlap7WntKGvD6cQeGLRUaSDoCAuvSSD1N1jORCF+U1FNocxcLJV+lrCWV04wAGMt3uawFldcGRFoRVqXk1GmKSk9rBOYirEgu+ZFzlU9Z2lgj0Imws61W06i1OYPApxgZX/+eesn9OprtQmCBKYHJ38uH+zsgRJZZSydaOm9PxmfvVMb72AAAAABJRU5ErkJggg=='

// TODO: clean up this example
const source = require('../assets/contents/snowflake.png')

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
          // imageData: circleBase64, // base64 encoded PNG image
          color: '#006699',
          imageSource: Image.resolveAssetSource(source),
          lifetime: 5, // particles live for 5 seconds
          velocity: 20,
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
      <Text>{JSON.stringify(Image.resolveAssetSource(source))}</Text>
      <EmitterView
        emitterConfig={emitterConfig}
        style={{ width: 100, height: 100, backgroundColor: 'teal' }}
      />
    </View>
  )
}
