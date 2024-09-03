import {Text, TouchableOpacity, View} from 'react-native';

interface Props {
  defaultChecked?: boolean;
  checked: boolean;
  onCheckChange: (value: boolean) => void;
  label?: string;
  align?: 'horizontal' | 'vertical';
}

export const Checkbox = (props: Props) => {
  const {label, align = 'horizontal', checked, onCheckChange} = props;

  return (
    <View
      style={{
        flexDirection: align === 'horizontal' ? 'row' : 'column',
        gap: 10,
      }}>
      <TouchableOpacity
        style={{
          borderColor: '#391D5D',
          borderWidth: 1.5,
          borderRadius: 4,
          backgroundColor: checked ? '#391D5D' : '#ffffff',
          width: 20,
          height: 20,
        }}
        onPress={() => onCheckChange(!checked)}>
        {checked ? (
          <Text style={{color: '#ffffff', textAlign: 'center', lineHeight: 0}}>
            ✔︎
          </Text>
        ) : null}
      </TouchableOpacity>
      <Text>{label}</Text>
    </View>
  );
};
