import { useState } from 'react';

// Hook personalizado para manipulação de texto
function useTextManipulation() {
  const [text, setText] = useState('');

  const splitClasses = (code: string): string[] => {
    // Usando regex para encontrar as definições de classe com ou sem herança
    const classPattern: RegExp = new RegExp(
      /class\s+(\w+)\s*(\((.*?)\))?:\s*(.*?)\s*(?=class|\Z)/, 'gs');
    const classMatches: RegExpExecArray[] = [...code.matchAll(classPattern)];

    // Lista para armazenar as partes divididas do código
    const splitCode: string[] = [];

    // Índice de início da próxima classe
    let startIndex: number = 0;

    // Dividindo o código em partes com base nas definições de classe
    for (const match of classMatches) {
      const className: string = match[1];
      const inheritance: string = match[3];
      const classContent: string = match[4];
      const classStart: number = match.index!;
      const classEnd: number = classStart + match[0].length;

      // Adicionando parte do código antes da definição da classe atual
      splitCode.push(code.substring(startIndex, classStart));

      // Construindo a definição da classe atual
      let classDefinition: string = `class ${className}`;
      if (inheritance) {
        classDefinition += `(${inheritance})`;
      }
      classDefinition += `:\n${classContent}\n`;
      splitCode.push(classDefinition);

      // Atualizando o índice de início para a próxima iteração
      startIndex = classEnd;
    }

    // Adicionando a parte final do código após a última classe
    splitCode.push(code.substring(startIndex));

    return splitCode;
  }

  function identificar_nome_da_classe(classe: string): string {
    const padrao = /\bclass\s+(\w+)\b/;
    const match = classe.match(padrao);

    if (match) {
      return match[1];
    } else {
      return '';
    }
  }



  // Função para alterar o texto
  const setTextManipulated = (newText) => {
    var userList = ""

    var splitClass = splitClasses(newText)
    console.log(splitClass);
    // Para cada classe, extrair as informações
    for (var i in splitClass) {
      var class_name = identificar_nome_da_classe(splitClass[i])
      if (class_name) {
        console.log(class_name);
      }

      var cl = {
        name: class_name
      }



      userList = userList + " " + class_name


    }




    setText(userList); // Exemplo: Convertendo texto para maiúsculas
  };

  return [text, setTextManipulated];
}

export default useTextManipulation;