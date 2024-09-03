import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import styled from 'styled-components/native';

export const Loading = () => {
  const dot1Anim = useRef(new Animated.Value(0)).current;
  const dot2Anim = useRef(new Animated.Value(0)).current;
  const dot3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const bounce = (anim: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: -10,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.delay(delay),
        ]),
      ).start();
    };

    bounce(dot1Anim, 150);
    bounce(dot2Anim, 300);
    bounce(dot3Anim, 450);
  }, [dot1Anim, dot2Anim, dot3Anim]);

  return (
    <Container>
      <Dot style={{transform: [{translateY: dot1Anim}]}} />
      <Dot style={{transform: [{translateY: dot2Anim}]}} />
      <Dot style={{transform: [{translateY: dot3Anim}]}} />
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 40px;
`;

const Dot = styled(Animated.View)`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #391d5d;
  margin: 0 5px;
`;
