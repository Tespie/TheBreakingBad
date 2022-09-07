import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import NetTextLabel from '../components/NetTextLabel';
import {sizeFont, sizeWidth} from '../utils/Size';
import {Fonts} from '../utils/Fonts';
import {Colors} from '../utils/Colors';
import PropTypes from 'prop-types';



const Character = (props) => {
// function Character () {
// export default Character = (props) => {

  const [input, setInput] = useState('');

  const {
    // characterData : PropTypes.any
    characterData,
    characterFavClick,
    navigation
} = props

  //ComponentDidUpdate
  useEffect(() =>{
    // console.log('character comp useeffect called characterData='+JSON.stringify(characterData))

    var data = JSON.stringify(characterData)
    // var data = characterData
    // console.log('character comp useeffect called characterData='+data)
  });

  // let characterData = characterData.item

  return (
    
      <View
        style={styles.viewMain}
        // onPress={() => {alert('Hey you clicked')}}
      >
        <TouchableHighlight
          onPress={() => {
            // alert('item'+item)
            // alert('Hey you clicked TouchableHighlight');
            navigation.navigate('Details', {character: characterData});
          }}>
          <Image style={styles.img} source={{uri: characterData.img}} />
        </TouchableHighlight>
        {/* <View style={styles.viewTxt}> */}
        <View style={styles.nameAndHeartView}>
          {/* <Text style={{fontFamily  : Fonts.FONT_ITALIC , fontSize : 20 }}>dfdfd</Text> */}
          <NetTextLabel
            numberOfLines={1}
            style={styles.txtName}
            // label={"dfhkdjfjdkfhj"}
            label={characterData.name}
          />
          <TouchableOpacity
            onPress={() => {
              // alert('add me to Favourites')
              // characterFavClick(item, index, 'character');
              characterFavClick();
            }}>

            {/* <Image style={styles.imgFavourite} source={require('../res/Images/heart.png')} /> */}

            <Image
              style={[styles.imgFavourite, {tintColor : characterData.isfavorite == 'N' ? Colors.COLOR_GRAY67 : Colors.COLOR_GREEN  } ]}
              source={characterData.isfavorite == 'N'  ? require('../res/Images/heart.png') : require('../res/Images/heartfill.png')}
            /> 
          </TouchableOpacity>
        </View>  
        <View>
          <NetTextLabel
            numberOfLines={1}
            style={styles.txtNickname}
            label={characterData.nickname}
          />
        </View>
        {/* </View> */}
      </View>
    );
};

Character.propTypes  = {
  characterData : PropTypes.any,
  characterFavClick : PropTypes.func,
  navigation : PropTypes.any,
}

Character.defaultProps  = {

}


const styles = StyleSheet.create({
  viewMain: {
    borderRadius: sizeWidth(2),
    marginTop: sizeWidth(9),
    backgroundColor: Colors.COLOR_BLACK,
    width: sizeWidth(44),
    marginHorizontal: sizeWidth(2),
    margin: sizeWidth(1),
    
    //DLT
    // borderColor : 'red',
    // borderWidth : 2,

  },
  img: {
    borderRadius: sizeWidth(2),
    height: sizeWidth(55),
    // width: sizeWidth(44), // will bring image out of "viewMain"
  },

  nameAndHeartView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    padding: sizeWidth(2),
    paddingRight: 0,
    paddingBottom: 0,
    // flexWrap : 'nowrap',
    // flexShrink : 1
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
  imgFavourite: {
    // tintColor: Colors.COLOR_GREEN,
    height: sizeWidth(6),
    width: sizeWidth(6),
    tintColor: 'gray',
    flex : 0.1
  },




})

export default Character;
