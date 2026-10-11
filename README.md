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

1. Create a GitHub repository, ideally <username>.github.io.
2. Push this source repository to the main branch.
3. In GitHub, open Settings -> Pages and choose GitHub Actions as the source.
4. The included workflow builds and deploys the site automatically after each push.

A custom domain can be added later from Settings -> Pages.
