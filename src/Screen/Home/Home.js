/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';

// Component
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Loading from '../../Component/Loading';

// action
import {useDispatch, useSelector} from 'react-redux';
import {
  getPokemonDetail,
  getNumberByPokemonName,
  resetPokemonNumber,
} from './Redux/action';

//Elements
import {SearchBar} from 'react-native-elements';

// icons
import AntDesign from 'react-native-vector-icons/AntDesign';

// Other
import {moderateScale} from 'react-native-size-matters';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Button} from 'react-native-elements';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {widthPercentageToDP} from 'react-native-responsive-screen';

export default function Home() {
  const [number, setNumber] = useState(1);
  const [value, setValue] = useState('a');

  const Poke = useSelector(state => {
    if (state.Home.pokemonList.length > 0) {
      return state.Home.pokemonList[0];
    } else {
      return {};
    }
  });

  const PokeNumber = useSelector(state => {
    return state.Home.pokemonNumber;
  });

  const dispatch = useDispatch();

  const getListData = () => {
    dispatch(getPokemonDetail(number));
  };

  const doActionGetPokemonNumber = () => {
    if ('family' in Poke) {
      Poke.family.evolutionLine.forEach(value => {
        dispatch(getNumberByPokemonName(value));
      });
    }
  };

  useEffect(() => {
    dispatch(resetPokemonNumber());
    getListData();
  }, []);

  useEffect(() => {
    dispatch(resetPokemonNumber());
    setValue('A');
  }, [number]);

  useEffect(() => {
    doActionGetPokemonNumber();
  }, [Poke]);

  const changePokemon = type => {
    if (type === 'next') {
      dispatch(getPokemonDetail(number + 1));
      setNumber(number + 1);
    } else {
      dispatch(getPokemonDetail(number - 1));
      setNumber(number - 1);
    }
  };

  return (
    <SafeAreaView>
      <Swipeable
        friction={8}
        overshootFriction={8}
        onSwipeableRightWillOpen={() => {
          changePokemon('next');
        }}
        onSwipeableLeftWillOpen={() => {
          changePokemon('prev');
        }}
        renderRightActions={() => {
          return <Text> </Text>;
        }}
        renderLeftActions={() => {
          return <Text> </Text>;
        }}>
        {'number' in Poke ? (
          <ScrollView>
            <SearchBar placeholder="Search your pokemon ..." />
            {/* Top Bar */}
            <View style={styles.textCenter}>
              <Text style={styles.bigText}>{Poke.name}</Text>
            </View>

            {/* Poke Container */}
            <View style={[styles.PokeContainer, styles.paddingContainer]}>
              {number > 1 ? (
                <TouchableOpacity onPress={() => changePokemon('prev')}>
                  <AntDesign
                    name="left"
                    size={moderateScale(32)}
                    color="black"
                  />
                </TouchableOpacity>
              ) : null}
              <FastImage
                source={{uri: Poke.sprite}}
                style={{width: moderateScale(200), height: moderateScale(120)}}
                resizeMode="contain"
              />
              <TouchableOpacity onPress={() => changePokemon('next')}>
                <AntDesign
                  name="right"
                  size={moderateScale(32)}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            {/* Detail Container */}
            <View style={[styles.RightText]}>
              <Text style={styles.bigText}>#{Poke.number}</Text>
            </View>

            {/* types */}
            <View style={styles.spaceContainer}>
              {Poke.types.map((value, index) => {
                return (
                  <Button
                    containerStyle={styles.buttonTypes}
                    title={value}
                    key={index.toString()}
                  />
                );
              })}
            </View>
            {/* criteria */}
            <View style={styles.spaceContainer}>
              <View style={styles.centerContainer}>
                <Text>Height</Text>
                <Text>{Poke.height}</Text>
              </View>
              <View style={styles.centerContainer}>
                <Text>Weight</Text>
                <Text>{Poke.weight}</Text>
              </View>
            </View>

            {/* abilities */}
            <View style={styles.textCenter}>
              <Text>Abilities</Text>
            </View>
            {/* abilites detail */}
            {/* Label */}
            <View style={styles.spaceContainer}>
              {Object.keys(Poke.abilities).map((value, index) => {
                return (
                  <View style={styles.centerContainer} key={index.toString()}>
                    <Text>{value[0].toUpperCase() + value.slice(1)}</Text>
                  </View>
                );
              })}
            </View>
            {/* abilities value */}
            <View style={styles.spaceContainer}>
              <View style={styles.centerContainer}>
                {Poke.abilities.normal.map((value, index) => {
                  return <Text key={index.toString()}>{value}</Text>;
                })}
              </View>
              <View style={styles.centerContainer}>
                {Poke.abilities.hidden.map((value, index) => {
                  return <Text key={index.toString()}>{value}</Text>;
                })}
              </View>
            </View>

            {/* label evolution */}
            <View style={styles.textCenter}>
              <Text>Evolution Line</Text>
            </View>
            <View style={styles.spaceContainer}>
              {PokeNumber.map((value, index) => {
                return (
                  <View style={styles.centerContainer} key={index.toString()}>
                    <TouchableOpacity>
                      <FastImage
                        source={{
                          uri: `https://cdn.traction.one/pokedex/pokemon/${
                            value.split(',')[0]
                          }.png`,
                        }}
                        style={{
                          width: moderateScale(200),
                          height: moderateScale(120),
                        }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    {Poke.family.evolutionLine.map((val, ind) => {
                      if (val === value.split(',')[1]) {
                        return (
                          <View style={styles.gap} key={index.toString()}>
                            <Text>{val}</Text>
                          </View>
                        );
                      } else {
                        null;
                      }
                    })}
                  </View>
                );
              })}
            </View>
          </ScrollView>
        ) : (
          <Loading />
        )}
      </Swipeable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCenter: {
    alignItems: 'center',
  },
  bigText: {
    fontSize: moderateScale(32),
    marginVertical: moderateScale(20),
  },
  PokeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  RightText: {
    alignItems: 'flex-end',
  },
  buttonTypes: {
    width: moderateScale(120),
  },
  spaceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: moderateScale(8),
  },
  gap: {
    marginVertical: moderateScale(8),
  },
  paddingContainer: {
    paddingHorizontal: widthPercentageToDP(4),
  },
});
