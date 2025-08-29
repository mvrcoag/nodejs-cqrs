import express from "express"
import { Container } from "./bootstrap/Container"
import { createUserRoutes } from "./api/routes/UserRoutes"

async function startServer(): Promise<void> {
    const app = express()

    const container = new Container()

    await container.initiliaze()

    app.use(express.json())

    app.use('/api/users', createUserRoutes(container.messageBus))

    app.get('/health', (req, res) => {
        const queueStatus = container.messageBus.getQueueStatus()
        res.status(200).json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            service: 'Express CQRS API',
            eventQueue: queueStatus
        })
    })

    const port = process.env.PORT || 3000

    app.listen(port, () => {
        console.log(`🚀 CQRS Server running on port ${port}`);
        console.log(`📖 Health check: http://localhost:${port}/health`);
        console.log(`👥 Users API: http://localhost:${port}/api/users`);
    })

    process.on('SIGINT', async () => {
        console.log('Received SIGINT. Shutting down gracefully...')
        await container.cleanup()
        process.exit(0)
    })
}

startServer().catch(error => {
    console.error('Failed to start server:', error)
    process.exit(1)
})