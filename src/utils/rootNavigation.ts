import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params: any) {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(name, params);
  }
}

export function push(name: any, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.current &&
      navigationRef.current.dispatch(StackActions.push(name, params));
  }
}
