
## 使用 Jekyll CMS 和 egg sass

- [jekyll](https://jekyllrb.com/) 
- [egg](https://wiredcraft.github.io/egg/)

## 下载 & 运行

1. 确保 Ruby 2.1.0+:

        ruby --version

2. 下载 `github-pages` gem;

        gem install github-pages

*如果无法运行，请查看 [GitHub help](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/).*

3. 运行网站:

        make serve

    浏览器输入 http://localhost:4000. 这时会下载 Jekyll 配置文件 (`_config.yml`) 和开发版配置 (`_config-dev.yml`)，并确保配置选项 `--incremental`.

    *更多细节, 请查看 `Makefile`.*