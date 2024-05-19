import { View, StyleSheet, Text } from 'react-native'
import React, { FC } from 'react'
import { DevTextProps } from './inteface'
import { RFValue as rf } from 'react-native-responsive-fontsize'
import { FONT } from '../../../utils/theme/fonts'
import { COLORS } from '../../../utils/theme/color'

export const TextRegular: FC<DevTextProps> = ({
    children,
    fontFamily,
    textStyle,
    color,
    center,
    bold,
    onPress,
}) => {
    return (
        <Text
            style={[
                styles.text,
                styles.normal,
                bold && { fontFamily: FONT.boldFont },
                center && { textAlign: 'center' },
                { color: color || COLORS.textPrimary },
                textStyle,
            ]}
            disabled={typeof onPress === 'function' ? false : true}
            onPress={typeof onPress === 'function' ? onPress : () => { }}
        >
            {children}
        </Text>
    )
}

export const TextSmall: FC<DevTextProps> = ({
    children,
    textStyle,
    color,
    center,
    bold,
    fontFamily,
    ...rest
}) => {
    return (
        <Text
            style={[
                styles.text,
                styles.small,
                textStyle,
                bold && { fontFamily: FONT.boldFont },
                { color: color || COLORS.textPrimary },
                center && { textAlign: 'center' },
            ]}>
            {children}
        </Text>
    );
}

export const TextSmaller: FC<DevTextProps> = ({
    children,
    textStyle,
    color,
    center,
    bold,
    fontFamily,
    ...rest
}) => {
    return (
        <Text
            style={[
                styles.text,
                styles.smaller,
                textStyle,
                bold && { fontFamily: FONT.boldFont },
                { color: color || COLORS.textPrimary },
                center && { textAlign: 'center' },
                
            ]}>
            {children}
        </Text>
    );
}

export const TextLarge: FC<DevTextProps> = ({
    children,
    textStyle,
    color,
    center,
    bold,
    fontFamily,
    ...rest
}) => {
    return (
        <Text
            style={[
                styles.text,
                styles.big,
                textStyle,
                bold && { fontFamily: FONT.boldFont },
                { color: color || COLORS.textPrimary },
                center && { textAlign: 'center' },
            ]}>
            {children}
        </Text>
    );
}

export const TextLarger: FC<DevTextProps> = ({
    children,
    textStyle,
    color,
    center,
    bold,
    fontFamily,
    ...rest
}) => {
    return (
        <Text
            style={[
                styles.text,
                styles.bigger,
                textStyle,
                bold && { fontFamily: FONT.boldFont },
                { color: color || COLORS.textPrimary },
                center && { textAlign: 'center' },
            ]}>
            {children}
        </Text>
    );
}

export const TextHuge: FC<DevTextProps> = ({
    children,
    textStyle,
    color,
    center,
    bold,
    fontFamily,
    ...rest
}) => {
    return (
        <Text
            style={[
                styles.text,
                styles.huge,
                textStyle,
                bold && { fontWeight: 'bold' },
                { color: color || COLORS.textPrimary },
                center && { textAlign: 'center' },
            ]}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: FONT.regularFont,
        color: COLORS.textPrimary,
    },
    smaller: {
        fontSize: rf(10),
        marginBottom:5
    },
    small: {
        fontSize: rf(11),
    },
    normal: {
        fontSize: rf(13),
    },
    big: {
        fontSize: rf(15),
    },
    bigger: {
        fontSize: rf(17),
    },
    huge: {
        fontSize: rf(20),
    },
});