import {Image, Text, View} from 'react-native';

export const JellyBadge = ({point}: {point: number}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 25,
        width: 88,
        paddingVertical: 3,
      }}>
      <Image source={require('../../assets/Jelly.png')} />
      <Text>-{point}</Text>
    </View>
  );
};
