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
  TextInput,
} from 'react-native';
import NetTextLabel from '../components/NetTextLabel';
import {getServiceCall} from '../api/Webservice';
import {ApiList} from '../api/ApiList';
import {sizeFont, sizeHeight, sizeWidth} from '../utils/Size';
import {Fonts} from '../utils/Fonts';
import {Strings} from '../utils/Strings';
import {Colors} from '../utils/Colors';
import NetSpinnerOverlay from '../components/NetSpinnerOverlay';
import {setrestaurentFavIdsList} from '../redux/actions/CharacterFavAction';
import {useDispatch, useSelector} from 'react-redux';
import { initializeUseSelector } from 'react-redux/es/hooks/useSelector';
import Character from '../components/Character';





const Search = ({navigation}) => {
  // --------------------------------------- States ---------------------------------------
  const [search, setSearch] = useState('');
  // const [charactersData, setCharactersData] = useState(() => [[]]);
  const [charactersData, setCharactersData] = useState([]);
  const [spinnerVisible, setSpinnerVisible] = useState(() => false);

  // REDUX
  const dispetch = useDispatch();
  const selector = useSelector(state => state.CharacterFavReducer);
  const [favouritesData, setFavouritesData] = useState(() => []);



  // --------------------------------------- Main Design  ---------------------------------------
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      // headerRight: (props) => (
      //   <View style={styles.rightHeaderContainer}>
      //     <TextInput
      //       style={styles.searchTxtInput}
      //       placeholder="Search"
      //       placeholderTextColor={Colors.COLOR_GRAY67}
      //       value={search}
      //       // onChangeText={text => {
      //       //   console.warn('oct text=',text)
      //       //   // let string = text.replace(/\s+/g, ' ');
      //       //   setSearch(text);
      //       //   // searchContact(string)
      //       // }}
      //       onChangeText={ (text) => {
      //         console.warn('oct text=',text)
      //         // let string = text.replace(/\s+/g, ' ');
      //         return setSearch(text);
      //         // searchContact(string)
      //       }}
      //     />
      //     <TouchableOpacity
      //       style={{padding: sizeHeight(2)}}
      //       onPress={() => {
      //         navigation.goBack();
      //       }}>
      //       <Image
      //         style={styles.giftimg}
      //         source={require('../res/Images/x.png')}
      //       />
      //     </TouchableOpacity>
      //   </View>
      // ),
    });
  }, [navigation]);

  useEffect(() => {
    // callSearchAPI();
    // navigation.setOptions({
    //   headerSearchBarOptions: {
    //     // onChangeText: (event) => setSearch(event.nativeEvent.text),
    //     onChangeText: (event) => setSearch('ffgfg'),
    //   }
    // });
  }, []);

  const callSearchAPI = async () => {
    setSpinnerVisible(true);
    getServiceCall(ApiList.CHARACTERS + '?name=' + search, '')
      .then(responseJson => {
        // console.log("Response>>>", JSON.stringify(responseJson));
        if (responseJson.status == 200) {
          setCharactersData(responseJson.data);
          setSpinnerVisible(false);

          // Get Fav Ids
          var favids = selector.restaurentfavIds.map(item => item.char_id);
          favids =  Object.values(favids);

          //redux
          const newArr = responseJson.data.map(item => {
            // console.log("favids has  = "+favids.includes(item.char_id));
            // const newArr = charactersData.map(item => {
              
            return {
              ...item,
              // favids.inclu
              // isfavorite: 'N',
              isfavorite: favids.includes(item.char_id) ? 'Y' :  'N',
            };
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
    // console.log('item::', JSON.stringify(item));
    // console.log('item isfavorite ::', item.isfavorite);
    dispetch(setrestaurentFavIdsList(selector.restaurentfavIds, item));
    // console.log('ids::', selector.restaurentfavIds);
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

      <View style={styles.rightHeaderContainer}>
        <TouchableOpacity
          style={{padding: sizeHeight(2)}}
          onPress={() => {
            // alert('arrow pressed')
            navigation.goBack();
          }}>
          <Image
            style={[styles.giftimg, {height : sizeHeight(3)}]}
            source={require('../res/Images/lefticon.png')}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.searchTxtInput}
          placeholder="Search"
          placeholderTextColor={Colors.COLOR_GRAY67}
          value={search}
          onChangeText={text => {
            // console.warn('oct text=', text);
            //  let string = text.replace(/\s+/g, ' ');
            setSearch(text);
             if(text.length >1)  callSearchAPI() 
          }}
          
        />
        <TouchableOpacity
          style={{padding: sizeHeight(2)}}
          onPress={() => {
            // alert('x pressed')
            navigation.goBack();
          }}>
          <Image
            style={styles.giftimg}
            source={require('../res/Images/x.png')}
          />
        </TouchableOpacity>
      </View>

      {!charactersData.length ? (
        <View style={{padding: sizeWidth(3)}}>
          <NetTextLabel
            numberOfLines={1}
            style={[styles.txtNoResult, {color: Colors.COLOR_GREEN}]}
            label="No character found"
          />
          <NetTextLabel
            numberOfLines={1}
            style={styles.txtNoResult}
            label="Try again"
          />
        </View>
      ) : (
        <FlatList
          data={charactersData}
          // renderItem={charactersData.length > 0 ? renderCharacters : null}
          // renderItem={renderCharacters}
          renderItem={(item,index)=> <Character characterData={item.item} characterFavClick={()=>characterFavClick(item.item,index)} navigation={navigation} />}
          bounces={true}
          // horizontal
          numColumns={2}
          nestedScrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

// --------------------------------------- Css ---------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizeWidth(2),
    backgroundColor: '#000000',
    // backgroundColor: 'skyblue',
  },
  rightHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor : 'blue',
    // flexGrow : 1,
    // flex : 1,
    // justifyContent : 'space-between',
    // marginLeft : sizeWidth(2),
    // width : DEVICE_WIDTH - sizeWidth(12),
    // flexWrap : 'wrap' ,
  },

  searchTxtInput: {
    // fontFamily: Fonts.FONT_MEDIUM,
    width: sizeWidth(75),
    // width: DEVICE_WIDTH - sizeWidth(10),

    fontSize: sizeFont(7),
    // marginLeft: sizeWidth(10),
    color: Colors.COLOR_WHITE,
    fontWeight: '100',
    // backgroundColor: 'skyblue',
  },
  giftimg: {
    height: sizeHeight(2),
    width: sizeHeight(2),
    tintColor: Colors.COLOR_WHITE,
    // backgroundColor : 'red'
  },

  // Flat list style
  viewMain: {
    borderRadius: sizeWidth(2),
    marginTop: sizeWidth(9),
    backgroundColor: Colors.COLOR_BLACK,
    width: sizeWidth(44),
    marginHorizontal: sizeWidth(2),
    margin: sizeWidth(1),
  },
  img: {
    borderRadius: sizeWidth(2),
    height: sizeWidth(57),
    width: sizeWidth(44),
  },
  nameAndHeartView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    padding: sizeWidth(2),
    paddingRight: 0,
    paddingBottom: 0,
  },
  txtName: {
    color: '#FFFFFF',
    fontFamily: Fonts.FONT_BOLD,
    fontSize: sizeFont(4.5),
    flex : 0.9
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
  txtNoResult: {
    color: Colors.COLOR_WHITE,
    fontSize: sizeFont(5),
    fontFamily: Fonts.FONT_LIGHT,
    fontWeight: '300',
  },
  imgFavourite: {
    // tintColor: Colors.COLOR_GREEN,
    height: sizeWidth(6),
    width: sizeWidth(6),
    tintColor: 'gray',
    flex : 0.1
  },
});

export default Search;
