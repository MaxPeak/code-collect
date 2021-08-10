```shell
# 命令指南 得到当前指令的完整说明 -k在不知道命令的名字时使用，检索关键字
man <command name> -k
# 进入指定目录 <path>的三个常用值 ..表示上一级目录 /表示根目录 -表示上次停留位置
cd <path>
# 列出当前路径的文件和目录 文件为灰色 目录为蓝色 -a参数可以查看隐藏文件
ls
# 显示当前工作路径
pwd
# 查看文件内容
cat <filename>
# 查看文件 按q退出 按v进入vi编辑
less <filename>
# 输出文件信息
file <filename>
# 检索文件 <dir>为需要检索的目标目录 -name为参数 表示按名字检索 <name>为名字，值为字符串需要带引号，可使用通配符
find <dir> -name <name>
# 创建目录
mkdir <dir-name>
# 创建文件
touch <filename>
# 复制 -r为递归参数(通用) 复制整个目录所有内容会用
cp <origin-path> <target-path>
# 移动 名称相同时当做重命名使用
mv <origin-path> <target-path>
# 删除 一般配合-r参数递归删除 -f表示不用确认，直接删除
rm <path>
# vi编辑 esc切换到命令模式 :q表示不保存修改直接退出 :w表示保存不退出 :wq表示保存并且退出
vi <path>
# root权限
sudo <command>
# finder打开
open <path>
# 终止命令
command + c
# 历史记录 使用的命名历史记录
history
# 关闭命令行
exit
# 查看网络通讯
ping <ip>
# 查看ip地址配置
ifconfig
# 查看磁盘空间
df <option>
# 查看文件大小 -h带单位 -s只显示总计
du <option> <path>
# 进程列表
lsof -i:端口号
# 关闭指定进程
kill -9 <pid>
# 字符串输出 <content>为字符串
echo <content>
# 重定向符
# > 表示将符号左侧的内容，以覆盖的方式输入到右侧文件中
echo "content" > file.txt
# >> 表示将符号左侧的内容，以追加的方式输入到右侧文件的末尾行中
echo "content" >> file.txt
# 管道符 <command1>执行结果传递给<command2>使用
<command1> | <command2>
# 逻辑或 <command1>执行成功 继续执行<command2> 否则不执行<command2>
<command1> && <command2>
# 逻辑或 <command1>执行失败 继续执行<command2> 否则不执行<command2>
<command1> || <command2>
# 查找文件里符合条件的字符串
grep <option> <content> <path>
```