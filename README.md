# LightFeather Supervisor Management Notification Module

## Overview
This React Native application is designed to manage supervisors and handle notifications for employees at LightFeather. The app interfaces with microservices and is intended to run on Android devices.

## Features
- Fetch and display a list of supervisors from native modules.
- Submit an employee's information to notify a specific supervisor from native modules.
- Form validation using Yup and Formik.
- Native module integration with Kotlin for Android.

## Prerequisites
- Node.js (>=18.x.x)
- npm (>=8.x.x)
- Android Studio with Android SDK
- JDK (>=17.x)
- React Native CLI

## Setup Instructions

### 1. Clone the repository

git clone https://github.com/your-username/lightfeather-supervisor-module.git
cd lightfeather-supervisor-module



### 2. Install Dependencies

Using npm:

npm install

### 2. Running the Application


npx react-native start OR npm start

### Usage

- Open the app on your Android device or emulator.

- The main screen will display a form with the following fields: First Name, Last Name, Email, Phone Number, and Supervisor.

- Select a supervisor from the dropdown list.

- Fill in the required fields and submit the form to notify the selected supervisor.





## Accessing Native Module Methods

### 1. Fetching Supervisors

The getSupervisors method of the native module fetches the list of supervisors.

Example usage:

```
import { NativeModules } from 'react-native';

const SupervisorModule = NativeModules.SupervisorModule;

const supervisors = await SupervisorModule.getSupervisors();
```

### 2. Submitting an Employee

The submitEmployee method of the native module submits employee information.

Example usage:

```
import { NativeModules } from 'react-native';

const SupervisorModule = NativeModules.SupervisorModule;

function submitEmployee(firstName, lastName, email, phoneNumber, supervisor) {
    SupervisorModule.submitEmployee(firstName, lastName, email, phoneNumber, supervisor)
        .then(response => {
            console.log('Employee submitted successfully:', response);
        })
        .catch(error => {
            console.error('Error submitting employee:', error);
        });
}
```
### Command to get Notification on native android service

```
adb logcat | grep "SupervisorModule -->"
```

### Troubleshooting

- Ensure your Android environment is correctly set up.
- Check for any typos or errors in your code.
- Use adb logcat to view detailed logs if the app crashes or fails to run.

