<div align="center">
    <img align="center" src="https://fullstackmark.com/img/posts/18/clean-architecture-layers.png" alt="clean archtecture" width="200px">    
</div>

<h1 align="center"> NodeJs, Typescript, TDD, DDD, Clean Architecture e SOLID </h1>

<p align="justify">Este é um esqueleto de um projeto inicial com node onde faço uso de algumas configurações que permitirão um controle maior no desenvolvimento de um projeto em node com typescript, seja ele uma API ou um projeto WEB completo. 
    Abaixo listo e explico o que foi usado e para que estou usando tal lib ou tal configuração. Sinta-se livre para dar um fork e enviar PR para melhorar essa estrutura.
</p>

## INICIALIZANDO O PROJETO

Para iniciar o projeto foi executado basicamente um

```
npm init -y
```

As demais configurações seguem na ordem dos frameworks utilizados abaixo:

## FRAMEWORKS UTILIZADOS

A escolha das tecnologias que citarei a seguir foi com base no curso [NodeJs, Typescript, TDD, DDD, Clean Architecture e SOLID](https://www.udemy.com/course/tdd-com-mango/) de Rodrigo Manguinho que esta disponivel na [Udemy](https://www.udemy.com/), super recomendo este curso.

- typescript
- jest
- eslint
- lint-staged
- husky
- git-commit-msg-linter

## **TYPESCRIPT**

```
npm i -D typescript @types/node ts-node
```

Typescript é um superset do javascript que nos permite ter um total controle das nossas variaveis,parametros de metodos e retorno dos mesmos.
Como o typescript é fortemente tipado somos sempre instruidos a tipificar nossas variaves,retornos, etc... Dessa forma evitamos problemas comuns
do javascript que nós permite trocar uma variavel _number_ para _string_ somente passando valor, o que ao final pode nos dar tremendas dores de cabeç<a href="" class=""></a>

Instalamos ainda mais dois pacotes como dependencia de desenvolvimento:

- **@types/node**: nos auxiliará no intellissense(autocomplete) da IDE quando trabalhamos com typescript. É essencial para acelerar nosso trabalho.
- **ts-node**: É uma ferramenta que compila seus projetos com Typescript e reinicia o projeto quando o arquivo é modificado, assim como o nodemon faz porém voltado para o typescript que precisa ser compilado antes de ser executado.

### <strong><u>Configuração</u></strong>

Após a instalação das dependencias do typscript crie um arquivo na raiz do projeto chamado <code>tsconfig.json</code>. Nele coloquei algumas configurações para o funcionamento basico do typescript.

```json
{
  "compilerOptions": {
    "allowJs": true,
    "target": "ES2020",
    "esModuleInterop": true,
    "outDir": "./dist",
    "module": "CommonJS"
  }
}
```

## **JEST**

```
npm i -D jest ts-jest @types/jest
```

Jest é um poderoso Framework de Testes em JavaScript com um foco na simplicidade. Instalamos também mais duas dependencias junto com o jest:

- **ts-jest**: É um pré-processador TypeScript com suporte a mapa de origem para Jest que permite usar Jest para testar projetos escritos em TypeScript.
- **@types/jest**: nos auxiliará no intellissense(autocomplete) da IDE. É essencial para acelerar nosso trabalho.

### <strong><u>Configuração</u></strong>

Após a instalação das dependencias adicione os dois comando abaixo no bloco scripts do seu package.json:

```json

"scripts": {
    "test": "jest --watch",
    "test:staged": "jest --passWithNoTests"
    //...outros scripts,
  },
```

O primeiro comando serve para seguirmos o desenvolvimento do projeto com TDD desta forma podemos executar o primeiro comando e deixa "escutando" as modificações no projeto
para executar os testes novamente.

Já o segundo servirá para usarmos mais a frente quando confirgurarmos o **lint-staged e o husky** este script basicamente permite que os testes passem caso o arquivo de teste
ainda não tenha nenhum teste.

## **ESLINT**

```
npm i -D eslint@7 eslint-plugin-promise@4 eslint-plugin-import@2 eslint-plugin-node@11 @typescript-eslint/eslint-plugin@4 eslint-config-standard-with-typescript
```

ESLint é uma ferramenta de lint plugável para JavaScript e JSX.
Em aplicações JavaScripts de hoje em dia, a complexidade tende a crescer, refatorar código é preciso e, embora você provavelmente saiba o que está fazendo, usar uma ferramenta de lint pode salvar você de dores de cabeça.

Algumas libs do eslint tiveram que ser instaladas pois como estamos trabalhando com typescript e não javascript precisamos fazer com que o
eslint reconheça as tipagens do typescript também.

- **eslint-config-standard-with-typescript**: É um linter para typescript baseado no **eslint-config-standard**

  - Todas as demais dependencias instaladas são necessárias para que o **eslint-config-standard-with-typescript** funcione corretamente.

### <strong><u>Configuração</u></strong>

Após a finalização da instalação adicione o seguinte comando no bloco de scripts do package.json:

```json

"scripts": {
    "lint": "eslint ./src/** --fix",
    //...outros scripts,
  },
```

O Comando acima fará uma varredura no codigo do projeto na pasta <code>./src</code> e suas dependencias internas procurando por código que esteja fora
dos padrões definidos no **eslint-config-standard**.

Crie também na raiz do projeto dois novos arquivos o `.eslintrc.json` e o `.eslintignore` com o seguinte conteúdo.

.eslintrc.json

```json
{
  "extends": "standard-with-typescript",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "rules": {
    "@typescript-eslint/space-before-function-paren": "off",
    "@typescript-eslint/strict-boolean-expressions": "off"
  }
}
```

.eslintignore

```json
node_modules
dist
```

## **LINT-STAGED**

```
  npm i -D lint-staged
```

As verificações de pré-confirmação são comumente usadas para executar scripts e testes de linting, permitindo que cada confirmação seja a mais limpa possível. Como afirmam os documentos preparados por lint, eles evitam que 💩 "escorregue para dentro de sua base de código!".

O lint-staged é usado para varrer os arquivos na área staged do seu git ou sejá, arquivos que você ja adicionou com **git add**. Após encontra-los nos permite executar
uma serie de comandos para garantir que os arquivos comitados esteja o mais padronizados possivel. Esta lib trabalha muito bem com a proxima dependencia que descreverei, alias,
uma interage com a outra. Neste projeto inicial ambas são indispensaveis.

### <strong><u>Configuração</u></strong>

1 - Adicione no bloco de scripts em seu package.json o seguinte comando:

```json

"scripts": {
    "lint-staged": "lint-staged",
    //...outros scripts,
  },
```

2 - Crie um arquivo na raiz do seu projeto com o nome de : **.lintstagedrc.json**

3 - Adicione o seguinte conteudo neste arquivo.

```json
{
  "*.ts": ["npm run lint", "npm run test:staged", "git add --all"]
}
```

Se você reparar bem o passo 3 informa que ao executarmos o script <code>npm run lint-staged</code> os comandos <code>npm run lint</code>,
<code>npm run test:staged</code> e <code>git add --all</code> serão executados em todos os arquviso .ts do projeto.

## **HUSKY**

```
npm i -D husky

```

Mais uma dependencia de desenvolvimento. **Husky** é uma biblioteca JavaScript que serve para previnir péssimos git commit, git push e mais.
Minha ideia é ter um repositorio limpo com commits pequenos e padronizados e o **husky** vai nos ajudar nisso. Em parceria com o lint-staged ele é super util.

### <strong><u>Configuração</u></strong>

Após instala-lo será preciso configurar. Nesta estrutura inicial estou usando a versão: 6.0.0, se você está no futuro pode haver uma nova versão
e a configuração pode ser levemente diferente da que vou apresentar mas, qualquer duvida acesse a documentação [aqui](https://typicode.github.io/husky/#/).

1 - Após instalar a dependencia execute o comando

```
npx husky install
```

2 - Em seguida abra o package.json e adicione o script abaixo na lista de **scripts**

```json
{
  "scripts": {
    "prepare": "husky install"
    //... outros scripts
  }
}
```

3 - Crie um hook para ser executado toda vez que fizermos um commit, como estamos em parceria com o **lint-staged** então precisamos passar na criação do hook o script para executar o **lint-staged**, para isso execute o comando abaixo:

```
npx husky add .husky/pre-commit "npm run lint-staged"
```

## **GIT-COMMIT-MSG-LINTER**

```
npm i git-commit-msg-linter
```

Está será a unica dependencia que instalaremos como dependencia do projeto **NESTE ESQUELETO DE PROJETO** o git-commit-msg-linter faz uma verificação em cada commit e nos "força" ter mensagens padronizadas
nos commits seguindo o o guideline do [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). Acesse a documentação para saber mais.

### <strong><u>Configuração</u></strong>

Não precisa configurar, apenas commit seu código e veja a magica.
