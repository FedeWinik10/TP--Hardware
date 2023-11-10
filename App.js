import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Contactos from './screens/Contactos';
import Home from './screens/Home';
import ConfiguracionNumeroEmergencia from './screens/ConfiguracionNumeroEmergencia';
import Clima from './screens/Clima';
import QR from './screens/Qr';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Contactos" component={Contactos} />
        <Stack.Screen name='ConfiguracionNumeroEmergencia' component={ ConfiguracionNumeroEmergencia }/>
        <Stack.Screen name="Clima" component={Clima} />
        <Stack.Screen name="Qr" component={QR} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
