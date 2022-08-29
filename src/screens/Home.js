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

const Home = ({navigation}) => {
  const [charactersData, setCharactersData] = useState(() => []);
  const [spinnerVisible, setSpinnerVisible] = useState(() => false);
  /**
   * Header Design
   */
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle : 'The Breaking bad',
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
    webservice_Characters();
  }, []);

  const webservice_Characters = async () => {
    setSpinnerVisible(true)
    getServiceCall(ApiList.CHARACTERS, '')
      .then(responseJson => {
        // console.log("Response>>>", JSON.stringify(responseJson));
        if (responseJson.status == 200) {
          setCharactersData(responseJson.data);
          setSpinnerVisible(false)
        } else {
          setSpinnerVisible(false)
          console.log('Status 400>>>', JSON.stringify(responseJson));
        }
      })
      .catch(error => {
        console.log('Error>>>', JSON.stringify(error));
        setSpinnerVisible(false)
      });
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
    );
  };

  return (
    // Main container view
    <View style={styles.container}>

<NetSpinnerOverlay
                    color={Colors.COLOR_WHITE}
                    visible={spinnerVisible}
                />

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
        showsVerticalScrollIndicator = {false}
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
    backgroundColor: '#000000',
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
    fontFamily: Fonts.FONT_ITALIC,
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
