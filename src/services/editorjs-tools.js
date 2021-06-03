import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";

import { getS3Signeture, s3UploadImage } from "./index";

export const EDITOR_JS_TOOLS = {
  embed: { class: Embed, inlineToolBar: true },
  table: { class: Table, inlineToolBar: true },
  paragraph: { class: Paragraph, inlineToolBar: true },
  list: { class: List, inlineToolBar: true },
  warning: { class: Warning, inlineToolBar: true },
  code: { class: Code, inlineToolBar: true },
  linkTool: { class: LinkTool, inlineToolBar: true },
  image: {
    class: ImageTool,
    config: {
      uploader: {
        uploadByFile(file) {
          return getS3Signeture(file.name).then(async (sign) => {
            const result = await s3UploadImage(sign, file);
            return {
              success: 1,
              file: {
                url: result.url,
              },
            };
          });
        },
      },
    },
  },
  raw: { class: Raw, inlineToolBar: true },
  header: { class: Header, inlineToolBar: true },
  quote: { class: Quote, inlineToolBar: true },
  marker: { class: Marker, inlineToolBar: true },
  checklist: { class: CheckList, inlineToolBar: true },
  delimiter: { class: Delimiter, inlineToolBar: true },
  inlineCode: { class: InlineCode, inlineToolBar: true },
  simpleImage: { class: SimpleImage, inlineToolBar: true },
};
