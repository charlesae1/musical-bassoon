import { useEffect, useState } from 'react';

export default function Home() {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      const res = await fetch('/api/scrap?url=https://rubinot.com.br/?subtopic=characters&name=Ulezovisk&selector=.BoxContent');
      const json = await res.json();
      if (json.success) {
        setContent(json.html);
      } else {
        setContent(`<p>Erro: ${json.error}</p>`);
      }
    };
    fetchContent();
  }, []);

  return (
    <div>
      <h1>Conteúdo de Rubinot</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
