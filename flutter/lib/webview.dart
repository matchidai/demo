import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

import 'models/matchid_response.dart';

class WebView extends StatefulWidget {
  final String url;
  final void Function() onBack;
  final void Function(String) onAuth;

  const WebView({
    super.key,
    required this.url,
    required this.onBack,
    required this.onAuth,
  });

  @override
  State<StatefulWidget> createState() => _WebViewPageState();
}

class _WebViewPageState extends State<WebView> {
  late WebViewController controller;

  @override
  void initState() {
    controller =
        WebViewController()
          ..setJavaScriptMode(JavaScriptMode.unrestricted)
          ..setBackgroundColor(Colors.white)
          ..addJavaScriptChannel(
            "MatchIDChannel",
            onMessageReceived: (message) {
              MatchIDResponse response = MatchIDResponse.fromJson(
                message.message,
              );
              switch (response.eventName) {
                case 'back':
                  widget.onBack();
                  break;
                case 'auth':
                  if (response.data != null) {
                    widget.onAuth(json.encode(response.data));
                  }
                  break;
                default:
                  break;
              }
            },
          )
          ..loadRequest(Uri.parse(widget.url));
    super.initState();
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return WebViewWidget(controller: controller);
  }
}
