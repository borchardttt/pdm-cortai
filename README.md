# Cortaí - Seu Cabelo na Régua 📏

**Cortaí** é um aplicativo de gerenciamento para barbearias, permitindo que clientes agendem serviços de corte de cabelo, enquanto barbeiros podem visualizar seus agendamentos do dia e o quanto ganharam. O objetivo do aplicativo é tornar o agendamento de serviços mais ágil, sem a necessidade de telefonemas, e proporcionar uma experiência eficiente para clientes e barbeiros.

## Planejamento

Cada barbearia terá sua própria versão do app, permitindo que os clientes visualizem e agendem serviços na barbearia de sua escolha. Por enquanto, o banco de dados será baseado em uma estrutura genérica para o desenvolvimento do escopo.

## Tecnologias

- **React Native**
- **Expo**
- **PostgreSQL** (em desenvolvimento)
- **Express.js** (para API)

## Funcionalidades Principais

✅ **Agendamento de serviços:** Os clientes podem visualizar a disponibilidade de horários e agendar seus cortes diretamente no app.  
✅ **Visualização do status do agendamento:** O cliente pode acompanhar o status do serviço (Confirmado, Pendente, Cancelado).  
✅ **Exibição de serviços agendados:** O barbeiro pode visualizar os cortes do dia e seu ganho acumulado.

## Funcionalidades Futuras

💡 **Painel financeiro para barbeiros:** Os barbeiros poderão ver um resumo de seus ganhos diários, semanais e mensais.  
💡 **Integração com sistemas de pagamento:** Implementação de integração para pagamento online dos serviços.  
💡 **Avaliação do serviço:** Os clientes poderão avaliar os serviços prestados pelos barbeiros.

## Sprints

### Sprint 1: 15/10 - 31/10 ✅

Objetivo: Estruturação básica do aplicativo.

- Implementação do roteamento entre telas. ✅
- Criação das principais telas (login, agendar serviços e ver agendamentos). ✅
- Estilização inicial com dados simulados. ✅
- Testes iniciais de navegação. ✅

**Checkpoint 2** ✅: Estrutura e navegação básica completa.

### Sprint 2: 01/11 - 25/11

Objetivo: Conectar o app ao banco de dados.

- Configuração do PostgreSQL. ✅
- Implementação da consulta de horários disponíveis.
- Desenvolvimento inicial do agendamento de serviços.
- Testes de usabilidade.
