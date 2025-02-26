const questions21_30 = [
  {
    id: 21,
    title: '如何实现跨组件状态共享？',
    tags: ['状态管理', 'Provider'],
    difficulty: '中等',
    answer: `
**状态管理方案选择**：
1. **Provider**：官方推荐，适合中小型应用
2. **Riverpod**：Provider 的改进版，更安全
3. **Bloc**：事件驱动，适合复杂业务逻辑
4. **GetX**：轻量且功能全面

**Provider 使用步骤**：
1. 创建 Model 类继承 ChangeNotifier
2. 在顶层包裹 Provider
3. 在子组件中通过 context.read/watch 使用

**示例**：
\`\`\`dart
class Counter extends ChangeNotifier {
  int _count = 0;
  
  int get count => _count;
  
  void increment() {
    _count++;
    notifyListeners();
  }
}

// 顶层包裹
Provider(
  create: (_) => Counter(),
  child: MyApp(),
)

// 使用状态
final counter = context.watch<Counter>();
Text('\${counter.count}')

// 更新状态
context.read<Counter>().increment();
\`\`\`
    `
  },
  {
    id: 22,
    title: '如何处理不同屏幕尺寸的适配？',
    tags: ['响应式布局'],
    difficulty: '中等',
    answer: `
**适配方案**：
1. **MediaQuery**：获取屏幕尺寸
   \`\`\`dart
   var width = MediaQuery.of(context).size.width;
   \`\`\`
2. **LayoutBuilder**：根据约束动态布局
3. **OrientationBuilder**：处理横竖屏变化
4. **FractionallySizedBox**：按比例布局
5. **使用自适应组件**：
   - Sliver 系列组件
   - GridView 的 crossAxisCount 动态设置

**最佳实践**：
- 使用弹性布局（Flex、Expanded）
- 设置最小/最大宽高约束
- 为平板和手机设计不同布局
- 使用 DevicePreview 包测试多种设备
    `
  },
  {
    id: 23,
    title: '如何编写平台特定代码？',
    tags: ['平台通道'],
    difficulty: '困难',
    answer: `
**实现步骤**：
1. 创建平台通道：
\`\`\`dart
const platform = MethodChannel('com.example/native');
\`\`\`

2. 调用原生方法：
\`\`\`dart
final String result = await platform.invokeMethod('getOSVersion');
\`\`\`

3. Android 实现 (Kotlin)：
\`\`\`kotlin
MethodChannel(flutterEngine.dartExecutor, "com.example/native").setMethodCallHandler { call, result ->
  when (call.method) {
    "getOSVersion" -> {
      result.success(Build.VERSION.RELEASE)
    }
    else -> result.notImplemented()
  }
}
\`\`\`

4. iOS 实现 (Swift)：
\`\`\`swift
let controller = window.rootViewController as! FlutterViewController
let channel = FlutterMethodChannel(name: "com.example/native", binaryMessenger: controller.binaryMessenger)
channel.setMethodCallHandler { call, result in
  switch call.method {
  case "getOSVersion":
    result(UIDevice.current.systemVersion)
  default:
    result(FlutterMethodNotImplemented)
  }
}
\`\`\`
    `
  },
  {
    id: 24,
    title: '如何优化应用体积？',
    tags: ['性能优化'],
    difficulty: '困难',
    answer: `
**优化策略**：
1. **代码优化**：
   - 启用代码混淆：--obfuscate
   - 移除未使用资源：flutter clean && flutter pub get
   - 使用--split-debug-info减少符号表

2. **资源优化**：
   - 压缩 PNG/JPG 图片
   - 使用 WebP 格式
   - 移除未使用的字体

3. **构建配置**：
   - 分离ABI：--split-per-abi
   - 仅打包必要资源：--no-tree-shake-icons

4. **插件优化**：
   - 仅包含需要的插件
   - 检查插件依赖项

5. **使用动态交付**：
   - Android App Bundle (.aab)
   - iOS On Demand Resources
    `
  },
  {
    id: 25,
    title: '如何实现实时聊天功能？',
    tags: ['网络', 'WebSocket'],
    difficulty: '困难',
    answer: `
**实现方案**：
1. **协议选择**：
   - WebSocket
   - Socket.IO
   - Firebase Realtime Database

2. **使用 web_socket_channel 包**：
\`\`\`dart
final channel = WebSocketChannel.connect(
  Uri.parse('wss://echo.websocket.org'),
);

// 发送消息
channel.sink.add('Hello');

// 接收消息
StreamBuilder(
  stream: channel.stream,
  builder: (context, snapshot) {
    return Text(snapshot.hasData ? '\${snapshot.data}' : '');
  },
)
\`\`\`

3. **功能扩展**：
   - 消息持久化（Hive/SQLite）
   - 消息状态管理（已发送/已送达/已读）
   - 支持多媒体消息
   - 离线消息同步
    `
  },
  {
    id: 26,
    title: '如何测试 Flutter 应用？',
    tags: ['测试'],
    difficulty: '中等',
    answer: `
**测试类型**：
1. **单元测试**：测试单个函数/方法
   \`\`\`dart
   test('Counter value should increment', () {
     final counter = Counter();
     counter.increment();
     expect(counter.value, 1);
   });
   \`\`\`

2. **Widget 测试**：测试单个组件
   \`\`\`dart
   testWidgets('MyWidget has a title', (tester) async {
     await tester.pumpWidget(MyWidget(title: 'T'));
     expect(find.text('T'), findsOneWidget);
   });
   \`\`\`

3. **集成测试**：端到端测试
   \`\`\`dart
   IntegrationTestWidgetsFlutterBinding.ensureInitialized();
   
   testWidgets('Login flow', (tester) async {
     await tester.pumpWidget(MyApp());
     await tester.enterText(find.byType(TextField), 'user');
     await tester.tap(find.byType(ElevatedButton));
     await tester.pumpAndSettle();
     expect(find.text('Welcome'), findsOneWidget);
   });
   \`\`\`
    `
  },
  {
    id: 27,
    title: '如何处理应用生命周期？',
    tags: ['生命周期'],
    difficulty: '中等',
    answer: `
**监听生命周期**：
1. **WidgetsBindingObserver**：
\`\`\`dart
class LifecycleObserver with WidgetsBindingObserver {
  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    switch(state) {
      case AppLifecycleState.resumed:
        // 应用可见
      case AppLifecycleState.inactive:
        // 应用处于非活动状态
      case AppLifecycleState.paused:
        // 应用不可见
      case AppLifecycleState.detached:
        // 应用销毁
    }
  }
}

// 注册观察者
WidgetsBinding.instance.addObserver(LifecycleObserver());
\`\`\`

2. **使用插件**：
   - flutter_lifecycle_state
   - app_state
    `
  },
  {
    id: 28,
    title: '如何实现深链接（Deep Linking）？',
    tags: ['导航'],
    difficulty: '困难',
    answer: `
**实现步骤**：
1. **配置 AndroidManifest.xml**：
\`\`\`xml
<intent-filter>
  <action android:name="android.intent.action.VIEW"/>
  <category android:name="android.intent.category.DEFAULT"/>
  <category android:name="android.intent.category.BROWSABLE"/>
  <data android:scheme="myapp" android:host="example.com"/>
</intent-filter>
\`\`\`

2. **配置 Info.plist**：
\`\`\`xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>myapp</string>
    </array>
  </dict>
</array>
\`\`\`

3. **处理链接**：
\`\`\`dart
void initState() {
  super.initState();
  FirebaseDynamicLinks.instance.onLink.listen((link) {
    handleDeepLink(link.link);
  });
}

void handleDeepLink(Uri uri) {
  if (uri.path == '/profile') {
    Navigator.push(context, ProfileScreen());
  }
}
\`\`\`
    `
  },
  {
    id: 29,
    title: '如何实现动画路由切换？',
    tags: ['动画', '导航'],
    difficulty: '中等',
    answer: `
**自定义页面过渡**：
1. **继承 PageRouteBuilder**：
\`\`\`dart
Navigator.push(
  context,
  PageRouteBuilder(
    pageBuilder: (_, __, ___) => DetailScreen(),
    transitionsBuilder: (_, animation, __, child) {
      return FadeTransition(
        opacity: animation,
        child: child,
      );
    },
  ),
);
\`\`\`

2. **使用预置动画**：
\`\`\`dart
MaterialPageRoute(
  builder: (_) => DetailScreen(),
  settings: routeSettings,
  fullscreenDialog: true,  // 上滑动对话框效果
)
\`\`\`

3. **自定义复杂过渡**：
\`\`\`dart
transitionsBuilder: (context, animation, secondaryAnimation, child) {
  return SlideTransition(
    position: Tween<Offset>(
      begin: Offset(1.0, 0.0),
      end: Offset.zero,
    ).animate(animation),
    child: child,
  );
}
\`\`\`
    `
  },
  {
    id: 30,
    title: '如何处理应用内支付？',
    tags: ['支付'],
    difficulty: '困难',
    answer: `
**实现步骤**：
1. **添加依赖**：
\`\`\`yaml
dependencies:
  in_app_purchase: ^3.0.0
\`\`\`

2. **初始化支付**：
\`\`\`dart
final iap = InAppPurchase.instance;
if (!await iap.isAvailable()) {
  throw IAPNotAvailableException();
}
\`\`\`

3. **查询商品**：
\`\`\`dart
const productIds = {'product1', 'product2'};
final response = await iap.queryProductDetails(productIds);
\`\`\`

4. **发起购买**：
\`\`\`dart
final purchaseDetails = await iap.buyNonConsumable(
  purchaseParam: PurchaseParam(
    productDetails: productDetails,
  ),
);
\`\`\`

5. **验证收据**：
\`\`\`dart
void verifyPurchase(PurchaseDetails details) {
  if (details.status == PurchaseStatus.purchased) {
    // 向服务器验证凭据
  }
}
\`\`\`
    `
  }
];

export default questions21_30;