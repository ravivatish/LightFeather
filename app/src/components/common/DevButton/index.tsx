import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React, { FC } from 'react'
import { DevButtonProps } from './interface'
import { COLORS } from '../../../utils/theme/color'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { TextRegular } from '../DevText';

const DevButton: FC<DevButtonProps> = ({
    title,
    onPress,
    loading,
    secondary,
    externalContainerStyle,
    fontColor,
    disabled = false,
    loadingColor,
    iconEnable = false
}) => {
    if (secondary) {
        return (
            <TouchableOpacity
                onPress={onPress}
                style={[styles.container, styles.secondary, externalContainerStyle]}
                disabled={disabled}>
                {loading ? (
                    <ActivityIndicator size="small" color={COLORS.textSecondary} />
                ) : (
                    <TextRegular bold color={fontColor || COLORS.textPrimary}>
                        {title}
                    </TextRegular>
                )}
            </TouchableOpacity>
        );
    }
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[styles.container, styles.primaryButton, externalContainerStyle]}>
            {loading ? (
                <ActivityIndicator size="small" color={loadingColor ? loadingColor : "white"} />
            ) : (
                <TextRegular
                    center
                    color={fontColor || COLORS.textPrimary}
                    textStyle={{ fontWeight: '600' }}>
                    {title}
                </TextRegular>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        paddingVertical: hp(1),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        marginHorizontal: wp(4),
        
    },
    rightIcon: {
        position: 'absolute',
        right: 10,
    },
    secondary: {
        borderWidth: 1,
        borderColor: COLORS.textSecondary,
    },
    primaryButton: {
        backgroundColor: COLORS.textSecondary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        paddingVertical: hp(2),
        marginHorizontal: wp(0),
    },
});

export default DevButton