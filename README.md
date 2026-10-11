# Zhang Zhehao - Academic Homepage

A lightweight personal academic website built with Hugo and prepared for GitHub Pages.

## Update content

Most edits only require changing files under data/:

- data/profile.yaml - name, introduction, email, and future social links
- data/publications.yaml - papers and publication links
- data/news.yaml - homepage news
- data/education.yaml - education
- data/experience.yaml - research and work experience

The portrait is stored at static/images/portrait.png.

## Preview locally

Install Hugo, run hugo server, then open the local address printed by Hugo.

## Build

Run hugo --gc --minify. The generated site is written to public/, which is intentionally excluded from Git.

## Publish with GitHub Pages

Repository: https://github.com/Zhehao-Zhang/Zhehao-Zhang.github.io

Website: https://zhehao-zhang.github.io/

GitHub Pages uses GitHub Actions as its source. The included workflow builds and deploys the site automatically after each push to main.

To publish future updates, commit your content changes and run git push origin main. Check the Actions tab for the build and deployment status.

A custom domain can be added later from Settings -> Pages.
