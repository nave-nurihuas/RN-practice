import {useGetBenefitList} from '../../hooks/benefit/queries';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {BenefitItem} from './BenefitItem';
import {Filter} from './Filter';
import {Fragment, useState} from 'react';

export const BenefitList = () => {
  const [hideCloseCheck, setHideCloseCheck] = useState(false);
  const {data} = useGetBenefitList({hideCloseCheck});
  const [align, setAlign] = useState<'thumbnail' | 'list'>('list');

  const toggleCheckbox = () => setHideCloseCheck(prev => !prev);

  const toggleAlign = () =>
    setAlign(prev => (prev === 'list' ? 'thumbnail' : 'list'));

  return (
    <SafeAreaView>
      <Filter
        hideChecked={hideCloseCheck}
        toggleCheckbox={toggleCheckbox}
        align={align}
        toggleAlign={toggleAlign}
      />
      <ScrollView>
        <ScrollView>
          {data?.map(item => {
            return (
              <Fragment key={item.id}>
                <BenefitItem {...item} />
                <View style={{height: 1, backgroundColor: '#E4E4E7'}} />
              </Fragment>
            );
          })}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};
