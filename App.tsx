import {BenefitDetail} from './src/components/benefit/BenefitDetail';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {BenefitList} from './src/components/benefit/BenefitList';
import {navigate, navigationRef} from './src/utils/rootNavigation';
import {Pressable, Text} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="Benefit">
          <Stack.Screen name="Benefit" component={BenefitList} />
          <Stack.Screen
            name="Detail"
            component={BenefitDetail}
            options={{
              headerLeft: () => (
                <Pressable onPress={() => navigate('Benefit', {})}>
                  <Text>{'<'}</Text>
                </Pressable>
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
