<?xml version="1.0" encoding="UTF-8"?>
<!-- Renders the sitemap as a readable page in browsers. Crawlers ignore it. -->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="s xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes" doctype-system="about:legacy-compat" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <title>Sitemap | Red Zone Labs</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <style>
          :root {
            --bg: #ffffff; --surface: #f6f4f0; --ink: #211f1c; --muted: #6b665e;
            --line: #e4e0d8; --accent: #d52b1e;
            color-scheme: light dark;
          }
          @media (prefers-color-scheme: dark) {
            :root { --bg: #201e1b; --surface: #292724; --ink: #f2efe9; --muted: #a39d93; --line: #3e3a35; --accent: #ef5d50; }
          }
          * { box-sizing: border-box; }
          body {
            margin: 0; background: var(--bg); color: var(--ink);
            font: 15px/1.5 ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
          }
          .wrap { max-width: 1100px; margin: 0 auto; padding: 48px 16px 64px; }
          h1 { font-size: 28px; line-height: 1.2; font-weight: 600; margin: 0 0 8px; }
          p { color: var(--muted); margin: 0 0 32px; max-width: 64ch; }
          a { color: var(--ink); text-decoration: none; }
          a:hover { color: var(--accent); text-decoration: underline; }
          table { width: 100%; border-collapse: collapse; }
          th {
            text-align: left; font-size: 13px; font-weight: 600; color: var(--muted);
            padding: 10px 12px; border-bottom: 1px solid var(--line); background: var(--surface);
          }
          td { padding: 10px 12px; border-bottom: 1px solid var(--line); vertical-align: top; }
          td.url { overflow-wrap: anywhere; }
          td.date { white-space: nowrap; color: var(--muted); font-variant-numeric: tabular-nums; }
          .langs a {
            display: inline-block; min-width: 28px; margin: 0 4px 4px 0; padding: 1px 6px;
            border: 1px solid var(--line); border-radius: 3px; font-size: 12px; text-align: center; color: var(--muted);
          }
          .langs a:hover { border-color: var(--accent); }
          @media (max-width: 640px) {
            th.langs-h, td.langs { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="wrap">
          <xsl:apply-templates />
        </div>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="s:sitemapindex">
    <h1>Sitemap</h1>
    <p>This is the sitemap index for <a href="/">rzl.si</a>, used by search engines. It lists <xsl:value-of select="count(s:sitemap)" /> sitemap file(s).</p>
    <table>
      <thead><tr><th>Sitemap</th></tr></thead>
      <tbody>
        <xsl:for-each select="s:sitemap">
          <tr><td class="url"><a href="{s:loc}"><xsl:value-of select="s:loc" /></a></td></tr>
        </xsl:for-each>
      </tbody>
    </table>
  </xsl:template>

  <xsl:template match="s:urlset">
    <h1>Sitemap</h1>
    <p>Every page on <a href="/">rzl.si</a> that search engines should index: <xsl:value-of select="count(s:url)" /> pages, each with its English, Italian and Albanian versions.</p>
    <table>
      <thead>
        <tr><th>Page (rzl.si)</th><th class="langs-h">Languages</th><th>Last updated</th></tr>
      </thead>
      <tbody>
        <xsl:for-each select="s:url">
          <tr>
            <td class="url"><a href="{s:loc}">/<xsl:value-of select="substring-after(substring-after(s:loc, '://'), '/')" /></a></td>
            <td class="langs">
              <xsl:for-each select="xhtml:link[@hreflang != 'x-default']">
                <xsl:sort select="@hreflang" />
                <a href="{@href}" hreflang="{@hreflang}"><xsl:value-of select="@hreflang" /></a>
              </xsl:for-each>
            </td>
            <td class="date"><xsl:value-of select="substring(s:lastmod, 1, 10)" /></td>
          </tr>
        </xsl:for-each>
      </tbody>
    </table>
  </xsl:template>
</xsl:stylesheet>
