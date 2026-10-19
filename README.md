# Cynthia 作品集网站

这是钟晓楠作品集的固定代码仓库。后续网站修改统一在这里进行，不再维护多个同名版本。

## 固定位置

本地目录：`C:\Users\Administrator\Documents\Codex\cynthia-portfolio`

GitHub远程地址：尚未绑定。在线作品集地址：尚未部署。

## 文件结构

```text
site/
  index.html       页面内容
  style.css        排版与样式
  app.js           图片查看、分类、视频等交互
  assets/          网站实际使用的图片和视频
scripts/
  validate.py      发布前文件与引用检查
.github/workflows/
  pages.yml        推送后检查并发布到GitHub Pages
```

源文件路径、私人复盘、原始手册、未处理截图和简历不放入这个仓库。工作流只发布`site`，不发布仓库说明或内部维护规则。

## 首次连接 GitHub

1. 创建或选定一个属于自己的GitHub仓库，将地址提供给协助维护网站的人。不要提供密码或令牌。
2. 连接远程并完成首次推送。现有仓库如有内容，先检查再合并，不强制覆盖。
3. 在仓库Settings → Pages中，将Source选为GitHub Actions。
4. 在Actions中等待发布工作流成功；使用GitHub实际返回的Pages网址作为作品集链接。

免费账户通常需要公开仓库才能使用GitHub Pages；私人仓库是否支持取决于账户计划。首次发布前应确认源代码、联系方式和作品的公开范围。

## 以后怎样更新

修改本仓库中的网站 → 检查 → Git提交 → 推送到GitHub的main分支 → Actions检查并发布。

本地保存不等于GitHub更新；推送成功也不等于网站部署成功。每次交付分别确认提交、推送与部署状态。部署失败时，线上可能仍保留上个成功版本。

## 本地查看

可以直接用浏览器打开`site/index.html`。也可在仓库目录运行：

```text
python -m http.server 8766 --bind 127.0.0.1 --directory site
```

然后访问`http://127.0.0.1:8766/`。该本地地址只有服务运行时可用，不是对外投递地址。

## 检查

```text
python scripts/validate.py
node --check site/app.js
```

流程参考：[GitHub Pages官方工作流文档](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。
