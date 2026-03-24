# 🚀 部署指南

## 方案一：Vercel 一键部署（推荐）

### 步骤

1. **访问 Vercel**
   - 打开 https://vercel.com
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add New Project"
   - 选择 "Import Git Repository"
   - 选择 `our-life-map` 仓库

3. **配置环境变量（可选）**
   ```
   VITE_SUPABASE_URL=你的 Supabase URL
   VITE_SUPABASE_ANON_KEY=你的 Supabase Anon Key
   ```

4. **点击 Deploy**
   - 等待构建完成（约 1-2 分钟）
   - 获得访问链接：`https://our-life-map.vercel.app`

5. **自定义域名（可选）**
   - 在 Vercel 项目设置中添加自定义域名
   - 如：`ourlife.你的域名.com`

### 优点
- ✅ 完全免费
- ✅ 自动 HTTPS
- ✅ 全球 CDN 加速
- ✅ 自动部署（关联 GitHub）

---

## 方案二：Netlify 部署

### 步骤

1. 访问 https://netlify.com
2. 拖拽 `dist` 文件夹到部署区域
3. 获得访问链接

### 构建命令
```bash
npm run build
```

### 发布目录
```
dist
```

---

## 方案三：GitHub Pages

### 步骤

1. **安装 gh-pages**
   ```bash
   npm install -D gh-pages
   ```

2. **修改 package.json**
   ```json
   {
     "homepage": "https://你的用户名.github.io/our-life-map",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **部署**
   ```bash
   npm run deploy
   ```

4. **访问**
   - https://你的用户名.github.io/our-life-map

---

## 📱 手机访问

部署完成后，用手机浏览器打开链接即可！

网站已完美适配移动端：
- ✅ 响应式布局
- ✅ 触摸友好的按钮大小
- ✅ 优化的图片加载
- ✅ 流畅的动画效果

---

## 🔐 安全提示

当前版本使用前端简单密码验证：
- ✅ 适合私密分享（只有你们知道链接和密码）
- ⚠️ 不适合公开传播

如需更高安全性，建议：
1. 启用 Supabase Auth
2. 配置邮箱验证
3. 设置访问白名单

---

## 💡 使用建议

1. **首次部署后**
   - 修改默认密码（`src/config/supabase.js`）
   - 测试所有功能
   - 手机和电脑都访问一次

2. **日常使用**
   - 每次旅行后添加记录
   - 定期查看时光轴回忆
   - 用留言功能给对方惊喜

3. **数据备份**
   - 当前使用 LocalStorage 存储
   - 建议定期导出重要数据
   - 未来会升级云存储版本

---

## 🆘 常见问题

### Q: 照片上传后换设备看不到？
A: 当前版本使用 LocalStorage，数据保存在本地。未来会升级云存储版本支持多设备同步。

### Q: 地图加载慢？
A: 首次加载需要下载中国地图数据（约 1MB），之后会缓存。

### Q: 如何修改密码？
A: 编辑 `src/config/supabase.js` 中的 `SHARED_PASSWORD`，重新部署即可。

### Q: 可以添加更多城市吗？
A: 编辑 `src/data/cities.js`，按格式添加新城市即可。

---

**部署完成后，把链接和密码告诉你的她吧～** 💕
