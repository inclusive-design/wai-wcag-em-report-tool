export function downloadFileHTML({ contents, name = 'download.txt', type = 'text/plain', lang = 'en' }) {
  const _a = document.createElement('a');

  const htmlDocument = document.implementation.createHTMLDocument(name);
  htmlDocument.body.innerHTML = contents.innerHTML;
  let file;

  // set charset
  meta = document.createElement("meta");
  meta.setAttribute("charset", "utf-8");
  htmlDocument.head.appendChild(meta);

  // set lang
  htmlDocument.documentElement.setAttribute('lang', lang);

  // remove certain elements
  Array.from(
    htmlDocument.querySelectorAll("button, input, aside, footer, .Controls, #site-header, .Nav, .strip")
  ).forEach((el) => {
    el.parentNode.removeChild(el);
  });

  // remove certain attributes
  Array.from(
    htmlDocument.querySelectorAll("[tabindex], [class]")
  ).forEach((el) => {
    el.removeAttribute("tabindex");
    el.removeAttribute("class");
  });

  // add CSS
  const styleEl = document.createElement("style");
  const styleElContents = document.createTextNode(`
    body {
        font-family: sans-serif;
    }

    table {
        border-collapse: collapse;
        width: 100%;
    }

    table,
    td,
    th {
        border: 1px solid #3b3b3b;
    }

    td:not(:last-child),
    th {
        padding: 1em;
        vertical-align: top;
        text-align: left;
    }

    th[scope="row"] {
        width: 20%;
    }

    td:not(:last-child) {
        width: 20%;
    }

    td:not([class]):last-child {
        padding: 0 1em;
    }

    main > * + *,
    div > * + *,
    td > * + * {
        margin-top: 1em;
    }

    h1 {
        font-size: 2.5rem;
        margin-bottom: 0;
    }

    h2 {
        font-size: 1.75rem;
        margin-bottom: 0;
    }

    h3 {
        font-size: 1.5rem;
        margin-bottom: 0;
    }

    h4 {
        font-size: 1.25rem;
        margin-bottom: 0;
    }

    h5 {
        font-size: 1.125rem;
        margin-bottom: 0;
    }

    h6 {
        font-size: 1rem;
        margin-bottom: 0;
        margin-top: 1.75em;
    }

    dt {
        font-weight: 600;
    }

    dt::after {
        content: ":";
    }

    dd {
        margin-inline: 0;
    }

    dd + dt {
        margin-top: 1rem;
    }

    td img {
        max-width: 5in;
    }

    td pre {
        background: #eee;
        border-radius: 0.5rem;
        font-size: 1rem;
        padding: 1rem;
    }

    td code {
        background: #eee;
        border-radius: 0.25rem;
        display: inline-block;
        padding: 0.125rem;
    }

  `);
  styleEl.appendChild(styleElContents);
  htmlDocument.head.append(styleEl);

  file = new Blob(
    [`<!doctype HTML>${htmlDocument.documentElement.outerHTML}`],
    {
      type: "text/html",
    }
  );

  _a.href = URL.createObjectURL(file);

  _a.download = name;

  _a.click();
}

export function downloadFileJSON({ contents, name = 'download.txt', type = 'text/plain' }) {
  const _a = document.createElement('a');
  const file = new Blob([contents], { type });

  _a.href = URL.createObjectURL(file);
  _a.download = name;

  _a.click();
}
