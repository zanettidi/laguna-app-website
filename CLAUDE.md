# CLAUDE.md

Guia para o Claude Code (e para quem colabora) trabalhar neste repositório.

## Sobre o projeto

Website institucional do **Laguna Systems** — um sistema de informatização e
gestão para pequenas e médias empresas dos setores da **saúde** (clínicas e
consultórios) e da **beleza** (salões e centros de estética).

O site é **estático** e **multi-página** (HTML5 + CSS + JavaScript vanilla), sem
framework nem processo de build. Abre diretamente no browser.

## Estrutura

```
.
├── index.html              # Home (hero + destaque das 3 áreas + CTA)
├── sobre.html              # Sobre nós
├── funcionalidades.html    # Funcionalidades (3 grupos completos)
├── contactos.html          # Contactos + formulário
├── css/
│   └── style.css           # Estilos + responsivo + paleta de cores
├── js/
│   ├── i18n.js             # Dicionário de traduções (PT / EN / ES)
│   ├── layout.js           # Cabeçalho, rodapé e ícones (partilhados)
│   └── main.js             # Troca de idioma, menu, animações, formulário
└── assets/
    └── images/             # SVGs: logo, hero, ilustrações, favicon
```

## Páginas (menu)

- **Home** (`index.html`) — hero + destaque das três áreas
- **Sobre nós** (`sobre.html`) — o que é o Laguna Systems
- **Funcionalidades** (`funcionalidades.html`) — três grupos: Back Office, Área
  do Cliente, Rotinas e Agendamentos
- **Contactos** (`contactos.html`) — telefone, WhatsApp, Facebook, Instagram e
  formulário de pedido de demonstração

## Layout partilhado (importante para manutenção)

O **cabeçalho, o rodapé e o sprite de ícones** NÃO estão duplicados nas páginas.
São injetados por `js/layout.js` nos pontos de montagem
`<div id="site-header"></div>` e `<div id="site-footer"></div>` de cada página.

**Para adicionar um novo menu/página:**
1. Criar o ficheiro `nova-pagina.html` (copiar a estrutura de `sobre.html`).
2. Acrescentar **uma entrada** ao array `NAV` no topo de `js/layout.js`.
3. Adicionar a chave de tradução do rótulo (`nav.*`) nos três idiomas em `js/i18n.js`.

O menu passa a aparecer no cabeçalho e no rodapé de todas as páginas
automaticamente, com realce da página ativa.

Cada página precisa, no fim do `<body>`, dos scripts por esta ordem:
`i18n.js` → `layout.js` → `main.js`.

Os contactos (telefone/redes) estão centralizados em `SOCIAL`, dentro de
`js/layout.js`.

## Idiomas (i18n)

- Idioma por omissão: **Português (pt-PT)**. Também **Inglês** e **Espanhol**.
- Todo o texto traduzível usa o atributo `data-i18n="chave"` (e `data-i18n-ph`
  para placeholders). As traduções vivem em `js/i18n.js`.
- A preferência é guardada em `localStorage` (`laguna-lang`).

**Ao adicionar/alterar texto:** adicione o atributo `data-i18n` no HTML e a
chave correspondente **nos três idiomas** em `js/i18n.js`. Mantenha as chaves
sincronizadas entre `pt`, `en` e `es`.

## Paleta de cores (definida como variáveis CSS em `:root`)

| Variável   | Hex       | Uso                          |
|------------|-----------|------------------------------|
| `--plum`   | `#260D33` | Texto, fundos escuros        |
| `--navy`   | `#003F69` | Gradientes                   |
| `--teal-d` | `#106B87` | Acentos                      |
| `--teal`   | `#157A8C` | Cor primária / botões        |
| `--sand`   | `#B3ACA4` | Neutro / detalhes            |

Use sempre as variáveis CSS, não os hex diretamente.

## Convenções

- HTML5 semântico; ícones via sprite SVG (`<use href="#i-...">`) no topo do body.
- Imagens são **SVG** (nítidas, leves, autocontidas).
- Sem dependências externas além das Google Fonts (Poppins + Inter).
- Acessibilidade: `aria-*` nos controlos, respeita `prefers-reduced-motion`.

## Como ver / testar

Abrir `index.html` no browser, ou usar o script de servidor incluído:

```bash
./server.sh start [porta]   # arranca (porta por omissão: 8000)
./server.sh stop            # para
./server.sh restart [porta] # reinicia
./server.sh status          # estado
```

Em alternativa, manualmente: `python3 -m http.server 8000`.

O script guarda o PID em `.server.pid` e os logs em `.server.log` (ambos
ignorados pelo git). Não há testes automatizados nem passo de build.

## Notas de conteúdo

Telefone, redes sociais e e-mail (`geral@lagunasystems.com`) são **placeholders**
— substituir pelos dados reais antes de publicar.
