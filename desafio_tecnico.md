# 🧪 Desafio Técnico: Desenvolvimento Orientado a Testes (TDD)

## 🎯 Objetivo

Implementar testes utilizando **TDD** no sistema de **reservas de propriedades**. Os testes devem cobrir:

- Mappers
- Criação de usuários (guests) e propriedades via REST
- Validação de políticas de reembolso
- Serviço de cancelamento de reservas

---

## 📦 0. Clone o Repositório

Utilize o repositório como base para o projeto na branch `main`:

🔗 https://github.com/devfullcycle/fc4-tdd

---

## ✅ 1. Testes Unitários nos Mappers

### Arquivos de teste a criar:

- `src/infrastructure/persistence/mappers/property_mapper.test.ts`
- `src/infrastructure/persistence/mappers/booking_mapper.test.ts`

### Tarefas:

- Criar testes para validar as funções `toDomain` e `toPersistence` dos mappers de **Property** e **Booking**.
- Validar se os mappers convertem os objetos corretamente.
- Adicionar cenários onde campos obrigatórios estão ausentes e validar se a exceção correta é lançada.

### Especificações:

#### `property_mapper.test.ts`
- `it("deve converter PropertyEntity em Property corretamente")`
- `it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity")`
- `it("deve converter Property para PropertyEntity corretamente")`

#### `booking_mapper.test.ts`
- `it("deve converter BookingEntity em Booking corretamente")`
- `it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity")`
- `it("deve converter Booking para BookingEntity corretamente")`

---

## ✅ 2. Testes E2E de Criação de Usuário (Guest)

### Arquivo de teste a criar:

- `src/infrastructure/web/user_controller_e2e.test.ts`

### Tarefas:

- Criar testes end-to-end para o endpoint `POST /users`
- Implementar o método `createUser` em `src/application/services/user_service.ts`
- Validar que o endpoint cria o usuário corretamente
- Retornar mensagens de erro apropriadas com o código HTTP correto

### Especificações:

- `it("deve criar um usuário com sucesso")`
- `it("deve retornar erro com código 400 e mensagem 'O campo nome é obrigatório.' ao enviar um nome vazio")`

---

## ✅ 3. Testes E2E de Criação de Propriedade

### Arquivo de teste a criar:

- `src/infrastructure/web/property_controller_e2e.test.ts`

### Tarefas:

- Criar testes end-to-end para o endpoint `POST /properties`
- Implementar o método `createProperty` em `src/application/services/property_service.ts`
- Implementar a validação de `basePricePerNight > 0` em `src/domain/entities/property.ts`
- Validar criação correta e erros apropriados com códigos HTTP

### Especificações:

- `it("deve criar uma propriedade com sucesso")`
- `it("deve retornar erro com código 400 e mensagem 'O nome da propriedade é obrigatório.' ao enviar um nome vazio")`
- `it("deve retornar erro com código 400 e mensagem 'A capacidade máxima deve ser maior que zero.' ao enviar maxGuests igual a zero ou negativo")`
- `it("deve retornar erro com código 400 e mensagem 'O preço base por noite é obrigatório.' ao enviar basePricePerNight ausente")`

---

## ✅ 4. Testes de Políticas de Reembolso (RefundRuleFactory)

### Arquivo de teste a criar:

- `src/domain/cancelation/refund_rule_factory.test.ts`

### Tarefas:

- Criar testes unitários para validar o comportamento da fábrica `RefundRuleFactory`
- Validar cenários baseados no número de dias até o check-in

### Especificações:

- `it("deve retornar FullRefund quando a reserva for cancelada com mais de 7 dias de antecedência")`
- `it("deve retornar PartialRefund quando a reserva for cancelada entre 1 e 7 dias de antecedência")`
- `it("deve retornar NoRefund quando a reserva for cancelada com menos de 1 dia de antecedência")`

---

## ✅ 5. Testes de Cancelamento de Reserva

### Arquivo de teste existente:

- `src/application/services/booking_service.test.ts`

### Tarefas:

- Adicionar um teste para garantir erro ao cancelar uma reserva inexistente

### Especificação:

- `it("deve retornar erro ao tentar cancelar uma reserva que não existe")`

**Resultado esperado:**  
Mensagem de erro: `"Reserva não encontrada."`
