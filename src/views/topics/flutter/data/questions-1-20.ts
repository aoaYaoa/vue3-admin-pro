const questions1_20  = [
  {
    id: 1,
    title: 'Flutter 的主要特点是什么？',
    tags: ['Flutter', '基础概念'],
    difficulty: '简单',
    answer: `
1. **跨平台开发**：使用单一代码库构建 iOS、Android、Web 和桌面应用
2. **高性能**：通过 Dart 的 AOT 编译和自绘引擎实现接近原生的性能
3. **热重载**：快速迭代开发，实时查看代码修改效果
4. **丰富的组件库**：提供 Material Design 和 Cupertino 风格的组件
5. **声明式 UI**：通过 Widget 树构建直观的 UI 结构
    `,
    code: `// 示例：基本 Flutter 应用结构
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: Scaffold(
        appBar: AppBar(title: Text('Welcome to Flutter')),
        body: Center(child: Text('Hello World')),
      ),
    );
  }
}`
  },
  {
    id: 2,
    title: 'StatefulWidget 和 StatelessWidget 的区别是什么？',
    tags: ['Widget', '状态管理'],
    difficulty: '中等',
    answer: `
**StatelessWidget**:
- 不可变 Widget
- 一旦创建，属性不可改变
- 适用于静态内容展示
- 性能更优

**StatefulWidget**:
- 可维护可变状态
- 通过 setState() 触发重建
- 适用于需要动态更新的界面
- 由两个类组成：Widget 和 State 对象

**使用场景**：
- 需要用户交互时使用 StatefulWidget
- 纯展示内容使用 StatelessWidget
    `
  },
  {
    id: 3,
    title: '如何实现页面导航？',
    tags: ['导航', '路由'],
    difficulty: '中等',
    answer: `
1. **基本导航**：
\`\`\`dart
Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => SecondScreen()),
);
\`\`\`

2. **命名路由**：
\`\`\`dart
// 在 MaterialApp 中配置
routes: {
  '/second': (context) => SecondScreen(),
}

// 使用
Navigator.pushNamed(context, '/second');
\`\`\`

3. **返回结果**：
\`\`\`dart
// 发送数据
Navigator.pop(context, '返回数据');

// 接收数据
var result = await Navigator.push(...);
\`\`\`
    `,
    code: `// 示例：基本导航实现
class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      child: Text('Go to Details'),
      onPressed: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => DetailsPage()),
        );
      },
    );
  }
}`
  },
  {
    id: 4,
    title: '什么是 Widget 树、Element 树和 RenderObject 树？',
    tags: ['架构', '渲染'],
    difficulty: '困难',
    answer: `
**三棵树架构**：
1. **Widget 树**：
- 声明式 UI 的描述
- 不可变，每次重建都会创建新实例
- 轻量级，仅保存配置信息

2. **Element 树**：
- Widget 的实例化对象
- 管理 Widget 的生命周期
- 维护父子关系，负责状态管理

3. **RenderObject 树**：
- 实际执行布局和绘制的对象
- 处理复杂的计算和渲染逻辑
- 每个 RenderObject 对应屏幕上的一个视觉元素

**关系**：
Widget → 创建 → Element → 关联 → RenderObject
    `
  },
  {
    id: 5,
    title: '如何优化 Flutter 应用的性能？',
    tags: ['性能优化'],
    difficulty: '困难',
    answer: `
1. **避免不必要的重建**：
- 使用 const 构造函数
- 合理使用 shouldRepaint 和 shouldRebuild

2. **列表优化**：
- 使用 ListView.builder 进行懒加载
- 添加 itemExtent 提高滚动性能
- 使用 AutomaticKeepAliveClientMixin

3. **图片优化**：
- 使用合适分辨率的图片
- 缓存网络图片（cached_network_image）
- 使用 WebP 格式

4. **状态管理**：
- 选择合适的状态管理方案（Provider、Riverpod、Bloc）
- 避免在顶层保存过多状态

5. **Isolate 使用**：
- 将耗时操作放到 Isolate 中执行
- 使用 compute 函数简化操作
    `,
    code: `// 示例：使用 ListView.builder
ListView.builder(
  itemCount: 1000,
  itemExtent: 50.0, // 固定高度提升性能
  itemBuilder: (context, index) {
    return ListTile(
      title: Text('Item \$index'),
    );
  },
)`
  },
  {
    id: 6,
    title: 'Dart 中的 async/await 如何工作？',
    tags: ['Dart', '异步编程'],
    difficulty: '中等',
    answer: `
**异步编程模型**：
1. **Future**：表示可能尚未完成的异步操作
2. **async**：标记函数为异步函数
3. **await**：等待异步操作完成

**特点**：
- 异步函数返回 Future 对象
- await 只能在 async 函数中使用
- 使用 try/catch 处理异步错误
- 不会阻塞主线程

**示例流程**：
1. 发起网络请求（异步）
2. 使用 await 等待响应
3. 处理响应数据
4. 捕获处理异常
    `,
    code: `// 示例：异步网络请求
Future<void> fetchData() async {
  try {
    var response = await http.get('https://api.example.com/data');
    print('数据获取成功: \${response.body}');
  } catch (e) {
    print('请求失败: \$e');
  }
}`
  },
  {
    id: 7,
    title: '如何实现主题切换功能？',
    tags: ['主题', '样式'],
    difficulty: '中等',
    answer: `
1. **定义主题数据**：
\`\`\`dart
final ThemeData lightTheme = ThemeData(
  brightness: Brightness.light,
  primaryColor: Colors.blue,
);

final ThemeData darkTheme = ThemeData(
  brightness: Brightness.dark,
  primaryColor: Colors.indigo,
);
\`\`\`

2. **使用 Provider 状态管理**：
\`\`\`dart
class ThemeProvider with ChangeNotifier {
  ThemeData _themeData = lightTheme;

  ThemeData get theme => _themeData;

  void toggleTheme() {
    _themeData = _themeData == lightTheme ? darkTheme : lightTheme;
    notifyListeners();
  }
}
\`\`\`

3. **应用主题**：
\`\`\`dart
MaterialApp(
  theme: Provider.of<ThemeProvider>(context).theme,
)
\`\`\`
    `
  },
  {
    id: 8,
    title: 'Flutter 如何与原生平台交互？',
    tags: ['平台交互', 'MethodChannel'],
    difficulty: '困难',
    answer: `
**平台通道（Platform Channels）**：
1. **MethodChannel**：双向通信
2. **EventChannel**：持续事件流
3. **BasicMessageChannel**：简单消息传递

**实现步骤**：
1. Flutter 端创建 MethodChannel
2. 调用 invokeMethod 发送请求
3. 原生端注册方法处理程序
4. 返回处理结果

**示例（获取电池电量）**：
Flutter 端：
\`\`\`dart
static const platform = MethodChannel('samples.flutter.dev/battery');
final int result = await platform.invokeMethod('getBatteryLevel');
\`\`\`

Android 端（Kotlin）：
\`\`\`kotlin
MethodChannel(flutterEngine.dartExecutor, "samples.flutter.dev/battery")
  .setMethodCallHandler { call, result ->
    when (call.method) {
      "getBatteryLevel" -> {
        val batteryLevel = getBatteryLevel()
        result.success(batteryLevel)
      }
      else -> result.notImplemented()
    }
  }
\`\`\`
    `
  },
  {
    id: 9,
    title: '什么是 Key？在什么情况下需要使用？',
    tags: ['Widget', 'Key'],
    difficulty: '中等',
    answer: `
**Key 的作用**：
- 唯一标识 Widget
- 在 Widget 树重建时保持状态
- 帮助框架区分相同类型的 Widget

**使用场景**：
1. 列表项（保持滚动位置）
2. 表单字段（保持输入状态）
3. 有状态的 Widget 需要保持状态时
4. 需要强制重建 Widget 时

**类型**：
- LocalKey：用于同一父节点下的子节点
  - ValueKey
  - ObjectKey
  - UniqueKey
- GlobalKey：全局唯一标识
    `,
    code: `// 示例：列表项使用 Key
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) {
    return ListItem(
      key: ValueKey(items[index].id), // 使用唯一标识作为 Key
      item: items[index],
    );
  },
)`
  },
  {
    id: 10,
    title: '如何实现自定义绘制？',
    tags: ['自定义绘制', 'Canvas'],
    difficulty: '困难',
    answer: `
**CustomPainter 使用步骤**：
1. 创建继承自 CustomPainter 的类
2. 实现 paint 和 shouldRepaint 方法
3. 使用 CustomPaint Widget

**示例：绘制圆形进度条**：
\`\`\`dart
class CircleProgressPainter extends CustomPainter {
  final double progress;

  CircleProgressPainter(this.progress);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.blue
      ..strokeWidth = 5
      ..style = PaintingStyle.stroke;

    final center = Offset(size.width/2, size.height/2);
    final radius = size.width/2 - 10;
    
    // 绘制背景圆
    canvas.drawCircle(center, radius, paint);
    
    // 绘制进度弧
    paint.color = Colors.green;
    canvas.drawArc(
      Rect.fromCircle(center: center, radius: radius),
      -0.5 * pi,
      2 * pi * progress,
      false,
      paint,
    );
  }

  @override
  bool shouldRepaint(CircleProgressPainter old) => old.progress != progress;
}
\`\`\`
    `
  },
  {
    id: 11,
    title: 'Flutter 的布局机制是怎样的？',
    tags: ['布局', '渲染'],
    difficulty: '困难',
    answer: `
**布局流程**：
1. **约束传递**：父 Widget 向子 Widget 传递布局约束（最小/最大宽高）
2. **尺寸确定**：子 Widget 根据约束决定自身尺寸
3. **位置确定**：父 Widget 根据布局逻辑确定子 Widget 位置
4. **绘制**：从渲染树根节点开始递归绘制

**布局原则**：
- 宽度优先于高度
- 约束向下传递，尺寸向上传递
- 父 Widget 决定子 Widget 的位置

**常见布局 Widget**：
- Container：组合布局
- Row/Column：线性布局
- Stack：层叠布局
- Expanded/Flexible：弹性布局
    `
  },
  {
    id: 12,
    title: '如何实现国际化？',
    tags: ['国际化', 'i18n'],
    difficulty: '中等',
    answer: `
**实现步骤**：
1. 添加依赖：
\`\`\`yaml
dependencies:
  flutter_localizations:
    sdk: flutter
  intl: ^0.17.0
\`\`\`

2. 创建 ARB 文件：
\`/lib/l10n/app_en.arb\`
\`\`\`json
{
  "appTitle": "My App",
  "@appTitle": {
    "description": "The title of the application"
  }
}
\`\`\`

3. 生成本地化类：
\`\`\`terminal
flutter gen-l10n
\`\`\`

4. 配置 MaterialApp：
\`\`\`dart
MaterialApp(
  localizationsDelegates: AppLocalizations.localizationsDelegates,
  supportedLocales: AppLocalizations.supportedLocales,
)
\`\`\`

5. 使用本地化文本：
\`\`\`dart
Text(AppLocalizations.of(context)!.appTitle)
\`\`\`
    `
  },
  {
    id: 13,
    title: '如何调试 Flutter 应用？',
    tags: ['调试'],
    difficulty: '简单',
    answer: `
**调试工具和技术**：
1. **DevTools 套件**：
   - Widget 树检查
   - 性能分析
   - 内存监测
   - 网络请求跟踪

2. **日志输出**：
\`\`\`dart
print('调试信息');
debugPrint('带换行的调试信息');
\`\`\`

3. **断点调试**：
   - 在 IDE 中设置断点
   - 使用 debugger() 语句

4. **性能覆盖层**：
   - 显示 GPU 帧率（"P" 键）
   - 显示性能图表（"M" 键）

5. **Flutter Inspector**：
   - 实时查看 Widget 树
   - 检查布局约束
   - 高亮重绘区域
    `
  },
  {
    id: 14,
    title: '什么是 InheritedWidget？如何使用？',
    tags: ['状态管理', 'Widget'],
    difficulty: '中等',
    answer: `
**作用**：
- 数据共享的 Widget
- 沿 Widget 树向下传递数据
- 当数据变化时通知依赖的 Widget

**使用步骤**：
1. 创建继承自 InheritedWidget 的类
2. 实现 updateShouldNotify 方法
3. 在树的上层添加 InheritedWidget
4. 通过 context.dependOnInheritedWidgetOfExactType 获取实例

**示例**：
\`\`\`dart
class MyInheritedData extends InheritedWidget {
  final String data;

  MyInheritedData({required this.data, required Widget child}) : super(child: child);

  @override
  bool updateShouldNotify(MyInheritedData old) => old.data != data;

  static MyInheritedData? of(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<MyInheritedData>();
  }
}
\`\`\`
    `
  },
  {
    id: 15,
    title: '如何实现动画效果？',
    tags: ['动画'],
    difficulty: '中等',
    answer: `
**动画类型**：
1. **隐式动画**：使用 AnimatedFoo 系列组件
   - AnimatedContainer
   - AnimatedOpacity
   - AnimatedPadding

2. **显式动画**：
   - AnimationController
   - Tween
   - AnimationBuilder

**实现步骤（显式动画）**：
1. 创建 AnimationController
2. 定义 Tween 和 Curve
3. 使用 AnimatedBuilder 构建 UI
4. 控制动画启动/停止

**示例：淡入淡出动画**：
\`\`\`dart
class FadeAnimation extends StatefulWidget {
  @override
  _FadeAnimationState createState() => _FadeAnimationState();
}

class _FadeAnimationState extends State<FadeAnimation> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: Duration(seconds: 2),
    );
    _animation = Tween(begin: 0.0, end: 1.0).animate(_controller);
    _controller.repeat(reverse: true);
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Opacity(
          opacity: _animation.value,
          child: child,
        );
      },
      child: Text('Fading Text'),
    );
  }
}
\`\`\`
    `
  },
  {
    id: 16,
    title: '如何处理手势交互？',
    tags: ['手势'],
    difficulty: '中等',
    answer: `
**常用手势 Widget**：
- GestureDetector：通用手势检测
- InkWell：带涟漪效果的可点击区域
- Dismissible：滑动删除
- Draggable / DragTarget：拖拽交互

**手势类型**：
- onTap：点击
- onDoubleTap：双击
- onLongPress：长按
- onPanUpdate：拖拽
- onScaleUpdate：缩放

**示例：拖动旋转方块**：
\`\`\`dart
class RotatingBox extends StatefulWidget {
  @override
  _RotatingBoxState createState() => _RotatingBoxState();
}

class _RotatingBoxState extends State<RotatingBox> {
  double _rotation = 0.0;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onPanUpdate: (details) {
        setState(() {
          _rotation += details.delta.dx * 0.01;
        });
      },
      child: Transform.rotate(
        angle: _rotation,
        child: Container(
          width: 100,
          height: 100,
          color: Colors.blue,
        ),
      ),
    );
  }
}
\`\`\`
    `
  },
  {
    id: 17,
    title: '如何优化应用启动时间？',
    tags: ['性能优化'],
    difficulty: '困难',
    answer: `
**优化策略**：
1. **减少初始化工作**：
   - 延迟初始化非必要服务
   - 使用 isolate 进行耗时初始化

2. **优化首屏渲染**：
   - 使用骨架屏
   - 预加载关键数据
   - 减少首屏 Widget 复杂度

3. **代码优化**：
   - 移除未使用的依赖
   - 使用代码混淆（--obfuscate）
   - 开启代码压缩

4. **资源优化**：
   - 压缩图片资源
   - 延迟加载非必要资源
   - 使用矢量图标

5. **引擎初始化优化**：
   - 使用 FlutterEngineGroup 共享引擎
   - 预初始化引擎
    `
  },
  {
    id: 18,
    title: '什么是混合开发？如何集成到现有原生应用？',
    tags: ['混合开发'],
    difficulty: '困难',
    answer: `
**集成步骤**：
1. **创建 Flutter 模块**：
\`\`\`terminal
flutter create --template module my_flutter_module
\`\`\`

2. **Android 集成**：
   - 添加依赖到 build.gradle
   - 在 Activity 中嵌入 FlutterFragment

3. **iOS 集成**：
   - 添加 Flutter 到 Podfile
   - 创建 FlutterViewController

4. **通信机制**：
   - 使用 Platform Channel
   - 共享 MethodChannel

**注意事项**：
- 管理 FlutterEngine 生命周期
- 处理内存和性能问题
- 统一导航栈管理
    `
  },
  {
    id: 19,
    title: '如何实现深色模式？',
    tags: ['主题'],
    difficulty: '中等',
    answer: `
**实现方式**：
1. **系统级适配**：
\`\`\`dart
MaterialApp(
  theme: ThemeData.light(),
  darkTheme: ThemeData.dark(),
  themeMode: ThemeMode.system,
)
\`\`\`

2. **自定义主题切换**：
   - 使用 Provider 管理主题状态
   - 定义 light/dark 主题配置
   - 动态切换 ThemeData

3. **覆盖默认主题颜色**：
\`\`\`dart
ThemeData(
  brightness: Brightness.dark,
  primaryColor: Colors.blueGrey,
  accentColor: Colors.cyan,
)
\`\`\`

4. **适配自定义组件**：
   - 使用 Theme.of(context) 获取当前主题
   - 根据 brightness 调整颜色
    `
  },
  {
    id: 20,
    title: '如何处理网络请求？',
    tags: ['网络'],
    difficulty: '中等',
    answer: `
**常用方案**：
1. **http 包**：基础网络请求
2. **dio**：功能更强大的网络库
   - 拦截器
   - 文件上传/下载
   - 请求取消

**最佳实践**：
1. 封装网络请求层
2. 使用 Model 类解析 JSON
3. 错误统一处理
4. 添加 loading 状态管理

**示例（使用 dio）**：
\`\`\`dart
final dio = Dio();

Future<User> fetchUser() async {
  try {
    final response = await dio.get('/user/123');
    return User.fromJson(response.data);
  } on DioError catch (e) {
    if (e.response != null) {
      throw ServerException(e.response!.statusCode);
    } else {
      throw NetworkException();
    }
  }
}
\`\`\`
    `,
    code: `// JSON 解析示例
class User {
  final String name;
  final int age;

  User({required this.name, required this.age});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      name: json['name'],
      age: json['age'],
    );
  }
}`
  }
  // 继续添加更多题目...
];

export default questions1_20; 