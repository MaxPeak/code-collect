```shell
# 通过脚手架创建项目
yarn create <pkgName> <projectName>
# 安装包 不传<pkgName>默认全部 @<version>为指定版本
yarn add <pkgName> @<version>
# 卸载包 -g表示全局
yarn remove <pkgName> -g
# 更新包
yarn upgrade <pkgName>
# 查看全局安装包 --depth 表示指定深度
yarn list -g --depth=0
# 查看yarn 全局安装的根目录
yarn global bin
```