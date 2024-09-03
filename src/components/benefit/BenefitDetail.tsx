import {
  Animated,
  Easing,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useGetBenefitDetail,
  usePatchBenefitDetail,
} from '../../hooks/benefit/queries';
import {JellyBadge} from './JellyBadge';
import {Gap} from '../common/Gap';
import {Modal} from '../common/Modal';
import {useEffect, useRef, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import reactotron from 'reactotron-react-native';
import {useRoute} from '@react-navigation/native';
import styled from 'styled-components/native';
import {getSlicedDateByMonth} from '../../utils/date';
import {Loading} from '../common/Loading';

export const BenefitDetail = () => {
  const route = useRoute();
  const {id} = route.params as {id: number};
  const {data} = useGetBenefitDetail({id});

  const [editOpen, setEditOpen] = useState(false);

  const slideAnim = useRef(new Animated.Value(-100)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  if (!data) return null;

  return (
    <Animated.View style={[{transform: [{translateY: slideAnim}]}]}>
      <ScrollView ref={scrollViewRef} scrollEnabled={!editOpen}>
        <ImageSection image={data?.image} />
        <EditButton
          onPress={() => {
            scrollToTop();
            setEditOpen(true);
          }}>
          <Text style={{color: '#ffffff'}}>Edit</Text>
        </EditButton>
        <TitleSection
          profile={data?.user.profile}
          nickname={data?.user.nickname}
          point={data?.point}
        />
        <Gap size={5} />
        <ContentSection
          from={data?.date_from}
          to={data?.date_to}
          content={data?.contents}
        />
        <BottomSection
          created={
            data?.created.split('-')[0] + '-' + data?.created.split('-')[1]
          }
          view={data?.view_count}
          booked={data?.book_count}
        />
        <Modal opened={editOpen} close={() => setEditOpen(false)}>
          <EditModalContent close={() => setEditOpen(false)} />
        </Modal>
      </ScrollView>
    </Animated.View>
  );
};

const ImageSection = ({image}: {image: string}) => {
  return (
    <ContentImage>
      <Image source={{uri: image}} style={{width: '100%', aspectRatio: 1}} />
    </ContentImage>
  );
};

const TitleSection = ({
  profile,
  nickname,
  point,
}: {
  profile: string;
  nickname: string;
  point: number;
}) => {
  return (
    <>
      <TitleContainer>
        <ProfileWrapper>
          <ProfileImage>
            <Image source={{uri: profile}} style={{width: 40, height: 40}} />
          </ProfileImage>
          <Text>{nickname}</Text>
        </ProfileWrapper>

        <VerifyWrapper>
          <Text
            style={{
              color: '#ffffff',
            }}>
            ✔︎ Verified Only
          </Text>
        </VerifyWrapper>
      </TitleContainer>
      <ContentText>Nurilounge VIP Tour to Korea</ContentText>
      <JellyBadgeWrapper>
        <JellyBadge point={point} />
      </JellyBadgeWrapper>
    </>
  );
};

const ContentSection = ({
  from,
  to,
  content,
}: {
  from: string;
  to: string;
  content: string;
}) => {
  return (
    <>
      <RecruitContainer>
        <RecruitTop>
          <Text>Recruitment</Text>
          <Text>
            {getSlicedDateByMonth(from)} ~ {getSlicedDateByMonth(to)}
          </Text>
        </RecruitTop>
        <RecruitBottom>
          <DdayWrapper>
            <Text>D-99</Text>
          </DdayWrapper>
        </RecruitBottom>
      </RecruitContainer>
      <JellyContainer>
        <JellyWrapper>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../assets/Jelly.png')}
              style={{width: 20, height: 20}}
            />
            <Text>Jelly Text</Text>
          </View>
          <Text>800</Text>
        </JellyWrapper>
      </JellyContainer>
      <View style={{padding: 20}}>
        <Text>{content}</Text>
      </View>
    </>
  );
};

const BottomSection = ({
  created,
  view,
  booked,
}: {
  created: string;
  view: number;
  booked: number;
}) => {
  return (
    <BottomContainer>
      <Text>{created}</Text>
      <ReactionWrapper>
        <EyeWrapper>
          <Image source={require('../../assets/eye.png')} />
          <Text>{view}</Text>
        </EyeWrapper>
        <BookMarkWrapper>
          <Image source={require('../../assets/like.png')} />
          <Text>{booked}</Text>
        </BookMarkWrapper>
      </ReactionWrapper>
    </BottomContainer>
  );
};

export const EditModalContent = ({close}: {close: () => void}) => {
  const route = useRoute();
  const {id} = route.params as {id: number};
  const {mutate: patchImage, isLoading} = usePatchBenefitDetail();

  const [image, setImage] = useState<string | null>(null);

  const launch = async () => {
    launchImageLibrary({mediaType: 'mixed'}, res => {
      if (res.didCancel) {
        reactotron.log(res);
      } else {
        setImage(res.assets?.[0].uri ?? null);
      }
    });
  };

  const submit = async () => {
    const patchData = new FormData();
    const fileName = image?.split('/').pop();
    const fileType = image?.split('.').pop();

    patchData.append('image', {
      uri: image,
      name: fileName,
      type: fileType,
    });

    patchImage(
      {
        patchData,
        id,
      },
      {
        onSuccess: close,
      },
    );
  };

  return (
    <ModalContainer>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <TouchableOpacity onPress={launch}>
            <Text>Photo</Text>
          </TouchableOpacity>
          {image && (
            <Image source={{uri: image}} style={{height: 50, width: 50}} />
          )}
          <TouchableOpacity onPress={submit}>
            <Text>{image === null ? 'close' : 'change!'}</Text>
          </TouchableOpacity>
        </>
      )}
    </ModalContainer>
  );
};

const ContentImage = styled.View`
  height: 300;
  overflow: hidden;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;
`;

const ProfileWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfileImage = styled.View`
  overflow: hidden;
  border-radius: 50px;
  width: 40px;
  height: 40px;
  margin-right: 10;
`;

const VerifyWrapper = styled.View`
  border-radius: 20px;
  background-color: #391d5d;
  padding: 5px;
  color: #ffffff;
`;

const ContentText = styled.Text`
  margin-left: 20px;
`;

const JellyBadgeWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px;
  margin-top: 10;
`;

const RecruitContainer = styled.View`
  border-width: 1.5px;
  border-color: #ddd;
  padding: 10px;
  margin: 20px;
  border-radius: 5px;
  gap: 10px;
`;

const RecruitTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const RecruitBottom = styled.View`
  align-items: flex-end;
`;

const DdayWrapper = styled.View`
  padding: 5px 10px;
  background-color: #ddd1f0;
  border-radius: 20px;
`;

const JellyContainer = styled.View`
  border-width: 1.5px;
  border-color: #ddd;
  padding: 10px;
  margin: 20px;
  margin-top: -10px;
  border-radius: 5px;
  gap: 10px;
`;

const JellyWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const BottomContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  padding: 20px;
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

const ModalContainer = styled.View`
  width: 300px;
  height: 300px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-150px, -150px);
  background-color: #ddd1f0;

  gap: 80px;
  align-items: center;
  justify-content: center;
`;

const EditButton = styled.TouchableOpacity`
  background-color: #391d5d;
  padding: 10px 30px;
  justify-content: center;
  align-items: center;
`;
