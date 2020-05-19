const nunjucks = require('nunjucks');
const path = require('path');
const cheerio = require('cheerio');
const URL = require('url');
const fs = require('fs');

const appRoot = path.resolve(__dirname, '../');

const casaRoot = path.resolve(require.resolve('@dwp/govuk-casa'), '../');
const casaViews = `${casaRoot}/views`;

const govukRoot = path.resolve(require.resolve('govuk-frontend'), '../');
const govukViews = `${govukRoot}`;

// const jinjaRoot = path.resolve(require.resolve('govuk_template_jinja'), '../../../');


const views = [
  path.resolve(__dirname, '../views'),
  casaViews,
  govukViews,
];

nunjucks.configure(views, {});

const mountUrl = '/CASA-MNT/';
const assetPath = '/ASSET-PATH';
let html = nunjucks.render('akamai/error.njk', {
  casa: { mountUrl },
  govuk: {
    assetPath,
    components: {
      header: {
        assetsPath: `${assetPath}/assets/images`,
        serviceName: 'Apply for Pension Credit',
        serviceUrl: mountUrl,
        homepageUrl: 'https://www.gov.uk/',
      },
    },
  },
});

const maps = {
  // app assets
  [`^${mountUrl}css/(.+)$`]: `${appRoot}/public/css/$1`,

  // casa assets
  [`^${mountUrl}govuk/casa/(.+)$`]: `${casaRoot}/dist/casa/$1`,

  // govuk-frontend assets
  [`^${assetPath}/assets/(.+)$`]: `${govukRoot}/assets/$1`,
  [`^${assetPath}/(.+)$`]: `${govukRoot}/assets/$1`,
  [`^${mountUrl}govuk/frontend/assets/(.*)$`]: `${govukRoot}/assets/$1`,
};

function mapUrlToType(url) {
  if (url.match(/.png$/)) {
    return 'image/png';
  }
  if (url.match(/.woff$/)) {
    return 'font/woff';
  }
  if (url.match(/.woff2$/)) {
    return 'font/woff2';
  }
  return 'X';
}

function mapUrlToPath(pathname) {
  let file;

  Object.keys(maps).forEach((find) => {
    const replace = maps[find];
    const re = new RegExp(find.replace(/\//g, '\\/'));
    if (!file && pathname.match(re)) {
      file = pathname.replace(re, replace);
    }
  });

  return file;
}


function loadUrlContent(u, base64 = false) {
  const { pathname } = URL.parse(u);
  const file = mapUrlToPath(pathname);
  const buffer = Buffer.from(fs.readFileSync(file, { encoding: base64 ? null : 'utf8' }));
  return buffer.toString(base64 ? 'base64' : 'utf8');
}

function replaceCssUrlsWithBase64(htmlSource) {
  let htmlContent = htmlSource;
  const replacements = {};

  // Replace inline CSS URLs with data URIs
  const cssUrls = htmlContent.matchAll(/url\("(.+?)"\)/g);
  if (cssUrls) {
    [...cssUrls].forEach((u) => {
      const url = u[1].replace('~~~CASA_MOUNT_URL~~~', mountUrl);
      const content = loadUrlContent(url, true);

      const repl = `repl${Math.round(Math.random() * 10000000)}`;
      replacements[repl] = `data:${mapUrlToType(url)};base64,${content}`;

      htmlContent = htmlContent.replace(u[1], repl);
    });
  }

  Object.keys(replacements).forEach((k) => {
    htmlContent = htmlContent.replace(k, replacements[k]);
  });

  return htmlContent;
}

/* --------------------------------------------------------------- first pass */
const $ = cheerio.load(html);
let replacements = {};

// Remove all JS
$('script[src]').get().forEach((script) => {
  const markup = $.html(script);
  html = html.replace(markup, '');
});

// Replace all <link> stylesheets with inline code
$('link[rel="stylesheet"]').get().forEach((style) => {
  const $style = $(style);
  const url = $style.attr('href');
  const content = loadUrlContent(url);
  const markup = $.html(style).replace('>', ' />');
  const repl = `repl${Math.round(Math.random() * 10000000)}`;
  replacements[repl] = `<style>${content}</style>`;

  html = html.replace(markup, repl);
});

// Cheerio doesn't find elements wrapped in comments
const commentedLinks = html.matchAll(/<link href="(.+)?".+?\/>/g);
if (commentedLinks) {
  [...commentedLinks].forEach((u) => {
    let content = loadUrlContent(u[1]);
    content = replaceCssUrlsWithBase64(content);

    content = Buffer.from(content).toString('base64');

    const repl = `repl${Math.round(Math.random() * 10000000)}`;
    replacements[repl] = `<link href="data:text/css;base64,${content}" rel="stylesheet" />`;

    html = html.replace(u[0], repl);
  });
}

// Replace head <link> URLs with data URIs
[
  ['link[rel*="shortcut"]', 'image/x-icon'],
  ['link[rel*="mask-icon"]', 'image/svg+xml'],
  ['link[rel*="apple-touch-icon"]', 'image/png'],
].forEach(([selector, type]) => {
  $(selector).get().forEach((link) => {
    const $link = $(link);
    const url = $link.attr('href');
    const content = loadUrlContent(url, true);
    const markup = $.html(link);

    const repl = `repl${Math.round(Math.random() * 10000000)}`;
    replacements[repl] = markup.replace(/href=".+?"/, `href="data:${type};base64,${content}"`);

    html = html.replace(markup, repl);
  });
});

// Replace images URLs with data URIs
$('image[src]').get().forEach((link) => {
  const $link = $(link);
  const url = $link.attr('src');
  const content = loadUrlContent(url, true);
  // const markup = $.html(link);

  const repl = `repl${Math.round(Math.random() * 10000000)}`;
  replacements[repl] = `src="data:image/png;base64,${content}"`;

  html = html.replace(`src="${url}"`, repl);
});

// First pass replacements
Object.keys(replacements).forEach((k) => {
  html = html.replace(k, replacements[k]);
});

/* -------------------------------------------------------------- second pass */
replacements = {};

// Replace inline CSS URLs with data URIs
html = replaceCssUrlsWithBase64(html);

// Replace any remaining references to the dummy mount url
html = html.replace(mountUrl, '/');

// Replacements
Object.keys(replacements).forEach((k) => {
  html = html.replace(k, replacements[k]);
});

// Result
process.stdout.write(html);
