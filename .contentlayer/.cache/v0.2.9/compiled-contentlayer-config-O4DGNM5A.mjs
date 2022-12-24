// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import readingTime from "reading-time";

// lib/api.ts
import fs from "fs";
import matter from "gray-matter";
import path, { join } from "path";
var POSTS_PATH = path.join(process.cwd(), "posts");
var postFilePaths = fs.readdirSync(POSTS_PATH).filter((path2) => /\.mdx?$/.test(path2));
function getHeadings(source) {
  const headings = source.match(/#+\s(.*?)\n/g);
  return headings?.map((h, i) => {
    const content = h.match(/#+\s(.*?)\n/)?.[1];
    const type = headings?.[i].match(/#+/)?.[0];
    const slug = content?.replace(/ /g, "-").toLowerCase();
    const link = "#" + slug;
    return {
      id: slug || "",
      content: content || "",
      link: link || "",
      level: type?.length || 0
    };
  }) || [];
}

// lib/mdx-config.ts
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
var mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    rehypeCodeTitles,
    rehypePrism,
    [
      rehypeAutolinkHeadings,
      {
        properties: {
          className: ["anchor"]
        }
      }
    ]
  ],
  format: "mdx"
};

// contentlayer.config.ts
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "content/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    publishedAt: { type: "string", required: true },
    description: { type: "string", required: true },
    tags: {
      type: "list",
      of: { type: "string" }
    },
    ogImage: { type: "string" },
    thumbnail: { type: "string" },
    postId: { type: "string" }
  },
  computedFields: {
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw)
    },
    headings: {
      type: "json",
      resolve: (doc) => getHeadings(doc.body.raw)
    },
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(".mdx", "")
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "data",
  documentTypes: [Post],
  mdx: {
    ...mdxOptions
  }
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-O4DGNM5A.mjs.map
