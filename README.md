# 🚀 Node.js CQRS - Curso Educativo

Un proyecto educativo completo para aprender **Command Query Responsibility Segregation (CQRS)** con Node.js, TypeScript, MongoDB y SQLite.

## 📚 ¿Qué es CQRS?

CQRS es un patrón arquitectónico que separa las operaciones de lectura (Queries) de las operaciones de escritura (Commands). Este proyecto implementa una arquitectura CQRS completa con:

- **Commands**: Operaciones que modifican el estado del sistema
- **Queries**: Operaciones que obtienen datos sin modificar el estado
- **Events**: Notificaciones de cambios que han ocurrido
- **Event Handlers**: Manejadores que reaccionan a los eventos
- **Message Bus**: Sistema de mensajería para coordinar commands, queries y events

## 🏗️ Arquitectura del Proyecto

```
src/
├── api/                    # Capa de presentación (REST API)
├── modules/
│   ├── users/             # Módulo de usuarios (IMPLEMENTADO)
│   │   ├── application/   # Casos de uso, commands, queries
│   │   ├── domain/        # Entidades y reglas de negocio
│   │   └── infrastructure/# Persistencia y servicios externos
│   └── orders/            # Módulo de pedidos (🚧 PENDIENTE)
├── shared/                # Código compartido (interfaces, base classes)
└── bootstrap/             # Configuración e inyección de dependencias
```

## 🛠️ Tecnologías Utilizadas

- **Node.js** + **TypeScript** - Runtime y lenguaje
- **Express.js** - Framework web
- **MongoDB** - Base de datos de lectura (Read Model)
- **SQLite** - Base de datos de escritura (Write Model)
- **Zod** - Validación de esquemas
- **Docker** - Contenedorización

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 18+
- Docker y Docker Compose

### Pasos de instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/mvrcoag/nodejs-cqrs
cd nodejs-cqrs
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Iniciar servicios con Docker:**
```bash
docker-compose up -d
```

4. **Compilar el proyecto:**
```bash
npm run build
```

5. **Iniciar el servidor:**
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## 🔍 Endpoints Disponibles

### Health Check
- `GET /health` - Estado del sistema y cola de eventos

### Usuarios (Módulo Implementado)
- `POST /api/users` - Registrar nuevo usuario
- `PUT /api/users/:id` - Actualizar usuario existente
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID

### Ejemplo de uso:
```bash
# Crear usuario
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Juan Pérez", "email": "juan@example.com"}'

# Obtener usuarios
curl http://localhost:3000/api/users
```

## 📖 Conceptos CQRS Implementados

### 1. **Separación de Responsabilidades**
- **Write Model (SQLite)**: Almacena commands y events
- **Read Model (MongoDB)**: Almacena vistas optimizadas para queries

### 2. **Command Pattern**
- `RegisterUserCommand` - Registrar usuario
- `UpdateUserCommand` - Actualizar usuario

### 3. **Query Pattern**
- `GetAllUsersQuery` - Obtener todos los usuarios
- `FindUserQuery` - Buscar usuario específico

### 4. **Events**
- `UserRegisteredEvent` - Usuario registrado
- `UserUpdatedEvent` - Usuario actualizado

### 5. **Message Bus**
- Sistema de mensajería in-memory
- Cola de eventos asíncrona
- Manejo de errores y reintentos

## 🎯 Módulo Orders - ¡Tu Oportunidad de Aprender!

El módulo `orders/` está estructurado pero **no implementado**. ¡Esta es tu oportunidad perfecta para practicar CQRS!

### 🚧 Lo que puedes implementar:

#### Commands a desarrollar:
- `CreateOrderCommand` - Crear nueva orden
- `AddOrderItemCommand` - Agregar item a orden
- `UpdateOrderStatusCommand` - Cambiar estado de orden
- `CancelOrderCommand` - Cancelar orden

#### Queries a desarrollar:
- `GetOrderQuery` - Obtener orden por ID
- `GetOrdersByUserQuery` - Obtener órdenes de un usuario
- `GetOrdersByStatusQuery` - Filtrar por estado

#### Events a manejar:
- `OrderCreatedEvent` - Orden creada
- `OrderItemAddedEvent` - Item agregado
- `OrderStatusChangedEvent` - Estado cambiado
- `OrderCancelledEvent` - Orden cancelada

#### Entidades del dominio:
```typescript
// Ejemplos de estructuras sugeridas
interface Order {
  id: string
  userId: string
  items: OrderItem[]
  status: OrderStatus
  total: number
  createdAt: Date
}

interface OrderItem {
  productId: string
  quantity: number
  unitPrice: number
  total: number
}

enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}
```

### 💡 Reto de Aprendizaje

1. **Implementa los Commands y Handlers**
2. **Crea las Queries y sus Handlers**
3. **Define los Events y Event Handlers**
4. **Agrega los endpoints REST en el API**
5. **Implementa los repositorios (Write y Read)**

### 📚 Recursos de Ayuda

- Estudia el módulo `users/` como referencia
- Sigue los mismos patrones y estructura
- Los interfaces base están en `shared/domain/`
- El Message Bus ya está configurado y listo para usar

## 🔧 Scripts Disponibles

- `npm run build` - Compilar TypeScript
- `npm start` - Iniciar servidor
- `npm run typecheck` - Verificar tipos

## 🤝 Contribución

Este es un proyecto educativo. ¡Las contribuciones y mejoras son bienvenidas!

### Cómo contribuir:
1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/orders-module`)
3. Implementa el módulo orders siguiendo los patrones CQRS
4. Commit tus cambios (`git commit -m 'Add: Complete orders module'`)
5. Push a la rama (`git push origin feature/orders-module`)
6. Abre un Pull Request

## 📝 Aprendizajes Clave

Al completar este proyecto aprenderás:

- ✅ **Patrón CQRS** - Separación de commands y queries
- ✅ **Events** - Manejo de eventos de dominio
- ✅ **Domain Driven Design** - Modelado del dominio
- ✅ **Clean Architecture** - Separación en capas
- ✅ **TypeScript avanzado** - Tipos, interfaces y generics
- ✅ **Bases de datos duales** - Write/Read models
- ✅ **Message Bus** - Patrones de mensajería
- ✅ **Inyección de dependencias** - Inversión de control

## 📄 Licencia

Este proyecto es de uso educativo. Siéntete libre de usar, modificar y aprender de él.

---

**¡Empieza implementando el módulo Orders y conviértete en un experto en CQRS!** 🚀

¿Tienes preguntas? ¡Abre un issue y hablemos sobre CQRS y arquitectura de software!