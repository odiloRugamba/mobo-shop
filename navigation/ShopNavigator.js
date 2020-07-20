import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { createAppContainer} from 'react-navigation';
import {Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons'

import ProductsOverview from '../screens/shop/ProductsOverview';
import ProductDetail from '../screens/shop/ProductDetail';
import Cart from '../screens/shop/Cart';
import Orders from '../screens/shop/Orders';
import UserProducts from '../screens/user/UserProducts';
import EditProduct from '../screens/user/EditProduct';


import Colors from '../constants/Colors';

const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const ProductsNavigator = createStackNavigator({
                ProductsOverview: ProductsOverview,
                ProductDetail: ProductDetail,
                Cart: Cart
            },{
                defaultNavigationOptions: defaultNavigationOptions,
                navigationOptions: {
                    drawerIcon: drawerConfig => (
                        <Ionicons
                            name={Platform.OS === 'android'? 'md-list' : 'ios-list'}
                            size={23}
                            color={drawerConfig.tintColor} 
                        />
                    )
                }
            })
const OrdersNavigator = createStackNavigator({
                Orders: Orders,
            },{
                defaultNavigationOptions: defaultNavigationOptions,
                navigationOptions: {
                    drawerIcon: drawerConfig => (
                        <Ionicons
                            name={Platform.OS === 'android'? 'md-cart' : 'ios-cart'}
                            size={23}
                            color={drawerConfig.tintColor} 
                        />
                    )
                },
            })

const AdminNavigator = createStackNavigator({
                UserProducts: UserProducts,
                EditProduct: EditProduct,
            },{
                defaultNavigationOptions: defaultNavigationOptions,
                navigationOptions: {
                    drawerIcon: drawerConfig => (
                        <Ionicons
                            name={Platform.OS === 'android'? 'md-create' : 'ios-create'}
                            size={23}
                            color={drawerConfig.tintColor} 
                        />
                    )
                },
            })

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
},{
    contentOptions: {
        activeTintColor: Colors.primary
    }
})
export default createAppContainer(ShopNavigator);