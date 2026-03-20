# FPMCAE 官方网站

FPMCAE（Finite Particle Method Computer-Aided Engineering）是由浙江大学罗尧治教授团队自主研发的通用结构复杂行为仿真分析软件官方网站。

## 项目概述

本项目是一个响应式单页网站，用于展示FPMCAE软件的功能特性、应用案例和技术文档。

## 功能特性

### 1. 多语言支持
- 中文（简体）
- English
- 语言切换自动保存用户偏好

### 2. 模块功能

#### 导航栏
- Logo与品牌展示
- 下载入口
- 文档下拉菜单
- 语言切换

#### 轮播Banner
- 自动轮播（5秒间隔）
- 手动切换控制
- 粒子动画效果
- 支持3张不同主题的轮播图

#### 简介模块
- 软件介绍文字
- 居中的排版设计

#### 功能模块
- 核心算法介绍
- 前后处理功能
- 多种求解器引擎
- 并行计算能力

#### 应用领域模块
- 土木交通
- 机械制造
- 航空航天
- 其他应用领域

#### 最近消息模块（新增）
- 展示最新6条消息
- 点击跳转微信公众号文章
- 响应式卡片布局
- 包含日期、标题、摘要

#### 算例库模块（新增）
- 分类筛选（全部/结构分析/动力分析/非线性分析）
- 算例卡片展示
- 下载功能
- 文件信息显示

#### 视频介绍模块
- 自定义视频播放器
- 播放控制
- 封面海报

#### 联系我们模块
- 邮箱地址
- QQ技术群
- 微信公众号二维码
- QQ群二维码

#### 页脚
- 导航链接
- 版权信息
- 机构信息

### 3. 交互效果
- 平滑滚动
- 滚动动画
- 回到顶部按钮
- 导航栏滚动效果
- 悬停动画效果

## 项目结构

```
FPMCAEWEB/
├── index.html              # 主HTML文件
├── css/
│   └── style.css           # 样式文件（约800行）
├── js/
│   └── main.js             # JavaScript文件（交互逻辑）
├── lang/
│   ├── zh.json            # 中文语言文件
│   └── en.json            # 英文语言文件
├── data/
│   ├── news.json          # 消息数据
│   └── examples.json      # 算例数据
├── images/
│   ├── banner/            # 轮播图
│   ├── qrcodes/           # 二维码
│   ├── icons/             # 图标
│   └── examples/          # 算例预览图
├── videos/
│   └── fpmcae-intro.mp4   # 介绍视频
├── examples/
│   └── docs/              # 算例文档
└── README.md              # 项目说明
```

## 技术栈

- **HTML5** - 语义化标签
- **CSS3** - Flexbox/Grid布局、动画、变量
- **JavaScript (ES6+)** - 模块化、异步操作
- **Font Awesome** - 图标库
- **Google Fonts** - Inter字体

## 浏览器兼容性

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 快速开始

### 本地预览

1. 克隆或下载项目
2. 直接在浏览器中打开 `index.html`
3. 或使用本地服务器：

```bash
# Python 3
python -m http.server 8000

# Node.js (需安装http-server)
npx http-server -p 8000
```

4. 访问 `http://localhost:8000`

### 部署

将项目文件上传到任意Web服务器即可：
- Nginx
- Apache
- GitHub Pages
- 云存储（阿里云OSS、腾讯云COS等）

## 自定义配置

### 修改轮播图

编辑 `index.html` 中的 `.carousel-slide` 元素：

```html
<div class="carousel-slide active" style="background: url('images/banner/your-image.jpg')">
    <div class="banner-content">
        <h2>您的标题</h2>
        <p>您的描述</p>
    </div>
</div>
```

### 修改消息数据

编辑 `data/news.json` 或直接在 `js/main.js` 中修改 `newsData` 数组：

```javascript
const newsData = [
    {
        id: 1,
        title: '消息标题',
        summary: '消息摘要',
        date: '2024-03-01',
        icon: 'fa-icon-name',
        url: 'https://mp.weixin.qq.com/s/xxx'
    }
];
```

### 修改算例数据

编辑 `data/examples.json` 或 `js/main.js` 中的 `examplesData` 数组。

### 修改语言文本

编辑 `lang/zh.json` 和 `lang/en.json` 文件。

## 资源替换

### 替换Logo

1. 准备SVG格式的Logo文件
2. 替换 `index.html` 中 `.logo-icon svg` 的内容

### 替换二维码

1. 将二维码图片放入 `images/qrcodes/`
2. 命名：`wechat-qr.png` 和 `qq-qr.png`
3. 在 `index.html` 中替换占位符代码

### 替换视频

1. 将视频文件放入 `videos/`
2. 命名：`fpmcae-intro.mp4`
3. 准备封面图 `images/banner/video-poster.jpg`

## 注意事项

1. **跨域问题**：本地开发时某些功能可能受限，建议使用本地服务器
2. **视频格式**：请确保视频编码为H.264以保证浏览器兼容性
3. **图片优化**：生产环境建议压缩图片以提高加载速度
4. **SEO优化**：可根据需要添加meta标签和结构化数据

## 后续优化建议

1. 添加暗黑模式支持
2. 实现搜索功能
3. 添加用户反馈表单
4. 集成访问统计
5. 添加多语言自动检测

## 许可证

版权所有 © 2024 浙江大学 · 浙江大学长三角智慧绿洲创新中心

## 联系方式

- 邮箱：fpmcae@zju.edu.cn
- QQ技术群：437808661
