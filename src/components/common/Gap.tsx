import {View} from 'react-native';

export const Gap = ({size}: {size: number}) => {
  return (
    <View style={{width: '100%', height: size, backgroundColor: '#ddd'}} />
  );
};
