package com.example.matchiddemo

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.lifecycle.ViewModel
import com.example.matchiddemo.ui.theme.MatchIDDemoTheme

class MainActivity : ComponentActivity() {
    val viewModel = MainViewModel()

    val webViewLauncher = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
        if (result.resultCode == Activity.RESULT_OK) {
            val auth = result.data?.getStringExtra("auth")
            viewModel.auth = auth ?: ""
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MatchIDDemoTheme {
                MyScreen(viewModel, webViewLauncher)
            }
        }
    }
}

class MainViewModel : ViewModel() {
    var url by mutableStateOf("https://auth.matchid.ai/app/auth?back=1&appid=MID-E53wKKWTqNzK7ccC")
    var auth by mutableStateOf("")
}

@Composable
fun MyScreen(viewModel: MainViewModel, webViewLauncher: ActivityResultLauncher<Intent>) {
    val context = LocalContext.current

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        TextField(
            value = viewModel.url,
            onValueChange = { viewModel.url = it },
            modifier = Modifier.fillMaxWidth(),
            label = { Text("Enter your url") }
        )

        Spacer(modifier = Modifier.height(24.dp))

        Button(
            onClick = {
                viewModel.auth = ""
                val intent = Intent(context, WebViewActivity::class.java)
                intent.putExtra("url", viewModel.url)
                webViewLauncher.launch(intent)
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Open WebView")
        }

        Spacer(modifier = Modifier.height(24.dp))

        if (viewModel.auth != "") {
            Text("auth：${viewModel.auth}", style = MaterialTheme.typography.bodyLarge)
        }
    }
}