import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect,useContext} from 'react';
import 'react-native-reanimated';
import { RootSiblingParent } from 'react-native-root-siblings';
import { useColorScheme } from '@/components/useColorScheme';
import { AuthContext, AuthContextType, AuthProvider } from '@/context/Auth/AuthContext';
export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

export enum RoutesPath{
  LOGIN = "screens/Login",
  TABS = "(tabs)",
  MODAL ="modal"
}


function Routes() {
  const {isAuth,user} = useContext(AuthContext) as AuthContextType;
  useEffect(()=>{
    if(!isAuth)router.navigate("/screens/Login");
  },[isAuth])
  return(
    <Stack>
      <Stack.Screen name={RoutesPath.TABS} options={{ headerShown: false }} />
      <Stack.Screen name={RoutesPath.MODAL} options={{ presentation: 'modal' }}/>
      <Stack.Screen name={RoutesPath.LOGIN} options={{ headerShown: false }} />
    </Stack>
  )
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <RootSiblingParent>
          <Routes/>
        </RootSiblingParent>
      </AuthProvider>
    </ThemeProvider>
  );
}
