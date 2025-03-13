import 'package:flutter/material.dart';
import 'package:flutterdemo/inappwebview.dart';
import 'package:flutterdemo/webview.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // TRY THIS: Try running your application with "flutter run". You'll see
        // the application has a purple toolbar. Then, without quitting the app,
        // try changing the seedColor in the colorScheme below to Colors.green
        // and then invoke "hot reload" (save your changes or press the "hot
        // reload" button in a Flutter-supported IDE, or press "r" if you used
        // the command line to start the app).
        //
        // Notice that the counter didn't reset back to zero; the application
        // state is not lost during the reload. To reset the state, use hot
        // restart instead.
        //
        // This works for code too, not just values: Most code changes can be
        // tested with just a hot reload.
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.orange),
      ),
      home: const MyHomePage(title: 'MatchID Flutter Demo'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  bool showWebView = false;
  String webViewLib =
      'webview_flutter'; // webview_flutter or flutter_inappwebview
  String url =
      'https://auth.matchid.ai/app/auth?back=1&appid=MID-E53wKKWTqNzK7ccC';
  String auth = '';
  final textInputController = TextEditingController();

  // 添加可选的 webview 库列表
  final List<String> webViewLibs = ['webview_flutter', 'flutter_inappwebview'];

  void _handleBack() {
    setState(() {
      showWebView = false;
    });
  }

  void _handleAuth(String value) {
    setState(() {
      showWebView = false;
      auth = value;
    });
  }

  void _handleWebViewLibChange(String? value) {
    if (value != null) {
      setState(() {
        webViewLib = value;
      });
    }
  }

  @override
  void initState() {
    super.initState();
    textInputController.text = url;
  }

  @override
  void dispose() {
    textInputController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
        // TRY THIS: Try changing the color here to a specific color (to
        // Colors.amber, perhaps?) and trigger a hot reload to see the AppBar
        // change color while the other colors stay the same.
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
      ),
      body: Container(
        child:
            showWebView
                ? webViewLib == 'webview_flutter'
                    ? WebView(
                      url: url,
                      onBack: _handleBack,
                      onAuth: _handleAuth,
                    )
                    : WebView2(
                      url: url,
                      onBack: _handleBack,
                      onAuth: _handleAuth,
                    )
                : Container(
                  padding: EdgeInsets.symmetric(vertical: 32, horizontal: 8),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 8),
                        child: TextField(
                          controller: textInputController,
                          decoration: InputDecoration(
                            labelText: 'url',
                            hintText: 'Enter your url',
                            border: OutlineInputBorder(),
                          ),
                          onChanged: (value) {
                            setState(() {
                              url = value;
                            });
                          },
                        ),
                      ),
                      SizedBox(height: 16),
                      Wrap(
                        direction: Axis.horizontal,
                        children:
                            webViewLibs
                                .map(
                                  (lib) => Row(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      Radio<String>(
                                        value: lib,
                                        groupValue: webViewLib,
                                        onChanged: _handleWebViewLibChange,
                                      ),
                                      Text(lib),
                                    ],
                                  ),
                                )
                                .toList(),
                      ),
                      SizedBox(height: 16),
                      if (auth != '')
                        Column(
                          children: [
                            Padding(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 8,
                              ),
                              child: Text("auth:${auth}"),
                            ),
                            SizedBox(height: 16),
                          ],
                        ),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 8),
                        child: SizedBox(
                          width: double.infinity,
                          child: ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              padding: const EdgeInsets.symmetric(vertical: 16),
                            ),
                            child: const Text('Show WebView'),
                            onPressed: () {
                              setState(() {
                                auth = '';
                                showWebView = true;
                              });
                            },
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
      ),
    );
  }
}
