const fs = require('fs/promises')
async function converterTxtParaJson() {
  try {
    const textoBruto = await fs.readFile('dados_brutos.txt', 'utf-8')
    // quebra o texto em um array de linhas
    // trim() e o filter ajudam a ignorar linhas vazias
    const linhas = textoBruto.split('\n').filter(linha => linha.trim() !== '')
    // pega cada linha e transforma num Objeto JavaScript
    const alunosObjeto = linhas.map(linha => {
      // divide os dados pela virgula
      const [nome, nota, curso] = linha.split(',')
      return {
        nome: nome.trim(), // trim() tira os espaços em branco sobrando
        nota: Number(nota.trim()), // transforma a nota de texto para numero
        curso: curso.trim()
      }
    })
    // transforma o array/Objeto JS em uma string formato JSON
    // o (dados, null, 2) serve para deixar o JSON formatado bonitinho com recuo de 2 espaços
    const textoJson = JSON.stringify(alunosObjeto, null, 2)
    // salva no disco rigido como um arquivo .json
    await fs.writeFile('alunos_convertidos.json', textoJson)
    console.log('Sucesso! Arquivo "alunos_convertidos.json" criado com estrutura de dados.')
  } catch (erro) {
    console.erro('Erro na conversão:', erro)
  }
}

converterTxtParaJson()