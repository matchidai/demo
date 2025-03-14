//
//  ContentView.swift
//  MatchID demo
//
//  Created by sherman on 2025/3/14.
//

import SwiftUI

struct ContentView: View {
    @State private var urlString: String = "https://auth.matchid.ai/app/auth?back=1&appid=MID-E53wKKWTqNzK7ccC"
    @State private var showWebView = false
    @State private var authResult: String = ""
    
    var body: some View {
        NavigationView {
            VStack {
                TextField("Enter URL", text: $urlString)
                    .padding()
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                
                Button(action: {
                    showWebView = true
                    authResult = ""
                }) {
                    Text("Open WebView")
                        .padding()
                        .background(Color.blue)
                        .foregroundColor(.white)
                        .cornerRadius(8)
                }
                
                if !authResult.isEmpty {
                    Text("auth: \(authResult)")
                        .padding()
                }
            }
            .padding()
            .frame(maxHeight: .infinity, alignment: .top)
            .sheet(isPresented: $showWebView) {
                WebView(url: urlString, onAuthCallback: { result in
                    authResult = result
                })
            }
        }
    }
}

#Preview {
    ContentView()
}
