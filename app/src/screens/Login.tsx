import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Yup from 'yup';
import { TextHuge, TextSmall, TextSmaller } from '../components/common/DevText';
import { COLORS } from '../utils/theme/color';
import { Picker } from '@react-native-picker/picker';
import { ISupervisor } from '../interfaces/CreateSupervisor.interface';
import { NativeModules } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DevButton from '../components/common/DevButton';
import useSupervisors from '../utils/hooks/useSupervisors';
import { showToast } from '../utils/toaster';
import Toast from 'react-native-toast-message';

const SupervisorModule = NativeModules.SupervisorModule;
const validationSchema = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string(),
    phoneNumber: Yup.string(),
    supervisor: Yup.string(),
});


const Login = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const { supervisors } = useSupervisors()

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        supervisor: '',
    };




    const handleSubmit = async (values: ISupervisor) => {
        setLoading(true)
        try {
            const res = await SupervisorModule.submitEmployee(
                values.firstName,
                values.lastName,
                values.email,
                values.phoneNumber,
                values.supervisor
            )
            console.log(res)
            showToast('success', res)
            setLoading(false)
        } catch (error: any) {
            console.log('Error submitting employee:', error);
            showToast('error', error.message)
            setLoading(false)
        }

    };

    return (

        <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.bottomContainer}>
             <View style={styles.bottomRectangle}>
                    <View style={styles.rectangle}></View>
                </View>
            <TextHuge color={COLORS.black} bold center>ADD AN EMPLOYEE</TextHuge>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={{ marginTop: 10 }}>
                        <TextInput
                            onChangeText={handleChange('firstName')}
                            onBlur={handleBlur('firstName')}
                            value={values.firstName}
                            placeholder="First Name"
                            placeholderTextColor={'rgba(176, 172, 172, 0.94)'}
                            style={styles.input}
                        />
                        {touched.firstName && errors.firstName && <TextSmaller color={COLORS.red}>{errors.firstName}</TextSmaller>}

                        <TextInput
                            onChangeText={handleChange('lastName')}
                            onBlur={handleBlur('lastName')}
                            value={values.lastName}
                            placeholder="Last Name"
                            placeholderTextColor={'rgba(176, 172, 172, 0.94)'}
                            style={styles.input}
                        />
                        {touched.lastName && errors.lastName && <TextSmaller color={COLORS.red}>{errors.lastName}</TextSmaller>}

                        <TextInput
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            placeholder="Email"
                            keyboardType='email-address'
                            placeholderTextColor={'rgba(176, 172, 172, 0.94)'}
                            style={styles.input}
                        />
                        {touched.email && errors.email && <TextSmaller color={COLORS.red}>{errors.email}</TextSmaller>}

                        <TextInput
                            onChangeText={handleChange('phoneNumber')}
                            onBlur={handleBlur('phoneNumber')}
                            value={values.phoneNumber}
                            placeholderTextColor={'rgba(176, 172, 172, 0.94)'}
                            placeholder="Phone Number"
                            style={styles.input}
                        />
                        {touched.phoneNumber && errors.phoneNumber && <TextSmaller color={COLORS.red}>{errors.phoneNumber}</TextSmaller>}


                        <Picker
                            selectedValue={values.supervisor}
                            onValueChange={handleChange('supervisor')}
                            style={styles.input}
                        >
                            <Picker.Item label='Select supervisor' value='' />
                            {supervisors.map((supervisor, index) => (
                                <Picker.Item key={index} label={supervisor} value={supervisor} />
                            ))}
                        </Picker>
                        {touched.supervisor && errors.supervisor && <TextSmaller color={COLORS.red}>{errors.supervisor}</TextSmaller>}


                        <DevButton
                            disabled={loading}
                            loading={loading}
                            title='Submit Employee'
                            onPress={handleSubmit}
                            fontColor={COLORS.white} />
                    </View>
                )}
            </Formik>
        </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#30A2FF',
        borderRadius: 10
    },
    buttonText: {
        textAlign: 'center',
        padding: 20,
        color: 'white',
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    bottomContainer: {
        backgroundColor: '#ffffff',
        marginTop: 60,
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
        justifyContent: 'center',
        padding: 22,
    },
    bottomRectangle: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 18
    },
    rectangle: {
        backgroundColor: "#D9D9D9",
        width: 80,
        height: 8,
        borderRadius: 5,
    },

    bottomTextContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#30A2FF'
    },
    img: {
        width: 300,
        height: 210,
        resizeMode: 'cover',
        marginBottom: 18,
        alignItems: 'center',
        justifyContent: 'center'

    },
    subTitle: {
        fontSize: 12,
        fontWeight: '400',
        marginBottom: 16,
        color: 'rgba(176, 172, 172, 0.94)'
    },
    input: {
        backgroundColor: '#E8E8E8',
        height: hp(6),
        borderColor: 'none',
        paddingHorizontal: 10,
        marginVertical: 10,
        color: '#6D6D6D',
        borderRadius: 10,

    },
    errorText: {
        color: 'red',
        marginBottom: 8,
    },
});

export default Login