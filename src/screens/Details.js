import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  Text,
} from 'react-native';
import NetTextLabel from '../components/NetTextLabel';
import {getServiceCall} from '../api/Webservice';
import {ApiList} from '../api/ApiList';
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  sizeFont,
  sizeHeight,
  sizeWidth,
} from '../utils/Size';
import {Fonts} from '../utils/Fonts';
import {Strings} from '../utils/Strings';
import {Colors} from '../utils/Colors';
import {shouldUseActivityState} from 'react-native-screens';
import moment from 'moment';
const Details = ({route, navigation}) => {
  const {character} = route.params;

  const [charactersData, setCharactersData] = useState(() => []);
  const [dob, setDob] = useState(() => moment(new Date()).format('DD-MMM-YYYY'));

  /**
   * Header Design
   */
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('Search');
            alert('i will go to Favourites')
          }}>
          <Image
            style={styles.imgFilled}
            source={require('../res/Images/heartfill.png')}
          />
        </TouchableOpacity>
      ),
      headerTitle : '',
    });
  }, [navigation]);

  useEffect(() => {
    // webservice_Characters();
    // alert(character.name)
  }, []);

  // const webservice_Characters = async () => {
  //   getServiceCall(ApiList.CHARACTERS, "")
  //     .then((responseJson) => {
  //       console.log("Response>>>", JSON.stringify(responseJson));
  //       if (responseJson.status == 200) {
  //         setCharactersData(responseJson.data);
  //       } else {
  //         console.log("Status 400>>>", JSON.stringify(responseJson));
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Error>>>", JSON.stringify(error));
  //     });
  // };

  return (
    // Main container view
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topViewContainer}>
          {/* <View style={{}}> */}
          <Image
            // resizeMethod="resize"
            // resizeMode="cover"
            style={styles.imgBg}
            source={{uri: character.img}}
          />

          <View style={styles.overlayImgContainer}>
            <Image style={styles.img} source={{uri: character.img}} />

            <NetTextLabel
              numberOfLines={1}
              style={styles.txtName}
              label={character.name}
            />
            <NetTextLabel
              numberOfLines={1}
              style={styles.txtNickname}
              label={character.nickname}
            />
            <NetTextLabel
              numberOfLines={1}
              style={styles.txtStatus}
              label={character.status}
            />
          </View>
        </View>

        {/* PORTRAYED */}
        <View style={[styles.portyaedAndDobContainer,styles.sectionmargins]}>
          <View>
            <NetTextLabel
              numberOfLines={1}
              style={styles.txtDetailTitle}
              label="Portrayed"
            />
            <NetTextLabel
              numberOfLines={1}
              style={styles.txtDetailDesc}
              label={character.portrayed}
            />
          </View>


          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <NetTextLabel
                numberOfLines={1}
                style={styles.txtDetailDesc}
                label={character.birthday != "Unknown" ? moment(character.birthday,'DD-MM-YYYY').format('DD-MMMM-YYYY') : "Unknown"}
              />
              {/* <Text>Date : {{moment().format()}}</Text> */}
              <Image
                style={styles.giftimg}
                source={require('../res/Images/gift.png')}
              />
            </View>
          </View>
        </View>

        {/* OCCUPATION */}
        <View style={styles.sectionmargins}>
          <View>
            <NetTextLabel
              numberOfLines={1}
              style={styles.txtDetailTitle}
              label="Occupation"
            />
            <View>
              {character.occupation.map((item, key) => (
                <NetTextLabel
                  numberOfLines={1}
                  style={styles.txtDetailDesc}
                  label={item}
                />
              ))}
            </View>
          </View>
        </View>

        {/* APPEARED IN  */}
        <View style={[styles.sectionmargins,{marginRight: 0}]}>
          <View>
            <NetTextLabel
              numberOfLines={1}
              style={styles.txtDetailTitle}
              label="Appeared in"
            />
            <View  style={{flex: 1, flexDirection: 'row', marginTop: sizeHeight(2)}}>
              <ScrollView horizontal={true}>
              {character.appearance.map((item, key) => (
                <NetTextLabel
                  style={[styles.txtDetailDesc, styles.txtSeason]}
                  label={'Season ' + item}
                />
              ))}
              </ScrollView>
            </View>
          </View>
        </View>

        {/* ORHER CHARACTERS  */}
        <View style={styles.sectionmargins}>
            <NetTextLabel
              numberOfLines={1}
              style={styles.txtName}
              label="Other characters"
            />

            <Text
              style={[styles.txtName , {fontSize : sizeFont(5),color : 'blue'}]}>
              PENDING : Understand Functionality{"\n"}Before Development'
              </Text>
        </View>

      </ScrollView>
    </View>
  );
};

// --------------------------------------- Css ---------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: sizeWidth(2),
    backgroundColor: '#000000',
    // backgroundColor: "lightpink",
  },
  topViewContainer: {
    flex: 1,
    // height: (DEVICE_HEIGHT * 3) / 5,
    // height: 450,
    height: sizeHeight(60),
    // justifyContent : 'center',
    alignItems: 'center',
    // backgroundColor : 'red'
  },
  viewTxt: {flexDirection: 'row', backgroundColor: 'transparent'},
  imgBg: {
    // borderRadius: sizeWidth(2),
    // height: DEVICE_HEIGHT / 1.5,
    height: sizeHeight(60),
    width: DEVICE_WIDTH,
    opacity: 0.2,
    // opacity : 0.4
  },
  overlayImgContainer: {
    // zIndex: 10,
    // resizeMode: 'contain',
    position: 'absolute',
    bottom: DEVICE_HEIGHT / 30,
    borderRadius: 20,
    // justifyContent : 'center',
    alignItems: 'center',
  },
  img: {
    // borderRadius: sizeWidth(2),
    // height: sizeHeight(10),
    height: DEVICE_HEIGHT / 4,
    // height: DEVICE_HEIGHT / 5,
    // width: DEVICE_WIDTH / 3,
    width: sizeWidth(40),

    //below
    // zIndex: 10,
    // resizeMode: 'contain',
    // position: 'absolute',
    // bottom: DEVICE_HEIGHT / 8,
    borderRadius: 7,
  },
  viewMain: {
    borderRadius: sizeWidth(2),
    marginTop: sizeWidth(9),
    backgroundColor: '#000000',
    width: sizeWidth(44),
    marginHorizontal: sizeWidth(2),
    margin: sizeWidth(1),
  },
  txtName: {
    color: Colors.COLOR_WHITE,
    fontSize: sizeFont(7),
    fontFamily: Fonts.FONT_BOLD,
    fontWeight: '700',
    marginTop: sizeHeight(2),
  },
  txtNickname: {
    color: Colors.COLOR_WHITE,
    fontSize: sizeFont(4),
    fontFamily: Fonts.FONT_LIGHT,
    fontWeight: '300',
  },
  txtStatus: {
    color: Colors.COLOR_CALIFORNIA_SUNSET,
    fontSize: sizeFont(4),
    fontFamily: Fonts.FONT_LIGHT,
    fontWeight: '500',
  },

  sectionmargins : {
    marginTop: sizeHeight(4), 
    marginLeft: sizeWidth(4),
    marginRight: sizeWidth(4),
  },

  portyaedAndDobContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.COLOR_BLACK,
  },

  txtDetailTitle: {
    color: Colors.COLOR_GREEN,
    fontSize: sizeFont(4),
    fontFamily: Fonts.FONT_LIGHT,
    fontWeight: '500',
  },
  txtDetailDesc: {
    color: Colors.COLOR_WHITE,
    fontSize: sizeFont(4),
    fontFamily: Fonts.FONT_LIGHT,
    fontWeight: '300',
  },
  giftimg: {
    height: sizeHeight(2),
    width: sizeHeight(2),
    marginLeft: sizeWidth(3),
  },
  txtSeason: {
    backgroundColor: 'gray',
    marginRight: sizeWidth(2),
    padding: sizeWidth(1),
    paddingLeft: sizeWidth(3),
    paddingRight: sizeWidth(3),
    borderRadius: 5,
  },
  txtTop: {
    color: '#FFFFFF',
    fontFamily: Fonts.FONT_BOLD,
    fontSize: sizeFont(6),
  },
  imgFavourite: {
    // tintColor: Colors.COLOR_GREEN,
    height: sizeWidth(7),
    width: sizeWidth(7),
    tintColor: 'gray',
  },
  imgSearch: {
    tintColor: '#FFFFFF',
    height: sizeWidth(7),
    width: sizeWidth(7),
  },
  imgFilled: {
    tintColor: Colors.COLOR_GREEN,
    marginRight: sizeWidth(5),
    height: sizeWidth(7),
    width: sizeWidth(7),
  },
});

export default Details;
