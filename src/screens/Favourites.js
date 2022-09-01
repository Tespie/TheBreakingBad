import React, {useEffect, useRef, useState } from 'react';
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { ApiList } from '../api/ApiList';
import { getServiceCall } from '../api/Webservice';
import NetTextLabel from '../components/NetTextLabel';
import {setrestaurentFavIdsList} from '../redux/actions/CharacterFavAction';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../utils/Size';
import { useIsFocused } from "@react-navigation/native";


const Favourites = ({navigation}) => {
  const isFocused = useIsFocused();

  const [charactersData, setCharactersData] = useState(() => []);
  const [favouritesData, setFavouritesData] = useState(() => []);
  const selector = useSelector(state => state.CharacterFavReducer);
  console.log('FAVOURITES ids in Fav first:::', selector.restaurentfavIds);
  const dispetch = useDispatch();


  /**
   * Header Design
   */
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Favourites',
      headerRight: (props) => (
          <TouchableOpacity
            style={{padding: sizeHeight(2)}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={styles.giftimg}
              source={require('../res/Images/x.png')}
            />
          </TouchableOpacity>
      ),
    });

  }, [navigation]);

  useEffect(() => {
    // webservice_Characters();
    // return;

    if(isFocused){ 
      setFavouritesData([]);
  
      setFavouritesData(selector.restaurentfavIds);
  
      console.log('FAVOURITES useLayoutEffect ids in Fav:::', selector.restaurentfavIds);
    }

    // const focusListener = navigation.addListener('focus', () => {
    //   console.log('FAVOURITES useEffect ids in Fav:::', selector.restaurentfavIds);
    //   setFavouritesData(selector.restaurentfavIds);
    // });
    
    // alert('FAVOURITES favouritesData in fav = '+favouritesData)
    // return () => focusListener;
  }, [isFocused]);

  //  API CALL
  const webservice_Characters = async () => {
    alert('trrrrrrrrrr')
    // setSpinnerVisible(true);
    getServiceCall(ApiList.CHARACTERS, '')
      .then(responseJson => {
        // console.log("Response>>>", JSON.stringify(responseJson));
        if (responseJson.status == 200) {
          setCharactersData(responseJson.data);
          // setSpinnerVisible(false);
   
          return //redux
          const newArr = responseJson.data.map(item => {
            // const newArr = charactersData.map(item => {
              return {
                ...item,
                isfavorite: 'N',
              };
            });
            setCharactersData(newArr);


        } else {
          // setSpinnerVisible(false);
          console.log('Status 400>>>', JSON.stringify(responseJson));
        }
      })
      .catch(error => {
        console.log('Error>>>', JSON.stringify(error));
        // setSpinnerVisible(false);
      });
  };
  
  const characterFavClick = async (item, index, type) => {
       
    item.isfavorite = "N"
    var test = favouritesData.map((itemNew, indexNew) => {
      if (itemNew.char_id == item.char_id) {
        
        favouritesData.splice(index, 1)
      }
  })

   console.log("FAV DATA:::",JSON.stringify(favouritesData))
   
    setFavouritesData(favouritesData);

    dispetch(setrestaurentFavIdsList(selector.restaurentfavIds, item))
   
}

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
            // alert('will be removed from fav')
            characterFavClick(item, index, 'character');
          }}
          >
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
    <View style={styles.container}>
      
      


      <FlatList
        numColumns={2}
        keyExtractor={(item, index) => index}
        renderItem={renderCharacters}
        data={favouritesData}
        // data={charactersData}
        bounces={false}
        style={{marginTop: 20, flex: 1}}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

// --------------------------------------- Css ---------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizeWidth(2),
    // backgroundColor: 'lightpink',
    backgroundColor: Colors.COLOR_BLACK,
    
  },

  rightHeaderContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor : 'blue',
    // flexGrow : 1,
    // flex : 1,
    // justifyContent : 'space-between',
    // marginLeft : sizeWidth(2),
    // width : DEVICE_WIDTH - sizeWidth(12),
    // flexWrap : 'wrap' ,
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
    // width: sizeWidth(44),
    marginHorizontal: sizeWidth(2),
    // margin: sizeWidth(1),
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
  },

});

export default Favourites;
