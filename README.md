# Aplicação consumidora da API do Youtube

## Instalação do ambiente 

- Instalação  (Node.js & NPM)
- Instruções de instalação para Linux [neste link](https://nodejs.org/en/download/package-manager)
- Instruções de instalação para Windows [neste link](http://blog.teamtreehouse.com/install-node-js-npm-windows)
- Instalação do git

## Instalação das dependências

 Instalação do Gulp globalmente

```bash
npm install --global gulp-cli
```

Ao finalizar a instalação do gulp-cli, no prompt de comando ou bash, vá até dentro diretório do projeto e digite:

```bash
npm install
```

Será instalado o Gulp globalmente, rodas as dependências npm e posteriormente o bower será inicializado e suas dependências também serão instaladas.

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

## Informações
 
 A aplicação possui duas páginas:
 
 Pagina principal - http://localhost:3000/
 ```bash
 - Apresenta um video em destaque e ao lado outros videos do canal
 - É possivel carregar mais videos clicando em "Carregar mais vídeos"
 ```
 
 Pagina que lista todos os vídeos - http://localhost:3000/videos
 ```bash
 - Lista todos os vídeos do canal
 - Lista todos os vídeos referentes a busca do usuário 
 - Ao clicar em um video abrirá um modal apresentando o video e sua descrição
 - É possivel carregar mais videos clicando em "Carregar mais vídeos"
  ```
  
  Foram criados duas diretivas para ser reaproveitado o código.
  - Diretiva de video: iframe que recebe o video do youtube embedado
  - Diretiva de mini video: thumnails do video com sua descrição


 


 
 


