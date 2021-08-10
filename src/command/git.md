```shell
# 初始化本地仓库
git init
# 提交工作区文件到暂存区 <filename>可以使用通配符
git add <path || filename>
# 提交暂存区内容到本地仓库
git commit -m <description>
# 关联远程仓库
git remote add <remote> <path>
# 取消远程仓库关联
git remote remove <remote>
# 查看当前关联的仓库地址
git remote -v
# 推送本地分支到远程分支 如果想设置默认主机  可以用-u参数
git push <remote> <branch>
# 添加本地分支到远程分支
git push <remote> <local_branch>:<remote_branch>
# 下载远程分支但不合并
git fetch <remote>
# 拉取远程分支到本地并合并
git pull <remote> <branch>
# 克隆远程仓库到本地
git clone <remote>
# 创建分支
git branch <branch>
# 分支列表 名字前面有*的表示当前分支 -r为远程分支 -a为所有分支
git branch
# 切换分支
git checkout <branch>
# 创建分支并切换 -b表示创建并切换
git checkout -b <branch>
# 基于远程分支创建本地分支
git checkout -b <local_branch> <remote_branch>
# 合并指定分支到当前分支
git merge <branch>
# 撤销工作区修改
git checkout -- <filename>
# 创建分支并切换 -c表示创建并切换
git switch -c <branch>
# 切换分支
git switch <branch>
# 删除分支 -D 表示强制删除
git branch -d <branch>
# 删除远程分支
git push <remote> --delete <branch>
# 查看提交历史 添加--graph查看分支合并图
git log
# 查看命令历史
git reflog
# 查看当前分支状态
git status
# 回退版本 --hard(修改版本库，修改暂存区，修改工作区) --soft(修改版本库，保留暂存区，保留工作区) --mixed(修改版本库，修改暂存区，保留工作区)
git reset --hard <commit_id || HEAD> 回退版本
# 把暂存区的修改撤销掉，重新放回工作区
git reset HEAD
# 撤销commit，会新生成一个commit，不会修改历史提交记录
git revert -n <commit_id>
# 删除文件
git rm <filename>
# 储藏现在工作区的内容，一般用作合并冲突或者是临时修改bug时使用
git stash
# 储藏的内容列表
git stash list
# 恢复储藏的内容到工作区并且删掉储藏的内容
git stash pop
# 恢复储藏的内容到工作区但不删除储藏的内容
git stash apply
# 恢复多个储藏内容的某一个
git stash apply stash@{0}
# 将指定的commit应用于当前的分支
git cherry-pick <commit_id || branch>
# 查看git push 默认的远程分支名用什么命令
git branch -vv
# 从其他项目拉取commit到当前项目
git cherry-pick <commit_id>
```