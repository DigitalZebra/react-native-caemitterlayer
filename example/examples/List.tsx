import { FlatList, Text, TextStyle, View, ViewStyle } from 'react-native'
import {
  EmitterCellType,
  EmitterLayer,
  EmitterView,
} from 'react-native-caemitterlayer'

import { pokemons, PokemonType } from './pokemons'

const flameImage =
  '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'

const cellTemplate: EmitterCellType = {
  imageData: flameImage,
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
      imageData: flameImage,
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
