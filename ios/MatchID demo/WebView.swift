//
//  ContentView.swift
//  MatchID demo
//
//  Created by sherman on 2025/3/14.
//

import SwiftUI
import WebKit

struct WebView: UIViewRepresentable {
    let url: String
    var onAuthCallback: ((String) -> Void)?

    @Environment(\.presentationMode) var presentationMode
    
    class Coordinator: NSObject, WKScriptMessageHandler {
        var parent: WebView
        
        init(_ parent: WebView) {
            self.parent = parent
        }
        
        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            if let messageString = message.body as? String {
				print("messageString: \(messageString)")
                if let jsonData = messageString.data(using: .utf8) {
                    do {
                        if let dict = try JSONSerialization.jsonObject(with: jsonData) as? [String: Any],
                           let eventName = dict["eventName"] as? String {
                            
                            if eventName == "back" {
                                DispatchQueue.main.async {
                                    self.parent.presentationMode.wrappedValue.dismiss()
                                }
                            } else if eventName == "auth" {
                                if let data = dict["data"] as? [String: Any] {
                                    if let jsonData = try? JSONSerialization.data(withJSONObject: data),
                                       let jsonString = String(data: jsonData, encoding: .utf8) {
                                        DispatchQueue.main.async {
                                            self.parent.onAuthCallback?(jsonString)
                                            self.parent.presentationMode.wrappedValue.dismiss()
                                        }
                                    }
                                }
                            }
                        }
                    } catch {
                        print("JSON parsing error: \(error)")
                    }
                }
            }
        }
    }
    
    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }
    
    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.defaultWebpagePreferences.allowsContentJavaScript = true
        
        configuration.userContentController.add(context.coordinator, name: "MatchID")
        
        let webView = WKWebView(frame: .zero, configuration: configuration)
        
        webView.configuration.preferences.javaScriptEnabled = true
        webView.configuration.preferences.javaScriptCanOpenWindowsAutomatically = true
        
        webView.configuration.websiteDataStore = .default()
        webView.configuration.processPool = WKProcessPool()
        
        if let url = URL(string: url) {
            let request = URLRequest(url: url)
            webView.load(request)
        }
        return webView
    }
    
    func updateUIView(_ uiView: WKWebView, context: Context) {
        if let url = URL(string: url) {
            let request = URLRequest(url: url)
            uiView.load(request)
        }
    }
} 