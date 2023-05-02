package com.example.cliente

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.messaging.FirebaseMessaging


class MainActivity : AppCompatActivity() {
    companion object {
        private const val TAG = "MainActivity"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Suscribirse a un tema de Firebase Messaging
        FirebaseMessaging.getInstance().subscribeToTopic("topic_name")
            .addOnCompleteListener { task ->
                if (task.isSuccessful) {
                    Log.d(TAG, "Suscrito al tema.")
                } else {
                    Log.e(TAG, "Error al suscribirse al tema.", task.exception)
                }
            }
    }
}