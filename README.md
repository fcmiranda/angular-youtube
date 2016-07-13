# Aplicação consumidora da API do Youtube

## Instalação do ambiente 

- Instalação  (Node.js & NPM)
- Instruções de instalação para Linux [neste link](https://nodejs.org/en/download/package-manager)
- Instruções de instalação para Windows [neste link](http://blog.teamtreehouse.com/install-node-js-npm-windows)

## Instalação das dependências 

Ao finalizar a instalação, no prompt de comando ou bash, vá até dentro diretório do projeto e digite:

```bash
npm install --global gulp-cli
npm install
```

Será instalado o Gulp globalmente, rodas as dependências npm e posteriormente o bower será inicializado e suas dependências também serão instaladas.

**Atenção:** O bower pode dar conflito de versão do angular caso isso ocorra,
será apresentado uma pergunta no console para qual versão os arquivos devem ser resolvidos

```bash
Selecione a opção - angular#1.5.7
Selecione a opção - angular-animate#^1.4.8
```

Após a instalação completa digite os seguintes comandos para 

Inicializar a aplicação em desenvolvimento:
```bash
gulp serv-dev
```

Inicializar a aplicação em produção (Arquivos minificados e concatenados):
```bash
gulp serv-build
```

Após o comando, automaticamente o um servidor express irá inicializar a aplicação em localhost:3000