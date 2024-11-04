# Cortaí! - Seu cabelo na Régua!

## Sobre o App
O **Cortaí!** é um aplicativo que visa facilitar o agendamento de cortes de cabelo para clientes e auxiliar barbeiros na gestão de suas agendas e ganhos diários. Ele proporciona praticidade para os clientes na hora de marcar um horário e eficiência para os barbeiros ao organizarem seus compromissos e visualizarem seus rendimentos.

### Funcionalidades Prioritárias
- [ ] **Agendamento de Cortes**: Permite que os clientes agendem cortes, visualizando a disponibilidade dos barbeiros.
- [ ] **Cadastro de Clientes e Barbeiros**: Funcionalidade para criar perfis de clientes e barbeiros.
- [ ] **Visualização de Agenda**: Barbeiros podem ver seus compromissos diários, semanais e mensais.
- [ ] **Controle de Ganhos**: Barbeiros podem registrar e visualizar seus lucros diários.
- [ ] **Notificações**: Alertas de lembretes de agendamentos tanto para clientes quanto para barbeiros.

### Funcionalidades Futuras
- [ ] **Avaliação dos Serviços**: Clientes poderão avaliar o atendimento e qualidade dos cortes.
- [ ] **Relatórios Financeiros Avançados**: Estatísticas detalhadas sobre os ganhos dos barbeiros.
- [ ] **Integração com Redes Sociais**: Compartilhamento de cortes nas redes sociais.

## Protótipos de Tela
Acesse os protótipos das telas do app no Figma clicando no link abaixo:

[Protótipos no Figma](https://www.figma.com)


## Modelagem do Banco
A modelagem do banco de dados foi projetada para armazenar informações de usuários (clientes e barbeiros), serviços oferecidos e agendamentos.

- **Banco de dados:** PostgreSQL
- **Tipo:** Relacional
- **Diagrama Entidade-Relacionamento (DER):**

![Cortaí](https://github.com/user-attachments/assets/d9f416f9-7452-4a0a-9f6c-70ec8ece3897)

> **Cardinalidades:**
> - **users para appointments**: Um cliente pode ter muitos agendamentos, e um barbeiro pode estar em muitos agendamentos.
> - **services para appointments**: Um serviço pode ser associado a muitos agendamentos.
> - **appointments para earnings**: Um agendamento pode gerar um registro de ganho.

## Planejamento de Sprints
Abaixo, o cronograma de sprints para o desenvolvimento do **Cortaí!** até a entrega final do aplicativo.

### Sprint 1 (Semana 1 - 2)
- [ ] Criação do esqueleto do app.
- [ ] Definição das rotas entre as telas.
- [ ] Desenvolvimento do layout inicial.

## Conclusão
Este app tem como objetivo melhorar a experiência tanto para clientes quanto para barbeiros, trazendo organização e praticidade. A personalização para cada barbearia garante que o **Cortaí!** seja uma solução única para cada negócio.

## Como executar
Para executar o projeto, clone o repositório base e então execute o seguinte comando:
``npm install`` para baixar as dependências que estão na issue.

Após instalado, verifique o ``package.json`` e selecione o comando para sua plataforma de interesse de desenvolvimento.