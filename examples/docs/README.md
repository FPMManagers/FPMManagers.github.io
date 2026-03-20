# 算例库文档说明

此目录用于存放FPMCAE软件的各种算例文档。

## 文件命名规范

- 算例文件应使用英文命名，小写字母，单词间用下划线连接
- 格式：`算例名称_版本号.zip`
- 示例：`cantilever_beam_v1.0.zip`

## 算例内容要求

每个算例压缩包应包含以下内容：

```
算例名称/
├── README.md          # 算例说明文档
├── model.fpm          # FPM模型文件
├── materials.mat      # 材料参数文件
├── results/           # 结果文件夹
│   ├── displacement.txt
│   ├── stress.txt
│   └── animation.mp4
└── figures/           # 示意图文件夹
    ├── geometry.png
    └── mesh.png
```

## 现有算例列表

| 文件名 | 说明 | 大小 | 更新时间 |
|--------|------|------|----------|
| cantilever_beam.zip | 悬臂梁静力分析 | 2.5 MB | 2024-03-01 |
| simply_supported_beam.zip | 简支梁动力响应分析 | 3.2 MB | 2024-02-28 |
| flexible_rod.zip | 大变形柔性杆件分析 | 4.1 MB | 2024-02-25 |
| truss_buckling.zip | 桁架结构屈曲分析 | 2.8 MB | 2024-02-20 |
| seismic_frame.zip | 地震作用下框架结构响应 | 5.5 MB | 2024-02-15 |
| contact_impact.zip | 接触碰撞问题分析 | 3.8 MB | 2024-02-10 |

## 添加新算例步骤

1. 准备算例文件，按上述结构组织
2. 压缩为zip格式
3. 更新 `data/examples.json` 文件，添加算例信息
4. 将压缩包放置到此目录
5. 测试下载功能是否正常

## 注意事项

- 单个算例文件大小建议不超过50MB
- 结果文件可单独打包，减小主文件体积
- 图片请使用压缩后的格式（JPG/PNG）
