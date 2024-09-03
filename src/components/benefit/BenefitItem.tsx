import {Image, Text} from 'react-native';
import {JellyBadge} from './JellyBadge';
import {navigate} from '../../utils/rootNavigation';
import {getSlicedDateByMonth} from '../../utils/date';
import {BenefitItemType} from '../../types/benefit/internal';
import styled from 'styled-components/native';

export const BenefitItem = (props: BenefitItemType) => {
  const {image, title, point, date_to, view_count, book_count, id, is_active} =
    props;

  return (
    <ItemContainer
      onPress={() =>
        navigate('Detail', {
          id: id,
        })
      }>
      <TitleWrapper>
        <ProfileImage>
          <Image source={{uri: image}} style={{width: 40, height: 40}} />
        </ProfileImage>
        <Text>{id}</Text>
      </TitleWrapper>
      <ContentBox>
        <ContentText>{title}</ContentText>
        <ContentImage source={{uri: image}} />
        {!is_active && <ClosedText>closed</ClosedText>}
      </ContentBox>
      <JellyBadge point={point} />
      <FooterBox>
        <Text>{getSlicedDateByMonth(date_to)}</Text>
        <ReactionWrapper>
          <EyeWrapper>
            <Image source={require('../../assets/eye.png')} />
            <Text>{view_count}</Text>
          </EyeWrapper>
          <BookMarkWrapper>
            <Image source={require('../../assets/like.png')} />
            <Text>{book_count}</Text>
          </BookMarkWrapper>
        </ReactionWrapper>
      </FooterBox>
    </ItemContainer>
  );
};

const ItemContainer = styled.Pressable`
  width: 100%;
  padding: 20px;
`;

const TitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfileImage = styled.View`
  overflow: hidden;
  border-radius: 100px;
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const ContentBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

const ContentText = styled.Text`
  position: relative;
  width: 50%;
`;

const ContentImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 6px;
`;

const ClosedText = styled.Text`
  width: 100px;
  height: 100px;
  background-color: #000000;
  opacity: 0.5;
  color: #ffffff;
  text-align: center;
  justify-content: center;
  align-items: center;
  line-height: 100px;
  position: absolute;
  right: 0px;
  border-radius: 6px;
`;

const FooterBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

const ReactionWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const EyeWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const BookMarkWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;
