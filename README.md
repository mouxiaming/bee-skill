# TradeW OpenClaw Skill Pack

This repository contains a collection of OpenClaw-compatible skills for accessing the TradeW Open API. 
Each skill is isolated, minimal, and follows a unified structure for stable production usage.

---

# Directory Structure

# 获取 API Token

在使用本 Skill Pack 之前，你需要先获取 TradeW API Token：

1. 访问 https://www.tradew.com/
2. 注册账号并登录
3. 进入开发者中心申请 API Token
4. 复制你的 TRADEW_API_TOKEN

## 配置环境变量

获取 Token 后，设置环境变量：

Linux / macOS:
export TRADEW_API_TOKEN=你的token

Windows (PowerShell):
$env:TRADEW_API_TOKEN="你的token"