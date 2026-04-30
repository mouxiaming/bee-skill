# 小蜜蜂开放平台技能包

该仓库包含一组用于访问 TradeW Open API 的兼容技能集合。
每个技能都是独立的、精简的，并遵循统一结构，以确保在生产环境中的稳定使用。

---

# 目录结构

# 获取 API__KEY

在使用本技能包之前之前，你需要先获取小蜜蜂 API_KEY：

1. 访问 https://open.tradew.com/
2. 注册账号并登录（如果已在小蜜蜂平台注册，并建站的企业直接使用主账号登录开放平台获取）
3. 进入开发者中心申请 API_KEY 并开通API对应权限
4. 复制你的 TRADEW_API_KEY

## 配置环境变量

获取 API_KEY 后，设置环境变量：

Linux / macOS:
export TRADEW_API_KEY=你的API_KEY

Windows (PowerShell):
$env:TRADEW_API_KEY="你的API_KEY"