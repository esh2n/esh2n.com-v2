// import React, { useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';

// const MarkdownRenderer = ({ content }: { content: string }) => {
//   const [htmlContent, setHtmlContent] = useState('');

//   useEffect(() => {
//     const renderMarkdown = async () => {
//       // @ts-ignore
//       const markdown = await import('markdown-wasm/dist/markdown.es.js');
//       await markdown.ready;
//       const html = markdown.parse(content);
//       setHtmlContent(html);
//     };

//     renderMarkdown();
//   }, [content]);

//   // biome-ignore lint/security/noDangerouslySetInnerHtml: cannot avoid
//   return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
// };

// export default MarkdownRenderer;
