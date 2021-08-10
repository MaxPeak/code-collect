```shell
# 初始化
npm init -y
# 通过脚手架创建项目
npm init <pkgName> <projectName>
# 安装包 不传<pkgName>默认全部 @<version>为指定版本
npm install <pkgName> @<version>
# 卸载包 -g表示全局
npm uninstall <pkgName> -g
# 更新包
npm update <pkgName>
# 登录npm
npm login
# 上传包
npm publish
# 删除包
npm unpublish -f <pkgName>
# 查看全局安装包 --depth 表示指定深度
npm list -g --depth 0
# 查看包的全部版本
npm view <pkgName> versions
# 查看npm 全局安装的根目录
npm bin
# 创建软连接
npm link
```