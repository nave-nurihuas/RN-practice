import {PropsWithChildren, useEffect, useRef} from 'react';
import {Animated, Pressable, View} from 'react-native';

export const Modal = ({
  children,
  opened,
  close,
}: PropsWithChildren<{opened: boolean; close: () => void}>) => {
  const translateYValue = useRef(new Animated.Value(1000)).current;
  const opacityValue = translateYValue.interpolate({
    inputRange: [100, 1000],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const dimmedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (opened) {
      Animated.parallel([
        Animated.timing(translateYValue, {
          toValue: 100,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(dimmedValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateYValue, {
          toValue: 1000,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(dimmedValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(close);
    }
  }, [opened]);

  return (
    <>
      <View style={{position: 'absolute', top: 30, left: 35, zIndex: 99}}>
        <Animated.View
          style={[
            {
              opacity: opacityValue,
              transform: [{translateY: translateYValue}],
            },
          ]}>
          {opened ? children : null}
        </Animated.View>
      </View>
      {opened && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              opacity: dimmedValue,
            },
          ]}>
          <Pressable
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}
            onPress={close}
          />
        </Animated.View>
      )}
    </>
  );
};
