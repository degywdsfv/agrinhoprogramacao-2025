let tela = "menu";

let perguntas = [
  {
    pergunta: "1. Qual é uma característica típica do campo?",
    opcoes: ["Trânsito intenso", "Fábricas grandes", "Natureza e agricultura"],
    correta: 2
  },
  {
    pergunta: "2. O que encontramos com mais facilidade na cidade?",
    opcoes: ["Fazendas", "Prédios altos", "Animais de fazenda"],
    correta: 1
  },
  {
    pergunta: "3. No campo é comum:",
    opcoes: ["Haver muito barulho", "O ar ser mais limpo", "Ter muitos shoppings"],
    correta: 1
  },
  {
    pergunta: "4. Na cidade, normalmente:",
    opcoes: ["Há pouca gente", "Tem muitos serviços", "Não há escolas"],
    correta: 1
  },
  {
    pergunta: "5. As pessoas vão para o campo para:",
    opcoes: ["Fugir da natureza", "Trabalhar em prédios", "Descansar e relaxar"],
    correta: 2
  },
  {
    pergunta: "6. Qual meio de transporte é mais comum na cidade?",
    opcoes: ["Trator", "Ônibus e metrô", "Cavalos"],
    correta: 1
  },
  {
    pergunta: "7. No campo, o que geralmente se planta?",
    opcoes: ["Algodão e milho", "Carros e máquinas", "Prédios"],
    correta: 0
  },
  {
    pergunta: "8. Qual lugar costuma ter mais poluição?",
    opcoes: ["Campo", "Cidade", "Floresta"],
    correta: 1
  },
  {
    pergunta: "9. A cidade tem geralmente:",
    opcoes: ["Mais áreas verdes", "Mais fábricas e comércios", "Mais animais selvagens"],
    correta: 1
  },
  {
    pergunta: "10. O campo é ideal para:",
    opcoes: ["Morar próximo da natureza", "Ficar preso no trânsito", "Ir a shopping centers"],
    correta: 0
  }
];

let respostas = [];
let perguntaAtual = 0;

let botoesMenu = [];

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  textSize(20);

  botoesMenu = [
    {
      texto: "Quiziz",
      x: width / 2,
      y: 200,
      acao: () => {
        respostas = new Array(perguntas.length).fill(null);
        perguntaAtual = 0;
        tela = "quiz";
      }
    },
    {
      texto: "Dicas",
      x: width / 2,
      y: 280,
      acao: () => tela = "respostas"
    },
    {
      texto: "Sob\ Desenvolvedor",
      x: width / 2,
      y: 360,
      acao: () => tela = "creditos"
    }
  ];
}

function draw() {
  background(220, 235, 250); // fundo azul clarinho

  if (tela === "menu") {
    desenharMenu();
  } else if (tela === "quiz") {
    desenharQuiz();
  } else if (tela === "respostas") {
    desenharRespostas();
  } else if (tela === "creditos") {
    desenharCreditos();
  }
}

function desenharMenu() {
  fill(20, 40, 90); // azul escuro
  textSize(36);
  text("Projeto: Campo e Cidade", width / 2, 80);
  textSize(20);
  for (let botao of botoesMenu) {
    desenharBotao(botao.texto, botao.x, botao.y);
  }
}

function desenharQuiz() {
  textSize(20);
  fill(20, 40, 90); // azul escuro para contador

  // Contador de acertos
  let acertou = 0;
  for (let i = 0; i < respostas.length; i++) {
    if (respostas[i] === perguntas[i].correta) acertou++;
  }
  text(`Respostas corretas: ${acertou} de ${perguntas.length}`, width / 2, 30);

  // Pergunta atual
  let p = perguntas[perguntaAtual];
  fill(0);
  textSize(24);
  text(p.pergunta, width / 2, 100);

  // Opções da pergunta atual
  for (let i = 0; i < p.opcoes.length; i++) {
    let y = 160 + i * 50;

    // Define a cor do fundo da opção
    if (respostas[perguntaAtual] !== null) {
      // Se já respondeu
      if (i === p.correta) {
        fill(144, 238, 144); // verde claro (correta)
      } else if (i === respostas[perguntaAtual]) {
        fill(255, 99, 71); // vermelho claro (errada)
      } else {
        fill(255); // branca normal
      }
    } else {
      // Ainda não respondeu: fundo branco ou cinza claro se hover
      if (
        mouseX > width / 2 - 150 &&
        mouseX < width / 2 + 150 &&
        mouseY > y - 20 &&
        mouseY < y + 20
      ) {
        fill(230, 240, 255); // azul bem clarinho hover
      } else {
        fill(255);
      }
    }

    stroke(20, 40, 90);
    strokeWeight(1.5);
    rect(width / 2 - 150, y - 20, 300, 40, 10);

    // Texto da opção
    fill(0);
    noStroke();
    text(p.opcoes[i], width / 2, y);
  }

  // Botão próximo (só aparece se respondeu)
  if (respostas[perguntaAtual] !== null) {
    let textoBotao = (perguntaAtual < perguntas.length - 1) ? "Próximo" : "Finalizar";
    desenharBotao(textoBotao, width - 150, height - 50);
  }

  desenharBotao("Voltar", 100, height - 50);
}

function desenharRespostas() {
  fill(20, 40, 90); // azul escuro
  textSize(24);
  text("Dicas para responder o quiz:", width / 2, 50);
  textSize(18);

  let explicacoes = [
    "1. O campo é caracterizado por áreas rurais, com fazendas, plantações e pouco movimento.",
    "2. A cidade possui muitos prédios, comércios, indústrias e grande população.",
    "3. No campo o ar é mais limpo e há menos poluição sonora e visual.",
    "4. As cidades concentram mais serviços, como escolas, hospitais e transportes.",
    "5. Muitas pessoas visitam o campo para descansar e ter contato com a natureza.",
    "6. Ônibus e metrô são meios comuns de transporte na cidade.",
    "7. O campo geralmente tem plantações como algodão e milho.",
    "8. A cidade tem mais poluição devido a veículos e fábricas.",
    "9. Cidades possuem mais fábricas e comércio em comparação ao campo.",
    "10. O campo é ideal para morar próximo da natureza e longe do trânsito."
  ];

  for (let i = 0; i < explicacoes.length; i++) {
    text(explicacoes[i], width / 2, 100 + i * 50);
  }

  desenharBotao("Voltar", 100, height - 50);
}

function desenharCreditos() {
  fill(20, 40, 90);
  textSize(26);
  text("Desenvolvido por: Carlos Lemes", width / 2, height / 2 - 30);
  textSize(18);
  text("Este projeto foi criado com p5.js para fins educativos.", width / 2, height / 2 + 10);
  desenharBotao("Voltar", 100, height - 50);
}

function desenharBotao(texto, x, y) {
  let largura = 200;
  let altura = 40;

  // Detecta se o mouse está em cima
  let hover = mouseX > x - largura / 2 && mouseX < x + largura / 2 &&
              mouseY > y - altura / 2 && mouseY < y + altura / 2;

  noStroke();
  fill(hover ? color(10, 30, 80) : color(40, 100, 200)); // azul médio e azul escuro no hover

  rect(x - largura / 2, y - altura / 2, largura, altura, 10);

  fill(255);
  textSize(20);
  text(texto, x, y);
}

function mousePressed() {
  if (tela === "menu") {
    for (let botao of botoesMenu) {
      if (mouseX > botao.x - 100 && mouseX < botao.x + 100 &&
          mouseY > botao.y - 20 && mouseY < botao.y + 20) {
        botao.acao();
      }
    }
  } else if (tela === "quiz") {
    // Botão voltar
    if (mouseX > 0 && mouseX < 200 &&
        mouseY > height - 70 && mouseY < height - 10) {
      tela = "menu";
      return;
    }

    // Botão próximo/finalizar
    if (respostas[perguntaAtual] !== null) {
      let btnX = width - 150;
      let btnY = height - 50;
      if (
        mouseX > btnX - 100 && mouseX < btnX + 100 &&
        mouseY > btnY - 20 && mouseY < btnY + 20
      ) {
        if (perguntaAtual < perguntas.length - 1) {
          perguntaAtual++;
        } else {
          tela = "menu"; // Finaliza quiz e volta ao menu
        }
        return;
      }
    }

    // Clique nas opções da pergunta atual (só se ainda não respondeu)
    let p = perguntas[perguntaAtual];
    if (respostas[perguntaAtual] === null) {
      for (let i = 0; i < p.opcoes.length; i++) {
        let y = 160 + i * 50;
        if (
          mouseX > width / 2 - 150 &&
          mouseX < width / 2 + 150 &&
          mouseY > y - 20 &&
          mouseY < y + 20
        ) {
          respostas[perguntaAtual] = i;
        }
      }
    }

  } else {
    // Botão voltar para outras telas
    if (mouseX > 0 && mouseX < 200 &&
        mouseY > height - 70 && mouseY < height - 10) {
      tela = "menu";
    }
  }
}
