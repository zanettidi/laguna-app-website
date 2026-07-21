# Laguna Systems — Website

Website institucional do **Laguna Systems**, um sistema de informatização e
gestão para pequenas e médias empresas da **saúde** (clínicas e consultórios) e
da **beleza** (salões e centros de estética).

Site estático e **multi-página** em **HTML5 + CSS + JavaScript** (sem framework
nem build), multilíngue: **Português (pt-PT, por omissão)**, **Inglês** e
**Espanhol**.

## Funcionalidades do site

- Quatro páginas: Home, Sobre nós, Funcionalidades e Contactos
- Cabeçalho e rodapé partilhados (fonte única) — adicionar um menu é editar 1 ficheiro
- Troca de idioma PT / EN / ES (preferência guardada no browser)
- Design responsivo (desktop, tablet, telemóvel)
- Ilustrações e ícones em SVG próprios, na paleta da marca
- Formulário de pedido de demonstração (abre o cliente de e-mail)

## Estrutura

```
index.html            Home
sobre.html            Sobre nós
funcionalidades.html  Funcionalidades
contactos.html        Contactos
css/style.css         Estilos e responsivo
js/i18n.js            Traduções (PT / EN / ES)
js/layout.js          Cabeçalho, rodapé e ícones partilhados (config dos menus)
js/main.js            Interações (idioma, menu, animações, formulário)
assets/images/        Logótipo, hero e ilustrações (SVG)
```

## Adicionar um novo menu/página

1. Criar `nova-pagina.html` (copiar a estrutura de `sobre.html`).
2. Acrescentar uma entrada ao array `NAV` no topo de `js/layout.js`.
3. Adicionar a chave `nav.*` nos três idiomas em `js/i18n.js`.

## Como executar

Basta abrir `index.html` no browser. Em alternativa, usar o script incluído
para arrancar/parar um servidor local:

```bash
./server.sh start        # arranca em http://localhost:8000
./server.sh start 3000   # arranca noutra porta
./server.sh status       # mostra o estado
./server.sh stop         # para o servidor
./server.sh restart      # reinicia
```

Ou, manualmente:

```bash
python3 -m http.server 8000   # abrir http://localhost:8000
```

## Paleta de cores

`#260D33` · `#003F69` · `#106B87` · `#157A8C` · `#B3ACA4`

## Antes de publicar

Substituir os dados de contacto placeholder (telefone, e-mail e links de
Facebook / Instagram / WhatsApp) pelos valores reais.

Ver [`CLAUDE.md`](./CLAUDE.md) para o guia de desenvolvimento.
