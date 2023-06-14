import { FlatList, Text, TextStyle, View, ViewStyle } from 'react-native'
import {
  EmitterCellType,
  EmitterLayer,
  EmitterView,
} from 'react-native-caemitterlayer'

import { pokemons, PokemonType } from './pokemons'

const flameImage = require('../assets/contents/flame.png')

const cellTemplate: EmitterCellType = {
  imageContents: flameImage,
  color: '#FFFFFF00',
  lifetime: 1.2,
  birthRate: 220,
  blueRange: 0.15,
  velocity: 4,
  velocityRange: 2,
  scale: 0.6,
  yAcceleration: -8,
  xAcceleration: 2,
  alphaSpeed: 0.4,
  emitterCells: [
    {
      imageContents: flameImage,
      lifetime: 1.4,
      beginTime: 1.18,
      yAcceleration: -14,
      scale: 1.0,
      scaleSpeed: -0.08,
      velocity: 20,
      birthRate: 1,
      alphaSpeed: -1.0,
    },
  ],
}

const layerConfig: EmitterLayer = {
  renderMode: 'additive',
  emitterPosition: {
    x: 45,
    y: 45,
  },
  emitterSize: {
    width: 90,
    height: 90,
  },
  emitterShape: 'rectangle',
  emitterCells: [cellTemplate],
}

const pokemonTypeToColor: Record<PokemonType, string> = {
  fire: '#EE8130',
  water: '#6390F0',
  grass: '#7AC74C',
  electric: '#F7D02C',
  normal: '#A8A77A',
  ice: '#96D9D6',
  psychic: '#F95587',
  ghost: '#735797',
  dragon: '#6F35FC',
  fairy: '#D685AD',
  dark: '#705746',
  steel: '#B7B7CE',
  rock: '#B6A136',
  ground: '#E2BF65',
  flying: '#A98FF3',
  bug: '#A6B91A',
  poison: '#A33EA1',
  fighting: '#C22E28',
}

function PokemonListItem({ pokemon }: { pokemon: (typeof pokemons)[0] }) {
  const color = pokemonTypeToColor[pokemon.type]

  const config = {
    layer: {
      ...layerConfig,
      emitterCells: [
        {
          ...cellTemplate,
          color,
        },
      ],
    },
  }

  return (
    <View style={[$listItemStyle, { borderColor: color }]}>
      <EmitterView emitterConfig={config}>
        <View style={[$imagePlaceholderStyle, { backgroundColor: color }]} />
      </EmitterView>
      <View style={{ paddingLeft: 8 }}>
        <Text style={$listItemTextStyle}>{pokemon.name}</Text>
        <Text style={[$listItemSubTextStyle, { color }]}>{pokemon.type}</Text>
      </View>
    </View>
  )
}

export function PokemonList() {
  return (
    <FlatList
      data={pokemons}
      renderItem={({ item }) => <PokemonListItem pokemon={item} />}
      keyExtractor={item => item.name}
      contentContainerStyle={{ paddingTop: 46, paddingBottom: 110 }}
      style={$listStyle}
    />
  )
}

const $listStyle: ViewStyle = {
  flex: 1,
  width: '100%',
  backgroundColor: '#E8EAEC',
}

const $listItemStyle: ViewStyle = {
  backgroundColor: 'white',
  marginHorizontal: 16,
  marginVertical: 8,
  borderRadius: 8,
  borderWidth: 1,
  borderBottomWidth: 3,
  borderRightWidth: 3,
  padding: 12,
  flexDirection: 'row',
}

const $imagePlaceholderStyle: ViewStyle = {
  width: 100,
  height: 100,
  borderRadius: 4,
}

const $listItemTextStyle: TextStyle = {
  fontSize: 22,
  color: '#212121',
  fontFamily: 'Helvetica',
}

const $listItemSubTextStyle: TextStyle = {
  marginTop: 4,
  fontSize: 14,
  fontWeight: 'bold',
  fontFamily: 'Helvetica',
  textTransform: 'uppercase',
}
