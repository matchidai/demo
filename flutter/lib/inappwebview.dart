import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:flutterdemo/models/matchid_response.dart';

class WebView2 extends StatefulWidget {
  final String url;
  final void Function() onBack;
  final void Function(String) onAuth;

  const WebView2({
    super.key,
    required this.url,
    required this.onBack,
    required this.onAuth,
  });

  @override
  State<StatefulWidget> createState() => _WebView2PageState();
}

class _WebView2PageState extends State<WebView2> {
  InAppWebViewController? webViewController;

  @override
  Widget build(BuildContext context) {
    return InAppWebView(
      initialUrlRequest: URLRequest(url: WebUri(widget.url)),
      onWebViewCreated: (controller) {
        webViewController = controller;

        print('WebView created');

        controller.addJavaScriptHandler(
          handlerName: 'matchIDHandler',
          callback: (args) {
            if (args.isEmpty || args[0][0] == null) return;
            MatchIDResponse response = MatchIDResponse.fromJson(args[0][0]);
            switch (response.eventName) {
              case 'back':
                widget.onBack();
                break;
              case 'auth':
                widget.onAuth(json.encode(response.data));
                break;
            }
          },
        );
      },
    );
  }
}
