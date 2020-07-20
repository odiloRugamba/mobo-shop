import React, {useEffect, useState, useCallback} from 'react';
import {
    FlatList,
    Platform,
    Button,
    Text,
    ActivityIndicator,
    View,
    StyleSheet
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';

const ProductsOverview = (props) => {
    const [isLoading, setIsloading] = useState(false);
    const [error, setError] = useState();

    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    const viewDetail = (item) => {
        props.navigation.navigate('ProductDetail', {
            productId: item.id,
            productTitle: item.title
        })
    }
    const loadProducts = useCallback(async () => {
        setError(null);
        setIsloading(true);
        try {
            await dispatch(productsActions.fetchProducts());
        } catch (err) {
            setError(err.message);
        }
        setIsloading(false);
    }, [dispatch, setIsloading, setError]);
    
    useEffect( () => {
        loadProducts();
    }, [dispatch, loadProducts]);
    //to enable reload when you return on the component
    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProducts);
        return () => {
            willFocusSub.remove();
        }
    }, [loadProducts]);
    if(error){
        return (
            <View style={styles.centered}>
                <Text>Error occured!</Text>
                <Button 
                        title='try again' 
                        color={Colors.primary} 
                        onPress={()=> loadProducts()} 
                    />
            </View>
            )
    }
    if(isLoading){
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
            )
    }
    if(!isLoading && products.length === 0){
        return (
            <View style={styles.centered}>
                <Text>No products available yet!</Text>
                <Text> start adding yours</Text>
                <View style={styles.action}>
                    <Button 
                        title='Add new' 
                        color={Colors.primary} 
                        onPress={()=> props.navigation.navigate('EditProduct')} 
                    />
                </View>
            </View>
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
                        onSelect={() => viewDetail(itemData.item)}
                    >
                            < Button
                            color = { Colors.primary }
                            title = "View Details"
                            onPress = {() => viewDetail(itemData.item)}
                            />
                            < Button 
                            color = { Colors.primary }
                            title = "To Cart"
                            onPress = {
                                () => {
                                    dispatch(cartActions.addToCart(itemData.item))
                                }
                            }
                            />
                    </ProductItem>)
                }
        ></FlatList>
    )
}

ProductsOverview.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
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
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={() => {
                    navData.navigation.navigate('Cart')
                }}
            />
            </HeaderButtons>
        )
    }
}
const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20
    }
})
export default ProductsOverview;