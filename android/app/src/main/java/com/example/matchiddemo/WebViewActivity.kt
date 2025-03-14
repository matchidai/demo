package com.example.matchiddemo

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.view.ViewGroup
import android.webkit.JavascriptInterface
import android.webkit.WebView
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject

class WebViewActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val url = intent.getStringExtra("url")
        setContent {
            if (url != null) {
                WebViewScreen(this, url)
            }
        }
    }
}


@Serializable
data class MatchIDResponse(val matchid: Boolean, val eventName: String, val data: JsonObject)

class WebAppInterface(private val activity: Activity) {
    @JavascriptInterface
    fun back(data: String) {
        activity.runOnUiThread {
            activity.finish()
        }
    }

    @JavascriptInterface
    fun auth(data: String) {
        val response = Json.decodeFromString<MatchIDResponse>(data)
        val auth = Json.encodeToString(response.data)
        activity.runOnUiThread {
            val resultIntent = Intent().apply {
                putExtra("auth", auth)
            }
            activity.setResult(Activity.RESULT_OK, resultIntent)
            activity.finish()
        }
    }
}

@Composable
fun WebViewScreen(activity: Activity, url: String) {
    AndroidView(
        modifier = Modifier.fillMaxSize(),
        factory = { context ->
            WebView(context).apply {
                layoutParams = ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.MATCH_PARENT
                )
                settings.javaScriptEnabled = true
                settings.domStorageEnabled = true
                addJavascriptInterface(WebAppInterface(activity), "MatchID")
                loadUrl(url)
            }
        }
    )
}