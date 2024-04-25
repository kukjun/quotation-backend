import {
    exec, 
} from "child_process";
import {
    promisify, 
} from "util";
import {
    PostgreSqlContainer, 
} from "@testcontainers/postgresql";
import {
    PrismaService, 
} from "../apps/adaptor/out/persistence/prisma.service";

const execAsync = promisify(exec);

async function setupTestContainers() {
    const container = await new PostgreSqlContainer().start();

    const connectionConfig = {
        host: container.getHost(),
        port: container.getMappedPort(5432),
        database: container.getDatabase(),
        user: container.getUsername(),
        password: container.getPassword(),
    };

    return connectionConfig;
}

export async function setupPrismaService() {
    const connectionConfig = await setupTestContainers();
    const databaseUrl = `postgresql://${connectionConfig.user}:${connectionConfig.password}@${connectionConfig.host}:${connectionConfig.port}/${connectionConfig.database}`;

    await execAsync(
        `DATABASE_URL=${databaseUrl} npx prisma migrate deploy --preview-feature`
    );

    return new PrismaService({
        datasources: {
            db: {
                url: databaseUrl,
            },
        },
    });
}