```shell
# 帮助信息
brew help
# 查看版本
brew -v
# 更新homebrew自己
brew update
# 安装包
brew install <pkgName>
# 查询可更新的包
brew outdated
# 更新包 pakName不传默认所有
brew upgrade <pkgName>
# 清理旧版本 pakName不传默认所有 -n表示只查看不执行
brew cleanup <pakName> -n
# 卸载包
brew uninstall <pakName>
# 查看包信息
brew info <pakName>
# 安装列表
brew list
# 查询可用包
brew search <pakName>
```