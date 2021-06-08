const edjsHTML = require("editorjs-html");

const config = {
  embedMarkups: {
    youtube: `<div class="embed"><iframe class="embed-youtube" frameborder="0" src="<%data.embed%>" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen <%data.length%>></iframe></div>`,

    twitter: `<blockquote class="twitter-tweet" class="embed-twitter" <%data.length%>><a href="<%data.source%>"></a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>`,

    instagram: `<blockquote class="instagram-media" <%data.length%>><a href="<%data.embed%>/captioned"></a></blockquote><script async defer src="//www.instagram.com/embed.js"></script>`,

    codepen: `<div class="embed"><iframe <%data.length%> scrolling="no" src="<%data.embed%>" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe></div>`,

    defaultMarkup: `<div class="embed"><iframe src="<%data.embed%>" <%data.length%> class="embed-unknown" allowfullscreen="true" frameborder="0" ></iframe></div>`,
  },
};

const sanitizeHtml = function (markup) {
  markup = markup.replace(/&/g, "&amp;");
  markup = markup.replace(/</g, "&lt;");
  markup = markup.replace(/>/g, "&gt;");
  return markup;
};

export default edjsHTML({
  simpleImage: (block) => {
    const imageSrc = block.data.url;

    return `<figure><img style="max-width: 100%;" src="${imageSrc}" alt="${block.data.caption}"/><figcaption>${block.data.caption}</figcaption></figure>`;
  },
  header: (block) => {
    let headerLevel = block.data.level + 1;
    if (headerLevel > 6) {
      headerLevel -= 1;
    }
    return `<h${headerLevel}>${block.data.text}</h${headerLevel}>`;
  },
  paragraph: (block) => {
    return `<p style="word-break: break-all;">${block.data.text}</p>`;
  },
  image: (block) => {
    const imageConditions = `${block.data.stretched ? "img-fullwidth" : ""} ${
      block.data.withBorder ? "img-border" : ""
    } ${block.data.withBackground ? "img-bg" : ""}`;

    const imageSrc = block.data.file.url;

    return `<figure><img style="max-width: 100%;" class="${imageConditions}" src="${imageSrc}" alt="${block.data.caption}"><figcaption>${block.data.caption}</figcaption></figure>`;
  },
  list: (block) => {
    const type = block.data.style === "ordered" ? "ol" : "ul";
    let listHtml = `<${type}>`;
    block.data.items.forEach(function (li) {
      listHtml += `<li>${li}</li>`;
    });
    listHtml += `</${type}>`;
    return listHtml;
  },
  quote: (block) => {
    let alignment = "";
    if (block.data.alignment) {
      alignment = `style={{textAlign: ${block.data.alignment}}}`;
    }
    return `<blockquote ${alignment}><p>${block.data.text}</p><cite>${block.data.caption}</cite></blockquote>`;
  },
  table: (block) => {
    const rows = block.data.content.map((row) => {
      return `<tr>${row.reduce(
        (acc, cell) =>
          acc +
          `<td style="background-color: whitesmoke; padding: 5px 50px;">${cell}</td>`,
        ""
      )}</tr>`;
    });
    return `<table><tbody>${rows.join("")}</tbody></table>`;
  },
  code: (block) => {
    const markup = sanitizeHtml(block.data.code);
    return `<div style="background-color: rgba(250, 239, 240, 0.78); color: #b44437; padding-inline:5%; padding-top: 2%; padding-bottom: 2%; border-radius: 5px; margin-bottom: 10px;"><pre><code>${markup}</code></pre></div>`;
  },
  raw: (block) => {
    return block.data.html;
  },
  // delimiter: (block) => {
  //   return "<br />";
  // },
  delimiter: (block) => {
    return "<hr />";
  },
  embed: (block) => {
    block.data.length = `width="${block.data.width}" height="${block.data.height}"`;

    const regex = new RegExp(/<%data\.(.+?)%>/, "gm");
    if (config.embedMarkups[block.data.service]) {
      return config.embedMarkups[block.data.service].replace(
        regex,
        (match, p1) => block.data[p1]
      );
    } else {
      return config.embedMarkups["defaultMarkup"].replace(
        regex,
        (match, p1) => block.data[p1]
      );
    }
  },
  warning: (block) => {
    return `<div><div style="background-color: rgba(255,165,0,0.1); padding-inline: 5%; padding-bottom: 0.5%; padding-top: 1%; margin-bottom: 10px; border-radius: 6px;"><p style="font-weight: bold; color: rgb(255,165,0);">${block.data.title}</p><div/> <p style="text-align: center; color: gray;">${block.data.message}</p></div>`;
  },
  checklist: (block) => {
    let total = "";
    block.data.items.forEach((item) => {
      total += `<div style="display: flex; height: 100%; align-items: center;">${
        item.checked
          ? "<div style='height: 12px; width: 12px; border-radius: 50%; background-color: #1d94dd; margin-right: 2%;'></div>"
          : "<div style='height: 12px; width: 12px; border-radius: 50%; background-color: gray; margin-right: 2%;'></div>"
      }<p style="margin-bottom: 2px;">${item.text}<p/> </div>`;
    });
    return total;
  },
});
