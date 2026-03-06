export default function Recrutamento() {
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', color: 'white' }}>
      <h1 style={{ borderBottom: '2px solid #3b82f6', paddingBottom: '10px' }}>Academia de Polícia</h1>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Requisitos Básicos</h2>
        <ul style={{ lineHeight: '1.8', backgroundColor: '#1a1a1a', padding: '20px 40px', borderRadius: '8px' }}>
          <li>Ter microfone de boa qualidade (Essencial para comunicação no rádio).</li>
          <li>Conhecer as regras da cidade Rebaixados (Safezone, RDM, VDM, etc).</li>
          <li>Saber trabalhar em equipe e manter a postura em situações de tensão.</li>
          <li>Disponibilidade para patrulhas (mínimo de horas semanais a definir).</li>
        </ul>

        <h2>Como se Alistar?</h2>
        <p>
          As inscrições são feitas através do nosso servidor no Discord. Você precisará preencher um formulário online e, 
          se aprovado, passará por uma entrevista com o Alto Comando e um treinamento prático (Academia).
        </p>
        
        <button style={{ 
          marginTop: '20px', 
          backgroundColor: '#3b82f6', 
          color: 'white', 
          padding: '15px 30px', 
          border: 'none', 
          borderRadius: '5px',
          fontSize: '18px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          Acessar Discord da Cidade
        </button>
      </div>
    </div>
  );
}