import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Alert,
  Text,
  TouchableHighlight,
} from 'react-native';
import NetTextLabel from '../components/NetTextLabel';
import {getServiceCall} from '../api/Webservice';
import {ApiList} from '../api/ApiList';
import {sizeFont, sizeWidth} from '../utils/Size';
import {Fonts} from '../utils/Fonts';
import {Strings} from '../utils/Strings';
import {Colors} from '../utils/Colors';
import NetSpinnerOverlay from '../components/NetSpinnerOverlay';
import {setrestaurentFavIdsList} from '../redux/actions/CharacterFavAction';
import {useDispatch, useSelector} from 'react-redux';
import { initializeUseSelector } from 'react-redux/es/hooks/useSelector';

const Home = ({navigation}) => {
  const [charactersData, setCharactersData] = useState(() => []);
  const [spinnerVisible, setSpinnerVisible] = useState(() => false);
  const [search, setSearch] = useState('');

  // REDUX
  const dispetch = useDispatch();
  const selector = useSelector(state => state.CharacterFavReducer);
  const [favouritesData, setFavouritesData] = useState(() => []);

  /**
   * Header Design
   */
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'The Breaking bad',
      headerRight: () => (
        <View style={{marginRight: sizeWidth(2), flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Search');
            }}>
            <Image
              style={styles.imgSearch}
              source={require('../res/Images/search.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Favourites');
            }}>
            <Image
              style={styles.imgFilled}
              source={require('../res/Images/heartfill.png')}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {

    // setFavouritesData(selector.restaurentfavIds); // DELETE
    webservice_Characters();
    // navigation.setOptions({
    //   headerSearchBarOptions: {
    //     // onChangeText: (event) => setSearch(event.nativeEvent.text),
    //     onChangeText: (event) => setSearch('ffgfg'),
    //   }
    // });


    // REDUX- GET FAVS here
    // setFavouritesData(selector.restaurentfavIds);

    const focusListener = navigation.addListener('focus', () => {
      console.log('HOME useEffect ids in Fav:::', selector.restaurentfavIds);
      
    });

    return () => focusListener;


    // REDUX
    // const newArr = favouritesData.map(item => {
    // // const newArr = charactersData.map(item => {
    //   return {
    //     ...item,
    //     isfavorite: 'N',
    //   };
    // });
    // setFavouritesData(newArr);
    setTimeout(() => {
      console.log('favouritesDataArray::', JSON.stringify(favouritesData));
    }, 2000);
  }, []);

  const webservice_Characters = async () => {
    setSpinnerVisible(true);
    getServiceCall(ApiList.CHARACTERS, '')
      .then(responseJson => {
        // console.log("Response>>>", JSON.stringify(responseJson));
        if (responseJson.status == 200) {
          // setCharactersData(responseJson.data);
          setSpinnerVisible(false);

          // var test = selector.restaurentfavIds;
          // alert('test = ' + test);
          // alert('testfied = ' + JSON.stringify(test));
          // alert("favouritesData type = "+typeof favouritesData);
          // alert('1 = ' + JSON.stringify(favouritesData));
          var favids = selector.restaurentfavIds.map(item => item.char_id);
          favids =  Object.values(favids);
          // alert("favids = "+JSON.stringify(favids));
          // alert("favids = "+typeof favids);
          // alert("favids = "+favids.includes(item.char_id));
          

          //redux
          const newArr = responseJson.data.map(item => {
            // console.log("favids has  = "+favids.includes(item.char_id));
            // const newArr = charactersData.map(item => {
              if(favids.includes(item.char_id)){

                return {
                  ...item,
                  // favids.inclu
                  // isfavorite: 'N',
                  isfavorite: 'Y',
                };

              } else {
                return {
                  ...item,
                  // favids.inclu
                  // isfavorite: 'N',
                  isfavorite: 'N',
                };

              }
            // return {
            //   ...item,
            //   // favids.inclu
            //   // isfavorite: 'N',
            //   isfavorite: favids.includes(item.char_id) ? 'Y' :  'N',
            // };
          });
          setCharactersData(newArr);
        } else {
          setSpinnerVisible(false);
          console.log('Status 400>>>', JSON.stringify(responseJson));
        }
      })
      .catch(error => {
        console.log('Error>>>', JSON.stringify(error));
        setSpinnerVisible(false);
      });
  };

  const characterFavClick = async (item, index, type) => {
    // const newRestaurantList = favouritesData;
    const newRestaurantList = charactersData;
    let events = [...newRestaurantList];
    // console.log('events::', JSON.stringify(events));
    events.map(obj => {
      if (obj.char_id == item.char_id) {
        obj.isfavorite == 'Y' ? (obj.isfavorite = 'N') : (obj.isfavorite = 'Y');
      }
    });
    // console.log("item::",JSON.stringify(item))
    setFavouritesData(events);
    console.log('item::', JSON.stringify(item));
    console.log('item isfavorite ::', item.isfavorite);
    dispetch(setrestaurentFavIdsList(selector.restaurentfavIds, item));
    console.log('ids::', selector.restaurentfavIds);
  };

  const renderCharacters = ({item, index}) => {
    return (
      <View
        style={styles.viewMain}
        // onPress={() => {alert('Hey you clicked')}}
      >
        <TouchableHighlight
          onPress={() => {
            // alert('item'+item)
            // alert('Hey you clicked TouchableHighlight');
            navigation.navigate('Details', {character: item});
          }}>
          <Image style={styles.img} source={{uri: item.img}} />
        </TouchableHighlight>
        {/* <View style={styles.viewTxt}> */}
        <View style={styles.nameAndHeartView}>
          {/* <Text style={{fontFamily  : Fonts.FONT_ITALIC , fontSize : 20 }}>dfdfd</Text> */}
          <NetTextLabel
            numberOfLines={1}
            style={styles.txtName}
            label={item.name}
          />
          <TouchableOpacity
            onPress={() => {
              // alert('add me to Favourites')
              characterFavClick(item, index, 'character');
            }}>

            {/* <Image style={styles.imgFavourite} source={require('../res/Images/heart.png')} /> */}

            <Image
              style={[styles.imgFavourite, {tintColor : item.isfavorite == 'N' ? Colors.COLOR_GRAY67 : Colors.COLOR_GREEN  } ]}
              source={item.isfavorite == 'N'  ? require('../res/Images/heart.png') : require('../res/Images/heartfill.png')}
            /> 
          </TouchableOpacity>
        </View>
        <View>
          <NetTextLabel
            numberOfLines={1}
            style={styles.txtNickname}
            label={item.nickname}
          />
        </View>
        {/* </View> */}
      </View>
    );
  };

  return (
    // Main container view
    <View style={styles.container}>
      <NetSpinnerOverlay color={Colors.COLOR_WHITE} visible={spinnerVisible} />

      {/* <View style={{ backgroundColor : 'red',flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <NetTextLabel
            numberOfLines={1}
            style={styles.txtTop}
            label={Strings.THEBREAK}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Search');
          }}>
          <Image
            style={styles.imgSearch}
            source={require('../res/Images/search.png')}
          />
        </TouchableOpacity>
        <Image
          style={styles.imgFilled}
          source={require('../res/Images/heartfill.png')}
        />
      </View> */}

      <FlatList
        data={charactersData}
        renderItem={renderCharacters}
        bounces={false}
        // horizontal
        numColumns={2}
        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

// --------------------------------------- Css ---------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizeWidth(2),
    backgroundColor: Colors.COLOR_BLACK,
    // backgroundColor: 'lightpink',
  },
  nameAndHeartView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    padding: sizeWidth(2),
    paddingRight: 0,
    paddingBottom: 0,
  },
  // viewTxt: {
  //   // flexDirection: 'row',
  //   // backgroundColor: 'green',
  //   flex: 1,
  // },
  img: {
    borderRadius: sizeWidth(2),
    height: sizeWidth(57),
    width: sizeWidth(44),
  },
  viewMain: {
    borderRadius: sizeWidth(2),
    marginTop: sizeWidth(9),
    backgroundColor: Colors.COLOR_BLACK,
    width: sizeWidth(44),
    marginHorizontal: sizeWidth(2),
    margin: sizeWidth(1),
  },
  txtName: {
    color: '#FFFFFF',
    fontFamily: Fonts.FONT_BOLD,
    fontSize: sizeFont(4.5),
  },
  txtNickname: {
    color: Colors.COLOR_WHITE,
    // color: 'gray',
    fontSize: sizeFont(4),
    fontFamily: Fonts.FONT_LIGHT,
    padding: sizeWidth(2),
    paddingTop: 0,
    // backgroundColor : 'red'
  },
  txtTop: {
    color: '#FFFFFF',
    fontFamily: Fonts.FONT_BOLD,
    fontSize: sizeFont(6),
  },
  imgFavourite: {
    // tintColor: Colors.COLOR_GREEN,
    height: sizeWidth(6),
    width: sizeWidth(6),
    tintColor: 'gray',
  },
  imgSearch: {
    tintColor: '#FFFFFF',
    height: sizeWidth(7),
    width: sizeWidth(7),
  },
  imgFilled: {
    tintColor: Colors.COLOR_GREEN,
    marginLeft: sizeWidth(5),
    height: sizeWidth(7),
    width: sizeWidth(7),
  },
});

export default Home;
