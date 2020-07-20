import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native';

import Card from '../UI/Card';

const ProductItem = props => {
    let TouchableComponet = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableComponet = TouchableNativeFeedback;
    }
    return (
        <TouchableComponet onPress={props.onSelect} useForeground>
            <Card style={style.product}>
                <View style={style.imageContainer}>
                    <Image style={style.image} source={{ uri: props.imageUrl }} />
                </View>
                <View style={style.details}>
                    <Text style={style.title}>{props.title}</Text>
                    <Text style={style.price}>${props.price.toFixed(2)}</Text>
                </View>
                <View style={style.actions}>
                    {props.children}
                </View>
            </Card>
        </TouchableComponet>
    )
}

const style = StyleSheet.create({
    product: {
        height: 300,
        margin: 20,
    },
    imageContainer: {
        width: "100%",
        height: "60%",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        overflow: 'hidden'
    },
    image: {
        width: "100%",
        height: "100%",
    },
    details:{
        alignItems: 'center',
        height: '15%',
        padding: 10,
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    },

});

export default ProductItem;