package com.lightfeatureapptest.modules.supervisor

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import okhttp3.*
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject
import java.io.IOException
import android.util.Log


class SupervisorModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val SUPERVISOR_API_URL = "https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers"
        val client = OkHttpClient()
    }

    override fun getName(): String {
        return "SupervisorModule"
    }

    data class Supervisor(
    val jurisdiction: String,
    val lastName: String,
    val firstName: String
)

    @ReactMethod
    fun getSupervisors(promise: Promise) {
           try {
           val request = Request.Builder()
                .url(SUPERVISOR_API_URL)
                .build()

            val response = client.newCall(request).execute()
            val responseBody = response.body?.string()

            if (response.isSuccessful && responseBody != null) {
                 val jsonArray = JSONArray(responseBody)
                val supervisors = mutableListOf<String>()

                for (i in 0 until jsonArray.length()) {
                    val supervisorObject = jsonArray.getJSONObject(i)
                    val jurisdiction = supervisorObject.getString("jurisdiction")
                    val lastName = supervisorObject.getString("lastName")
                    val firstName = supervisorObject.getString("firstName")

                    val formattedJurisdiction = jurisdiction.replace(Regex("[0-9]"), "").trim()

                    supervisors.add("$formattedJurisdiction - $lastName, $firstName")
                }

                supervisors.sort()

                val jsonArrayString = JSONArray(supervisors).toString()
                promise.resolve(jsonArrayString)
            } else {
                promise.reject("FETCH_ERROR", "Failed to fetch data from the API")
            }
        } catch (e: Exception) {
            promise.reject("FETCH_ERROR", e.message)
        }
    }

    @ReactMethod
    fun submitEmployee(firstName: String, lastName: String, email: String?, phoneNumber: String?, supervisor: String, promise: Promise) {
    try {
     
            if (firstName.isEmpty() || lastName.isEmpty() || supervisor.isEmpty()) {
                promise.reject("VALIDATION_ERROR", "First name,last name,supervisor  required.")
                return
            }

             if (!firstName.matches(Regex("[a-zA-Z]+")) || !lastName.matches(Regex("[a-zA-Z]+"))) {
            promise.reject("VALIDATION_ERROR", "Name fields only contain letters")
            return
            }

        // Validate email if provided
        if (!email.isNullOrEmpty() && !android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            promise.reject("VALIDATION_ERROR", "Invalid email format")
            return
        }

        // // Validate phone number if provided
        if (!phoneNumber.isNullOrEmpty() && !android.util.Patterns.PHONE.matcher(phoneNumber).matches()) {
            promise.reject("VALIDATION_ERROR", "Invalid phone number format")
            return
        }

        // Log the message
        val message = "Notification request received: First Name: $firstName, Last Name: $lastName, Email: $email, Phone Number: $phoneNumber, Supervisor: $supervisor"
        Log.d("SupervisorModule -->", message)

        // Resolve the promise
        promise.resolve("Notification request submitted successfully")
    } catch (e: Exception) {
        promise.reject("ERROR", "An unexpected error occurred: ${e.message}")
         promise.reject("ERROR", e.message)
        }
    }
}
