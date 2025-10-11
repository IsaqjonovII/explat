<template>
  <div class="main-container w-full">
    <div
      ref="editorContainerElement"
      class="editor-container editor-container_classic-editor"
    >
      <div :class="{ error: error }" class="editor-container__editor">
        <div ref="editorElement">
          <ckeditor
            v-if="editor && config"
            v-model="modelValue"
            :config="config"
            :editor="editor"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "ckeditor5/ckeditor5.css";

import { Ckeditor } from "@ckeditor/ckeditor5-vue";
import {
  AutoImage,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  ClassicEditor,
  CloudServices,
  Essentials,
  Heading,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Markdown,
  MediaEmbed,
  Paragraph,
  PasteFromMarkdownExperimental,
  SimpleUploadAdapter,
  SpecialCharacters,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TodoList,
  Underline,
} from "ckeditor5";
import enTranslations from "ckeditor5/translations/en.js";
import ruTranslations from "ckeditor5/translations/ru.js";
import uzTranslations from "ckeditor5/translations/uz.js";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const LICENSE_KEY = import.meta.env.VITE_APP_CKEDITOR_KEY;

defineProps<{ error: boolean }>();
const modelValue = defineModel<string>({
  required: true,
});
const { locale } = useI18n();

const isLayoutReady = ref(false);

const editor = ClassicEditor;

const config = computed(() => {
  if (!isLayoutReady.value) {
    return null;
  }

  return {
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "specialCharacters",
        "link",
        "insertImage",
        "mediaEmbed",
        "insertTable",
        "blockQuote",
        "|",
        "bulletedList",
        "numberedList",
        "todoList",
        "outdent",
        "indent",
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AutoImage,
      Autosave,
      BalloonToolbar,
      BlockQuote,
      Bold,
      CloudServices,
      Essentials,
      Heading,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      Markdown,
      MediaEmbed,
      Paragraph,
      PasteFromMarkdownExperimental,
      SimpleUploadAdapter,
      SpecialCharacters,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TodoList,
      Underline,
    ],
    balloonToolbar: [
      "bold",
      "italic",
      "|",
      "link",
      "insertImage",
      "|",
      "bulletedList",
      "numberedList",
    ],
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
          class: "ck-heading_heading5",
        },
        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
          class: "ck-heading_heading6",
        },
      ],
    },
    image: {
      toolbar: [
        "toggleImageCaption",
        "imageTextAlternative",
        "|",
        "imageStyle:inline",
        "imageStyle:wrapText",
        "imageStyle:breakText",
        "|",
        "resizeImage",
      ],
    },
    language: locale.value,
    licenseKey: LICENSE_KEY,
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
      decorators: {
        toggleDownloadable: {
          mode: "manual",
          label: "Downloadable",
          attributes: {
            download: "file",
          },
        },
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableProperties",
        "tableCellProperties",
      ],
    },
    translations: [locales[locale.value]],
  };
});

onMounted(() => {
  isLayoutReady.value = true;
});

const locales: Record<string, unknown> = {
  uz: uzTranslations,
  sr: enTranslations,
  ru: ruTranslations,
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap");

@media print {
  body {
    margin: 0 !important;
  }
}

.main-container {
  font-family: "Lato";
  margin-left: auto;
  margin-right: auto;
}

.ck.ck-toolbar__items {
  @apply bg-[#FCFCFC] !rounded-t-xl;
}

.ck.ck-content {
  @apply !max-h-[40vh] !overflow-auto min-h-[20vh] !rounded-b-xl;
}

.ck.ck-sticky-panel__content,
.ck.ck-editor__top.ck-reset_all,
.ck.ck-toolbar.ck-toolbar_grouping {
  @apply !rounded-t-xl;
}

.editor-container:has(.error) {
  .ck.ck-editor__editable {
    @apply !border-red border;
  }
}

.ck.ck-editor__main
  .ck-blurred.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline {
  &.error {
    @apply !border-red border;
  }

  @apply !bg-gray-5;
}
</style>
