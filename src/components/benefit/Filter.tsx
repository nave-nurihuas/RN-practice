import {Image, Pressable, View} from 'react-native';
import {Checkbox} from '../common/Checkbox';

interface Props {
  hideChecked: boolean;
  toggleCheckbox: () => void;
  align: 'thumbnail' | 'list';
  toggleAlign: () => void;
}

export const Filter = (props: Props) => {
  const {hideChecked, toggleAlign, align, toggleCheckbox} = props;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
      }}>
      <Checkbox
        label="Hide closed campaign"
        checked={hideChecked}
        onCheckChange={toggleCheckbox}
      />
      <Pressable onPress={toggleAlign}>
        {align === 'thumbnail' ? (
          <Image source={require('../../assets/thumbnails.png')} />
        ) : (
          <Image source={require('../../assets/list.png')} />
        )}
      </Pressable>
    </View>
  );
};
