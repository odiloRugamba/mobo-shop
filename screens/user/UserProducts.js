import React from 'react';
import {FlatList, Platform, Button, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';
const UserProducts = (props) => {
    const products = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();
    const deleteHandler = (productId) => {
        Alert.alert('Are you sure', 'Do you really want to delete this item?', [
            {
                text: 'No', style: 'default'
            },
            {
                text: 'Yes', style: 'destructive', onPress: () => {dispatch(productsActions.deleteProduct(productId))}
            }
        ]
        )
    }
    return (
        <FlatList 
            data = { products }
            keyExtractor = { item => item.id }
            renderItem = { 
                itemData => 
                    (<ProductItem 
                        imageUrl={itemData.item.imageUrl}
                        title={itemData.item.title}
                        price={itemData.item.price}
                        onSelect={() => {}}
                    >
                            < Button
                            color = { Colors.accent }
                            title = "Delete"
                            onPress = { () => {deleteHandler(itemData.item.id)}}
                            />
                            < Button 
                            color = { Colors.primary }
                            title = "Edit"
                            onPress = {
                                () => {
                                   props.navigation.navigate('EditProduct', {productId: itemData.item.id})
                                }
                            }
                            />
                    </ProductItem>)
                }
        ></FlatList>
    )
}

UserProducts.navigationOptions = navData => {
    return {
        headerTitle: 'My Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Cart"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer()
                }}
            />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Cart"
                iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                onPress={() => {
                    navData.navigation.navigate('EditProduct')
                }}
            />
            </HeaderButtons>
        )
    }
}

export default UserProducts;