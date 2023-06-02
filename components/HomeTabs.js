import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomerSreen from './CustomerScreen'
import ListCustomer from './ListCustomer';
import {MaterialIcons} from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown:false,
        tabBarActiveBackgroundColor:'grey'
    }}>
      <Tab.Screen name="Customer" component={CustomerSreen} options={{
        tittle:'Clientes',
        tabBarIcon:({color})=>(
            <MaterialIcons name="account-circle" size={30} color= 'blue'/>
        )
        }} />
      <Tab.Screen name="List" component={ListCustomer} options={{tittle:'Listado Clientes',
    tabBarIcon:({color})=>(
        <MaterialIcons name="view-list" size={30} color= 'green'/>
    )
    }}/>
    </Tab.Navigator>
  );
}