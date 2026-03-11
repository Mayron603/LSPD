import { useState, useEffect } from 'react';
import { 
  Calculator, ShieldAlert, Car, UserMinus, FileText, 
  Copy, Trash2, Search, Scale, Terminal, Activity, 
  AlertTriangle, Crosshair, Upload, Image as ImageIcon, Send,
  ChevronDown
} from 'lucide-react';

const BANCO_CRIMES_REBAIXADOS = [
  { artigo: "ART. 121 § I", nome: "HOMICÍDIO DOLOSO", pena: 10, multa: 90000, fianca: "NAO" },
  { artigo: "ART. 121 § II", nome: "HOMICÍDIO QUALIFICADO", pena: 12, multa: 100000, fianca: "NAO" },
  { artigo: "ART. 121 § III", nome: "HOMICÍDIO CULPOSO", pena: 5, multa: 25000, fianca: 50000 },
  { artigo: "ART. 121 § IIII", nome: "HOMICÍDIO CONTRA FUNCIONÁRIO PÚBLICO", pena: 10, multa: 75000, fianca: "NAO" },
  { artigo: "ART. 141 IIII", nome: "TENTATIVA DE HOMICIDIO", pena: 5, multa: 30000, fianca: "NAO" },
  { artigo: "ART. 129", nome: "LESÃO CORPORAL", pena: 5, multa: 12000, fianca: 25000 },
  { artigo: "ART. 129 § III", nome: "LESÃO CORPORAL SEGUIDA DE MORTE", pena: 10, multa: 40000, fianca: "NAO" },
  { artigo: "ART. 129 § IX", nome: "MARIA DA PENHA", pena: 15, multa: 10000, fianca: 30000 },
  { artigo: "ART. 135", nome: "OMISSÃO DE SOCORRO", pena: 5, multa: 10000, fianca: 20000 },
  { artigo: "ART. 137", nome: "BRIGA GENERALISDA EM TUMULTO", pena: 5, multa: 10000, fianca: 20000 },
  { artigo: "ART. 138", nome: "CALÚNIA", pena: 5, multa: 15000, fianca: 20000 },
  { artigo: "ART. 139", nome: "DIFAMAÇÃO", pena: 5, multa: 15000, fianca: 20000 },
  { artigo: "ART. 140", nome: "INJÚRIA", pena: 5, multa: 17000, fianca: 20000 },
  { artigo: "ART. 147", nome: "AMEAÇA (Rafic)", pena: 5, multa: 15000, fianca: 30000 },
  { artigo: "ART. 148", nome: "SEQUESTRO OU CÁRCERE PRIVADO", pena: 20, multa: 50000, fianca: "NAO" },
  { artigo: "ART. 150", nome: "VIOLAÇÃO DE DOMICÍLIO", pena: 5, multa: 12000, fianca: 25000 },
  { artigo: "S/A", nome: "OCULTAÇÃO FACIAL", pena: 0, multa: 3000, fianca: "NAO" },
  { artigo: "ART. 155", nome: "FURTO", pena: 5, multa: 10000, fianca: 20000 },
  { artigo: "ART. 157", nome: "ROUBO", pena: 10, multa: 15000, fianca: 35000 },
  { artigo: "ART. 157 § II", nome: "ROUBO QUALIFICADO", pena: 13, multa: 50000, fianca: 100000 },
  { artigo: "ART. 157 § III", nome: "LATROCÍNIO", pena: 20, multa: 80000, fianca: "NAO" },
  { artigo: "ART. 157 § IIII", nome: "SUBTRAÇÃO DE VIATURA", pena: 30, multa: 200000, fianca: "NAO" },
  { artigo: "ART. 163", nome: "DANO A PATRIMONIO PARTICULAR", pena: 5, multa: 5000, fianca: 10000 },
  { artigo: "ART. 163 § II", nome: "DANO A PATRIMONIO PÚBLICO", pena: 5, multa: 5000, fianca: 10000 },
  { artigo: "ART. 171", nome: "ESTELIONATO", pena: 5, multa: 10000, fianca: 30000 },
  { artigo: "ART. 180", nome: "RECEPTAÇÃO", pena: 5, multa: 10000, fianca: 25000 },
  { artigo: "ART. 213", nome: "ESTUPRO", pena: "BAN", multa: 0, fianca: 0 },
  { artigo: "ART. 217 - A", nome: "ESTUPRO DE VUNERÁVEL", pena: "BAN", multa: 0, fianca: 0 },
  { artigo: "ART. 216", nome: "ASSÉDIO SEXUAL", pena: "BAN", multa: 0, fianca: 0 },
  { artigo: "ART. 233", nome: "ATO OBSCENO", pena: 60, multa: 200000, fianca: 250000 },
  { artigo: "ART. 287", nome: "APOLOGIA AO CRIME", pena: 5, multa: 5000, fianca: 20000 },
  { artigo: "ART. 287 § II", nome: "UTILIZAÇÃO DE MATERIAIS BÉLICOS OU ACESSÓRIOS", pena: 15, multa: 20000, fianca: 40000 },
  { artigo: "ART. 288", nome: "FORMAÇÃO DE QUADRILHA", pena: 15, multa: 20000, fianca: 40000 },
  { artigo: "ART. 307", nome: "FALSA IDENTIDADE", pena: 5, multa: 5000, fianca: 10000 },
  { artigo: "LEI. 3.688", nome: "PERTUBAÇÃO DO SOSSEGO", pena: 0, multa: 3000, fianca: 0 },
  { artigo: "ART. 195", nome: "DESOBEDIENCIA A ORDEM DE PARADA", pena: 5, multa: 5000, fianca: 15000 },
  { artigo: "ART 173", nome: "DISPUTAR CORRIDA ILEGAL", pena: 0, multa: 5000, fianca: 0 },
  { artigo: "ART. 312", nome: "PECULATO", pena: "BAN", multa: 0, fianca: 0 },
  { artigo: "ART. 316", nome: "CONCUSSÃO", pena: 30, multa: 40000, fianca: 70000 },
  { artigo: "ART. 317", nome: "CORRUPÇÃO", pena: "BAN", multa: 0, fianca: 0 },
  { artigo: "ART. 319", nome: "PREVARICAÇÃO", pena: 20, multa: 40000, fianca: 60000 },
  { artigo: "ART. 324", nome: "EXERCÍCIO FUNCIONAL ILEGAL", pena: 20, multa: 40000, fianca: 60000 },
  { artigo: "ART. 329", nome: "RESISTÊNCIA", pena: 10, multa: 30000, fianca: 50000 },
  { artigo: "ART. 330", nome: "DESOBEDIÊNCIA", pena: 10, multa: 20000, fianca: 40000 },
  { artigo: "ART. 331", nome: "DESACATO", pena: 10, multa: 30000, fianca: 60000 },
  { artigo: "ART. 28", nome: "PORTE DE DROGAS PARA USO PESSOAL", pena: 0, multa: 0, fianca: 0 },
  { artigo: "ART. 33", nome: "TRÁFICO DE DROGAS", pena: 5, multa: 13000, fianca: 25000 },
  { artigo: "ART 99", nome: "CONTRABANDO DE MERCADORIA", pena: 8, multa: 20000, fianca: 50000 },
  { artigo: "ART. 35", nome: "ASSOCIAÇÃO AO TRÁFICO", pena: 5, multa: 15000, fianca: 25000 },
  { artigo: "ART. 14", nome: "PORTE ILEGAL DE ARMAS", pena: 5, multa: 10000, fianca: 20000 },
  { artigo: "ART. 17", nome: "TRÁFICO DE ARMAS", pena: 15, multa: 60000, fianca: 120000 },
  { artigo: "S/A", nome: "POSSE DE MUNIÇÃO", pena: 5, multa: 7000, fianca: 15000 },
  { artigo: "LEI 12.850", nome: "INFILTRAÇÃO POLICIAL SEM AUTORIZAÇÃO", pena: 20, multa: 75000, fianca: 100000 },
  { artigo: "ART 100", nome: "OBEJTOS ILICITOS", pena: 0, multa: 0, fianca: 0 },
  { artigo: "LEI 9.613", nome: "LAVAGEM DE DINHEIRO", pena: 15, multa: 80000, fianca: 130000 },
  { artigo: "ART. 289", nome: "POSSE DE DINHEIRO ILÍCITO", pena: 5, multa: 15000, fianca: 40000 },
  { artigo: "LEI 9.455", nome: "TORTURA", pena: 30, multa: 90000, fianca: 140000 },
  { artigo: "LEI 13.260", nome: "TERRORISMO", pena: 60, multa: 70000, fianca: 140000 },
  { artigo: "LEI 13.869", nome: "ABUSO DE AUTORIDADE", pena: 10, multa: 30000, fianca: 45000 },
  { artigo: "ART 158", nome: "CARGA SEM NOTA FISCAL", pena: 0, multa: 5000, fianca: 0 },
  { artigo: "ART 159", nome: "VEICULO SEM DOCUMENTACAO", pena: 0, multa: 3000, fianca: 0 },
  { artigo: "ART 160", nome: "VEICULO NAO LEGALIZADO", pena: 0, multa: 5000, fianca: 0 },
  { artigo: "ART 162 I", nome: "DIRIGIR VEÍCULO SEM POSSUIR CARTEIRA DE HABILITAÇÃO", pena: 0, multa: 4000, fianca: 0 },
  { artigo: "ART 169", nome: "DIRIGIR SEM ATENÇÃO OU CUIDADOS A SEGURANÇA", pena: 0, multa: 2000, fianca: 0 },
  { artigo: "ART 172", nome: "ATIRAR DO VEÍCULO OU ABANDONAR NA VIA OBEJTOS", pena: 0, multa: 2000, fianca: 0 },
  { artigo: "ART 175", nome: "UTILIZAR O VEÍCULO PARA EXIBIR MANOBRA PERIGOSA", pena: 0, multa: 5000, fianca: 0 },
  { artigo: "ART 176 I", nome: "DEIXAR O CONDUTOR DE PRESTAR SOCORRO EM ACIDENTES", pena: 0, multa: 5000, fianca: 0 },
  { artigo: "ART 180", nome: "IMOBILIZAR O VEÍCULO NA VIA POR ESTAR SEM COMBUSTÍVEL", pena: 0, multa: 2000, fianca: 0 },
  { artigo: "ART 181", nome: "PARAR OU ESTACIONAR O VEÍCULO EM LOCAIS PROIBIDOS", pena: 0, multa: 2000, fianca: 0 },
  { artigo: "ART 186", nome: "TRANSITAR PELA CONTRAMÃO DE DIREÇÃO", pena: 0, multa: 4000, fianca: 0 },
  { artigo: "ART. 190", nome: "SEGUIR VEÍCULOS DE UTILIDADE PÚBLICA / OBSTRUIR", pena: 0, multa: 10000, fianca: 0 },
  { artigo: "ART. 193", nome: "TRANSITAR COM O VEÍCULO EM LOCAIS PROIBIDOS", pena: 0, multa: 4000, fianca: 0 },
  { artigo: "ART. 194", nome: "TRANSITAR DE MARCHA À RÉ", pena: 0, multa: 3000, fianca: 0 },
  { artigo: "ART. 195", nome: "DESOBEDECER AS ORDENS EMANADAS DO AGENTE POLICIAL", pena: 0, multa: 5000, fianca: 0 },
  { artigo: "ART. 206", nome: "EXECUTAR OPERAÇÃO DE RETORNO EM LOCAL PROIBIDO", pena: 0, multa: 2000, fianca: 0 },
  { artigo: "ART. 208", nome: "AVANÇAR O SINAL VERMELHO OU DE PARADA OBRIGATÓRIA", pena: 0, multa: 2000, fianca: 0 },
  { artigo: "ART. 210", nome: "TRANSPOR SEM AUTORIZAÇÃO BLOQUEIO VIÁRIO POLICIAL", pena: 0, multa: 10000, fianca: 0 },
  { artigo: "ART. 218", nome: "TRANSITAR EM VELOCIDADE SUPERIOR À MÁXIMA PERMITIDA", pena: 0, multa: 4000, fianca: 0 },
  { artigo: "ART. 227", nome: "UTILIZAR BUZINA PROLONGADA OU EM DESACORDO", pena: 0, multa: 2000, fianca: 0 },
  { artigo: "ART. 228", nome: "USAR SOM VEÍCULAR EM ÁREAS PROIBIDAS", pena: 0, multa: 5000, fianca: 0 },
  { artigo: "ART. 231", nome: "TRANSITAR COM VEÍCULO EM MAU ESTADO DE CONSERVAÇÃO", pena: 0, multa: 3000, fianca: 0 },
  { artigo: "ART. 244", nome: "CONDUZIR MOTOCICLETA SEM CAPACETE E OUTROS", pena: 0, multa: 2000, fianca: 0 },
  { artigo: "ART. 253", nome: "BLOQUEAR A VIA COM O VEÍCULO", pena: 0, multa: 2000, fianca: 0 }
];

const ITENS_ILEGAIS = [
  "ARMAS", "MUNICOES", "TABLET DE CORRIDA", "TABLET DE BOOSTING",
  "CONTRATO DE ROUBO", "CARTAO DE SEGURANCA NIVEL 1", "CARTAO DE SEGURANCA NIVEL 2",
  "TERMITA", "KIT ELETRONICO", "C4", "PEN DRIVE TROJAN", "CRYPTO STICK",
  "FLARE AIRDROP", "LOCKPICK", "LOCKPICK AVANCADA", "COLETE BALISTICO",
  "CORPO DE ARMA", "COCAINA", "HEROINA", "METANFETAMINA", "MACONHA",
  "SEMENTE DE COCA", "TIJOLO DE COCAINA", "ANFETAMINA", "SACO DE SUPRIMENTOS ILEGAIS",
  "TIJOLO DE MACONHA", "NOTAS MARCADAS", "CAIXA DE SUPRIMENTOS ILEGAIS"
].sort();

// AVISO: SUBSTITUA O TEXTO ABAIXO PELO SEU NOVO LINK DE WEBHOOK DO DISCORD
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1481341664789266484/RmbngdjXua9rkanIXqeAE6oUingDQU3872rhNBGXT1eJF3PR8AEuN0rCg0KUkC9tm1Ki";

export default function CalculadoraPenal() {
  const [oficial, setOficial] = useState(JSON.parse(localStorage.getItem('usuario') || '{}').nome || '');
  const [oficiaisEnvolvidos, setOficiaisEnvolvidos] = useState('');
  const [individuo, setIndividuo] = useState('');
  const [local, setLocal] = useState('');
  
  const [temVeiculo, setTemVeiculo] = useState(false);
  const [placa, setPlaca] = useState('');
  const [temRefem, setTemRefem] = useState(false);
  const [nomeRefem, setNomeRefem] = useState('');
  
  const [itens, setItens] = useState([]);
  const [itemSelecionado, setItemSelecionado] = useState('');
  const [qtdItem, setQtdItem] = useState(1);
  
  const [imagemEvidencia, setImagemEvidencia] = useState(null);
  const [previewImagem, setPreviewImagem] = useState('');

  const [crimes, setCrimes] = useState([]);
  const [buscaCrime, setBuscaCrime] = useState('');
  const [menuCrimesAberto, setMenuCrimesAberto] = useState(false);
  
  const [reuPrimario, setReuPrimario] = useState(false);
  const [relatorioTexto, setRelatorioTexto] = useState('');
  const [enviando, setEnviando] = useState(false);

  const crimesFiltrados = BANCO_CRIMES_REBAIXADOS.filter(c => 
    c.nome.toLowerCase().includes(buscaCrime.toLowerCase()) || 
    c.artigo.toLowerCase().includes(buscaCrime.toLowerCase())
  );

  useEffect(() => {
    gerarRelatorioTexto();
  }, [oficial, oficiaisEnvolvidos, individuo, local, temVeiculo, placa, temRefem, nomeRefem, itens, crimes, reuPrimario]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagemEvidencia(file);
      setPreviewImagem(URL.createObjectURL(file));
    }
  };

  const removerImagem = () => {
    setImagemEvidencia(null);
    setPreviewImagem('');
  };

  const handleAddItem = () => {
    if (qtdItem > 0 && itemSelecionado.trim() !== '') {
      setItens([...itens, { nome: itemSelecionado.trim().toUpperCase(), qtd: qtdItem }]);
      setItemSelecionado('');
      setQtdItem(1);
    }
  };

  const handleRemoverItem = (index) => setItens(itens.filter((_, i) => i !== index));
  
  const handleAddCrime = (crime) => { 
    setCrimes([...crimes, crime]); 
    setBuscaCrime(''); 
    setMenuCrimesAberto(false); 
  };
  
  const handleRemoverCrime = (index) => setCrimes(crimes.filter((_, i) => i !== index));

  const limparTudo = () => {
    if (confirm("Deseja realmente limpar toda a ocorrência?")) {
      setIndividuo(''); setLocal('');
      setTemVeiculo(false); setPlaca('');
      setTemRefem(false); setNomeRefem('');
      setItens([]); setCrimes([]); setReuPrimario(false);
      setItemSelecionado('');
      setOficiaisEnvolvidos('');
      removerImagem();
    }
  };

  const copiarRelatorio = () => {
    navigator.clipboard.writeText(relatorioTexto);
    alert("Relatório em texto copiado!");
  };

  // Cálculos Penais
  let penaBaseCalculada = 0;
  let temBan = false;
  let inafiancavel = false;
  let fiancaTotal = 0;
  let multaTotal = 0;

  crimes.forEach(c => {
    if (c.pena === "BAN") temBan = true;
    else penaBaseCalculada += Number(c.pena) || 0;

    multaTotal += Number(c.multa) || 0;

    if (c.fianca === "NAO") inafiancavel = true;
    else fiancaTotal += Number(c.fianca) || 0;
  });

  const displayPenaBase = temBan ? "BANIMENTO" : penaBaseCalculada;
  const displayFianca = inafiancavel ? "INAFIANÇÁVEL" : `$${fiancaTotal.toLocaleString('pt-BR')}`;
  const displayPenaFinal = temBan ? "BANIMENTO" : (reuPrimario ? Math.floor(penaBaseCalculada * 0.7) : penaBaseCalculada);

  const gerarRelatorioTexto = () => {
    const vehicleStr = temVeiculo ? `SIM | PLACA: ${placa || 'NÃO INFORMADA'}` : "NÃO";
    const hostageStr = temRefem ? `SIM | NOME: ${nomeRefem || 'NÃO INFORMADO'}` : "NÃO";
    const itemsTxt = itens.length > 0 ? itens.map(i => `- ${i.qtd}x ${i.nome}`).join('\n') : "NADA CONSTA";
    const crimesTxt = crimes.length > 0 ? crimes.map(c => `• ${c.artigo} - ${c.nome} (${c.pena === "BAN" ? "BAN" : c.pena + "m"})`).join('\n') : "NENHUM";
    const ofcsEnvolvidosTxt = oficiaisEnvolvidos ? `\n[OFICIAIS ENVOLVIDOS]: ${oficiaisEnvolvidos}` : "";

    setRelatorioTexto(`\`\`\`md\n# REGISTRO DE OCORRência - LSPD\n\n[OFICIAL RESPONSÁVEL]: ${oficial || "N/A"}${ofcsEnvolvidosTxt}\n[INDIVÍDUO]: ${individuo || "N/A"}\n[LOCAL]: ${local || "N/A"}\n\n[CENÁRIO]:\n> VEÍCULO UTILIZADO: ${vehicleStr}\n> REFÉM NA AÇÃO: ${hostageStr}\n\n[APREENSÕES]:\n${itemsTxt}\n\n[IMPUTAÇÕES PENAIS]:\n${crimesTxt}\n\n[SENTENÇA FINAL]:\n> PENA TOTAL: ${displayPenaBase} ${!temBan ? "Meses" : ""}\n> MULTA: $${multaTotal.toLocaleString('pt-BR')}\n> FIANÇA: ${displayFianca}\n> ATENUANTE: ${reuPrimario && !temBan ? 'APLICADO (-30%)' : 'NÃO APLICADO'}\n> TEMPO A CUMPRIR: ${displayPenaFinal} ${!temBan ? "MESES" : ""}\n\nDATA: ${new Date().toLocaleString('pt-BR')}\n\`\`\``);
  };

  const enviarDiscord = async () => {
    if (!individuo || crimes.length === 0) {
      alert("Erro: Preencha o nome do indivíduo e adicione pelo menos um crime.");
      return;
    }

    if (DISCORD_WEBHOOK_URL === "COLE_SEU_LINK_AQUI" || !DISCORD_WEBHOOK_URL) {
      alert("Erro: O Link do Webhook não foi configurado no código. Atualize a variável DISCORD_WEBHOOK_URL.");
      return;
    }

    setEnviando(true);
    const formData = new FormData();
    
    const embedCor = temBan ? 16711680 : 3447003; 

    const embed = {
      title: temBan ? "🛑 MANDADO DE PRISÃO (NÍVEL EXTREMO / BAN)" : "🚨 REGISTRO DE OCORRÊNCIA PENAL",
      color: embedCor,
      description: ">>> **DEPARTAMENTO DE POLÍCIA DE LOS SANTOS**\nRelatório Oficial de Abordagem, Apreensão e Prisão gerado via MDT.",
      fields: [
        { name: "👮 Oficial (QRA)", value: `\`${oficial || "N/A"}\``, inline: true },
        { name: "👮 Oficiais Envolvidos", value: `\`${oficiaisEnvolvidos || "Nenhum"}\``, inline: true },
        { name: "👤 Indivíduo Detido", value: `**${individuo}**`, inline: true },
        
        { name: "📍 Localização (QTH)", value: `\`${local || "N/A"}\``, inline: true },
        { name: "🚗 Uso de Veículo", value: temVeiculo ? `\`SIM (${placa || 'Sem Placa'})\`` : "`NÃO`", inline: true },
        { name: "⚠️ Reféns Envolvidos", value: temRefem ? `\`SIM (${nomeRefem || 'N/A'})\`` : "`NÃO`", inline: true },
        
        { 
          name: "🎒 Inventário de Apreensões", 
          value: itens.length > 0 ? `\`\`\`yaml\n${itens.map(i => `${i.qtd}x - ${i.nome}`).join('\n')}\n\`\`\`` : "```\nNADA CONSTA\n```", 
          inline: false 
        },
        
        { 
          name: "⚖️ Histórico de Imputações (Crimes)", 
          value: crimes.length > 0 ? `\`\`\`diff\n${crimes.map(c => `- [${c.artigo}] ${c.nome} (${c.pena === 'BAN' ? 'BAN' : c.pena+' Meses'})`).join('\n')}\n\`\`\`` : "```\nNENHUM CRIME REGISTRADO\n```", 
          inline: false 
        },
        
        { 
          name: "📋 VEREDITO E SENTENÇA FINAL", 
          value: `> **Pena Base Inicial:** \`${displayPenaBase} ${!temBan ? "Meses" : ""}\`\n> **Multa Penal Aplicada:** \`$${multaTotal.toLocaleString('pt-BR')}\`\n> **Direito à Fiança:** \`${displayFianca}\`\n> **Atenuante (Réu Primário):** \`${reuPrimario && !temBan ? 'SIM (-30%)' : 'NÃO'}\`\n\n🚨 **TEMPO TOTAL A CUMPRIR: \`${displayPenaFinal} ${!temBan ? "MESES" : ""}\`**`, 
          inline: false 
        }
      ],
      footer: { 
        text: "LSPD MDT System • Segurança Central",
      },
      timestamp: new Date().toISOString()
    };

    if (imagemEvidencia) {
      formData.append('file', imagemEvidencia, 'evidencia.png');
      embed.image = { url: 'attachment://evidencia.png' };
    }

    formData.append('payload_json', JSON.stringify({ embeds: [embed] }));

    try {
      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert("Sucesso! Relatório e evidências enviados para o canal do Discord da LSPD.");
        limparTudo();
      } else {
        alert("Falha ao enviar webhook. Verifique se o link do Discord inserido no código está correto.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão ao tentar comunicar com o servidor do Discord.");
    }

    setEnviando(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-20 text-slate-50 font-sans relative overflow-hidden">
      <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[800px] h-[400px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        
        <div className="mb-10 pb-6 border-b border-slate-800/80 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/30 border border-blue-900/50 text-blue-400 text-xs font-mono mb-4">
              <Terminal size={12} />
              <span>TERMINAL LSPD-OS v5.1 // CÓDIGO PENAL</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter flex items-center gap-4">
              <div className="p-3 bg-blue-600/10 rounded-xl border border-blue-500/20">
                <Calculator className="text-blue-500" size={32} /> 
              </div>
              Registro de Ocorrência
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-in fade-in zoom-in-95 duration-500">
          
          <div className="xl:col-span-5 space-y-6">
            
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
              <h3 className="text-xs font-black text-blue-500 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-slate-800 pb-2">
                <UserMinus size={16}/> Envolvidos e Local
              </h3>
              <div className="space-y-4">
                <div className="group">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 group-focus-within:text-blue-400">Oficial Responsável (QRA)</label>
                  <input type="text" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all" value={oficial} onChange={e => setOficial(e.target.value)} placeholder="Ex: Tinga Tava" />
                </div>
                
                <div className="group">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 group-focus-within:text-blue-400">Oficiais Envolvidos (Opcional)</label>
                  <input type="text" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all" value={oficiaisEnvolvidos} onChange={e => setOficiaisEnvolvidos(e.target.value)} placeholder="Ex: Ofc. Silva, Det. Lima" />
                </div>

                <div className="group">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 group-focus-within:text-blue-400">Indivíduo Detido *</label>
                  <input type="text" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all" value={individuo} onChange={e => setIndividuo(e.target.value)} placeholder="Nome do criminoso" />
                </div>
                <div className="group">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 group-focus-within:text-blue-400">Local da Abordagem (QTH)</label>
                  <input type="text" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all" value={local} onChange={e => setLocal(e.target.value)} placeholder="Ex: Praça" />
                </div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                <Crosshair size={16}/> Situação do Cenário
              </h3>
              
              <div className="space-y-4">
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 transition-all">
                  <label className="flex items-center gap-3 cursor-pointer mb-2">
                    <input type="checkbox" checked={temVeiculo} onChange={e => setTemVeiculo(e.target.checked)} className="w-5 h-5 accent-blue-600 rounded" />
                    <span className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2"><Car size={16} className="text-blue-500"/> Houve Veículo?</span>
                  </label>
                  {temVeiculo && (
                    <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 mt-2 text-white focus:border-blue-500 outline-none font-mono text-sm placeholder:font-sans placeholder:text-slate-600" value={placa} onChange={e => setPlaca(e.target.value)} placeholder="PLACA (EX: ABC-1234)" />
                  )}
                </div>

                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 transition-all hover:border-red-900/50">
                  <label className="flex items-center gap-3 cursor-pointer mb-2">
                    <input type="checkbox" checked={temRefem} onChange={e => setTemRefem(e.target.checked)} className="w-5 h-5 accent-red-600 rounded" />
                    <span className="text-sm font-bold text-red-400 uppercase tracking-widest flex items-center gap-2"><AlertTriangle size={16}/> Houve Refém?</span>
                  </label>
                  {temRefem && (
                    <input type="text" className="w-full bg-slate-900 border border-red-900/50 rounded-lg px-4 py-2 mt-2 text-white focus:border-red-500 outline-none text-sm" value={nomeRefem} onChange={e => setNomeRefem(e.target.value)} placeholder="Nome do Refém ou Descrição" />
                  )}
                </div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
              <h3 className="text-xs font-black text-orange-500 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                <ShieldAlert size={16}/> Apreensões e Provas
              </h3>
              
              <div className="flex gap-2 mb-4">
                <input 
                  type="text" 
                  list="lista-itens-ilegais"
                  className="flex-1 bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2 text-white text-sm outline-none focus:border-orange-500 placeholder:text-slate-600 uppercase" 
                  placeholder="Selecione ou digite um item..."
                  value={itemSelecionado} 
                  onChange={e => setItemSelecionado(e.target.value.toUpperCase())}
                />
                <datalist id="lista-itens-ilegais">
                  {ITENS_ILEGAIS.map(item => <option key={item} value={item} />)}
                </datalist>

                <input type="number" min="1" className="w-20 bg-slate-950/50 border border-slate-800 rounded-xl px-3 py-2 text-white text-sm outline-none text-center" value={qtdItem} onChange={e => setQtdItem(parseInt(e.target.value) || 1)} />
                <button onClick={handleAddItem} className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-4 rounded-xl transition-colors">ADD</button>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl min-h-[100px] max-h-[150px] overflow-y-auto p-2 custom-scrollbar mb-6">
                {itens.length === 0 ? (
                  <p className="text-slate-600 text-xs font-bold uppercase tracking-widest text-center mt-8">Lista de Itens Vazia</p>
                ) : (
                  itens.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-slate-900 border border-slate-700 rounded-lg p-2 mb-2">
                      <span className="text-sm font-mono text-slate-300">{item.qtd}x <span className="font-sans font-bold text-white">{item.nome}</span></span>
                      <button onClick={() => handleRemoverItem(idx)} className="text-slate-500 hover:text-red-500 transition-colors p-1"><Trash2 size={14}/></button>
                    </div>
                  ))
                )}
              </div>

              <div className="border border-dashed border-slate-700 rounded-xl p-4 text-center hover:border-blue-500/50 transition-colors relative overflow-hidden group">
                {previewImagem ? (
                  <div className="relative">
                    <img src={previewImagem} alt="Evidência" className="w-full h-32 object-cover rounded-lg opacity-80" />
                    <button onClick={removerImagem} className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-lg hover:bg-red-500 shadow-lg"><Trash2 size={16}/></button>
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-2">Imagem Anexada ao Relatório</p>
                  </div>
                ) : (
                  <>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <ImageIcon className="mx-auto text-slate-600 mb-2 group-hover:text-blue-400 transition-colors" size={32} />
                    <p className="text-sm font-bold text-slate-400 group-hover:text-blue-300">Anexar Foto das Apreensões</p>
                    <p className="text-[10px] text-slate-500 uppercase mt-1">Será enviada junto ao Webhook</p>
                  </>
                )}
              </div>
            </div>

          </div>

          <div className="xl:col-span-7 space-y-6 flex flex-col">
            
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl relative z-20">
              <h3 className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                <Scale size={16}/> Adicionar Imputações Penais
              </h3>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="text-slate-500" size={18} />
                </div>
                
                <input 
                  type="text" 
                  className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-12 pr-12 py-4 text-white text-lg focus:border-emerald-500 outline-none transition-all placeholder:text-slate-600 cursor-pointer" 
                  placeholder="Pesquisar ou selecionar crime..."
                  value={buscaCrime}
                  onChange={e => {
                    setBuscaCrime(e.target.value);
                    setMenuCrimesAberto(true);
                  }}
                  onFocus={() => setMenuCrimesAberto(true)}
                  onBlur={() => setTimeout(() => setMenuCrimesAberto(false), 200)}
                />
                
                <div 
                  className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
                  onClick={() => setMenuCrimesAberto(!menuCrimesAberto)}
                >
                  <ChevronDown className={`text-slate-500 transition-transform ${menuCrimesAberto ? 'rotate-180' : ''}`} size={20} />
                </div>
                
                {menuCrimesAberto && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-slate-800 border border-emerald-500/50 rounded-xl shadow-2xl overflow-hidden max-h-[300px] overflow-y-auto custom-scrollbar z-50">
                    {crimesFiltrados.length > 0 ? (
                      crimesFiltrados.map((crime, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => handleAddCrime(crime)} 
                          className="p-4 border-b border-slate-700 hover:bg-emerald-900/40 cursor-pointer flex justify-between items-center transition-colors"
                        >
                          <div>
                            <span className="text-emerald-400 font-black text-xs uppercase tracking-widest mr-2">{crime.artigo}</span>
                            <span className="text-white font-bold">{crime.nome}</span>
                          </div>
                          <div className="text-right">
                            <span className={`block text-sm font-mono font-bold ${crime.pena === 'BAN' ? 'text-red-500' : 'text-slate-300'}`}>
                              {crime.pena === 'BAN' ? 'BANIMENTO' : crime.pena + ' Meses'}
                            </span>
                            <span className="block text-emerald-500 text-xs font-mono">${crime.multa.toLocaleString('pt-BR')}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-slate-400 text-sm font-bold uppercase tracking-widest">
                        Nenhum crime corresponde à pesquisa.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl flex-1 flex flex-col">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                <FileText size={16}/> Crimes Registrados na Ocorrência
              </h3>
              
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl flex-1 p-4 overflow-y-auto custom-scrollbar min-h-[150px]">
                {crimes.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-600">
                    <Scale size={32} className="mb-2 opacity-50" />
                    <p className="text-xs font-bold uppercase tracking-widest">Nenhuma imputação penal</p>
                  </div>
                ) : (
                  crimes.map((crime, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-slate-900 border-l-4 border-l-red-500 border-y border-r border-slate-800 rounded-lg p-3 mb-3">
                      <div>
                        <span className="text-red-400 font-black text-[10px] sm:text-xs uppercase tracking-widest mr-2 block sm:inline">{crime.artigo}</span>
                        <span className="text-white font-bold text-sm sm:text-base">{crime.nome}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                          <span className={`text-sm font-mono font-bold block ${crime.pena === 'BAN' ? 'text-red-500' : 'text-slate-300'}`}>{crime.pena === 'BAN' ? 'BANIMENTO' : crime.pena + ' Meses'}</span>
                          <span className="text-emerald-500 text-xs font-mono block">${crime.multa.toLocaleString('pt-BR')}</span>
                        </div>
                        <button onClick={() => handleRemoverCrime(idx)} className="bg-slate-950 border border-slate-700 hover:bg-red-900/50 hover:text-red-400 text-slate-400 px-3 py-1.5 rounded-lg text-xs font-black transition-colors uppercase">Remover</button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {!temBan && (
                <div className="mt-4 bg-emerald-950/20 border border-emerald-900/50 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-emerald-900/30 transition-colors" onClick={() => setReuPrimario(!reuPrimario)}>
                  <div>
                    <p className="text-emerald-400 font-bold uppercase tracking-widest text-sm">Atenuante de Réu Primário</p>
                    <p className="text-emerald-100/50 text-xs mt-0.5">Aplica redução de 30% no tempo final.</p>
                  </div>
                  <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${reuPrimario ? 'bg-emerald-500' : 'bg-slate-800'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${reuPrimario ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center shadow-lg">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Pena Base</p>
                <p className={`text-2xl font-mono font-bold ${temBan ? 'text-red-500 text-lg pt-1' : 'text-white'}`}>{displayPenaBase}</p>
                <p className="text-[10px] text-slate-600 uppercase mt-1">Meses</p>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center shadow-lg">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Multa Total</p>
                <p className="text-2xl font-mono font-bold text-emerald-500">${multaTotal.toLocaleString('pt-BR')}</p>
                <p className="text-[10px] text-slate-600 uppercase mt-1">Dólares</p>
              </div>
              <div className={`border rounded-2xl p-4 text-center shadow-lg ${inafiancavel ? 'bg-red-900/20 border-red-500/30' : 'bg-slate-900/80 border-slate-800'}`}>
                <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${inafiancavel ? 'text-red-400' : 'text-slate-500'}`}>Valor Fiança</p>
                <p className={`text-xl pt-1 font-mono font-bold ${inafiancavel ? 'text-red-500' : 'text-yellow-500'}`}>{displayFianca}</p>
                <p className="text-[10px] text-slate-600 uppercase mt-1">Dólares</p>
              </div>
              <div className={`border rounded-2xl p-4 text-center shadow-lg relative overflow-hidden ${temBan ? 'bg-red-600/20 border-red-500/50' : 'bg-blue-600/10 border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.2)]'}`}>
                <div className={`absolute inset-0 bg-gradient-to-t ${temBan ? 'from-red-600/20' : 'from-blue-600/20'} to-transparent`}></div>
                <p className={`text-[10px] font-black uppercase tracking-widest mb-1 relative z-10 ${temBan ? 'text-red-300' : 'text-blue-300'}`}>Tempo Final</p>
                <p className={`font-mono font-black relative z-10 ${temBan ? 'text-red-500 text-xl pt-1' : 'text-white text-3xl'}`}>{displayPenaFinal}</p>
                <p className={`text-[10px] uppercase mt-1 relative z-10 ${temBan ? 'text-red-300/50' : 'text-blue-300/50'}`}>Prisão</p>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-6 bg-slate-900/90 border border-slate-700 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row gap-6 items-center backdrop-blur-xl">
          <div className="flex-1 w-full text-center md:text-left">
            <h3 className="text-lg font-black text-white uppercase tracking-widest flex items-center justify-center md:justify-start gap-2 mb-1">
              <Send size={20} className="text-blue-400"/> Despacho de Ocorrência
            </h3>
            <p className="text-slate-400 text-sm">O relatório será formatado e enviado automaticamente para a central de inteligência no Discord.</p>
          </div>
          
          <div className="flex w-full md:w-auto gap-4">
             <button onClick={copiarRelatorio} className="flex-1 md:flex-none bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-6 rounded-xl transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                <Copy size={16}/> Copiar Texto
              </button>
              <button 
                onClick={enviarDiscord} 
                disabled={enviando}
                className="flex-[2] md:flex-none bg-blue-600 hover:bg-blue-500 text-white font-black py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 uppercase tracking-widest text-xs flex items-center justify-center gap-2"
              >
                <Send size={16}/> {enviando ? 'Enviando...' : 'Enviar para Discord'}
              </button>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(15, 23, 42, 0.5); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(51, 65, 85, 0.8); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(71, 85, 105, 1); }
      `}} />
    </div>
  );
}