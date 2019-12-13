## Desafio Repassa - React Front-End

### Executar modo desenvolvedor

1. Clonar repositório
2. Executar comando `npm install` para instalar os modulos necessários
3. Iniciar servidor com o comando `npm start`
4. Página irá abrir automaticamente

### Executar modo produção (Build)

1. Clonar repositório.
2. Executar comando `npm install` para instalar os modulos necessários.
3. Executar comando `npm run build` para gerar a build de produção.
4. Se não tiver instalado o pacote `serve`. Instalá-lo com `npm install -g serve`
5. Executar comando `serve -s build`
6. Abrir página com link fornecido no console (Ex.: http://localhost:5000)

### Observações

- Inicializar Back-end antes do Front-end se for rodar a versão de desenvolvimento.
- Se estiver usando o `serve` para rodar a versão de produção
	- Cheque se a porta utilizada por ele é a `3000` ou `5000` e está liberada pelo Firewall
	- O mesmo vai utilizar o servidor que está online (em produção) ao invés do que está rodando localmente, portanto se o `serve` fornecer uma porta que não seja `3000` ou `5000` as requisições serão bloqueadas por CORS. Você pode expecificar a porta utulizada usando o opção `-l PORT` no comando (Ex.: `serve -s build -l 3000`).
- Se estiver rodando a versão de desenvolvimento, cheque se a porta `3000` utilizada por ele está liberada no Firewall