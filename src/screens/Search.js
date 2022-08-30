import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Pressable,
  TextInput,
  Text,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import {ApiList} from '../api/ApiList';
import {getServiceCall} from '../api/Webservice';
import NetSpinnerOverlay from '../components/NetSpinnerOverlay';
import NetTextLabel from '../components/NetTextLabel';
import {Colors} from '../utils/Colors';
import {Fonts} from '../utils/Fonts';
import {DEVICE_WIDTH, sizeFont, sizeHeight, sizeWidth} from '../utils/Size';

const Search = ({navigation}) => {
  // --------------------------------------- States ---------------------------------------
  const [search, setSearch] = useState('');
  // const [charactersData, setCharactersData] = useState(() => [[]]);
  const [charactersData, setCharactersData] = useState([]);
  const [spinnerVisible, setSpinnerVisible] = useState(() => false);

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

  const renderCharacters = ({item, index}) => {
    // alert('length ='+charactersData.length)
    return charactersData.length ? (
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
          <TouchableOpacity onPress={() => alert('add me to Favourites')}>
            <Image
              style={styles.imgFavourite}
              source={require('../res/Images/heart.png')}
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
    ) 
    : null;
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
          renderItem={charactersData.length > 0 ? renderCharacters : null}
          // renderItem={renderCharacters}
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

export default Search;
